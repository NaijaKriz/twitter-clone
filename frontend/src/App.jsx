
import { Navigate, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/auth/signup/SignupPage';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
import Sidebar from './components/common/SideBar';
import RightPanel from './components/common/RightPanel';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';


function App() {
    const {data: authUser, isloading} = useQuery({
      queryKey: ['authUser'],
      queryFn: async() => {
        try {
          const res = await fetch('/api/auth/me');
          const data = await res.json();
          if(data.error)  return null
          if(!res.ok) {
            throw new Error(data.message || 'Something went wrong');
          }
          return data;
        } catch (error) {
          throw new Error(error)
        }   
      },
      retry:false,
    });

    if(isloading) {
      return(
        <div className='flex justify-center items-center h-screen'>
          <LoadingSpinner size='lg' />
        </div>
      )
    }
  return (
    <>
      <div className="flex max-w-6xl mx-auto">
        {/* common components cus its not wrapped inside routes */}
        {authUser && <Sidebar />}
          <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
            <Route path="/notifications" element={authUser ?<NotificationPage /> : <Navigate to="/login" />} />
            <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          </Routes>
        {authUser && <RightPanel />}
        <Toaster />
      </div>
    </>
  )
}

export default App
