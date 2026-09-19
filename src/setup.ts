import { convertToCircumference, convertToDiameter } from "./calculations";
import { getConversionUnitByKey } from "./calculations.selectors";
import type { ConversionUnitId } from "./calculations.types";

export interface SetupElements {
    circumferenceInput: HTMLInputElement | null;
    circumferenceUnitSelect: HTMLSelectElement | null;
    diameterInput: HTMLInputElement | null;
    diameterUnitSelect: HTMLSelectElement | null;
    diameterUnitOptionIn: HTMLOptionElement | null;
    diameterUnitOptionCm: HTMLOptionElement | null;
    circumferenceUnitOptionIn: HTMLOptionElement | null;
    circumferenceUnitOptionCm: HTMLOptionElement | null;
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
        diameterUnitOptionIn,
        diameterUnitOptionCm,
        circumferenceUnitOptionIn,
        circumferenceUnitOptionCm,
    } = setupObj;

    diameterUnitOptionIn.innerText = getConversionUnitByKey("IN").name;
    diameterUnitOptionCm.innerText = getConversionUnitByKey("CM").name;
    circumferenceUnitOptionIn.innerText = getConversionUnitByKey("IN").name;
    circumferenceUnitOptionCm.innerText = getConversionUnitByKey("CM").name;

    circumferenceInput.addEventListener("input", () => {
        const circumference = parseFloat(circumferenceInput.value);
        if (isNaN(circumference)) {
            return;
        }

        const diameter = convertToDiameter(
            circumference,
            circumferenceUnitSelect.value as ConversionUnitId,
            diameterUnitSelect.value as ConversionUnitId
        );

        diameterInput.value = diameter.toFixed(2);
    });

    diameterInput.addEventListener("input", () => {
        const diameter = parseFloat(diameterInput.value);
        if (isNaN(diameter)) {
            return;
        }

        const circumference = convertToCircumference(
            diameter,
            diameterUnitSelect.value as ConversionUnitId,
            circumferenceUnitSelect.value as ConversionUnitId
        );

        circumferenceInput.value = circumference.toFixed(2);
    });

    circumferenceUnitSelect.addEventListener("change", () => {
        const circumference = parseFloat(circumferenceInput.value);
        const circumferenceUnit =
            circumferenceUnitSelect.value as ConversionUnitId;
        const diameterUnit = diameterUnitSelect.value as ConversionUnitId;

        if (!isNaN(circumference)) {
            const converted = convertToDiameter(
                circumference,
                circumferenceUnit,
                diameterUnit
            ).toFixed(2);

            diameterInput.value = converted;
        }
    });

    diameterUnitSelect.addEventListener("change", () => {
        const circumferenceUnit =
            circumferenceUnitSelect.value as ConversionUnitId;
        const diameter = parseFloat(diameterInput.value);
        const diameterUnit = diameterUnitSelect.value as ConversionUnitId;

        if (!isNaN(diameter)) {
            const converted = convertToCircumference(
                diameter,
                diameterUnit,
                circumferenceUnit
            ).toFixed(2);

            circumferenceInput.value = converted;
        }
    });
};
