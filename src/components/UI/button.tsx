import { FunctionComponent, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  type?: "primary" | "borderd" | "green" | "red";
  onClick: MouseEventHandler;
  children: ReactNode;
  Icon?: ReactNode;
  buttonProps?: object;
}

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  Icon = null,
  children,
  type = "primary",
  buttonProps={},
}) => {
  if (type === "borderd") {
    return (
      <button
        className="border shadow-sm rounded-md px-3 py-2 mr-3 text-sm font-medium text-gray-600 flex items-center"
        onClick={onClick}
        {...buttonProps}
      >
        {Icon}
        {children}
      </button>
    );
  } else if (type === "green") {
    return (
      <button
        className="border shadow-sm rounded-md px-3 py-2 mr-3 text-sm font-medium text-white bg-green-600 flex items-center"
        onClick={onClick}
        {...buttonProps}
      >
        {Icon}
        {children}
      </button>
    );
  }else if (type === "red") {
    return (
      <button
        className="border shadow-sm rounded-md px-3 py-2 mr-3 text-sm font-medium text-white bg-red-600 flex items-center"
        onClick={onClick}
        {...buttonProps}
      >
        {Icon}
        {children}
      </button>
    );
  } else {
    return (
      <button
        className="border shadow-sm rounded-md px-3 py-2 mr-3 text-sm font-medium text-white bg-blue-600 flex items-center"
        onClick={onClick}
        {...buttonProps}
      >
        {Icon}
        {children}
      </button>
    );
  }
};

export default Button;
