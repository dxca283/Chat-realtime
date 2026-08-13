import User from "../models/User.js";

export const authMe = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Loi khi goi Auth Me", error);
    return res.status(500).json({ message: "Loi he thong" });
  }
};

export const searchByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Username is required" });
    }
    const user = await User.findOne({ username }).select(
      "_id displayName username avatarUrl",
    );
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Loi khi goi Search By Username", error);
    return res.status(500).json({ message: "Loi he thong" });
  }
};
