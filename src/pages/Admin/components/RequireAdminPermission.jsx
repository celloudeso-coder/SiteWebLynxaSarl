import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

export default function RequireAdminPermission({ resource, resources, action = "view", children }) {
  const { canAccess } = useAdminAuth();
  const allowed = resource
    ? canAccess(resource, action)
    : (resources || []).some((item) => canAccess(item, action));
  if (!allowed) return <Navigate to="/admin" replace />;
  return children;
}
