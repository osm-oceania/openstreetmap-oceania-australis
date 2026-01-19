import { MaplibreLayerDefinition } from '../types/maplibre'
import { kindEquals } from '../utils/filters'
import { stops } from '../utils/style'

export default function transportLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'way-airport-taxiway',
      type: 'line',
      'source-layer': 'streets',
      filter: kindEquals('taxiway'),
      layout: { 'line-join': 'round', 'line-cap': 'butt' },
      paint: {
        'line-color': 'rgba(154, 154, 154, 1)',
        'line-width': stops([
          [13, 0],
          [14, 1],
          [15, 8],
          [16, 25],
          [18, 100],
          [20, 200],
        ]),
        'line-opacity': stops([
          [11, 0],
          [12, 1],
        ]),
      },
    },
    {
      id: 'way-airport-runway',
      type: 'line',
      'source-layer': 'streets',
      filter: kindEquals('runway'),
      layout: { 'line-join': 'round' },
      paint: {
        'line-color': 'rgba(92, 92, 92, 1)',
        'line-width': stops([
          [11, 0],
          [12, 5],
          [13, 8],
          [14, 14],
          [15, 22],
          [16, 38],
          [17, 98],
          [18, 158],
          [20, 298],
        ]),
        'line-opacity': stops([
          [11, 0],
          [12, 1],
        ]),
      },
    },
    {
      id: 'way-airport-taxiway:centreline',
      type: 'line',
      'source-layer': 'streets',
      filter: kindEquals('taxiway'),
      layout: { 'line-join': 'round' },
      paint: {
        'line-color': 'rgba(177, 177, 117, 1)',
        'line-width': stops([
          [13, 0],
          [14, 0],
          [15, 2],
          [16, 3],
          [18, 4],
          [20, 9],
        ]),
        'line-opacity': stops([
          [13, 0],
          [14, 1],
        ]),
      },
    },
    {
      id: 'way-airport-runway:centreline',
      type: 'line',
      'source-layer': 'streets',
      filter: kindEquals('runway'),
      layout: { 'line-join': 'round', visibility: 'visible' },
      paint: {
        'line-color': 'rgba(255, 255, 255, 1)',
        'line-opacity': 1,
        'line-width': stops([
          [10, 0],
          [17, 4],
        ]),
        'line-dasharray': [2, 1],
      },
    },
    {
      id: 'transport-ferry',
      type: 'line',
      'source-layer': 'ferries',
      minzoom: 10,
      paint: {
        'line-color': 'rgb(171,199,219)',
        'line-width': stops([
          [10, 1],
          [13, 2],
          [14, 3],
          [16, 4],
          [17, 6],
        ]),
        'line-opacity': stops([
          [10, 0],
          [11, 1],
        ]),
        'line-dasharray': [1, 1],
      },
    },
  ]
}
