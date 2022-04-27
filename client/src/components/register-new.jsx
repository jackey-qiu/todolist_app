import {useState} from 'react';
import {register} from '../pages/user/api-funcs';
import {useNavigate} from 'react-router-dom'
export default function Register(props) {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState("");
    const registerAPI = async()=>{
        const res = await register(userName, password);
        setRegisterStatus(res);
        res.state && setTimeout(()=>{navigate('/login')},2000)
    }
    return (
        <div className="popup">
            <div className="content">
                <h3>User Name</h3>
                <input autoFocus type="text" className="add-todo-input" onChange={e => setUserName(e.target.value)} value={userName} />
                <label htmlFor="meeting-time"><h3>password:</h3></label>
                <input type="password" className="add-todo-input" onChange={e => setPassword(e.target.value)}></input>
                <p>{registerStatus?.msg}</p>
                <div className="button" onClick={registerAPI}>Register</div>
            </div>
        </div>
    )
	}