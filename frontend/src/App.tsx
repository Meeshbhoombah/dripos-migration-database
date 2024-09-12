import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Migration from './pages/Migration';

import logo from './logo.svg';

import './App.css';


const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Migration />} />
                </Routes>
            </div>
        </Router>
    );
};


export default App;
