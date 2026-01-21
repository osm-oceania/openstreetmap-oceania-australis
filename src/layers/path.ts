import {
  PATH_STEPS,
  PATH_STEPS_DASH,
  PATH_STEPS_OUTLINE,
  PATH_FOOTWAY,
  PATH_FOOTWAY_DASH,
  PATH_FOOTWAY_OUTLINE,
  PATH_SHARED,
  PATH_SHARED_DASH,
  PATH_SHARED_OUTLINE,
} from '../constants/colours'
import { kindIn } from '../utils/filters'
import { LayerBuckets, pushBucket } from '../utils/layerBuckets'
import { makeHighway, zoomOpacityInverse } from '../utils/makeHighway'
import { stops } from '../utils/style'
import { VARIANT_FILTERS } from '../utils/variants'

export default function pathLayers(): LayerBuckets {
  const buckets: LayerBuckets = {}

  for (const variant of ['tunnel', 'normal', 'bridge'] as const) {
    const variantFilters = VARIANT_FILTERS[variant]

    // Footway
    pushBucket(
      buckets,
      `${variant}:footway`,
      makeHighway({
        id: `path-footway-${variant}`,
        sourceLayer: 'streets',
        filter: [kindIn('footway'), ...variantFilters],
        casing: {
          color: stops([
            [15.99, PATH_FOOTWAY],
            [16, PATH_FOOTWAY_OUTLINE],
          ]),
          width: stops([
            [15, 0],
            [15.99, 2],
            [16, 6],
            [18, 8],
            [20, 14],
          ]),
        },
        fill: {
          color: stops([
            [10.99, PATH_FOOTWAY_OUTLINE],
            [16, PATH_FOOTWAY],
          ]),
          width: stops([
            [15, 0],
            [16, 1.75],
            [18, 3],
            [20, 6],
          ]),
          opacity: zoomOpacityInverse(16, 15),
        },
        dash: {
          color: PATH_FOOTWAY_DASH,
          width: stops([
            [15, 0],
            [16, 1.75],
            [18, 3],
            [20, 6],
          ]),
          array: [2, 2],
          fromZoom: 16,
          fadeFromZoom: 15,
        },
      }),
    )

    // Path
    pushBucket(
      buckets,
      `${variant}:footway`,
      makeHighway({
        id: `path-path-${variant}`,
        sourceLayer: 'streets',
        filter: [kindIn('path'), ...variantFilters],
        casing: {
          color: stops([
            [15.99, PATH_FOOTWAY],
            [16, PATH_FOOTWAY_OUTLINE],
          ]),
          width: stops([
            [15, 0],
            [15.99, 2],
            [16, 6],
            [18, 8],
            [20, 14],
          ]),
        },
        fill: {
          color: stops([
            [10.99, PATH_FOOTWAY_OUTLINE],
            [16, PATH_FOOTWAY],
          ]),
          width: stops([
            [15, 0],
            [16, 1.75],
            [18, 3],
            [20, 6],
          ]),
          opacity: zoomOpacityInverse(16, 15),
        },
        dash: {
          color: PATH_STEPS_DASH,
          width: stops([
            [15, 0],
            [16, 1.75],
            [18, 3],
            [20, 6],
          ]),
          array: [2, 2],
          fromZoom: 16,
          fadeFromZoom: 15,
        },
      }),
    )

    // Cycleway
    pushBucket(
      buckets,
      `${variant}:footway`,
      makeHighway({
        id: `path-cycleway-${variant}`,
        sourceLayer: 'streets',
        filter: [kindIn('cycleway'), ...variantFilters],
        casing: {
          color: stops([
            [15.99, PATH_SHARED],
            [16, PATH_SHARED_OUTLINE],
          ]),
          width: stops([
            [15, 0],
            [15.99, 2],
            [16, 6],
            [18, 8],
            [20, 14],
          ]),
        },
        fill: {
          color: PATH_SHARED,
          width: stops([
            [15, 0],
            [16, 1.75],
            [18, 3],
            [20, 6],
          ]),
          opacity: zoomOpacityInverse(16, 15),
        },
        dash: {
          color: PATH_SHARED_DASH,
          width: stops([
            [15, 0],
            [16, 1.75],
            [18, 3],
            [20, 6],
          ]),
          array: [2, 2],
          fromZoom: 16,
          fadeFromZoom: 15,
        },
      }),
    )
  }

  // Steps - Explicit Definitions

  // Tunnel Steps
  pushBucket(
    buckets,
    'tunnel:footway',
    makeHighway({
      id: 'path-steps-tunnel',
      sourceLayer: 'streets',
      filter: [kindIn('steps'), ...VARIANT_FILTERS.tunnel],
      layout: { 'line-cap': 'butt', 'line-join': 'bevel' },
      casing: {
        color: stops([
          [15.99, PATH_FOOTWAY],
          [16, PATH_FOOTWAY_OUTLINE],
        ]),
        width: stops([
          [15, 0],
          [15.99, 2],
          [16, 6],
          [18, 8],
          [20, 14],
        ]),
      },
      fill: {
        color: stops([
          [15.99, PATH_FOOTWAY],
          [16, PATH_FOOTWAY_OUTLINE],
        ]),
        width: stops([
          [15, 0],
          [16, 3],
          [18, 5],
          [20, 8],
        ]),
        dashArray: [0.5, 0.5],
      },
    }),
  )

  // Normal Steps
  pushBucket(
    buckets,
    'normal:footway',
    makeHighway({
      id: 'path-steps-normal',
      sourceLayer: 'streets',
      filter: [kindIn('steps'), ...VARIANT_FILTERS.normal],
      layout: { 'line-cap': 'butt', 'line-join': 'bevel' },
      casing: {
        color: stops([
          [15.99, PATH_STEPS],
          [16, PATH_STEPS_OUTLINE],
        ]),
        width: stops([
          [15, 0],
          [15.99, 2],
          [16, 6],
          [18, 8],
          [20, 14],
        ]),
        opacity: [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', 0.5],
          ['literal', 1],
        ],
      },
      fill: {
        color: stops([
          [15.99, PATH_STEPS_OUTLINE],
          [16, PATH_STEPS],
        ]),
        width: stops([
          [15, 0],
          [16, 3],
          [18, 5],
          [20, 8],
        ]),
        dashArray: [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', [2, 2]],
          ['literal', [0.5, 0.5]],
        ],
      },
    }),
  )

  // Bridge Steps
  // pushBucket(buckets, 'bridge:footway', [
  //   {
  //     id: 'path-steps-bridge',
  //     type: 'line',
  //     'source-layer': 'streets',
  //     minzoom: 15,
  //     filter: all(kindIn('steps'), ...VARIANT_FILTERS.bridge),
  //     layout: { 'line-cap': 'butt' as const, 'line-join': 'round' as const },
  //     paint: {
  //       'line-color': PATH_STEPS,
  //       'line-opacity': 0.5,
  //       'line-width': stops([
  //         [15, 0],
  //         [16, 7],
  //         [18, 10],
  //         [19, 17],
  //         [20, 31],
  //       ]),
  //     },
  //   },
  // ])

  pushBucket(
    buckets,
    'bridge:footway',
    makeHighway({
      id: 'path-steps-bridge',
      sourceLayer: 'streets',
      filter: [kindIn('steps'), ...VARIANT_FILTERS.bridge],
      layout: { 'line-cap': 'butt', 'line-join': 'round' },
      casing: {
        color: stops([
          [15.99, PATH_FOOTWAY],
          [16, PATH_STEPS_OUTLINE],
        ]),
        width: stops([
          [15, 0],
          [15.99, 2],
          [16, 6],
          [18, 8],
          [20, 14],
        ]),
      },
      fill: {
        color: stops([
          [15.99, PATH_FOOTWAY],
          [16, PATH_STEPS],
        ]),
        width: stops([
          [15, 0],
          [16, 3],
          [18, 5],
          [20, 8],
        ]),
        dashArray: [
          'case',
          ['to-boolean', ['get', 'construction']],
          ['literal', [2, 2]],
          ['literal', [0.5, 0.5]],
        ],
      },
    }),
  )

  return buckets
}
