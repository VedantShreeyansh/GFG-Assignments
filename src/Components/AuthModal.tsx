import React, { useState } from "react";
import Register from "./Register";

const Login = ({
  onLoginSuccess,
  otpSuccess,
  setOtpSuccess,
}: {
  onLoginSuccess: () => void;
  otpSuccess: boolean;
  setOtpSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newOtp = otp.split("");
    newOtp[idx] = val;
    setOtp(newOtp.join(""));
    const next = document.getElementById(`otp-input-${idx + 1}`);
    if (next) (next as HTMLInputElement).focus();
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = otp.split("");
        newOtp[idx] = "";
        setOtp(newOtp.join(""));
      } else if (idx > 0) {
        const prev = document.getElementById(`otp-input-${idx - 1}`);
        if (prev) (prev as HTMLInputElement).focus();
      }
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") {
      setOtpSuccess(true);
      setTimeout(() => {
        setStep("login");
        setForm({ email: "", password: "" });
        setOtp("");
        setOtpSuccess(false);
        onLoginSuccess();
      }, 1500);
    } else {
      alert("Invalid OTP. Try 123456");
    }
  };

  if (otpSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-6">
        <svg
          className="w-20 h-20 text-green-500 animate-bounce drop-shadow-lg"
          fill="none"
          strokeWidth={3}
          viewBox="0 0 24 24"
          style={{ filter: "drop-shadow(0 4px 12px rgba(34,197,94,0.4))" }}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          <path
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12l3 3 5-5"
          />
        </svg>
        <div className="text-green-600 font-bold text-xl">OTP Verified!</div>
      </div>
    );
  }

  if (step === "login") {
    return (
      <form className="space-y-4" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
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
  }

  // OTP Step
  return (
    <form
      onSubmit={handleOtpSubmit}
      className="flex flex-col items-center space-y-5"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
      <div
        className="flex items-center gap-2.5 justify-center"
        id="otp-container"
      >
        {[...Array(6)].map((_, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={1}
            className="w-12 h-12 font-semibold outline-none text-xl text-gray-700 text-center border rounded-md transition-all border-gray-300 focus:border-blue-500 bg-transparent"
            value={otp[idx] || ""}
            onChange={(e) => handleOtpChange(e, idx)}
            onKeyDown={(e) => handleOtpKeyDown(e, idx)}
            id={`otp-input-${idx}`}
            autoFocus={idx === 0}
            inputMode="numeric"
          />
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-gray-800 mt-4"
      >
        Verify OTP
      </button>
    </form>
  );
};

const AuthModal = ({
  isOpen,
  onClose,
  onAuthSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [otpSuccess, setOtpSuccess] = useState(false);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`${otpSuccess ? "bg-transparent shadow-none" : "bg-white rounded-lg"} shadow-lg p-8 w-full max-w-md relative`}>
    {!otpSuccess && (
         <button
          className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        )}
        {mode === "login" ? (
          <>
            <Login
              onLoginSuccess={onAuthSuccess}
              otpSuccess={otpSuccess}
              setOtpSuccess={setOtpSuccess}
            />
            {!otpSuccess && (
            <div className="bg-transparent">
              <p className="mt-4 text-center text-sm">
                New here?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setMode("register")}
                >
                  Create an account
                </button>
              </p>
              </div>
            )}
          </>
        ) : (
          <>
            <Register />
            {!otpSuccess && (
              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setMode("login")}
                >
                  Login
                </button>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
