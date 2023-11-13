import './App.css';
import React, { useState } from 'react';
import { evaluate } from 'mathjs';

function App() {
  const [input, setInput] = useState('');

  const handleResult = () => {
    try {
      const result = evaluate(input);
      setInput(result.toString());
    } catch (error) {
      setInput('Error');
    }
  };

  const handleNumber = (value) => {
    setInput((prev) => (prev === '0' ? value : prev + value));
  };

  const handleOperator = (operator) => {
    setInput((prevInput) => {
      const lastChar = prevInput.charAt(prevInput.length - 1);
  
      // Handle the case where the second operator is '-' to create a negative equation
      if (lastChar === '-' && operator === '-') {
        return prevInput; // Do nothing, maintain the current input
      } else if (/[-+*/]$/.test(lastChar) && operator !== '-') {
        // If the last character is an operator (excluding '-'), replace it with the new operator
        return prevInput.slice(0, -1) + operator;
      } else if (/[\d.]$/.test(lastChar) || (lastChar === '-' && !/[-+*/]$/.test(prevInput))) {
        // If the last character is a digit, a decimal point, or the previous operator was a negative sign
        return prevInput + operator;
      } else if (operator === '-' && /[-+*/]$/.test(prevInput)) {
        // Collapse consecutive operators into a single '-'
        return prevInput + '-';
      }
  
      return prevInput;
    });
  };
  
  

  const handleSingleClear = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleAllClear = () => {
    setInput('0');
  };

  const handleDecimal = () => {
    setInput((prev) => {
      const lastChar = prev.charAt(prev.length - 1);

      // Check for the last character to be a digit or an operator
      if (/[\d+*/-]$/.test(lastChar)) {
        // Check if there is already a decimal point in the last number
        const lastNumberParts = prev.split(/[\+\-\*\/]/);
        const lastNumber = lastNumberParts[lastNumberParts.length - 1];
        if (!lastNumber.includes('.')) {
          // If not, add a decimal point
          return prev + '.';
        }
      }

      return prev;
    });
  };

  const handleClick = (value) => {
    if (value === '=') {
      handleResult();
    } else if (value === 'C') {
      handleSingleClear();
    } else if (value === 'AC') {
      handleAllClear();
    } else if (value === '.') {
      handleDecimal();
    } else {
      setInput((prev) => (prev === '0' ? value : prev + value));
    }
  };

  return (
    <>
      <div className="container">
        <input type="text" readOnly value={input} />
        <div id="display">{input}</div>

        <div className="row">
          <button id="clear" onClick={() => handleClick('AC')}>
            AC
          </button>
          <button id="single-clear" onClick={() => handleClick('C')}>
            C
          </button>
          <button id="decimal" onClick={() => handleClick('.')}>
            .
          </button>
          <button id="divide" onClick={() => handleOperator('/')}>
            /
          </button>
        </div>
        <div className="row">
          <button id="seven" onClick={() => handleNumber('7')}>
            7
          </button>
          <button id="eight" onClick={() => handleNumber('8')}>
            8
          </button>
          <button id="nine" onClick={() => handleNumber('9')}>
            9
          </button>
          <button id="multiply" onClick={() => handleOperator('*')}>
            X
          </button>
        </div>
        <div className="row">
          <button id="four" onClick={() => handleNumber('4')}>
            4
          </button>
          <button id="five" onClick={() => handleNumber('5')}>
            5
          </button>
          <button id="six" onClick={() => handleNumber('6')}>
            6
          </button>
          <button id="add" onClick={() => handleOperator('+')}>
            +
          </button>
        </div>
        <div className="row">
          <button id="one" onClick={() => handleNumber('1')}>
            1
          </button>
          <button id="two" onClick={() => handleNumber('2')}>
            2
          </button>
          <button id="three" onClick={() => handleNumber('3')}>
            3
          </button>
          <button id="subtract" onClick={() => handleOperator('-')}>
            -
          </button>
        </div>
        <div className="row">
          <button id="zero" onClick={() => handleNumber('0')}>
            0
          </button>
          <button id="equals" onClick={() => handleClick('=')}>
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
