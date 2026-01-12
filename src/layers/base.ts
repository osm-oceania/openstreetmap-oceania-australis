import type { MaplibreLayerDefinition } from '../types/maplibre'
import { base as baseColour } from '../constants/colours'
import { kindEquals } from '../utils/filters'

export default function base(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'background',
      type: 'background',
      paint: { 'background-color': baseColour.background },
    },
    {
      id: 'water-ocean',
      type: 'fill',
      'source-layer': 'ocean',
      paint: { 'fill-color': baseColour.ocean },
    },
    {
      id: 'land-glacier',
      type: 'fill',
      'source-layer': 'water_polygons',
      filter: kindEquals('glacier'),
      paint: { 'fill-color': baseColour.landGlacier },
    },
  ]
}
