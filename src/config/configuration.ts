import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

let YAML_CONFIG_FILENAME = 'config.yaml';
const ENV = process.env.NODE_ENV;

enum ReleaseENV {
  DEV = 'dev',
  STAGE = 'stage',
  PROD = 'prod'
}
export default () => {

  console.log(ENV);
  switch (ENV) {
    case ReleaseENV.DEV:
      YAML_CONFIG_FILENAME = 'dev-config.yaml';
      break;
    case ReleaseENV.DEV:
      YAML_CONFIG_FILENAME = 'stage-config.yaml';
      break;
    case ReleaseENV.DEV:
      YAML_CONFIG_FILENAME = 'prod-config.yaml';
      break;
  }
  console.log(YAML_CONFIG_FILENAME);
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};