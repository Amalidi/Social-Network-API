const { Thoughts } = require("../../models");

const createNewReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params;

    const data = await Thoughts.findOneAndUpdate(
      thoughtId,
      {
        $push: { reactions: { ...req.body } },
      },
      { new: true }
    );

    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to create new reaction | ${error.message}`);

    return res.status(500).json({
      success: false,
      error: "Failed to create new reaction",
    });
  }
};

const deleteReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    if (thoughtId && reactionId) {
      await Thoughts.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { _id: reactionId } } },
        { new: true, runValidators: true }
      );

      return res.json({ success: true });
    } else res.status(500).json({ success: false });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete reaction | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createNewReaction, deleteReaction };
