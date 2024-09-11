import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Migration from './pages/Migration';

import logo from './logo.svg';

import './App.css';


const App: React.FC = () => {
    return {
        <Router>
            <div className="App">
                <Switch>
                    <Router exact path="/" component={Migration} />
                </Switch>
            </div>
        </Router>
    };
};


export default App;
