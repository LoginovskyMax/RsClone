import { useFormik } from "formik";
import type { FC } from "react";
import { useState } from "react";
import * as yup from "yup";

import { forgotPassword } from "../../../controller/Auth";
import { MESSAGES_EN, MESSAGES_RU } from "../../../data/restMsgs";
import languageStore from "../../../store/language";
import useStatusStore from "../../../store/load-status";
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
    labelEn: "Name or Email",
    labelRu: "Имя или Почта",
    placeholderEn: "Name or Email",
    placeholderRu: "Имя или почта",
    type: "text",
  },
] as const;

interface ForgotPassProps {
  setSignInModalOpened: () => void;
}

const ForgotPass: FC<ForgotPassProps> = ({ setSignInModalOpened }) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { isEn } = languageStore();
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
          })
          .catch((err) => {
            setStatus({ isLoading: false, message: "" });
            const msg = isEn
              ? MESSAGES_RU[err.message]
              : MESSAGES_EN[err.message];
            setErrorMsg(msg);
          });
      },
    });

  return (
    <div className="authentication">
      <p className="authentication__title">
        {isEn ? "Забыли пароль :" : "Forgot password:"}
      </p>
      <form className="authentication__content" onSubmit={handleSubmit}>
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
        <p className="authentication__error">{errorMsg}</p>
        <HelperText
          text={
            isEn
              ? "Забыли пароль или логин?:"
              : "Remember you login and password?"
          }
          linkText={isEn ? "Перейти к авторизации" : "Go to login"}
          onClick={setSignInModalOpened}
        />
        <Button className="authentication__button" type="submit">
          {isEn ? "Выслать на почту" : "Send mail"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPass;
