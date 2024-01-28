// import Header from './components/Header'
import './App.css';
import { BrowserRouter as Router,Route,Routes }  from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer />
    <Router>
      {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
      </Router>
    </>
  );
}

export default App;
