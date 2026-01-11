const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description: {
      type: String,
      trim: true
    },

    // Card color (green, purple, blue, etc.)
    color: {
      type: String,
      default: "blue"
    },

    // Date selected from calendar
    date: {
      type: Date,
      required: true
    },

    // Repeat toggle (ON / OFF)
    isRepeatEnabled: {
      type: Boolean,
      default: false
    },

    // Repeat type
    repeatType: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      default: "Daily"
    },

    // Selected days (Mon, Tue, Wed...)
    repeatDays: {
      type: [String],
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      default: []
    },

    // Tags (Daily Routine, Study Routine, etc.)
    tags: {
      type: [String],
      default: []
    },

    // Task status (for toggle / completion)
    isCompleted: {
      type: Boolean,
      default: false
    },

    // User reference (important)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  {
    timestamps: true
  }
)
const tasks=mongoose.model("tasks",taskSchema)
module.exports=tasks