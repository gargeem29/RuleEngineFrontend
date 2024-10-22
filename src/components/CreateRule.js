import React, { useState } from 'react';
import axios from 'axios';

const CreateRule = () => {
    const [conditions, setConditions] = useState([{ field: '', operator: '', value: '' }]);
    const [rule, setRule] = useState(null);

    // Add a new condition row
    const addCondition = () => {
        setConditions([...conditions, { field: '', operator: '', value: '' }]);
    };

    // Update condition inputs
    const handleConditionChange = (index, field, value) => {
        const newConditions = [...conditions];
        newConditions[index][field] = value;
        setConditions(newConditions);
    };

    // Generate rule string and send it to the backend
    const handleCreateRule = async () => {
        // Construct the rule string
        const ruleString = conditions
            .map(cond => `${cond.field} ${cond.operator} '${cond.value}'`)
            .join(' AND '); // Example: "age > 30 AND department = 'Sales'"
    
        try {
            // Send the rule string to the backend API in JSON format
            const response = await axios.post('http://localhost:8080/api/rules/create_rule', 
                { rule: ruleString }, // Send as a JSON object with a "rule" field
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setRule(response.data); // Store the created rule in state
            console.log('Created Rule:', response.data);
        } catch (error) {
            console.error('Error creating rule:', error);
        }
    };
    

    return (
        <div>
            <h2>Create Rule</h2>
            {conditions.map((condition, index) => (
                <div key={index}>
                    <input 
                        type="text" 
                        placeholder="Field" 
                        value={condition.field}
                        onChange={(e) => handleConditionChange(index, 'field', e.target.value)}
                    />
                    <select
                        value={condition.operator}
                        onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
                    >
                        <option value="">Operator</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value="=">=</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Value" 
                        value={condition.value}
                        onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                    />
                </div>
            ))}
            <button onClick={addCondition}>Add Condition</button>
            <button onClick={handleCreateRule}>Create Rule</button>
            {rule && <div>Created Rule: {JSON.stringify(rule)}</div>}
        </div>
    );
};

export default CreateRule;
