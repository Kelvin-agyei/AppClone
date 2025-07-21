// API Configuration
// IMPORTANT: Replace 'localhost' with your computer's actual IP address for mobile testing
// To find your IP address:
// - Windows: Run 'ipconfig' in Command Prompt, look for IPv4 Address under your network adapter
// - Mac: Run 'ifconfig | grep "inet " | grep -v 127.0.0.1' in Terminal
// - Linux: Run 'hostname -I' in Terminal

// For development on the same machine (web browser), use localhost
// For mobile testing, replace with your actual IP address
export const API_BASE_URL = __DEV__ 
  ? 'http://10.0.2.2:8080'  // This works for Android emulator, for real device use your IP
  : 'http://localhost:8080';

export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/api/users`,
  SIGNUP: `${API_BASE_URL}/api/users/signup`,
  LOGIN: `${API_BASE_URL}/api/users/login`,
  TEST: `${API_BASE_URL}/api/users/test`,
};

// Helper function to test backend connectivity
export const testBackendConnection = async () => {
  try {
    console.log('Testing connection to:', API_ENDPOINTS.TEST);
    const response = await fetch(API_ENDPOINTS.TEST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Backend connection successful:', result);
    return result;
  } catch (error) {
    console.error('Backend connection test failed:', error);
    throw error;
  }
};

// Get the correct API URL based on platform
export const getApiUrl = () => {
  // For web development
  if (typeof window !== 'undefined') {
    return 'http://localhost:8080';
  }
  
  // For mobile - you need to replace this with your actual IP address
  // Find your IP: Windows (ipconfig), Mac/Linux (ifconfig)
  return 'http://192.168.1.100:8080'; // REPLACE WITH YOUR ACTUAL IP ADDRESS
};