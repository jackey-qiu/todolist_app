import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from './pages/home/home-page';
import Login from './pages/login/login-page';

function App() {
	const [currentUserName, setCurrentUserName] = useState("");
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Home currentUserName={currentUserName} />} />
					<Route path="login" element={<Login currentUserName={currentUserName} setCurrentUserName={setCurrentUserName} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App;