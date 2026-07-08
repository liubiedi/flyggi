# flyggi

An interactive single-page garden design prototype. Open `index.html` in a browser to explore the community garden layout, select zones, manually rotate the embedded GLB model horizontally and vertically, zoom, and start a guided feature tour.

## Required 3D model asset

For true 360-degree 3D rotation, export the garden as a GLB file with embedded textures and save it in either location:

```text
assets/garden-model.glb
```

or, if GitHub mobile does not let you upload inside `assets/`, save it at the repo root as:

```text
garden-model.glb
```

The page tries `assets/garden-model.glb` first, then automatically falls back to `garden-model.glb`. The optional PNG render can be used as a loading poster, but the interactive viewer now expects the GLB for the main visual so the page does not look like a flat 2D image.


## Camera behavior

The model opens in a low horizontal angle similar to the reference render, with the camera looking across the garden instead of down from a top view. Automatic orbit, autoplay, and camera pan drift are disabled: users control the model manually with drag gestures plus Rotate left/right, Rotate up/down, and Zoom in/out buttons. The viewer targets the model origin at `0m 0m 0m` so the garden stays anchored instead of drifting or floating. The default polar angle is `62deg`, and vertical tilt is allowed between `18deg` and `86deg`.
