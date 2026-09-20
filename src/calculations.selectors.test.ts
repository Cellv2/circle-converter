import { describe, expect, it } from "vitest";
import { getConversionUnitByKey } from "./calculations.selectors";
import { CONVERSION_UNIT, type ConversionUnitId } from "./calculations.types";

describe("getConversionUnitByKey", () => {
    it("should return the correct conversion unit for each id", () => {
        for (const key of Object.keys(CONVERSION_UNIT) as ConversionUnitId[]) {
            expect(getConversionUnitByKey(key)).toEqual(CONVERSION_UNIT[key]);
        }
    });
});
