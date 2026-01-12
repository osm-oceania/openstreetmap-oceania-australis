import type {
  CameraFunctionSpecification,
  SourceFunctionSpecification,
} from '@maplibre/maplibre-gl-style-spec'

export type Stops<T> = Array<[number, T]>

/**
 * Creates an exponential function (default for 'stops').
 * Resolves the TypeScript error by explicity providing the 'type' property.
 *
 * @param stops - Array of [zoom, value] pairs
 * @returns A compliant specification object
 */
export function exponential<T>(
  stops: Stops<T>,
): CameraFunctionSpecification<T> {
  return { type: 'exponential', stops }
}

/**
 * Creates a generic stops function (aliased to exponential).
 * Good for general use where you want the default behavior.
 *
 * @param stops - Array of [zoom, value] pairs
 * @returns A compliant specification object
 */
export function stops<T>(values: Stops<T>): CameraFunctionSpecification<T> {
  return { type: 'exponential', stops: values }
}

/**
 * Creates an interval function (stepped).
 *
 * @param stops - Array of [zoom, value] pairs
 * @returns A compliant specification object
 */
export function interval<T>(stops: Stops<T>): CameraFunctionSpecification<T> {
  return { type: 'interval', stops }
}

/**
 * Helper for data-driven source functions
 */
export function sourceStops<T>(
  property: string,
  stops: Stops<T>,
): SourceFunctionSpecification<T> {
  return { type: 'exponential', property, stops }
}
