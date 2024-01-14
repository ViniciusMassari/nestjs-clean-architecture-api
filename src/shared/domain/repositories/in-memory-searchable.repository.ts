import { Entity } from '../entities/entity'
import { SearchableRepositoryInterface } from './searchable-repository-contracts'
import { InMemoryRepository } from './in-memory-repository'

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
}