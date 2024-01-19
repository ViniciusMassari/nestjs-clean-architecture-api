import { UserRepository } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '../errors/bad-request-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { hashProvider } from '@/shared/application/providers/hash-provider'

export namespace SignupUseCase {
  export interface Input {
    name: string
    email: string
    password: string
  }

  export interface Output {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
  }

  export class UseCase {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: hashProvider,
    ) {}
    async execute(input: Input): Promise<Output> {
      const { email, name, password } = input
      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided')
      }
      await this.userRepository.emailExists(email)
      const hashPassword = await this.hashProvider.generateHash(password)

      const entity = new UserEntity(
        Object.assign(input, {
          password: hashPassword,
        }),
      )
      await this.userRepository.insert(entity)

      return entity.toJSON()
    }
  }
}
