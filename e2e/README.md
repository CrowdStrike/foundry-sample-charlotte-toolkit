# E2E Tests

End-to-end tests for Charlotte Toolkit extension and workflow rendering verification.

## Test Coverage

### UI Extension Testing
- **activity.detections.details**: Endpoint Detections panel
- **ngsiem.workbench.details**: NGSIEM Incidents panel
- **xdr.detections.panel**: XDR Detections panel

### Workflow Testing
- **Charlotte Toolkit Chat Completion**: Workflow structure verification (render-only)

### Limitations
- Charlotte AI functionality requires real detection context - tests focus on UI rendering only
- Workflow execution requires Charlotte API credentials - tests verify workflow exists but don't execute

## Setup

```bash
npm ci
npx playwright install chromium
cp .env.sample .env
# Edit .env with your credentials
```

## Run Tests

```bash
npm test              # All tests
npm run test:debug    # Debug mode
npm run test:ui       # Interactive UI
```

## Environment Variables

```env
APP_NAME=foundry-sample-charlotte-toolkit
FALCON_BASE_URL=https://falcon.us-2.crowdstrike.com
FALCON_USERNAME=your-username
FALCON_PASSWORD=your-password
FALCON_AUTH_SECRET=your-mfa-secret
```
