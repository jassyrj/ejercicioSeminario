import { Injectable } from '@nestjs/common';
import { CreateTallerDto } from './dto/create-taller.dto';
import { UpdateTallerDto } from './dto/update-taller.dto';
import { TallerRepositoryService } from '../database/taller-repository.service';
import { Taller } from './entities/taller.entity';

@Injectable()
export class TallerService {

  constructor(private readonly db: TallerRepositoryService) {}

  async create(createTallerDto: CreateTallerDto): Promise<Taller> {
    return await this.db.create(createTallerDto);
  }

  async findAll(): Promise<Taller[]> {
    return this.db.findAll();
  }

  async findOne(id: string): Promise<Taller> {
    return await this.db.findById(id);    
  }

  async update(id: string, updateTallerDto: UpdateTallerDto) {
    this.db.update(id, updateTallerDto);
  }

  async remove(id: string) {
    this.db.delete(id);
  }
}
