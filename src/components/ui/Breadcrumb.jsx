import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': 'Dashboard',
    '/document-upload': 'Document Upload',
    '/document-comparison': 'Document Comparison',
    '/requirements-checklist': 'Requirements Checklist',
    '/compliance-report': 'Compliance Report',
    '/project-management': 'Project Management'
  };

  const getParentRoutes = (pathname) => {
    const routes = [];
    const segments = pathname?.split('/')?.filter(Boolean);
    
    // Always start with Dashboard as home
    routes?.push({ path: '/dashboard', label: 'Dashboard' });
    
    // Add current route if it's not dashboard
    if (pathname !== '/dashboard' && routeMap?.[pathname]) {
      routes?.push({ path: pathname, label: routeMap?.[pathname] });
    }
    
    return routes;
  };

  const breadcrumbItems = getParentRoutes(location.pathname);

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbItems?.map((item, index) => (
        <div key={item?.path} className="flex items-center space-x-2">
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-border" />
          )}
          {index === breadcrumbItems?.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item?.label}
            </span>
          ) : (
            <button
              onClick={() => navigate(item?.path)}
              className="hover:text-foreground transition-professional"
            >
              {item?.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;