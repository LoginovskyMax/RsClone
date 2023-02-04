import { useFormik } from "formik";
import type { FC } from "react";
import * as yup from "yup";

import useUserStore from "../../../store";
import Button from "../../common/Button";
import Input from "../../common/Input";
import HelperText from "../HelperText";

import "../style.scss";

const schema = yup.object().shape({
  name: yup.string().min(3).max(30).required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .equals([yup.ref("password")], "Should be equal to password"),
});

const inputsProps = [
  {
    key: "name",
    label: "Name",
    type: "text",
    placeholder: "Username",
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

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: schema,
      onSubmit: (data) => {
        fetch("http://localhost:8888/registUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }

            return response.text().then((errorMessage) => {
              throw new Error(errorMessage);
            });
          })
          .then((userDetails) => {
            setUser({
              user: userDetails.response.name,
              status: userDetails.response.status,
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
