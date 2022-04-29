import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home-page';
import Login from './pages/login/login-page';
import User from './pages/user/user-page';
import Task from './pages/user/task-detail';
import Register from './components/register-new';
import { AuthProvider } from './components/credentialContext'

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="user/:id" element={<User />}>
							<Route path=":taskId" element={<Task />} />
							<Route index element={(<h1>Click one task from the task list.</h1>)} />
						</Route>
					</Route>
				</Routes>
			</AuthProvider>
		</BrowserRouter>

	)
}

export default App;