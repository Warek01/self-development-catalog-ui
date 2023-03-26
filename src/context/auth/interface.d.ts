export interface AuthContextProps {
  userData: UserData | null

  login: (ident: string, pass: string) => Promise<boolean>
  logout: () => Promise<boolean>
  register: (email: string, pass: string, username: string) => Promise<boolean>
}

export interface UserData {
  jwt: string
  user: UserModel
}

export interface LoginResponse {
  login: UserData
}

export interface RegisterResponse {
  register: UserData
}
