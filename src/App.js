import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRules';
import EvaluateRule from './components/EvaluateRule';

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create-rule" element={<CreateRule />} />
                <Route path="/combine-rules" element={<CombineRules />} />
                <Route path="/evaluate-rule" element={<EvaluateRule />} />
            </Routes>
        </div>
    );
}

export default App;
