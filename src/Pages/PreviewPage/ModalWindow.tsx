import styles from "./ModalWindow.module.scss";

export default function ModalWindow() {
  return (
    <div className={styles.main}>
      <form action="" className={styles.form}>
        <textarea placeholder="Добавьте комментарий" />
        <button>Отправить</button>
      </form>
    </div>
  );
}
