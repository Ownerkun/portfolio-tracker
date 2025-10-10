//เหลือแค่ปุ่มSAVE ใส่รูปและข้อมูลได้แล้ว แล้วก็เหลือแค่ไปอัปในSupabase

// screens/profile/EditProfileScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from "../../AuthContext";
import { supabase } from "../../services/supabase/supabase";

const EditProfileScreen = ({ navigation }) => {
  const { user, profile, updateProfile } = useAuth();
  
  // State for user data
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    avatar_url: "",
    birth_date: "",
    job_title: "",
    income: "",
  });

  // State for UI management
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Load profile data when component mounts
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        full_name: profile.full_name || "",
        avatar_url: profile.avatar_url || "",
        birth_date: profile.birth_date || "",
        job_title: profile.job_title || "",
        income: profile.income ? profile.income.toString() : "",
      });

      // Set birth date if available
      if (profile.birth_date) {
        setSelectedDate(new Date(profile.birth_date));
      }
    }
  }, [profile]);

  // Function to pick image from gallery
  const pickImage = async () => {
    try {
      // Request gallery permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'App needs access to your photo library to change profile picture');
        return;
      }

      // Open image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        await uploadAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  // Function to upload image to Supabase Storage
  const uploadAvatar = async (uri) => {
    try {
      setUploading(true);

      // Convert image to blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Generate unique file name
      const fileExt = uri.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update state with new URL
      setFormData(prev => ({
        ...prev,
        avatar_url: publicUrl
      }));

      Alert.alert('Success', 'Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      Alert.alert('Error', 'Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  // Function to remove profile picture
  const removeAvatar = async () => {
    try {
      setUploading(true);
      
      setFormData(prev => ({
        ...prev,
        avatar_url: ""
      }));

      Alert.alert('Success', 'Profile picture removed successfully');
    } catch (error) {
      console.error('Error removing avatar:', error);
      Alert.alert('Error', 'Failed to remove profile picture');
    } finally {
      setUploading(false);
    }
  };

  // Function to handle date change
  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    
    if (date) {
      setSelectedDate(date);
      const formattedDate = date.toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        birth_date: formattedDate
      }));
    }
  };

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to save data
  const handleSave = async () => {
    // Validate that username is not empty
    if (!formData.username.trim()) {
      Alert.alert("Error", "Please enter your username");
      return;
    }

    // Convert income to number
    const incomeValue = formData.income ? parseFloat(formData.income) : null;

    try {
      setLoading(true);
      
      // Update data in database
      const { error } = await updateProfile({
        username: formData.username.trim(),
        full_name: formData.full_name.trim(),
        avatar_url: formData.avatar_url,
        birth_date: formData.birth_date,
        job_title: formData.job_title.trim(),
        income: incomeValue,
      });

      if (error) throw error;

      Alert.alert("Success", "Profile updated successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Update profile error:", error);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Function to format income numbers
  const formatIncome = (value) => {
    // Remove commas before calculation
    const cleanValue = value.replace(/,/g, '');
    
    if (cleanValue === '') return '';
    
    // Convert to number and format with commas
    const number = parseFloat(cleanValue);
    if (isNaN(number)) return value;
    
    return number.toLocaleString('en-US');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#6200EA" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {formData.avatar_url ? (
              <Image source={{ uri: formData.avatar_url }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <MaterialIcons name="person" size={48} color="#3B82F6" />
              </View>
            )}
            
            {uploading && (
              <View style={styles.avatarOverlay}>
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            )}
          </View>

          <View style={styles.avatarButtons}>
            <TouchableOpacity 
              style={styles.avatarButton} 
              onPress={pickImage}
              disabled={uploading}
            >
              <MaterialIcons name="photo-camera" size={20} color="#3B82F6" />
              <Text style={styles.avatarButtonText}>
                {formData.avatar_url ? "Change Photo" : "Add Photo"}
              </Text>
            </TouchableOpacity>
            
            {formData.avatar_url && (
              <TouchableOpacity 
                style={[styles.avatarButton, styles.removeButton]} 
                onPress={removeAvatar}
                disabled={uploading}
              >
                <MaterialIcons name="delete" size={20} color="#EF4444" />
                <Text style={[styles.avatarButtonText, styles.removeButtonText]}>
                  Remove
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username *</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              placeholder="Enter your username"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={formData.full_name}
              onChangeText={(value) => handleInputChange('full_name', value)}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Birth Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birth Date</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={formData.birth_date ? styles.dateText : styles.placeholderText}>
                {formData.birth_date || "Select birth date"}
              </Text>
              <MaterialIcons name="calendar-today" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Job Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Job Title</Text>
            <TextInput
              style={styles.input}
              value={formData.job_title}
              onChangeText={(value) => handleInputChange('job_title', value)}
              placeholder="Enter your job title"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Income */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monthly Income (THB)</Text>
            <TextInput
              style={styles.input}
              value={formData.income}
              onChangeText={(value) => handleInputChange('income', value.replace(/,/g, ''))}
              placeholder="0"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
            {formData.income && (
              <Text style={styles.incomeFormatted}>
                {formatIncome(formData.income)} THB
              </Text>
            )}
          </View>

          {/* Email (read-only) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.emailContainer}>
              <Text style={styles.emailText}>{user?.email}</Text>
              <Text style={styles.emailNote}>Email cannot be changed</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerHeader}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.datePickerCancel}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.datePickerTitle}>Select Birth Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.datePickerConfirm}>Done</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: "#6200EA",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    flex: 1,
  },
  avatarSection: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#3B82F615",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3B82F630",
  },
  avatarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarButtons: {
    flexDirection: "row",
    gap: 12,
  },
  avatarButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  removeButton: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  avatarButtonText: {
    marginLeft: 6,
    color: "#3B82F6",
    fontWeight: "500",
  },
  removeButtonText: {
    color: "#EF4444",
  },
  formSection: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#1F2937",
  },
  placeholderText: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  incomeFormatted: {
    fontSize: 14,
    color: "#10B981",
    fontWeight: "500",
    marginTop: 4,
  },
  emailContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9FAFB",
  },
  emailText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  emailNote: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  datePickerContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  datePickerCancel: {
    fontSize: 16,
    color: "#6B7280",
  },
  datePickerConfirm: {
    fontSize: 16,
    color: "#6200EA",
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default EditProfileScreen;