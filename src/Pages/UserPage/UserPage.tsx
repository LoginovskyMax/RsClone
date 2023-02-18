import { useNavigate } from "react-router-dom";
import styles from './UserPage.module.scss'
import languageStore from "../../store/language";
import useUserStore from "../../store";
import Button from "../../Components/common/Button";

const UserPage = () => {
  const navigate = useNavigate();
  const { userName } = useUserStore()
  const { isEn } = languageStore()
  
  return (
    <div>
      <h1>{isEn ? "Страинца пользователя" : "User page"}</h1>
      
    
      <Button onClick={() => navigate("/main")}>{isEn ? "К списку игр" : "On games page"}</Button>
    </div>
  );
};

export default UserPage;
