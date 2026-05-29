import { Module } from '@nestjs/common';
import {EnvConfigModule} from "@config/enviroments/envConfigModule";

@Module({
  imports: [
    EnvConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
