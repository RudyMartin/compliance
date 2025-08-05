import OpenAI from 'openai';

/**
 * Initializes the OpenAI client with the API key from environment variables.
 * @returns {OpenAI} Configured OpenAI client instance.
 */
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage in React
});

/**
 * Analyzes document compliance against requirements using structured output
 * @param {string} policyDocument - The policy document content
 * @param {string} programDocument - The program document content
 * @param {Array} requirements - Array of requirements to check
 * @returns {Promise<object>} Structured compliance analysis
 */
export async function analyzeDocumentCompliance(policyDocument, programDocument, requirements) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a compliance analysis expert. Analyze the provided documents against specific requirements and provide detailed compliance assessment. Focus on identifying gaps, partial implementations, and full compliance.`
        },
        {
          role: 'user',
          content: `
            Policy Document: ${policyDocument}
            
            Program Document: ${programDocument}
            
            Requirements to analyze: ${JSON.stringify(requirements)}
            
            Please analyze each requirement and provide compliance status, evidence, and recommendations.
          `
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'compliance_analysis',
          schema: {
            type: 'object',
            properties: {
              overallStatus: { type: 'string' },
              completionPercentage: { type: 'number' },
              requirementAnalysis: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    requirementId: { type: 'string' },
                    status: { type: 'string' },
                    confidence: { type: 'number' },
                    evidence: { type: 'string' },
                    gaps: { type: 'array', items: { type: 'string' } },
                    recommendations: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['requirementId', 'status', 'confidence', 'evidence']
                }
              }
            },
            required: ['overallStatus', 'completionPercentage', 'requirementAnalysis'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error in document compliance analysis:', error);
    throw error;
  }
}

/**
 * Generates compliance recommendations based on analysis
 * @param {object} analysisResult - Result from analyzeDocumentCompliance
 * @returns {Promise<object>} Structured recommendations
 */
export async function generateComplianceRecommendations(analysisResult) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a compliance consultant providing actionable recommendations to address compliance gaps and improve documentation.'
        },
        {
          role: 'user',
          content: `Based on this compliance analysis: ${JSON.stringify(analysisResult)}, provide specific, actionable recommendations for improvement.`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'compliance_recommendations',
          schema: {
            type: 'object',
            properties: {
              priorityActions: { type: 'array', items: { type: 'string' } },
              improvementPlan: { type: 'array', items: { type: 'string' } },
              riskMitigation: { type: 'array', items: { type: 'string' } }
            },
            required: ['priorityActions', 'improvementPlan', 'riskMitigation'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error generating compliance recommendations:', error);
    throw error;
  }
}

/**
 * Extracts key information from documents for quick review
 * @param {string} documentContent - The document content to analyze
 * @param {string} documentType - Type of document (policy/program)
 * @returns {Promise<object>} Extracted key information
 */
export async function extractDocumentSummary(documentContent, documentType) {
  try {
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Extract key information from ${documentType} documents for compliance review.`
        },
        {
          role: 'user',
          content: documentContent
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'document_summary',
          schema: {
            type: 'object',
            properties: {
              keyRequirements: { type: 'array', items: { type: 'string' } },
              mainSections: { type: 'array', items: { type: 'string' } },
              complianceAreas: { type: 'array', items: { type: 'string' } },
              riskAreas: { type: 'array', items: { type: 'string' } }
            },
            required: ['keyRequirements', 'mainSections', 'complianceAreas'],
            additionalProperties: false
          }
        }
      }
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error extracting document summary:', error);
    throw error;
  }
}

export default openai;