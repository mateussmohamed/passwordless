declare type UserSessionProps = {
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
