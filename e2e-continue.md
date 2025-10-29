# E2E Testing Continuation - Charlotte Toolkit

## Current Status (2025-10-28)

The E2E test implementation for Charlotte Toolkit is **complete and correctly structured**, but blocked by a licensing requirement.

### Blocker: Charlotte SKU Required

The Charlotte Toolkit extension does not render in detection sockets without the Charlotte SKU being enabled for the test account. An email has been sent to support to obtain the Charlotte SKU.

**Evidence:**
- App successfully deployed (ID: `90f5d42520f6435f890ed94662a25d93`)
- App successfully installed via app catalog
- Extension registered for 3 sockets in manifest.yml:
  - `activity.detections.details` (Endpoint Detections)
  - `ngsiem.workbench.details` (NGSIEM Incidents)
  - `xdr.detections.panel` (XDR Detections)
- Tests navigate correctly to detections and open detail panels
- **Extension button does NOT appear** in the detection details panel
- Page snapshot analysis (2399 lines) shows complete detection details but no "Charlotte Toolkit" button

### What's Working

1. ✅ **Complete E2E framework implementation**
   - All page objects created: `AppCatalogPage`, `SocketNavigationPage`, `CharlotteExtensionPage`
   - Test configuration: `playwright.config.ts`, `package.json`, fixtures
   - GitHub Actions workflow: `.github/workflows/e2e.yml`
   - Authentication setup: `authenticate.cjs`, environment variables

2. ✅ **App installation test** (`app-install.setup.ts`)
   - Successfully checks if app is installed
   - Installs app if needed
   - Follows simplified pattern from `foundry-sample-functions-python`

3. ✅ **Navigation tests**
   - Successfully navigates to Endpoint Detections
   - Successfully opens first detection
   - Detection details panel renders correctly
   - All socket navigation methods implemented for 3 different sockets

### What's Blocked

Extension verification fails at this step:
```typescript
const extensionButton = this.page.getByRole('button', { name: /Charlotte Toolkit/i });
await expect(extensionButton).toBeVisible({ timeout: 10000 });
// ❌ Timeout: Extension button never appears
```

## Verified Reference Implementation

Researched other Foundry sample apps to understand correct extension verification patterns:

### ✅ PRIMARY REFERENCE: `foundry-sample-collections-toolkit`

**THIS IS THE ONLY VERIFIED WORKING REFERENCE** - All E2E tests pass successfully.

**Key findings:**
- Uses `hosts.host.panel` socket (different from Charlotte Toolkit detection sockets)
- Extensions appear as **`<h1>` headings**, not buttons or tabs
- Must scroll to bottom of page with `page.keyboard.press('End')` twice to reveal extensions
- Click heading to expand extension
- Iframe loads after clicking heading

**Code pattern from HostPanelExtensionPage.ts:**
```typescript
async verifyExtensionRenders(): Promise<void> {
  // Scroll to bottom to reveal extensions
  await this.page.keyboard.press('End');
  await this.page.keyboard.press('End');

  // Find extension heading
  const extensionHeading = this.page.locator(`h1:has-text("${this.extensionName}")`).first();
  await extensionHeading.waitFor({ state: 'visible', timeout: 15000 });

  // Click to expand
  await extensionHeading.click();

  // Verify iframe loads
  await expect(this.page.locator('iframe')).toBeVisible({ timeout: 15000 });

  // Verify extension-specific content in iframe
  const iframe: FrameLocator = this.page.frameLocator('iframe');
  await this.verifyExtensionContent(iframe);
}
```

**⚠️ IMPORTANT:** This pattern is for `hosts.host.panel` socket. Charlotte Toolkit uses **detection sockets** which likely have a different UI pattern.

### ❌ UNVERIFIED: `foundry-sample-threat-intel`

**Key findings:**
- Uses `activity.detections.details` socket (same as Charlotte Toolkit)
- Code suggests extensions appear as **buttons** with `role="button"`
- Code checks `aria-expanded` attribute and clicks to expand

**⚠️ WARNING:** Threat-intel E2E tests are **NOT finished/passing**. Cannot be used as verified reference.

### ❌ UNVERIFIED: `foundry-sample-detection-translation`

**Key findings:**
- Also needs Charlotte SKU (same blocker as Charlotte Toolkit)
- Uses `getByRole('tab')` pattern suggesting extensions might be tabs
- Cannot be verified as working

## Charlotte Toolkit Implementation Status

### Current Implementation (Unknown if Correct)

The `CharlotteExtensionPage.ts` implementation currently assumes the **button pattern** from threat-intel:

1. ✅ Navigates to detection page
2. ✅ Opens first detection
3. ✅ Waits for detection details panel
4. ⚠️ Looks for button with `role="button"` and Charlotte Toolkit name
5. ⚠️ Scrolls button into view
6. ⚠️ Checks `aria-expanded` attribute
7. ⚠️ Clicks to expand if needed
8. ✅ Verifies iframe loads

**⚠️ WARNING:** This pattern is based on unverified threat-intel code. The actual UI pattern for detection socket extensions is unknown until Charlotte SKU is enabled and we can observe the real behavior.

### Files Created/Modified

#### Test Files
- `e2e/tests/app-install.setup.ts` - App installation setup
- `e2e/tests/foundry.spec.ts` - Main test suite with 3 socket tests
- `e2e/src/fixtures.ts` - Playwright fixtures

#### Page Objects
- `e2e/src/pages/AppCatalogPage.ts` - App catalog operations
- `e2e/src/pages/SocketNavigationPage.ts` - Socket navigation utilities
- `e2e/src/pages/CharlotteExtensionPage.ts` - Charlotte extension verification

#### Configuration
- `e2e/playwright.config.ts` - Playwright configuration
- `e2e/package.json` - Dependencies
- `e2e/package-lock.json` - Lock file
- `e2e/.env` - Environment variables (test account credentials)
- `e2e/.env.sample` - Environment template
- `e2e/README.md` - Documentation

#### CI/CD
- `.github/workflows/e2e.yml` - GitHub Actions workflow

#### App Configuration
- `manifest.yml` - Added `e2e` to ignored list

### Test Account Credentials

**Account:** foundry.e2e@crowdstrike.com
**Environment:** https://falcon.us-2.crowdstrike.com
**Configured in:** `e2e/.env`

**App Details:**
- **Name:** foundry-sample-charlotte-toolkit
- **App ID:** 90f5d42520f6435f890ed94662a25d93
- **Status:** Deployed and installed
- **Version:** v1.0.0

## Next Steps (After Charlotte SKU Enabled)

### 1. Verify Extension Appears

Once Charlotte SKU is enabled for the test account:

```bash
cd e2e
npm test
```

Expected outcome: Extension button should appear and tests should pass.

### 2. Verify Iframe Content

The current implementation has placeholder content verification. Once extension renders, verify what content actually appears in the iframe and update:

```typescript
// In CharlotteExtensionPage.ts, line ~140+
// Update this section to verify actual Charlotte UI content
const iframe: FrameLocator = this.page.frameLocator('iframe');
// Add specific Charlotte Toolkit UI element checks here
```

### 3. Test All Three Sockets

Verify extension renders in all three sockets:
- ✅ `activity.detections.details` (Endpoint Detections)
- ✅ `ngsiem.workbench.details` (NGSIEM Incidents)
- ✅ `xdr.detections.panel` (XDR Detections)

### 4. Update Content Verification

Based on what actually renders in Charlotte Toolkit iframe, update the verification logic:

**Current code (lines 144-163 in CharlotteExtensionPage.ts):**
```typescript
// Check for Charlotte branding/title
const hasCharlotteContent = await Promise.race([
  iframe.getByText(/Charlotte/i).first().isVisible({ timeout: 10000 }).then(() => true),
  iframe.locator('text=/Charlotte/i').first().isVisible({ timeout: 10000 }).then(() => true),
  Promise.resolve(false)
]).catch(() => false);
```

**Update to match actual Charlotte UI elements** - examples based on app description:
- Chat interface elements
- "Analyze Detection" or similar action buttons
- Charlotte AI branding/logo
- Analysis output sections

### 5. Handle Charlotte API Requirements

Charlotte Toolkit may require additional configuration like threat-intel app does. If the extension shows configuration UI on first load:

**Reference pattern from threat-intel:**
```typescript
private async configureAPIIfNeeded(): Promise<void> {
  const iframe: FrameLocator = this.page.frameLocator('iframe');
  const inputFields = iframe.locator('input[type="text"]');
  const count = await inputFields.count();

  if (count === 0) {
    this.logger.info('No configuration required');
    return;
  }

  // Fill in configuration fields...
}
```

Add similar logic if Charlotte requires API keys or other configuration.

### 6. Run Full Test Suite

```bash
cd e2e
npm test
```

All 3 tests should pass:
1. ✅ Endpoint Detections socket extension
2. ✅ NGSIEM Incidents socket extension
3. ✅ XDR Detections socket extension

### 7. Commit and Create PR

Once tests pass:

```bash
git add e2e/ manifest.yml .github/workflows/e2e.yml
git commit -m "Add E2E tests for Charlotte Toolkit extension

- Implement complete E2E testing framework
- Test extension rendering in 3 sockets:
  - activity.detections.details
  - ngsiem.workbench.details
  - xdr.detections.panel
- Add GitHub Actions workflow for CI/CD
- Follow collections-toolkit reference for E2E structure"
```

## Key Learnings

### Socket Extension UI Patterns

Different sockets use different UI patterns. Only one pattern is verified:

| Socket Type | UI Pattern | Element Type | Reference App | Status |
|------------|-----------|--------------|---------------|--------|
| `hosts.host.panel` | Heading | `<h1>` heading | collections-toolkit | ✅ VERIFIED |
| `activity.detections.details` | Unknown | Unknown (button? tab? heading?) | N/A | ❌ UNKNOWN |
| `xdr.detections.panel` | Unknown | Unknown | N/A | ❌ UNKNOWN |
| `ngsiem.workbench.details` | Unknown | Unknown | N/A | ❌ UNKNOWN |

**Key Insight:** We only have ONE verified working extension pattern (collections-toolkit with hosts.host.panel). The detection socket pattern is currently unknown and blocked by Charlotte SKU requirement.

### E2E Testing Best Practices

1. **Use verified reference implementations ONLY** - Collections-toolkit is the only app with passing E2E tests
2. **Different sockets = different patterns** - Don't assume all extensions work the same way
3. **Verify before assuming** - Code patterns from unfinished apps cannot be trusted
4. **Test with real data** - Extensions may require actual detections/incidents to test properly
5. **Handle licensing requirements** - Some extensions require specific SKUs to render

### What NOT to Do

1. ❌ Don't trust unverified code patterns (threat-intel, detection-translation)
2. ❌ Don't assume button/tab/heading pattern without verification
3. ❌ Don't mix patterns from different socket types
4. ❌ Don't commit before tests pass locally

## Reference Files

Key files to reference when continuing:

### ✅ Verified Working Pattern (Different Socket)
- `/Users/mraible/dev/foundry-sample-collections-toolkit/e2e/src/pages/HostPanelExtensionPage.ts` - VERIFIED working extension rendering
- `/Users/mraible/dev/foundry-sample-collections-toolkit/e2e/tests/foundry.spec.ts` - VERIFIED passing tests
- **Note:** Uses `hosts.host.panel` socket, not detection sockets

### ⚠️ Unverified Patterns (May or May Not Be Correct)
- `/Users/mraible/dev/foundry-sample-threat-intel/e2e/src/pages/ThreatIntelExtensionPage.ts` - Uses button pattern, NOT verified
- `/Users/mraible/dev/foundry-sample-detection-translation/e2e/src/pages/SocketNavigationPage.ts` - Uses tab pattern, NOT verified

### Charlotte Implementation (Unknown if Correct)
- `/Users/mraible/dev/foundry-sample-charlotte-toolkit/e2e/src/pages/CharlotteExtensionPage.ts` (lines 110-167) - Currently uses button pattern
- `/Users/mraible/dev/foundry-sample-charlotte-toolkit/e2e/tests/foundry.spec.ts` - Test structure

### App Configuration
- `/Users/mraible/dev/foundry-sample-charlotte-toolkit/manifest.yml` (lines 22-25 for socket configuration)

## Questions to Answer After SKU Enabled

1. **What UI element represents the Charlotte extension?** (Unknown - could be button, tab, heading, or something else)
2. **What is the element's role attribute?** (Unknown - need to inspect with Playwright)
3. **Does it need to be clicked to expand?** (Unknown)
4. **Does it have aria-expanded attribute?** (Unknown)
5. **Does iframe load after interaction?** (Expected: Yes)
6. **What UI elements are in the iframe?** (Unknown - need to verify)
7. **Does Charlotte require API configuration?** (Unknown - check on first load)
8. **Do all 3 sockets render the extension?** (Expected: Yes, all registered in manifest)

**Action Steps After SKU Enabled:**

1. **First, observe the actual UI:**
   - Navigate manually to a detection
   - Open detection details panel
   - Look for Charlotte Toolkit extension
   - Inspect the element to determine its role, attributes, and behavior

2. **Then update the code** based on what you observe:
   - Button pattern? Keep current implementation
   - Tab pattern? Change to `getByRole('tab')`
   - Heading pattern? Change to `locator('h1:has-text("Charlotte Toolkit")')`
   - Something else? Adapt accordingly

3. **Run tests and iterate** until they pass

## Contact Information

**Support Email Sent:** [Date user sent email]
**Request:** Enable Charlotte SKU for foundry.e2e@crowdstrike.com test account
**Reason:** Complete E2E test implementation for foundry-sample-charlotte-toolkit

---

**Status:** ⏸️ Paused - Waiting for Charlotte SKU
**Implementation:** ⚠️ Complete but unverified - based on unfinished threat-intel pattern
**Ready to Resume:** ⚠️ May need code changes after observing actual UI pattern
**Key Action:** Observe actual extension UI before running tests
