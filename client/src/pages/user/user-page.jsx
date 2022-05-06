import NarBar from "../../components/narbar"
import "./user.scss";
import Todo from "../../components/Todo-new"
import AddTodo from "../../components/Add-todo"
import { useAuth } from "../../components/credentialContext"
import { updateUsers } from "./api-funcs"
import { scheduleEvent } from "./util-funcs"
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const User = () => {
    const { loginInfo, todos, setTodos } = useAuth();
    //const [todos, setTodos] = useState([]);
    const [urgents, setUrgents] = useState([]);
    const [passEvents, setPassEvents] = useState([]);
    const idRef = useRef([]);
    const idPassRef = useRef([])
    const params = useParams();
    const [searchItem, setSearchItem] = useState("");

    // useEffect(() => {
    //     getTodos(params.id, loginInfo.loginState).then((data) => {
    //         setUrgents(Array(data.length).fill(false));
    //         setPassEvents(Array(data.length).fill(false));
    //         setTodos(data);
    //     })
    // }, [])

    useEffect(() => {
        setUrgents(Array(todos.length).fill(false));
        setPassEvents(Array(todos.length).fill(false));

    }, [])

    //reschedule events whenever update of todos
    useEffect(() => {
        scheduleEvent(todos, idRef, idPassRef, setUrgents, setPassEvents);
        localStorage.setItem('todo-app-todos', JSON.stringify(todos));
        //here cleanup the scheduled timeout events
        return () => {
            idRef.current.forEach((each) => { clearTimeout(each) });
            idPassRef.current.forEach((each) => { clearTimeout(each) });
        };
    }, [todos]);

    return (
        <div>
            <NarBar currentUserName={loginInfo.loginState ? loginInfo.userName : `${params.id} please login first`} />
            <h4>Your tasks are listed below</h4>

            <div className="todo-container">
                <div className="todo-item1">
                    <div className="header">
                        <h3 className='count'>You have {todos.filter(todo => !todo.complete).length} tasks left to do!</h3>
                        {/* <h3 className="add" onClick={() => setPopState(pre => !pre)}>{popState ? "hide" : "add new task"}</h3> */}
                        <input className='search'
                            placeholder="search task..."
                            value={searchItem}
                            onChange={e => setSearchItem(e.target.value)} />
                    </div>
                    <Todo className="todolist" todos={todos}
                        setTodos={setTodos}
                        idRef={idRef}
                        urgents={urgents}
                        setUrgents={setUrgents}
                        passEvents={passEvents}
                        setPassEvents={setPassEvents}
                        searchItem={searchItem} />
                </div>
                <div className="todo-item2">
                    <Outlet context={[todos, setTodos, setUrgents, setPassEvents]} />
                </div>
            </div>

            {/* {popState && <AddTodo className="popupwindow" {...{ todos, setTodos, urgents, setUrgents, passEvents, setPassEvents }} />} */}
        </div>
    )
};

const UserAdmin = () => {
    const { state } = useLocation();
    const { users } = state;
    const [userInfo, setUserInfo] = useState(state.users)
    const [isAdminState, setIsAdminState] = useState(users.map(each => each.isAdmin));
    const [isRightGrantedState, setIsRightGrantedState] = useState(users.map(each => each.rightGranted));
    useEffect(() => {
        setUserInfo(pre => pre.map(
            (each, i) => { return { ...each, isAdmin: isAdminState[i] } }
        ))
    }, [isAdminState]);
    useEffect(() => {
        setUserInfo(pre => pre.map(
            (each, i) => { return { ...each, rightGranted: isRightGrantedState[i] } }
        ))
    }, [isRightGrantedState]);

    return (
        <>
            <h1 className="admin" style={{ "margin": "0px auto", "padding": "30px", "textAlign": "center", "backgroundColor": "green" }}>Admin Page</h1>
            <table style={{ 'backgroundColor': "blue", "width": "80%", "margin": "5px auto" }}>
                <tr className="admin-items" >
                    <th style={{ "textAlign": "left", "padding": "20px", "margin": "10px auto", "backgroundColor": "purple", "width": "auto", "fontSize": "30px" }}>username</th>
                    <th style={{ "textAlign": "left", "padding": "20px", "margin": "10px auto", "backgroundColor": "purple", "width": "auto", "fontSize": "30px" }}>isAdmin</th>
                    <th style={{ "textAlign": "left", "padding": "20px", "margin": "10px auto", "backgroundColor": "purple", "width": "auto", "fontSize": "30px" }}>rightGranted</th>
                </tr>
                {users.map((each, i) => (
                    <tr className="admin-items" key={each._id}>
                        <td style={{ "textAlign": "left", "padding": "20px", "margin": "10px auto", "backgroundColor": "black", "width": "auto" }}>
                            {each.user}
                        </td>
                        <td style={{ "textAlign": "left", "padding": "20px", "margin": "10px auto", "backgroundColor": "black" }}>
                            <input type="checkbox" checked={isAdminState[i] ? "checked" : ''} onChange={() => setIsAdminState(pre => pre.map((item, index) => index === i ? !item : item))} />
                        </td>
                        <td style={{ "textAlign": "left", "padding": "20px", "margin": "10px auto", "backgroundColor": "black" }}>
                            <input type="checkbox" checked={isRightGrantedState[i] ? "checked" : ''} onChange={() => setIsRightGrantedState(pre => pre.map((item, index) => index === i ? !item : item))} />
                        </td>
                    </tr>)
                )}
            </table>
            <div className="button2" onClick={async () => { const result = await updateUsers(userInfo); alert(result) }} style={{ "cursor": "pointer", "borderRadius": "30px", "fontSize": "40px", "display": "flex", "width": "80%", "justifyContent": "center", "backgroundColor": "green", "padding": "20px", "margin": "10px auto" }}>
                UpdateInfo
            </div>
        </>
    )
};

export {
    User,
    UserAdmin
}