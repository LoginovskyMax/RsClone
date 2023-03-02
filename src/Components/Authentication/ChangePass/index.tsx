import { useFormik } from "formik";
import type { FC } from "react";
import { useState } from "react";
import * as yup from "yup";

import { changePassword } from "../../../controller/Auth";
import { MESSAGES_EN, MESSAGES_RU } from "../../../data/restMsgs";
import useUserStore from "../../../store";
import languageStore from "../../../store/language";
import useStatusStore from "../../../store/load-status";
import Button from "../../common/Button";
import Input from "../../common/Input";

import "../style.scss";

interface ChangePassProps {
  setModalClosed: () => void;
}

const ChangePass: FC<ChangePassProps> = ({ setModalClosed }) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { userName } = useUserStore();

  const { setStatus } = useStatusStore();
  const { isEn } = languageStore();

  const schema = yup.object().shape({
    password: yup.string().required(),
    newPassword: yup.string().required(),
    confirmPassword: yup
      .string()
      .equals(
        [yup.ref("newPassword")],
        isEn
          ? "Должен совподать с полем Новый пароль"
          : "Should be equal to New password"
      ),
  });

  const inputsProps = [
    {
      key: "password",
      label: isEn ? "Пароль" : "Password",
      type: "password",
      placeholder: isEn ? "Пароль" : "Password",
    },
    {
      key: "newPassword",
      label: isEn ? "Новый пароль" : "New password",
      type: "password",
      placeholder: isEn ? "Новый пароль" : "New password",
    },
    {
      key: "confirmPassword",
      label: "Confirm password",
      type: "password",
      placeholder: "Confirm password",
    },
  ] as const;

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: schema,
      onSubmit: (data) => {
        setStatus({ isLoading: true, message: "" });
        changePassword(data)
          .then(({ message }) => setStatus({ isLoading: false, message }))
          .then(setModalClosed)
          .catch(({ message }) => {
            setStatus({ isLoading: false, message: "" });
            const msg = isEn ? MESSAGES_RU[message] : MESSAGES_EN[message];
            setErrorMsg(msg);
          });
      },
    });

  return (
    <div className="authentication">
      <p className="authentication__title">Change password for {userName}:</p>
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
        <Button className="authentication__button" type="submit">
          Set Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePass;
