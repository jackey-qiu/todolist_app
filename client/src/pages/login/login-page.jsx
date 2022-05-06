import NarBar from "../../components/narbar"
import { useAuth } from "../../components/credentialContext"

const LoginPage = (props) => {
	const { loginInfo, setLoginInfo, onLogin, onLogout } = useAuth();

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

const LoginPageAdmin = () => {
	const { loginInfo, setLoginInfo, onLoginAdmin, onLogout } = useAuth();

	return (
		<div>
			<NarBar currentUserName={loginInfo.userName} />
			<Login
				loginInfo={loginInfo}
				setLoginInfo={setLoginInfo}
				loginRequest={onLoginAdmin}
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

export {
	LoginPage,
	LoginPageAdmin,
}
