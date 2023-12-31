import React from "react";

const CalcButton = (props) => {
  const { value, type, buttonStyle, label, onClick } = props;

  const handleButtonClick = () => {
    onClick(value, type);
  };
  return (
    <button name={value} className={buttonStyle} onClick={handleButtonClick}>
      {label}
    </button>
  );
};

export default CalcButton;
