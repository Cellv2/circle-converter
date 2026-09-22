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
    describe("when updating the diameter value last", () => {
        it("should convert the diameter value and recalculate circumference value when switching the diameter unit type", () => {
            const elements = createSetupElements();
            const { circumferenceInput, diameterInput, diameterUnitSelect } =
                elements;

            setup(elements);

            diameterInput.value = "12";
            circumferenceInput.value = "0";

            diameterInput.dispatchEvent(new Event("input"));
            expect(diameterInput.value).toBe("12");
            expect(circumferenceInput.value).toBe("37.70");

            diameterUnitSelect.value = "CM";
            diameterUnitSelect.dispatchEvent(new Event("change"));
            expect(diameterInput.value).toBe("30.48");
            expect(circumferenceInput.value).toBe("37.70");
        });

        it("should recalculate the circumference value when switching the circumference unit type", () => {
            const elements = createSetupElements();
            const {
                circumferenceInput,
                circumferenceUnitSelect,
                diameterInput,
            } = elements;

            setup(elements);

            diameterInput.value = "5";
            circumferenceInput.value = "0";

            diameterInput.dispatchEvent(new Event("input"));
            expect(diameterInput.value).toBe("5");
            expect(circumferenceInput.value).toBe("15.71");

            circumferenceUnitSelect.value = "CM";
            circumferenceUnitSelect.dispatchEvent(new Event("change"));
            expect(diameterInput.value).toBe("5.00");
            expect(circumferenceInput.value).toBe("39.90");
        });
    });

    describe("when updating the circumference value last", () => {
        it("should recalculate the diameter value when switching the diameter unit type", () => {
            const elements = createSetupElements("CM", "CM");
            const { circumferenceInput, diameterInput, diameterUnitSelect } =
                elements;

            setup(elements);

            circumferenceInput.value = "20";
            diameterInput.value = "0";

            circumferenceInput.dispatchEvent(new Event("input"));
            expect(circumferenceInput.value).toBe("20");
            expect(diameterInput.value).toBe("6.37");

            diameterUnitSelect.value = "IN";
            diameterUnitSelect.dispatchEvent(new Event("change"));
            expect(circumferenceInput.value).toBe("20.00");
            expect(diameterInput.value).toBe("2.51");
        });

        // TODO: should we do negatives? don't actually know what will happen honestly, pattern will probably flag it at least

        it("should convert the circumference value and recalculate the diameter value when switching the circumference unit type", () => {
            const elements = createSetupElements("CM", "CM");
            const {
                circumferenceInput,
                circumferenceUnitSelect,
                diameterInput,
            } = elements;

            setup(elements);

            circumferenceInput.value = "65";
            diameterInput.value = "-5";

            circumferenceInput.dispatchEvent(new Event("input"));
            expect(circumferenceInput.value).toBe("65");
            expect(diameterInput.value).toBe("20.69");

            circumferenceUnitSelect.value = "IN";
            circumferenceUnitSelect.dispatchEvent(new Event("change"));
            expect(circumferenceInput.value).toBe("25.59");
            expect(diameterInput.value).toBe("20.69");
        });
    });

    describe.skip("when a chain of value updates happen", () => {
        it("should use the most recently edited field as the source of truth for subsequent unit changes", () => {
            const elements = createSetupElements();
            const { circumferenceInput, diameterInput, diameterUnitSelect } =
                elements;

            setup(elements);

            diameterInput.value = "12";
            circumferenceInput.value = "0";

            diameterInput.dispatchEvent(new Event("input"));
            expect(diameterInput.value).toBe("12");
            expect(circumferenceInput.value).toBe("37.70");

            circumferenceInput.value = "7";

            circumferenceInput.dispatchEvent(new Event("input"));
            expect(circumferenceInput.value).toBe("7");
            expect(diameterInput.value).toBe("2.23");

            // we last updated circumference, so only the diameter should change if we update the diameter unit
            diameterUnitSelect.value = "CM";
            diameterUnitSelect.dispatchEvent(new Event("change"));
            expect(diameterInput.value).toBe("5.67");
            expect(circumferenceInput.value).toBe("7");
        });
    });

    // it("recalculates diameter using the circumference unit as the source unit", () => {
    //     const elements = createSetupElements();
    //     const { circumferenceInput, diameterInput, diameterUnitSelect } =
    //         elements;

    //     setup(elements);

    //     circumferenceInput.value = "12";
    //     circumferenceInput.dispatchEvent(new Event("input"));
    //     expect(diameterInput.value).toBe("3.82");

    //     diameterUnitSelect.value = "CM";
    //     diameterUnitSelect.dispatchEvent(new Event("change"));
    //     expect(circumferenceInput.value).toBe("4.72");

    //     circumferenceInput.value = "12";
    //     circumferenceInput.dispatchEvent(new Event("input"));
    //     expect(diameterInput.value).toBe("9.70");
    // });

    // it("recalculates circumference using the diameter unit as the source unit", () => {
    //     const elements = createSetupElements("CM", "IN");
    //     const { diameterInput, circumferenceInput } = elements;

    //     setup(elements);

    //     diameterInput.value = "12";
    //     diameterInput.dispatchEvent(new Event("input"));

    //     expect(circumferenceInput.value).toBe("95.76");
    // });

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
