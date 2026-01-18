import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec'

import { styleBuilder } from '../build'
import amenities from '../layers/amenity'
import base from '../layers/base'
import boundary from '../layers/boundary'
import building from '../layers/building'
import label from '../layers/label'
import landCover from '../layers/landcover'
import landUse from '../layers/landuse'
// import path from '../layers/path'
import poi from '../layers/poi'
import rail from '../layers/rail'
import road from '../layers/road'
import symbol from '../layers/symbols'
import water from '../layers/water'
import { MaplibreLayerDefinition, StyleSpecification } from '../types/maplibre'

/**
 * Build the final MapLibre layer specifications by injecting the source property
 * for each layer.
 *
 * @returns MapLibre LayerSpecification array
 */
export function buildLayers(): LayerSpecification[] {
  const definitions: MaplibreLayerDefinition[] = [
    ...base(),
    ...landUse(),
    ...amenities(),
    ...landCover(),
    ...water(),
    ...building(),
    ...boundary(),
    ...road(),
    ...rail(),
    // ...path(),
    ...label(),
    ...poi(),
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
