import { LogService, type LogLevel } from "pickaroo";

export function runLogTest(): void {
    const container = document.createElement("div");
    container.innerHTML = `<h2>Log Test</h2>`;
    document.body.appendChild(container);

    // Create log service instance with a smaller max entries for testing
    const log = new LogService(5);
    container.appendChild(log.element);

    // Create control buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.style.marginTop = "1rem";
    container.appendChild(buttonContainer);

    // Test different log levels
    const logLevels: LogLevel[] = ["info", "warn", "error", "debug"];
    logLevels.forEach((level) => {
        const button = document.createElement("button");
        button.textContent = `Log ${level}`;
        button.style.marginRight = "0.5rem";
        button.addEventListener("click", () => {
            log.add(`This is a ${level} message`, level);
        });
        buttonContainer.appendChild(button);
    });

    // Test long message
    const longMessageButton = document.createElement("button");
    longMessageButton.textContent = "Log Long Message";
    longMessageButton.style.marginRight = "0.5rem";
    longMessageButton.addEventListener("click", () => {
        log.add(
            "This is a very long message that should wrap in the log container to test the layout and behavior of the log component with lengthy content.",
            "info"
        );
    });
    buttonContainer.appendChild(longMessageButton);

    // Test rapid logging
    const rapidLogButton = document.createElement("button");
    rapidLogButton.textContent = "Rapid Log (10 messages)";
    rapidLogButton.style.marginRight = "0.5rem";
    rapidLogButton.addEventListener("click", () => {
        for (let i = 1; i <= 10; i++) {
            log.add(`Rapid message ${i}`, i % 2 === 0 ? "info" : "debug");
        }
    });
    buttonContainer.appendChild(rapidLogButton);

    // Test max entries limit
    const maxEntriesButton = document.createElement("button");
    maxEntriesButton.textContent = "Test Max Entries (7 messages)";
    maxEntriesButton.style.marginRight = "0.5rem";
    maxEntriesButton.addEventListener("click", () => {
        for (let i = 1; i <= 7; i++) {
            log.add(`Testing max entries ${i}`, "warn");
        }
    });
    buttonContainer.appendChild(maxEntriesButton);

    // Test clear
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear Log";
    clearButton.style.marginRight = "0.5rem";
    clearButton.addEventListener("click", () => {
        log.clear();
    });
    buttonContainer.appendChild(clearButton);

    // Test destroy
    const destroyButton = document.createElement("button");
    destroyButton.textContent = "Destroy Log";
    destroyButton.addEventListener("click", () => {
        log.destroy();
        buttonContainer.remove();
    });
    buttonContainer.appendChild(destroyButton);
}
