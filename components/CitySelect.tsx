"use client"
import {
  TextField,
  debounce,
  Autocomplete,
  CircularProgress,
  Box,
  AutocompleteRenderOptionState,
  AutocompleteRenderInputParams,
} from "@mui/material"
import React from "react"
import CheckIcon from "@mui/icons-material/check"
import { City } from "@/types/cityTypes"
import { getMostRecentLocations, getCities } from "@/api/city"

type CitySelectProps = {
  onCityChange: React.Dispatch<City | null>
}

export default function CitySelect({ onCityChange }: CitySelectProps) {
  const [options, setOptions] = React.useState<City[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<City | null>(null)
  
  const handleOpen = async () => {
    if (!!value) {
      return
    }
    const recentLocations = await getMostRecentLocations()
    setOptions(recentLocations)
  }

  const handleChange = (event: any, value: City | null) => {
    setValue(value)
    onCityChange(value)
  }

  const debouncedHandleInputChange = debounce(
    async (event: any, inputName: string, reason: string) => {
      if (reason !== "input" || !inputName) {
        return
      }
      setLoading(true)
      try {
        const cityOptions = await getCities(inputName)
        setOptions(cityOptions)
      } finally {
        setLoading(false)
      }
    },
    500
  )

  const getOptionsLabel = (option: City) => {
    return `${option.name} - ${option.state_abbreviation}`
  }

  const handleRenderOption = (
    props: any,
    option: City,
    state: AutocompleteRenderOptionState
  ) => (
    <Box {...props} sx={{ gap: 2 }}>
      {state.selected && <CheckIcon />}
      {option.name} - {option.state_abbreviation}
    </Box>
  )

  const handleRenderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress color='inherit' size={20} /> : null}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
    />
  )

  return (
    <Autocomplete
      loading={loading}
      value={value}
      onOpen={handleOpen}
      onChange={handleChange}
      onInputChange={debouncedHandleInputChange}
      options={options}
      getOptionLabel={getOptionsLabel}
      renderOption={handleRenderOption}
      sx={{ maxWidth: 400 }}
      renderInput={handleRenderInput}
    />
  )
}
