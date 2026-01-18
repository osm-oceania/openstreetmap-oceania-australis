'use strict'

import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec'

import { standardJson } from './styles/standard'
import { MaplibreLayerDefinition } from './types/maplibre'

export interface StyleBuilderOptions {
  /**
   * The tile source ID to inject into layers.
   * e.g. "shortbread"
   */
  source: string
}

/**
 * Builds the final MapLibre layer specifications by injecting the source configuration.
 *
 * @param layers - Generic layer definitions (without source)
 * @param options - Configuration options including the source ID
 * @returns Fully compliant LayerSpecification array
 */
export function styleBuilder(
  layers: MaplibreLayerDefinition[],
  options: StyleBuilderOptions,
): LayerSpecification[] {
  return layers.map((layer) => {
    // Background layers don't have a source
    if (layer.type === 'background') {
      return layer as LayerSpecification
    }

    // Inject source into other layer types and ensure it appears before 'source-layer'
    const entries = Object.entries(layer)
    const sourceLayerIndex = entries.findIndex(
      ([key]) => key === 'source-layer',
    )

    if (sourceLayerIndex !== -1) {
      entries.splice(sourceLayerIndex, 0, ['source', options.source])
      return Object.fromEntries(entries) as LayerSpecification
    }

    return { ...layer, source: options.source } as LayerSpecification
  })
}

/**
 * Main build function
 */
async function main() {
  console.time('Build complete')
  console.time('Build time')

  const style = standardJson

  if (!style.layers || style.layers.length === 0) {
    throw new Error(
      'No layers found in style. Did import fail or styleBuilder return empty?',
    )
  }

  // assertUniqueLayerIds(style.layers as LayerSpecification[])

  const outDir = path.resolve(process.cwd(), 'build')
  const outFile = path.join(outDir, 'style.json')

  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(outFile, JSON.stringify(style, null, 2) + '\n', 'utf8')

  console.log(`Wrote ${outFile} (${style.layers.length} layers)`)
  console.timeEnd('Build time')

  try {
    execSync(`oxfmt "${outFile}"`, { stdio: 'inherit' })
    console.log(`Formatted ${outFile}`)
  } catch (error) {
    console.error('Failed to format output file:', error)
  }

  console.timeEnd('Build complete')
  return true
}

/**
 * Entry point for the build script
 */
main().catch((err) => {
  console.error(err)
  process.exit(1)
})
