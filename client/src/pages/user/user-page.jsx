import NarBar from "../../components/narbar"
import Todo from "../../components/Todo-new"
import {useAuth} from "../../components/credentialContext"
import AddNewTodo from "../../components/Add-todo"
import {getTodos} from "./api-funcs"
import {scheduleEvent} from "./util-funcs"
import { useParams, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const User = ()=>{
    const {loginInfo} = useAuth();
	const [loginState, setLoginState] = useState(false);
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [startTime, setStartTime] = useState("");
	const [urgents, setUrgents] = useState([]);
	const [passEvents, setPassEvents] = useState([]);
    const idRef = useRef([]);
	const idPassRef = useRef([])
    const params = useParams();
    // const [addingState, setAddingState] = false;
    let {state} = useLocation();

    // const state = state0!==null?state0:{state:false}
    // console.log({state});
    useEffect(()=>{
        getTodos(params.id, loginInfo.loginState).then((data)=>{
            setUrgents(Array(data.length).fill(false));
            setPassEvents(Array(data.length).fill(false));
            setTodos(data);
        })
    }, [])

    	//reschedule events whenever update of todos
	useEffect(() => {
		scheduleEvent(todos,idRef, idPassRef, setUrgents, setPassEvents);
		//here cleanup the scheduled timeout events
		return () => {
			idRef.current.forEach((each) => { clearTimeout(each) });
			idPassRef.current.forEach((each) => { clearTimeout(each) });
		};
	}, [todos]);

    return (
        <div>
            <NarBar currentUserName={loginInfo.loginState?loginInfo.userName:`${params.id} please login first`}/>
			<h4>Your tasks are listed below</h4>
            <Todo todos={todos}
             setTodos= {setTodos} 
             idRef={idRef}
             urgents={urgents} 
             setUrgents={setUrgents} 
             passEvents={passEvents} 
             setPassEvents={setPassEvents} />
             <p className='test'>You have {todos.filter(todo => !todo.complete).length} tasks left to do!</p>
             {/* {addingState && <AddNewTodo newTodo={newTodo}
                                         setNewTodo={setNewTodo}
                                         startTime={startTime}
                                         setStartTime={setStartTime}
                                         currentUserName={params.id} 
                                         todos={todos}
                                         setTodos={setTodos} 
                                         urgents={urgents}
                                         setUrgents={setUrgents}
                                         passEvents={passEvents}
                                         setPassEvents={setPassEvents}/>} */}
        </div>
    )
};

export default User;