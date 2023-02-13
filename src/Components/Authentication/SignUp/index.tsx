import { useFormik } from "formik";
import { FC, useState } from "react";
import * as yup from "yup";

import {
  authLogin,
  checkUserToken,
  createUser,
} from "../../../controller/Auth";
import useUserStore from "../../../store";
import Button from "../../common/Button";
import Input from "../../common/Input";
import HelperText from "../HelperText";

import "../style.scss";

const schema = yup.object().shape({
  userName: yup.string().min(3).max(30).required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .equals([yup.ref("password")], "Should be equal to password"),
});

const inputsProps = [
  {
    key: "userName",
    label: "Name",
    type: "text",
    placeholder: "Username",
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
  },
  {
    key: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Confirm password",
  },
] as const;

interface SignUpProps {
  setSignInModalOpened: () => void;
  setModalClosed: () => void;
}

const SignUp: FC<SignUpProps> = ({ setSignInModalOpened, setModalClosed }) => {
  const setUser = useUserStore((state) => state.setUser);

  const [errorMsg, setErrorMsg] = useState("");

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: schema,
      onSubmit: (data) => {
        createUser(data)
          .then(() => authLogin(data))
          .then(() => checkUserToken())
          .then((userDetails) => {
            setUser(userDetails);
            setErrorMsg("");
            setModalClosed();
          })
          .catch((error) => {
            try {
              const { message } = JSON.parse(error);
              setErrorMsg(message);
            } catch {
              setErrorMsg(error.message);
            }
          });
      },
    });

  return (
    <div className="authentication">
      <p className="authentication__title">Sign Up</p>
      <form onSubmit={handleSubmit} className="authentication__content">
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
        <div className="authentication__error">{errorMsg}</div>
        <HelperText
          text="Already signed up?"
          linkText="Go to login"
          onClick={setSignInModalOpened}
        />
        <Button className="authentication__button" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
