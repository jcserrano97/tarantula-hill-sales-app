// Real API service for Google Places integration
const API_BASE_URL = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:5000/api'
);

class ApiService {
  async searchLeads(zipCode, venueTypes) {
    // Temporary: Return mock data for now while we fix API deployment
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate loading
    return {
      success: true,
      results: [
        {
          id: '1',
          name: 'The Brewery District',
          address: '123 Main St, Beverly Hills, CA 90210',
          phone: '(555) 123-4567',
          email: 'info@brewerydistrict.com',
          website: 'https://brewerydistrict.com',
          rating: 4.5,
          status: 'New'
        },
        {
          id: '2', 
          name: 'Rodeo Grill & Bar',
          address: '456 Rodeo Dr, Beverly Hills, CA 90210',
          phone: '(555) 987-6543',
          email: null,
          website: 'https://rodeogrill.com',
          rating: 4.2,
          status: 'New'
        },
        {
          id: '3',
          name: 'Beverly Hills Hotel Restaurant',
          address: '9641 Sunset Blvd, Beverly Hills, CA 90210',
          phone: '(555) 456-7890',
          email: 'dining@bevhillshotel.com',
          website: null,
          rating: 4.8,
          status: 'New'
        }
      ],
      count: 3
    };

    try {
      const response = await fetch(`${API_BASE_URL}/search/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zipCode, venueTypes }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching leads:', error);
      throw error;
    }
  }

  async sendEmail(leadId, templateId, customMessage) {
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId, templateId, customMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async updateLeadStatus(leadId, status, notes) {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${leadId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, notes }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating lead status:', error);
      throw error;
    }
  }
}

const apiService = new ApiService();
export default apiService;