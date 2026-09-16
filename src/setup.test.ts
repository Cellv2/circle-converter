import { describe, expect, it } from "vitest";
import { setup } from "./setup";

class MockControl extends EventTarget {
    value: string;

    constructor(value: string) {
        super();
        this.value = value;
    }
}

const createSetupElements = (
    circumferenceUnit = "IN",
    diameterUnit = "IN"
) => ({
    circumferenceInput: new MockControl("") as HTMLInputElement,
    circumferenceUnitSelect: new MockControl(
        circumferenceUnit
    ) as HTMLSelectElement,
    diameterInput: new MockControl("") as HTMLInputElement,
    diameterUnitSelect: new MockControl(diameterUnit) as HTMLSelectElement,
});

describe("setup", () => {
    it("recalculates diameter using the circumference unit as the source unit", () => {
        const {
            circumferenceInput,
            circumferenceUnitSelect,
            diameterInput,
            diameterUnitSelect,
        } = createSetupElements();

        setup({
            circumferenceInput,
            circumferenceUnitSelect,
            diameterInput,
            diameterUnitSelect,
        });

        circumferenceInput.value = "12";
        circumferenceInput.dispatchEvent(new Event("input"));
        expect(diameterInput.value).toBe("3.82");

        diameterUnitSelect.value = "CM";
        diameterUnitSelect.dispatchEvent(new Event("change"));
        expect(circumferenceInput.value).toBe("4.72");

        circumferenceInput.value = "12";
        circumferenceInput.dispatchEvent(new Event("input"));
        expect(diameterInput.value).toBe("9.70");
    });

    it("recalculates circumference using the diameter unit as the source unit", () => {
        const {
            circumferenceInput,
            circumferenceUnitSelect,
            diameterInput,
            diameterUnitSelect,
        } = createSetupElements("CM", "IN");

        setup({
            circumferenceInput,
            circumferenceUnitSelect,
            diameterInput,
            diameterUnitSelect,
        });

        diameterInput.value = "12";
        diameterInput.dispatchEvent(new Event("input"));

        expect(circumferenceInput.value).toBe("95.76");
    });

    it("does not overwrite the paired field when the circumference input is not a number", () => {
        const {
            circumferenceInput,
            circumferenceUnitSelect,
            diameterInput,
            diameterUnitSelect,
        } = createSetupElements();

        setup({
            circumferenceInput,
            circumferenceUnitSelect,
            diameterInput,
            diameterUnitSelect,
        });

        diameterInput.value = "unchanged";
        circumferenceInput.value = "abc";
        circumferenceInput.dispatchEvent(new Event("input"));

        expect(diameterInput.value).toBe("unchanged");
    });
});
