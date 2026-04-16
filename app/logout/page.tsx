"use client"
import { useEffect } from "react"
import { logoutAction } from "@/app/actions/logoutAction"
export default function Page() {
  useEffect(() => {
    logoutAction()
  }, [])
  return null
}
