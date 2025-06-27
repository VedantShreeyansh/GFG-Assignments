import React, { useState } from "react";
import Register from "./Register";


const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void}) => {
  const [step, setStep] = useState<"login" | "otp">("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
    alert("Mock OTP sent to your email! ");
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newOtp = otp.split("");
    newOtp[idx] = val;
    setOtp(newOtp.join(""));
    const next = document.getElementById(`otp-input-${idx + 1}`);
    if (next) (next as HTMLInputElement).focus();
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = otp.split("");
        newOtp[idx] = "";
        setOtp(newOtp.join(""));
      } else if (idx > 0){
        const prev = document.getElementById(`otp-input-${idx - 1}`);
        if (prev) (prev as HTMLInputElement).focus();
      }
    }
  };


  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") {
      alert("Login successful OTP verified");
      setStep("login");
      setForm({ email: "", password: ""});
      setOtp("");
      onLoginSuccess();
    } else {
      alert("Invalid OTP. Try 123456");
    }
  };

if (step === "login") {
  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <h2 className="text-2xl font-bold text-center mb-4"></h2>
      <input
        type="text"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        placeholder="Password"
        required
      />
      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-gray-800"
      >
        Login
      </button>
    </form>
  );
};


// OTP Step
return (
  <form onSubmit={handleOtpSubmit} className="flex flex-col items-center space-y-5">
    <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
    <div className="flex items-center gap-2 5 justify-center" id="otp-container">
      {[...Array(6)].map((_, idx) => (
        <input 
         key={idx}
            type="text"
            maxLength={1}
            className="w-12 h-12 font-semibold outline-none text-xl text-gray-700 text-center border rounded-md transition-all border-gray-300 focus:border-blue-500 bg-transparent"
            value={otp[idx] || ""}
            onChange={e => handleOtpChange(e, idx)}
            onKeyDown={e => handleOtpKeyDown(e, idx)}
            id={`otp-input-${idx}`}
            autoFocus={idx === 0}
            inputMode="numeric"
          />
      ))}
    </div>
    <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-gray-800 mt-4">
        Verify OTP
      </button>
  </form>
)
};

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void}) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</button>
            {mode === "login" ?(
                <>
                  <Login onLoginSuccess={onClose}/>
                  <p className="mt-4 text-center text-sm">
                    New here?{" "}
                    <button className="text-blue-600 hover:underline" onClick={() => setMode("register")}>
                        Create an account
                    </button>
                  </p>
                </>
            ) : (
                <>
                 <Register />
                 <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <button className="text-blue-600 hover:underline" onClick={() => setMode("login")}>
                        Login
                    </button>
                 </p>
                </>
            )}
        </div>
    </div>
  )
}

export default AuthModal;