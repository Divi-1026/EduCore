import axios from "axios";
 export const createComment=async(payload)=>{
    const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/comment/create_comment/${payload?.lectureId}`,
    {comment:payload?.comment},
     {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
    )
    return res.data
}
export const getComment=async(id)=>{
    const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/comment/get_comment/${id}`,
     {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
    )
    return res.data
}