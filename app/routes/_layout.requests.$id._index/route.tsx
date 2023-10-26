import { Button } from '@http-client/components/ui/button'
import { Input } from '@http-client/components/ui/input'
import type { HttpClientRequest } from '@http-client/lib/types'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { NavLink, useFetcher, useLoaderData } from '@remix-run/react'
import { ArrowBigLeft, PlusCircle, TrashIcon } from 'lucide-react'
import { useRef, useState } from 'react'
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
  const { request: _request } = useLoaderData<typeof loader>()
  const fetcher = useFetcher()
  const formRef = useRef<HTMLFormElement>(null)

  const [request, setRequest] = useState<HttpClientRequest>(
    _request as HttpClientRequest
  )

  return (
    <div className='flex flex-col justify-center gap-2'>
      <Button asChild>
        <NavLink to='/' className='flex w-28 items-center gap-2'>
          <ArrowBigLeft className='h-4 w-4' />
          <span>Go back</span>
        </NavLink>
      </Button>

      <fetcher.Form
        ref={formRef}
        method='POST'
        action={`/api/requests/${request.id}`}
      >
        <div className='flex items-center gap-2'>
          <Input
            type='text'
            name='url'
            value={request.url}
            onChange={(e) => {
              setRequest({
                ...request,
                url: e.target.value,
              })
            }}
          />

          <input type='hidden' name='_method' value={request.method} />
          <input
            type='hidden'
            name='_headers'
            value={JSON.stringify(request?.headers || {})}
          />
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

      <div className='grid grid-cols-1 gap-2'>
        {Object.entries(request?.headers || {}).map(
          ([key, value], headerIndex) => {
            return (
              <div
                key={`header-${headerIndex}`}
                className='flex items-center gap-2'
              >
                <Input
                  type='text'
                  autoFocus={true}
                  value={key}
                  onChange={(e) => {
                    const newKeys = Object.keys(request.headers!).map(
                      (headerKey) => {
                        if (headerKey === key) {
                          return e.target.value
                        }

                        return headerKey
                      }
                    )

                    const newHeaders = newKeys.reduce(
                      (acc, key, index) => {
                        acc[key] = Object.values(request.headers!)[index]
                        return acc
                      },
                      {} as Record<string, string>
                    )

                    setRequest({
                      ...request,
                      headers: newHeaders,
                    })
                  }}
                />
                <Input
                  type='text'
                  value={value}
                  onChange={(e) => {
                    const newValues = Object.values(request.headers!).map(
                      (headerValue) => {
                        if (headerValue === value) {
                          return e.target.value
                        }

                        return headerValue
                      }
                    )

                    const newHeaders = Object.keys(request.headers!).reduce(
                      (acc, key, index) => {
                        acc[key] = newValues[index]
                        return acc
                      },
                      {} as Record<string, string>
                    )

                    setRequest({
                      ...request,
                      headers: newHeaders,
                    })
                  }}
                />
                <Button
                  onClick={() => {
                    const newKeys = Object.keys(request.headers!).filter(
                      (headerKey) => {
                        return headerKey !== key
                      }
                    )

                    const newHeaders = newKeys.reduce(
                      (acc, key, index) => {
                        acc[key] = Object.values(request.headers!)[index]
                        return acc
                      },
                      {} as Record<string, string>
                    )

                    setRequest({
                      ...request,
                      headers: newHeaders,
                    })
                  }}
                  asChild
                >
                  <div className='flex w-36 items-center gap-2'>
                    <TrashIcon className='h-4 w-4' />
                  </div>
                </Button>
              </div>
            )
          }
        )}
        <Button
          onClick={() => {
            setRequest({
              ...request,
              headers: {
                ...request.headers,
                '': '',
              },
            })
          }}
          asChild
        >
          <div className='flex w-36 items-center gap-2'>
            <PlusCircle className='h-4 w-4' />
            <span>Add header</span>
          </div>
        </Button>
      </div>

      {/* <pre>{JSON.stringify(request, null, 2)}</pre> */}

      {fetcher.state !== 'idle' ? <div>Loading ...</div> : null}

      {fetcher?.data ? (
        <pre>{JSON.stringify(fetcher.data, null, 2)}</pre>
      ) : null}
    </div>
  )
}
