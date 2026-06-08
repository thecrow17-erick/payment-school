import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUES, SERVICE_NAME } from '../const';
import { RawSerializer } from 'core/serializer';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_NAME.EMPLOYEE_SERVICE,
        transport: Transport.RMQ, // Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: QUEUES.EMPLOYEE_AUTH_QUEUE,
          queueOptions: {
            durable: true,
          },
          serializer: new RawSerializer()
        }
      }
    ])
  ],
  controllers: [],
  providers: [],
  exports: [ClientsModule],
})
export class RabbitCoreModule {}
