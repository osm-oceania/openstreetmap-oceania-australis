import { amenity } from '../constants/colours'
import type { MaplibreLayerDefinition } from '../types/maplibre'
import { kindEquals, kindIn } from '../utils/filters'

export default function amenityLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'site-university',
      type: 'fill',
      'source-layer': 'sites',
      filter: kindIn('university'),
      paint: {
        'fill-color': amenity.university,
        'fill-opacity': 0.1,
        'fill-outline-color': amenity.universityOutline,
      },
    },
    {
      id: 'site-college',
      type: 'fill',
      'source-layer': 'sites',
      filter: kindIn('college'),
      paint: { 'fill-color': amenity.college, 'fill-opacity': 0.1 },
    },
    {
      id: 'site-school',
      type: 'fill',
      'source-layer': 'sites',
      filter: kindEquals('school', 'kindergarten'),
      paint: {
        'fill-color': amenity.school,
        'fill-opacity': 0.15,
        'fill-outline-color': amenity.schoolOutline,
      },
    },
    {
      id: 'site-hospital',
      type: 'fill',
      'source-layer': 'sites',
      filter: kindIn('hospital'),
      paint: {
        'fill-color': amenity.hospital,
        'fill-outline-color': amenity.hospitalOutline,
      },
    },
    {
      id: 'airport-area',
      type: 'fill',
      'source-layer': 'street_polygons',
      filter: kindIn('runway', 'taxiway'),
      paint: { 'fill-color': amenity.airport },
    },
  ]
}
