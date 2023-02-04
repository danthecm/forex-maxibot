import useAuth from './use-auth'
import axios from '../config/axios'

const useRefreshToken = () => {
    const { setAuth }= useAuth()

    const refresh = async () => {
        const response = await axios.get("refresh/", {
            withCredentials: true,
        })
        const token = response?.data?.access_token
        setAuth((prev) => {
            return {...prev, accessToken: token}
        })
    }
  return refresh
}

export default useRefreshToken