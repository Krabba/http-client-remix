import type { HttpClientRequest } from '@http-client/lib/types'
import type { ActionFunctionArgs } from '@remix-run/node'
import fs from 'fs'
import path from 'path'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  try {
    const form = await request.formData()
    const url = form.get('url')
    const method = form.get('_method')
    const _headers = form.get('_headers')
    const headers = _headers ? JSON.parse(_headers as string) : {}

    const relativePath = path.join(process.env.RELATIVE_PATH!, 'requests.json')
    const file = fs.readFileSync(relativePath, 'utf-8')
    const requests = JSON.parse(file)

    const updatedRequests = requests.map((request: HttpClientRequest) => {
      if (request.id === params.id) {
        return {
          ...request,
          url,
          method,
          headers,
        }
      }

      return request
    })

    fs.writeFileSync(relativePath, JSON.stringify(updatedRequests, null, 2))

    return null
  } catch (e) {
    return null
  }
}
