
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Table, 
  PiggyBank, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Recommendations', href: '/recommendations', icon: FileText },
  { name: 'Bet Tracker', href: '/tracker', icon: Table },
  { name: 'Bankroll', href: '/bankroll', icon: PiggyBank },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-900 w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg mr-3"></div>
        <h1 className="text-white font-bold text-lg">PrizePicks AI</h1>
      </div>
      
      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
