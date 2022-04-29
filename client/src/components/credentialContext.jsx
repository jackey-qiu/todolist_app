import { createContext, useState, useContext } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
const api_base = 'http://localhost:3001';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        userName: '',
        password: null,
        loginMsg: 'logged out',
        loginState: false
    })

    const handleLogin = async () => {
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
                setTimeout(() => navigate(`/user/${loginInfo.userName}`), 2000);
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
            setLoginInfo((pre) => { return { ...pre, loginMsg: "logged out", loginState: false, password: null } })
            navigate('/login')
        }).catch(
            (err) => console.log("Error: ", err)
        );
    };

    const value = {
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