import { GenericUIContainer, type UIComponent } from "pickaroo";

export async function runContainerTest(): Promise<void> {
    console.log(
        "GenericUIContainer methods:",
        Object.getOwnPropertyNames(GenericUIContainer.prototype)
    );

    // Create test area
    const testArea = document.createElement("div");
    testArea.innerHTML = `<h2>GenericUIContainer Test</h2>`;
    document.body.appendChild(testArea);

    // Create a mock UIComponent for testing
    const createMockComponent = (name: string): UIComponent => {
        const element = document.createElement("div");
        element.textContent = `Mock Component ${name}`;
        element.style.padding = "1rem";
        element.style.border = "1px solid #ddd";
        element.style.margin = "0.5rem 0";
        element.style.backgroundColor = "#f9f9f9"; // Add background for visibility

        return {
            element,
            destroy: () => {
                console.log(`Component ${name} destroyed`);
                element.remove();
            },
        };
    };

    // Create container instance and wait for initialization
    const container = new GenericUIContainer();
    testArea.appendChild(container);
    await container.ready();

    // Create control buttons
    const controls = document.createElement("div");
    controls.style.margin = "1rem 0";
    testArea.appendChild(controls);

    // Button to add component to header
    const addHeaderBtn = document.createElement("button");
    addHeaderBtn.textContent = "Add to Header";
    addHeaderBtn.style.marginRight = "0.5rem";
    addHeaderBtn.addEventListener("click", () => {
        try {
            const component = createMockComponent(
                `Header-${container.getComponentCount() + 1}`
            );
            console.log("Adding header component:", component);
            container.addComponent(component, ".header");
        } catch (error) {
            console.error("Error adding header component:", error);
        }
    });
    controls.appendChild(addHeaderBtn);

    // Button to add component to content
    const addContentBtn = document.createElement("button");
    addContentBtn.textContent = "Add to Content";
    addContentBtn.style.marginRight = "0.5rem";
    addContentBtn.addEventListener("click", () => {
        try {
            const component = createMockComponent(
                `Content-${container.getComponentCount() + 1}`
            );
            console.log("Adding content component:", component);
            container.addContent(component);
        } catch (error) {
            console.error("Error adding content component:", error);
        }
    });
    controls.appendChild(addContentBtn);

    // Button to destroy container
    const destroyBtn = document.createElement("button");
    destroyBtn.textContent = "Destroy Container";
    destroyBtn.addEventListener("click", () => {
        try {
            container.destroy();
            controls.remove();
            testArea.innerHTML += "<p>Container destroyed</p>";
        } catch (error) {
            console.error("Error destroying container:", error);
        }
    });
    controls.appendChild(destroyBtn);

    // Add toggle button to controls
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Content";
    toggleBtn.addEventListener("click", () => container.toggleContent());
    controls.appendChild(toggleBtn);

    // Status display
    const status = document.createElement("div");
    status.style.marginTop = "1rem";
    status.style.padding = "1rem";
    status.style.border = "1px solid #ccc";
    status.textContent = "Container ready. Use buttons to add components.";
    testArea.appendChild(status);

    // Add initial components
    try {
        const headerComponent = createMockComponent("Header-Initial");
        const contentComponent = createMockComponent("Content-Initial");

        container.addComponent(headerComponent, ".header");
        container.addContent(contentComponent);

        status.textContent = "Container initialized with initial components.";
    } catch (error) {
        status.textContent = `Error: ${
            error instanceof Error ? error.message : String(error)
        }`;
    }
}
