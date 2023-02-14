import useStatusStore from "../../store/load-status";

import "./style.scss";

const Loading = () => {
  const { isLoading } = useStatusStore();

  return (
    <div className={`loading${isLoading ? "" : " loading_hide"}`}>
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
