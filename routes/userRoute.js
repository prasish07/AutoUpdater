const router = require("express").Router();
const { createUser, update } = require("../Controller/userController");

router.route("/").post(createUser);
router.route("/:id").put(update);

module.exports = router;
