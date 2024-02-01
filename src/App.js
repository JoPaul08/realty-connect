import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Realtor from './components/Realtor';
import Property from './components/Property';
import AddRealtor from './components/AddRealtor';
import AddProperty from './components/AddProperty';
import UpdateRealtor from './components/UpdateRealtor';
import UpdateProperty from './components/UpdateProperty';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/realtor" Component={Realtor} />
        <Route path="/property" Comopnent={Property} /> 
        <Route path="/addrealtor" Component={AddRealtor} />
        <Route path="/addproperty" Component={AddProperty} />
        <Route path="/updaterealtor/:id" Component={UpdateRealtor} />
        <Route path="/updateproperty/:id" Component={UpdateProperty} />
        <Route Component={NotFound} /> {/* This acts as a fallback for any unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
