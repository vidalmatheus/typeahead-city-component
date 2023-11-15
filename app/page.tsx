import ApiCity from "@/api/city"
import Locations from "@/components/Locations"

const getServerSideMostRecentSelectedCities = async () => {
  const { getMostRecentSelectedCities } = ApiCity()
  let recentSelectedCities = await getMostRecentSelectedCities({
    cache: "no-store",
  })
  recentSelectedCities = recentSelectedCities.map((city) => ({
    ...city,
    recent_used: true,
  }))
  return recentSelectedCities
}

export default async function Home() {
  const recentSelectedCities = await getServerSideMostRecentSelectedCities()

  return (
    <>
      <Locations recentSelectedCities={recentSelectedCities} />
    </>
  )
}
