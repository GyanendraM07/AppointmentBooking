import React from "react";
import { BrowserRouter ,Route,Routes, Navigate} from "react-router-dom";
import Login from './Components/backendportal/Login';
import AdminDashBoard from './Components/backendportal/superadmin/AdminDashboard';
import Appointment from "./Components/patientportal/Appointment";
import { store } from '../src/Components/redux/store';
import WelcomeAdmin from "./Components/backendportal/superadmin/WelcomeAdmin";
import UserDashboard from "./Components/backendportal/userportal/UserDashboard";
import Demo from "./Components/backendportal/userportal/Demo";

function isAuthenticated() {
  // Access the Redux store state
  const storeState = store.getState();
  // Check if the user property is not null
  const isLoggedIn = !!storeState.user;
  return isLoggedIn;
}

// PrivateRoute component for authenticated routes
const PrivateRoute = ({ element: Element, path }) => {
  return isAuthenticated() ? (
    <Element />
  ) : (
    <Navigate to="/" state={{ from: path }}/>
  );
};
function App() {
  return (

    <BrowserRouter>
      <Routes>
      <Route path="/apr" Component={Appointment } />
        <Route path="/" Component={Login } />
        <Route path="/user_dash"  element={<PrivateRoute element={UserDashboard} path="/user_dash" />}/>
        <Route path="/login" Component={Login } />
         <Route path="/welcomeAdmin" Component={WelcomeAdmin} />
         <Route path="/demo" Component={UserDashboard} />
        <Route
          path="/dash"
          element={<PrivateRoute element={AdminDashBoard} path="/dash" />}
        /> 
        {/* <Route path="/dash" Component={dashboard} />
        <Route path="dash/home" Component={Home} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
