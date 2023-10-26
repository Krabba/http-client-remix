import { Button } from '@http-client/components/ui/button'
import { Input } from '@http-client/components/ui/input'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { NavLink, useFetcher, useLoaderData } from '@remix-run/react'
import { useRef } from 'react'
import requests from '../api.requests.$id.save/requests.json'

export const loader = ({ params }: LoaderFunctionArgs) => {
  const request = requests.find((request) => request.id === params.id)

  if (!request) {
    throw new Error(`Request with ID ${params.id} not found`)
  }

  return {
    request: request,
  }
}

export default function RequestPage() {
  const { request } = useLoaderData<typeof loader>()
  const fetcher = useFetcher()
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className='flex flex-col justify-center gap-2'>
      <h1>Request ID: {request.id}</h1>
      <pre>{JSON.stringify(request, null, 2)}</pre>
      <NavLink to='/'>Go back home</NavLink>

      <fetcher.Form
        ref={formRef}
        method='POST'
        action={`/api/requests/${request.id}`}
      >
        <div className='flex flex-col justify-center gap-2'>
          <Input type='text' defaultValue={request.url} name='url' />
          <Input type='hidden' name='_method' value={request.method} />
          <div className='flex items-center gap-2'>
            <Button
              className='w-24'
              onClick={(e) => {
                e.preventDefault()
                fetcher.submit(formRef.current, {
                  action: `/api/requests/${request.id}/save`,
                  method: 'POST',
                })
              }}
            >
              Save
            </Button>
            <Button className='w-24' type='submit'>
              Submit
            </Button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  )
}
