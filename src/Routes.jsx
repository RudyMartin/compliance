import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProjectManagement from './pages/project-management';
import RequirementsChecklist from './pages/requirements-checklist';
import DocumentComparison from './pages/document-comparison';
import Dashboard from './pages/dashboard';
import ComplianceReport from './pages/compliance-report';
import DocumentUpload from './pages/document-upload';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ComplianceReport />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/requirements-checklist" element={<RequirementsChecklist />} />
        <Route path="/document-comparison" element={<DocumentComparison />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compliance-report" element={<ComplianceReport />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
