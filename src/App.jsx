import './App.css';
import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleOperator = (operator) => {
    if (input) {
      if (input[input.length - 1] === '-' && operator === '-') {
        // Allow negative numbers but not multiple "-"
        return;
      }
      setInput((prevInput) => prevInput + operator);
    }
  };

  const handleEquals = () => {
    try {
      const result = eval(input);
      setOutput(result.toString());
    } catch (error) {
      setOutput('Error');
    }
  };

  const handleAllClear = () => {
    setInput('');
    setOutput('');
  };

  const handleClear = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleNumber = (value) => {
    if (value === '0' && input === '0') {
      return;
    }

    if (
      (value === '0' && input.length === 0) ||
      (value !== '0' && !isNaN(parseInt(value)))
    ) {
      setInput((prevInput) => prevInput + value);
    }
  };

  const handleDecimal = () => {
    if (!input.includes('.') && input !== '' && !isNaN(input[input.length - 1])) {
      setInput((prevInput) => prevInput + '.');
    }
  };

  const handleClick = (value) => {
    if (value === '=') {
      handleEquals();
    } else if (value === 'C') {
      handleClear();
    } else if (value === 'AC') {
      handleAllClear();
    } else if (!isNaN(parseInt(value))) {
      handleNumber(value);
    } else if (value === '.') {
      handleDecimal();
    } else {
      handleOperator(value);
    }
  };

  return (
    <>
      <div className="container">
        <input type="text" readOnly value={input} />
        <div id="display">{output || '0'}</div>

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
