import { createCourse, getAllPurchasedCourse, getCourseApi, getPurchasedCourseApi, getSingleCourseApi } from "@/Api/course.api"
import { useMutation, useQuery } from "@tanstack/react-query"
export const useCreateCourseHook=()=>{
return useMutation({
    mutationFn:createCourse,
    onSuccess:(data)=>{
        console.log("from create hook",data.newCourse)
    },
    onError:(err)=>{
        console.log(err);
    }
})
}
export const useGetCourseHook = (search) => {
  return useQuery({
     queryFn: () => getCourseApi(search),
    queryKey: ['getCourse', search], // search bhi queryKey me pass
    // queryFn ko correct param de
    keepPreviousData: true,
  });
};
export const usegetSingleCourse=(id)=>{
    return useQuery({
        queryFn:()=>getSingleCourseApi(id),
        queryKey:['getSingleCourse',id]
    })
}
export const usegetPurchaseCourseHook=(id)=>{
 return useQuery({
    queryFn:()=>getPurchasedCourseApi(id),
    queryKey:['getPurchasedCourse',id]
 })
}
export const usegetAllPurchasedCourse=()=>{
    return useQuery({
        queryFn:getAllPurchasedCourse,
        queryKey:['getAllPurchaseCourse']
    })
}
import { getCreatedCourseApi } from "@/Api/course.api";

export const useGetCreatedCourses = () => {
  return useQuery({
    queryKey: ["createdCourses"], // unique key
    queryFn: getCreatedCourseApi,
    staleTime: 1000 * 60 * 5, // 5 min cache
    refetchOnWindowFocus: false,
  });
};