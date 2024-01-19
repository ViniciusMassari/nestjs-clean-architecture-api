import { BcryptjsHashProvider } from '../../bcryptjs-hash.provider'

BcryptjsHashProvider
describe('BcryptjsHashProvider unit tests', () => {
  let sut: BcryptjsHashProvider

  beforeEach(() => {
    sut = new BcryptjsHashProvider()
  })

  it('Should return an encrypted password', async () => {
    const testPassword = 'TestPassword'
    const result = await sut.generateHash(testPassword)
    expect(result).toBeDefined()
  })
  it('Should return false on invalid password and hash comparison', async () => {
    const testPassword = 'TestPassword'
    const hash = await sut.generateHash(testPassword)
    const result = await sut.compareHash('fakePassword', hash)
    expect(result).toBeFalsy()
  })
  it('Should return true on valid password and hash comparison', async () => {
    const testPassword = 'TestPassword'
    const hash = await sut.generateHash(testPassword)
    const result = await sut.compareHash(testPassword, hash)
    expect(result).toBeTruthy()
  })
})
