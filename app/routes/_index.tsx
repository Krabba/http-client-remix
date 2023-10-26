import { Button } from '@http-client/components/ui/button'
import electron from '@http-client/electron.server'
import { useLoaderData } from '@remix-run/react'

export function loader() {
  return {
    userDataPath: electron.app.getPath('userData'),
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <main>
      <h1>Welcome to Remix</h1>
      <span className='bg-fuchsia-500 font-bold'>Tailwind is working</span>
      <Button>shadcn/ui Button</Button>
      <p>User data path: {data.userDataPath}</p>
    </main>
  )
}
