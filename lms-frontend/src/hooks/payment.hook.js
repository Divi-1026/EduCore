import { checkOutSuccess, purchaseCourseApi } from '@/Api/purchase.api'
import { useMutation } from '@tanstack/react-query'
import { useNavigate,useLocation } from 'react-router-dom'
 
// Payment hook
export const usePayment = () => {
    const navigate=useNavigate()
    const location = useLocation();
    return useMutation({
        mutationFn: purchaseCourseApi,
        onSuccess: (data) => {
            console.log("from Hook Payment", data)
            if (data?.url) {
                // Redirect directly to Stripe Checkout
                window.location.href = data.url
            }
        },
        onError: (err) => {
            console.log(err)
            if (err.response?.status === 401) {
                console.log("Lo",location.pathname)
                navigate("/login", {
                    state: { from: location.pathname }   // ✅ store current page
                })
            }
        }
    })
}

// Checkout Success hook
export const useCheckOutSuccessHook = () => {
    const navigate = useNavigate() // ✅ call inside hook, top-level

    return useMutation({
        mutationFn: (sessionId) => checkOutSuccess(sessionId),
        onSuccess: (data) => {
            console.log("Checkout success data:", data)
            if (data?.courseId) {
                navigate(`/courses/${data.courseId}`)
            }
        },
        onError: (err) => {
            console.log("Checkout success error:", err)
        }
    })
}