import type { FC, ReactNode } from "react";

interface AdminCompProps {
  children: ReactNode;
  isAdmin: boolean;
}

export const AdminComp: FC<AdminCompProps> = ({ children, isAdmin }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>{isAdmin && children}</>
);
