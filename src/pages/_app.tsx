import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar'

import 'tailwindcss/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas)

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <NextNprogress color="#6366f1" startPosition={0.3} stopDelayMs={200} height={5} />
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
