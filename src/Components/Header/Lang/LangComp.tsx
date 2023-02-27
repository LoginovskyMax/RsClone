import enIcon from "../../../assets/langIcons/english.png";
import ruIcon from "../../../assets/langIcons/russian.png";
import languageStore from "../../../store/language";

import styles from "./LangComp.module.scss";

export const LS_LANG = "rs-games-online__lang";

export const LangComp = () => {
  const { isEn, setLang } = languageStore();

  const changeLang = () => {
    localStorage.setItem(LS_LANG, (!isEn).toString());
    setLang(!isEn);
  };

  return (
    <div className={styles.main} onClick={changeLang}>
      <img
        src={isEn ? ruIcon : enIcon}
        alt="icon language"
        className={isEn ? styles.animate2 : styles.main__icon}
      />
      <p className={isEn ? styles.animate1 : styles.main__text}>
        {isEn ? "Ru" : "En"}
      </p>
    </div>
  );
};
