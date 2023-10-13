import { getApiUrl } from './mainConstants';

const protocol = process.env.APP_PROTOCOL || '';
const ip = process.env.APP_IP || '';
const domain = process.env.APP_DOMAIN || '';
const port = process.env.APP_PORT || '';
const webpackPort = process.env.WEBPACK_PORT || port;
const assetsPath = process.env.APP_ASSETS_PATH || '';

const api = getApiUrl();
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_SITE = process.env.PLATFORM === 'site';
export const gaMeasurementID = process.env.GOOGLE_MEASUREMENT_ID || '';

export type EnvConfig = {
  protocol: string;
  ip: string;
  domain: string;
  port: string;
  assetsPath: string;
  api: string;
  appUrl: string;
};

const assetsPort = webpackPort || port;

const env: EnvConfig = {
  protocol,
  ip,
  domain,
  port,
  assetsPath: `${protocol}://${domain}${assetsPort ? `:${assetsPort}` : ''}/${assetsPath}/`,
  api,
  appUrl: `${protocol}://${domain}${port ? `:${port}` : ''}`,
};

export default env;
