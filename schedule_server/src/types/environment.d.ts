export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string
      DB_USER: string
      DB_PORT: string
      DB_PSWD: string
      DB_NAME: string
    }
  }
}
