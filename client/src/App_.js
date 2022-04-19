
import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from './components/Todo';
import Popup from './components/Popup';
import Login from './components/login';
import Register from './components/register';
import Axios from "axios";
const api_base = 'http://localhost:3001';

function App() {
	// const [order, setOrder] = useState([]);
	const [todos, setTodos] = useState([]);
	const [isPending, setIsPending] = useState(true);
	//const urgentsRef = useRef([]);
	const [urgents, setUrgents] = useState([]);
	const [passEvents, setPassEvents] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");
	const [startTime, setStartTime] = useState("");
	const idRef = useRef([]);
	const idPassRef = useRef([]);
	//login states
	const [popupActiveLogin, setPopupActiveLogin] = useState(true);
	const [popupActiveRegister, setPopupActiveRegister] = useState(false);
	const [newUserName, setNewUserName] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [currentUserName, setCurrentUserName] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [loginState, setLoginState] = useState(false);
	const [loginMsg, setLoginMsg] = useState("");
	const [registerState, setRegisterState] = useState('');

	// useEffect(() => {
	// 	GetTodos();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	//reschedule events whenever update of todos
	useEffect(() => {
		scheduleEvent(todos);
		//here cleanup the scheduled timeout events
		return () => {
			idRef.current.forEach((each) => { clearTimeout(each) });
			idPassRef.current.forEach((each) => { clearTimeout(each) });
		};
	}, [todos]);

	// useEffect(() => { console.log(idRef.current, idPassRef.current, urgents) }, [urgents]);

	const login = async () => {
		await Axios({
			url: api_base + "/api/todo/login",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			// credentials: 'include',
			data: {
				user: currentUserName,
				password: currentPassword
			}
		}).then(res => {
			//setRegisterState(res.data.msg);
			//return res.data.state
			setLoginState(res.data.status);
			setLoginMsg(res.data.message);
			if (res.data.status) {
				GetTodos();
				setTimeout(() => {
					setPopupActiveLogin(false);
					setLoginMsg('');
				}, 2000);
			} else {
				setCurrentUserName('')
			}

		}).catch(
			(err) => console.log("Error: ", err)
		);
	}

	const logout = () => {
		setPopupActiveLogin(false)
		// alert(`${newUserName} is logged out!`);
		setCurrentUserName('');
		setLoginState(false);
		Axios({
			url: api_base + "/api/todo/logout"
		}).then(res => {
			console.log(res.data);
			setTodos([]);
			setLoginMsg('');
		}).catch(
			(err) => console.log("Error: ", err)
		);
	}

	const scheduleEvent = data => {
		//reset the idref to empty array for storing timeout ids
		idRef.current = [];
		idPassRef.current = [];
		data.forEach((each, i) => {
			//change the urgent states witin timeout elaps
			const id = setTimeout(
				() => {
					setUrgents(pev => { return [...pev].map((each_, i_) => (i === i_ ? true : each_)) });
				},
				calTime(each) + 1000);
			idRef.current.push(id);
		});
		data.forEach((each, i) => {
			//change the urgent states witin timeout elaps
			const id = setTimeout(
				() => {
					setPassEvents(pev => { return [...pev].map((each_, i_) => (i === i_ ? true : each_)) });
				},
				calTimePassEvent(each));
			idPassRef.current.push(id);
		});
	};

	const GetTodos = async () => {
		await fetch(api_base + '/api/todos', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			// credentials: 'include',
			body: JSON.stringify({
				user: currentUserName
			})
		})
			.then(res => res.json())
			.then(data => {
				//init urgents and todos
				console.log(data);
				setUrgents(Array(data.length).fill(false));
				setPassEvents(Array(data.length).fill(false));
				setTodos(data);
				setIsPending(false);
			})
			.catch((err) => console.log("Error: ", err));
	}

	const completeTodo = async id => {
		const data = await fetch(api_base + '/api/todo/complete/' + id).then(res => res.json());
		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}
			return todo;
		}));
	}

	//cal elapsted time for scheduling the timeout event
	const calTime = (data) => {
		const elapst = new Date(data.starttime) - new Date();
		if (elapst < 120000 && elapst > 0) {
			return 0;
		}
		else if (elapst < 0) {
			return 10000000000;
		}
		else {
			return elapst - 120000;
		}
	}

	const calTimePassEvent = (data) => {
		const elapst = new Date(data.starttime) - new Date();
		if (elapst > 0) {
			return elapst + 120000;
		}
		else if (elapst < 0) {
			return 0;
		}
	}

	const register = async () => {
		const state = await Axios({
			url: api_base + "/api/todo/register",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			// credentials: 'include',
			data: {
				user: newUserName,
				password: newPassword
			}
		}).then(res => {
			setRegisterState(res.data.msg);
			return res.data.state
		}).catch(
			(err) => console.log("Error: ", err)
		);
		state && setTimeout(() => {
			setPopupActiveRegister(false);
			setRegisterState('');
			setNewPassword('');
			setNewUserName('');
		}, 2000);
	}

	const addTodo_axios = async () => {
		const data = await Axios({
			url: api_base + "/api/todo/new",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			withcredentials: true,
			data: {
				text: newTodo,
				starttime: startTime,
				user: currentUserName
			}
		}).then(res => res.data)
			.catch((err) => console.log("Error: ", err));
		// console.log(data);
		//whenever add new items, just append to the end without reordering
		setTodos([...todos, data]);
		setUrgents([...urgents, false]);
		setPassEvents([...passEvents, false]);
		setPopupActive(false);
		setNewTodo("");
	}

	const addTodo = async () => {
		const data = await fetch(api_base + "/api/todo/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			// credentials: 'include',
			body: JSON.stringify({
				text: newTodo,
				starttime: startTime,
				user: currentUserName
			})
		}).then(res => res.json())
			.catch((err) => console.log("Error: ", err));
		// console.log(data);
		//whenever add new items, just append to the end without reordering
		setTodos([...todos, data]);
		setUrgents([...urgents, false]);
		setPassEvents([...passEvents, false]);
		setPopupActive(false);
		setNewTodo("");
	}

	const deleteTodo = async id => {
		const data = await fetch(api_base + '/api/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());
		idRef.current.forEach(each => clearTimeout(each));
		idRef.current = [];
		const newUrgents = [];
		const newPassEvents = [];
		todos.forEach((each, i) => {
			if (each._id !== id) {
				newUrgents.push(urgents[i]);
				newPassEvents.push(passEvents[i]);
			}
		})
		setUrgents(newUrgents);
		setPassEvents(newPassEvents);
		setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
	}

	return (
		<div className="App">
			<h1>Welcome, {currentUserName}{!loginState && !popupActiveLogin && "please login your account to continue"}!</h1>
			<h4>Your tasks</h4>
			{isPending && <div>Loading data ...</div>}
			{!isPending && <Todo todos={todos} completeTodo={completeTodo} deleteTodo={deleteTodo} urgents={urgents} passEvents={passEvents} />}
			{!isPending && <p className='test'>You have {todos.filter(todo => !todo.complete).length} tasks left to do!</p>}
			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
			<div className="login" onClick={() => setPopupActiveLogin(true)}>{loginState ? "Logout" : "Login"}</div>
			<div className="register" onClick={() => setPopupActiveRegister(true)}>Register</div>
			<Popup popupActive={popupActive}
				setPopupActive={setPopupActive}
				setNewTodo={setNewTodo}
				newTodo={newTodo}
				addTodo={addTodo_axios}
				setStartTime={setStartTime} />

			<Login popupActiveLogin={popupActiveLogin}
				setPopupActiveLogin={setPopupActiveLogin}
				setCurrentUserName={setCurrentUserName}
				currentUserName={currentUserName}
				login={login}
				logout={logout}
				loginState={loginState}
				loginMsg={loginMsg}
				setCurrentPassword={setCurrentPassword} />

			<Register popupActiveRegister={popupActiveRegister}
				setPopupActiveRegister={setPopupActiveRegister}
				setNewUserName={setNewUserName}
				newUserName={newUserName}
				register={register}
				registerState={registerState}
				setNewPassword={setNewPassword} />
		</div>
	);
}

export default App;