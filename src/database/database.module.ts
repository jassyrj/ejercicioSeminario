import { Module } from '@nestjs/common';
import { DynamoDbService } from './dynamo-db.service';
import { TallerRepositoryService } from './taller-repository.service';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

@Module({
  providers: [
    DynamoDbService,
    TallerRepositoryService,
    {
      provide: DynamoDBDocumentClient,
      useFactory: () => {
        const client = new DynamoDBClient({
          region: 'us-east-2',
          endpoint: 'http://localhost:8000', // Conectarse a DynamoDB Local si es necesario
        });
        return DynamoDBDocumentClient.from(client);
      },
    },
  ],
  exports: [TallerRepositoryService],
})
export class DatabaseModule {}
