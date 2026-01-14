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
      tags,
      category 
    } = req.body;

    const userMail = req.payload;

    if (!title || !date) {
      return res.status(400).json("Title and date are required");
    }

    const user = await users.findOne({ email: userMail });
    if (!user) {
      return res.status(404).json("User not found");
    }

    // ✅ Normalize date (IMPORTANT)
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const newTask = new tasks({
      title,
      description,
      color: color || "blue",
      date: normalizedDate, // ✅ FIXED
      isRepeatEnabled,
       category: category, 
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
exports.getTasksByDateController = async (req, res) => {
  try {
    const userMail = req.payload;
    const { date } = req.query; // YYYY-MM-DD

    const user = await users.findOne({ email: userMail });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const tasksByDate = await tasks.find({
      userId: user._id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    res.status(200).json(tasksByDate);
  } catch (error) {
    res.status(500).json(error);
  }
};



//delete task controller
exports.deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    await tasks.findByIdAndDelete(id);
    res.status(200).json("Task deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};