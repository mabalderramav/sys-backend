import { defineConfig } from 'vitest/config';
import RPReporter from '@reportportal/agent-js-vitest'; // or import { RPReporter } from '@reportportal/agent-js-vitest';

const rpConfig = {
  apiKey: 'superadmin_myEgzfWwT5WU84GzxxyT1Eb4xpJMTCagkRTXlpzFVS9fifnT2sidmYS91xfVhAPE',
  endpoint: 'http://localhost:8080/api/v1',
  project: 'sys',
  launch: 'sys-backend',
  attributes: [
    {
      key: 'key',
      value: 'value',
    },
    {
      value: 'value',
    },
  ],
  description: 'sys-backend TDD tests',
};

export default defineConfig({
  test: {
    // add setup file to be able to use ReportingApi via `this.ReportingApi` in your tests
    setupFiles: ['@reportportal/agent-js-vitest/setup'],
    reporters: ['default', new RPReporter(rpConfig)],
  },
});
