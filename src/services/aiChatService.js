/**
 * Platinum AI Chatbot Service Layer
 * 
 * Logically separates the AI / RAG query logic from the UI presentation layer.
 * Easily replace the mock response generator with your actual API endpoint:
 * e.g., fetch('https://api.platinum.ai/v1/chat', { ... })
 */

const DEFAULT_LEAVE_RESPONSE = {
  text: `According to the company's Leave Policy:
• Employees are entitled to 12 paid leaves per year.
• You can apply through the Leave & Attendance section in the application.
• Approval is subject to your manager's confirmation.

For more details, please refer to the full document.`,
  attachment: {
    title: 'Leave Policy',
    type: 'PDF',
    size: '1.2 MB',
    url: '#',
  },
};

const KNOWLEDGE_BASE_RESPONSES = {
  leave: DEFAULT_LEAVE_RESPONSE,
  policy: DEFAULT_LEAVE_RESPONSE,
  vacation: DEFAULT_LEAVE_RESPONSE,
  it: {
    text: `For IT Support issues:
• Raise a ticket in the Platinum Internal IT Helpdesk portal.
• Critical hardware issues are handled within 2 hours.
• Password resets and access requests can be requested directly via Slack #it-support.`,
    attachment: {
      title: 'IT Support Guidelines',
      type: 'PDF',
      size: '850 KB',
      url: '#',
    },
  },
  expense: {
    text: `Expense reimbursement guidelines:
• Submit travel and meal expenses by the 25th of every month.
• Receipts are mandatory for all transactions above $25.
• Reimbursements are credited with the monthly payroll cycle.`,
    attachment: {
      title: 'Travel & Expense Policy',
      type: 'PDF',
      size: '1.5 MB',
      url: '#',
    },
  },
};

/**
 * Send a message to the AI Assistant service.
 * @param {string} userMessage - Text entered by the user
 * @param {Array} history - Full conversation message history
 * @returns {Promise<Object>} Formatted response object with message text and optional attachment
 */
export async function sendChatMessage(userMessage, history = []) {
  // Simulated network latency (600ms - 1000ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lower = userMessage.toLowerCase().trim();

  // Keyword-based simulated RAG matching
  for (const [key, response] of Object.entries(KNOWLEDGE_BASE_RESPONSES)) {
    if (lower.includes(key)) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...response,
      };
    }
  }

  // Fallback AI response for any other enterprise question
  return {
    id: `bot-${Date.now()}`,
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    text: `Based on your organization's connected knowledge base, here is what I found regarding "${userMessage}":\n\n• Information has been indexed from verified company documentation.\n• Platinum AI verifies all answers against your internal security policies.\n\nWould you like me to pull the associated documentation or connect you to an administrator?`,
    attachment: {
      title: 'Company Handbook & Guidelines',
      type: 'PDF',
      size: '2.4 MB',
      url: '#',
    },
  };
}
