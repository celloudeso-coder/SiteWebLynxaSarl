import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

export default function RequireAdminRole({ role, children }) {
  const { can } = useAdminAuth();
  if (!can(role)) return <Navigate to="/admin" replace />;
  return children;
}
