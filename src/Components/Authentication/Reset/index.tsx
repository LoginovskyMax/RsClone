import { useFormik } from "formik";
import type { FC } from "react";
import { useState, useEffect } from "react";
import * as yup from "yup";

import {
  getUserNameByResetToken,
  setNewPassword,
} from "../../../controller/Auth";
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

interface ResetPassProps {
  resetToken: string;
}

const ResetPass: FC<ResetPassProps> = ({ resetToken }) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userName, setUserName] = useState("");

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
          .catch(({ message }) => setErrorMsg(message));
      },
    });

  return (
    <div className="authentication">
      <p className="authentication__title">Set password for {userName}:</p>
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

export default ResetPass;
