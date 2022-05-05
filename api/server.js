require('dotenv').config({ path: __dirname + '/.env' })
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const express = require('express');
const mongoose = require('mongoose');
const schema = require('./models/Todo2');
const cors = require('cors');
// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo');
const app = express();


//mongoose.connect('mongodb://127.0.0.1:27017/react-todo', {
mongoose.connect(process.env['ATLAS'], {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
//const TodoSchema = schema.TodoSchema;
//const Todo = mongoose.model('Todo', TodoSchema);
const db_todo = mongoose.connection.useDb('myDB_todo_list');
const Todo = db_todo.model('Todo', schema.TodoSchema);
const db_user_info = mongoose.connection.useDb('myDB_user_info');
const User = db_user_info.model('User', schema.UserSchema);
const sessionStore = MongoStore.create({ mongoUrl: process.env['ATLAS'], collectionName: 'sessions' })
// app.use(express.json());
// app.use(cors());
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        credentials: true,
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true
        // store: sessionStore
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());



require("./passportConfig")(passport, User);

// app.post('/api/todos', async (req, res) => {
//     const todos = await Todo.find({ user: req.body.user });
//     res.json(todos.sort((a, b) => { return (new Date(a.starttime) - new Date(b.starttime)) }));
// });

app.post('/api/todo/new', (req, res) => {
    const todo = new Todo({
        user: req.body.user,
        password: req.body.password,
        text: req.body.text,
        detail: req.body?.detail || "task details",
        starttime: req.body.starttime
    })

    todo.save();
    res.json(todo);
});

app.post('/api/todo/register_', (req, res) => {
    const user = new User({
        user: req.body.user,
        password: req.body.password
    })

    user.save();
    res.json(user);
});

app.post("/api/todo/login", (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
        if (err) throw err;
        if (!user) res.send({ ...info, status: false });
        else {
            if (user.rightGranted) {
                const todos = await Todo.find({ user: user.user });
                const todos_sorted = todos.sort((a, b) => { return (new Date(a.starttime) - new Date(b.starttime)) });
                //console.log(todos_sorted);
                req.login(user, (err) => {
                    if (err) res.send(err);
                    res.send({ message: `Success to login ${req.user.user}!`, status: true, todos: todos_sorted });
                    // console.log(user);
                });
            } else {
                res.send({ message: `Right for ${user.user} was not granted yet, be patient for admin to grant your right!`, status: false });
            }
        }
    })(req, res, next);
});

app.get('/api/todo/logout', (req, res, next) => {
    req.logout();
    res.send('Logout successfully!');
});

app.post("/api/todo/register", (req, res) => {
    User.findOne({ user: req.body.user }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.json({ msg: "User already exists, try again please!", state: false });
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                user: req.body.user,
                password: hashedPassword,
            });
            await newUser.save();
            res.json({ msg: "New user info is created!", state: true });
        }
    });
});

app.delete('/api/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json({ result });
});

app.get('/api/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

app.put('/api/todo/update/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.text = req.body.text;
    todo.starttime = req.body.starttime;
    todo.detail = req.body.detail;

    todo.save();

    res.json(todo);
});

app.listen(3001);