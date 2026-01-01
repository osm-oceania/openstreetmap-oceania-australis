# Australis MapLibre Style Guide

## Overview

This guide establishes standards for developing MapLibre vector styles that authentically represent Australian themes and cultures.

## Design Principles

- **Cultural Authenticity**: Respect and represent Aboriginal, Torres Strait Islander, and Oceanian perspectives
- **Accessibility**: Ensure readability and usability for all audiences
- **Clarity**: Prioritize information hierarchy and map legibility
- **Localization**: Use regional conventions and languages

## Layer Structure

Organize layers in this order:
1. Background/Water
2. Land use
3. Roads/Transportation
4. Boundaries
5. Points of Interest
6. Labels
7. Overlays

## Typography

- Use web-safe fonts or embed custom fonts
- Support `name:aus` and Aboriginal language tags
- Maintain 12px minimum for body text
- Use appropriate font weights for hierarchy

## Color Palette

- Test colors for colorblind accessibility
- Reference Australian landscape colors where appropriate
- Maintain sufficient contrast ratios (WCAG AA minimum)

## Icons & Symbols

- Use locally relevant iconography for public transport and services
- Ensure icons scale appropriately across zoom levels
- Provide SVG sources in the repository

## Testing

- Validate across zoom levels 0-22
- Test on mobile and desktop viewports
- Verify with accessibility tools

## File Organization

```
styles/
├── australis.json
├── themes/
└── assets/
    ├── icons/
    └── fonts/
```
