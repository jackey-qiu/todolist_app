import NarBar from "../../components/narbar"
import "./user.scss";
import Todo from "../../components/Todo-new"
import AddTodo from "../../components/Add-todo"
import { useAuth } from "../../components/credentialContext"
import { getTodos } from "./api-funcs"
import { scheduleEvent } from "./util-funcs"
import { useParams, Outlet } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const User = () => {
    const { loginInfo } = useAuth();
    const [todos, setTodos] = useState([]);
    const [urgents, setUrgents] = useState([]);
    const [passEvents, setPassEvents] = useState([]);
    const [popState, setPopState] = useState(false);
    const idRef = useRef([]);
    const idPassRef = useRef([])
    const params = useParams();
    const [searchItem, setSearchItem] = useState("");
    // const [addingState, setAddingState] = false;

    // const state = state0!==null?state0:{state:false}
    // console.log({state});
    useEffect(() => {
        getTodos(params.id, loginInfo.loginState).then((data) => {
            setUrgents(Array(data.length).fill(false));
            setPassEvents(Array(data.length).fill(false));
            setTodos(data);
        })
    }, [])

    //reschedule events whenever update of todos
    useEffect(() => {
        scheduleEvent(todos, idRef, idPassRef, setUrgents, setPassEvents);
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
            <div className="header">
                <h3 className='count'>You have {todos.filter(todo => !todo.complete).length} tasks left to do!</h3>
                <h3 className="add" onClick={() => setPopState(pre => !pre)}>{popState ? "hide" : "add new task"}</h3>
                <input className='search'
                    placeholder="search task..."
                    value={searchItem}
                    onChange={e => setSearchItem(e.target.value)} />
            </div>
            <div className="todo-container">
                <div className="todo-item1">
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
                    <Outlet context={[todos]} />
                </div>
            </div>

            {popState && <AddTodo className="popupwindow" {...{ todos, setTodos, urgents, setUrgents, passEvents, setPassEvents }} />}
        </div>
    )
};

export default User;