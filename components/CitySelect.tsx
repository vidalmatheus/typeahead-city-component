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
import ApiCity from "@/api/city"
import { useSnackbar, OptionsObject } from "notistack"

type CitySelectProps = {
  onCityChange: React.Dispatch<City | null>
}

export default function CitySelect({ onCityChange }: CitySelectProps) {
  const [options, setOptions] = React.useState<City[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<City | null>(null)
  const { getCities, getMostRecentLocations } = ApiCity()
  const { enqueueSnackbar } = useSnackbar()

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
    if (!value) return
    enqueueSnackbar(
      `${value.name} - ${value.state_abbreviation} was selected`,
      {
        variant: "success",
      }
    )
  }

  const debouncedHandleInputChange = debounce(
    async (event: any, inputName: string, reason: string) => {
      const isInput = reason === "input"
      const hasInputName = !!inputName
      if (!isInput) return
      if (!hasInputName) return
      inputName = inputName.trim()
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

  const handleIsOptionEqualToValue = (option: City, value: City) => {
    if (!value) return false
    return option.id === value.id
  }

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
      filterOptions={(x) => x}
      renderOption={handleRenderOption}
      isOptionEqualToValue={handleIsOptionEqualToValue}
      sx={{ maxWidth: 600 }}
      renderInput={handleRenderInput}
    />
  )
}
