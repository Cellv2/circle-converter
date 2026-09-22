import type { ConversionUnitId } from "./calculations.types";

export const convertCmToIn = (value: number): number => value / 2.54;
export const convertInToCm = (value: number): number => value * 2.54;

export const convertToCircumference = (
    diameter: number,
    sourceUnit: ConversionUnitId,
    targetUnit: ConversionUnitId
): number => {
    if (sourceUnit === targetUnit) {
        return diameter * Math.PI;
    }

    if (sourceUnit === "CM") {
        diameter = convertCmToIn(diameter);
    }

    if (sourceUnit === "IN") {
        diameter = convertInToCm(diameter);
    }

    return diameter * Math.PI;
};

export const convertToDiameter = (
    circumference: number,
    sourceUnit: ConversionUnitId,
    targetUnit: ConversionUnitId
): number => {
    if (sourceUnit === targetUnit) {
        return circumference / Math.PI;
    }

    if (sourceUnit === "CM") {
        circumference = convertCmToIn(circumference);
    }

    if (sourceUnit === "IN") {
        circumference = convertInToCm(circumference);
    }

    return circumference / Math.PI;
};
