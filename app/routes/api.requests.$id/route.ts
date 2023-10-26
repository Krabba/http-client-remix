import type { ActionFunctionArgs } from '@remix-run/node'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const form = await request.formData()
  const url = form.get('url')
  const method = form.get('_method')

  console.log('Successfully posted', params.id, url, method)

  return null
}
