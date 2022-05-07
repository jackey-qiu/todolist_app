import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../components/credentialContext';
import { updateTodo, addOneTodo } from './api-funcs';
import "./task.scss";

function Task() {
	const navigate = useNavigate();
	const { taskId } = useParams();
	const [todos, setTodos, setUrgents, setPassEvents] = useOutletContext();
	const { loginInfo } = useAuth();
	const todo = todos.find((each) => each._id === taskId);
	const [taskName, setTaskName] = useState(todo.text);
	const [taskDetail, setTaskDetail] = useState(todo.detail);
	const [startTime, setStartTime] = useState(todo.starttime);
	useEffect(() => setTaskDetail(todo.detail), [taskId]);
	useEffect(() => {
		setTaskName(todo.text);
		setStartTime(todo.starttime)
	}, [todo]);

	const updateTask = async () => {
		const data = await updateTodo(taskName, startTime, taskDetail, todo._id);
		setTodos(pre => pre.map((each) => (each._id === data._id) ? data : each));
	};

	const addOne = async () => {
		if (window.confirm("This will create a new task. Are you sure?")) {
			const data = await addOneTodo(taskName, startTime, loginInfo.userName, taskDetail);
			if (data) {
				setTodos(pre => [...pre, data]);
				setUrgents(pre => [...pre, false]);
				setPassEvents(pre => [...pre, false]);
				navigate("../" + data._id);
			}
		}
	};

	if (todo) {
		return (
			<div className="detail">
				<h1 style={{ "textAlign": "center", "margin": 0, "border": 0, "backgroundColor": "blue", "borderRadius": "15px" }}>Task Details</h1>
				<div style={{ "display": "flex", "alignItems": "stretch" }}>
					<h3 style={{ "textAlign": "center", "backgroundColor": "red", "margin": "5px 5px", "padding": "5px 20px" }}>Task</h3>
					<input className="todo-input-test" type="text" style={{ "width": "100%", "margin": "0px 0px", "padding": "5px 0px" }} onChange={e => setTaskName(e.target.value)} value={taskName} />
				</div>
				<div style={{ "display": "flex", "alignItems": "stretch" }}>
					<h3 style={{ "textAlign": "center", "backgroundColor": "green", "margin": "5px 5px", "padding": "5px 20px" }}>Time</h3>
					<input type="datetime-local" id="meeting-time" value={startTime} style={{ "width": "90%", "margin": "0px 0px", "padding": "5px 0px" }} onChange={e => setStartTime(e.target.value)}></input>
				</div>
				{/* <h2 style={{ "margin": "20px" }}>Time: {todo.starttime}</h2> */}
				<div style={{ "margin": "10px", "padding": "5", "color": "white", "fontsize": "6", "lineHeight": "130%", "letterSpacing": "1px", "textAlign": "justify" }}>
					<textarea value={taskDetail} onChange={e => setTaskDetail(e.target.value)} style={{ "display": "block", "margin": "0px", "width": "600px", "height": "500px", "backgroundColor": "black", "color": "white", "fontsize": "6", "lineHeight": "130%", "letterSpacing": "1px", "textAlign": "justify" }}>
						{taskDetail}
					</textarea>
				</div>
				<div className="container" style={{ "display": "flex", "justifyContent": "space-between", "marginBottom": "20px" }}>
					<div className="button" onClick={updateTask} style={{ "textAlign": "center" }}>Update Task</div>
					<div className="button" onClick={addOne} style={{ "textAlign": "center" }}>New Task</div>
				</div>
			</div>
		)
	} else {
		return (<h1 style={{ "margin": "20px", "textAlign": "center", "color": "red" }}>Unkown Task ID, click one of the task in the list</h1>)
	}

}

function NewTask() {
	const navigate = useNavigate();
	// const { taskId } = useParams();
	const [todos, setTodos, setUrgents, setPassEvents] = useOutletContext();
	const { loginInfo } = useAuth();
	// const todo = todos.find((each) => each._id === taskId);
	const [taskName, setTaskName] = useState("new task");
	const [taskDetail, setTaskDetail] = useState("task details");
	const [startTime, setStartTime] = useState("");
	// useEffect(() => setTaskDetail(todo.detail), [taskId]);
	// useEffect(() => {
	// 	setTaskName(todo.text);
	// 	setStartTime(todo.starttime)
	// }, [todo]);

	const addOne = async () => {
		if (window.confirm("This will create a new task. Are you sure?")) {
			const data = await addOneTodo(taskName, startTime, loginInfo.userName, taskDetail);
			if (data) {
				setTodos(pre => [...pre, data]);
				setUrgents(pre => [...pre, false]);
				setPassEvents(pre => [...pre, false]);
				navigate("../" + data._id);
			}
		}
	};

	return (
		<div className="detail">
			<h1 style={{ "textAlign": "center", "margin": 0, "border": 0, "backgroundColor": "blue", "borderRadius": "15px" }}>Task Details</h1>
			<div style={{ "display": "flex", "alignItems": "stretch" }}>
				<h3 style={{ "textAlign": "center", "backgroundColor": "red", "margin": "5px 5px", "padding": "5px 20px" }}>Task</h3>
				<input className="todo-input-test" type="text" style={{ "width": "100%", "margin": "0px 0px", "padding": "5px 0px" }} onChange={e => setTaskName(e.target.value)} value={taskName} />
			</div>
			<div style={{ "display": "flex", "alignItems": "stretch" }}>
				<h3 style={{ "textAlign": "center", "backgroundColor": "green", "margin": "5px 5px", "padding": "5px 20px" }}>Time</h3>
				<input type="datetime-local" id="meeting-time" value={startTime} style={{ "width": "90%", "margin": "0px 0px", "padding": "5px 0px" }} onChange={e => setStartTime(e.target.value)}></input>
			</div>
			{/* <h2 style={{ "margin": "20px" }}>Time: {todo.starttime}</h2> */}
			<div style={{ "margin": "10px", "padding": "5", "color": "white", "fontsize": "6", "lineHeight": "130%", "letterSpacing": "1px", "textAlign": "justify" }}>
				<textarea value={taskDetail} onChange={e => setTaskDetail(e.target.value)} style={{ "display": "block", "margin": "0px", "width": "600px", "height": "500px", "backgroundColor": "black", "color": "white", "fontsize": "6", "lineHeight": "130%", "letterSpacing": "1px", "textAlign": "justify" }}>
					{taskDetail}
				</textarea>
			</div>
			<div className="container" style={{ "display": "flex", "justifyContent": "space-between", "marginBottom": "20px" }}>
				<div className="button" onClick={addOne} style={{ "textAlign": "center" }}>New Task</div>
			</div>
		</div>
	)
}

export {
	Task,
	NewTask
}