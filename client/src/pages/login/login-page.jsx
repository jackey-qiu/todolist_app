import NarBar from "../../components/narbar"
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const api_base = 'http://localhost:3001';

const LoginPage = (props) => {
	const navigate = useNavigate();
	const [loginMsg, setLoginMsg] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');

	//API request for authentication
	const loginRequest = async () => {
		await Axios({
			url: api_base + "/api/todo/login",
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			// credentials: 'include',
			data: {
				user: props.currentUserName,
				password: currentPassword
			}
		}).then(res => {
			//setRegisterState(res.data.msg);
			//return res.data.state
			setLoginMsg(res.data.message);
			if (res.data.status) {
				navigate('/home')
			} else {
				props.setCurrentUserName('')
			}
		}).catch(
			(err) => console.log("Error: ", err)
		);
	};

	return (
		<div>
			<NarBar currentUserName={props.currentUserName} />
			<Login
				setCurrentUserName={props.setCurrentUserName}
				currentUserName={props.currentUserName}
				loginMsg={loginMsg}
				loginRequest={loginRequest}
				setCurrentPassword={setCurrentPassword} />
		</div>
	)
};

//Login component
function Login({ setCurrentUserName, currentUserName, loginMsg, loginRequest, setCurrentPassword }) {
	return (
		<div className="popup">
			<div className="content">
				<h3>User Name</h3>
				<input autoFocus type="text" className="add-todo-input" onChange={e => setCurrentUserName(e.target.value)} value={currentUserName} />
				<label htmlFor="meeting-time"><h3>password:</h3></label>
				<input type="password" className="add-todo-input" id="password" onChange={e => setCurrentPassword(e.target.value)}></input>
				<p>{loginMsg}</p>
				<div className="button" onClick={loginRequest}>Login</div>
			</div>
		</div>
	)
}

export default LoginPage
