const express = require("express");
const router = express.Router();
const {
  AddTask,
  getTaskBy_id,
  getAllTask,
  DeleteTask,
  EditTask,
} = require("../controllers/taskController");

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
// router.route("/").get(getAllTask);
router.route("/add").post(AddTask);
router.route("/").get(getTaskBy_id);
router.route("/:id").delete(DeleteTask).put(EditTask);

module.exports = router;
