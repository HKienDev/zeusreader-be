import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from '../interfaces/base.interface';
import { generateId } from '../utils/helpers';

export abstract class BaseService<T extends BaseEntity> {
  protected items: T[] = [];

  findAll(): T[] {
    return this.items;
  }

  findOne(id: string): T {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(
        `${this.getEntityName()} with ID ${id} not found`,
      );
    }
    return item;
  }

  create(data: Partial<T>): T {
    const item: T = {
      id: generateId(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as T;

    this.items.push(item);
    return item;
  }

  update(id: string, data: Partial<T>): T {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new NotFoundException(
        `${this.getEntityName()} with ID ${id} not found`,
      );
    }

    this.items[itemIndex] = {
      ...this.items[itemIndex],
      ...data,
      updatedAt: new Date(),
    };

    return this.items[itemIndex];
  }

  remove(id: string): T {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new NotFoundException(
        `${this.getEntityName()} with ID ${id} not found`,
      );
    }

    const deletedItem = this.items[itemIndex];
    this.items.splice(itemIndex, 1);
    return deletedItem;
  }

  protected abstract getEntityName(): string;
}
