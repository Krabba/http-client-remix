import { NavLink, useParams } from '@remix-run/react'

export default function RequestPage() {
  const params = useParams()

  return (
    <div className='flex flex-col justify-center gap-2'>
      <h1>Request ID: {params.id}</h1>
      <NavLink to='/'>Go back home</NavLink>
    </div>
  )
}
