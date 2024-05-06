"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'

const Client = () => {
  const {data: session} = useSession({
    required : true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client")
    },
  })

  console.log("SESSION ===== ", session);

  return (
    <div>Client</div>
  )
}

export default Client