import axios from "axios";
export const createCourse=async(payload)=>{
    const res= await axios.post(`${import.meta.env.VITE_BASE_URL}/course/createCourse`,
    payload,
    {
    headers:{
        'Content-Type':"multipart/form-data"
    },
    withCredentials:true
    } )
    console.log((await res).data,"from coure api")
    return res.data;
}
// api/course.js
// import axios from "axios";
export const createModuleApi = async ({ courseId, formData }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/module/createModule/${courseId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
  return res.data;
};
export const getCourseApi = async (search) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/course/getCourse`,
        {
            params:search?{search}:{},
            headers:{'Content-Type':'Application/json'},
            withCredentials:true
        }
    )
    console.log(res.data)
    return res.data
};
export const getSingleCourseApi = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/course/getSingleCourse/${id}`, // id path me
    {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
  );

  return res.data;
};
export const getPurchasedCourseApi= async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/course/purchasedCourse/${id}`, // id path me
    {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
  );

  return res.data;
};
export const getAllPurchasedCourse=async()=>{
    const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/course/getAllPurchasedCourse`, // id path me
    {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
  );

  return res.data;
}
export const getCreatedCourseApi = async (search) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/course/getCreatedCourse`,
        {
            params:search?{search}:{},
            headers:{'Content-Type':'Application/json'},
            withCredentials:true
        }
    )
    console.log(res.data)

    return res.data
};