import {
  AEROWAY_RUNWAY,
  AEROWAY_RUNWAY_DASH,
  AEROWAY_RUNWAY_OUTLINE,
  AEROWAY_TAXIWAY,
  AEROWAY_TAXIWAY_DASH,
  AEROWAY_TAXIWAY_OUTLINE,
} from '../constants/colours'
import { all, kindEquals } from '../utils/filters'
import { LayerBuckets, pushBucket } from '../utils/layerBuckets'
import { makeHighway } from '../utils/makeHighway'
import { stops } from '../utils/style'
import { VARIANT_FILTERS } from '../utils/variants'

export default function aerowayLayers(): LayerBuckets {
  const buckets: LayerBuckets = {}

  for (const variant of ['tunnel', 'normal', 'bridge'] as const) {
    const variantFilters = VARIANT_FILTERS[variant]

    // Taxiway
    const taxiwayLayers = makeHighway({
      id: `taxiway-${variant}`,
      sourceLayer: 'streets',
      filter: [kindEquals('taxiway'), ...variantFilters],
      layout: { 'line-join': 'round', 'line-cap': 'butt' },
      casing: {
        color: AEROWAY_TAXIWAY_OUTLINE,
        width: stops([
          [13, 0],
          [14, 2],
          [15, 10],
          [16, 14],
          [18, 20],
          [20, 40],
        ]),
      },
      fill: {
        color: AEROWAY_TAXIWAY,
        width: stops([
          [13, 0],
          [14, 1],
          [15, 8],
          [16, 25],
          [18, 100],
          [20, 200],
        ]),
        opacity: stops([
          [11, 0],
          [12, 1],
        ]),
      },
    })

    // Manually add Centreline (Solid) for Taxiway
    const taxiwayCentreline = {
      id: `taxiway-centreline-${variant}`,
      type: 'line' as const,
      'source-layer': 'streets',
      filter: all(kindEquals('taxiway'), ...variantFilters),
      layout: { 'line-join': 'round' as const },
      paint: {
        'line-color': AEROWAY_TAXIWAY_DASH,
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
    }

    pushBucket(buckets, `${variant}:aeroway`, [
      ...taxiwayLayers,
      taxiwayCentreline,
    ])

    // Runway
    pushBucket(
      buckets,
      `${variant}:aeroway`,
      makeHighway({
        id: `runway-${variant}`,
        sourceLayer: 'streets',
        filter: [kindEquals('runway'), ...variantFilters],
        layout: { 'line-join': 'round', 'line-cap': 'square' },
        casing: {
          color: AEROWAY_RUNWAY_OUTLINE,
          width: stops([
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
        fill: {
          color: AEROWAY_RUNWAY,
          width: stops([
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
          opacity: stops([
            [11, 0],
            [12, 1],
          ]),
        },
        dash: {
          // Centreline
          color: AEROWAY_RUNWAY_DASH,
          width: stops([
            [10, 0],
            [17, 4],
          ]),
          array: [2, 1],
          fromZoom: 11,
        },
      }),
    )
  }

  return buckets
}
