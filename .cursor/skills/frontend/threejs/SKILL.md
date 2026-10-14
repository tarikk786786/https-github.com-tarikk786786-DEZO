---
name: threejs
description: Three.js / R3F guidance for 3D scenes in this app.
---

# Three.js

- Use existing `@react-three/fiber` and `@react-three/drei` patterns.
- Keep scene graphs lean; dispose geometries/materials when creating imperatively.
- Gate heavy 3D behind performance-conscious loading on mobile.
