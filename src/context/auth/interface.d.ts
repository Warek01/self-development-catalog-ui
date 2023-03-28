export interface AuthContextProps {
  userData: UserData | null
  userLoaded: boolean

  login: (ident: string, pass: string) => Promise<boolean>
  logout: () => Promise<boolean>
  register: (email: string, pass: string, username: string) => Promise<boolean>
}

export interface UserData {
  jwt: string
  user: UserLoginModel
}

export interface LoginResponse {
  login: UserData
}

export interface RegisterResponse {
  register: UserData
}
