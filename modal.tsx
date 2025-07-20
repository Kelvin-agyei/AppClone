import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <Text className="text-white text-4xl font-bold mb-10">CNTWK Login</Text>

      <View className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <Text className="text-lg font-semibold mb-2">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-3 mb-4"
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text className="text-lg font-semibold mb-2">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-3 mb-4"
          placeholder="Enter your password"
          secureTextEntry
        />

        <TouchableOpacity className="bg-indigo-600 py-3 rounded-xl mt-2">
          <Text className="text-center text-white font-bold text-lg">Login</Text>
        </TouchableOpacity>

        <View className="flex-row justify-between mt-4">
          <TouchableOpacity>
            <Text className="text-indigo-600 font-semibold">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-indigo-600 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
