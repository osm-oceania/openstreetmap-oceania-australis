import { MaplibreLayerDefinition } from '../types/maplibre'
import { all, kindIn, notEquals } from '../utils/filters'
import { stops } from '../utils/style'

export default function pathOutlineLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'way-footway:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        notEquals('bridge', true),
        notEquals('tunnel', true),
        kindIn('footway'),
      ),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-width': stops([
          [15, 0],
          [15.99, 2],
          [16, 6],
          [18, 8],
          [20, 14],
        ]),
        'line-color': stops([
          [15.99, 'rgba(216, 102, 109, 1)'],
          [16, 'rgba(251, 228, 228, 1)'],
        ]),
        'line-opacity': [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', 0.5],
          ['literal', 1],
        ],
      },
    },
    {
      id: 'way-steps:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        notEquals('bridge', true),
        notEquals('tunnel', true),
        kindIn('steps'),
      ),
      layout: { 'line-cap': 'round', visibility: 'visible' },
      paint: {
        'line-width': stops([
          [15, 0],
          [15.99, 2],
          [16, 6],
          [18, 8],
          [20, 14],
        ]),
        'line-color': stops([
          [15.99, 'rgba(216, 102, 109, 1)'],
          [16, 'rgba(251, 228, 228, 1)'],
        ]),
        'line-opacity': [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', 0.5],
          ['literal', 1],
        ],
      },
    },
    {
      id: 'way-airport-taxiway:outline',
      type: 'line',
      'source-layer': 'streets',
      filter: ['==', 'kind', 'taxiway'],
      layout: { 'line-join': 'round' },
      paint: {
        'line-color': 'rgb(207,205,202)',
        'line-width': stops([
          [13, 0],
          [14, 2],
          [15, 10],
          [16, 14],
          [18, 20],
          [20, 40],
        ]),
      },
    },
    {
      id: 'way-airport-runway:outline',
      type: 'line',
      'source-layer': 'streets',
      filter: ['==', 'kind', 'runway'],
      layout: { 'line-join': 'round', 'line-cap': 'butt' },
      paint: {
        'line-color': 'rgba(207, 205, 202, 1)',
        'line-width': stops([
          [11, 0],
          [12, 6],
          [13, 9],
          [14, 16],
          [15, 24],
          [16, 40],
          [17, 100],
          [18, 160],
          [20, 300],
        ]),
      },
    },
    {
      id: 'way-path:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        notEquals('bridge', true),
        notEquals('tunnel', true),
        kindIn('path'),
      ),
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
        visibility: 'visible',
      },
      paint: {
        'line-width': stops([
          [15, 0],
          [15.99, 2],
          [16, 6],
          [18, 8],
          [20, 14],
        ]),
        'line-color': stops([
          [15.99, 'rgba(216, 102, 109, 1)'],
          [16, 'rgba(251, 228, 228, 1)'],
        ]),
        'line-opacity': [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', 0.5],
          ['literal', 1],
        ],
      },
    },
    {
      id: 'way-cycleway:outline',
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
      },
      paint: {
        'line-width': stops([
          [15, 0],
          [15.99, 2],
          [16, 6],
          [18, 8],
          [20, 14],
        ]),
        'line-color': stops([
          [15.99, 'rgba(95, 113, 248, 1)'],
          [16, 'rgba(231, 235, 249, 1)'],
        ]),
        'line-opacity': [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', 0.5],
          ['literal', 1],
        ],
      },
    },
  ]
}
