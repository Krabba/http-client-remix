import { SideNavigation } from '@http-client/routes/_layout/SideNavigation'
import { Outlet } from '@remix-run/react'
import requests from '../api.requests.$id.save/requests.json'

export const loader = async () => {
  return {
    requests: requests,
  }
}

export default function Layout() {
  return (
    <div className='flex h-full justify-center gap-2 p-2'>
      <SideNavigation />
      <main className='relative mx-auto my-4 flex h-full flex-col gap-4 px-2 sm:container'>
        <Outlet />
      </main>
    </div>
  )
}
