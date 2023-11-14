import { City } from "@/types/cityTypes"
import { get } from "@/utils/auxFetch"

export const getMostRecentLocations = async () => {
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

export const getCities = (name: string) => {
  return get<City[]>(`city?name=${name}`)
}
