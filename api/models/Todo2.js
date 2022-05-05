const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        default: "task details"
    },
    complete: {
        type: Boolean,
        default: false
    },
    urgent: {
        type: Boolean,
        default: false
    },
    timeoutID: {
        type: Number,
        default: null
    },
    starttime: {
        type: String,
        default: new Date().toISOString()
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
});

const UserSchema = new Schema({
    user: { type: String, required: true },
    password: { type: String, rquired: true },
    isAdmin: { type: Boolean, default: false },
    rightGranted: { type: Boolean, default: false }
});

// const Todo = mongoose.model("Todo", TodoSchema);
// const User = mongoose.model("User", UserSchema);

// module.exports = { todo: Todo, user: User };
module.exports = { TodoSchema, UserSchema };