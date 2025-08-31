import React, { useState, useRef } from 'react'
import axios from 'axios'
import './Complaint.css'

const initialForm = {
  name: '',
  address: '',
  type: '', // <-- Correct default value
  description: ''
}

const Complaint = () => {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const nameRef = useRef(null)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.address || !form.type || !form.description) {
      alert('Please fill out all fields.')
      return
    }
    setSubmitting(true)
    try {
      const res = await axios.post('https://complaint-backend-62o0.onrender.com/add', form)
      console.log(res)
      if (res.data.message === 'Complaint saved') {
        setSubmitted(true)
      } else {
        setError('Unable to submit complaint. Please try again.')
      }
    } catch {
      setError('Unable to submit complaint. Please try again.')
    }
    setSubmitting(false)
  }

  const handleNewComplaint = () => {
    setForm(initialForm)
    setSubmitted(false)
    setError('')
    setTimeout(() => {
      nameRef.current && nameRef.current.focus()
    }, 100)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <div className="navbar" role="banner">
        <h1>Complaint Portal</h1>
        <a href="/admin" role="link" aria-label="Go to Dashboard">Go to Dashboard</a>
      </div>
      <main className="container" role="main">
        <h2>Register Complaint</h2>
        {!submitted ? (
          <>
            <form id="complaintForm" onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder=" "
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  ref={nameRef}
                />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder=" "
                  required
                  autoComplete="street-address"
                  value={form.address}
                  onChange={handleChange}
                />
                <label htmlFor="address">Your Address</label>
              </div>
              <div className="form-group">
                {form.type === '' && (
    <label htmlFor="type" style={{ marginBottom: 6, display: 'block', color: '#374151', fontWeight: 500 }}>
      Complaint Type
    </label>
  )}
                <select
                  id="type"
                  name="type"
                  required
                  value={form.type}
                  onChange={handleChange}
                  style={{
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    width: '100%',
                    border: '1.8px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '16px 14px',
                    background: 'white',
                    color: '#374151'
                  }}
                >
                  <option value="" disabled>Select Type</option>
                  <option value="B&R">B&amp;R</option>
                  <option value="E&M">E&amp;M</option>
                </select>
              </div>
              <div className="form-group">
                <textarea
                  id="description"
                  name="description"
                  placeholder=" "
                  required
                  value={form.description}
                  onChange={handleChange}
                />
                <label htmlFor="description">Complaint Details</label>
              </div>
              <button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="spinner"></span> Submitting...
                  </>
                ) : (
                  'Submit Complaint'
                )}
              </button>
            </form>
            {error && (
              <div style={{ color: '#dc2626', textAlign: 'center', marginTop: '18px', fontWeight: 'bold' }}>
                {error}
              </div>
            )}
          </>
        ) : (
          <section id="afterSubmit" className="visible">
            <p>✅ Your complaint has been submitted successfully!</p>
            <button type="button" onClick={handleNewComplaint}>
              Submit Another Complaint
            </button>
          </section>
        )}
      </main>
    </div>
  )
}

export default Complaint