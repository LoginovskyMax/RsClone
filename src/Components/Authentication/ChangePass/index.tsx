import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

import { changePassword } from "../../../controller/Auth";
import useUserStore from "../../../store";
import useStatusStore from "../../../store/load-status";
import Button from "../../common/Button";
import Input from "../../common/Input";

import "../style.scss";

const schema = yup.object().shape({
  password: yup.string().required(),
  newPassword: yup.string().required(),
  confirmPassword: yup
    .string()
    .equals([yup.ref("newPassword")], "Should be equal to New password"),
});

const inputsProps = [
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
  },
  {
    key: "newPassword",
    label: "New password",
    type: "password",
    placeholder: "New password",
  },
  {
    key: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Confirm password",
  },
] as const;

const ChangePass = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { userName } = useUserStore();

  const { setStatus } = useStatusStore();

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
          .catch(({ message }) => {
            setStatus({ isLoading: false, message: "" });
            setErrorMsg(message);
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
