import'./assets/css/style.css'
import Navbar from './components/Navbar';
import Header from './components/Header';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Contact from './components/Contact';
import PageNotFound from './components/PageNotFound';

import { 
  BrowserRouter as Router , 
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (

   <>
   
   <Router> 
    <Navbar title="SaaS Kit" profile_name="Jack Rayon" />
    <Header />
    {/* <Dashboard/> */}

     <Routes> 
      <Route exact path='/' element={<Dashboard/>} />
      <Route exact path='/task' element={<Tasks/>} />
      <Route exact path='/contact' element={<Contact/>} />
       <Route exact path='/chat' element={<Chat/>} />
       <Route exact path='*' element={<PageNotFound/>} />
    </Routes>
    
    {/* <Deals/> */}
    {/* <Tasks/> */}
   </Router> 
    
   </>
  );
}

export default App;
