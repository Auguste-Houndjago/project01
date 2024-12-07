'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Activity, 
  TrendingUp, 
  BarChart2, 
  Wallet, 
  Bell,
  Plus,
  ChevronDown,
  Menu,
  Home,
  Users,
  Trophy,
  Calendar,
  ClipboardList,
  Settings,
  BaggageClaimIcon,
  BadgeAlert,
  Icon,
  User
} from 'lucide-react';
import { Badge } from '../ui/badge';

type SidebarProps = {
  userName?: string;
  userRole?: string;
  userImage?: string;
};

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  subItems?: { label: string; href: string; }[];
};

const Sidebar = ({ userName = "Manager Name" , userRole = "Manager", userImage = "/admin.png" }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>("Dashboard");
  const pathname = usePathname();

  const navigationItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      href: "#",
      subItems: [
        { label: "players", href: "/manager/dashboard/players" },
        { label: "Statistics", href: "/manager/dashboard/statistics" },
      ]
    },
    {
      label: "Players",
      icon: <Users/>,
      href: "/players",
    },
    {
      label: "Matches",
      icon: <Trophy/>,
      href: "/matches",
    },
    {
      label: "teams",
      icon: <Trophy/>,
      href: "/teams",
    },
    {
      label: "Training",
      icon: <Calendar />,
      href: "/training",
    },
    {
      label: "Statistics",
      icon: <Activity />,
      href: "/statistics",
    },
    {
      label: "Contracts",
      icon: <ClipboardList />,
      href: "/contracts",
    },
    {
      label: "Settings",
      icon: <Settings/>,
      href: "/settings",
    },
   
    {
      label: "Finance",
      icon: <Wallet className="w-5 h-5" />,
      href: "/finance",
    },
    {
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      href: "/notifications",
    }
  ];

  return (
    <div className="flex flex-col h-full z-20 rounded-md ">
      <div
        className={`flex flex-col h-full  rounded-md bg-[#1F1F1F] text-white transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <h2 className={`mb-2 hidden -z-20 py-4 text-center text-lg font-semibold ${isCollapsed && "hidden"}`}>
          Club Manager
        </h2> 
 
        {/* Header */}
        <div className="p-4 flex items-center gap-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          {!isCollapsed && (
            
            <div className="flex items-center gap-3">


         <User/>
            
              <div>
                <h3 className="font-medium text-sm">{userName}</h3>
                <p className="text-xs text-gray-400">{userRole}</p>
              </div>
            </div>
          )}
        </div>
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          {navigationItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg mb-1 ${
                  pathname === item.href ? 'bg-orange-600' : 'hover:bg-gray-700'
                }`}
              >
                {item.icon}
                {!isCollapsed && (
                  <span className="flex-1">{item.label}</span>
                )}
                {!isCollapsed && item.subItems && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedItem === item.label ? 'rotate-180' : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setExpandedItem(
                        expandedItem === item.label ? null : item.label
                      );
                    }}
                  />
                )}
              </Link>
              {!isCollapsed && item.subItems && expandedItem === item.label && (
                <div className="ml-6 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className={`block p-2 rounded-lg text-sm ${
                        pathname === subItem.href
                          ? 'bg-orange-600'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="p-4">
          <button
            className="w-full flex items-center justify-center gap-2 bg-current/80 hover:bg-current/20 border-2 p-3 rounded-lg transition-colors"
          >
    

            {!isCollapsed && <span>        <Badge className='h-10'>
            <User/>
            </Badge></span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;