import { City } from "@/types/cityTypes"
import auxFetch from "@/utils/auxFetch"

export default function () {
  const { get } = auxFetch()

  return {
    getMostRecentLocations: async () => {
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
    },

    getCities: (name: string) => {
      return get<City[]>(`city?name=${name}`)
    },
  }
}
