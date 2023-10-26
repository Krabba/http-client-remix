import type { ActionFunctionArgs } from '@remix-run/node'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  try {
    const form = await request.formData()
    const url = form.get('url') as string
    const method = form.get('_method') as string
    const _headers = form.get('_headers')
    const headers = _headers ? JSON.parse(_headers as string) : {}

    const _request = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })

    const json = await _request.json()

    return {
      data: json,
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: e,
    }
  }
}
