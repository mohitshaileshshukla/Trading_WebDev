import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart4, 
  PieChart, 
  ListOrdered,
  Settings,
  LogOut 
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const location = useLocation();
  const logout = useAuthStore(state => state.logout);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { 
      path: '/dashboard', 
      name: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      path: '/screener', 
      name: 'Stock Screener', 
      icon: <BarChart4 className="w-5 h-5" /> 
    },
    { 
      path: '/portfolio', 
      name: 'Portfolio', 
      icon: <PieChart className="w-5 h-5" /> 
    },
    { 
      path: '/transactions', 
      name: 'Transactions', 
      icon: <ListOrdered className="w-5 h-5" /> 
    },
    { 
      path: '/settings', 
      name: 'Settings', 
      icon: <Settings className="w-5 h-5" /> 
    },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-64 p-4">
      <div className="flex items-center mb-8 px-2">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          ProfNITT Task
        </Link>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <ThemeToggle />
        </div>
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;