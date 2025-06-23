import { MongooseModule } from '@nestjs/mongoose';
import { envConfig } from './env.config';

export const mongooseConfig = MongooseModule.forRoot(envConfig.mongoUri);
