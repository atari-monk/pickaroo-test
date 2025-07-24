// toggle-button.test.ts
import { ToggleButton } from "pickaroo";

export function runToggleButtonTest(): void {
    const container = document.createElement("div");
    container.innerHTML = `<h2>ToggleButton Test</h2>`;
    document.body.appendChild(container);

    // Test implementation
    const toggleButton = new ToggleButton();
    container.appendChild(toggleButton.element);

    const content = document.createElement("div");
    content.textContent =
        "This content is shown/hidden based on the toggle state";
    Object.assign(content.style, {
        marginTop: "1rem",
        padding: "1rem",
        border: "1px solid #ccc",
    });
    container.appendChild(content);

    toggleButton.onChange((isVisible: boolean) => {
        content.style.display = isVisible ? "block" : "none";
        console.log("ToggleButton state changed:", isVisible);
    });

    content.style.display = toggleButton.isVisible ? "block" : "none";
}
