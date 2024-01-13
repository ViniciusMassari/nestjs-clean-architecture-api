import { Entity } from '@/shared/domain/entities/entity'
import { InMemoryRepository } from '../../in-memory-repository'
import { NotFoundError } from '@/shared/domain/errors/no-found-error'

type StubEntityProps = {
  name: string
  price: number
}
class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('Should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 10 })
    await sut.insert(entity)
    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })
  it('Should throw a error when an entity is not found', async () => {
    await expect(sut.findyById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should find an entity by its id', async () => {
    const entity = new StubEntity({ name: 'test name', price: 10 })
    await sut.insert(entity)
    const result = await sut.findyById(entity.id)
    expect(result).toBeTruthy()
  })
})
