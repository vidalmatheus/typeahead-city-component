"use client"
import React from "react"
import CitySelect from "@/components/CitySelect"
import { City } from "@/types/cityTypes"

export default function Locations() {
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null)

  const handleCityChange = (newCity: City | null) => {
    setSelectedCity(newCity)
  }

  return (
    <>
      <header>
        <h1 className='text-2xl font-semibold'>Select Locations</h1>
      </header>
      <div className="pt-8 pb-2 sm:inline-flex">
        <h2 className="sm:mr-10 font-medium">Add Locations</h2>
        <div className="italic inline-flex">
          <div className="mr-2">Value:</div>
          <div>
            {selectedCity &&
              `${selectedCity.name} - ${selectedCity.state_abbreviation}`}
          </div>
        </div>
      </div>
      <CitySelect onCityChange={handleCityChange} />
    </>
  )
}
