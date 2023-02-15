import Button from "../../Components/common/Button";
import "./style.scss";
import AuthenticationModal from "../../Components/Authentication";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserStore from "../../store";

const MainPage = () => {
  const [isModalClosed, setModalClosed] = useState(true);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.userName);
  
  const handler = () => {
    if(user===null){
      setModalClosed(false)
    }else{
      navigate('/main')
    }
  }

  return (
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
      {}
      <Button className="main-page__button" onClick={handler}>Get started</Button>
      {!isModalClosed && (
          <AuthenticationModal setModalClosed={() => setModalClosed(true)} />
        )}
    </div>
  );
}


export default MainPage;
