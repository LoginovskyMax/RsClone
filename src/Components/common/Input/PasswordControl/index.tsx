import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import "../style.scss";

const PasswordControl = ({ ...inputProps }) => {
  const [isValueVisible, setValueVisible] = useState(false);

  const toggleValueVisibility = () => setValueVisible(!isValueVisible);

  return (
    <div className="password-input-wrapper">
      <input
        className="password-input"
        type={isValueVisible ? "text" : "password"}
        {...inputProps}
      />
      <FontAwesomeIcon
        icon={faEyeSlash}
        className="visibility-icon"
        onClick={toggleValueVisibility}
      />
    </div>
  );
};

export default PasswordControl;
