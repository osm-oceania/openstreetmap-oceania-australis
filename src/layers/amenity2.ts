import { MaplibreLayerDefinition } from '../types/maplibre'

export default function amenityLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'site-dangerarea',
      type: 'fill',
      'source-layer': 'sites',
      filter: ['in', 'kind', 'danger_area'],
      paint: {
        'fill-color': 'rgb(255,0,0)',
        'fill-outline-color': 'rgb(255,0,0)',
        'fill-opacity': 0.3,
        'fill-pattern': 'basics:pattern-warning',
      },
    },
    {
      id: 'site-prison',
      type: 'fill',
      'source-layer': 'sites',
      filter: ['in', 'kind', 'prison'],
      paint: {
        'fill-color': 'rgba(72, 60, 84, 1)',
        'fill-pattern': 'basics:pattern-striped',
        'fill-opacity': 0.05,
      },
    },
    {
      id: 'site-military',
      type: 'fill',
      'source-layer': 'sites',
      filter: ['in', 'kind', 'military'],
      paint: {
        'fill-color': 'rgba(72, 60, 84, 1)',
        'fill-pattern': 'basics:pattern-striped',
        'fill-opacity': 0.05,
      },
    },
    {
      id: 'site-parking',
      type: 'fill',
      'source-layer': 'sites',
      filter: ['in', 'kind', 'parking'],
      paint: { 'fill-color': 'rgba(219, 219, 224, 1)' },
    },
    {
      id: 'site-bicycleparking',
      type: 'fill',
      'source-layer': 'sites',
      filter: ['in', 'kind', 'bicycle_parking'],
      paint: { 'fill-color': 'rgb(235,232,230)' },
    },
    {
      id: 'site-construction',
      type: 'fill',
      'source-layer': 'sites',
      filter: ['in', 'kind', 'construction'],
      layout: { visibility: 'visible' },
      paint: {
        'fill-color': 'rgba(203, 191, 139, 0.9)',
        'fill-opacity': 0.2,
        'fill-antialias': false,
        'fill-outline-color': 'rgba(168, 168, 65, 1)',
        'fill-pattern': 'basics:pattern-hatched_thin',
      },
    },
  ]
}
