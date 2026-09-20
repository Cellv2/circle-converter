import {
    CONVERSION_UNIT,
    type ConversionUnit,
    type ConversionUnitId,
} from "./calculations.types";

export const getConversionUnitByKey = (
    conversionUnitId: ConversionUnitId
): ConversionUnit => CONVERSION_UNIT[conversionUnitId];
