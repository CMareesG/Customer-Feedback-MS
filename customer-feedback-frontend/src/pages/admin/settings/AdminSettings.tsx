import { useState } from "react";
import { Settings, Bell, Shield, Database, Mail, Globe, Save, Lock, Users } from "lucide-react";

interface SettingsState {
  notifications: {
    email: boolean;
    push: boolean;
    userRegistrations: boolean;
    newFeedback: boolean;
    systemAlerts: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: boolean;
    ipRestriction: boolean;
  };
  system: {
    maintenanceMode: boolean;
    publicRegistration: boolean;
    debugMode: boolean;
  };
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      push: true,
      userRegistrations: true,
      newFeedback: false,
      systemAlerts: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: true,
      ipRestriction: false,
    },
    system: {
      maintenanceMode: false,
      publicRegistration: true,
      debugMode: false,
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
        <h1 className="text-2xl font-bold text-text-primary mb-2">Admin Settings</h1>
        <p className="text-text-muted">Configure system preferences and administrative options</p>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-accent-1" size={24} />
          <h2 className="text-xl font-semibold text-text-primary">Notification Settings</h2>
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
              title={settings.notifications.email ? "Disable email notifications" : "Enable email notifications"}
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
                <div className="text-text-muted text-sm">Receive push notifications</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("notifications", "push")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications.push ? "bg-accent-1" : "bg-white/20"
              }`}
              title={settings.notifications.push ? "Disable push notifications" : "Enable push notifications"}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.notifications.push ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* User Registrations */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">New User Registrations</div>
                <div className="text-text-muted text-sm">Notify when new users register</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("notifications", "userRegistrations")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications.userRegistrations ? "bg-accent-1" : "bg-white/20"
              }`}
              title={settings.notifications.userRegistrations ? "Disable user registration notifications" : "Enable user registration notifications"}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.notifications.userRegistrations ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* New Feedback */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">New Feedback</div>
                <div className="text-text-muted text-sm">Notify when new feedback is submitted</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("notifications", "newFeedback")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications.newFeedback ? "bg-accent-1" : "bg-white/20"
              }`}
              title={settings.notifications.newFeedback ? "Disable new feedback notifications" : "Enable new feedback notifications"}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.notifications.newFeedback ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* System Alerts */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">System Alerts</div>
                <div className="text-text-muted text-sm">Receive system warnings and errors</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("notifications", "systemAlerts")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.notifications.systemAlerts ? "bg-accent-1" : "bg-white/20"
              }`}
              title={settings.notifications.systemAlerts ? "Disable system alerts" : "Enable system alerts"}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.notifications.systemAlerts ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-green-400" size={24} />
          <h2 className="text-xl font-semibold text-text-primary">Security Settings</h2>
        </div>

        <div className="space-y-4">
          {/* Two Factor */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">Two-Factor Authentication</div>
                <div className="text-text-muted text-sm">Require 2FA for all admin accounts</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("security", "twoFactor")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.security.twoFactor ? "bg-accent-1" : "bg-white/20"
              }`}
              title={settings.security.twoFactor ? "Disable two-factor authentication" : "Enable two-factor authentication"}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.security.twoFactor ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Session Timeout */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">Session Timeout</div>
                <div className="text-text-muted text-sm">Auto-logout after 30 minutes of inactivity</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("security", "sessionTimeout")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.security.sessionTimeout ? "bg-accent-1" : "bg-white/20"
              }`}
              title={settings.security.sessionTimeout ? "Disable session timeout" : "Enable session timeout"}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.security.sessionTimeout ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* IP Restriction */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">IP Restriction</div>
                <div className="text-text-muted text-sm">Restrict admin access to specific IPs</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("security", "ipRestriction")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.security.ipRestriction ? "bg-accent-1" : "bg-white/20"
              }`}
              title={settings.security.ipRestriction ? "Disable IP restriction" : "Enable IP restriction"}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.security.ipRestriction ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <Database className="text-accent-2" size={24} />
          <h2 className="text-xl font-semibold text-text-primary">System Settings</h2>
        </div>

        <div className="space-y-4">
          {/* Maintenance Mode */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">Maintenance Mode</div>
                <div className="text-text-muted text-sm">Put the site in maintenance mode</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("system", "maintenanceMode")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.system.maintenanceMode ? "bg-red-500" : "bg-white/20"
              }`}
              title={settings.system.maintenanceMode ? "Disable maintenance mode" : "Enable maintenance mode"}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.system.maintenanceMode ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Public Registration */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">Public Registration</div>
                <div className="text-text-muted text-sm">Allow new users to register</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("system", "publicRegistration")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.system.publicRegistration ? "bg-accent-1" : "bg-white/20"
              }`}
              title={settings.system.publicRegistration ? "Disable public registration" : "Enable public registration"}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.system.publicRegistration ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {/* Debug Mode */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-text-muted" />
              <div>
                <div className="text-text-primary">Debug Mode</div>
                <div className="text-text-muted text-sm">Enable detailed error messages</div>
              </div>
            </div>
            <button
              onClick={() => handleToggle("system", "debugMode")}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.system.debugMode ? "bg-accent-1" : "bg-white/20"
              }`}
              title={settings.system.debugMode ? "Disable debug mode" : "Enable debug mode"}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.system.debugMode ? "translate-x-6" : "translate-x-0.5"
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

export default AdminSettings;

