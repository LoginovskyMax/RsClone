import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

import PasswordControl from "./PasswordControl";
import UsernameControl from "./UsernameControl";

import "./style.scss";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  errorsMessage?: string;
}

const Input: FC<InputProps> = ({
  type,
  label,
  errorsMessage,
  ...inputProps
}) => (
  <div className="input-wrapper">
    <p className="input__label">{label}</p>
    {type === "password" ? (
      <PasswordControl {...inputProps} />
    ) : (
      <UsernameControl {...inputProps} />
    )}
    <div>
      {errorsMessage && <p className="input__error-message">{errorsMessage}</p>}
    </div>
  </div>
);

export default Input;
