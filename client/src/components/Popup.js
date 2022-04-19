export default function Popup({ popupActive, setPopupActive, setNewTodo, newTodo, addTodo, setStartTime }) {
	if (!popupActive) {
		return ""
	} else {
		return (
			<div className="popup">
				<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
				<div className="content">
					<h3>Add Task</h3>
					<input autoFocus type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
					<label htmlFor="meeting-time"><h3>Choose a time for this event:</h3></label>
					<input type="datetime-local" id="meeting-time" className="meeting-time" onChange={e => setStartTime(e.target.value)}></input>
					<div className="button" onClick={addTodo}>Create Task</div>
				</div>
			</div>
		)
	}
}