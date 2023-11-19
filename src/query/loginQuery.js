// import axios from "axios";
// import { toast } from "react-toastify";

// async function loginQuery({ userData }) {
//   try {
//     const response = await axios.post("http://localhost:3001/login", userData);
//     if (response.status === "ok") {
//       localStorage.setItem("token", response.token);
//       return toast.success("Successful login!");
//     } else {
//       return toast.error("Invalid username/password");
//     }
//   } catch (error) {
//     return toast.error("An error occurred. Please try again.");
//   }
// }

// export default loginQuery;


import axios from "axios";
const API = axios.create({baseURL:"http://localhost:3001"});

API.interceptors.request.use((req)=>{
  if(localStorage.getItem("token")){
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("token")).token}`
  }
  return req;
})

export const signIn = (formData) => API.post("/signin", formData);
export const signUp = (formData) => API.post("/signup", formData);