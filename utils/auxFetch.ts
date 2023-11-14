import { useSnackbar } from "notistack"

export default function () {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const { enqueueSnackbar } = useSnackbar()
  const baseFetch = async <T>(
    endpoint: string,
    opt?: RequestInit
  ): Promise<T> => {
    try {
      const resp = await fetch(`${baseUrl}/${endpoint}`, opt)
      return await resp.json()
    } catch (err) {
      const msg = `Request failed: ${err}}`
      enqueueSnackbar(msg, { variant: "error" })
      throw new Error(msg)
    }
  }

  return {
    get: <T>(endpoint: string, opt?: RequestInit): Promise<T> => {
      return baseFetch<T>(endpoint, {
        method: "get",
        ...opt,
      })
    },

    post: <T>(endpoint: string, opt?: RequestInit): Promise<T> => {
      return baseFetch<T>(endpoint, {
        method: "post",
        ...opt,
      })
    },

    put: <T>(endpoint: string, opt?: RequestInit): Promise<T> => {
      return baseFetch<T>(endpoint, {
        method: "put",
        ...opt,
      })
    },

    deleteHttp: <T>(endpoint: string, opt?: RequestInit): Promise<T> => {
      return baseFetch<T>(endpoint, {
        method: "delete",
        ...opt,
      })
    },
  }
}
