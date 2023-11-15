export type City = {
  id: number
  name: string
  state_abbreviation: string
  recent_used: boolean
}

export type CityLog = {
  id: number
  city: City
  status: string
}

export type CityLogStatus = "selected" | "created" | "updated" | "deleted"
