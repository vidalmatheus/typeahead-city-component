"use client"
import {
  TextField,
  debounce,
  Autocomplete,
  CircularProgress,
} from "@mui/material"
import React from "react"

type City = {
  id: number
  name: string
  state_abbreviation: string
  created: string
  updated: string
}

const getMostRecentLocations = async () => {
  return [
    {
      id: 4207,
      name: "Rio de Janeiro",
      state_abbreviation: "RJ",
      created: "2023-11-10T00:18:06.894961",
      updated: "2023-11-11T06:21:18.395691",
    },
    {
      id: 4853,
      name: "São Paulo",
      state_abbreviation: "SP",
      created: "2023-11-10T00:18:06.895410",
      updated: "2023-11-11T06:21:18.395691",
    },
  ]
}

const getCities = (name: string) => {
  return fetch(`http://localhost:8000/city?name=${name}`)
}

const optionsLabel = (city: City): string => {
  return `${city.name} - ${city.state_abbreviation}`
}

export default function CitySelect() {
  const [options, setOptions] = React.useState<City[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<City>()

  const handleOpen = async () => {
    const recentLocations = await getMostRecentLocations()
    setOptions(recentLocations)
  }

  const debouncedHandleInputChange = debounce(async (event, inputName: string, reason: string) => {
    if (reason !== "input" || !inputName) {
      return
    }
    setLoading(true)
    setOptions([])
    try {
      const resp = await getCities(inputName)
      const cityOptions = await resp.json()
      setOptions(cityOptions)
    } catch (err) {
      console.log(`Error fetching data: ${err}`)
    } finally {
      setLoading(false)
    }
  }, 500)

  return (
    <Autocomplete
      loading={loading}
      value={value}
      onOpen={handleOpen}
      onInputChange={debouncedHandleInputChange}
      options={options}
      getOptionLabel={optionsLabel}
      sx={{ maxWidth: 400 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Locations'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
