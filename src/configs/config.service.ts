import { CONFIG } from './config.enum';
import config from './config.json';

class ConfigService {
  getConfig(keyname: CONFIG) {
    return config[keyname];
  }
}

export const configService = new ConfigService();
