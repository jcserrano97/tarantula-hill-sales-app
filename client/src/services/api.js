// Real API service for Google Places integration
const API_BASE_URL = process.env.REACT_APP_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:5000/api'
);

class ApiService {
  async searchLeads(zipCode, venueTypes) {

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