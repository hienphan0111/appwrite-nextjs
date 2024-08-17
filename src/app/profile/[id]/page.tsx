import React from 'react'
import { useParams } from 'next/navigation'

const UserDetail = ({params}) => {
  return (
    <div>UserDetail {params.id}</div>
  )
}

export default UserDetail