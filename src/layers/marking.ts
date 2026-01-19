import { MaplibreLayerDefinition } from '../types/maplibre'
import { all, equals, kindIn } from '../utils/filters'
import { stops } from '../utils/style'

export default function markingLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'marking-oneway',
      type: 'symbol',
      'source-layer': 'streets',
      minzoom: 16,
      filter: all(
        equals('oneway', true),
        kindIn(
          'motorway',
          'trunk',
          'primary',
          'secondary',
          'tertiary',
          'unclassified',
          'residential',
          'living_street',
          'busway',
        ),
      ),
      layout: {
        'symbol-placement': 'line',
        'symbol-spacing': 175,
        'icon-rotate': 90,
        'icon-rotation-alignment': 'map',
        'icon-padding': 5,
        'symbol-avoid-edges': true,
        'icon-image': 'basics:marking-arrow',
        'text-font': ['noto_sans_regular'],
      },
      paint: {
        'icon-opacity': stops([
          [16, 0],
          [17, 0.4],
          [20, 0.4],
        ]),
        'text-opacity': stops([
          [16, 0],
          [17, 0.4],
          [20, 0.4],
        ]),
      },
    },
    {
      id: 'marking-oneway-reverse',
      type: 'symbol',
      'source-layer': 'streets',
      minzoom: 16,
      filter: all(
        equals('oneway_reverse', true),
        kindIn(
          'motorway',
          'trunk',
          'primary',
          'secondary',
          'tertiary',
          'unclassified',
          'residential',
          'living_street',
        ),
      ),
      layout: {
        'symbol-placement': 'line',
        'symbol-spacing': 75,
        'icon-rotate': -90,
        'icon-rotation-alignment': 'map',
        'icon-padding': 5,
        'symbol-avoid-edges': true,
        'icon-image': 'basics:marking-arrow',
        'text-font': ['noto_sans_regular'],
      },
      paint: {
        'icon-opacity': stops([
          [16, 0],
          [17, 0.4],
          [20, 0.4],
        ]),
        'text-opacity': stops([
          [16, 0],
          [17, 0.4],
          [20, 0.4],
        ]),
      },
    },
  ]
}
