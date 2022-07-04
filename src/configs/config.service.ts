import { CONFIG } from "./config.enum"
import config from "./config.json"

export interface DynamicConfig {
  DOMAIN_URL: string
  ACCESS_CONTROLL_ADDRESS: string
  ACTIVE_NFT_ADDRESS: string
  MANAGER_POOL_ADDRESS: string
  MARKETPLACE_ADDRESS: string
  UIT_TOKEN_ADDRESS: string
  UIT_NFT_TOKEN_ADDRESS: string
}

class ConfigService {
  // config: DynamicConfig = null
  // notDefinedYet = true

  // constructor() {
  //   axios
  //     .get(globalConfigUrl)
  //     .then((response) => {
  //       console.log(response.data)
  //       this.config = response.data
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

  // public get(): DynamicConfig {
  //   if (this.notDefinedYet) {
  //     throw new Error(
  //       "Global config has not been defined yet. Be sure to call the getter only after the config has been downloaded and set. Probable cause is accessing globalConfig in static context.",
  //     )
  //   } else {
  //     return this.config
  //   }
  // }

  public getConfig(keyName: CONFIG) {
    return config[keyName]
  }

  // public set(value: DynamicConfig): void {
  //   if (this.notDefinedYet) {
  //     this.config = value
  //     console.log(this.config)
  //     this.notDefinedYet = false
  //   } else {
  //     throw new Error(
  //       "Global config has already been defined and now has been called second time. This is probably not intended.",
  //     )
  //   }
  // }
}

export const globalConfigUrl = "config.json"

export const configService = new ConfigService()
