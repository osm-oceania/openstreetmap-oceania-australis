import { TRANSPORT_FERRY } from '../constants/colours'
import { LayerBuckets, pushBucket } from '../utils/layerBuckets'
import { stops } from '../utils/style'

export default function transportLayers(): LayerBuckets {
  const buckets: LayerBuckets = {}

  // Ferry
  // Currently no specific variants defined in original for ferries,
  // assuming 'normal' bucket is appropriate or we can loop if we want/need variants.
  // Original had no kind filter, just source-layer ferries.

  pushBucket(buckets, 'normal:transport', [
    {
      id: 'transport-ferry',
      type: 'line',
      'source-layer': 'ferries',
      minzoom: 10,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: {
        'line-color': TRANSPORT_FERRY,
        'line-width': stops([
          [10, 1],
          [13, 2],
          [14, 3],
          [16, 4],
          [17, 6],
        ]),
        'line-opacity': stops([
          [10, 0],
          [11, 1],
        ]),
        'line-dasharray': [1, 1],
      },
    },
  ])

  return buckets
}
