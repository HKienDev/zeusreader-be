import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BaseService } from '../services/base.service';
import { BaseEntity } from '../interfaces/base.interface';

export abstract class BaseController<T extends BaseEntity> {
  constructor(protected readonly service: BaseService<T>) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() createDto: Partial<T>) {
    return this.service.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: Partial<T>) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
