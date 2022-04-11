import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import Signup from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './component/Navbar';
import PrivateRoute from './component/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          {/* private route  */}
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
