import { getUser, loginApi, registerApi } from "@/Api/user.api"
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query"

import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { LogOut } from "@/Api/user.api"

export const useRegisterHook=()=>{
    return useMutation({
        mutationFn:registerApi,
        onSuccess:(data)=>{
            toast.success(data?.message)
            //  navigate(from, { replace: true });
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}
export const useLoginHook=()=>{
    return useMutation({
        mutationFn:loginApi,
        onSuccess:(data)=>{
         toast.success(data?.message)
        //   navigate(from, { replace: true });
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}
export const useGetUserHook=()=>{
    return useQuery({
        queryFn:getUser,
        queryKey:['getUser']
    })
}
export const useLogoutHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:LogOut,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);
      
    }
  });
};