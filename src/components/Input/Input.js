import React from 'react';
import "./input.css";
const Input = ({onChange, value}) => {
    return (
        <textarea
        className="task"
        type = "text" 
        placeholder = "Add a item" 
        value = {value}
        onChange = {onChange}

      />
    );
};

export default Input;