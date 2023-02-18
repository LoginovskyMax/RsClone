import { type FC } from "react";

import themeStore from "../../store/theme";


import "./style.scss";

const Footer: FC = () => {
  const theme = themeStore((state) => state.isDark);

  return (
    <footer className={theme ? "footer dark" : "footer"}>
      <p className="footer__year">© 2023</p>
      <div className="footer__content">
        <a href="https://github.com/jerubrin" target="_blank" rel="noreferrer">
          Alexey Kuptsov
        </a>
        <p>|</p>
        <a href="https://github.com/Kunitsa3" target="_blank" rel="noreferrer">
          Olya Kunitsa
        </a>
        <p>|</p>
        <a
          href="https://github.com/LoginovskyMax"
          target="_blank"
          rel="noreferrer"
        >
          Maxim Loginovsky
        </a>
      </div>
      <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
        <img src="images/logo.png" alt="logo" className="footer__logo" />
      </a>
    </footer>
  );
};

export default Footer;
