import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Projects', path: '/project-management', icon: 'FolderOpen' },
    { label: 'Analysis', path: '/document-comparison', icon: 'FileSearch', 
      submenu: [
        { label: 'Document Upload', path: '/document-upload', icon: 'Upload' },
        { label: 'Document Comparison', path: '/document-comparison', icon: 'FileSearch' },
        { label: 'Requirements Checklist', path: '/requirements-checklist', icon: 'CheckSquare' }
      ]
    },
    { label: 'Reports', path: '/compliance-report', icon: 'FileText' }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const isActiveSubmenu = (submenu) => {
    return submenu?.some(item => location.pathname === item?.path);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-professional">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-3 hover:opacity-80 transition-professional"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-md">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-semibold text-foreground">
                ComplianceChecker
              </h1>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <div key={item?.path} className="relative group">
              <button
                onClick={() => item?.submenu ? null : handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-professional ${
                  isActiveRoute(item?.path) || (item?.submenu && isActiveSubmenu(item?.submenu))
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
                {item?.submenu && (
                  <Icon name="ChevronDown" size={14} />
                )}
              </button>
              
              {/* Submenu */}
              {item?.submenu && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-document opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-professional">
                  <div className="py-2">
                    {item?.submenu?.map((subItem) => (
                      <button
                        key={subItem?.path}
                        onClick={() => handleNavigation(subItem?.path)}
                        className={`flex items-center space-x-3 w-full px-4 py-2 text-sm transition-professional ${
                          isActiveRoute(subItem?.path)
                            ? 'bg-accent text-accent-foreground'
                            : 'text-popover-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={subItem?.icon} size={16} />
                        <span>{subItem?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-64 pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-professional"
              />
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button 
              variant="ghost" 
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden md:block text-sm font-medium">John Doe</span>
              <Icon name="ChevronDown" size={14} />
            </Button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-document">
                <div className="py-2">
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-professional">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-professional">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-professional">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                  <hr className="my-2 border-border" />
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-error hover:bg-muted transition-professional">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Search */}
            <div className="md:hidden mb-4">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>

            {navigationItems?.map((item) => (
              <div key={item?.path}>
                <button
                  onClick={() => item?.submenu ? null : handleNavigation(item?.path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md text-sm font-medium transition-professional ${
                    isActiveRoute(item?.path) || (item?.submenu && isActiveSubmenu(item?.submenu))
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
                
                {/* Mobile Submenu */}
                {item?.submenu && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item?.submenu?.map((subItem) => (
                      <button
                        key={subItem?.path}
                        onClick={() => handleNavigation(subItem?.path)}
                        className={`flex items-center space-x-3 w-full px-4 py-2 rounded-md text-sm transition-professional ${
                          isActiveRoute(subItem?.path)
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={subItem?.icon} size={16} />
                        <span>{subItem?.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;