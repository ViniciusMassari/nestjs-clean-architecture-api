import { UserRepository } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '../errors/bad-request-error'
import { UserEntity } from '@/users/domain/entities/user.entity'

export namespace SignupUseCase {
  // parametros de entrada
  export interface Input {
    name: string
    email: string
    password: string
  }

  // o que será retornado
  export interface Output {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
  }

  export class UseCase {
    // construstor para injeção de dependência
    constructor(private userRepository: UserRepository.Repository) {}
    // o método pode ser chamado de handle ou execute
    async execute(input: Input): Promise<Output> {
      const { email, name, password } = input
      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided')
      }
      await this.userRepository.emailExists(email)

      const entity = new UserEntity(input)
      await this.userRepository.insert(entity)

      return entity.toJSON()
    }
  }
}
