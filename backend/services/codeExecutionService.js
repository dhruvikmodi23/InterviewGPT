// services/codeExecutionService.js
const axios = require('axios');

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'http://localhost:2358';

exports.executeCode = async (code, language) => {
  try {
    // Map your language to Judge0 language ID
    const languageId = {
      'javascript': 63,
      'python': 71,
      'java': 62
    }[language] || 63; // Default to JavaScript
    
    const response = await axios.post(`${JUDGE0_API_URL}/submissions`, {
      source_code: code,
      language_id: languageId,
      stdin: '', // Add test cases here
      expected_output: '', // Add expected output here
      wait: true
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Process response
    return {
      testCasesPassed: response.data.status.id === 3 ? 1 : 0, // Simplified - should compare outputs
      totalTestCases: 1,
      executionTime: response.data.time
    };
  } catch (err) {
    throw new Error('Code execution failed');
  }
};