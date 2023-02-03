import { type FC } from "react";

import "./style.scss";

const Footer: FC = () => (
  <footer className="footer">
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

export default Footer;
