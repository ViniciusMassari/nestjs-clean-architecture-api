import { UserRepository } from '@/users/domain/repositories/user.repository'
import { BadRequestError } from '../errors/bad-request-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { UserOutput } from '../dtos/user-output'

export namespace GetUserUseCase {
  export interface Input {
    id: string
  }

  export type Output = UserOutput

  export class UseCase {
    constructor(private userRepository: UserRepository.Repository) {}
    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id)
      return entity.toJSON()
    }
  }
}
