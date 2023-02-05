import clsx from "clsx";
import type { FC, ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import "./style.scss";

const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className, ...rest }) => (
  <button className={clsx("button", className)} {...rest}>
    {children}
  </button>
);

export default Button;
