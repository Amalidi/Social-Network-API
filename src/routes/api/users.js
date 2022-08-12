const { Router } = require("express");

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../../controllers/api/users");

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.post("/:userId/friend/:friendId", createNewFriend);
router.delete("/:userId/friend/:friendId", deleteFriend);

module.exports = router;
