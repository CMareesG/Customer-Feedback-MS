import { useState } from "react";
import { Settings, Bell, Moon, Sun, Shield, Save, Mail } from "lucide-react";

interface SettingsState {
  notifications: {
    email: boolean;
    push: boolean;
    feedback: boolean;
    updates: boolean;
  };
  theme: "dark" | "light";
  privacy: {
    showProfile: boolean;
    showActivity: boolean;
  };
}

const UserSettings = () => {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      push: true,
      feedback: true,
      updates: false,
    },
    theme: "dark",
    privacy: {
      showProfile: true,
      showActivity: true,
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleToggle = (category: keyof SettingsState, key: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] as object),
        [key]: !((prev[category] as Record<string, boolean>)[key]),
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage("Settings saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    }, 1000);
  };

  return (
    <div className="page-container max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Settings</h1>
        <p className="text-text-muted">Manage your account preferences and notifications</p>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-accent-1" size={24} />
          <h2 className="text-xl font-semibold text-text-primary">Notifications</h2>
        </div>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">Email Notifications</div>
                <div className="text-text-muted text-sm">Receive notifications via email</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("notifications", "email")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications.email ? "bg-accent-1" : "bg-white/20"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.notifications.email ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">Push Notifications</div>
                <div className="text-text-muted text-sm">Receive push notifications on your device</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("notifications", "push")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications.push ? "bg-accent-1" : "bg-white/20"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.notifications.push ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Feedback Notifications */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">Feedback Responses</div>
                <div className="text-text-muted text-sm">Get notified when you receive responses</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("notifications", "feedback")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications.feedback ? "bg-accent-1" : "bg-white/20"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.notifications.feedback ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Product Updates */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">Product Updates</div>
                <div className="text-text-muted text-sm">Receive updates about new products</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("notifications", "updates")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications.updates ? "bg-accent-1" : "bg-white/20"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.notifications.updates ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          {settings.theme === "dark" ? (
            <Moon className="text-accent-2" size={24} />
          ) : (
            <Sun className="text-yellow-400" size={24} />
          )}
          <h2 className="text-xl font-semibold text-text-primary">Appearance</h2>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <div className="text-text-primary">Dark Mode</div>
            <div className="text-text-muted text-sm">Switch between light and dark theme</div>
          </div>
          <button
            onClick={() =>
              setSettings((prev) => ({
                ...prev,
                theme: prev.theme === "dark" ? "light" : "dark",
              }))
            }
            className={`w-12 h-6 rounded-full transition-colors ${
              settings.theme === "dark" ? "bg-accent-1" : "bg-yellow-400"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.theme === "dark" ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-green-400" size={24} />
          <h2 className="text-xl font-semibold text-text-primary">Privacy</h2>
        </div>

        <div className="space-y-4">
          {/* Show Profile */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <div className="text-text-primary">Show Profile</div>
              <div className="text-text-muted text-sm">Allow others to view your profile</div>
            </div>
            <button
              onClick={() => handleToggle("privacy", "showProfile")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.privacy.showProfile ? "bg-accent-1" : "bg-white/20"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.privacy.showProfile ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Show Activity */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <div className="text-text-primary">Show Activity</div>
              <div className="text-text-muted text-sm">Display your recent activity publicly</div>
            </div>
            <button
              onClick={() => handleToggle("privacy", "showActivity")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.privacy.showActivity ? "bg-accent-1" : "bg-white/20"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.privacy.showActivity ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary flex items-center gap-2"
        >
          <Save size={18} />
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
        {saveMessage && (
          <span className="text-green-400 text-sm">{saveMessage}</span>
        )}
      </div>
    </div>
  );
};

export default UserSettings;

