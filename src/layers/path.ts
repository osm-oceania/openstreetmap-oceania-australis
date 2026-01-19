import { MaplibreLayerDefinition } from '../types/maplibre'
import { all, kindIn, notEquals } from '../utils/filters'
import { stops } from '../utils/style'

export default function pathLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'way-footway',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        notEquals('bridge', true),
        notEquals('tunnel', true),
        kindIn('footway'),
      ),
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
        'line-miter-limit': 5,
      },
      paint: {
        'line-width': stops([
          [15, 0],
          [16, 1.75],
          [18, 3],
          [20, 6],
        ]),
        'line-color': stops([
          [10.99, 'rgba(243, 220, 221, 1)'],
          [16, 'rgba(234, 119, 126, 1)'],
        ]),
        'line-offset': 0,
        'line-gap-width': 0,
        'line-dasharray': [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', [2, 2]],
          ['literal', [1, 2]],
        ],
      },
    },
    {
      id: 'way-steps',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        notEquals('bridge', true),
        notEquals('tunnel', true),
        kindIn('steps'),
      ),
      layout: { 'line-cap': 'butt', visibility: 'visible' },
      paint: {
        'line-width': stops([
          [15, 0],
          [16, 3],
          [18, 5],
          [20, 8],
        ]),
        'line-color': stops([
          [15.99, 'rgba(216, 102, 109, 1)'],
          [16, 'rgba(194, 80, 87, 1)'],
        ]),
        'line-dasharray': [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', [2, 2]],
          ['literal', [0.5, 0.4]],
        ],
      },
    },
    {
      id: 'way-path',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        notEquals('bridge', true),
        notEquals('tunnel', true),
        kindIn('path'),
      ),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-width': stops([
          [15, 0],
          [16, 1.75],
          [18, 3],
          [20, 6],
        ]),
        'line-color': stops([
          [10.99, 'rgba(243, 220, 221, 1)'],
          [16, 'rgba(216, 102, 109, 1)'],
        ]),
        'line-dasharray': [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', [2, 2]],
          ['literal', [1, 2]],
        ],
      },
    },
    {
      id: 'way-cycleway',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        notEquals('bridge', true),
        notEquals('tunnel', true),
        kindIn('cycleway'),
      ),
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
        visibility: 'visible',
        'line-miter-limit': 50,
      },
      paint: {
        'line-width': stops([
          [15, 0],
          [16, 1.75],
          [18, 3],
          [20, 6],
        ]),
        'line-color': 'rgba(95, 113, 248, 1)',
        'line-dasharray': [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', [2, 2]],
          ['literal', [1, 2]],
        ],
      },
    },
  ]
}
