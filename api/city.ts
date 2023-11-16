import { City, CityLog, CityLogStatus } from "@/types/cityTypes"
import auxFetch from "@/utils/auxFetch"

export default function () {
  const { get, post } = auxFetch()

  return {
    getMostRecentSelectedCities: (opt?: RequestInit) => {
      return get<City[]>("city/log/most-recent-selected-cities", opt)
    },
    getCities: (name: string, opt?: RequestInit) => {
      return get<City[]>(`city?name=${name}`)
    },
    postCreateCityLog: (
      cityId: number,
      status: CityLogStatus,
      opt?: RequestInit
    ) => {
      return post<CityLog>("city/log", {
        body: JSON.stringify({ cityId, status }),
        ...opt,
      })
    },
  }
}
