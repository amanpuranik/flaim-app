import { UserCredential } from "firebase/auth"

export type AuthResponse = {
    token: UserCredential | null,
    error: boolean
    errorMessage: string
}
