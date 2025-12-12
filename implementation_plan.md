# Implementation Plan - Challenge 3: CI/CD Pipeline

## Goal

Set up a robust CI/CD pipeline using GitHub Actions that satisfies all requirements of Challenge 3, including linting, E2E testing with S3 integration, Docker builds, and security scanning.

## Proposed Changes

### 1. Update `.github/workflows/ci.yml`

- **Enhance `test` job**:
  - Add `services` section to spin up a `rustfs` container.
  - Configure `rustfs` with necessary credentials (`minioadmin`).
  - Update `env` variables for the test step to point to the `rustfs` service container (hostname `rustfs` or `localhost` depending on network mode, usually `localhost` if mapped ports, or service name if in same network). GitHub Actions service containers are accessible on localhost ports.
  - Ensure `createbuckets` logic is handled. Since we can't easily run the `createbuckets` container as a service sidecar with dependent logic, we might need a step in the workflow to install `mc` (MinIO Client) and create the bucket before running tests, OR use a custom entrypoint in the service, OR simply use the app's `createbuckets` logic if verified to exist (wait, the app doesn't create buckets, the `docker-compose` does).
  - _Refinement_: Accessing `rustfs` service.
    - Service: `image: rustfs/rustfs:latest`, `ports: ["9000:9000"]`, `env: { RUSTFS_ACCESS_KEY: minioadmin, ... }`.
    - Step: Install `mc`, create bucket `downloads`.
    - Step: Run `npm run test:e2e` with `S3_ENDPOINT=http://localhost:9000`.
- **Add `security` job (Bonus)**:
  - Use `aquasecurity/trivy-action` to scan the fs or docker image.

### 2. Update `README.md`

- Add **CI/CD** section.
- Add GitHub Actions Status Badge.
- Instructions on how to run tests locally (`npm run test:e2e`, `npm run lint`, etc).

## Verification Plan

### Automated Verification

- We cannot "run" the GitHub Action localy easily without tools like `act`.
- However, we can verify that the commands (`npm run lint`, `npm run test:e2e`) work locally (which we already did).
- The ultimate verification is pushing to GitHub and seeing the Green checkmark. Since I cannot see the GitHub UI, I will ensure the YAML syntax is valid and logic is sound.

### Manual Verification

- I will lint the YAML file if possible (check for syntax errors).
