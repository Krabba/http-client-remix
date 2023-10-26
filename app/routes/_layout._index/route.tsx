import { Button } from '@http-client/components/ui/button'
import electron from '@http-client/electron.server'
import { useLoaderData } from '@remix-run/react'

export function loader() {
  return {
    userDataPath: electron.app.getPath('userData'),
  }
}

export default function HomePage() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <span className='bg-fuchsia-500 font-bold'>Tailwind is working</span>
      <Button>shadcn/ui Button</Button>
      <p>User data path: {data.userDataPath}</p>
    </div>
  )
}
