import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import LeadsList from './components/LeadsList';
import ApiService from './services/api';
import './App.css';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await ApiService.searchLeads(
        searchParams.zipCode, 
        searchParams.venueTypes
      );
      
      if (response.success) {
        setLeads(response.results);
      } else {
        setError('Search failed. Please try again.');
      }
    } catch (error) {
      setError('Error searching for leads. Please check your connection and try again.');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactLead = (lead) => {
    // TODO: Implement email modal
    console.log('Contacting lead:', lead);
    alert(`Contact feature coming soon! Lead: ${lead.name}`);
  };

  return (
    <div className="App">
      <main className="main-content">
        <SearchForm onSearch={handleSearch} loading={loading} />
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        <LeadsList 
          leads={leads}
          loading={loading}
          onContactLead={handleContactLead}
        />
      </main>
    </div>
  );
}

export default App;
