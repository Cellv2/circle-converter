import { convertToCircumference, convertToDiameter } from "./calculations";
import type { ConversionUnitId } from "./calculations.types";

export interface SetupElements {
    diameterInput: HTMLInputElement | null;
    diameterUnitSelect: HTMLSelectElement | null;
    circumferenceInput: HTMLInputElement | null;
    circumferenceUnitSelect: HTMLSelectElement | null;
}

type ResolvedSetupElements = {
    [K in keyof SetupElements]-?: NonNullable<SetupElements[K]>;
};

export function assertSetupElements(
    setupObj: SetupElements
): asserts setupObj is ResolvedSetupElements {
    if (Object.values(setupObj).some((value) => value === null)) {
        throw new Error("Missing required DOM elements");
    }
}

export const setup = (setupObj: ResolvedSetupElements): void => {
    const {
        circumferenceInput,
        circumferenceUnitSelect,
        diameterInput,
        diameterUnitSelect,
    } = setupObj;

    circumferenceInput.addEventListener("input", () => {
        const circumference = parseFloat(circumferenceInput.value);
        if (isNaN(circumference)) {
            return;
        }

        const diameter = convertToDiameter(
            circumference,
            diameterUnitSelect.value as ConversionUnitId,
            circumferenceUnitSelect.value as ConversionUnitId
        );

        diameterInput.value = diameter.toFixed(2).toString();
    });

    diameterInput.addEventListener("input", () => {
        const diameter = parseFloat(diameterInput.value);
        if (isNaN(diameter)) {
            return;
        }

        const circumference = convertToCircumference(
            diameter,
            circumferenceUnitSelect.value as ConversionUnitId,
            diameterUnitSelect.value as ConversionUnitId
        );

        circumferenceInput.value = circumference.toFixed(2).toString();
    });
};
