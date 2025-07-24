import "./style.css";
import { runToggleButtonTest } from "./toggle-button";
import { runSelectorTest } from "./selector";
import { runLogTest } from "./log";

document.addEventListener("DOMContentLoaded", () => {
    runToggleButtonTest();
    runSelectorTest();
    runLogTest();
});
