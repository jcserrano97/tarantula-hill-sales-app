import React from 'react';
import './LeadsList.css';

const LeadsList = ({ leads, loading, onContactLead }) => {
  if (loading) {
    return (
      <div className="leads-loading">
        <div className="spinner"></div>
        <p>Searching for leads...</p>
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="no-leads">
        <p>No leads found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="leads-container">
      <h2>Found {leads.length} potential leads</h2>
      <div className="leads-grid">
        {leads.map(lead => (
          <div key={lead.id} className="lead-card">
            <div className="lead-header">
              <h3 className="lead-name">{lead.name}</h3>
              <span className={`lead-status status-${lead.status.toLowerCase()}`}>
                {lead.status}
              </span>
            </div>
            
            <div className="lead-details">
              <div className="lead-detail">
                <strong>Address:</strong>
                <span>{lead.address}</span>
              </div>
              
              {lead.phone && (
                <div className="lead-detail">
                  <strong>Phone:</strong>
                  <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                </div>
              )}
              
              {lead.email && (
                <div className="lead-detail">
                  <strong>Email:</strong>
                  <a href={`mailto:${lead.email}`}>{lead.email}</a>
                </div>
              )}
              
              {lead.website && (
                <div className="lead-detail">
                  <strong>Website:</strong>
                  <a href={lead.website} target="_blank" rel="noopener noreferrer">
                    {lead.website}
                  </a>
                </div>
              )}
              
              {lead.rating && (
                <div className="lead-detail">
                  <strong>Rating:</strong>
                  <span>{lead.rating}/5 ⭐</span>
                </div>
              )}
            </div>
            
            <div className="lead-actions">
              <button 
                className="contact-button"
                onClick={() => onContactLead(lead)}
              >
                Contact Lead
              </button>
              <button className="notes-button">
                Add Notes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsList;