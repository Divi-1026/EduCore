import axios from "axios";
export const createQuiz=async(payload)=>{
  const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/quiz/create_quiz`,
      payload,
       {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
      )
      return res.data
}
export const getquizall=async(lectureId)=>{
 const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/getallquiz/${lectureId}`,
     
       {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
      )
      console.log(res.data);
      return res.data   

}
export const getquizallSingle=async(quizId)=>{
 const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/quiz/get_quiz/${quizId}`,
     
       {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
      )
      console.log(res.data);
      return res.data   

}