import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCheckOutSuccessHook } from "@/hooks/payment.hook";

export const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate: checkoutSuccess } = useCheckOutSuccessHook();

  useEffect(() => {
    console.log("PaymentSuccess triggered");
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");
   console.log("sess",sessionId)
    if (sessionId) {
      checkoutSuccess(
        { sessionId },
        {
          onSuccess: (res) => {
            console.log("Payment processed:", res);
            
          },
          onError: (err) => {
            console.log("Checkout success error:", err);
          },
        }
      );
    }
  }, [location, checkoutSuccess, navigate, id]);

  return <div>Payment Success</div>;
};