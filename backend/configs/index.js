import { DevConfig } from './dev.config';
import { ProdConfig } from './prod.config';
import { CommonConfig } from './common.config';

let IndexConfig = (process.env.NODE_ENV === 'production') ? ProdConfig : DevConfig;

export { IndexConfig, CommonConfig }