# Garden model assets

Save the real 3D model as `garden-model.glb` in this folder. The GLB should include embedded textures/materials for reliable web loading.

If GitHub mobile will not upload into this folder, upload the same file at the repo root as `garden-model.glb` instead.

Optional poster: save the uploaded 3D render as `garden-model.png` in this folder, or at the repo root as `garden-model.png`. The PNG is only a loading poster; upload the GLB for the main interactive 3D view.

## Hotspot tuning

The page uses `model-viewer` hotspot slots with `data-position` coordinates so labels move with the GLB camera orbit. If the exported model uses a different scale or origin, adjust the `data-position` values in `index.html` after uploading the final GLB.
