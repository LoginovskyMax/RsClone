import Button from "../../components/common/Button";
import "./style.scss";

const MainPage = () => (
  <div className="main-page">
    <img
      alt="Online games players"
      src="images/main.jpg"
      className="main-page__photo"
    />
    <p className="main-page__main-text">Let`s play with Gaming Zone</p>
    <p className="main-page__secondary-text">
      Gaming Zone has the best free online games selection and offers the most
      fun experience to play alone or with friends.
    </p>
    <Button className="main-page__button">Get started</Button>
  </div>
);

export default MainPage;
