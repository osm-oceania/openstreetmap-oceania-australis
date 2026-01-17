import { MaplibreLayerDefinition, StyleSpecification } from '../types/maplibre'
import { LayerSpecification } from '@maplibre/maplibre-gl-style-spec'

import base from '../layers/base'
import landUse from '../layers/landuse'
import amenities from '../layers/amenity'
import landCover from '../layers/landcover'
import water from '../layers/water'
import building from '../layers/building'
// import road from '../layers/road'
// import rail from '../layers/rail'
// import path from '../layers/path'
import boundary from '../layers/boundary'
import label from '../layers/label'
import poi from '../layers/poi'

export function buildLayers(): MaplibreLayerDefinition[] {
  // This is where you enforce the final draw order.
  // Start from your existing style.json ordering and keep it here.
  return [
    ...base(),
    ...landUse(),
    ...amenities(),
    ...landCover(),
    ...water(),
    ...building(),
    ...boundary(),
    // ...road(),
    // ...rail(),
    // ...path(),
    ...label(),
    ...poi(),
  ]
}

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
