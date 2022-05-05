import NarBar from "../../components/narbar"
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from "../../components/credentialContext"
const api_base = 'http://localhost:3001';

const LoginPage = (props) => {
	const { loginInfo, setLoginInfo, onLogin, onLogout } = useAuth();
	const navigate = useNavigate();
	// const [loginMsg, setLoginMsg] = useState('');
	// const [currentPassword, setCurrentPassword] = useState('');
	// const [loginState, setLoginState] = useState(false);

	//API request for authentication
	// const loginRequest_ = async () => {
	// 	await Axios({
	// 		url: api_base + "/api/todo/login",
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json"
	// 		},
	// 		// credentials: 'include',
	// 		data: {
	// 			user: props.currentUserName,
	// 			password: currentPassword
	// 		}
	// 	}).then(res => {
	// 		//setRegisterState(res.data.msg);
	// 		//return res.data.state
	// 		setLoginMsg(res.data.message);
	// 		if (res.data.status) {
	// 			setTimeout(()=>{navigate(`/user/${props.currentUserName}`,{state:true})},2000);
	// 		} else {
	// 			props.setCurrentUserName('')
	// 		}
	// 	}).catch(
	// 		(err) => console.log("Error: ", err)
	// 	);
	// };

	return (
		<div>
			<NarBar currentUserName={loginInfo.userName} />
			<Login
				loginInfo={loginInfo}
				setLoginInfo={setLoginInfo}
				loginRequest={onLogin}
				logoutRequest={onLogout} />
		</div>
	)
};

//Login component
function Login({ loginInfo, setLoginInfo, loginRequest, logoutRequest }) {
	return (
		<div className="popup">
			<div className="content">
				<h3>User Name</h3>
				<input autoFocus type="text" className="add-todo-input" onChange={e => setLoginInfo(pre => { return { ...pre, userName: e.target.value } })} value={loginInfo.userName} />
				<label htmlFor="meeting-time"><h3>password:</h3></label>
				<input type="password" className="add-todo-input" id="password" onChange={e => setLoginInfo(pre => { return { ...pre, password: e.target.value } })}></input>
				<p>{loginInfo.loginMsg}</p>
				<div className="buttons" style={{ display: "flex", justifyContent: "space-between" }}>
					{!loginInfo.loginState && <div className="button" onClick={loginRequest}>Login</div>}
					{loginInfo.loginState && <div className="button" onClick={logoutRequest}>Logout</div>}
				</div>
			</div>
		</div>
	)
}

export default LoginPage
