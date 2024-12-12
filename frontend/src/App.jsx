import LogInPage from "./pages/auth/login/LogInPage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import HomePage from "./pages/home/HomePage"
import ProfilePage from "./pages/profile/ProfilePage"
import { Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
		<div className='flex max-w-6xl mx-auto'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LogInPage />} />
				<Route path='/profile' element={<ProfilePage />} />
			</Routes>
		</div>
    </>
  )
}

export default App
