import { useState, useEffect } from "react";
import { User, Mail, Shield, Camera, Save, Users, ShoppingBag, BarChart3 } from "lucide-react";

import { getUser } from "../../../services/userService";

interface AdminData {
  name: string;
  email: string;
  role: string;
}

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>({
    name: "",
    email: "",
    role: "",
  });

  const [formData, setFormData] = useState<AdminData>(adminData);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const u = await getUser();
          setAdminData(u);
          setFormData(u);
        } catch (err) {
          console.error("failed to load user:", err);
        }
      };
  
      fetchUser();
    }, []);

  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setAdminData(formData);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(adminData);
    setIsEditing(false);
  };

  return (
    <div className="page-container max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Admin Profile</h1>
        <p className="text-text-muted">Manage your administrator account and preferences</p>
      </div>

      <div className="bg-gradient-to-r from-accent-1 to-accent-2 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3">
          <Shield size={28} />
          <div>
            <h2 className="text-lg font-semibold">Administrator Account</h2>
            <p className="text-white/80 text-sm">You have full access to all admin features</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-1 to-accent-2 flex items-center justify-center text-4xl font-bold text-white">
                {adminData.name.charAt(0).toUpperCase()}
              </div>
              <button 
                className="absolute bottom-0 right-0 w-10 h-10 bg-accent-1 rounded-full flex items-center justify-center text-white hover:bg-accent-1/80 transition"
                title="Change profile photo"
              >
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
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <User size={20} className="text-accent-1" />
                    <span className="text-text-primary">{adminData.name}</span>
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
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Mail size={20} className="text-accent-2" />
                    <span className="text-text-primary">{adminData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-text-muted text-sm mb-2">Account Type</label>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Shield size={20} className="text-green-400" />
                  <span className="text-text-primary">{adminData.role}</span>
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
        <div className="card flex items-center gap-4">
          <div className="w-14 h-14 bg-accent-1/20 rounded-xl flex items-center justify-center">
            <Users className="text-accent-1" size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary">156</div>
            <div className="text-text-muted text-sm">Total Users</div>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-14 h-14 bg-accent-2/20 rounded-xl flex items-center justify-center">
            <ShoppingBag className="text-accent-2" size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary">42</div>
            <div className="text-text-muted text-sm">Products</div>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-14 h-14 bg-green-400/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="text-green-400" size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary">1.2K</div>
            <div className="text-text-muted text-sm">Total Feedback</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition text-left">
            <div className="text-text-primary font-medium">Manage Users</div>
            <div className="text-text-muted text-sm">View and manage user accounts</div>
          </button>
          <button className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition text-left">
            <div className="text-text-primary font-medium">View Reports</div>
            <div className="text-text-muted text-sm">Access analytics and reports</div>
          </button>
          <button className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition text-left">
            <div className="text-text-primary font-medium">System Settings</div>
            <div className="text-text-muted text-sm">Configure system preferences</div>
          </button>
          <button className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition text-left">
            <div className="text-text-primary font-medium">Audit Logs</div>
            <div className="text-text-muted text-sm">View activity and changes</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

