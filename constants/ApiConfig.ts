// API Configuration
// For development, you'll need to replace 'localhost' with your computer's IP address
// To find your IP address:
// - Windows: Run 'ipconfig' in Command Prompt, look for IPv4 Address
// - Mac/Linux: Run 'ifconfig' in Terminal, look for inet address
// - Or use 'hostname -I' on Linux

// Replace 'YOUR_IP_ADDRESS' with your actual IP address
// Example: export const API_BASE_URL = 'http://192.168.1.100:8080';
export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  USERS: `${API_BASE_URL}/api/users`,
  LOGIN: `${API_BASE_URL}/api/users/login`,
  TEST: `${API_BASE_URL}/api/users/test`,
};