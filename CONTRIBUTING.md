  - type: checkboxes
    id: accessibility-check
    attributes:
      label: Accessibility checks
      description: Confirm you’ve considered these.
      options:
        - label: "Colour-blind safe differentiation (not just hue)"
          required: false
        - label: "Contrast/readability considered (WCAG AA baseline where applicable)"
          required: false
        - label: "No clutter regression at target zooms (labels/POIs remain legible)"
          required: false

  - type: textarea
    id: cultural-local-context
    attributes:
      label: Cultural & local context check
      description: Any localisation requirements (e.g., `name:aus`, Aboriginal language tags) or culturally sensitive representation concerns?
      placeholder: |
        - Local naming / language tags:
        - Region-specific conventions:
        - Cultural sensitivity notes:
    validations:
      required: false