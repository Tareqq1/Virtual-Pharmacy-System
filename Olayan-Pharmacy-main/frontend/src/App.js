import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Navbar from './components/Navbar';
import PatientHeader from './components/PatientHeader';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import PatientProfile from './pages/PatientProfile';
import Shop from './pages/Shop';

import PharmacistProfile from './pages/PharmacistProfile';
import Medicine from './pages/Medicine';

import AdminProfile from './pages/AdminProfile';
import SaleReport from './pages/SaleReport';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
      <div className="App">
      
        <div className='pages'>        
          <Routes>      
              <Route path='/home' element={<Home />} />
              
              <Route path='/adminProfile' element={<AdminProfile />} />
              
              <Route path='/pharmacistProfile' element ={<PharmacistProfile/>}/>
              <Route path='/medicine' element ={<Medicine/>}/>

              <Route path='/patientProfile' element ={<PatientProfile/>}/>
              <Route path='/shop' element={<Shop/>}/>

              <Route path='/saleReport' element={<SaleReport/>} />
            
          </Routes>
        </div>
      </div>
    </BrowserRouter> 
    
  );
}

export default App;
