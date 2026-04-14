import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  text,

  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "8px 14px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
