import React, { createContext, useContext } from "react";
import { hasAdminPermission, hasAdminRole } from "../../../lib/adminUsers";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ session, profile, children }) {
  const value = {
    session,
    user: session?.user || null,
    profile,
    can: (requiredRole = "viewer") => hasAdminRole(profile, requiredRole),
    canAccess: (resource, action = "view") => hasAdminPermission(profile, resource, action),
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth doit être utilisé dans AdminAuthProvider.");
  return context;
}
