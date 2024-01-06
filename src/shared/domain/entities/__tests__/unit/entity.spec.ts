import { validate as validateUUID } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('should set props and id', () => {
    const props = { prop1: 'value1', prop2: 10 }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity.id).not.toBeNull()
    expect(validateUUID(entity._id)).toBeTruthy()
  })

  it('should accept a valid uuid', () => {
    const props = { prop1: 'value1', prop2: 10 }
    const id = 'c4d4c9a0-bb62-4a72-b9bf-4c81baaa7024'
    const entity = new StubEntity(props, id)

    expect(validateUUID(entity._id)).toBeTruthy()
    expect(entity.id).toBe(id)
  })

  it('should convert a entity to a JS object', () => {
    const props = { prop1: 'value1', prop2: 10 }
    const id = 'c4d4c9a0-bb62-4a72-b9bf-4c81baaa7024'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})
