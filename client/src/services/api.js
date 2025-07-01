// Temporary - use mock data for testing deployment
const API_BASE_URL = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:5000/api'
);

class ApiService {
  async searchLeads(zipCode, venueTypes) {
    // For now, return mock data to test deployment
    if (process.env.NODE_ENV === 'production') {
      return {
        success: true,
        results: [
          {
            id: '1',
            name: 'Sample Restaurant',
            address: '123 Main St, Sample City, ST 12345',
            phone: '(555) 123-4567',
            email: 'contact@sample.com',
            website: 'https://sample.com',
            rating: 4.5,
            status: 'New'
          },
          {
            id: '2', 
            name: 'Sample Bar & Grill',
            address: '456 Oak Ave, Sample City, ST 12345',
            phone: '(555) 987-6543',
            email: null,
            website: null,
            rating: 4.2,
            status: 'New'
          }
        ],
        count: 2
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
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