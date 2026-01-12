import type { FilterSpecification } from '@maplibre/maplibre-gl-style-spec'

/**
 * MapLibre Style Spec Filter Utilities
 *
 * Helper functions to generate MapLibre filter expressions in a type-safe way.
 * These helpers strictly adhere to the FilterSpecification from MapLibre.
 * @see https://maplibre.org/maplibre-style-spec/expressions/
 */

type Key = string
type Value = string | number | boolean

/**
 * Creates an equality filter for a property
 * @param property - The property name to filter on
 * @param value - The value to match
 * @returns Filter expression: ["==", property, value]
 */
export function equals(property: Key, value: Value): FilterSpecification {
  return ['==', property, value]
}

/**
 * Creates a not-equals filter for a property
 * @param property - The property name to filter on
 * @param value - The value to not match
 * @returns Filter expression: ["!=", property, value]
 */
export function notEquals(property: Key, value: Value): FilterSpecification {
  return ['!=', property, value]
}

/**
 * Creates an "in" filter for a property matching any of the provided values
 * @param property - The property name to filter on
 * @param values - Array of values to match against
 * @returns Filter expression: ["in", property, ...values]
 */
export function inValues(
  property: Key,
  ...values: Value[]
): FilterSpecification {
  return ['in', property, ...values]
}

/**
 * Creates a "!in" (not in) filter for a property not matching any of the provided values
 * @param property - The property name to filter on
 * @param values - Array of values to exclude
 * @returns Filter expression: ["!in", property, ...values]
 */
export function notInValues(
  property: Key,
  ...values: Value[]
): FilterSpecification {
  return ['!in', property, ...values]
}

/**
 * Creates a greater than filter
 * @param property - The property name to filter on
 * @param value - The value to compare against
 * @returns Filter expression: [">", property, value]
 */
export function greaterThan(property: Key, value: Value): FilterSpecification {
  return ['>', property, value]
}

/**
 * Creates a greater than or equal to filter
 * @param property - The property name to filter on
 * @param value - The value to compare against
 * @returns Filter expression: [">=", property, value]
 */
export function greaterThanOrEqual(
  property: Key,
  value: Value,
): FilterSpecification {
  return ['>=', property, value]
}

/**
 * Creates a less than filter
 * @param property - The property name to filter on
 * @param value - The value to compare against
 * @returns Filter expression: ["<", property, value]
 */
export function lessThan(property: Key, value: Value): FilterSpecification {
  return ['<', property, value]
}

/**
 * Creates a less than or equal to filter
 * @param property - The property name to filter on
 * @param value - The value to compare against
 * @returns Filter expression: ["<=", property, value]
 */
export function lessThanOrEqual(
  property: Key,
  value: Value,
): FilterSpecification {
  return ['<=', property, value]
}

/**
 * Creates a "has" filter to check if a property exists
 * @param property - The property name to check for existence
 * @returns Filter expression: ["has", property]
 */
export function has(property: Key): FilterSpecification {
  return ['has', property]
}

/**
 * Creates a "!has" (not has) filter to check if a property doesn't exist
 * @param property - The property name to check for non-existence
 * @returns Filter expression: ["!has", property]
 */
export function notHas(property: Key): FilterSpecification {
  return ['!has', property]
}

/**
 * Combines multiple filter expressions with AND logic
 * @param filters - Array of filter expressions to combine
 * @returns Filter expression: ["all", ...filters]
 */
export function all(...filters: FilterSpecification[]): FilterSpecification {
  return ['all', ...filters] as unknown as FilterSpecification
}

/**
 * Combines multiple filter expressions with OR logic
 * @param filters - Array of filter expressions to combine
 * @returns Filter expression: ["any", ...filters]
 */
export function any(...filters: FilterSpecification[]): FilterSpecification {
  return ['any', ...filters] as unknown as FilterSpecification
}

/**
 * Negates a filter expression
 * @param filters - The filter expressions to negate
 * @returns Filter expression: ["none", ...filters]
 */
export function none(...filters: FilterSpecification[]): FilterSpecification {
  return ['none', ...filters] as unknown as FilterSpecification
}

// ============================================================================
// Common convenience helpers for frequently used patterns
// ============================================================================

/**
 * Creates a filter for kind property equality (most common use case)
 * Automatically wraps in "all" for consistency
 * @param values - One or more kind values to match
 * @returns Filter expression
 */
export function kindEquals(...values: Value[]): FilterSpecification {
  if (values.length === 1) {
    return ['all', ['==', 'kind', values[0]]] as unknown as FilterSpecification
  }
  return ['all', ['in', 'kind', ...values]] as unknown as FilterSpecification
}

/**
 * Creates a filter for kind property matching multiple values
 * Does NOT wrap in "all" - use for simpler filters or when combining manually
 * @param values - Array of kind values to match
 * @returns Filter expression: ["in", "kind", ...values]
 */
export function kindIn(...values: Value[]): FilterSpecification {
  return ['in', 'kind', ...values]
}

/**
 * Creates a filter combining kind check with tunnel=true
 * @param values - Kind values to match
 * @returns Filter expression combining kind and tunnel checks
 */
export function tunnelKind(...values: Value[]): FilterSpecification {
  if (values.length === 1) {
    return all(equals('tunnel', true), equals('kind', values[0]))
  }
  return all(equals('tunnel', true), inValues('kind', ...values))
}

/**
 * Creates a filter combining kind check with bridge=true
 * @param values - Kind values to match
 * @returns Filter expression combining kind and bridge checks
 */
export function bridgeKind(...values: Value[]): FilterSpecification {
  if (values.length === 1) {
    return all(equals('bridge', true), equals('kind', values[0]))
  }
  return all(equals('bridge', true), inValues('kind', ...values))
}

/**
 * Creates a filter excluding tunnel and bridge (surface features only)
 * @param kindValues - Optional kind values to also match
 * @returns Filter expression excluding tunnels and bridges
 */
export function surfaceOnly(...kindValues: Value[]): FilterSpecification {
  const filters: FilterSpecification[] = [
    notEquals('tunnel', true),
    notEquals('bridge', true),
  ]

  if (kindValues.length === 1) {
    filters.push(equals('kind', kindValues[0]))
  } else if (kindValues.length > 1) {
    filters.push(inValues('kind', ...kindValues))
  }

  return all(...filters)
}

/**
 * Creates a filter for link roads (e.g., motorway_link, primary_link)
 * @param kindValues - Optional kind values to also match
 * @returns Filter expression for link roads
 */
export function linkRoad(...kindValues: Value[]): FilterSpecification {
  if (kindValues.length === 0) {
    return all(equals('link', true))
  }
  if (kindValues.length === 1) {
    return all(equals('link', true), equals('kind', kindValues[0]))
  }
  return all(equals('link', true), inValues('kind', ...kindValues))
}

/**
 * Creates a filter for non-link roads
 * @param kindValues - Optional kind values to also match
 * @returns Filter expression for non-link roads
 */
export function notLinkRoad(...kindValues: Value[]): FilterSpecification {
  if (kindValues.length === 0) {
    return all(notEquals('link', true))
  }
  if (kindValues.length === 1) {
    return all(notEquals('link', true), equals('kind', kindValues[0]))
  }
  return all(notEquals('link', true), inValues('kind', ...kindValues))
}
