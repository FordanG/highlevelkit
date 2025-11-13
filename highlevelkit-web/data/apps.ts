export interface App {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  logo: string
  category: string[]
  pricing: {
    model: 'free' | 'freemium' | 'paid' | 'one-time'
    startingPrice?: number
    currency: string
  }
  rating: number
  reviewCount: number
  featured: boolean
  trending: boolean
  useCase: string[]
  userType: string[]
  integrationLevel: 'native' | 'webhook' | 'zapier' | 'api'
  setupDifficulty: 'easy' | 'medium' | 'advanced'
  features: string[]
  website?: string
  affiliateLink?: string
}

export const categories = [
  { id: 'crm', name: 'CRM Tools', icon: '📊' },
  { id: 'automation', name: 'Automation', icon: '⚡' },
  { id: 'ai', name: 'AI Integrations', icon: '🤖' },
  { id: 'widgets', name: 'Widgets', icon: '🧩' },
  { id: 'templates', name: 'Templates', icon: '📄' },
  { id: 'analytics', name: 'Analytics', icon: '📈' },
  { id: 'communication', name: 'Communication', icon: '💬' },
  { id: 'payments', name: 'Payments', icon: '💳' },
  { id: 'white-label', name: 'White Label', icon: '🏷️' },
]

export const useCases = [
  'Lead Generation',
  'Client Communication',
  'Workflow Automation',
  'White-label Solutions',
  'Analytics & Reporting',
  'Payment Processing',
  'AI Assistants',
  'Email Marketing',
  'SMS Marketing',
  'Appointment Booking',
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
]
