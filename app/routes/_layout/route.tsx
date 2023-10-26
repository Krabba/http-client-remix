import { Outlet } from '@remix-run/react'

export default function Layout() {
  return (
    <div className='flex h-full flex-col items-center'>
      <main className='relative mx-auto my-4 flex h-full flex-col gap-4 px-2 sm:container'>
        <Outlet />
      </main>
    </div>
  )
}
