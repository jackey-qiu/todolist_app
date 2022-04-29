import { completeTodo, deleteTodo } from "../pages/user/api-funcs";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Todo({ todos, setTodos, idRef, urgents, setUrgents, passEvents, setPassEvents, searchItem }) {
	// console.log("component", urgents.current);
	const [currentPage, setCurrentPage] = useState(1);

	const handleMoveToNextPage = () => {
		if ((currentPage + 1) <= Math.ceil(todos.length / 10)) {
			setCurrentPage(pre => pre + 1)
		}
	};

	const handleMoveToPrePage = () => {
		if ((currentPage - 1) >= 1) {
			setCurrentPage(pre => pre - 1)
		}
	};

	if (todos.length === 0) {
		return (
			<div className="todos">
				<p>You currently have no tasks</p>
			</div>)
	}
	else {
		const returnTodos = [];
		const num = Math.min(todos.length - (currentPage - 1) * 10, 10)
		for (let j = 0; j < num; j++) {
			// console.log(i, j);
			// console.log(todos[i].urgent)
			const i = (currentPage - 1) * 10 + j
			let urgentTag = "";
			if (urgents[i]) {
				urgentTag = " urgent";
			}
			if (passEvents[i]) {
				urgentTag = ""
			}
			if (todos[i].text.toLowerCase().startsWith(searchItem.toLowerCase())) {
				returnTodos.push(
					<div className={"todo" + urgentTag + (todos[i].complete ? " is-complete" : "")} key={todos[i]._id} >
						<div className="checkbox" onClick={() => completeTodo(todos[i]._id, todos, setTodos)}>{i + 1}</div>
						<NavLink
							to={`${todos[i]._id}`}
							style={({ isActive }) => {
								return {
									display: 'block',
									margin: '1rem 0',
									color: isActive ? 'red' : 'white',
									textDecoration: 'none',
								};
							}}
						>
							<div className="text">{todos[i].text + "@" + todos[i].starttime}</div>
						</NavLink>
						<div className="delete-todo" onClick={() => deleteTodo(todos[i]._id, todos, setTodos, idRef, urgents, setUrgents, passEvents, setPassEvents)}>x</div>
					</div>)
			}
		}
		return (
			<div className="todos">
				{returnTodos}
				<div className="page-footer">
					<p className='page' style={{ "color": "white", "cursor": "pointer" }} onClick={handleMoveToPrePage}>pre-page&lt;&lt;</p>
					<p className='page' style={{ "color": "white", "gap": "20px" }}>{currentPage}/{Math.ceil(todos.length / 10)}</p>
					<p className="page" style={{ "color": "white", "cursor": "pointer" }} onClick={handleMoveToNextPage}>&gt;&gt;next-page</p>
				</div>
			</div>
		);
	}
}