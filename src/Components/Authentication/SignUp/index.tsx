import { useFormik } from "formik";
import type { FC } from "react";
import { useState } from "react";
import * as yup from "yup";

import {
  authLogin,
  checkUserToken,
  createUser,
} from "../../../controller/Auth";
import { MESSAGES_EN, MESSAGES_RU } from "../../../data/restMsgs";
import useUserStore from "../../../store";
import languageStore from "../../../store/language";
import useStatusStore from "../../../store/load-status";
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
    labelEn: "Name",
    labelRu: "Имя",
    type: "text",
    placeholderEn: "Username",
    placeholderRu: "Имя пользователя",
  },
  {
    key: "email",
    labelEn: "Email",
    labelRu: "Почта",
    type: "email",
    placeholderEn: "Email",
    placeholderRu: "Почта",
  },
  {
    key: "password",
    labelEn: "Password",
    labelRu: "Пароль",
    type: "password",
    placeholderEn: "Password",
    placeholderRu: "Пароль",
  },
  {
    key: "confirmPassword",
    labelEn: "Confirm password",
    labelRu: "Подтвердить пароль",
    type: "password",
    placeholderEn: "Confirm password",
    placeholderRu: "Подтвердить пароль",
  },
] as const;

interface SignUpProps {
  setSignInModalOpened: () => void;
  setModalClosed: () => void;
  setForgotOpened: () => void;
}

const SignUp: FC<SignUpProps> = ({
  setSignInModalOpened,
  setModalClosed,
  setForgotOpened,
}) => {
  const setUser = useUserStore((state) => state.setUser);

  const [errorMsg, setErrorMsg] = useState("");
  const { isEn } = languageStore();
  const { setStatus } = useStatusStore();

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
        setStatus({ isLoading: true, message: "" });

        createUser(data)
          .then(() => authLogin(data))
          .then(() => checkUserToken())
          .then((userDetails) => {
            setStatus({
              isLoading: false,
              message: "You have successfully registered!",
            });
            setUser(userDetails);
            setModalClosed();
          })
          .catch((error) => {
            try {
              setStatus({ isLoading: false, message: "" });
              const { message } = JSON.parse(error);
              const msg = isEn ? MESSAGES_RU[message] : MESSAGES_EN[message];
              setErrorMsg(msg);
            } catch {
              const msg = isEn
                ? MESSAGES_RU[error.message]
                : MESSAGES_EN[error.message];
              setErrorMsg(msg);
            }
          });
      },
    });

  return (
    <div className="authentication">
      <p className="authentication__title">{isEn ? "Войти" : "Sign Up"}</p>
      <form onSubmit={handleSubmit} className="authentication__content">
        {inputsProps.map(
          ({ key, labelRu, labelEn, type, placeholderRu, placeholderEn }) => (
            <Input
              key={key}
              type={type}
              label={isEn ? labelRu : labelEn}
              name={key}
              placeholder={isEn ? placeholderRu : placeholderEn}
              value={values[key]}
              onChange={handleChange}
              onBlur={handleBlur}
              errorsMessage={
                errors[key] && touched[key] ? errors[key] : undefined
              }
            />
          )
        )}
        <div className="authentication__error">{errorMsg}</div>
        <HelperText
          text=""
          linkText={isEn ? "Забыли пароль?" : "Forgot password?"}
          onClick={setForgotOpened}
        />
        <HelperText
          text={isEn ? "Уже зарегистрированны?" : "Already signed up?"}
          linkText={isEn ? "Перейти к авторизации" : "Go to login"}
          onClick={setSignInModalOpened}
        />
        <Button className="authentication__button" type="submit">
          {isEn ? "Регистрация" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
