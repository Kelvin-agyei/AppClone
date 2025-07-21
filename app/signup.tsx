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
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function SignupScreen() {
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    setError('');
    setLoading(true);

    if (!signupName || !signupEmail || !signupPassword || !signupConfirm) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (signupPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            name: signupName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        Alert.alert(
          'Success!',
          'Account created successfully! You can now log in.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/login'),
            },
          ]
        );
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    router.replace('/login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.outerContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create Account</Text>
          
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={signupName}
            onChangeText={setSignupName}
            autoCapitalize="words"
            editable={!loading}
          />
          
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={signupEmail}
            onChangeText={setSignupEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            editable={!loading}
          />
          
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Create a password (min 6 characters)"
              value={signupPassword}
              onChangeText={setSignupPassword}
              secureTextEntry={!showSignupPassword}
              textContentType="newPassword"
              editable={!loading}
            />
            <Pressable
              onPress={() => setShowSignupPassword((v) => !v)}
              style={({ pressed }) => [styles.eyeButton, pressed && { opacity: 0.6 }]}
              disabled={loading}
            >
              <Text style={{ color: '#8000ff', fontWeight: 'bold' }}>
                {showSignupPassword ? '🙈' : '👁️'}
              </Text>
            </Pressable>
          </View>
          
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Confirm your password"
              value={signupConfirm}
              onChangeText={setSignupConfirm}
              secureTextEntry={!showSignupConfirm}
              textContentType="newPassword"
              editable={!loading}
            />
            <Pressable
              onPress={() => setShowSignupConfirm((v) => !v)}
              style={({ pressed }) => [styles.eyeButton, pressed && { opacity: 0.6 }]}
              disabled={loading}
            >
              <Text style={{ color: '#8000ff', fontWeight: 'bold' }}>
                {showSignupConfirm ? '🙈' : '👁️'}
              </Text>
            </Pressable>
          </View>
          
          <TouchableOpacity
            style={[
              styles.signupButton,
              loading && styles.buttonDisabled
            ]}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.signupButtonText}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TouchableOpacity 
            onPress={goToLogin} 
            style={styles.switchAuthButton}
            disabled={loading}
          >
            <Text style={styles.switchAuthText}>
              Already have an account? <Text style={styles.linkText}>Log In</Text>
            </Text>
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
  signupButton: {
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
  signupButtonText: {
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
});