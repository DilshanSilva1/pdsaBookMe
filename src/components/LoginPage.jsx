import { useState } from 'react';
import { USERS } from '../data/hotels';

function LoginPage({ onLogin }) {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  
  const handleLogin = () => {
    const { username, password } = loginForm;
    const user = USERS[username];
    if (user && user.password === password) {
      onLogin(username, user.role, user.hotel);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container fade-in">
        <h1 className="login-logo">bookMe</h1>
        <p className="login-subtitle">Hotel Reservation System</p>
        <div className="login-form">
          <input type="text" placeholder="Username" value={loginForm.username}
            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()} />
          <input type="password" placeholder="Password" value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()} />
          <button onClick={handleLogin} className="login-button">Login</button>
          <div className="login-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>User: <code>user</code> / <code>user123</code></p>
            <p>Admin: <code>admin</code> / <code>admin123</code></p>
            <p>Hotel Admin: <code>admin-grandplaza</code> / <code>grand123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
