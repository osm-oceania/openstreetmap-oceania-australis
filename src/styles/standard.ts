import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec'

import { styleBuilder } from '../build'
import aeroway from '../layers/aeroway'
import amenities from '../layers/amenity'
import amenities2 from '../layers/amenity2'
import area from '../layers/area'
import base from '../layers/base'
import boundary from '../layers/boundary'
import building from '../layers/building'
import label from '../layers/label'
import landCover from '../layers/landcover'
import landUse from '../layers/landuse'
import marking from '../layers/marking'
import path from '../layers/path'
import poi from '../layers/poi'
import rail from '../layers/rail'
import road from '../layers/road'
import symbol from '../layers/symbols'
import transport from '../layers/transport'
import water from '../layers/water'
import type {
  MaplibreLayerDefinition,
  StyleSpecification,
} from '../types/maplibre'
import {
  type BucketKey,
  type Family,
  type LayerBuckets,
  type Variant,
  mergeBuckets,
} from '../utils/layerBuckets'

function _pick(b: LayerBuckets, key: BucketKey) {
  return b[key] ?? []
}

/**
 * Pick layers from buckets across all variants and layer types.
 * Ensures proper render order: all casings, then all fills, then all dashes.
 */
function pickAllVariants(
  b: LayerBuckets,
  families: Family[],
  options?: {
    insert?: Array<
      ['before' | 'after', Variant, () => MaplibreLayerDefinition[]]
    >
  },
): MaplibreLayerDefinition[] {
  const variants: Variant[] = ['tunnel', 'normal', 'bridge']
  const layerTypes: ('casing' | 'fill' | 'dash')[] = ['casing', 'fill', 'dash']
  const allLayers: MaplibreLayerDefinition[] = []

  // For each layer type (casing, fill, dash)
  for (const layerType of layerTypes) {
    // For each variant (tunnel, normal, bridge)
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i]

      // Insert layers at specified positions (only on first layer type to avoid duplicates)
      if (layerType === 'casing' && options?.insert) {
        for (const [position, targetVariant, insertFn] of options.insert) {
          if (position === 'before' && variant === targetVariant) {
            allLayers.push(...insertFn())
          } else if (
            position === 'after' &&
            i > 0 &&
            variants[i - 1] === targetVariant
          ) {
            allLayers.push(...insertFn())
          }
        }
      }

      // For each family (footway, aeroway, road, transport)
      for (const family of families) {
        const key: BucketKey = `${variant}:${family}`
        const layers = b[key] ?? []
        const filtered = layers.filter((layer) =>
          layer.id.endsWith(`-${layerType}`),
        )
        allLayers.push(...filtered)
      }
    }
  }

  return allLayers
}

/**
 * Build the final MapLibre layer specifications by injecting the source property
 * for each layer.
 *
 * @returns MapLibre LayerSpecification array
 */
export function buildLayers(): LayerSpecification[] {
  const buckets = mergeBuckets(path(), aeroway(), transport(), road())

  const definitions: MaplibreLayerDefinition[] = [
    ...base(),
    ...landUse(),
    ...amenities(),
    ...landCover(),
    ...water(),
    ...amenities2(),
    ...building(),

    // Render all street layers (casings → fills → dashes across all variants)
    ...pickAllVariants(buckets, ['footway', 'aeroway', 'road', 'transport'], {
      insert: [['after', 'tunnel', () => area()]],
    }),

    ...boundary(),

    ...rail(),
    ...label(),
    ...poi(),
    ...marking(),
    ...symbol(),
  ]

  return styleBuilder(definitions, {
    source: process.env.TILE_SOURCE || 'shortbread',
  })
}

/**
 * The output MapLibre style specification.
 */
export const standardJson: StyleSpecification = {
  version: 8,
  name: 'oceania-australis-standard',
  metadata: {
    license: 'https://creativecommons.org/publicdomain/zero/1.0/',
    'maputnik:renderer': 'mlgljs',
  },
  projection: { type: 'mercator' },
  center: [-27.75, 145.6],
  zoom: 3,
  sources: {
    shortbread: {
      type: 'vector',
      url: 'https://tiles.kurisu.dev/data/oceania.json',
    },
  },
  sprite: [
    {
      id: 'basics',
      url: 'https://tiles.kurisu.dev/styles/oceania-australis/sprite/basics',
    },
    {
      id: 'transport',
      url: 'https://tiles.kurisu.dev/styles/oceania-australis/sprite/transport',
    },
  ],
  glyphs: 'https://tiles.versatiles.org/assets/glyphs/{fontstack}/{range}.pbf',
  layers: buildLayers(),
}
