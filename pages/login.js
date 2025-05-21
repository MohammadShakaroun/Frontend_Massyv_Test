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
    <div>
      <h1>Login</h1>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
    </div>
  );
}
