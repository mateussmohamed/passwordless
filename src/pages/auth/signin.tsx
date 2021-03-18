import Link from 'next/link'
import { NextPageContext } from 'next'
import { signIn, csrfToken } from 'next-auth/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type SignInProps = {
  csrfToken: string
}

function SignInPage({ csrfToken }: SignInProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <form method="post" action="/api/auth/signin/email">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

              <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                type="submit"
                className="transition duration-200 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Signin</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 gap-1">
              <button
                onClick={() => signIn('github')}
                className="transition duration-200 flex justify-center items-center w-full p-4 my-2 text-black transition bg-white border-black rounded shadow ripple waves-light hover:shadow-lg hover:bg-gray-300 focus:outline-none"
              >
                <FontAwesomeIcon size="lg" icon={['fab', 'github']} />
                &nbsp; Continue with Github
              </button>

              <button
                onClick={() => signIn('google')}
                className="transition duration-200 flex justify-center items-center w-full p-4 my-2 text-black transition bg-white border-black rounded shadow ripple waves-light hover:shadow-lg hover:bg-gray-300 focus:outline-none"
              >
                <FontAwesomeIcon size="lg" icon={['fab', 'google']} />
                &nbsp; Continue with Google
              </button>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-1 gap-1">
            <div className="text-center w-full whitespace-nowrap">
              <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-top"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <Link href="/">
                  <a className="inline-block ml-1">Back to home</a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage

export async function getServerSideProps(ctx: NextPageContext) {
  return {
    props: {
      csrfToken: await csrfToken(ctx)
    }
  }
}
