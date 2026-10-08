---
name: docker
description: Docker and container workflow guidance.
---

# Docker

- Prefer official base images and non-root users when writing Dockerfiles.
- Keep build context small with `.dockerignore`.
- Do not bake secrets into images.
