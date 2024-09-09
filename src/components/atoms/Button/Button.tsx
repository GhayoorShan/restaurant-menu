import React from "react";

type ButtonProps = {
  text?: string | null;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  text = null,
  icon = null,
  onClick,
  disabled = false,
  className = "",
}) => {
  if (!text && !icon) {
    throw new Error("Button must have either text or icon.");
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 
      text-black font-medium rounded-lg ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
