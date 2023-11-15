import { City, CityLog } from "@/types/cityTypes"
import auxFetch from "@/utils/auxFetch"

export default function () {
  const { get, post } = auxFetch()

  return {
    getMostRecentSelectedCities: () => {
      return get<City[]>("city/most-recent-selected-cities")
    },
    getCities: (name: string) => {
      return get<City[]>(`city?name=${name}`)
    },
    postCreateCityLog: (cityId: number, status: string) => {
      return post<CityLog>("city/log", {
        body: JSON.stringify({ cityId, status }),
      })
    }
  }
}
