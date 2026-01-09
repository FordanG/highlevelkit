export interface App {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  logo: string
  category: string[]
  pricing: {
    model: 'free' | 'freemium' | 'paid' | 'one-time' | 'usage-based' | 'credit-based'
    startingPrice?: number
    currency: string
    pricingDetails?: string
  }
  rating: number
  reviewCount: number
  featured: boolean
  trending: boolean
  useCase: string[]
  userType: string[]
  integrationLevel: 'native' | 'webhook' | 'zapier' | 'api' | 'csv' | 'manual'
  setupDifficulty: 'easy' | 'medium' | 'advanced'
  features: string[]
  website?: string
  affiliateLink?: string
  // ColdIQ-inspired enhancements
  ghlCompatibility?: {
    rating: number // 1-5 stars
    description: string
    integrationMethod?: string
  }
  alternatives?: string[] // IDs of alternative apps
  comparisonPoints?: string[] // Key comparison points vs alternatives
  videoDemo?: string // URL to video demo
  setupGuide?: string // URL to setup guide or integration tutorial
  dataSource?: boolean // Is this a data/lead source?
  aiPowered?: boolean // Is this AI-powered?
}

// Category Sections for organization
export const categorySections = [
  { id: 'prospecting-lead-gen', name: 'Prospecting & Lead Generation', icon: '🎯' },
  { id: 'outreach-communication', name: 'Outreach & Communication', icon: '📧' },
  { id: 'crm-sales', name: 'CRM & Sales', icon: '📊' },
  { id: 'automation-workflow', name: 'Automation & Workflow', icon: '⚡' },
  { id: 'analytics-optimization', name: 'Analytics & Optimization', icon: '📈' },
  { id: 'content-marketing', name: 'Content & Marketing', icon: '✍️' },
  { id: 'support-service', name: 'Support & Service', icon: '💬' },
  { id: 'agency-tools', name: 'Agency Tools', icon: '🏢' },
  { id: 'infrastructure', name: 'Infrastructure', icon: '🔧' },
]

export const categories = [
  // Prospecting & Lead Generation
  { id: 'prospecting', name: 'Lead Prospecting', icon: '🎯', section: 'prospecting-lead-gen' },
  { id: 'lead-generation', name: 'Lead Generation', icon: '🔍', section: 'prospecting-lead-gen' },
  { id: 'data-enrichment', name: 'Data Enrichment', icon: '💎', section: 'prospecting-lead-gen' },
  { id: 'visitor-identification', name: 'Visitor Identification', icon: '👁️', section: 'prospecting-lead-gen' },
  { id: 'sales-intelligence', name: 'Sales Intelligence', icon: '🧠', section: 'prospecting-lead-gen' },
  { id: 'intent-data', name: 'Intent Data', icon: '📡', section: 'prospecting-lead-gen' },

  // Outreach & Communication
  { id: 'email-outreach', name: 'Email Outreach', icon: '📧', section: 'outreach-communication' },
  { id: 'email-deliverability', name: 'Email Deliverability', icon: '✉️', section: 'outreach-communication' },
  { id: 'multichannel-outreach', name: 'Multi-Channel Outreach', icon: '🌐', section: 'outreach-communication' },
  { id: 'video-prospecting', name: 'Video Prospecting', icon: '🎥', section: 'outreach-communication' },
  { id: 'linkedin-outreach', name: 'LinkedIn Outreach', icon: '💼', section: 'outreach-communication' },
  { id: 'sms-marketing', name: 'SMS Marketing', icon: '📱', section: 'outreach-communication' },
  { id: 'voice-calling', name: 'Voice & Calling', icon: '📞', section: 'outreach-communication' },

  // CRM & Sales
  { id: 'crm', name: 'CRM Tools', icon: '📊', section: 'crm-sales' },
  { id: 'pipeline-management', name: 'Pipeline Management', icon: '🔄', section: 'crm-sales' },
  { id: 'sales-engagement', name: 'Sales Engagement', icon: '🤝', section: 'crm-sales' },
  { id: 'deal-intelligence', name: 'Deal Intelligence', icon: '💡', section: 'crm-sales' },

  // Automation & Workflow
  { id: 'automation', name: 'Workflow Automation', icon: '⚡', section: 'automation-workflow' },
  { id: 'ai-automation', name: 'AI Automation', icon: '🤖', section: 'automation-workflow' },
  { id: 'ai-assistant', name: 'AI Assistants', icon: '🧙', section: 'automation-workflow' },
  { id: 'ai-bdr', name: 'AI BDR', icon: '🎓', section: 'automation-workflow' },
  { id: 'integration', name: 'Integration Platforms', icon: '🔗', section: 'automation-workflow' },

  // Analytics & Optimization
  { id: 'analytics', name: 'Analytics & Reporting', icon: '📈', section: 'analytics-optimization' },
  { id: 'conversion-optimization', name: 'Conversion Optimization', icon: '🎯', section: 'analytics-optimization' },
  { id: 'ab-testing', name: 'A/B Testing', icon: '🧪', section: 'analytics-optimization' },
  { id: 'sales-coaching', name: 'Sales Coaching', icon: '📚', section: 'analytics-optimization' },

  // Content & Marketing
  { id: 'ai-copywriting', name: 'AI Copywriting', icon: '✍️', section: 'content-marketing' },
  { id: 'email-templates', name: 'Email Templates', icon: '📄', section: 'content-marketing' },
  { id: 'landing-pages', name: 'Landing Pages', icon: '🖼️', section: 'content-marketing' },
  { id: 'social-media', name: 'Social Media', icon: '📣', section: 'content-marketing' },

  // Support & Service
  { id: 'communication', name: 'Communication', icon: '💬', section: 'support-service' },
  { id: 'chatbots', name: 'Chatbots', icon: '💭', section: 'support-service' },
  { id: 'customer-success', name: 'Customer Success', icon: '⭐', section: 'support-service' },
  { id: 'appointment-booking', name: 'Appointment Booking', icon: '📅', section: 'support-service' },

  // Agency Tools
  { id: 'white-label', name: 'White Label', icon: '🏷️', section: 'agency-tools' },
  { id: 'agency-management', name: 'Agency Management', icon: '🏢', section: 'agency-tools' },
  { id: 'client-reporting', name: 'Client Reporting', icon: '📊', section: 'agency-tools' },
  { id: 'marketplace', name: 'Marketplace', icon: '🛒', section: 'agency-tools' },

  // Infrastructure
  { id: 'payments', name: 'Payment Processing', icon: '💳', section: 'infrastructure' },
  { id: 'forms', name: 'Forms & Surveys', icon: '📋', section: 'infrastructure' },
  { id: 'widgets', name: 'Widgets', icon: '🧩', section: 'infrastructure' },
  { id: 'data-management', name: 'Data Management', icon: '🗄️', section: 'infrastructure' },
  { id: 'reputation-management', name: 'Reputation Management', icon: '🌟', section: 'infrastructure' },
  { id: 'project-management', name: 'Project Management', icon: '📁', section: 'infrastructure' },
  { id: 'accounting', name: 'Accounting & Finance', icon: '💰', section: 'infrastructure' },
]

export const useCases = [
  // Prospecting & Lead Generation
  'Lead Generation',
  'B2B Prospecting',
  'Data Enrichment',
  'Sales Intelligence',
  'Visitor Identification',
  'Intent Tracking',

  // Outreach & Communication
  'Cold Email Outreach',
  'Email Deliverability',
  'Multi-Channel Outreach',
  'Video Prospecting',
  'LinkedIn Outreach',
  'SMS Marketing',
  'Voice Calling',

  // Automation & Sales
  'Workflow Automation',
  'AI Automation',
  'Sales Engagement',
  'Pipeline Management',
  'Deal Intelligence',

  // Analytics & Optimization
  'Analytics & Reporting',
  'Conversion Optimization',
  'A/B Testing',
  'Sales Coaching',

  // Content & Marketing
  'AI Copywriting',
  'Email Marketing',
  'Content Creation',
  'Social Media Management',

  // Client & Customer
  'Client Communication',
  'Customer Success',
  'Appointment Booking',
  'Chat & Messaging',

  // Agency Operations
  'White-label Solutions',
  'Agency Management',
  'Client Reporting',

  // Infrastructure
  'Payment Processing',
  'Integration',
  'Data Management',
  'Project Management',
]

export const userTypes = [
  'Agency Owners',
  'SaaS Providers',
  'Freelancers',
  'Enterprise Teams',
  'Consultants',
  'Course Creators',
]

export const apps: App[] = [
  {
    id: '1',
    name: 'LeadConnector Pro',
    slug: 'leadconnector-pro',
    tagline: 'Advanced CRM features for GoHighLevel',
    description: 'Supercharge your GoHighLevel CRM with advanced lead scoring, pipeline automation, and predictive analytics. Perfect for agencies managing multiple clients.',
    logo: '🎯',
    category: ['crm', 'automation'],
    pricing: {
      model: 'paid',
      startingPrice: 97,
      currency: 'USD'
    },
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    trending: true,
    useCase: ['Lead Generation', 'Workflow Automation', 'Analytics & Reporting'],
    userType: ['Agency Owners', 'SaaS Providers'],
    integrationLevel: 'native',
    setupDifficulty: 'medium',
    features: [
      'Advanced lead scoring algorithms',
      'Custom pipeline automation',
      'Predictive analytics dashboard',
      'Multi-client management',
      'Custom reporting templates',
      'API access for custom integrations'
    ],
    website: 'https://example.com/leadconnector-pro',
    affiliateLink: 'https://example.com/affiliate/leadconnector-pro'
  },
  {
    id: '2',
    name: 'AI ChatBot Builder',
    slug: 'ai-chatbot-builder',
    tagline: 'Build intelligent chatbots powered by GPT-4',
    description: 'Create sophisticated AI-powered chatbots for your GoHighLevel funnels. Train on your business data and automate customer conversations with natural language understanding.',
    logo: '🤖',
    category: ['ai', 'communication'],
    pricing: {
      model: 'freemium',
      startingPrice: 49,
      currency: 'USD'
    },
    rating: 4.9,
    reviewCount: 89,
    featured: true,
    trending: true,
    useCase: ['Client Communication', 'AI Assistants', 'Lead Generation'],
    userType: ['Agency Owners', 'SaaS Providers', 'Freelancers'],
    integrationLevel: 'webhook',
    setupDifficulty: 'easy',
    features: [
      'GPT-4 powered conversations',
      'Custom training on your data',
      'Multi-language support',
      'Sentiment analysis',
      'Automated lead qualification',
      'Seamless GHL integration'
    ],
    website: 'https://example.com/ai-chatbot',
    affiliateLink: 'https://example.com/affiliate/ai-chatbot'
  },
  {
    id: '3',
    name: 'FunnelOptimizer',
    slug: 'funnel-optimizer',
    tagline: 'A/B testing and conversion optimization suite',
    description: 'Optimize your GoHighLevel funnels with advanced A/B testing, heatmaps, and conversion tracking. Increase your ROI with data-driven insights.',
    logo: '📈',
    category: ['analytics', 'automation'],
    pricing: {
      model: 'paid',
      startingPrice: 79,
      currency: 'USD'
    },
    rating: 4.7,
    reviewCount: 156,
    featured: false,
    trending: true,
    useCase: ['Analytics & Reporting', 'Workflow Automation'],
    userType: ['Agency Owners', 'SaaS Providers', 'Consultants'],
    integrationLevel: 'native',
    setupDifficulty: 'medium',
    features: [
      'A/B testing for pages and funnels',
      'Heatmap tracking',
      'Conversion funnel analysis',
      'Real-time analytics dashboard',
      'Custom goal tracking',
      'Automated optimization suggestions'
    ],
    website: 'https://example.com/funnel-optimizer',
    affiliateLink: 'https://example.com/affiliate/funnel-optimizer'
  },
  {
    id: '4',
    name: 'SMS Campaign Master',
    slug: 'sms-campaign-master',
    tagline: 'Advanced SMS marketing automation',
    description: 'Take your SMS marketing to the next level with advanced segmentation, personalization, and campaign analytics. Boost engagement and conversions.',
    logo: '📱',
    category: ['communication', 'automation'],
    pricing: {
      model: 'paid',
      startingPrice: 67,
      currency: 'USD'
    },
    rating: 4.6,
    reviewCount: 203,
    featured: false,
    trending: false,
    useCase: ['SMS Marketing', 'Client Communication', 'Workflow Automation'],
    userType: ['Agency Owners', 'Freelancers', 'Course Creators'],
    integrationLevel: 'native',
    setupDifficulty: 'easy',
    features: [
      'Advanced audience segmentation',
      'Personalized message templates',
      'Automated drip campaigns',
      'SMS analytics and reporting',
      'Compliance management',
      'Two-way conversation tracking'
    ],
    website: 'https://example.com/sms-master',
    affiliateLink: 'https://example.com/affiliate/sms-master'
  },
  {
    id: '5',
    name: 'White Label Dashboard',
    slug: 'white-label-dashboard',
    tagline: 'Fully customizable client portal',
    description: 'Create a branded client experience with a fully customizable white-label dashboard. Perfect for agencies offering GoHighLevel as a service.',
    logo: '🏷️',
    category: ['white-label', 'crm'],
    pricing: {
      model: 'paid',
      startingPrice: 147,
      currency: 'USD'
    },
    rating: 4.9,
    reviewCount: 87,
    featured: true,
    trending: false,
    useCase: ['White-label Solutions', 'Client Communication'],
    userType: ['Agency Owners', 'SaaS Providers'],
    integrationLevel: 'native',
    setupDifficulty: 'advanced',
    features: [
      'Full white-label branding',
      'Custom domain support',
      'Client analytics dashboard',
      'Role-based access control',
      'Custom reporting',
      'API documentation generator'
    ],
    website: 'https://example.com/white-label',
    affiliateLink: 'https://example.com/affiliate/white-label'
  },
  {
    id: '6',
    name: 'Payment Gateway Plus',
    slug: 'payment-gateway-plus',
    tagline: 'Advanced payment processing for GHL',
    description: 'Accept payments with ease using multiple payment gateways, subscription management, and automated invoicing. Reduce payment friction and increase revenue.',
    logo: '💳',
    category: ['payments', 'automation'],
    pricing: {
      model: 'freemium',
      startingPrice: 29,
      currency: 'USD'
    },
    rating: 4.8,
    reviewCount: 142,
    featured: false,
    trending: true,
    useCase: ['Payment Processing', 'Workflow Automation'],
    userType: ['Agency Owners', 'SaaS Providers', 'Course Creators'],
    integrationLevel: 'webhook',
    setupDifficulty: 'easy',
    features: [
      'Multiple payment gateway support',
      'Subscription management',
      'Automated invoicing',
      'Payment analytics',
      'Dunning management',
      'Tax calculation and compliance'
    ],
    website: 'https://example.com/payment-plus',
    affiliateLink: 'https://example.com/affiliate/payment-plus'
  },
  {
    id: '7',
    name: 'Email Designer Pro',
    slug: 'email-designer-pro',
    tagline: 'Beautiful email templates and editor',
    description: 'Design stunning emails with a drag-and-drop editor and 500+ pre-built templates. Optimize for deliverability and engagement.',
    logo: '📧',
    category: ['templates', 'communication'],
    pricing: {
      model: 'paid',
      startingPrice: 39,
      currency: 'USD'
    },
    rating: 4.7,
    reviewCount: 178,
    featured: false,
    trending: false,
    useCase: ['Email Marketing', 'Client Communication'],
    userType: ['Agency Owners', 'Freelancers', 'Course Creators'],
    integrationLevel: 'native',
    setupDifficulty: 'easy',
    features: [
      '500+ email templates',
      'Drag-and-drop editor',
      'Mobile-responsive designs',
      'A/B testing for subject lines',
      'Spam score checker',
      'Template marketplace'
    ],
    website: 'https://example.com/email-designer',
    affiliateLink: 'https://example.com/affiliate/email-designer'
  },
  {
    id: '8',
    name: 'Calendar Sync Pro',
    slug: 'calendar-sync-pro',
    tagline: 'Advanced calendar and appointment booking',
    description: 'Streamline appointment booking with advanced calendar features, team scheduling, and automated reminders. Reduce no-shows by 80%.',
    logo: '📅',
    category: ['automation', 'widgets'],
    pricing: {
      model: 'paid',
      startingPrice: 57,
      currency: 'USD'
    },
    rating: 4.8,
    reviewCount: 134,
    featured: true,
    trending: false,
    useCase: ['Appointment Booking', 'Workflow Automation', 'Client Communication'],
    userType: ['Agency Owners', 'Consultants', 'Freelancers'],
    integrationLevel: 'native',
    setupDifficulty: 'medium',
    features: [
      'Team scheduling and round-robin',
      'Multiple calendar sync (Google, Outlook)',
      'Automated SMS/email reminders',
      'Buffer time management',
      'Custom booking forms',
      'No-show tracking and automation'
    ],
    website: 'https://example.com/calendar-sync',
    affiliateLink: 'https://example.com/affiliate/calendar-sync'
  },
  {
    id: '9',
    name: 'Miro',
    slug: 'miro',
    tagline: 'Visual collaboration whiteboard for teams',
    description: 'Miro is a collaborative online whiteboard platform for teams to brainstorm, plan workflows, map customer journeys, and visualize strategies. Perfect for agencies managing client projects and team collaboration.',
    logo: '🎨',
    category: ['project-management', 'communication'],
    pricing: {
      model: 'freemium',
      startingPrice: 8,
      currency: 'USD',
      pricingDetails: 'Free plan available, paid plans start at $8/member/month'
    },
    rating: 4.8,
    reviewCount: 245,
    featured: false,
    trending: true,
    useCase: ['Project Management', 'Client Communication', 'Content Creation'],
    userType: ['Agency Owners', 'Consultants', 'Enterprise Teams'],
    integrationLevel: 'api',
    setupDifficulty: 'easy',
    features: [
      'Infinite canvas whiteboard',
      'Real-time collaboration',
      'Pre-built templates',
      'Workflow visualization',
      'Customer journey mapping',
      'Integration with popular tools'
    ],
    website: 'https://miro.com',
    affiliateLink: 'https://miro.com/?red=highle&utm_source=highle&utm_medium=revshare&utm_affiliate_network=reditus'
  },
]
