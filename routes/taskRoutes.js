const express = require("express");

const router = express.Router();
const auth = require("../middlewares/auth");
const Task = require("../models/Task");

// CRUD tasks for authenticated users

//create a task
router.post("/", async (req, res) => {
  try {
    // description, completed from req.body
    // owner : req.user._id
    const blog = new Task({
      ...req.body,
      // owner: req.user._id,
    });
    await blog.save();
    res.status(201).json({ blog, message: "Blogs Created Successfully" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// get user tasks
router.get("/", async (req, res) => {
  try {
    const blogs = await Task.find({});
    res.status(200).json({
      blogs,
      count: blogs.length,
      message: "Tasks Fetched Successfully",
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

//fetch a task by id

router.get("/:id", async (req, res) => {
  const taskid = req.params.id;

  try {
    const blogs = await Task.findOne({
      _id: taskid,
    });
    if (!blogs) {
      return res.status(404).json({ message: "Blogs not found" });
    }
    res.status(200).json({ blogs, message: "Blogs Fetched Successfully" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

router.put("/:id", async (req, res) => {
  const taskid = req.params.id;

  try {
    const task = await Task.findById({
      _id: taskid,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updatedData = await Task.findByIdAndUpdate(taskid, req.body, {
      new: true,
    });
    res.status(200).json({ updatedData, message: "Blog Updated Successfully" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});
// delete a task by id
router.delete("/:id", async (req, res) => {
  const taskid = req.params.id;

  try {
    const task = await Task.findOneAndDelete({
      _id: taskid,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task, message: "Task Deleted Successfully" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

module.exports = router;
