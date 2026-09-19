// src/main.ts
import appTemplate from "./app.html?raw";
import { assertSetupElements, setup, type SetupElements } from "./setup.ts";
import "./style.css";

const rootElement = document.querySelector("#app");

if (rootElement) {
    rootElement.innerHTML = appTemplate;

    const diameterInput =
        rootElement.querySelector<HTMLInputElement>("#diameter-input");
    const diameterUnitSelect =
        rootElement.querySelector<HTMLSelectElement>("#diameter-unit");
    const circumferenceInput = rootElement.querySelector<HTMLInputElement>(
        "#circumference-input"
    );
    const circumferenceUnitSelect =
        rootElement.querySelector<HTMLSelectElement>("#circumference-unit");

    const diameterUnitOptionIn =
        rootElement.querySelector<HTMLOptionElement>("#diameter-unit--in");

    const diameterUnitOptionCm =
        rootElement.querySelector<HTMLOptionElement>("#diameter-unit--cm");

    const circumferenceUnitOptionIn =
        rootElement.querySelector<HTMLOptionElement>("#circumference-unit--in");

    const circumferenceUnitOptionCm =
        rootElement.querySelector<HTMLOptionElement>("#circumference-unit--cm");

    const setupObj = {
        diameterInput,
        diameterUnitSelect,
        circumferenceInput,
        circumferenceUnitSelect,
        diameterUnitOptionIn,
        diameterUnitOptionCm,
        circumferenceUnitOptionCm,
        circumferenceUnitOptionIn,
    } satisfies SetupElements;

    try {
        assertSetupElements(setupObj);
        setup(setupObj);
    } catch (err: unknown) {
        console.error("Setup failed:", err);
    }
} else {
    console.error("Unable to mount application: #app element not found.");
}
