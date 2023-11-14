import { City } from "@/types/cityTypes"
import { get } from "@/utils/auxFetch"

export const getMostRecentLocations = async () => {
  return [
    {
      id: 4207,
      name: "Rio de Janeiro",
      state_abbreviation: "RJ",
    },
    {
      id: 4853,
      name: "São Paulo",
      state_abbreviation: "SP",
    },
  ]
}

export const getCities = (name: string) => {
  return get<City[]>(`city?name=${name}`)
}
