import { useState }from 'react'

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  
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
        localStorage.setItem(
          form.email,
          JSON.stringify({ password: form.password, name: form.name})
        );
       alert("Registration successful! ");
       setForm({ name: "", email: "", password: "", confirmPassword: ""});
      } else {
        alert(data.message || "Registration failed");
      }
    }
  };

     // OTP verification handler
    //  const handleOtpSubmit = async (event: React.FormEvent) => {
    //   event.preventDefault();
    //   const res = await fetch('http://localhost:5000/api/verify-otp', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, otp }),
    //   });
    //   const data = await res.json();
    //   if (res.ok) {
    //     alert("Registration complete! OTP verified.");
    //     setForm({ name: "", email: "", password: "", confirmPassword: "" });
    //     setOtp('');
    //     setStep('register');
    //   } else {
    //     alert(data.message || "OTP verification failed");
    //   }
    //  };


  return (
    <>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow ">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center justify-center">Create your Account</h2>
      <div className="mb-2">
       <label htmlFor="name" className="block mb-1 font-medium">Name</label>
       <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2"
       />
      </div>
      <div className="mb-2">
        <label htmlFor="Email" className="block mb-1 font-medium">Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-3 py-2" 
        />
      </div>
      <div className="mb-2">
        <label htmlFor="Password" className="block mb-1 font-medium">Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border rounded px-3 py-2" 
        />   
      </div>
      <div className="mb-4">
        <label htmlFor="" className="block mb-1 font-medium">Confirm Password</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="w-full border rounded px-3 py-2"
        />   
      </div>
      <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-gray-800">
        Register
      </button>
    </form>
    </>
  );
}

export default Register