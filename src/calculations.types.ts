type ConversionUnitKey = "CM" | "IN";

export const CONVERSION_UNIT = {
    CM: { name: "cm", toCm: 1 },
    IN: { name: "in", toCm: 2.54 },
} as const satisfies Record<ConversionUnitKey, { name: string; toCm: number }>;

export type ConversionUnitId = keyof typeof CONVERSION_UNIT;
export type ConversionUnit = (typeof CONVERSION_UNIT)[ConversionUnitId];
