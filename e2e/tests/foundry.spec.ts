import { test, expect } from '../src/fixtures';

test.describe.configure({ mode: 'serial' });

test.describe('Charlotte Toolkit - E2E Tests', () => {
  test('should render Charlotte Toolkit extension in Endpoint Detections (activity.detections.details)', async ({
    charlotteExtensionPage,
  }) => {
    await charlotteExtensionPage.navigateToEndpointDetectionsExtension();
    await charlotteExtensionPage.verifyCharlotteExtensionRenders();
  });

  // Skipping NGSIEM and XDR tests as they require additional SKUs/access
  // These sockets are documented in manifest.yml but may not be available in all environments
  test.skip('should render Charlotte Toolkit extension in NGSIEM Incidents (ngsiem.workbench.details)', async ({
    charlotteExtensionPage,
  }) => {
    await charlotteExtensionPage.navigateToNGSIEMIncidentsExtension();
    await charlotteExtensionPage.verifyCharlotteExtensionRenders();
  });

  test.skip('should render Charlotte Toolkit extension in XDR Detections (xdr.detections.panel)', async ({
    charlotteExtensionPage,
  }) => {
    await charlotteExtensionPage.navigateToXDRDetectionsExtension();
    await charlotteExtensionPage.verifyCharlotteExtensionRenders();
  });
});
