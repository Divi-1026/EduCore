import { createQuiz,getquizall,getquizallSingle } from "@/Api/quiz.api";
import {useMutation,useQuery} from'@tanstack/react-query';
export const useCreateQuizHook=()=>{
    return useMutation({
        mutationFn:createQuiz,
        onSuccess:(data)=>{
            console.log("success")
            console.log(data)
        },
        onError:(err)=>{
        console.log(err);
    }
    })
   
}
 export const useGetquizHook=(lectureId)=>{
        return useQuery({
            queryFn:()=>getquizall(lectureId),
            queryKey:['getquiz',lectureId]
        })
    }
export const useGetquizSingleHook=(quizId)=>{
        return useQuery({
            queryFn:()=>getquizallSingle(quizId),
            queryKey:['getquiz',lectureId]
        })
    }