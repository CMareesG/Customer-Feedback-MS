import { useState, useEffect } from "react";
import { User, Mail, Shield, Camera, Save } from "lucide-react";

import { getUser } from "../../../services/userService";

interface UserData {
  name: string;
  email: string;
  role: string;
}

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    role: "",
  });

  const [formData, setFormData] = useState<UserData>(userData);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await getUser();
        setUserData(u);
        setFormData(u);
      } catch (err) {
        console.error("failed to load user:", err);
      }
    };

    fetchUser();
  }, []);

  
  // if (!userData.name) {
  //   return <div className="page-container max-w-4xl mx-auto">Loading profile...</div>;
  // }

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserData(formData);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  return (
    <div className="page-container max-w-4xl mx-auto space-y-8">
  
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">My Profile</h1>
        <p className="text-text-muted">Manage your account information and preferences</p>
      </div>
      <div className="card">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-1 to-accent-2 flex items-center justify-center text-4xl font-bold text-white">
                {userData.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-accent-1 rounded-full flex items-center justify-center text-white hover:bg-accent-1/80 transition">
                <Camera size={18} />
              </button>
            </div>
            <span className="mt-3 text-text-muted text-sm">Click to change photo</span>
          </div>
          <div className="flex-1 w-full">
            <div className="space-y-6">
              <div>
                <label className="block text-text-muted text-sm mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <User size={20} className="text-accent-1" />
                    <span className="text-text-primary">{userData.name}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-text-muted text-sm mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Mail size={20} className="text-accent-2" />
                    <span className="text-text-primary">{userData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-text-muted text-sm mb-2">Account Type</label>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Shield size={20} className="text-green-400" />
                  <span className="text-text-primary">{userData.role}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Save size={18} />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg border border-white/20 text-text-muted hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent-1">12</div>
          <div className="text-text-muted text-sm mt-1">Feedback Given</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-accent-2">8</div>
          <div className="text-text-muted text-sm mt-1">Products Reviewed</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-400">5</div>
          <div className="text-text-muted text-sm mt-1">Responses Received</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

