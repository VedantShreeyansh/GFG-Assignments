import { useState }from 'react'

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [step, setStep] = useState<'register' | 'otp'>('register');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');

   const validation = () => {
    if (!form.name.trim()) {
        alert("Name is required");
        return false;
    }
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        alert("Valid email is required");
        return false;
    }
    if (form.password.length < 6) {
    alert("Password must be at least 6 characters");
    return false;
    }
    if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return false;
   }
   return true;
}

function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
};

  // Registration handler

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validation()) {
      const res = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert("MOCK OTP send to your email! ");
        setEmail(form.email);
        setStep('otp');
        setOtp('');
      } else{
        alert(data.message || "Registration failed");
      }
    }
  };

     // OTP verification handler
     const handleOtpSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const res = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registration complete! OTP verified.");
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
        setOtp('');
        setStep('register');
      } else {
        alert(data.message || "OTP verification failed");
      }
     };


  return (
    <>
    {step === 'register' ? (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center justify-center">Create your Account</h2>
      <div className="mb-4">
       <label htmlFor="name" className="block mb-1 font-medium">Name</label>
       <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2"
       />
      </div>
      <div className="mb-4">
        <label htmlFor="Email" className="block mb-1 font-medium">Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" 
        />
      </div>
      <div className="mb-4">
        <label htmlFor="Password" className="block mb-1 font-medium">Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" 
        />   
      </div>
      <div className="mb-6">
        <label htmlFor="" className="block mb-1 font-medium">Confirm Password</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="w-full border rounded px-3 py-2"
        />   
      </div>
      <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-gray-800">
        Register
      </button>
    </form>
    ) : (
      <div className="flex flex-col items-center justify-center h-screen space-y-5">
        <h1 className="font-semibold text-3xl text-white pb-20">Submit</h1>
        <form onSubmit={handleOtpSubmit} className="flex flex-col items-center space-y-5">
          <div className="flex items-center gap-2.5 justify-center" id="otp-container">
            {[...Array(6)].map((_, idx) => (
              <input 
               key={idx}
               type="text"
               maxLength={1}
               className="w-16 h-16 font-semibold outline-none text-xl text-white text-center border rounded-md transition-all border-gray-300 focus:border-indigo-900 bg-transparent"
               value={otp[idx] || ""}
               onChange={e => {
                const val = e.target.value.replace(/[^0-9]/g, "");
                if (!val) return;
                const newOtp = otp.split("");
                newOtp[idx] = val;
                setOtp(newOtp.join(""));
                const next = document.getElementById(`otp-input-${idx + 1}`);
                if (next) (next as HTMLInputElement).focus();
               }}
               onKeyDown={e => {
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
               }}
               id={`otp-input-${idx}`}
               autoFocus={idx === 0}
               inputMode="numeric"
              />
            ))}
          </div>
          <button 
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-gray-800 mt-4">
              Verify OTP
            </button>
        </form>
      </div>
    )}
    </>
  );
}

export default Register