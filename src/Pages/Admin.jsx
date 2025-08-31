import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const initialForm = {
  username: '',
  password: ''
}

const Admin = () => {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await axios.post(
        'https://complaint-backend-62o0.onrender.com/login',
        form,
        { withCredentials: true } // <-- This enables cookie saving
      )
      if (res.data?.success === true) {
        localStorage.setItem('isAdminLoggedIn', 'true')
        navigate('/dashboard')
      } else {
        setError('Invalid username or password.')
      }
    } catch {
      setError('Unable to login. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form
        style={{
          background: 'white',
          padding: '32px 36px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          minWidth: '320px'
        }}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2 style={{ textAlign: 'center', marginBottom: '28px', fontWeight: 700 }}>Admin Login</h2>
        <div style={{ marginBottom: '22px' }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={form.username}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1.5px solid #d1d5db',
              fontSize: '1rem'
            }}
          />
        </div>
        <div style={{ marginBottom: '22px' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1.5px solid #d1d5db',
              fontSize: '1rem'
            }}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          style={{
            background: '#2563eb',
            color: 'white',
            fontWeight: 600,
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '8px',
            padding: '13px',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>
        {error && (
          <div style={{ color: '#dc2626', textAlign: 'center', marginTop: '18px', fontWeight: 'bold' }}>
            {error}
          </div>
        )}
      </form>
    </div>
  )
}

export default Admin