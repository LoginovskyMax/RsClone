import { useEffect } from "react";

import useStatusStore from "../../store/load-status";

import "./style.scss";

const Loading = () => {
  const status = useStatusStore();

  useEffect(() => console.log("Loading..."), [status.isLoading]);

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
