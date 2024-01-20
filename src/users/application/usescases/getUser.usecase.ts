import { UserRepository } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '../errors/bad-request-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'

export namespace GetUserUseCase {
  export interface Input {
    id: string
  }

  export interface Output {
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
  }

  export class UseCase {
    constructor(private userRepository: UserRepository.Repository) {}
    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id)
      if (!entity) {
        throw new NotFoundError('user not found')
      }
      return entity.toJSON()
    }
  }
}
