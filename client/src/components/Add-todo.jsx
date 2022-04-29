import Axios from "axios";
import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../components/credentialContext';
import { addOneTodo, api_base } from '../pages/user/api-funcs';

export default function AddTodo(props) {
    const { todos, setTodos, urgents, setUrgents, passEvents, setPassEvents } = props;
    const { loginInfo } = useAuth();
    const [newTodo, setNewTodo] = useState('');
    const [startTime, setStartTime] = useState('');
    const [addState, setAddState] = useState('Editing the new task!!');

    const addOne = async () => {
        const data = await addOneTodo(newTodo, startTime, loginInfo.userName);
        console.log(data);
        if (data) {
            setTodos([...todos, data]);
            setUrgents([...urgents, false]);
            setPassEvents([...passEvents, false]);
            setAddState('Successful to add one task!')
            //setTimeout(() => onLogin(), 2000);
        } else {
            setAddState('Fail to add task!')
        }
    }

    return (
        <div className="popup">
            <div className="content">
                <h3>Add Task</h3>
                <input autoFocus type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
                <label htmlFor="meeting-time"><h3>Choose a time for this event:</h3></label>
                <input type="datetime-local" id="meeting-time" className="meeting-time" onChange={e => setStartTime(e.target.value)}></input>
                <p className="text">{addState}</p>
                <div className="button" onClick={addOne}>Create Task</div>
            </div>
        </div>
    )
}

// const addOneTodo_ = async (navigate,params,newTodo, setNewTodo, startTime, currentUserName, todos, setTodos, urgents, setUrgents, passEvents, setPassEvents) => {
//     const data = await Axios({
//         url: api_base + "/api/todo/new",
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         withcredentials: true,
//         data: {
//             text: newTodo,
//             starttime: startTime,
//             user: currentUserName
//         }
//     }).then(res => res.data)
//         .catch((err) => console.log("Error: ", err));
//     // console.log(data);
//     //whenever add new items, just append to the end without reordering
//     setTodos([...todos, data]);
//     setUrgents([...urgents, false]);
//     setPassEvents([...passEvents, false]);
//     setNewTodo("");
//     navigate(`/user/${params.id}`);

// }