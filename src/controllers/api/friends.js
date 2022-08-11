const { User } = require("../../models");

const createNewFriend = async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await User.findIdAndUpdate(
      userId,
      { $push: { friends: req.body._id } },
      { new: true }
    ).populate("friends");

    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to add new friend | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to add new friend" });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findIdAndUpdate(userId, {
      $pull: { friends: friendId },
    });

    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete friend | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete friend" });
  }
};

module.exports = { createNewFriend, deleteFriend };
