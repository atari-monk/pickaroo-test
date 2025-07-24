// main.ts
import "./style.css";
import { runToggleButtonTest } from "./toggle-button";

document.addEventListener("DOMContentLoaded", () => {
    // Run all tests sequentially
    runToggleButtonTest();
    // Add more test calls here as needed
});
