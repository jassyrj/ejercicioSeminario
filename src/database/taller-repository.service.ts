import { Injectable } from '@nestjs/common';
import { DynamoDbService } from './dynamo-db.service';
import { Taller } from '../taller/entities/taller.entity';
import { CreateTallerDto } from '../taller/dto/create-taller.dto';
import { v4 as uuidv4 } from 'uuid'
import { UpdateTallerDto } from '../taller/dto/update-taller.dto';

@Injectable()
export class TallerRepositoryService {

  private tableName = 'talleres';

  constructor(private readonly dynamo: DynamoDbService) {}

  async create(createTallerDto: CreateTallerDto): Promise<Taller> {
    const nuevo: Taller = {
      pk: uuidv4(),
      ... createTallerDto
    };

    console.log('Creando taller', nuevo);
    await this.dynamo.putItem(nuevo, this.tableName)
    return nuevo;
  }

  async findAll(): Promise<Taller[]> {
    return this.dynamo.findAll(this.tableName);
  }

  async findById(id: string): Promise<Taller> {
    return this.dynamo.getItem({pk: id}, this.tableName);
  }

  async update(id: string, updateTallerDto: UpdateTallerDto) {
    await this.dynamo.updateItem({pk: id}, updateTallerDto, this.tableName);
  }

  async delete(id: string) {
    await this.dynamo.deleteItem({pk: id}, this.tableName);
  }
}
