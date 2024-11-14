// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

// const useLogout = () => {
//   const [loading, setloading] = useState(false);
//   const { setAuthUser } = useAuthContext();

//   const logout = async () => {
//     try {
//       const res = await fetch("/api/auth/logout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await res.json();
//       if (data.error) {
//         throw new Error(data.error);
//       }
//       console.log("Before logout:", localStorage.getItem("chat-user"));
//       localStorage.removeItem("chat-user");
//       console.log("After logout:", localStorage.getItem("chat-user"));
//       setAuthUser(null);
//       console.log("Logout Successfully");
//     } catch (error) {
//       // toast.error(error.message);
//       console.log(`error in logout${error.message}`);
//     } finally {
//       setloading(false);
//     }
//   };
//   return { loading, logout };
// };

// export default useLogout;

import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);

      // Navigate to the login page
      //navigate("/login");

      console.log("Logged out successfully");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
export default useLogout;
