import { boundary } from '../constants/colours'
import { MaplibreLayerDefinition } from '../types/maplibre'
import { all, equals, notEquals } from '../utils/filters'
import { stops } from '../utils/style'

export default function boundaryLayer(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'boundary-country:outline',
      type: 'line',
      'source-layer': 'boundaries',
      filter: all([
        equals('admin_level', 2),
        notEquals('maritime', true),
        notEquals('disputed', true),
        notEquals('coastline', true),
      ]),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': boundary.countryOutline,
        'line-blur': 1,
        'line-width': stops([
          [2, 0],
          [3, 2],
          [10, 8],
        ]),
        'line-opacity': 0.75,
      },
    },
    {
      id: 'boundary-country-disputed:outline',
      type: 'line',
      'source-layer': 'boundaries',
      filter: all([
        equals('admin_level', 2),
        equals('disputed', true),
        notEquals('maritime', true),
        notEquals('coastline', true),
      ]),
      paint: {
        'line-width': stops([
          [2, 0],
          [3, 2],
          [10, 8],
        ]),
        'line-opacity': 0.75,
        'line-color': boundary.countryOutline,
      },
    },
    {
      id: 'boundary-state:outline',
      type: 'line',
      'source-layer': 'boundaries',
      filter: all([
        equals('admin_level', 4),
        notEquals('maritime', true),
        notEquals('disputed', true),
        notEquals('coastline', true),
      ]),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': boundary.stateOutline,
        'line-blur': 1,
        'line-width': stops([
          [7, 0],
          [8, 2],
          [10, 4],
        ]),
        'line-opacity': 0.75,
      },
    },
    {
      id: 'boundary-country',
      type: 'line',
      'source-layer': 'boundaries',
      filter: all([
        equals('admin_level', 2),
        notEquals('maritime', true),
        notEquals('disputed', true),
        notEquals('coastline', true),
      ]),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': boundary.country,
        'line-width': stops([
          [2, 0],
          [3, 1],
          [10, 4],
        ]),
      },
    },
    {
      id: 'boundary-country-disputed',
      type: 'line',
      'source-layer': 'boundaries',
      filter: all([
        equals('admin_level', 2),
        equals('disputed', true),
        notEquals('maritime', true),
        notEquals('coastline', true),
      ]),
      layout: { 'line-cap': 'square' },
      paint: {
        'line-width': stops([
          [2, 0],
          [3, 1],
          [10, 4],
        ]),
        'line-color': boundary.countryDisputed,
        'line-dasharray': [2, 1],
      },
    },
    {
      id: 'boundary-state',
      type: 'line',
      'source-layer': 'boundaries',
      filter: all([
        equals('admin_level', 4),
        notEquals('maritime', true),
        notEquals('disputed', true),
        notEquals('coastline', true),
      ]),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': boundary.state,
        'line-width': stops([
          [7, 0],
          [8, 1],
          [10, 2],
        ]),
      },
    },
  ]
}
