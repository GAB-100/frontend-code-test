import React from "react";
import CalcButton from "./calc-button";
const CalcKeyPad = (props) => {
  const { actionToPerform, allClear } = props;

  const numericKeys = [7, 8, 9, 4, 5, 6, 1, 2, 3];

  const operatorKeys = [
    { label: "÷", value: "/" },
    { label: "×", value: "x" },
    { label: "-", value: "-" },
    { label: "+", value: "+" },
    { label: "=", value: "=" },
  ];

  const functionKeys = [
    { label: allClear ? "AC" : "C", value: allClear ? "AC" : "C" },
    { label: "+/-", value: "+/-" },
    { label: "%", value: "%" },
  ];

  const lastRowKeys = [
    {
      label: "0",
      value: "0",
      type: "numeric",
      buttonStyle: "number-key special",
    },
    { label: "·", value: ".", type: "spec", buttonStyle: "number-key" },
  ];

  const handleClickButton = (value, keyType) => {
    actionToPerform(value, keyType);
  };

  return (
    <div id="keypad" className="flex row jc-sp-around">
      <div className="grid">
        {functionKeys.map((functionKey) => (
          <CalcButton
            key={functionKey.label}
            label={functionKey.label}
            value={functionKey.value}
            buttonStyle="special-key"
            onClick={handleClickButton}
            type="spec"
          />
        ))}
        {numericKeys.map((numericKey) => (
          <CalcButton
            key={numericKey}
            label={numericKey}
            value={numericKey}
            buttonStyle="number-key"
            onClick={handleClickButton}
            type="numeric"
          />
        ))}
        {lastRowKeys.map((lastRowKey) => (
          <CalcButton
            key={lastRowKey.label}
            label={lastRowKey.label}
            value={lastRowKey.value}
            buttonStyle={lastRowKey.buttonStyle}
            onClick={handleClickButton}
            type={lastRowKey.type}
          />
        ))}
      </div>
      <div className="flex column jc-sp-btw">
        {operatorKeys.map((operatorKey) => (
          <CalcButton
            key={operatorKey.label}
            label={operatorKey.label}
            value={operatorKey.value}
            buttonStyle="op-key"
            onClick={handleClickButton}
            type="operator"
          />
        ))}
      </div>
    </div>
  );
};

export default CalcKeyPad;
