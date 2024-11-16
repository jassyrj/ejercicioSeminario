//import { ListTablesCommand, ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoDbService {
  constructor(private readonly dynamodb: DynamoDBDocumentClient) {}

  async getItem<T>(pk: Record<string, unknown>, tableName: string): Promise<T> {
    const { Item }: GetCommandOutput = await this.dynamodb.send(
      new GetCommand({
        TableName: tableName,
        Key: pk,
      }),
    );
    return Item as T;
  }

  async putItem<T>(item: T, tableName: string) {
    try{
      await this.dynamodb.send(
        new PutCommand({
          TableName: tableName,
          Item: item,
        }),
      );
    } catch(error) {
      console.error(`Error al escribir en la tabla: ${tableName}`, error); 
      throw error;
    }
  }

  async updateItem<T>(key: Record<string, unknown>, updates: T, tableName: string) {
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};
    for (const [k, v] of Object.entries(updates)) {
      updateExpressions.push(`#${k} = :${k}`);
      expressionAttributeNames[`#${k}`] = k;
      expressionAttributeValues[`:${k}`] = v;
    }
    const updateExpression = `SET ${updateExpressions.join(', ')}`;
    await this.dynamodb.send(
      new UpdateCommand({
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      }),
    );
  }

  async deleteItem(pk: Record<string, unknown>, tableName: string) {
    await this.dynamodb.send(
      new DeleteCommand({
        TableName: tableName,
        Key: pk,
      }),
    );
  }

  async findAll<T>(tableName: string): Promise<T[]> {
    const all = []
    const input: ScanCommandInput = {
      TableName: tableName
    };
    do{
      const {Items, LastEvaluatedKey } =  await this.dynamodb.send(
        new ScanCommand(input));
      all.push(...Items);
      input.ExclusiveStartKey = LastEvaluatedKey;
    } while(input.ExclusiveStartKey);
    console.log(`Devolviendo ${all.length} registros de la tabla ${tableName}`);
    return all as T[];
  }
}
