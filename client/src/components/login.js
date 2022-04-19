export default function login({ popupActiveLogin, setPopupActiveLogin, setCurrentUserName, currentUserName, login, logout, loginState, loginMsg, setCurrentPassword }) {
	if (!popupActiveLogin) {
		return ""
	} else {
		return (
			<div className="popup">
				<div className="closePopup" onClick={() => setPopupActiveLogin(false)}>X</div>
				<div className="content">
					<h3>User Name</h3>
					{loginState && <input autoFocus type="text" className="add-todo-input" onChange={e => setCurrentUserName(e.target.value)} value={currentUserName} readOnly />}
					{!loginState && <input autoFocus type="text" className="add-todo-input" onChange={e => setCurrentUserName(e.target.value)} value={currentUserName} />}
					{!loginState && <label htmlFor="meeting-time"><h3>password:</h3></label>}
					{!loginState && <input type="password" className="add-todo-input" id="password" onChange={e => setCurrentPassword(e.target.value)}></input>}
					<p>{loginMsg}</p>
					{loginState ? <div className="button" onClick={logout}>Logout</div> : <div className="button" onClick={login}>Login</div>}
				</div>
			</div>
		)
	}
}