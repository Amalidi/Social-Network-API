const { User, Thoughts } = require("../../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.json({ data: users });
  } catch (error) {
    console.log(`[Error]: Failed to get all users | ${error.message}`);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false });
    }

    return res.json({ data: user });
  } catch (error) {
    console.log(`[Error]: Failed to get user | ${error.message}`);
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email } = req.body;

    if (userName && email) {
      await User.create({ userName, email });

      return res.json({ success: true });
    } else {
      return res.status(400).json({
        success: false,
        error: `Please enter valid username and email`,
      });
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to create new user | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
      },
      { new: true }
    );
    return res.json({ success: true, data });
  } catch (error) {
    console.log(`[ERROR]: Failed to update user | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update user" });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const userThoughts = user.thoughts;
    console.log(userThoughts);

    // delete user
    await Thoughts.deleteMany({ _id: userThoughts });

    try {
      await User.findByIdAndDelete(id);
      return res.json({ success: true });
    } catch (error) {
      console.log(`[ERROR]: Failed to delete user | ${error.message}`);
      return res.status(500).json({ success: false, error: error.message });
    }
  } catch (error) {
    console.log(`[Error]: Failed to get user | ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
