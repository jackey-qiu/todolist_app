import "./narbar.scss";
import { Link, useParams } from 'react-router-dom';
import {useAuth} from './credentialContext'
function NarBar(props) {
	const parms = useParams();
	const {loginInfo} = useAuth();
	return (
		<div className="narbar">
			<h1>Welcome, {loginInfo.userName}!</h1>
			<div className='items'>
				<Link to="/register" style={{ textDecoration: "none" }}>
					<span className="register">register</span>
				</Link>
				<Link to="/login" style={{ textDecoration: "none" }}>
					<span className="login">{loginInfo.loginState?"logout":"login"}</span>
				</Link>
				{parms.id && 
				<Link to={`/user/${parms.id}/add`} style={{ textDecoration: "none" }}>
					<span className="addPopup">add</span>
				</Link>}
			</div>
		</div>)
}

export default NarBar;