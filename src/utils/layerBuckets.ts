import type { MaplibreLayerDefinition } from '../types/maplibre'

export type Variant = 'tunnel' | 'normal' | 'bridge'

export type Family =
  | 'footway'
  | 'road'
  | 'transport'
  | 'boundary-under'
  | 'boundary-over'
  | 'aeroway'

export type BucketKey = `${Variant}:${Family}`

export type LayerBuckets = Partial<Record<BucketKey, MaplibreLayerDefinition[]>>

export function pushBucket(
  buckets: LayerBuckets,
  key: BucketKey,
  layers: MaplibreLayerDefinition[],
) {
  if (!buckets[key]) buckets[key] = []
  buckets[key]!.push(...layers)
}

export function mergeBuckets(...all: LayerBuckets[]): LayerBuckets {
  const out: LayerBuckets = {}
  for (const buckets of all) {
    for (const key in buckets) {
      const k = key as BucketKey
      if (!out[k]) out[k] = []
      out[k]!.push(...buckets[k]!)
    }
  }
  return out
}
