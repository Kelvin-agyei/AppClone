import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { API_ENDPOINTS } from '@/constants/ApiConfig';

export default function LoginScreen() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    if (!loginEmail || !loginPassword) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed. Please try again.');
        setLoading(false);
        return;
      }

      if (data.success) {
        // Successfully logged in
        console.log('Login successful:', data.user);
        router.replace('/(tabs)/home');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    router.replace('/signup');
  };

  const continueAsGuest = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.outerContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Log In</Text>
          
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={loginEmail}
            onChangeText={setLoginEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="username"
            editable={!loading}
          />
          
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter your password"
              value={loginPassword}
              onChangeText={setLoginPassword}
              secureTextEntry={!showLoginPassword}
              textContentType="password"
              editable={!loading}
            />
            <Pressable
              onPress={() => setShowLoginPassword((v) => !v)}
              style={styles.eyeButton}
              disabled={loading}
            >
              <Text style={{ color: '#8000ff', fontWeight: 'bold' }}>
                {showLoginPassword ? '🙈' : '👁️'}
              </Text>
            </Pressable>
          </View>
          
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.loginButton,
              loading && styles.buttonDisabled
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Logging In...' : 'Log In'}
            </Text>
          </TouchableOpacity>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TouchableOpacity 
            onPress={goToSignup} 
            style={styles.switchAuthButton}
            disabled={loading}
          >
            <Text style={styles.switchAuthText}>
              Don't have an account? <Text style={styles.linkText}>Create Account</Text>
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.guestButton}
            onPress={continueAsGuest}
            disabled={loading}
          >
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6fa',
    paddingVertical: 32,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    margin: 8,
    shadowColor: '#8000ff22',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
    minWidth: 320,
    maxWidth: 400,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#8000ff',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1b3ff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  eyeButton: {
    marginLeft: 8,
    padding: 4,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#8000ff',
    fontWeight: '600',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#8000ff',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    shadowColor: '#8000ff',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  switchAuthButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchAuthText: {
    color: '#555',
    fontSize: 15,
  },
  linkText: {
    color: '#8000ff',
    fontWeight: 'bold',
  },
  guestButton: {
    marginTop: 16,
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingVertical: 12,
    borderRadius: 12,
  },
  guestButtonText: {
    color: '#8000ff',
    fontWeight: '700',
    fontSize: 16,
  },
});