// src/main.ts
import appTemplate from "./app.html?raw";
import { getConversionUnitByKey } from "./calculations.selectors.ts";
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
    if (diameterUnitOptionIn) {
        diameterUnitOptionIn.innerText = getConversionUnitByKey("IN").name;
    }

    const diameterUnitOptionCm =
        rootElement.querySelector<HTMLOptionElement>("#diameter-unit--cm");
    if (diameterUnitOptionCm) {
        diameterUnitOptionCm.innerText = getConversionUnitByKey("CM").name;
    }

    const circumferenceUnitOptionIn =
        rootElement.querySelector<HTMLOptionElement>("#circumference-unit--in");
    if (circumferenceUnitOptionIn) {
        circumferenceUnitOptionIn.innerText = getConversionUnitByKey("IN").name;
    }

    const circumferenceUnitOptionCm =
        rootElement.querySelector<HTMLOptionElement>("#circumference-unit--cm");
    if (circumferenceUnitOptionCm) {
        circumferenceUnitOptionCm.textContent =
            getConversionUnitByKey("CM").name;
    }

    const setupObj = {
        diameterInput,
        diameterUnitSelect,
        circumferenceInput,
        circumferenceUnitSelect,
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
