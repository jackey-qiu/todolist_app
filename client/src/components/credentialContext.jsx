import { createContext, useState, useContext, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
const api_base = 'http://localhost:3001';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todo-app-todos")) || []);
    const [loginInfo, setLoginInfo] = useState(JSON.parse(localStorage.getItem("todo-app-login")) || {
        userName: '',
        password: null,
        loginMsg: 'logged out',
        loginState: false
    });
    // setLoginInfo(JSON.parse(localStorage.getItem("todo-app-user")) || loginInfo)
    //setTodos(JSON.parse(localStorage.getItem("todo-app-todos")) || todos)

    const handleLogin = async () => {
        // setLoginInfo((pre) => { return { ...pre, loginMsg: "login successfully faked msg", loginState: true } });
        // setTimeout(() => navigate(`/user/${loginInfo.userName}`), 2000);
        // return null;
        await Axios({
            url: api_base + "/api/todo/login",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // credentials: 'include',
            data: {
                user: loginInfo.userName,
                password: loginInfo.password
            }
        }).then(res => {
            //setRegisterState(res.data.msg);
            //return res.data.state
            setLoginInfo((pre) => { return { ...pre, loginMsg: res.data.message, loginState: res.data.status } })
            if (res.data.status) {
                setTodos(res.data.todos);
                localStorage.setItem('todo-app-login', JSON.stringify({ ...loginInfo, loginMsg: res.data.message, loginState: res.data.status }));
                setTimeout(() => navigate(`/user/${loginInfo.userName}`), 100);
            } else {
                navigate('/login')
            }
        }).catch(
            (err) => console.log("Error: ", err)
        );
    };

    const handleLogout = () => {
        Axios({
            url: api_base + "/api/todo/logout"
        }).then(res => {
            setLoginInfo((pre) => { return { ...pre, loginMsg: "logged out", loginState: false, password: null } });
            localStorage.removeItem("todo-app-todos");
            localStorage.removeItem("todo-app-login");
            navigate('/login')
        }).catch(
            (err) => console.log("Error: ", err)
        );
    };

    const value = {
        todos,
        setTodos,
        loginInfo,
        setLoginInfo,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export {
    useAuth,
    AuthProvider
}