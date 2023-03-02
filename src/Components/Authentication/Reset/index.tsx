import { useFormik } from "formik";
import type { FC } from "react";
import { useState, useEffect } from "react";
import * as yup from "yup";

import {
  getUserNameByResetToken,
  setNewPassword,
} from "../../../controller/Auth";
import { MESSAGES_EN, MESSAGES_RU } from "../../../data/restMsgs";
import languageStore from "../../../store/language";
import useStatusStore from "../../../store/load-status";
import Button from "../../common/Button";
import Input from "../../common/Input";

import "../style.scss";

const schema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .equals([yup.ref("password")], "Should be equal to password"),
});

const inputsProps = [
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

interface ResetPassProps {
  resetToken: string;
}

const ResetPass: FC<ResetPassProps> = ({ resetToken }) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const { isEn } = languageStore();
  const { setStatus } = useStatusStore();

  useEffect(() => {
    setStatus({ isLoading: true, message: "" });
    getUserNameByResetToken(resetToken)
      .then((resp) => {
        const resUserName = resp.userName ?? "";
        setUserName(resUserName);
        setStatus({ isLoading: false, message: "" });
      })
      .catch((error) => {
        try {
          const { message } = JSON.parse(error);
          setStatus({ isLoading: false, message });
        } catch {
          setStatus({ isLoading: false, message: error.message });
        }
      });
  }, []);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: schema,
      onSubmit: (data) => {
        setStatus({ isLoading: true, message: "" });
        const { password } = data;
        setNewPassword({ resetToken, password })
          .then(({ message }) => setStatus({ isLoading: false, message }))
          .catch(({ message }) => {
            const msg = isEn ? MESSAGES_RU[message] : MESSAGES_EN[message];
            setErrorMsg(msg);
          });
      },
    });

  return (
    <div className="authentication">
      <p className="authentication__title">
        {isEn ? "Пароль для" : "Set password for"} {userName}:
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
        <Button className="authentication__button" type="submit">
          {isEn ? "Установить пароль" : " Set Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPass;
