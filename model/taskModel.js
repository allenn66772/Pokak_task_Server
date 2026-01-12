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

    
    color: {
      type: String,
      default: "blue"
    },

   
    date: {
      type: Date,
      required: true
    },

  
    isRepeatEnabled: {
      type: Boolean,
      default: false
    },

   
    repeatType: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      default: "Daily"
    },

   
    repeatDays: {
      type: [String],
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      default: []
    },

    
    tags: {
      type: [String],
      default: []
    },

   
    isCompleted: {
      type: Boolean,
      default: false
    },

   
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