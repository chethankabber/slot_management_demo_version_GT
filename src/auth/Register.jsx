// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   // Add state for email, password, confirmPassword, and role
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [role, setRole] = useState("user"); // default

//   const handleRegister = (e) => {
//     e.preventDefault();
//     // You can add your registration logic here
//     // Access: email, password, confirmPassword, role
//     navigate("/login"); // go to login after register
//   };

//   return (
//     <div className="d-flex" style={{
//       minHeight: "100vh",
//       overflow: "hidden",
//       backgroundColor: "hsl(215, 30%, 10%)",
//       color: "hsl(210, 40%, 98%)",
//     }}>
//       <div
//         className="container d-flex justify-content-center align-items-center"
//         style={{ minHeight: "100vh" }}
//       >
//         <div
//           className="card p-4"
//           style={{
//             backgroundColor: "hsl(215, 25%, 14%)",
//             color: "hsl(210, 40%, 98%)",
//             border: "1px solid hsl(215, 20%, 25%)",
//             width: "60%",
//             maxWidth: "400px",
//           }}
//         >
//           <h2 className="mb-4 text-center">Register</h2>
//           <form onSubmit={handleRegister}>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="Enter email"
//                 style={{
//                   backgroundColor: "hsl(215, 25%, 12%)",
//                   color: "hsl(210, 40%, 98%)",
//                   border: "1px solid hsl(215, 20%, 25%)",
//                 }}
//                 value={email} // controlled input
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 placeholder="Password"
//                 style={{
//                   backgroundColor: "hsl(215, 25%, 12%)",
//                   color: "hsl(210, 40%, 98%)",
//                   border: "1px solid hsl(215, 20%, 25%)",
//                 }}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="confirmPassword" className="form-label">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="confirmPassword"
//                 placeholder="Confirm Password"
//                 style={{
//                   backgroundColor: "hsl(215, 25%, 12%)",
//                   color: "hsl(210, 40%, 98%)",
//                   border: "1px solid hsl(215, 20%, 25%)",
//                 }}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>

//             {/* Role Selection */}
//             <div className="mb-4">
//               <label htmlFor="role" className="form-label">
//                 Role
//               </label>
//               <select
//                 id="role"
//                 className="form-select"
//                 style={{
//                   backgroundColor: "hsl(215, 25%, 12%)",
//                   color: "hsl(210, 40%, 98%)",
//                   border: "1px solid hsl(215, 20%, 25%)",
//                 }}
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//               >
//                 <option value="user">User</option>
//                 <option value="manager">Manager</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               className="btn w-100"
//               style={{
//                 backgroundColor: "hsl(210, 40%, 50%)",
//                 color: "hsl(215, 25%, 12%)",
//                 border: "1px solid hsl(215, 20%, 25%)",
//               }}
//             >
//               Register
//             </button>
//           </form>

//           <div
//             className="text-center mt-3"
//             style={{
//               cursor: "pointer",
//               color: "hsl(210, 40%, 80%)",
//             }}
//           >
//             <p>
//               Already have an account?{" "}
//               <span
//                 className="text-info"
//                 onClick={() => navigate("/login")}
//               >
//                 LOGIN
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
