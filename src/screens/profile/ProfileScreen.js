import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../AuthContext";

const ProfileScreen = ({navigation}) => {
  const { user, profile, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await signOut();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={48} color="#3B82F6" />
          </View>
          <Text style={styles.username}>{profile?.username || "User"}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

       {/* Account Section */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Account</Text>

  <TouchableOpacity 
    style={styles.menuItem} 
    activeOpacity={0.7}
    onPress={() => navigation.navigate("EditPro")} // เพิ่มบรรทัดนี้
  >
    <View style={styles.menuIconContainer}>
      <MaterialIcons name="edit" size={20} color="#3B82F6" />
    </View>
    <View style={styles.menuContent}>
      <Text style={styles.menuText}>Edit Profile</Text>
      <Text style={styles.menuSubtext}>
        Update your personal information
      </Text>
    </View>
    <MaterialIcons name="chevron-right" size={20} color="#CED4DA" />
  </TouchableOpacity>
</View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconContainer}>
              <MaterialIcons name="attach-money" size={20} color="#10B981" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Currency</Text>
              <Text style={styles.menuSubtext}>USD ($)</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#CED4DA" />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconContainer}>
              <MaterialIcons name="help" size={20} color="#6C757D" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>Help Center</Text>
              <Text style={styles.menuSubtext}>FAQs and support</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#CED4DA" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuIconContainer}>
              <MaterialIcons name="info" size={20} color="#6C757D" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuText}>About</Text>
              <Text style={styles.menuSubtext}>Version 1.0.0</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#CED4DA" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <MaterialIcons name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

// Styles เดิมทั้งหมด (ไม่ต้องแก้ไข)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  scrollContent: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    padding: 32,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#3B82F615",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#3B82F630",
  },
  username: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  email: {
    fontSize: 15,
    color: "#6C757D",
    fontWeight: "500",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ADB5BD",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  menuSubtext: {
    fontSize: 13,
    color: "#6C757D",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 8,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF444415",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EF444430",
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
    letterSpacing: -0.1,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ProfileScreen;
