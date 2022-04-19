export default function register({ popupActiveRegister, setPopupActiveRegister, setNewUserName, newUserName, register, registerState, setNewPassword }) {
	if (!popupActiveRegister) {
		return ""
	} else {
		return (
			<div className="popup">
				<div className="closePopup" onClick={() => setPopupActiveRegister(false)}>X</div>
				<div className="content">
					<h3>User Name</h3>
					<input autoFocus type="text" className="add-todo-input" onChange={e => setNewUserName(e.target.value)} value={newUserName} />
					<label htmlFor="meeting-time"><h3>password:</h3></label>
					<input type="password" className="add-todo-input" onChange={e => setNewPassword(e.target.value)}></input>
					<p>{registerState}</p>
					<div className="button" onClick={register}>Register</div>
				</div>
			</div>
		)
	}
}