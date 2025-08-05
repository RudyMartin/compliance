import { analyzeDocumentCompliance, generateComplianceRecommendations, extractDocumentSummary } from '../services/openaiService';

/**
 * Process and analyze documents for compliance
 * @param {object} policyDoc - Policy document object
 * @param {object} programDoc - Program document object
 * @param {Array} requirements - Requirements to analyze
 * @returns {Promise<object>} Processed analysis results
 */
export async function processDocumentAnalysis(policyDoc, programDoc, requirements) {
  try {
    // Extract summaries from both documents
    const [policySummary, programSummary] = await Promise.all([
      extractDocumentSummary(policyDoc?.content, 'policy'),
      extractDocumentSummary(programDoc?.content, 'program')
    ]);

    // Perform compliance analysis
    const complianceAnalysis = await analyzeDocumentCompliance(
      policyDoc?.content,
      programDoc?.content,
      requirements
    );

    // Generate recommendations
    const recommendations = await generateComplianceRecommendations(complianceAnalysis);

    // Map analysis results to requirements format
    const processedRequirements = requirements?.map(req => {
      const analysis = complianceAnalysis?.requirementAnalysis?.find(
        a => a?.requirementId === req?.id
      );
      
      return {
        ...req,
        status: analysis?.status || 'pending',
        confidence: analysis?.confidence || 0,
        evidence: analysis?.evidence || '',
        gaps: analysis?.gaps || [],
        recommendations: analysis?.recommendations || [],
        lastUpdated: new Date()?.toISOString()
      };
    });

    return {
      requirements: processedRequirements,
      overallStatus: complianceAnalysis?.overallStatus,
      completionPercentage: complianceAnalysis?.completionPercentage,
      policySummary,
      programSummary,
      recommendations,
      analysisTimestamp: new Date()?.toISOString()
    };
  } catch (error) {
    console.error('Error processing document analysis:', error);
    throw error;
  }
}

/**
 * Get compliance status statistics
 * @param {Array} requirements - Array of requirements with status
 * @returns {object} Statistics object
 */
export function getComplianceStats(requirements) {
  if (!requirements?.length) {
    return {
      compliant: 0,
      nonCompliant: 0,
      partial: 0,
      pending: 0,
      total: 0
    };
  }

  const stats = requirements?.reduce((acc, req) => {
    acc[req?.status] = (acc?.[req?.status] || 0) + 1;
    return acc;
  }, {});

  const total = requirements?.length;
  
  return {
    compliant: Math.round((stats?.compliant || 0) / total * 100),
    nonCompliant: Math.round((stats?.['non-compliant'] || 0) / total * 100),
    partial: Math.round((stats?.partial || 0) / total * 100),
    pending: Math.round((stats?.pending || 0) / total * 100),
    total
  };
}

/**
 * Validate document content before processing
 * @param {object} document - Document object to validate
 * @returns {boolean} Whether document is valid for processing
 */
export function validateDocument(document) {
  return !!(document?.content && document?.content?.length > 10);
}

/**
 * Format requirements for AI analysis
 * @param {Array} requirements - Raw requirements array
 * @returns {Array} Formatted requirements for AI processing
 */
export function formatRequirementsForAnalysis(requirements) {
  return requirements?.map(req => ({
    id: req?.id,
    title: req?.title,
    description: req?.description,
    category: req?.category,
    priority: req?.priority,
    section: req?.section
  }));
}