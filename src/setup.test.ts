import { describe, expect, it } from "vitest";
import { setup } from "./setup";

class MockControl extends EventTarget {
    innerText = "";
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
    diameterUnitOptionIn: new MockControl("") as HTMLOptionElement,
    diameterUnitOptionCm: new MockControl("") as HTMLOptionElement,
    circumferenceUnitOptionIn: new MockControl("") as HTMLOptionElement,
    circumferenceUnitOptionCm: new MockControl("") as HTMLOptionElement,
});

describe("setup", () => {
    describe.skip("when updating the circumference value last", () => {
        it(
            "recalculates the diameter value when switching the diameter unit type"
        );
        it(
            "recalculates the circumference value when switching the circumference unit type"
        );
    });

    describe.skip("when updating the diameter value last", () => {
        it(
            "recalculates the diameter value when switching the diameter unit type"
        );
        it(
            "recalculates the circumference value when switching the circumference unit type"
        );
    });

    describe.skip("source of truth tracking", () => {
        it(
            "switches from circumference to diameter after the diameter input is edited"
        );
    });

    it("recalculates diameter using the circumference unit as the source unit", () => {
        const elements = createSetupElements();
        const { circumferenceInput, diameterInput, diameterUnitSelect } =
            elements;

        setup(elements);

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
        const elements = createSetupElements("CM", "IN");
        const { diameterInput, circumferenceInput } = elements;

        setup(elements);

        diameterInput.value = "12";
        diameterInput.dispatchEvent(new Event("input"));

        expect(circumferenceInput.value).toBe("95.76");
    });

    it("does not overwrite the paired field when the circumference input is not a number", () => {
        const elements = createSetupElements();
        const { diameterInput, circumferenceInput } = elements;

        setup(elements);

        diameterInput.value = "unchanged";
        circumferenceInput.value = "abc";
        circumferenceInput.dispatchEvent(new Event("input"));

        expect(diameterInput.value).toBe("unchanged");
    });

    it("sets up the correct option naming in the UI", () => {
        const elements = createSetupElements();
        const {
            diameterUnitOptionIn,
            diameterUnitOptionCm,
            circumferenceUnitOptionIn,
            circumferenceUnitOptionCm,
        } = elements;

        setup(elements);

        expect([
            diameterUnitOptionIn.innerText,
            diameterUnitOptionCm.innerText,
            circumferenceUnitOptionIn.innerText,
            circumferenceUnitOptionCm.innerText,
        ]).toEqual(["in", "cm", "in", "cm"]);
    });
});
