import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/shared/Card';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import ThemeToggle from '../components/shared/ThemeToggle';
import { User, Bell, Shield, Trash } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Settings: React.FC = () => {
  const { user } = useAuthStore();
  
  if (!user) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Full Name"
                value={user.name}
                leftIcon={<User className="h-4 w-4" />}
                fullWidth
              />
              
              <Input
                label="Email Address"
                value={user.email}
                disabled
                fullWidth
              />
              
              <div className="pt-2">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Shield className="h-4 w-4" />}
                fullWidth
              />
              
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                fullWidth
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                fullWidth
              />
              
              <div className="pt-2">
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme
                </p>
                <ThemeToggle />
              </div>
              
              <div className="pt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notifications
                </p>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Email notifications
                  </span>
                </label>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="text-red-600 dark:text-red-400">
              <CardTitle>Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="danger"
                leftIcon={<Trash className="h-4 w-4" />}
              >
                Delete Account
              </Button>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;