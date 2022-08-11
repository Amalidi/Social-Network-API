const { Thoughts } = require("../../models");

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thoughts.find({});

    return res.json({ success: true, data: thoughts });
  } catch (error) {
    console.log(`[ERROR]: Failed to get all thoughts | ${error.message}`);
  }
};

const getThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;

    const getThought = await Thoughts.findById(thoughtId);

    if (!getThought) {
      return res.status(404).json({ success: false });
    }

    return res.json({ data: getThought });
  } catch (error) {
    console.log(`[Error]: Failed to get thought | ${error.message}`);
  }
};
