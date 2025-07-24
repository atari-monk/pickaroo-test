import { Selector, type SelectorOption } from "pickaroo";

export function runSelectorTest(): void {
    const container = document.createElement("div");
    container.innerHTML = `<h2>Selector Test</h2>`;
    document.body.appendChild(container);

    // Test data
    const testOptions: SelectorOption[] = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    // Create selector instance
    const selector = new Selector("Test Selector");
    selector.setOptions(testOptions);
    container.appendChild(selector.element);

    // Create output display
    const output = document.createElement("div");
    output.textContent = "Selected value: none";
    Object.assign(output.style, {
        marginTop: "1rem",
        padding: "1rem",
        border: "1px solid #ccc",
    });
    container.appendChild(output);

    // Test onChange callback
    const unsubscribe = selector.onChange((value: string) => {
        output.textContent = `Selected value: ${value}`;
        console.log("Selector value changed:", value);
    });

    // Test setValue method
    const buttonContainer = document.createElement("div");
    buttonContainer.style.marginTop = "1rem";
    container.appendChild(buttonContainer);

    testOptions.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = `Set ${option.label}`;
        button.style.marginRight = "0.5rem";
        button.addEventListener("click", () => {
            selector.setValue(option.value);
        });
        buttonContainer.appendChild(button);
    });

    // Add unsubscribe button to test cleanup
    const unsubscribeButton = document.createElement("button");
    unsubscribeButton.textContent = "Unsubscribe";
    unsubscribeButton.style.marginRight = "0.5rem";
    unsubscribeButton.addEventListener("click", () => {
        unsubscribe();
        output.textContent = "Unsubscribed from changes";
    });
    buttonContainer.appendChild(unsubscribeButton);

    // Add destroy button to test cleanup
    const destroyButton = document.createElement("button");
    destroyButton.textContent = "Destroy Selector";
    destroyButton.addEventListener("click", () => {
        selector.destroy();
        output.textContent = "Selector destroyed";
        buttonContainer.remove();
    });
    buttonContainer.appendChild(destroyButton);
}
