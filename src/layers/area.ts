import { MaplibreLayerDefinition } from '../types/maplibre'
import { all, kindEquals, notEquals } from '../utils/filters'
import { stops } from '../utils/style'

export default function areaLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'bridge',
      type: 'fill',
      'source-layer': 'bridges',
      layout: { visibility: 'visible' },
      paint: {
        'fill-color': 'rgb(244,239,233)',
        'fill-antialias': true,
        'fill-opacity': 0.75,
        'fill-outline-color': 'rgb(244,239,233)',
      },
    },
    {
      id: 'street-pedestrian-zone',
      type: 'fill',
      'source-layer': 'street_polygons',
      filter: all(
        notEquals('bridge', true),
        notEquals('tunnel', true),
        kindEquals('pedestrian'),
      ),
      paint: {
        'fill-color': 'rgba(60, 88, 116, 0.13)',
        'fill-opacity': stops([
          [12, 0],
          [13, 1],
          [14, 0],
          [15, 1],
        ]),
      },
    },
  ]
}
