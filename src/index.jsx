import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import { initializeAdminPwa } from "./lib/adminPwa";

if (window.location.pathname.startsWith("/admin")) initializeAdminPwa();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
