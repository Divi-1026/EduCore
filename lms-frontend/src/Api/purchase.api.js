import axios from "axios"

export const purchaseCourseApi = async (courseId) => {
  
  try {
    console.log("Purchase payload:", courseId);

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/payment/checkout`,
      { courseId }, // sending as an object
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      }
    );

    // ✅ ensure we always return an object
    if (typeof res.data === "string") {
      return JSON.parse(res.data); 
    }
    return res.data;
  } catch (err) {
    console.error("Purchase API Error:", err.response?.data || err.message);
   
    throw err; // propagate error for frontend handling
  }
};


export const checkOutSuccess=async(id)=>{
     const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/checkout_success`,
        id,
        {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
   
    )
     return res.data;
}