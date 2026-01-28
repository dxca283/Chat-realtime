import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import crypto from "crypto";

export const signUp = async (req, res) => {
  try {
    const { username, password, email, fullname } = req.body;

    if (!username || !password || !email || !fullname) {
      return res.status(400).json({
        message: "Dien thieu thong tin",
      });
    }

    //Kiem tra username ton tai chua
    const duplicate = await User.findOne({ username });

    if (duplicate)
      return res.status(409).json({
        message: "Username da ton tai",
      });

    // Ma hoa password

    const hashedPassword = await bcrypt.hash(password, 10);

    //Tao user moi trong database
    await User.create({
      username,
      hashedPassword,
      email,
      displayName: fullname,
    });

    return res.status(204).json({ message: "Tao User thanh cong" });
  } catch (error) {
    console.error("Loi khi goi sign up", error);
    return res.status(500).json({ message: "Loi he thong" });
  }
};

export const signIn = async (req, res) => {
  try {
    //Lay inputs
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Thieu username hoac password" });

    //Lay hashedPassword trong database roi so voi input
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(401)
        .json({ message: "username hoac password khong dung" });

    //Kiem tra password
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordCorrect)
      return res
        .status(401)
        .json({ message: "Username hoac password khong chinh xac" });
    //Neu khop, tao accessToken voi JWT
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    //Tao session moi de luu refreshToken
    const refreshToken = crypto.randomBytes(64).toString("hex");
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    //Tra refreshToken ve trong cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    //Tra access token ve trong res

    return res.status(200).json({
      message: `User ${user.displayName} da log in`,
      accessToken,
    });
  } catch (error) {
    console.error("Loi khi goi sign in", error);
    return res.status(500).json({ message: "Loi he thong" });
  }
};

export const signOut = async (req, res) => {
  try {
    // Lay refresh token tu cookie
    const token = req.cookies?.refreshToken;

    if (token) {
      //Xoa refresh token trong Session DB
      await Session.deleteOne({ refreshToken: token });
      //Xoa refresh token trong cookie
      res.clearCookie("refreshToken");
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error("Loi khi goi sign out", error);
    return res.status(500).json({ message: "Loi he thong" });
  }
};

//Tao access token moi khi het han
export const refreshToken = async (req, res) => {
  try {
    // Lay refresh token tu cookie
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "Khong tim thay refresh token" });
    }
    //So voi refresh token trong Session DB
    const session = await Session.findOne({ refreshToken: token });
    if (!session) {
      return res.status(403).json({ message: "Refresh token khong hop le" });
    }
    //Kiem tra refresh token con han khong
    if (session.expiresAt < new Date()) {
      //Xoa refresh token het han trong DB
      await Session.deleteOne({ refreshToken: token });
      return res.status(403).json({ message: "Refresh token da het han" });
    }

    // Neu hop le, tao access token moi
    const accessToken = jwt.sign(
      {
        userId: session.userId,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    // Tra access token ve cho client
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Loi khi goi refresh token", error);
    return res.status(500).json({ message: "Loi he thong" });
  }
};
