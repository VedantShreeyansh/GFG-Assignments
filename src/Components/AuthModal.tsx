import { useState } from "react";
import Register from "./Register";

const Login = () => (
    <form  className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4"> </h2>
            <input type="text" className="w-full border rounded px-3 py-2" placeholder="Email" required/>
            <input type="password" name="password" className="w-full border rounded px-3 py-2" placeholder="Password" required/>
            <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-gray-800">Login</button>
    </form>
);

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void}) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</button>
            {mode === "login" ?(
                <>
                  <Login />
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