import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { InMemoryRepository } from '@/shared/domain/repositories/in-memory-repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepository } from '@/users/domain/repositories/user.repository'

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(entity => entity.email === email)
    if (!entity) {
      throw new ConflictError(`Entity not found using email: ${email}`)
    }
    return entity
  }

  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(entity => entity.email === email)
    if (entity) {
      throw new ConflictError(`Email address already exists`)
    }
  }
}