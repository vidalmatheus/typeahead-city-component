import ApiCity from "@/api/city"
import Locations from "@/components/Locations"

export const dynamic = "force-dynamic" // ServerSide getServerSideMostRecentSelectedCities

const getServerSideMostRecentSelectedCities = async () => {
  const { getMostRecentSelectedCities } = ApiCity()
  let recentSelectedCities = await getMostRecentSelectedCities({
    cache: "no-store",
  })
  return recentSelectedCities.map((city) => ({
    ...city,
    recent_used: true,
  }))
}

export default async function Home() {
  const recentSelectedCities = await getServerSideMostRecentSelectedCities()

  return (
    <>
      <Locations recentSelectedCities={recentSelectedCities} />
    </>
  )
}
