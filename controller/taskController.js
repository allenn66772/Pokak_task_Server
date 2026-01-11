const tasks=require("../model/taskModel")
const users=require("../model/userModel")

//create task controller


// CREATE TASK

exports.createTaskController = async (req, res) => {
  try {
    const {
      title,
      description,
      color,
      date,
      isRepeatEnabled,
      repeatType,
      repeatDays,
      tags
    } = req.body;

    // email coming from JWT middleware
    const userMail = req.payload;

    if (!title || !date) {
      return res.status(400).json("Title and date are required");
    }

    // find user using email from token
    const user = await users.findOne({ email: userMail });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const newTask = new tasks({   // ✅ correct (tasks)
      title,
      description,
      color,
      date,
      isRepeatEnabled,
      repeatType,
      repeatDays,
      tags,
      userId: user._id
    });

    await newTask.save();
    return res.status(200).json(newTask);

  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

//get tasks


// GET ALL TASKS (Logged-in User)
exports.getTaskController = async (req, res) => {
  try {
    // email from jwt middleware
    const userMail = req.payload;

    // find user
    const user = await users.findOne({ email: userMail });
    if (!user) {
      return res.status(404).json("User not found");
    }

    // find tasks of that user
    const userTasks = await tasks.find({ userId: user._id });

    res.status(200).json(userTasks);

  } catch (error) {
    res.status(500).json(error);
  }
};
