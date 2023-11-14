import React from "react"
import CitySelect from "@/components/CitySelect"

export default function Home() {
  return (
    <>
      <header>
        <h1 className='text-2xl'>Select Locations</h1>
        <h2 className='pt-8 pb-2'>Add Locations</h2>
      </header>
      <CitySelect />
    </>
  )
}
