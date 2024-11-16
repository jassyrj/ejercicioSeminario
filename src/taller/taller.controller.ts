import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, HttpStatus, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { TallerService } from './taller.service';
import { CreateTallerDto } from './dto/create-taller.dto';
import { UpdateTallerDto } from './dto/update-taller.dto';

@Controller('taller')
export class TallerController {
  constructor(private readonly tallerService: TallerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTallerDto: CreateTallerDto) {
    return this.tallerService.create(createTallerDto);
  }
  
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.tallerService.findAll();
  }
  
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const taller = await this.tallerService.findOne(id);
    if(taller) {
      return taller;
    }
    throw new NotFoundException('Taller no encontrado');
  }
  
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() updateTallerDto: UpdateTallerDto) {
    return this.tallerService.update(id, updateTallerDto);
  }
  
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tallerService.remove(id);
  }
}
