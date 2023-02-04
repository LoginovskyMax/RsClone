import "../style.scss";

const UsernameControl = ({ ...inputProps }) => (
  <input className="input" placeholder="Username" name="name" {...inputProps} />
);

export default UsernameControl;
