import { useFormik } from "formik";
import type { FC } from "react";
import { useState } from "react";
import * as yup from "yup";

import { authLogin, checkUserToken } from "../../../controller/Auth";
import type { Values } from "../../../data/authData";
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
  password: yup.string().required(),
});

const inputsProps = [
  {
    key: "userName",
    labelEn: "Name",
    labelRu: "Имя",
    placeholderEn: "Username",
    placeholderRu: "Имя пользователя",
    type: "text",
  },
  {
    key: "password",
    labelEn: "Password",
    labelRu: "Пароль",
    placeholderEn: "Password",
    placeholderRu: "Пароль",
    type: "password",
  },
] as const;

interface SignInProps {
  setSignInModalOpened: () => void;
  setModalClosed: () => void;
  setForgotOpened: () => void;
}

const SignIn: FC<SignInProps> = ({
  setSignInModalOpened,
  setModalClosed,
  setForgotOpened,
}) => {
  const setUser = useUserStore((state) => state.setUser);
  const { isEn } = languageStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { setStatus } = useStatusStore();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: (data: Values) => {
        setStatus({ isLoading: true, message: "" });
        authLogin(data)
          .then(() => checkUserToken())
          .then((userData) => {
            setUser(userData);
            setStatus({
              isLoading: false,
              message: "You are logged in",
            });
            setModalClosed();
          })
          .catch((error) => {
            setStatus({ isLoading: false, message: "" });

            if (error.message) {
              const msg = isEn
                ? MESSAGES_RU[error.message]
                : MESSAGES_EN[error.message];
              setErrorMsg(msg);
            } else {
              const msg = isEn ? MESSAGES_RU[error] : MESSAGES_EN[error];
              setErrorMsg(msg);
            }
          });
      },
    });

  return (
    <div className="authentication">
      <p className="authentication__title">{isEn ? "Войти" : "Sign In"}</p>
      <form className="authentication__content" onSubmit={handleSubmit}>
        {inputsProps.map(
          ({ key, labelRu, labelEn, type, placeholderEn, placeholderRu }) => (
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
        <p className="authentication__error">{errorMsg}</p>
        <HelperText
          text=""
          linkText={isEn ? "Забыли пароль?" : "Forgot password?"}
          onClick={setForgotOpened}
        />
        <HelperText
          text={isEn ? "Нет аккаунта?" : "Don't have an account?"}
          linkText={isEn ? "Регистрация" : "Sign Up"}
          onClick={setSignInModalOpened}
        />
        <Button className="authentication__button" type="submit">
          {isEn ? "Войти" : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
