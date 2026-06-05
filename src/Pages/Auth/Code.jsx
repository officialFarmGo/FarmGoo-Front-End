// import React from "react";
// import "../CSS/Code.css";
// import AntdInput from "antd/es/input";
// import Input from "../Props/Input";

// const Code = () => {
//   const [otp, setOtp] = React.useState("");
//   const handleVerifySubmit = (e) => {
//     const otpValue = e.target.value;
//     setOtp(otpValue);
//     e.preventDefault();
//     console.log("Verification trigger fired");
//   };

//   return (
//     <main className="code-container">
//       <section className="code-content-wrapper">
        
//         <header className="code-header-zone">
//           <h2 className="code-main-heading">Enter verification code</h2>
//         </header>
//         <form className="code-form-box" onSubmit={handleVerifySubmit}>
          
//           <div className="code-otp-row-container">
//             <Input.OTP
//               length={6}
//               className="custom-antd-otp"
//               defaultValue=""
//               onChange={(value) => setOtp(value)}
//             />
//           </div>
//           <div className="code-action-prompt-row">
//             <span className="code-muted-text">Didn't receive the code?</span>
//             <button type="button" className="code-action-accent-link">
//               Resend code
//             </button>
//           </div>
//           <div className="code-submission-block">
//             <button type="submit" className="code-verify-btn">
//               Verify and Continue
//             </button>

//             <p className="code-footer-navigation">
//               <span className="code-muted-text">Wrong number?</span>
//               <button
//                 type="button"
//                 className="code-action-accent-link code-link-normal"
//               >
//                 Go back
//               </button>
//             </p>
//           </div>
//         </form>
//       </section>
//     </main>
//   );
// };

// export default Code;
