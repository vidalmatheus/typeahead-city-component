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
import { useSnackbar } from "notistack"

type CitySelectProps = {
  onCityChange?: React.Dispatch<City | null>
  recentSelectedCities?: City[]
}

export default function CitySelect({
  onCityChange,
  recentSelectedCities,
}: CitySelectProps) {
  const [localRecentSelectedCities, setLocalRecentSelectedCities] =
    React.useState<City[]>(recentSelectedCities ?? [])
  const [options, setOptions] = React.useState<City[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<City | null>(null)
  const { getCities, postCreateCityLog } = ApiCity()
  const { enqueueSnackbar } = useSnackbar()

  const handleOpen = async () => {
    if (!!value) return
    setOptions(localRecentSelectedCities)
  }

  const addNewSelectedCity = (value: City) => {
    const hasNewSelectedCity = localRecentSelectedCities.some(
      (city) => city.id === value.id
    )
    if (hasNewSelectedCity) {
      const updatedLocalRecentSelectedCities = [
        { ...value, recent_used: true },
        ...localRecentSelectedCities.filter((city) => city.id !== value.id),
      ]
      setLocalRecentSelectedCities(updatedLocalRecentSelectedCities)
      return
    }
    const updatedLocalRecentSelectedCities = [
      { ...value, recent_used: true },
      ...localRecentSelectedCities,
    ]
    setLocalRecentSelectedCities(updatedLocalRecentSelectedCities)
  }

  const handleChange = async (event: any, value: City | null) => {
    setValue(value)
    if (onCityChange) onCityChange(value)
    if (!value) {
      setOptions(localRecentSelectedCities)
      return
    }
    await postCreateCityLog(value.id, "selected")
    addNewSelectedCity(value)
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
      label='Locations'
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
      groupBy={(option) => (option.recent_used ? "Most recent used" : "")}
      sx={{ maxWidth: 600 }}
      renderInput={handleRenderInput}
    />
  )
}
