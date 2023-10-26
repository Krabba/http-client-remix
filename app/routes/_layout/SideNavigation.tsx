import { Badge } from '@http-client/components/ui/badge'
import { Button } from '@http-client/components/ui/button'
import { Input } from '@http-client/components/ui/input'
import type { HttpClientRequest, Method } from '@http-client/lib/types'
import type { loader as layoutLoader } from '@http-client/routes/_layout/route'
import { NavLink, useLoaderData } from '@remix-run/react'
import { PlusCircle } from 'lucide-react'

const NavItem = ({
  id,
  method,
  title,
}: Pick<HttpClientRequest, 'id' | 'method' | 'title'>) => {
  return (
    <Button asChild variant='ghost'>
      <NavLink to={`/requests/${id}`} className='flex items-center gap-2'>
        <Badge>{method}</Badge>
        <span>{title}</span>
      </NavLink>
    </Button>
  )
}

export const SideNavigation = () => {
  const { requests } = useLoaderData<typeof layoutLoader>()

  return (
    <div className='border-r p-2'>
      <div className='flex items-center gap-2'>
        <Input type='text' placeholder='Filter' />
        <Button asChild>
          <div className='flex items-center gap-2'>
            <PlusCircle className='h-4 w-4' />
            <span>New</span>
          </div>
        </Button>
      </div>
      <nav className='grid grid-cols-1 place-items-start'>
        {requests.map((request) => {
          return (
            <NavItem
              key={request.id}
              id={request.id}
              method={request.method as Method}
              title={request.title}
            />
          )
        })}
      </nav>
    </div>
  )
}
