import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { fetchApi } from "../utils/apiConfig"


const useFollow = ()=>{
  const queryClient  = useQueryClient()

  const {mutate:followUnfollow,isPending} = useMutation({
    mutationFn: async(userId)=>{
      try {
        const res = await fetchApi(`/users/follow/${userId}`,{
          method: "POST"
        })
        const data = await res.json()

        if(!res.ok) throw new Error(data.error || "Something went wrong")
        return data
      } catch (error) {
        throw new Error(error.message)           
      }
    },
    onSuccess:()=>{
      Promise.all([
        queryClient.invalidateQueries({queryKey:["suggestedUsers"]}),
        queryClient.invalidateQueries({queryKey:["authUser"]}),
      ])
    },
    onError: ()=>{
      toast.error(error.message)
    }
  })

  return {followUnfollow,isPending}
}

export default useFollow