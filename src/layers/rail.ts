import { rail } from '../constants/colours'
import { MaplibreLayerDefinition } from '../types/maplibre'
import { all, has, kindIn, notEquals, notHas } from '../utils/filters'
import { stops } from '../utils/style'

export default function railLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'transport-tram:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        kindIn('tram'),
        notHas('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.tramOutline,
        'line-width': stops([
          [15, 0],
          [16, 5],
          [18, 7],
          [20, 20],
        ]),
        'line-dasharray': [0.1, 0.5],
      },
    },
    {
      id: 'transport-narrowgauge:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        kindIn('narrow_gauge'),
        notHas('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.narrowgaugeOutline,
        'line-width': stops([
          [15, 0],
          [16, 5],
          [18, 7],
          [20, 20],
        ]),
        'line-dasharray': [0.1, 0.5],
      },
    },
    {
      id: 'transport-subway:outline',
      type: 'line',
      'source-layer': 'streets',
      filter: all(
        kindIn('subway'),
        notHas('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.subwayOutline,
        'line-width': stops([
          [11, 0],
          [12, 1],
          [15, 3],
          [16, 3],
          [18, 6],
          [19, 8],
          [20, 10],
        ]),
        'line-opacity': stops([
          [11, 0],
          [12, 1],
        ]),
      },
    },
    {
      id: 'transport-lightrail:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 8,
      filter: all(
        kindIn('light_rail'),
        notHas('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.lightrailOutline,
        'line-width': stops([
          [8, 1],
          [13, 1],
          [15, 1],
          [20, 14],
        ]),
        'line-opacity': stops([
          [11, 0],
          [12, 1],
        ]),
      },
    },
    {
      id: 'transport-lightrail-service:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 14,
      filter: all(
        kindIn('light_rail'),
        has('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.lightrailServiceOutline,
        'line-width': stops([
          [14, 0],
          [15, 1],
          [16, 1],
          [20, 14],
        ]),
      },
    },
    {
      id: 'transport-rail:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 8,
      filter: all(
        kindIn('rail'),
        notHas('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.railOutline,
        'line-width': stops([
          [8, 1],
          [13, 1],
          [15, 1],
          [20, 14],
        ]),
        'line-opacity': stops([
          [8, 0],
          [9, 1],
        ]),
      },
    },
    {
      id: 'transport-rail-service:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 14,
      filter: all(
        kindIn('rail'),
        has('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.railServiceOutline,
        'line-width': stops([
          [14, 0],
          [15, 1],
          [16, 1],
          [20, 14],
        ]),
      },
    },
    {
      id: 'transport-monorail:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        kindIn('monorail'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.monorailOutline,
        'line-width': stops([
          [15, 0],
          [16, 5],
          [18, 7],
          [20, 20],
        ]),
        'line-dasharray': [0.1, 0.5],
      },
    },
    {
      id: 'transport-funicular:outline',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        kindIn('funicular'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.funicularOutline,
        'line-width': stops([
          [15, 0],
          [16, 5],
          [18, 7],
          [20, 20],
        ]),
        'line-dasharray': [0.1, 0.5],
      },
    },
    {
      id: 'transport-tram',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 13,
      filter: all(
        kindIn('tram'),
        notHas('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-width': stops([
          [13, 0],
          [16, 1],
          [17, 2],
          [18, 3],
          [20, 5],
        ]),
        'line-color': rail.tram,
      },
    },
    {
      id: 'transport-narrowgauge',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 13,
      filter: all(
        kindIn('narrow_gauge'),
        notHas('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-width': stops([
          [13, 0],
          [16, 1],
          [17, 2],
          [18, 3],
          [20, 5],
        ]),
        'line-color': rail.narrowgauge,
      },
    },
    {
      id: 'transport-subway',
      type: 'line',
      'source-layer': 'streets',
      filter: all(
        kindIn('subway'),
        notHas('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.subway,
        'line-width': stops([
          [11, 0],
          [12, 1],
          [15, 2],
          [16, 2],
          [18, 5],
          [19, 6],
          [20, 8],
        ]),
        'line-dasharray': [2, 2],
        'line-opacity': stops([
          [14, 0],
          [15, 1],
        ]),
      },
    },
    {
      id: 'transport-lightrail',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 14,
      filter: all(
        kindIn('light_rail'),
        notHas('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.lightrail,
        'line-width': stops([
          [14, 0],
          [15, 1],
          [20, 10],
        ]),
        'line-dasharray': [2, 2],
        'line-opacity': stops([
          [14, 0],
          [15, 1],
        ]),
      },
    },
    {
      id: 'transport-lightrail-service',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        kindIn('light_rail'),
        has('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.lightrailService,
        'line-width': stops([
          [15, 0],
          [16, 1],
          [20, 10],
        ]),
        'line-dasharray': [2, 2],
      },
    },
    {
      id: 'transport-rail',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 14,
      filter: all(
        kindIn('rail'),
        notHas('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.rail,
        'line-width': stops([
          [14, 0],
          [15, 1],
          [20, 10],
        ]),
        'line-dasharray': [2, 2],
        'line-opacity': stops([
          [14, 0],
          [15, 1],
        ]),
      },
    },
    {
      id: 'transport-rail-service',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 15,
      filter: all(
        kindIn('rail'),
        has('service'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-color': rail.railService,
        'line-width': stops([
          [15, 0],
          [16, 1],
          [20, 10],
        ]),
        'line-dasharray': [2, 2],
      },
    },
    {
      id: 'transport-monorail',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 13,
      filter: all(
        kindIn('monorail'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-width': stops([
          [13, 0],
          [16, 1],
          [17, 2],
          [18, 3],
          [20, 5],
        ]),
        'line-color': rail.monorail,
      },
    },
    {
      id: 'transport-funicular',
      type: 'line',
      'source-layer': 'streets',
      minzoom: 13,
      filter: all(
        kindIn('funicular'),
        notEquals('bridge', true),
        notEquals('tunnel', true),
      ),
      paint: {
        'line-width': stops([
          [13, 0],
          [16, 1],
          [17, 2],
          [18, 3],
          [20, 5],
        ]),
        'line-color': rail.funicular,
      },
    },
  ]
}
