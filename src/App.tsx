import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          hi, To see the component demo click below
        </p>
        <Link
          className="App-link"
          to="/company-settings/user"
        >
          Demo
        </Link>
      </header>
    </div>
  );
}

export default App;
