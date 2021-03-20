declare type UserSessionProps = {
  email: string
  image: string
  name: string
}

declare type SessionProps = {
  expires: string
  user: UserSessionProps
}

declare type ProtectedPageProps = {
  session: SessionProps
}
