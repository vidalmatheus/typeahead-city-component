"use client"
import React from "react"
import CitySelect from "@/components/CitySelect"
import { City } from "@/types/cityTypes"
import { Box } from "@mui/material"

export default function Locations() {
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null)

  const handleCityChange = (newCity: City | null) => {
    setSelectedCity(newCity)
  }

  return (
    <>
      <header>
        <h1 className='text-2xl'>Select Locations</h1>
        <h2 className='pt-8 pb-2'>Add Locations</h2>
      </header>
      <CitySelect onCityChange={handleCityChange} />
      <Box sx={{ gap: 2, paddingTop: 10 }}>
	  	Selected City:{" "}
        {selectedCity &&
          `${selectedCity.name} - ${selectedCity.state_abbreviation}`}
      </Box>
    </>
  )
}
