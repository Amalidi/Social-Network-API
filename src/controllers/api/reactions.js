const { Thoughts } = require("../../models");

const createNewReaction = async (req, res) => {
  const { id } = req.params;
  const { reactionBody, userName } = req.body;

  try {
    if (reactionBody && userName) {
      await Thoughts.findIdAndUpdate(
        { _id: id },
        { $addToSet: { reactions: { reactionBody, userName } } },
        { new: true, runValidators: true }
      );
      return res.json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to create new reaction | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deleteReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    if (thoughtId && reactionId) {
      await Thoughts.findIdAndUpdate(
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
