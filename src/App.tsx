import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import jsCookie from 'js-cookie';
import Login from './Pages/Login/Login'
import Dashboard from './Pages/Dashboard/Dashboard'
import Home from './Pages/Home/Home';
import StorePage from './Pages/Store/Store';


function App() {
let accessToken =  jsCookie.get('token')
let userRole = jsCookie.get('role')
  return (
    <Router>
        <Routes>
        {accessToken ? (
            <>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/login" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/store" element={<StorePage />} />
                {userRole != 'SHO' ? (
                    <>
                        <Route path="/home" element={<Home />} />
                    </> 
                    ) : (
                    <>
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </>
                )}
            </>
            ) : (
            <>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Login />} />
            </>
        )}
        </Routes>
    </Router>
    );
}

export default App
