import { useState } from "react";
import * as math from "mathjs";

const Calculator = () => {
  const [display, setDisplay] = useState("");

  const handleClick = (value) => {
    // Check if the display is empty and the clicked value is "0"
    if (display === "" && value === "0") {
      // If so, do nothing
      return;
    }

    // Append the value to the display
    setDisplay(display + value);
  };

  const handleDelete = () => {
    setDisplay(display.slice(0, -1));
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleRaise10 = () => {
    // Check if the display already ends with an operator or is empty
    if (display === "" || /[+\-x÷]$/.test(display)) {
      // If so, do nothing
      return;
    }

    // Prompt the user for the exponent value
    const exponent = prompt("Enter the exponent:");

    // Check if the exponent value is not null (i.e., user didn't cancel)
    if (exponent !== null) {
      // Append the exponentiation operator and exponent value to the display
      setDisplay(display + "x10^" + exponent);
    }
  };

  const handleEvaluate = () => {
    if (display === "") {
      // If the display is empty, do nothing
      return;
    }

    try {
      // Check if the expression ends with an operator and remove it
      const lastChar = display.slice(-1);
      const expression =
        lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "x" ||
        lastChar === "÷"
          ? display.slice(0, -1)
          : display;

      // Evaluate the expression and convert the result to a string
      const result = math.evaluate(expression).toString();

      // Check if the result is a valid number and not Infinity
      if (!isNaN(result) && result !== Infinity) {
        setDisplay(result);
      } else {
        throw new Error("Invalid expression");
      }
    } catch (error) {
      // Handle evaluation errors
      if (error.message === "Invalid expression") {
        setDisplay("Error: Invalid expression");
      } else {
        setDisplay("Error: " + error.message);
      }
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button className="del" onClick={handleDelete}>
          DEL
        </button>
        <button className="clear" onClick={handleClear}>
          AC
        </button>
        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button className="operator" onClick={() => handleClick("*")}>
          x
        </button>
        <button className="operator" onClick={() => handleClick("/")}>
          ÷
        </button>
        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button className="operator" onClick={() => handleClick("+")}>
          +
        </button>
        <button className="operator" onClick={() => handleClick("-")}>
          -
        </button>
        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>
        <button className="Raisexto10" onClick={handleRaise10}>
          x10^x
        </button>
        <button className="operator" onClick={() => handleClick("/")}>
          Ans
        </button>
        <button className="evaluate" onClick={handleEvaluate}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
