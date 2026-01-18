import { land } from '../constants/colours'
import type { MaplibreLayerDefinition } from '../types/maplibre'
import { kindEquals } from '../utils/filters'
import { stops } from '../utils/style'

export default function landUseLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'land-industrial',
      type: 'fill',
      'source-layer': 'land',
      filter: kindEquals('industrial', 'quarry', 'railway'),
      paint: {
        'fill-color': land.industrial,
        'fill-opacity': stops([
          [10, 0],
          [11, 1],
        ]),
      },
    },
    {
      id: 'land-residential',
      type: 'fill',
      'source-layer': 'land',
      filter: kindEquals('garages', 'residential'),
      paint: {
        'fill-color': land.residential,
        'fill-opacity': stops([
          [10, 0],
          [11, 1],
        ]),
      },
    },
    {
      id: 'land-agriculture',
      type: 'fill',
      'source-layer': 'land',
      filter: kindEquals(
        'brownfield',
        'farmland',
        'farmyard',
        'greenfield',
        'greenhouse_horticulture',
        'orchard',
        'plant_nursery',
        'vineyard',
      ),
      paint: {
        'fill-color': land.agriculture,
        'fill-opacity': stops([
          [10, 0],
          [11, 1],
        ]),
      },
    },
    {
      id: 'land-commercial',
      type: 'fill',
      'source-layer': 'land',
      filter: kindEquals('commercial', 'retail'),
      paint: {
        'fill-color': land.commercial,
        'fill-opacity': stops([
          [10, 0],
          [11, 1],
        ]),
      },
    },
    {
      id: 'land-leisure',
      type: 'fill',
      'source-layer': 'land',
      filter: kindEquals('miniature_golf', 'playground', 'golf_course'),
      paint: { 'fill-color': land.leisure },
    },
    {
      id: 'land-burial',
      type: 'fill',
      'source-layer': 'land',
      filter: kindEquals('cemetery', 'grave_yard'),
      paint: {
        'fill-color': land.burial,
        'fill-opacity': stops([
          [13, 0],
          [14, 1],
        ]),
      },
    },
    {
      id: 'land-waste',
      type: 'fill',
      'source-layer': 'land',
      filter: kindEquals('landfill'),
      paint: {
        'fill-color': land.waste,
        'fill-opacity': stops([
          [10, 0],
          [11, 1],
        ]),
      },
    },
    {
      id: 'land-park',
      type: 'fill',
      'source-layer': 'land',
      filter: kindEquals('park', 'village_green', 'recreation_ground'),
      paint: {
        'fill-color': land.park,
        'fill-opacity': stops([
          [11, 0],
          [12, 1],
        ]),
      },
    },
  ]
}
