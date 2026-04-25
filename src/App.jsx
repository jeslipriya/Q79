import React, { useState } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [visitorLogs, setVisitorLogs] = useState([
    {
      id: 1,
      name: 'Alex Rivera',
      purpose: 'Package Pickup',
      host: 'Sarah Chen',
      time: '10:30 AM',
      phone: '9876543210',
      status: 'In'
    }
  ]);

  /*-----------------------JavaScript Logic-----------------------*/

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const phone = formData.get('phone');
    // Numeric validation for Phone Number
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit numeric phone number.");
      return;
    }

    const newVisitor = {
      id: Date.now(),
      name: formData.get('visitorName'),
      purpose: formData.get('purpose'),
      host: formData.get('host'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      phone: phone,
      status: 'In'
    };

    setVisitorLogs([...visitorLogs, newVisitor]);
    e.target.reset(); // Clear inputs after update
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setVisitorLogs(visitorLogs.map(log => 
      log.id === id ? { ...log, status: log.status === 'In' ? 'Out' : 'In' } : log
    ));
  };

  /*----------------------UI Rendering----------------------*/

  return (
    <div className='fullpart'>
      <header className="warehouse-header">
        <h1>Warehouse Log System</h1>
      </header>

      <div className="backgroundpart">
        <div className="button-area">
          <button onClick={() => setShowForm(true)} className='profilebutton'>
            Register New Visitor
          </button>
        </div>

        <div className="log-container">
          {visitorLogs.map((log) => (
            <div key={log.id} className={`contentcard ${log.status === 'Out' ? 'status-exit' : ''}`}>
              <div className="card-header">
                <span className={`status-indicator ${log.status === 'In' ? 'bg-green' : 'bg-red'}`}>
                  {log.status === 'In' ? 'Checked Entry' : 'Checked Exit'}
                </span>
                <h4 className="name">{log.name}</h4>
              </div>
              
              <div className="profile">
                <p><strong>Host:</strong> {log.host}</p>
                <p><strong>Purpose:</strong> {log.purpose}</p>
                <p><strong>Time:</strong> {log.time}</p>
                <p><strong>Phone:</strong> {log.phone}</p>
              </div>

              <div className="action-buttons">
                <button className="gate-pass-btn" onClick={() => window.print()}>Generate Gate Pass</button>
                <button className="status-toggle-btn" onClick={() => toggleStatus(log.id)}>
                  Mark {log.status === 'In' ? 'Exit' : 'Entry'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className='cancelbuttonarea'>
              <button type="button" className='close-x' onClick={() => setShowForm(false)}>×</button>
            </div>
            <h3 className='textclr'>Visitor Entry Form</h3>
            <form onSubmit={handleSubmit}>
              <label>Visitor Name</label>
              <input type="text" name="visitorName" placeholder="Full Name" required />
              
              <label>Purpose of Visit</label>
              <input type="text" name="purpose" placeholder="e.g. Package Delivery" required />
              
              <label>Person to Meet (Host)</label>
              <input type="text" name="host" placeholder="Staff Name" required />
              
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="10-digit number" pattern="[0-9]{10}" required />
              
              <button type="submit" className='submitbtn'>Register Entry</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;