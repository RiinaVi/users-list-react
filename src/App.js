import React from 'react';
import './style/App.css';
import Months from './components/months/Months';

function App() {
    return (
        <div className="App">
            <h1>Users list:</h1>
            <Months/>
        </div>
    );
}

export default App;
