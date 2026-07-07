# flyggi

An interactive single-page garden design prototype. Open `index.html` in a browser to explore the community garden layout, select zones, orbit the embedded GLB model, zoom, and start a guided tour.

## Required 3D model asset

For true 360-degree 3D rotation, export the garden as a GLB file with embedded textures and save it in either location:

```text
assets/garden-model.glb
```

or, if GitHub mobile does not let you upload inside `assets/`, save it at the repo root as:

```text
garden-model.glb
```

The page tries `assets/garden-model.glb` first, then automatically falls back to `garden-model.glb`. While the GLB is missing, it can still show the PNG render fallback from `assets/garden-model.png` or `garden-model.png`.
