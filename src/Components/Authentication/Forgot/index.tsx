import { error } from 'firebase-functions/logger';
import { useFormik } from "formik";
import type { FC } from "react";
import { useState } from "react";
import * as yup from "yup";

import { forgotPassword } from "../../../controller/Auth";
import useStatusStore from '../../../store/load-status';
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
  const { setStatus } = useStatusStore();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
      },
      validationSchema: schema,
      onSubmit: (data) => {
        setStatus({ isLoading: true, message: "" });

        const newData = isEmail(data.userName)
          ? { email: data.userName }
          : { userName: data.userName };

        forgotPassword(newData)
          .then(({ message }) => {
            setStatus({ isLoading: false, message });
            setInfoMsg(message); // TODO: Change to store
          })
          .catch((err) => {
            console.log("ERROR!!!!!!");
            console.log(err);
            setStatus({ isLoading: false, message: err.message });
            setErrorMsg(err.message); // TODO: Change to store
          });
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
