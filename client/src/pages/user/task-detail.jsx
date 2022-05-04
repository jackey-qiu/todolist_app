import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../components/credentialContext';
import { updateTodo, addOneTodo } from './api-funcs';
import "./task.scss";

export default function Task() {
	const navigate = useNavigate();
	const { taskId } = useParams();
	const [todos, setTodos, setUrgents, setPassEvents] = useOutletContext();
	const { loginInfo } = useAuth();
	const todo = todos.find((each) => each._id === taskId);
	const [taskName, setTaskName] = useState(todo.text);
	const [startTime, setStartTime] = useState(todo.starttime);
	useEffect(() => {
		setTaskName(todo.text);
		setStartTime(todo.starttime)
	}, [todo]);

	const updateTask = async () => {
		const data = await updateTodo(taskName, startTime, todo._id);
		setTodos(pre => pre.map((each) => (each._id === data._id) ? data : each));
	};

    const addOne = async () => {
		if (window.confirm("This will create a new task. Are you sure?")){
			const data = await addOneTodo(taskName, startTime, loginInfo.userName);
			if (data) {
				setTodos(pre=>[...pre, data]);
				setUrgents(pre=>[...pre, false]);
				setPassEvents(pre=>[...pre, false]);
				navigate("../"+data._id);
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
					<textarea style={{"width":"600px","height":"500px", "backgroundColor":"black","color":"white", "fontsize": "6", "lineHeight": "130%", "letterSpacing": "1px", "textAlign": "justify" }}>
						"On behalf of the English Department, we would like to cordially invite students and staff from all faculties to the symposium "Moving towards collective action: activism and academia" that will take place in Kiel (and via Zoom) on May 14 and 15. The symposium is supported by the initiative "Frauen aufs Podium," the CAU Diversity Fund and the German Association for American Studies.
						Everyone who is interested in diversity in higher education, questions of accessibility and equity in teaching, disability studies and anti-racist practice is welcome to attend. The CAU has been very invested in foregrounding the topic of diversity through different events in the last years, and this symposium will add to continued efforts to address questions of accessibility, anti-racist and anti-ableist practice in both teaching and research at CAU. The conference language will be English.
						We have found two fantastic keynote speakers, Dr. Emily Ngubia Kessé (Freiburg) and Prof. Dr. Margaret Price (Director of Disability Studies, Ohio State University) who will both attend in person and will speak about different modes of anti-racist and anti-ableist action and collective accountability. In addition to several panels, curator and activist Noa Winter will offer a workshop titled "Ableism in Academia - A Space for Reflection and Action." (Please note that the workshop will not be available via Zoom).
						For additional information, please refer to our detailed description of the symposium and the symposium's program."
					</textarea>
				</div>
				<div className="container" style={{"display":"flex", "justifyContent":"space-between", "marginBottom":"20px"}}>
					<div className="button" onClick={updateTask} style={{ "textAlign": "center" }}>Update Task</div>
					<div className="button" onClick={addOne} style={{ "textAlign": "center" }}>New Task</div>
				</div>
			</div>
		)
	} else {
		return (<h1 style={{ "margin": "20px", "textAlign": "center", "color": "red" }}>Unkown Task ID, click one of the task in the list</h1>)
	}

}