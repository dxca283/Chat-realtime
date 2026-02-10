export const updateConversatuinAfterCreateMessage = (
  conversation,
  message,
  senderId,
) => {
  conversation.set({
    seenBy: [],
    lastMessageAt: message.createdAt,
    lastMessage: {
      _id: message._id,
      content: message.content,
      senderId,
      createdAt: message.createdAt,
    },
  });
  conversation.participants.forEach((p) => {
    const memberId = p.userId.toString();
    const isSender = memberId === senderId.toString();
    const prevCount = conversation.unreadCounts.get(memberId) || 0;
    conversation.unreadCounts.set(memberId, isSender ? 0 : prevCount + 1);
  });
};

export const emitNewMessage = async (io, conversation, message) => {
  // Populate sender information from the message
  await message.populate("senderId", "_id username displayName avatarUrl");

  io.to(conversation._id.toString()).emit("newMessage", {
    message,
    conversation: {
      _id: conversation._id,
      lastMessage: {
        ...conversation.lastMessage,
        sender: {
          _id: message.senderId._id,
          displayName: message.senderId.displayName,
          avatarUrl: message.senderId.avatarUrl,
        },
      },
      lastMessageAt: conversation.lastMessageAt,
      unreadCounts: conversation.unreadCounts,
    },
  });
};
