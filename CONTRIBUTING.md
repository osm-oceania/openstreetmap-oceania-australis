# Contributing to OpenStreetMap Oceania Australis Style

## Welcome

Thank you for your interest in contributing to the Australis map style! We're building a uniquely Australian map style that promotes collaboration in the OpenStreetMap community, expresses the cultures of Australia through cartography, and showcases the richness of OpenStreetMap data.

Whether you're fixing a rendering bug, proposing a new feature, improving accessibility, adding indigenous language support, or enhancing cultural representation, your contributions help make mapping better for everyone across Oceania.

### Types of Contributions We Accept

- **Style improvements**: Colours, typography, icons, zoom behavior
- **Feature proposals**: New layers, POIs, symbology (use the Map Feature Proposal template)
- **Accessibility enhancements**: Colour-blind safe palettes, contrast improvements, legibility
- **Localisation support**: Indigenous name tags (`name:aus` and Aboriginal/Torres Strait Islander languages), regional conventions
- **Bug fixes**: Rendering issues, label conflicts, zoom level problems
- **Documentation**: Guides, examples, cartographic best practices
- **Icon design**: SVG icons for Australian/Oceanian context

### Our Style Variants

The Australis project encompasses multiple style modes to serve different use cases:

- **Standard** (A) - Baseline map with typical POIs and inherits some features from the other modes.
- **Topographic** (B) - Hiking tracks, difficulty ratings (SAC scale, AWTGS), camping facilities, intermittent water
- **Roads** (C) - Bus lanes, school zones, overtaking lanes, rest areas
- **Public Transport** (D) - Colourised PT lines, busways/T-ways, station prioritization
- **Emergency** (E) - Fire stations, bushfire safe places, SES depots, water tanks, lifeguard towers
- **Infrastructure** (F) - Power lines, water/sewage facilities, cell towers
- **Common POIs + Local Iconography** (G) - ServiceNSW, branded supermarkets, RSL clubs, marae
- **Accessibility Overlay** (H) - Wheelchair accessibility features

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- [Node.js](https://nodejs.org/) (for development tooling)
- A text editor (VS Code, Sublime, etc.)
- [Maputnik](https://maputnik.github.io/) or similar MapLibre GL style editor (optional but recommended)
- Git installed on your system
- A GitHub account
- Basic familiarity with [MapLibre GL Style Spec](https://maplibre.org/maplibre-style-spec/)

### Technical Stack

- **Style format**: MapLibre GL JSON
- **Data schema**: [Shortbread](https://shortbread.geofabrik.de/) and as extended by us.
- **Vector tiles**: OpenStreetMap data via Shortbread schema
- **Sprite source**: TBD
- **License**: CC0 1.0 Universal (Public Domain Dedication). See [LICENSE](.\LICENSE)

### Setting Up Your Development Environment

1. **Fork the repository**

    ```bash
    # Click "Fork" on the GitHub repository page
    ```

2. **Clone your fork**

    ```bash
    git clone https://github.com/YOUR-USERNAME/openstreetmap-oceania-australis-style.git
    cd openstreetmap-oceania-australis-style
    ```

3. **Add the upstream remote**

    ```bash
    git remote add upstream https://github.com/ORIGINAL-OWNER/openstreetmap-oceania-australis-style.git
    ```

4. **Navigate to the styles directory**

    ```bash
    cd src/styles
    ```

5. **Preview your changes**
   - Open the style JSON file in Maputnik, or
   - Set up a local tile server to test changes with real data

### Staying in Sync

Before starting work, sync your fork with the upstream repository:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## Accessibility Guidelines

When contributing map styling or design changes, please consider the following accessibility requirements:

### Colour Differentiation

Ensure that visual distinctions don't rely solely on hue differences. Use additional methods like contrast, patterns, or labels to differentiate features so that colour-blind users can distinguish between elements. **This should be the default approach for all Australis styles.**

### Contrast and Readability

Consider contrast ratios and overall readability when choosing colours and styles. Where applicable, aim for WCAG AA compliance as a baseline standard, particularly for text labels and important UI elements.

### Zoom Level Legibility

Test your changes at various zoom levels (0-22) to ensure there's no clutter regression. Labels, points of interest (POIs), and other text elements should remain legible at the target zoom ranges without overlapping or becoming unreadable.

## Cultural & Local Context Considerations

The Australis style aims to authentically represent the cultures of Oceania. This requires careful consideration:

### Indigenous Names and Languages

- **Use `name:aus` tags** for Australian English variants
- **Support Aboriginal and Torres Strait Islander language names** in appropriate contexts
- **Prioritize indigenous place names** where culturally appropriate
- Ensure proper display of all `name:*` language variants

### Region-Specific Conventions

Different regions may have distinct cartographic conventions:

- **Australian address formatting** (e.g., "Unit 5/123 Smith St" not "123 Smith St #5")
- **Local measurement conventions** and road classification systems
- **Operator-specific transport iconography** (Sydney "T" symbol for trains, etc.)
- **Australian-specific features**: ServiceNSW, RSL clubs, marae (in NZ/Pacific contexts)

### Cultural Sensitivity

Be mindful of culturally sensitive representation:

- **Respectful portrayal of indigenous lands** and sacred sites
- **Appropriate handling of disputed territories** or boundaries (if relevant in Oceania context)
- **Cultural significance** of certain landmarks or features
- **Consultation with community** when representing culturally important features

### Localised Iconography

The Australis style uses locally relevant symbols:

- **Branded icons** for common Australian chains (supermarkets, petrol stations, hardware stores)
- **Australian emergency services** (SES, Marine Rescue, RFS)
- **Indigenous cultural sites** (marae, rock art sites where appropriate)
- **Unique Australian features** (bushfire refuges, RFDS facilities)

## Reporting Issues

### Before Creating an Issue

- **Search existing issues** to avoid duplicates
- **Check the style documentation** and research notes in `src/styles/`
- **Test with the latest version** to ensure the issue still exists

### Bug Reports

When reporting a bug, use the **Bug Report** template and include:

- **Clear, descriptive title** summarizing the issue
- **Location and zoom level** where the issue occurs (coordinates or place name)
- **Screenshots or screen recordings** showing the problem
- **Expected vs. actual behavior** description
- **Browser/renderer version** and device information (Desktop/Mobile)
- **Steps to reproduce** the issue
- **Style version or commit hash** you're using

**Example:**

Title: Railway labels overlap with road names at zoom level 14 in Sydney CBD

Location: Sydney CBD (151.2093°E, 33.8688°S)
Zoom: 14
Renderer: MapLibre GL JS v4.0.0
Browser: Chrome 120

Expected: Railway and road labels should not overlap
Actual: Light rail labels render on top of major road names

Steps to reproduce:

1. Navigate to Sydney CBD
2. Set zoom to 14
3. Observe George Street and light rail labels

### Feature Requests

For proposing new map features or enhancements, **use the Map Feature Proposal template**. This comprehensive template helps ensure your proposal is well-thought-out and aligns with project goals.

The template covers:

- **Feature summary** - Brief description of what you want to add
- **User need** - What problem does this solve and who benefits?
- **Mode/bucket** - Which style variant(s) does this belong to?
- **Data + tagging** - Required OSM tags and data availability in AU/NZ/Oceania
- **Rendering rules** - Geometry, zoom thresholds, layer ordering
- **Visual design** - Colors, patterns, icons, references
- **Accessibility checks** - Colour-blind safety, contrast, clutter
- **Cultural context** - Localisation requirements, sensitivity concerns
- **Acceptance criteria** - How do we know when it's done?
- **Implementation notes** - Technical considerations

Use the `feature` and `map-style` labels for feature requests.

### Style Inconsistencies

For reporting visual or styling issues:

- Specify which **map features** are affected (roads, buildings, labels, etc.)
- Note any **regional variations** where the issue appears
- Suggest **alternative styling** if you have ideas
- Include comparison screenshots if helpful

## Coding Standards

### MapLibre GL Style Guidelines

- **Follow the MapLibre GL Style Specification** for all style definitions
- **Use zoom stops consistently** - refer to existing layers for conventions
- **Group related layers** logically (e.g., all road outlines together, then fills)
- **Comment complex filter expressions** to explain intent
- **Use meaningful layer IDs** that describe the feature and styling stage

### Layer Naming Conventions

Follow the existing pattern in the codebase:

- `{context}-{feature}-{variant}:{stage}`
- Examples: `bridge-street-motorway:outline`, `poi-amenity`, `label-place-city`

### Color and Typography

- **Test all colors** for accessibility (use tools like WebAIM Contrast Checker)
- **Use Australian landscape-inspired colors** where appropriate
- **Maintain consistent font usage** (Noto Sans family as specified)
- **Document color choices** in comments for key design decisions

### Icon Requirements

- **Format**: SVG
- **Style**: Should match the VersaTiles basics sprite aesthetic
- **Naming**: Follow existing sprite naming conventions
- **Size**: Provide multiple sizes if needed (@2x variants)
- **Accessibility**: Ensure sufficient contrast and clarity at target zoom levels

## Pull Request Process

1. **Create a feature branch** from `main`

```bash
   git checkout -b feature/description-of-change
```

1. **Make your changes** to the style JSON or related files

2. **Test your changes**
   - Preview in Maputnik or local environment
   - Test at multiple zoom levels (especially critical zoom thresholds)
   - Verify on both desktop and mobile viewports
   - Check for unintended side effects on other layers

3. **Commit your changes** with clear messages

```bash
   git commit -m "Add AWTGS hiking track difficulty rendering"
```

1. **Push to your fork**

```bash
   git push origin feature/description-of-change
```

1. **Open a Pull Request** against the main repository

### PR Description

Include in your PR description:

- **What** you changed and **why**
- **Screenshots** showing before/after (especially for visual changes)
- **Test locations** where changes can be verified
- **Related issues** (use "Fixes #123" to auto-close issues)
- **Accessibility considerations** you addressed
- **Cultural context** if relevant to the change

### Review Process

- Maintainers will review your PR for code quality, design consistency, and cultural appropriateness
- Be responsive to feedback and questions
- PRs may require updates before merging
- We aim to provide initial feedback within 1 week

## Getting Help

### Questions and Discussions

If you have questions about contributing, need clarification, or want to discuss ideas:

- **GitHub Discussions**: [Link to discussions page] - Best for general questions and feature discussions
- **OpenStreetMap Community**: Connect with the Oceania OSM community
- **Issue Comments**: Ask questions directly on relevant issues

### Documentation Resources

- **MapLibre GL Style Spec**: <https://maplibre.org/maplibre-style-spec/>
- **Shortbread Schema**: <https://shortbread.geofabrik.de/>
- **OpenStreetMap Wiki**: <https://wiki.openstreetmap.org/>
- **OSM Americana Project**: <https://github.com/osm-americana/openstreetmap-americana/> (our inspiration)
- **Style Research Notes**: See [Oceania-Australis Map style research and ideas](./src/styles/Oceania-Australis%20Map%20style%20research%20and%20ideas.md)

### Common Questions

**Q: How do I test my changes with real data?**
A: You can either use Maputnik with a live tile source, or set up a local tile server with Shortbread tiles for your area.

**Q: What OSM data is available for Australia/Oceania?**
A: Check the Shortbread documentation for supported tags. For Australian-specific features, verify data availability on [taginfo](https://taginfo.openstreetmap.org).

**Q: Can I propose a completely new style variant?**
A: Yes! Use the Map Feature Proposal template and explain the use case. Major style variants should align with one of the existing buckets or propose a compelling new category.

<!--**Q: How do I handle indigenous place names properly?**
A: Consult with indigenous communities when possible, use appropriate `name:*` tags, and prioritize respectful representation. When in doubt, ask in discussions.-->

**Q: Who maintains the Australis style?**
A: The Australis style is a community project. Check the README for current maintainer contacts.

<!--## Recognition

Contributors are credited in the project. By contributing, you agree that your contributions will be released under the CC0 1.0 Universal (Public Domain Dedication) license.-->

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Treat all contributors with respect. Harassment, discrimination, or inappropriate behavior will not be tolerated.

---

## Additional Resources

- [MapLibre GL JS Documentation](https://maplibre.org/maplibre-gl-js/docs/)
- [OpenStreetMap Australian Tagging Guidelines](https://wiki.openstreetmap.org/wiki/Australian_Tagging_Guidelines)
- [Oceania OSM Community Forum](https://community.openstreetmap.org/c/communities/oceania/)
- [Oceania Discord](https://discord.com/channels/413070382636072960/471231032645910529)

Thank you for helping create better, more culturally authentic maps for Oceania! 🗺️🦘
