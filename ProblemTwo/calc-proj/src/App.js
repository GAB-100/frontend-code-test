/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import { useEffect, useState } from "react";
import CalcDisplay from "./components/calc-display";
import CalcKeyPad from "./components/calc-keypad";
import "./App.scss";

function App() {
  const [accValue, setAccValue] = useState(null);
  const [screenValue, setScreenValue] = useState("0");
  const [currentOperator, setCurrentOperator] = useState(null);
  const [expectsOperand, setExpectsOperand] = useState(false);

  const isScreenClear = screenValue === "0";

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [screenValue]);

  const handleActionToPerform = (value, keyType) => {
    switch (keyType) {
      case "spec":
        handleClickSpecKey(value);
        break;
      case "numeric":
        handleClickNumericKey(value);
        break;
      case "operator":
        handleClickOperator(value);
        break;
    }
  };

  const handleClickSpecKey = (value) => {
    switch (value) {
      case "AC":
        allClear();
        break;
      case "C":
        clearScreen();
        break;
      case "+/-":
        reverseSign();
        break;
      case "%":
        percentage();
        break;
      case ".":
        addDecimalPoint();
        break;
    }
  };

  const allClear = () => {
    setAccValue(null);
    setScreenValue("0");
    setCurrentOperator(null);
    setExpectsOperand(false);
  };

  const clearScreen = () => {
    setScreenValue("0");
  };

  const reverseSign = () => {
    setScreenValue(String(-parseFloat(screenValue)));
  };

  const percentage = () => {
    setScreenValue(String(parseFloat(screenValue) / 100));
  };

  const addDecimalPoint = () => {
    if (expectsOperand) {
      setScreenValue("0.");
    } else {
      if (!screenValue.includes(".")) setScreenValue(screenValue + ".");
    }
    setExpectsOperand(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      clearLastDigit();
    }
  };

  const clearLastDigit = () => {
    if (screenValue !== "0")
      if (screenValue.length > 1) setScreenValue("0");
      else {
        setScreenValue(screenValue.substring(0, screenValue.length - 1));
      }
  };

  const handleClickNumericKey = (value) => {
    if (expectsOperand) {
      setScreenValue(String(value));
      setExpectsOperand(false);
    } else
      setScreenValue(screenValue === "0" ? String(value) : screenValue + value);
  };

  const handleClickOperator = (operator) => {
    const inputValue = parseFloat(screenValue);
    if (accValue === null) {
      setAccValue(inputValue);
    } else {
      if (currentOperator) {
        const resultValue = operate(currentOperator, accValue, inputValue);
        setAccValue(resultValue);
        setScreenValue(String(resultValue));
      }
    }
    setExpectsOperand(true);
    setCurrentOperator(operator);
  };

  const operate = (operator, accValue, inputValue) => {
    switch (operator) {
      case "+":
        return accValue + inputValue;
      case "-":
        return accValue - inputValue;
      case "x":
        return accValue * inputValue;
      case "/":
        return accValue / inputValue;
      case "=":
        return inputValue;
    }
  };

  return (
    <div id="calculator-view" className={"flex column jc-center ai-center"}>
      <div id="viewport" className={"flex column jc-sp-between ai-center"}>
        <CalcDisplay value={screenValue} />
        <CalcKeyPad
          actionToPerform={handleActionToPerform}
          allClear={isScreenClear}
        />
      </div>
    </div>
  );
}

export default App;
