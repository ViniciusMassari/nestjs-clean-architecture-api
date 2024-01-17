import { hashProvider } from '@/shared/application/providers/hash-provider'
import { compare, hash } from 'bcryptjs'

export class BcryptjsHashProvider implements hashProvider {
  async generateHash(payload: string): Promise<string> {
    const SALT_ROUNDS = 6
    return hash(payload, SALT_ROUNDS)
  }
  async compareHash(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash)
  }
}
