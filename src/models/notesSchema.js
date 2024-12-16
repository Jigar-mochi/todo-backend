const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            require: [true, "Note is required"],
        },
        description: {
            type: String,
            require: [true, "Description is required"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notes", noteSchema);
