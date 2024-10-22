import React, { useState } from 'react';
import axios from 'axios';

const CombineRules = () => {
    const [selectedRules, setSelectedRules] = useState([]);
    const [operator, setOperator] = useState('AND');
    const [combinedRule, setCombinedRule] = useState(null);

    // Sample rule data (you can replace this with actual rule IDs or names)
    const rules = [
        { id: 'rule1', name: 'Rule 1' },
        { id: 'rule2', name: 'Rule 2' }
    ];

    // Handle checkbox toggle for selecting rules
    const handleRuleSelection = (ruleId) => {
        if (selectedRules.includes(ruleId)) {
            setSelectedRules(selectedRules.filter(rule => rule !== ruleId));
        } else {
            setSelectedRules([...selectedRules, ruleId]);
        }
    };

    // Handle operator change (AND/OR)
    const handleOperatorChange = (event) => {
        setOperator(event.target.value);
    };

    // Handle combining the selected rules
    const handleCombineRules = async () => {
        if (selectedRules.length < 2) {
            alert('Please select at least two rules to combine.');
            return;
        }

        // Prepare the request payload
        const payload = {
            rule1: selectedRules[0],  // Assuming we're combining two rules for simplicity
            rule2: selectedRules[1],
            operator: operator
        };

        try {
            // Send the selected rules and operator to the backend API
            const response = await axios.post('http://localhost:8080/api/rules/combine_rules', payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            setCombinedRule(response.data); // Set the combined rule in state
            console.log('Combined Rule:', response.data);
        } catch (error) {
            console.error('Error combining rules:', error);
        }
    };

    return (
        <div>
            <h2>Combine Rules</h2>
            
            {/* Display checkboxes for available rules */}
            {rules.map(rule => (
                <label key={rule.id}>
                    <input 
                        type="checkbox"
                        checked={selectedRules.includes(rule.id)}
                        onChange={() => handleRuleSelection(rule.id)} 
                    />
                    {rule.name}
                </label>
            ))}
            
            {/* Operator selection (AND/OR) */}
            <div>
                <label>
                    <input 
                        type="radio" 
                        value="AND" 
                        checked={operator === 'AND'}
                        onChange={handleOperatorChange} 
                    />
                    AND
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="OR" 
                        checked={operator === 'OR'}
                        onChange={handleOperatorChange} 
                    />
                    OR
                </label>
            </div>
            
            {/* Combine rules button */}
            <button onClick={handleCombineRules}>Combine Selected Rules</button>

            {/* Display the combined rule */}
            {combinedRule && (
                <div>
                    <h3>Combined Rule:</h3>
                    <p>{JSON.stringify(combinedRule)}</p>
                </div>
            )}
        </div>
    );
};

export default CombineRules;
