import { type FC } from "react";
import themeStore from "../../store/theme";

import "./style.scss";

const Footer: FC = () => {
  const theme = themeStore((state)=>state.isDark)
  return (
    <footer className={theme ? 'footer dark' : 'footer'}>
      <p className="footer__year">© 2023</p>
      <div className="footer__content">
        <a href="https://github.com/jerubrin">Alexey Kuptsov</a>
        <p>|</p>
        <a href="https://github.com/Kunitsa3">Olya Kunitsa</a>
        <p>|</p>
        <a href="https://github.com/LoginovskyMax">Maxim Loginovsky</a>
      </div>
      <img src="images/logo.png" alt="logo" className="footer__logo" />
    </footer>
  );
  
}
export default Footer;
