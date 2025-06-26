import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import incrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache';

const cloudflareConfig = defineCloudflareConfig({ incrementalCache });

export default {
  ...cloudflareConfig,
  buildCommand: 'pnpm exec cross-env CF=true pnpm build:default',
};
