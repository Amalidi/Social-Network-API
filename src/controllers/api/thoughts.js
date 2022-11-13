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
    const { id } = req.params;

    const getThought = await Thoughts.findOne({ _id: id });

    if (!getThought) {
      return res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, getThought });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false });
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
    const { thoughtId } = req.params;
    const data = await Thoughts.findByIdAndUpdate(
      thoughtId,
      {
        ...req.body,
      },
      { new: true }
    );
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to update thought | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update thought" });
  }
};

const deleteThought = async (req, res) => {
  try {
    const { id } = req.params;

    await Thoughts.findByIdAndDelete({ _id: id });
    return res
      .status(200)
      .json({ success: true, message: "Successfully deleted thought" });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete thought | ${error.message}`);
    return res.status(500).json({ error: "Failed to delete thought" });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
};
