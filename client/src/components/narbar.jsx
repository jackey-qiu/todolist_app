import "./narbar.scss";
import { Link } from 'react-router-dom';
function NarBar(props) {
	return (
		<div className="narbar">
			<h1>Welcome, {props.currentUserName}!</h1>
			<div className='items'>
				<Link to="/register" style={{ textDecoration: "none" }}>
					<span className="register">register</span>
				</Link>
				<Link to="/login" style={{ textDecoration: "none" }}>
					<span className="login">login</span>
				</Link>
				<Link to="/add" style={{ textDecoration: "none" }}>
					<span className="addPopup">add</span>
				</Link>
			</div>
		</div>)
}

export default NarBar;