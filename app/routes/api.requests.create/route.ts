import type { ActionFunctionArgs } from '@remix-run/node'
import fs from 'fs'
import path from 'path'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  try {
    const form = await request.formData()
    const newRequest = form.get('newRequest')

    const relativePath = path.join(process.env.RELATIVE_PATH!, 'requests.json')
    const file = fs.readFileSync(relativePath, 'utf-8')
    const requests = JSON.parse(file)

    const newId = requests.length + 1

    const updatedRequests = [
      ...requests,
      {
        id: String(newId),
        method: 'GET',
        title: `Request ${newId}`,
        url: `${newRequest}/api/v1/requests/${newId}`,
        headers: {},
      },
    ]

    fs.writeFileSync(relativePath, JSON.stringify(updatedRequests, null, 2))

    return null
  } catch (e) {
    return null
  }
}
