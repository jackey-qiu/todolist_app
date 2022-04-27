import Axios from "axios";
const api_base = 'http://localhost:3001'

async function completeTodo (id, todos, setTodos) {
    const data = await fetch(api_base + '/api/todo/complete/' + id).then(res => res.json());
    setTodos(todos => todos.map(todo => {
        if (todo._id === data._id) {
            todo.complete = data.complete;
        }
        return todo;
    }));
};

async function deleteTodo(id, todos, setTodos, idRef, urgents,setUrgents, passEvents,setPassEvents) {
    const data = await fetch(api_base + '/api/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());
    idRef.current.forEach(each => clearTimeout(each));
    idRef.current = [];
    const newUrgents = [];
    const newPassEvents = [];
    todos.forEach((each, i) => {
        if (each._id !== id) {
            newUrgents.push(urgents[i]);
            newPassEvents.push(passEvents[i]);
        }
    })
    setUrgents(newUrgents);
    setPassEvents(newPassEvents);
    setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
};

async function addTodo (newTodo, startTime, currentUserName, todos, setTodos, urgents, setUrgents, passEvents, setPassEvents, setNewTodo) {
    const data = await Axios({
        url: api_base + "/api/todo/new",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        withcredentials: true,
        data: {
            text: newTodo,
            starttime: startTime,
            user: currentUserName
        }
    }).then(res => res.data)
        .catch((err) => console.log("Error: ", err));
    // console.log(data);
    //whenever add new items, just append to the end without reordering
    setTodos([...todos, data]);
    setUrgents([...urgents, false]);
    setPassEvents([...passEvents, false]);
    setNewTodo("");
};

const register = async (userName, password) => {
    const res = await Axios({
        url: api_base + "/api/todo/register",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // credentials: 'include',
        data: {
            user: userName,
            password: password
        }
    }).then(res => {
        return {state:res.data.state, msg: res.data.msg}
    }).catch(
        (err) => console.log("Error: ", err)
    );
    return res
};
    
async function getTodos(currentUserName, state) {
    if(!state){return []}
    const data = await fetch(api_base + '/api/todos', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // credentials: 'include',
        body: JSON.stringify({
            user: currentUserName
        })
    })
        .then(res => res.json())
        .then(data=>data)
        .catch((err) => console.log("Error: ", err));
    return data;
}

async function addOneTodo(newTodo, startTime, currentUserName){
    const data = await Axios({
        url: api_base + "/api/todo/new",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        withcredentials: true,
        data: {
            text: newTodo,
            starttime: startTime,
            user: currentUserName
        }
    }).then(res => res.data)
        .catch((err) => console.log("Error: ", err));
    // console.log(data);
    //whenever add new items, just append to the end without reordering
    return data
}

export {
    completeTodo,
    deleteTodo,
    addTodo,
    addOneTodo,
    getTodos,
    register,
    api_base,
}