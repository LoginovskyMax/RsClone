import type { FC } from "react";
import "./style.scss";

interface HelperTextProps {
  text: string;
  linkText: string;
  onClick: () => void;
}

const HelperText: FC<HelperTextProps> = ({ text, linkText, onClick }) => (
  <p className="helper-text">
    {text}
    <button className="helper-text__link" onClick={onClick} type="button">
      {` ${linkText}`}
    </button>
  </p>
);

export default HelperText;
