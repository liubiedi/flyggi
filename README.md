# flyggi

An interactive single-page garden design prototype. Open `index.html` in a browser to explore the community garden layout, select zones, pan/zoom the original render, rotate it through 360 degrees, and start a guided tour.

## Required image asset

To make the webpage use the exact same visual as the uploaded 3D model, save that render in either location:

```text
assets/garden-model.png
```

or, if GitHub mobile does not let you upload inside `assets/`, save it at the repo root as:

```text
garden-model.png
```

The page tries `assets/garden-model.png` first, then automatically falls back to `garden-model.png`. It displays that image directly and overlays accessible interactive hotspot buttons for Plot A, Plot B, Hydroponics A/B, Solar Farm, Shelter, Composting, Existing Water Point, Share Food, and Social Tree Seating.
