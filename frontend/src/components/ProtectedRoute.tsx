import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../auth";

import type { ReactNode, ReactElement } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps): ReactElement => {
  const role = getUserRole();
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />;
  }
  return children as ReactElement;
};