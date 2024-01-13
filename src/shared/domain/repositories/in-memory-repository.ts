import { Entity } from '../entities/entity'
import { RepositoryInterface } from './repository-contracts'
import { NotFoundError } from '../errors/not-found-error'

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = []

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
    return
  }

  async findById(id: string): Promise<E> {
    return this._getEntity(id)
  }
  async findAll(): Promise<E[]> {
    return this.items
  }
  async update(entity: E): Promise<void> {
    await this._getEntity(entity.id)
    const index = this.items.findIndex(item => item.id === entity.id)
    this.items[index] = entity
  }
  async delete(id: string): Promise<void> {
    await this._getEntity(id)
    this.items = this.items.filter(item => item.id !== id)
    return
  }

  private async _getEntity(id: string): Promise<E> {
    const _id = `${id}`
    const entity = this.items.find(entity => entity.id === _id)
    if (!entity) {
      throw new NotFoundError('Entity not found')
    }
    return entity
  }
}
