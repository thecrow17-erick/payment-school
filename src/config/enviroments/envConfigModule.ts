import { ConfigModule } from "@nestjs/config";
import { EnvConfig } from "./envConfig";

export const EnvConfigModule = ConfigModule.forRoot({
  load: [EnvConfig],
  isGlobal: true,
})