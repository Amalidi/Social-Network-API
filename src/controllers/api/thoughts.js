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

const createThought = async (req, res) => {
  try {
    const { thoughtText, userName } = req.body;

    if (thoughtText && userName) {
      await Thoughts.create({ userName, thoughtText });
      return res.json({ success: true });
    } else {
      return res.status(400).json({
        success: false,
        error: `Please provide a valid thought and username`,
      });
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to create new thought | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateThought = async (req, res) => {
  try {
    const { id } = req.params;
    const { thoughtText, userName } = req.body;

    if (userName || thoughtText) {
      await Thoughts.findByIdAndUpdate(id, {
        userName,
        thoughtText,
      });

      return res.json({ success: true });
    } else res.status(500).json({ success: false });
  } catch (error) {
    console.log(`[ERROR]: Failed to update thought | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deleteThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;

    // delete the thought
    await Thoughts.findByIdAndDelete(thoughtId);

    return res.json({ success: true });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete thought | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
};
