import { describe, expect, it } from "vitest";

describe("diameter", () => {
    it("calculates radius and circumference", () => {
        const diameter = 10;

        const radius = diameter / 2;
        const circumference = diameter * Math.PI;

        expect(radius).toBe(5);
        expect(circumference).toBeCloseTo(31.4159);
    });
});
