import { useFormik } from "formik";
import type { FC } from "react";
import { useState } from "react";
import * as yup from "yup";

import { forgotPassword } from "../../../controller/Auth";
import Button from "../../common/Button";
import Input from "../../common/Input";
import HelperText from "../HelperText";

import "../style.scss";
import { isEmail } from "./forgot.utils";

const schema = yup.object().shape({
  userName: yup.string().min(3).max(30).required(),
});

const inputsProps = [
  {
    key: "userName",
    label: "Name or Email",
    placeholder: "Name or Email",
    type: "text",
  },
] as const;

interface ForgotPassProps {
  setSignInModalOpened: () => void;
  setInfoMsg: React.Dispatch<React.SetStateAction<string | null>>;
}

const ForgotPass: FC<ForgotPassProps> = ({
  setSignInModalOpened,
  setInfoMsg,
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
      },
      validationSchema: schema,
      onSubmit: (data) => {
        const newData = isEmail(data.userName)
          ? { email: data.userName }
          : { userName: data.userName };

        forgotPassword(newData)
          .then(({ message }) => setInfoMsg(message))
          .catch(({ message }) => setErrorMsg(message));
      },
    });

  return (
    <div className="authentication">
      <p className="authentication__title">Forgot password:</p>
      <form className="authentication__content" onSubmit={handleSubmit}>
        {inputsProps.map(({ key, label, type, placeholder }) => (
          <Input
            key={key}
            type={type}
            label={label}
            name={key}
            placeholder={placeholder}
            value={values[key]}
            onChange={handleChange}
            onBlur={handleBlur}
            errorsMessage={
              errors[key] && touched[key] ? errors[key] : undefined
            }
          />
        ))}
        <p className="authentication__error">{errorMsg}</p>
        <HelperText
          text="Remember you login and password?"
          linkText="Go to login"
          onClick={setSignInModalOpened}
        />
        <Button className="authentication__button" type="submit">
          Send mail
        </Button>
      </form>
    </div>
  );
};

export default ForgotPass;
