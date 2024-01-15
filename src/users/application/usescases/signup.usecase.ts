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
    // o método pode ser chamado de handle ou execute
    async execute(input: Input): Promise<Output> {}
  }
}
