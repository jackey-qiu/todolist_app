import {completeTodo, deleteTodo} from "../pages/user/api-funcs"
export default function Todo({ todos, setTodos, idRef, urgents, setUrgents, passEvents, setPassEvents }) {
	// console.log("component", urgents.current);
	if (todos.length === 0) {
		return (
			<div className="todos">
				<p>You currently have no tasks</p>
			</div>)
	}
	else {
		const returnTodos = [];
		for (let i = 0; i < todos.length; i++) {
			// console.log(i, j);
			// console.log(todos[i].urgent)
			let urgentTag = "";
			if (urgents[i]) {
				urgentTag = " urgent";
			}
			if (passEvents[i]) {
				urgentTag = ""
			}
			returnTodos.push(
				<div className={"todo" + urgentTag + (todos[i].complete ? " is-complete" : "")} key={todos[i]._id} >
					<div className="checkbox" onClick={() => completeTodo(todos[i]._id, todos, setTodos)}></div>
					<div className="text">{todos[i].text + "@" + todos[i].starttime}</div>
					<div className="delete-todo" onClick={() => deleteTodo(todos[i]._id, todos, setTodos,idRef, urgents, setUrgents, passEvents,setPassEvents)}>x</div>
				</div>)
		}
		return (
			<div className="todos">
				{returnTodos}
			</div>);
	}
}