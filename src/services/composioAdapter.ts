/**
 * Composio Integration Provider Adapter & Mock Scaffold
 */

export interface IntegrationProvider {
  name: 'GoogleCalendar' | 'GoogleDrive' | 'OneDrive' | 'GitHub';
  status: 'connected' | 'mock_dev' | 'blocked_external_config';
  sync(): Promise<{ success: boolean; message: string }>;
}

export class ComposioAdapter implements IntegrationProvider {
  name: 'GoogleCalendar' | 'GoogleDrive' | 'OneDrive' | 'GitHub';
  status: 'connected' | 'mock_dev' | 'blocked_external_config' = 'mock_dev';

  constructor(providerName: 'GoogleCalendar' | 'GoogleDrive' | 'OneDrive' | 'GitHub') {
    this.name = providerName;
  }

  async sync(): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: `[Composio Mock Adapter] Synchronized ${this.name} payload successfully in mock development mode.`
    };
  }
}
