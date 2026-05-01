import React from 'react';
import {BrowserRouter as Router ,Routes,Route,Navigate, BrowserRouter} from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
const App = () => {
  const isAuthenticated = false;
  const loading = false;
  if(loading){
  return (
     <div className='bg-black'>
       <p>loading</p>
     </div>
  );
} return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route element={<ProtectedRoute/>}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </BrowserRouter>
);
}
export default App;
