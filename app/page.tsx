"use client"
import React from "react"
import Locations from "@/components/Locations"
import { SnackbarProvider } from "notistack"
import CloseIcon from "@mui/icons-material/Close"

export default function Home() {
  return (
    <>
      <SnackbarProvider
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
      >
        <Locations />
      </SnackbarProvider>
    </>
  )
}
