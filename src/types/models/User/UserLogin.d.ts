export default interface UserLoginModel {
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: unknown
}
