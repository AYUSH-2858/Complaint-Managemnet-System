import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FILTERS = ['ALL', 'B&R', 'E&M']

const Dashboard = () => {
  const navigate = useNavigate()
  const [complaints, setComplaints] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const tableRef = useRef(null)

  useEffect(() => {
    if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
      navigate('/admin')
      return
    }
    const fetchComplaints = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await axios.get(
          'https://complaint-backend-62o0.onrender.com/fetch',
          { withCredentials: true }
        )
        setComplaints(res.data.complaints || [])
      } catch {
        setError('Unable to fetch complaints.')
      }
      setLoading(false)
    }
    fetchComplaints()
  }, [navigate])

  const filteredComplaints = complaints.filter(c =>
    filter === 'ALL' ? true : c.type === filter
  )

  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML
    const win = window.open('', '', 'height=700,width=900')
    win.document.write(`
      <html>
        <head>
          <title>Complaints Table</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f3f4f6; }
            table { width: 100%; border-collapse: collapse; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); margin: 0 auto; }
            th, td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
            th { background: #2563eb; color: white; font-weight: 700; }
            tr:last-child td { border-bottom: none; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `)
    win.document.close()
    win.focus()
    win.print()
    win.close()
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '0',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        background: '#2563eb',
        color: 'white',
        padding: '24px 0 16px 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        borderBottomLeftRadius: '18px',
        borderBottomRightRadius: '18px',
        marginBottom: '32px'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '2rem',
          letterSpacing: '0.03em',
          margin: 0
        }}>Arjangarh Complaints Dashboard</h2>
      </div>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '18px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        padding: '32px 24px 24px 24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '18px',
        }}>
          <div 
            style={{ display:'flex', alignItems:'center', marginBottom:'8px' }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  marginRight: '10px',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  border: f === filter ? '2px solid #2563eb' : '1.5px solid #d1d5db',
                  background: f === filter ? '#2563eb' : '#f3f4f6',
                  color: f === filter ? '#fff' : '#2563eb',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: f === filter ? '0 2px 8px rgba(37,99,235,0.10)' : 'none',
                  transition: 'all 0.2s',
                  display:'inline-block'
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                background: '#059669',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                width: 'fit-content',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(5,150,105,0.10)',
                transition: 'background 0.2s'
              }}
            >
              🖨️ Print Table
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('isAdminLoggedIn')
                navigate('/admin')
              }}
              style={{
                background: '#dc2626',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                width: 'fit-content',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(220,38,38,0.10)',
                transition: 'background 0.2s'
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '1.2rem', color: '#2563eb' }}>Loading...</div>
        ) : error ? (
          <div style={{ color: '#dc2626', textAlign: 'center', fontWeight: 'bold', marginTop: '40px' }}>{error}</div>
        ) : (
          <div ref={tableRef} style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              margin: '0 auto'
            }}>
              <thead>
                <tr style={{ background: '#2563eb', color: 'white', position: 'sticky', top: 0 }}>
                  <th style={{ padding: '12px', fontWeight: 700 }}>Name</th>
                  <th style={{ padding: '12px', fontWeight: 700 }}>Address</th>
                  <th style={{ padding: '12px', fontWeight: 700 }}>Description</th>
                  <th style={{ padding: '12px', fontWeight: 700 }}>Date &amp; Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                      No complaints found.
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map(c => (
                    <tr key={c._id} style={{
                      borderBottom: '1px solid #e5e7eb',
                      transition: 'background 0.2s'
                    }}>
                      <td style={{ padding: '10px 12px' }}>{c.name}</td>
                      <td style={{ padding: '10px 12px' }}>{c.address}</td>
                      <td style={{
                        padding: '10px 12px',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-line',
                        maxWidth: '320px'
                      }}>
                        {c.description}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {new Date(c.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard