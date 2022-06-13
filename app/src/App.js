import React, { useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Notes from './pages/Notes';
import Footer from './components/Footer';
import FormLogin from './components/FormLogin';
import CreateNote from './pages/CreateNote';
import Home from './pages/Home';
import { useAuth } from './context/userContext';
import NavBar from './components/NavBar';


const Container = () => (
  <div className='container'>
    <NavBar />
    <Outlet />
    <Footer />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAutenticated } = useAuth();
  const location = useLocation();
  if (!isAutenticated.token) {
    return <Navigate to="/login" replace state={{ location }} />;
  }
  return children;
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const { isAutenticated, login, logout } = useAuth();

  return (
    <div>
      <Routes>
        <Route element={<Container />} >
          <Route path="/" element={<Home />} />
          <Route path="notes" element={<Notes setNotes={setNotes} notes={notes} />} />
          {/* route note id */}
          <Route path='create-note' element={
            <ProtectedRoute>
              <CreateNote
                setNotes={setNotes}
                notes={notes}
                user={isAutenticated.user}
                handleLogout={logout} />
            </ProtectedRoute>
          }
          />
          <Route path="/login" element={<FormLogin setLogin={login} />} />
        </Route>
      </Routes>

    </div>
  );
};

export default App;