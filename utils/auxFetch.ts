import { useSnackbar } from "notistack"

// const { enqueueSnackbar } = useSnackbar()
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const baseFetch = async <T>(
  endpoint: string,
  opt?: RequestInit
): Promise<T> => {
  const resp = await fetch(`${baseUrl}/${endpoint}`, opt)
  if (!resp.ok) {
    // enqueueSnackbar(`Request failed with status: ${resp.status}`)
  }
  return await resp.json()
}

export const get = <T>(endpoint: string, opt?: RequestInit): Promise<T> => {
  return baseFetch<T>(endpoint, {
    method: "get",
    ...opt,
  })
}

export const post = <T>(endpoint: string, opt?: RequestInit): Promise<T> => {
  return baseFetch<T>(endpoint, {
    method: "post",
    ...opt,
  })
}

export const put = <T>(endpoint: string, opt?: RequestInit): Promise<T> => {
  return baseFetch<T>(endpoint, {
    method: "put",
    ...opt,
  })
}

export const deleteHttp = <T>(
  endpoint: string,
  opt?: RequestInit
): Promise<T> => {
  return baseFetch<T>(endpoint, {
    method: "delete",
    ...opt,
  })
}
