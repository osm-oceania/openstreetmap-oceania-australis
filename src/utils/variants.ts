import { equals, notEquals } from '../utils/filters'

export const VARIANT_FILTERS = {
  tunnel: [equals('tunnel', true)],
  bridge: [equals('bridge', true)],
  normal: [notEquals('tunnel', true), notEquals('bridge', true)],
} as const
