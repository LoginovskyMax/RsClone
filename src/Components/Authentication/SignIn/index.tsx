import { useFormik } from "formik";
import type { FC } from "react";
import * as yup from "yup";

import { authLogin, checkUserToken } from "../../../controller/Auth";
import type { Values } from "../../../data/authData";
import useUserStore from "../../../store";
import Button from "../../common/Button";
import Input from "../../common/Input";
import HelperText from "../HelperText";

import "../style.scss";

const schema = yup.object().shape({
  userName: yup.string().min(3).max(30).required(),
  password: yup.string().required(),
});

const inputsProps = [
  {
    key: "userName",
    label: "Name",
    placeholder: "Username",
    type: "text",
  },
  {
    key: "password",
    label: "Password",
    placeholder: "Password",
    type: "password",
  },
] as const;

interface SignInProps {
  setSignInModalOpened: () => void;
  setModalClosed: () => void;
}

const SignIn: FC<SignInProps> = ({ setSignInModalOpened, setModalClosed }) => {
  const setUser = useUserStore((state) => state.setUser);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: (data: Values) => {
        authLogin(data)
          .then((resToken) => {
            console.log("resToken", resToken);

            return checkUserToken();
          })
          .then((userData) => {
            console.log("userData", userData);
            setUser({
              userName: userData.userName,
              status: userData.status,
            });

            setModalClosed();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });

  return (
    <div className="authentication">
      <p className="authentication__title">Sign In</p>
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
        <HelperText
          text="Don't have an account?"
          linkText="Sign up"
          onClick={setSignInModalOpened}
        />
        <Button className="authentication__button" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
