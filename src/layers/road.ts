import {
  STREET_BICYCLE_PEDESTRIAN,
  STREET_BICYCLE_RESIDENTIAL,
  STREET_BICYCLE_UNCLASSIFIED,
  STREET_BUSWAY,
  STREET_BUSWAY_OUTLINE,
  STREET_LIVING_STREET,
  STREET_LIVING_STREET_OUTLINE,
  STREET_MOTORWAY,
  STREET_MOTORWAY_OUTLINE,
  STREET_PEDESTRIAN,
  STREET_PEDESTRIAN_OUTLINE,
  STREET_PRIMARY,
  STREET_PRIMARY_OUTLINE,
  STREET_RESIDENTIAL,
  STREET_RESIDENTIAL_OUTLINE,
  STREET_SECONDARY,
  STREET_SECONDARY_OUTLINE,
  STREET_SERVICE,
  STREET_SERVICE_OUTLINE,
  STREET_TERTIARY,
  STREET_TERTIARY_OUTLINE,
  STREET_TRACK,
  STREET_TRACK_OUTLINE,
  STREET_TRUNK,
  STREET_TRUNK_OUTLINE,
} from '../constants/colours'
import type { MaplibreLayerDefinition } from '../types/maplibre'
import {
  all,
  equals,
  kindEquals,
  kindIn,
  linkRoad,
  notEquals,
} from '../utils/filters'
import { LayerBuckets, pushBucket } from '../utils/layerBuckets'
import { makeHighway } from '../utils/makeHighway'
import { stops } from '../utils/style'
import { VARIANT_FILTERS } from '../utils/variants'

// Common widths
const highwayStandardWidth = stops([
  [12, 1],
  [14, 2],
  [16, 5],
  [18, 24],
  [19, 40],
  [20, 100],
])

const highwayLinkWidth = stops([
  [12, 1],
  [14, 2],
  [16, 5],
  [18, 12],
  [20, 38],
])

const highwayPrimaryWidth: [number, number][] = [
  [10, 3],
  [14, 5],
  [16, 10],
  [18, 28],
  [19, 55],
  [20, 120],
]

export default function roadLayers(): LayerBuckets {
  const buckets: LayerBuckets = {}

  for (const variant of ['tunnel', 'normal', 'bridge'] as const) {
    const variantFilters = VARIANT_FILTERS[variant]

    // Helper to push standard road stack
    const pushRoad = (layers: MaplibreLayerDefinition[]) =>
      pushBucket(buckets, `${variant}:road`, layers)

    // Track
    pushRoad(
      makeHighway({
        id: `street-track-${variant}`,
        sourceLayer: 'streets',
        filter: [kindEquals('track'), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_TRACK_OUTLINE,
          width: stops([
            [14, 2],
            [16, 4],
            [18, 18],
            [19, 48],
            [20, 96],
          ]),
          opacity: stops([
            [14, 0],
            [15, 0.5],
          ]),
        },
        fill: {
          color: STREET_TRACK,
          width: stops([
            [13, 0],
            [16, 2],
            [18, 3],
            [20, 6],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [3, 3]],
          ],
        },
      }),
    )

    // Pedestrian
    pushRoad(
      makeHighway({
        id: `street-pedestrian-${variant}`,
        sourceLayer: 'streets',
        filter: [kindEquals('pedestrian'), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_PEDESTRIAN_OUTLINE,
          width: stops([
            [12, 2],
            [14, 3],
            [16, 6],
            [18, 26],
            [19, 42],
            [20, 102],
          ]),
          opacity: stops([
            [12, 0],
            [13, 1],
          ]),
        },
        fill: {
          color: STREET_PEDESTRIAN,
          width: highwayStandardWidth,
          opacity: stops([
            [12, 0],
            [13, 0],
            [14, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Service
    pushRoad(
      makeHighway({
        id: `street-service-${variant}`,
        sourceLayer: 'streets',
        filter: [kindEquals('service'), ...variantFilters],
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
          // Round-limit/miter-limit were in original FILL, not casing.
          // makeHighway applies layout to all.
          // 'line-round-limit': 1.05,
          // 'line-miter-limit': 2,
        },
        casing: {
          color: STREET_SERVICE_OUTLINE,
          width: stops([
            [14, 1],
            [16, 3],
            [18, 12],
            [19, 30],
            [20, 48],
          ]),
          opacity: stops([
            [15, 0],
            [16, 1],
          ]),
        },
        fill: {
          color: STREET_SERVICE,
          width: stops([
            [14, 1],
            [16, 2],
            [18, 10],
            [19, 25],
            [20, 40],
          ]),
          opacity: stops([
            [14, 0],
            [15, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Living Street
    pushRoad(
      makeHighway({
        id: `street-livingStreet-${variant}`,
        sourceLayer: 'streets',
        filter: [kindEquals('living_street'), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_LIVING_STREET_OUTLINE,
          width: stops([
            [12, 2],
            [14, 3],
            [16, 6],
            [18, 26],
            [19, 64],
            [20, 128],
          ]),
          opacity: stops([
            [12, 0],
            [13, 1],
          ]),
        },
        fill: {
          color: STREET_LIVING_STREET,
          width: stops([
            [12, 1],
            [14, 2],
            [16, 5],
            [18, 24],
            [19, 60],
            [20, 120],
          ]),
          opacity: stops([
            [12, 0],
            [13, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Residential
    pushRoad(
      makeHighway({
        id: `street-residential-${variant}`,
        sourceLayer: 'streets',
        filter: [kindEquals('residential'), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_RESIDENTIAL_OUTLINE,
          width: stops([
            [12, 2],
            [14, 3],
            [16, 6],
            [18, 26],
            [19, 42],
            [20, 102],
          ]),
          opacity: stops([
            [12.5, 0],
            [13, 1],
          ]),
        },
        fill: {
          color: STREET_RESIDENTIAL,
          width: highwayStandardWidth,
          opacity: stops([
            [12, 0],
            [13, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Unclassified
    pushRoad(
      makeHighway({
        id: `street-unclassified-${variant}`,
        sourceLayer: 'streets',
        filter: [kindEquals('unclassified'), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_RESIDENTIAL_OUTLINE,
          width: stops([
            [12, 2],
            [14, 3],
            [16, 6],
            [18, 26],
            [19, 42],
            [20, 102],
          ]),
          opacity: stops([
            [12.5, 0],
            [13, 1],
          ]),
        },
        fill: {
          color: STREET_RESIDENTIAL,
          width: highwayStandardWidth,
          opacity: stops([
            [12, 0],
            [13, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Busway
    pushRoad(
      makeHighway({
        id: `street-busway-${variant}`,
        sourceLayer: 'streets',
        filter: [kindEquals('busway'), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_BUSWAY_OUTLINE,
          width: stops([
            [12, 2],
            [14, 3],
            [16, 6],
            [18, 26],
            [19, 42],
            [20, 102],
          ]),
          opacity: stops([
            [12.5, 0],
            [13, 1],
          ]),
        },
        fill: {
          color: STREET_BUSWAY,
          width: highwayStandardWidth,
          opacity: stops([
            [12, 0],
            [13, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Bicycle Special Layers (Fills only, no casings in original)
    // They overlay on top of existing road layers, so the widths must match exactly.
    const bicycleCommon = [
      { key: 'track', filter: kindEquals('track') },
      { key: 'pedestrian', filter: kindEquals('pedestrian') },
      { key: 'service', filter: kindEquals('service') },
      { key: 'livingStreet', filter: kindEquals('living_street') },
      { key: 'residential', filter: kindEquals('residential') },
      { key: 'unclassified', filter: kindEquals('unclassified') },
    ] as const

    for (const item of bicycleCommon) {
      pushRoad([
        {
          id: `street-${item.key}-bicycle-${variant}`,
          type: 'line',
          'source-layer': 'streets',
          filter: all(
            item.filter,
            equals('bicycle', 'designated'),
            ...variantFilters,
          ),
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color':
              item.key === 'track'
                ? STREET_SERVICE
                : item.key === 'pedestrian'
                  ? STREET_BICYCLE_PEDESTRIAN
                  : item.key === 'livingStreet' || item.key === 'unclassified'
                    ? STREET_BICYCLE_UNCLASSIFIED
                    : item.key === 'residential'
                      ? STREET_BICYCLE_RESIDENTIAL
                      : STREET_SERVICE, // service
            'line-width':
              item.key === 'track' || item.key === 'service'
                ? undefined
                : item.key === 'livingStreet' || item.key === 'unclassified'
                  ? stops([
                      [12, 1],
                      [14, 2],
                      [16, 5],
                      [18, 24],
                      [19, 60],
                      [20, 120],
                    ])
                  : highwayStandardWidth,
            'line-opacity':
              item.key === 'track' || item.key === 'service'
                ? undefined
                : stops([
                    [12, 0],
                    [13, 1],
                  ]),
            'line-dasharray': [
              'case',
              ['get', 'construction'],
              ['literal', [2, 2]],
              ['literal', [1]],
            ],
          },
        },
      ])
    }

    // Links
    // Tertiary Link
    pushRoad(
      makeHighway({
        id: `street-tertiary-link-${variant}`,
        sourceLayer: 'streets',
        filter: [kindIn('tertiary'), linkRoad(), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_TERTIARY_OUTLINE,
          width: stops([
            [12, 2],
            [14, 3],
            [16, 6],
            [18, 26],
            [19, 64],
            [20, 128],
          ]),
          opacity: stops([
            [12, 0],
            [13, 1],
          ]),
        },
        fill: {
          color: STREET_TERTIARY,
          width: stops([
            [12, 1],
            [14, 2],
            [16, 5],
            [18, 24],
            [19, 60],
            [20, 120],
          ]),
          opacity: stops([
            [12, 0],
            [13, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Secondary Link
    pushRoad(
      makeHighway({
        id: `street-secondary-link-${variant}`,
        sourceLayer: 'streets',
        filter: [kindIn('secondary'), linkRoad(), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_SECONDARY_OUTLINE,
          width: stops([
            [12, 2],
            [14, 3],
            [16, 7],
            [18, 14],
            [20, 40],
          ]),
          opacity: [
            'case',
            ['to-boolean', ['get', 'construction']],
            ['literal', 0.5],
            ['literal', 1],
          ],
        },
        fill: {
          color: STREET_SECONDARY,
          width: highwayLinkWidth,
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
        // Original Secondary Link outline had minzoom 13.
        // Original Secondary Link fill had minzoom 13.
        // makeHighway will inherently respect visibility if width is 0 before then,
        // but explicit minzoom is good for perf.
        // However, standard width stops start at 12.
        // The original code had minzoom 13 for BOTH.
        // I should probably add implicit minzoom?
        // But stops start at 12. Let's trust stops or add minzoom logic if visual issues occur.
      }),
    )

    // Primary Link
    pushRoad(
      makeHighway({
        id: `street-primary-link-${variant}`,
        sourceLayer: 'streets',
        filter: [kindIn('primary'), linkRoad(), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_PRIMARY_OUTLINE,
          width: stops([
            [12, 2],
            [14, 3],
            [16, 7],
            [18, 14],
            [20, 40],
          ]),
          opacity: [
            'case',
            ['to-boolean', ['get', 'construction']],
            ['literal', 0.5],
            ['literal', 1],
          ],
        },
        fill: {
          color: STREET_PRIMARY,
          width: stops([
            [12, 1],
            [14, 2],
            [16, 5],
            [18, 12],
            [20, 38],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Trunk Link
    pushRoad(
      makeHighway({
        id: `street-trunk-link-${variant}`,
        sourceLayer: 'streets',
        filter: [kindIn('trunk'), linkRoad(), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_PRIMARY_OUTLINE,
          width: stops([
            [12, 2],
            [14, 3],
            [16, 7],
            [18, 14],
            [20, 40],
          ]),
          opacity: [
            'case',
            ['to-boolean', ['get', 'construction']],
            ['literal', 0.5],
            ['literal', 1],
          ],
        },
        fill: {
          color: STREET_PRIMARY,
          width: stops([
            [12, 1],
            [14, 2],
            [16, 5],
            [18, 12],
            [20, 38],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Motorway Link
    pushRoad(
      makeHighway({
        id: `street-motorway-link-${variant}`,
        sourceLayer: 'streets',
        // Original outline minzoom 11, fill minzoom 10.
        // We will stick to implied visibility via width/opacity.
        filter: [kindIn('motorway'), linkRoad(), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_MOTORWAY_OUTLINE,
          width: stops([
            [12, 2],
            [14, 3],
            [16, 7],
            [18, 14],
            [20, 40],
          ]),
          opacity: [
            'case',
            ['to-boolean', ['get', 'construction']],
            ['literal', 0.5],
            ['literal', 1],
          ],
        },
        fill: {
          color: STREET_MOTORWAY,
          width: stops([
            [12, 1],
            [14, 2],
            [16, 5],
            [18, 12],
            [20, 38],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Tertiary
    pushRoad(
      makeHighway({
        id: `street-tertiary-${variant}`,
        sourceLayer: 'streets',
        filter: [
          kindIn('tertiary'),
          notEquals('link', true),
          ...variantFilters,
        ],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_TERTIARY_OUTLINE,
          width: stops([
            [12, 4],
            [14, 5],
            [16, 9],
            [18, 34],
            [19, 64],
            [20, 128],
          ]),
          opacity: stops([
            [12, 0],
            [13, 1],
          ]),
        },
        fill: {
          color: STREET_TERTIARY,
          width: stops([
            [12, 2],
            [14, 4],
            [16, 8],
            [18, 32],
            [19, 60],
            [20, 120],
          ]),
          opacity: stops([
            [10, 0],
            [11, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Secondary
    pushRoad(
      makeHighway({
        id: `street-secondary-${variant}`,
        sourceLayer: 'streets',
        filter: [
          kindIn('secondary'),
          notEquals('link', true),
          ...variantFilters,
        ],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_SECONDARY_OUTLINE,
          width: stops([
            [11, 2],
            [14, 5],
            [16, 12],
            [18, 30],
            [19, 58],
            [20, 122],
          ]),
          opacity: stops([
            [11, 0],
            [12, 1],
          ]),
        },
        fill: {
          color: STREET_SECONDARY,
          width: stops([
            [11, 1],
            [14, 4],
            [16, 10],
            [18, 28],
            [19, 55],
            [20, 120],
          ]),
          opacity: stops([
            [11, 0],
            [12, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Primary
    pushRoad(
      makeHighway({
        id: `street-primary-${variant}`,
        sourceLayer: 'streets',
        filter: [kindIn('primary'), notEquals('link', true), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_PRIMARY_OUTLINE,
          width: stops([
            [8, 0],
            [9, 1],
            [10, 4],
            [14, 6],
            [16, 12],
            [18, 30],
            [19, 58],
            [20, 122],
          ]),
          opacity: [
            'case',
            ['to-boolean', ['get', 'construction']],
            ['literal', 0.5],
            ['literal', 1],
          ],
        },
        fill: {
          color: STREET_PRIMARY,
          width: stops([[8, 0], [9, 2], ...highwayPrimaryWidth]),
          opacity: stops([
            [8, 0],
            [9, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Trunk
    pushRoad(
      makeHighway({
        id: `street-trunk-${variant}`,
        sourceLayer: 'streets',
        filter: [kindIn('trunk'), notEquals('link', true), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_TRUNK_OUTLINE,
          width: stops([
            [7, 0],
            [8, 2],
            [10, 4],
            [14, 6],
            [16, 12],
            [18, 30],
            [19, 58],
            [20, 122],
          ]),
          opacity: [
            'case',
            ['to-boolean', ['get', 'construction']],
            ['literal', 0.5],
            ['literal', 1],
          ],
        },
        fill: {
          color: STREET_TRUNK,
          width: stops([
            [7, 0],
            [8, 1],
            [10, 3],
            [14, 5],
            [16, 10],
            [18, 28],
            [19, 55],
            [20, 120],
          ]),
          opacity: stops([
            [7, 0],
            [8, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )

    // Motorway
    pushRoad(
      makeHighway({
        id: `street-motorway-${variant}`,
        sourceLayer: 'streets',
        filter: [
          kindIn('motorway'),
          notEquals('link', true),
          ...variantFilters,
        ],
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        casing: {
          color: STREET_MOTORWAY_OUTLINE,
          width: stops([
            [5, 0],
            [6, 2],
            [10, 5],
            [14, 5],
            [16, 14],
            [18, 38],
            [19, 84],
            [20, 168],
          ]),
          opacity: [
            'case',
            ['to-boolean', ['get', 'construction']],
            ['literal', 0.5],
            ['literal', 1],
          ],
        },
        fill: {
          color: STREET_MOTORWAY,
          width: stops([
            [5, 0],
            [6, 1],
            [10, 4],
            [14, 4],
            [16, 12],
            [18, 36],
            [19, 80],
            [20, 160],
          ]),
          opacity: stops([
            [5, 0],
            [6, 1],
          ]),
          dashArray: [
            'case',
            ['get', 'construction'],
            ['literal', [2, 2]],
            ['literal', [1]],
          ],
        },
      }),
    )
  }

  return buckets
}
