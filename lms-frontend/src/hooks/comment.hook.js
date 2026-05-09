import { createComment,getComment } from "@/Api/comment.api";
import {useMutation,useQuery} from '@tanstack/react-query';
export const useCreateCommentHook=()=>{
    return useMutation({
        mutationFn:createComment,
         onSuccess:(data)=>{
        console.log("from create hook",data)
    },
    onError:(err)=>{
        console.log(err);
    }
    })
}
export const useGetCommentHook=(id)=>{
    return useQuery({
        queryFn:()=>getComment(id),
        queryKey:['getComment',id]
    })
}