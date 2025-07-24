// main.ts
import "./style.css";
import { runToggleButtonTest } from "./toggle-button";
import { runSelectorTest } from "./selector";

document.addEventListener("DOMContentLoaded", () => {
    // Run all tests sequentially
    runToggleButtonTest();
    runSelectorTest();
});
