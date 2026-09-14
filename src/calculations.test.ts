import { describe, expect, it } from "vitest";
import { convertToCircumference, convertToDiameter } from "./calculations";

describe("convertToCircumference", () => {
    it("calculates circumference with CM input and output", () => {
        const diameter = 10;

        const circumference = convertToCircumference(diameter, "CM", "CM");

        expect(circumference).toBeCloseTo(31.4159);
    });

    it("calculates circumference with IN input and output", () => {
        const diameter = 5;

        const circumference = convertToCircumference(diameter, "IN", "IN");

        expect(circumference).toBeCloseTo(15.708);
    });

    it("calculates circumference with CM input and IN output", () => {
        const diameter = 10;

        const circumference = convertToCircumference(diameter, "CM", "IN");

        expect(circumference).toBeCloseTo(12.3684);
    });

    it("calculates circumference with IN input and CM output", () => {
        const diameter = 10;

        const circumference = convertToCircumference(diameter, "IN", "CM");

        expect(circumference).toBeCloseTo(79.7965);
    });
});

describe("convertToDiameter", () => {
    it("calculates circumference with CM input and output", () => {
        const circumference = 10;

        const diameter = convertToDiameter(circumference, "CM", "CM");

        expect(diameter).toBeCloseTo(3.1831);
    });

    it("calculates circumference with IN input output", () => {
        const circumference = 5;

        const diameter = convertToDiameter(circumference, "CM", "CM");

        expect(diameter).toBeCloseTo(1.5915);
    });

    it("calculates circumference with CM input and IN output", () => {
        const circumference = 10;

        const diameter = convertToDiameter(circumference, "CM", "IN");

        expect(diameter).toBeCloseTo(1.2529);
    });

    it("calculates circumference with IN input and CM output", () => {
        const circumference = 10;

        const diameter = convertToDiameter(circumference, "IN", "CM");

        expect(diameter).toBeCloseTo(8.0851);
    });
});
