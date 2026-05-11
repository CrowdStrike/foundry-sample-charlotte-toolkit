import { test, expect } from '../src/fixtures';

test.describe.configure({ mode: 'serial' });

test.describe('Charlotte Toolkit - E2E Tests', () => {
  test('should render Charlotte Toolkit extension in Endpoint Detections (activity.detections.details)', async ({
    charlotteExtensionPage,
  }) => {
    await charlotteExtensionPage.navigateToEndpointDetections();
    await charlotteExtensionPage.openFirstDetection();
    await charlotteExtensionPage.verifyCharlotteExtensionRenders();
  });

  test('should render Charlotte Toolkit extension in NGSIEM Cases (ngsiem.workbench.details)', async ({
    charlotteExtensionPage,
  }) => {
    await charlotteExtensionPage.navigateToNGSIEMCaseExtension();
    await charlotteExtensionPage.verifyCharlotteExtensionRenders();
  });
});
