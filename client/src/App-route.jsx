import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from './pages/home/home-page';
import Login from './pages/login/login-page';
import User from './pages/user/user-page';
import Register from './components/register-new';
import Add from './pages/add/add-new-task';
import {AuthProvider} from './components/credentialContext'

function App() {
	// const [currentUserName, setCurrentUserName] = useState("");
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						{/* <Route path="register" element={(<div>Hello</div>)} /> */}
						<Route path="register" element={<Register />} />
						<Route path="user/:id" element={<User />}/>
						<Route path="user/:id/add" element={<Add />}/>
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>

	)
}

export default App;