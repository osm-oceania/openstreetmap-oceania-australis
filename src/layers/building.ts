import { building } from '../constants/colours'
import { MaplibreLayerDefinition } from '../types/maplibre'
import { stops } from '../utils/style'

export default function buildingLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'building:outline',
      type: 'fill',
      'source-layer': 'buildings',
      paint: {
        'fill-color': building.outlineFill,
        'fill-opacity': stops([
          [14, 0],
          [15, 1],
        ]),
      },
    },
    {
      id: 'building',
      type: 'fill',
      'source-layer': 'buildings',
      paint: {
        'fill-color': building.buil,
        'fill-opacity': stops([
          [14, 0],
          [15, 1],
        ]),
        'fill-translate': [-2, -2],
        'fill-outline-color': building.outline,
      },
    },
  ]
}
