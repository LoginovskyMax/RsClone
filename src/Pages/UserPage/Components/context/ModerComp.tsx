import type { FC, ReactNode } from "react";

interface ModerCompProps {
  children: ReactNode;
  isModer: boolean;
}

export const ModerComp: FC<ModerCompProps> = ({ children, isModer }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{isModer && children}</>
);
