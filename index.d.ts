declare type UserSessionProps = {
  id?: string
  email: string
  name: string
  image?: string
}

declare type SessionProps = {
  expires: string
  user: UserSessionProps
}

declare type ProtectedPageProps = {
  session: SessionProps
}
