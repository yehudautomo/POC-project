import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.prargetx.pocproject',
  appName: 'poc-project',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater: {
      autoUpdate: false
    }
  }
};

export default config;
