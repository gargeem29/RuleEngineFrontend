import React, { useState } from 'react';
import axios from 'axios';

const EvaluateRule = () => {
    const [data, setData] = useState({});
    const [result, setResult] = useState(null); // State to hold the evaluation result
    const [error, setError] = useState(null); // State to hold error messages
    
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const evaluate = async () => {
        try {
            // Send data to the backend for evaluation
            const response = await axios.post('http://localhost:8080/api/rules/evaluate_rule', {
                data: data,  // Sending the input data
                // Assuming you have the rules to evaluate against (you may want to retrieve these dynamically)
                rules: {
                    // Example structure of rules; replace with actual rules if necessary
                    // 'field': 'age', 'operator': '>', 'value': 30
                }
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Set the evaluation result
            setResult(response.data);
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Error evaluating rule:', err);
            setError('Error evaluating rule. Please check your input and try again.');
            setResult(null); // Clear previous results on error
        }
    };

    return (
        <div>
            <h2>Evaluate Rule</h2>
            <input type="text" name="age" placeholder="Age" onChange={handleChange} />
            <input type="text" name="income" placeholder="Income" onChange={handleChange} />
            <button onClick={evaluate}>Evaluate</button>
            
            {/* Display evaluation result or error */}
            {result !== null && (
                <div>
                    <h3>Evaluation Result:</h3>
                    <p>{result ? 'Rule passed' : 'Rule failed'}</p>
                </div>
            )}
            {error && (
                <div style={{ color: 'red' }}>
                    <h3>Error:</h3>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default EvaluateRule;
