import { kindIn, kindEquals, surfaceOnly } from '../utils/filters'
import { stops } from '../utils/style'
import type { MaplibreLayerDefinition } from '../types/maplibre'
import { water } from '../constants/colours'

export default function waterLayers(): MaplibreLayerDefinition[] {
  return [
    {
      id: 'water-river',
      type: 'line',
      'source-layer': 'water_lines',
      filter: surfaceOnly('river'),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': water.river,
        'line-width': stops([
          [9, 0],
          [10, 3],
          [15, 5],
          [17, 9],
          [18, 20],
          [20, 60],
        ]),
      },
    },
    {
      id: 'water-canal',
      type: 'line',
      'source-layer': 'water_lines',
      filter: surfaceOnly('canal'),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': water.canal,
        'line-width': stops([
          [9, 0],
          [10, 2],
          [15, 4],
          [17, 8],
          [18, 17],
          [20, 50],
        ]),
      },
    },
    {
      id: 'water-stream',
      type: 'line',
      'source-layer': 'water_lines',
      filter: surfaceOnly('stream'),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': water.stream,
        'line-width': stops([
          [13, 0],
          [14, 1],
          [15, 2],
          [17, 6],
          [18, 12],
          [20, 30],
        ]),
      },
    },
    {
      id: 'water-ditch',
      type: 'line',
      'source-layer': 'water_lines',
      filter: surfaceOnly('ditch'),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': water.ditch,
        'line-width': stops([
          [14, 0],
          [15, 1],
          [17, 4],
          [18, 8],
          [20, 20],
        ]),
      },
    },
    {
      id: 'water-area',
      type: 'fill',
      'source-layer': 'water_polygons',
      filter: kindEquals('water'),
      paint: {
        'fill-color': water.area,
        'fill-opacity': stops([
          [4, 0],
          [6, 1],
        ]),
      },
    },
    {
      id: 'water-area-river',
      type: 'fill',
      'source-layer': 'water_polygons',
      filter: kindEquals('river'),
      paint: {
        'fill-color': water.river,
        'fill-opacity': stops([
          [4, 0],
          [6, 1],
        ]),
      },
    },
    {
      id: 'water-area-small',
      type: 'fill',
      'source-layer': 'water_polygons',
      filter: kindIn('reservoir', 'basin', 'dock'),
      paint: {
        'fill-color': water.area,
        'fill-opacity': stops([
          [4, 0],
          [6, 1],
        ]),
      },
    },
    {
      id: 'water-dam-area',
      type: 'fill',
      'source-layer': 'dam_polygons',
      filter: kindEquals('dam'),
      paint: {
        'fill-color': water.damArea,
        'fill-opacity': stops([
          [12, 0],
          [13, 1],
        ]),
        'fill-outline-color': water.damAreaOutline,
      },
    },
    {
      id: 'water-dam',
      type: 'line',
      'source-layer': 'dam_lines',
      filter: kindEquals('dam'),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': water.dam },
    },
    {
      id: 'water-pier-area',
      type: 'fill',
      'source-layer': 'pier_polygons',
      filter: kindIn('pier', 'breakwater', 'groyne'),
      paint: {
        'fill-color': water.pierArea,
        'fill-opacity': stops([
          [12, 0],
          [13, 1],
        ]),
      },
    },
    {
      id: 'water-pier',
      type: 'line',
      'source-layer': 'pier_lines',
      filter: kindIn('pier', 'breakwater', 'groyne'),
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: { 'line-color': water.pier },
    },
  ]
}
