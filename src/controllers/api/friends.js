const { User } = require("../../models");

const createNewFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    if (userId && friendId) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } },
        { new: true, runValidators: true }
      );

      await User.findOneAndUpdate(
        { _id: friendId },
        { $addToSet: { friends: userId } },
        { new: true, runValidators: true }
      );
      return res.json({ success: true });
    } else res.status(500).json({ success: false });
  } catch (error) {
    console.log(`[ERROR]: Failed to add new friend | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deleteFriend = async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    if (userId && friendId) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } },
        { new: true, runValidators: true }
      );

      await User.findOneAndUpdate(
        { _id: friendId },
        { $pull: { friends: userId } },
        { new: true, runValidators: true }
      );
      return res.json({ success: true });
    } else res.status(500).json({ success: false });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete friend | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createNewFriend, deleteFriend };
