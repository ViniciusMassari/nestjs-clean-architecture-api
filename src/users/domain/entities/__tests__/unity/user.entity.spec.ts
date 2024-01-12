import { UserDataBuilder } from '../../../testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity
  beforeEach(() => {
    UserEntity.validate = jest.fn()
    props = UserDataBuilder({})
    sut = new UserEntity(props)
  })
  test('Constructor method', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  test('Getter of name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })
  test('Setter of name field', () => {
    sut['name'] = 'Other Name'
    expect(sut.props.name).toEqual('Other Name')
  })

  test('Getter of email field', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe('string')
  })

  test('Getter of password field', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe('string')
  })
  test('Setter of password field', () => {
    sut['password'] = 'OtherPassword'
    expect(sut.props.password).toEqual('OtherPassword')
  })
  test('Getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })
  test('should update a user', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    sut.update('Other Name')
    expect(sut.props.name).toEqual('Other Name')
  })
  test('should update the password field', () => {
    expect(UserEntity.validate).toHaveBeenCalled()
    sut.updatePassword('otherPassword')
    expect(sut.props.password).toEqual('otherPassword')
  })
})
