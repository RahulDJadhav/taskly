import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import AddButton from './AddButton';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
  const API_BASE = 'http://localhost/taskly/taskly/backend/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsPasswordMatch(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    fetch(`${API_BASE}loginUser.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("userName", data.user.name);
          localStorage.setItem("userEmail", data.user.email);
          onLogin();
        } else {
          setError(data.message || 'Login failed');
        }
      })
      .catch(() => setError('Something went wrong.'));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      setError('Passwords do not match');
      return;
    } else {
      setIsPasswordMatch(true);
    }

    fetch(`${API_BASE}signupUser.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Signup successful. Please log in.');
          setIsSignup(false);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setName('');
          setError('');
        } else {
          setError(data.message || 'Signup failed');
        }
      })
      .catch(() => setError('Something went wrong.'));
  };

  const handleConfirmPasswordKeyUp = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsPasswordMatch(value === password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className="text-center">
          <img
            src="/xts_white.png"
            alt="Logo"
            style={{ width: 300, height: 100, marginBottom: 24 }}
          />
          <h1 className="display-5 fw-bold mb-3">Welcome to Taskly</h1>
          <p className="lead">Your ultimate task management solution.</p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <div className="text-center mb-4">
            <h3 className={styles.heading}>
              {isSignup ? 'Create Account' : 'Login'}
            </h3>
            <p className={styles.subText}>
              {isSignup
                ? 'Start your journey with Taskly'
                : 'Login to manage your tasks'}
            </p>
          </div>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <form
            onSubmit={isSignup ? handleSignup : handleLogin}
            className={styles.form}
          >
            {isSignup && (
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Username'
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
              />
            </div>

            {isSignup && (
              <div className="mb-3">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyUp={handleConfirmPasswordKeyUp}
                  className={
                    confirmPassword
                      ? isPasswordMatch
                        ? styles.match
                        : styles.mismatch
                      : ''
                  }
                  placeholder='Confirm Password'
                  required
                />
              </div>
            )}

            <AddButton
              type="submit"
              label={isSignup ? 'Sign Up' : 'Login'}
              className="btn w-100 py-2 fw-bold"
              style={{
                backgroundColor: '#4d46e1',
                borderRadius: '8px',
                color: 'white',
              }}
            />

            <div className="text-center mt-3">
              <span
                onClick={() => setIsSignup(!isSignup)}
                className={styles.toggleLink}
              >
                {isSignup
                  ? 'Already have an account? Login'
                  : 'Create a new account'}
              </span>
            </div>

            {!isSignup && (
              <div className="text-center mt-2">
                <a
                  href="#"
                  className={styles.toggleLink}
                  onClick={(e) => e.preventDefault()}
                >
                  Forgot Password?
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
