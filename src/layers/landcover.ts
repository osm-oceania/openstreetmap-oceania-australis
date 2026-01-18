import { land } from '../constants/colours'
import type { MaplibreLayerDefinition } from '../types/maplibre'
import { kindIn } from '../utils/filters'
import { stops } from '../utils/style'

export default function landCoverLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'land-rock',
      type: 'fill',
      'source-layer': 'land',
      filter: kindIn('bare_rock', 'scree', 'shingle'),
      paint: { 'fill-color': land.rock },
    },
    {
      id: 'land-grass',
      type: 'fill',
      'source-layer': 'land',
      filter: kindIn('grass', 'grassland', 'meadow', 'wet_meadow'),
      paint: {
        'fill-color': land.grass,
        'fill-opacity': stops([
          [11, 0],
          [12, 1],
        ]),
      },
    },
    {
      id: 'land-garden',
      type: 'fill',
      'source-layer': 'land',
      filter: kindIn('allotments', 'garden'),
      paint: {
        'fill-color': land.garden,
        'fill-opacity': stops([
          [11, 0],
          [12, 1],
        ]),
      },
    },
    {
      id: 'land-forest',
      type: 'fill',
      'source-layer': 'land',
      filter: kindIn('forest'),
      paint: {
        'fill-color': land.forest,
        'fill-opacity': stops([
          [7, 0],
          [8, 0.7],
          [15, 0.7],
          [16, 1],
        ]),
      },
    },
    {
      id: 'land-vegetation',
      type: 'fill',
      'source-layer': 'land',
      filter: kindIn('heath', 'scrub'),
      paint: {
        'fill-color': land.vegetation,
        'fill-opacity': stops([
          [11, 0],
          [12, 1],
        ]),
      },
    },
    {
      id: 'land-sand',
      type: 'fill',
      'source-layer': 'land',
      filter: kindIn('beach', 'sand'),
      paint: { 'fill-color': land.sand },
    },
    {
      id: 'land-wetland',
      type: 'fill',
      'source-layer': 'land',
      filter: kindIn('bog', 'marsh', 'string_bog', 'swamp'),
      paint: { 'fill-color': land.wetland },
    },
  ]
}
