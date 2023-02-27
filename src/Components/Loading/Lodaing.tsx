import useStatusStore from "../../store/load-status";

import "./style.scss";

const Loading = () => {
  const status = useStatusStore();

  return (
    <div className={`loading${status.isLoading ? "" : " loading_hide"}`}>
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
