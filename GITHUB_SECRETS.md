# GitHub Secrets Configuration Guide

This project requires the following GitHub Secrets to be configured for the CI/CD pipeline to work properly.

## Required Secrets

### 1. DISCORD_WEBHOOK

**Purpose:** Send build status notifications to Discord  
**Value:** `https://discord.com/api/webhooks/1448915632996225125/7Qz9p0lGxU1uNTd17x7fIfZ1Aix8xSy4jZlokbTgZs3WJBA0fQ7CPr_dAPJtJ8IpbfrF`

### 2. RENDER_DEPLOY_HOOK_URL

**Purpose:** Trigger automatic deployment to Render after successful builds  
**How to get it:**

1. Go to your Render dashboard: https://dashboard.render.com/
2. Select your web service
3. Go to "Settings" tab
4. Scroll to "Deploy Hook"
5. Click "Create Deploy Hook"
6. Copy the URL (format: `https://api.render.com/deploy/srv-xxxxx?key=xxxxx`)

## How to Add Secrets to GitHub

1. Go to your repository: https://github.com/nahidgaziang/cuethack
2. Click "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Enter:
   - Name: `DISCORD_WEBHOOK`
   - Secret: (paste the Discord webhook URL above)
6. Click "Add secret"
7. Repeat for `RENDER_DEPLOY_HOOK_URL`

## Branch Protection Rules

To implement branch protection rules:

1. Go to: https://github.com/nahidgaziang/cuethack/settings/branches
2. Click "Add branch protection rule"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - Select: `Lint`, `E2E Tests`, `Build Docker Image`, `Security Scan`
5. Click "Create"

This ensures no code can be merged to `main` without passing all CI checks.
