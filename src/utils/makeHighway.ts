import type {
  ColorSpecification,
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
  FilterSpecification,
} from '@maplibre/maplibre-gl-style-spec'

import type { MaplibreLayerDefinition } from '../types/maplibre'

import { all } from './filters'

export type CasedDashedLineSpec = {
  id: string
  sourceLayer: string
  filter: FilterSpecification[]

  casing: {
    color: DataDrivenPropertyValueSpecification<ColorSpecification>
    width: DataDrivenPropertyValueSpecification<number>
    opacity?: DataDrivenPropertyValueSpecification<number>
  }

  fill: {
    color: DataDrivenPropertyValueSpecification<ColorSpecification>
    width: DataDrivenPropertyValueSpecification<number>
    opacity?: DataDrivenPropertyValueSpecification<number>
    dashArray?: DataDrivenPropertyValueSpecification<number[]>
  }

  dash?: {
    color: DataDrivenPropertyValueSpecification<ColorSpecification>
    width: DataDrivenPropertyValueSpecification<number>
    array: number[] | ExpressionSpecification
    fromZoom: number
    fadeFromZoom?: number
  }

  layout?: MaplibreLayerDefinition['layout']
}

function zoomOpacity(from: number, fadeFrom?: number): ExpressionSpecification {
  if (fadeFrom !== undefined) {
    return [
      'interpolate',
      ['linear'],
      ['zoom'],
      fadeFrom,
      0,
      from,
      1,
    ] as ExpressionSpecification
  }

  return ['step', ['zoom'], 0, from, 1] as ExpressionSpecification
}

export function zoomOpacityInverse(
  from: number,
  fadeFrom?: number,
): ExpressionSpecification {
  if (fadeFrom !== undefined) {
    return [
      'interpolate',
      ['linear'],
      ['zoom'],
      fadeFrom,
      1,
      from,
      0,
    ] as ExpressionSpecification
  }

  return ['step', ['zoom'], 1, from, 0] as ExpressionSpecification
}

export function makeHighway(
  spec: CasedDashedLineSpec,
): MaplibreLayerDefinition[] {
  const base = {
    type: 'line' as const,
    'source-layer': spec.sourceLayer,
    filter: all(...spec.filter),
    layout: {
      'line-join': 'round' as const,
      'line-cap': 'round' as const,
      ...spec.layout,
    },
  }

  const layers: MaplibreLayerDefinition[] = []

  layers.push({
    ...base,
    id: `${spec.id}-casing`,
    paint: {
      'line-color': spec.casing.color,
      'line-width': spec.casing.width,
      'line-opacity': spec.casing.opacity ?? 1,
    },
  })

  layers.push({
    ...base,
    id: `${spec.id}-fill`,
    paint: {
      'line-color': spec.fill.color,
      'line-width': spec.fill.width,
      'line-opacity': spec.fill.opacity ?? 1,
      'line-dasharray': spec.fill.dashArray,
    },
  })

  if (spec.dash) {
    layers.push({
      ...base,
      id: `${spec.id}-dash`,
      paint: {
        'line-color': spec.dash.color,
        'line-width': spec.dash.width,
        'line-dasharray':
          Array.isArray(spec.dash.array) &&
          typeof spec.dash.array[0] === 'number'
            ? ['literal', spec.dash.array]
            : (spec.dash.array as ExpressionSpecification),
        'line-opacity': zoomOpacity(spec.dash.fromZoom, spec.dash.fadeFromZoom),
      },
    })
  }

  return layers
}
