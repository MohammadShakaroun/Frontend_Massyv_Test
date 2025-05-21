import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState(null);

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        username, password
      });
      localStorage.setItem('token', data.token);
      const profileRes = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      setProfile(profileRes.data.user);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h1>
  
      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
  
      <input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
  
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300"
      >
        Login
      </button>
  
      {profile && (
        <pre className="mt-6 bg-gray-100 p-4 rounded-md text-sm text-gray-700 overflow-x-auto">
          {JSON.stringify(profile, null, 2)}
        </pre>
      )}
    </div>
  </div>
  
  );
}
