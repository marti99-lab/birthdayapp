import React, { useState } from 'react';

function Login() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('backend/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, dob }),
    });
    const data = await response.json();
    if (data.success) {
      // Handle successful login
    } else {
      // Handle login error
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Date of Birth</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
