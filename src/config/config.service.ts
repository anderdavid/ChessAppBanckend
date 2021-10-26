import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envconfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../.env';
      const existPath = fs.existsSync(envFilePath);

      if (!existPath) {
        console.log('.env file does  not exist');
        process.exit(0);
      }

      this.envconfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envconfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string): string {
    return this.envconfig[key];
  }
}
