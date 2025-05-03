import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import router from './routes/router';

const App = () => {
  // State for user authentication (would normally be handled by a context or similar)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });

  return (
    <Router>
      <Routes>
        {
          router.map((route, index) => {
            const Page = route.page;
            return(
              <Route 
                key={index} 
                path={route.path} 
                element={
                  <Page 
                    isLoggedIn={isLoggedIn} 
                    userData={userData}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserData={setUserData}
                  />
                }
              />
            );
          })
        }
      </Routes>
    </Router>
  );
};

export default App;