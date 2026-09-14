type ConversionUnitKey = "CM" | "IN";

export type ConversionUnitId = keyof typeof CONVERSION_UNIT;
export type ConversionUnit = (typeof CONVERSION_UNIT)[ConversionUnitId];

export const CONVERSION_UNIT = {
    CM: { name: "Centimetres" },
    IN: { name: "Inches" },
} as const satisfies Record<ConversionUnitKey, { name: string }>;
