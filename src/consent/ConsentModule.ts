import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/AuthModule';
import { HttpModule } from 'src/http/HttpModule';
import { KafkaModule } from 'src/kafka/kafka.module';
import { ConsentController } from './ConsentController';
import { ConsentService } from './ConsentService';

@Module({
    imports: [HttpModule, AuthModule, KafkaModule],
    controllers: [ConsentController],
    exports: [ConsentService],
    providers: [ConsentService]
})
export class ConsentModule {

}
