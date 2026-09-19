import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  Modal,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import ScrollAnimation from '../ScrollAnimation';

// =========================================================
// 1. INITIAL MOCK DATA (Aligned with Screenshots & PDF)
// =========================================================

// Clients Data (10 primary from Screenshot media_1789749223921.png + remaining for 48 total)
const INITIAL_CLIENTS = [
  {
    id: 1,
    name: 'TechNova Solutions',
    industry: 'IT Services',
    avatarChar: 'T',
    avatarColor: '#0066FF',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@technova.com',
    phone: '+91 98765 43210',
    designation: 'Operations Manager',
    companySize: '51 - 200 employees',
    website: 'https://www.technova.com',
    plan: 'Gold',
    status: 'Active',
    users: 24,
    startDate: '12 Dec 2024',
    endDate: '12 Dec 2025',
    daysLeftNumber: 95,
    daysLeftText: '95 days left',
    notes: 'Key client in IT Services sector. Interested in upgrading to Platinum plan next year.',
    docs: '1,920',
    conversations: '12,450',
  },
  {
    id: 2,
    name: 'AutoDrive Ltd',
    industry: 'Automotive',
    avatarChar: 'A',
    avatarColor: '#06B6D4',
    contactPerson: 'Michael Chen',
    email: 'michael@autodrive.com',
    phone: '+91 98123 45678',
    designation: 'VP of Engineering',
    companySize: '201 - 500 employees',
    website: 'https://www.autodrive.com',
    plan: 'Silver',
    status: 'Active',
    users: 18,
    startDate: '20 Nov 2024',
    endDate: '20 Nov 2025',
    daysLeftNumber: 73,
    daysLeftText: '73 days left',
    notes: 'Requires high throughput for technical SOP indexing and diagnostics.',
    docs: '1,540',
    conversations: '10,230',
  },
  {
    id: 3,
    name: 'HealthPlus',
    industry: 'Healthcare',
    avatarChar: 'H',
    avatarColor: '#EF4444',
    contactPerson: 'Dr. Emily Carter',
    email: 'emily@healthplus.com',
    phone: '+91 98456 78901',
    designation: 'Head of Clinical IT',
    companySize: '500+ employees',
    website: 'https://www.healthplus.org',
    plan: 'Platinum',
    status: 'Active',
    users: 36,
    startDate: '16 Jan 2025',
    endDate: '15 Jan 2026',
    daysLeftNumber: 138,
    daysLeftText: '138 days left',
    notes: 'HIPAA and BAA isolation required across all clinical hospital networks.',
    docs: '2,480',
    conversations: '18,230',
  },
  {
    id: 4,
    name: 'EduSmart Learning',
    industry: 'Education',
    avatarChar: 'E',
    avatarColor: '#10B981',
    contactPerson: 'Robert Williams',
    email: 'robert@edusmart.com',
    phone: '+91 98234 56789',
    designation: 'Academic Dean',
    companySize: '51 - 200 employees',
    website: 'https://www.edusmart.com',
    plan: 'Gold',
    status: 'Expiring Soon',
    users: 22,
    startDate: '30 Sep 2024',
    endDate: '30 Sep 2025',
    daysLeftNumber: 22,
    daysLeftText: '22 days left',
    notes: 'Renewal discussion in progress for student admission policy AI.',
    docs: '980',
    conversations: '7,560',
  },
  {
    id: 5,
    name: 'RetailCorp',
    industry: 'Retail',
    avatarChar: 'R',
    avatarColor: '#2563EB',
    contactPerson: 'Priya Mehta',
    email: 'priya@retailcorp.com',
    phone: '+91 98901 23456',
    designation: 'Supply Chain Lead',
    companySize: '500+ employees',
    website: 'https://www.retailcorp.com',
    plan: 'Silver',
    status: 'Active',
    users: 16,
    startDate: '10 Feb 2025',
    endDate: '10 Feb 2026',
    daysLeftNumber: 157,
    daysLeftText: '157 days left',
    notes: 'Retail store operations and inventory policy assistance.',
    docs: '860',
    conversations: '6,780',
  },
  {
    id: 6,
    name: 'GreenEnergy Co',
    industry: 'Energy',
    avatarChar: 'G',
    avatarColor: '#059669',
    contactPerson: 'Daniel Brooks',
    email: 'daniel@greenenergy.com',
    phone: '+91 98345 67890',
    designation: 'Operations Director',
    companySize: '51 - 200 employees',
    website: 'https://www.greenenergy.com',
    plan: 'Gold',
    status: 'Active',
    users: 15,
    startDate: '18 Mar 2025',
    endDate: '18 Mar 2026',
    daysLeftNumber: 193,
    daysLeftText: '193 days left',
    notes: 'Solar and wind turbine field maintenance documentation.',
    docs: '650',
    conversations: '4,890',
  },
  {
    id: 7,
    name: 'FinSecure Bank',
    industry: 'Finance',
    avatarChar: 'F',
    avatarColor: '#7C3AED',
    contactPerson: 'James Wilson',
    email: 'james@finsecure.com',
    phone: '+91 98678 90123',
    designation: 'Chief Compliance Officer',
    companySize: '500+ employees',
    website: 'https://www.finsecure.com',
    plan: 'Platinum',
    status: 'Active',
    users: 28,
    startDate: '05 Nov 2024',
    endDate: '05 Nov 2025',
    daysLeftNumber: 58,
    daysLeftText: '58 days left',
    notes: 'Strict cryptographic tenant vector isolation and audit logs.',
    docs: '1,120',
    conversations: '9,450',
  },
  {
    id: 8,
    name: 'LogiTrans Global',
    industry: 'Logistics',
    avatarChar: 'L',
    avatarColor: '#EA580C',
    contactPerson: 'Aisha Khan',
    email: 'aisha@logitrans.com',
    phone: '+91 98567 89012',
    designation: 'Logistics Manager',
    companySize: '201 - 500 employees',
    website: 'https://www.logitrans.com',
    plan: 'Silver',
    status: 'Inactive',
    users: 9,
    startDate: '14 Aug 2024',
    endDate: '14 Aug 2025',
    daysLeftNumber: 0,
    daysLeftText: 'Expired',
    notes: 'Fleet distribution guidelines and international customs docs.',
    docs: '430',
    conversations: '3,120',
  },
  {
    id: 9,
    name: 'CloudNext',
    industry: 'Cloud Services',
    avatarChar: 'C',
    avatarColor: '#334155',
    contactPerson: 'Kevin Martin',
    email: 'kevin@cloudnext.com',
    phone: '+91 98789 01234',
    designation: 'Cloud Architect',
    companySize: '51 - 200 employees',
    website: 'https://www.cloudnext.com',
    plan: 'Gold',
    status: 'Active',
    users: 12,
    startDate: '22 Dec 2024',
    endDate: '22 Dec 2025',
    daysLeftNumber: 105,
    daysLeftText: '105 days left',
    notes: 'Multi-cloud DevOps runbooks and cluster management automation.',
    docs: '780',
    conversations: '5,640',
  },
  {
    id: 10,
    name: 'InnoTech Systems',
    industry: 'Technology',
    avatarChar: 'I',
    avatarColor: '#4F46E5',
    contactPerson: 'Neha Gupta',
    email: 'neha@innotech.com',
    phone: '+91 98890 12345',
    designation: 'Head of People Operations',
    companySize: '51 - 200 employees',
    website: 'https://www.innotech.com',
    plan: 'Silver',
    status: 'Active',
    users: 14,
    startDate: '28 Jan 2025',
    endDate: '28 Jan 2026',
    daysLeftNumber: 176,
    daysLeftText: '176 days left',
    notes: 'HR policy knowledge base, employee travel rules, and leave workflows.',
    docs: '920',
    conversations: '6,100',
  },
];

// Plans Data (Matching PDF Page 7 & 8)
const INITIAL_PLANS = [
  {
    id: 'gold',
    name: 'Gold',
    badge: null,
    desc: 'Essential features for growing businesses.',
    detailedDesc: 'Great starting tier for growing businesses aiming to integrate automated AI support across their core customer support and operations.',
    price: '₹8,999',
    rawPrice: '8999',
    billingCycle: 'Monthly',
    validity: '12 Months',
    currency: 'INR (₹)',
    queries: 'Up to 1,000 queries/month',
    maxUsers: 5,
    storage: '10 MB',
    features: [
      'Up to 1,000 queries/month',
      'Standard LLM model',
      'Email support',
      'Basic analytics',
    ],
    status: 'Active',
    clients: 19,
    displayOrder: 1,
    color: '#D97706',
    bgColor: '#FFFBEB',
  },
  {
    id: 'silver',
    name: 'Silver',
    badge: null,
    desc: 'Advanced capabilities for established teams.',
    detailedDesc: 'Tailored for teams requiring higher query capacities, priority support, detailed operational analytics, and custom knowledge base ingestion.',
    price: '₹19,999',
    rawPrice: '19999',
    billingCycle: 'Monthly',
    validity: '12 Months',
    currency: 'INR (₹)',
    queries: 'Up to 5,000 queries/month',
    maxUsers: 20,
    storage: '25 MB',
    features: [
      'Up to 5,000 queries/month',
      'Advanced LLM model',
      'Priority support',
      'Detailed analytics',
      'Custom knowledge base',
    ],
    status: 'Active',
    clients: 15,
    displayOrder: 2,
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    badge: 'Most Popular',
    desc: 'Full-featured AI platform for large organizations.',
    detailedDesc: 'Our enterprise-grade tier with dedicated account management, multi-tenant isolation, 24/7 SLA, and high-frequency document indexing.',
    price: '₹49,999',
    rawPrice: '49999',
    billingCycle: 'Monthly',
    validity: '12 Months',
    currency: 'INR (₹)',
    queries: 'Up to 20,000 queries/month',
    maxUsers: 50,
    storage: '100 MB',
    features: [
      'Up to 20,000 queries/month',
      'Latest LLM model',
      '24/7 support',
      'Advanced analytics',
      'Custom integration',
      'Dedicated account manager',
    ],
    status: 'Active',
    clients: 12,
    displayOrder: 3,
    color: '#06B6D4',
    bgColor: '#ECFEFF',
  },
  {
    id: 'enterprise',
    name: 'Enterprise / Custom',
    badge: null,
    desc: 'Tailored solution for enterprise needs.',
    detailedDesc: 'Custom private VPC, dedicated inference endpoints, bespoke integrations, on-premise deployments, and dedicated support team.',
    price: 'Custom',
    rawPrice: 'Custom',
    billingCycle: 'Custom',
    validity: 'Multi-year',
    currency: 'INR (₹)',
    queries: 'Unlimited queries',
    maxUsers: 'Unlimited',
    storage: 'Unlimited',
    features: [
      'Unlimited queries',
      'Custom LLM deployment',
      'On-premise option',
      'Dedicated support team',
      'Custom features',
    ],
    status: 'Active',
    clients: 2,
    displayOrder: 4,
    color: '#64748B',
    bgColor: '#F1F5F9',
  },
];

// Master Settings: Role Management Initial Data (PDF Page 16)
const INITIAL_ROLES = [
  {
    id: 1,
    name: 'Admin',
    desc: 'Platform administration and management access',
    status: 'Active',
    permissions: ['Dashboard', 'Clients', 'Plans', 'Subscriptions', 'LLM Data Import', 'Reports', 'Master Settings'],
  },
  {
    id: 2,
    name: 'Client Admin',
    desc: 'Administration access for client organization',
    status: 'Active',
    permissions: ['Dashboard', 'Clients', 'Reports'],
  },
  {
    id: 3,
    name: 'Client User',
    desc: 'Standard user access for client organization',
    status: 'Active',
    permissions: ['Dashboard', 'Reports'],
  },
  {
    id: 4,
    name: 'Support Engineer',
    desc: 'Technical troubleshooting and operational audit log access',
    status: 'Active',
    permissions: ['Dashboard', 'Subscriptions', 'LLM Data Import', 'Reports'],
  },
];

// Master Settings: System Configurations Initial Data (PDF Page 16 bottom)
const INITIAL_CONFIGS = [
  {
    id: 1,
    name: 'Session Timeout Duration',
    desc: 'Inactivity threshold before administrator re-authentication is enforced.',
    value: '60 Minutes',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Max Document Upload Limit',
    desc: 'Maximum single file size acceptable for knowledge vector ingestion.',
    value: '100 MB / File',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Default Pagination Size',
    desc: 'Default record count displayed across table views before pagination.',
    value: '10 Records / Page',
    status: 'Active',
  },
  {
    id: 4,
    name: 'API Ingestion Rate Limit',
    desc: 'Maximum document indexing batches permissible per tenant minute.',
    value: '500 Requests / Min',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Vector Embedding Dimension',
    desc: 'Default embedding vector dimensions model size for similarity searches.',
    value: '1536 Dimensions',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Audit Trail Retention',
    desc: 'Platform operational activity logs retention duration.',
    value: '365 Days',
    status: 'Active',
  },
];

// Subscriptions Initial Data
const INITIAL_SUBSCRIPTIONS = [
  {
    id: 'SUB-001',
    client: 'TechNova Solutions',
    plan: 'Gold',
    startDate: '12 Dec 2024',
    endDate: '12 Dec 2025',
    daysLeft: '95 days left',
    status: 'Active',
    users: 24,
    amount: '₹8,999',
    billingCycle: 'Monthly',
    color: '#10B981',
  },
  {
    id: 'SUB-002',
    client: 'AutoDrive Ltd',
    plan: 'Silver',
    startDate: '20 Nov 2024',
    endDate: '20 Nov 2025',
    daysLeft: '73 days left',
    status: 'Active',
    users: 18,
    amount: '₹19,999',
    billingCycle: 'Monthly',
    color: '#10B981',
  },
  {
    id: 'SUB-003',
    client: 'HealthPlus',
    plan: 'Platinum',
    startDate: '16 Jan 2025',
    endDate: '20 Oct 2025',
    daysLeft: '42 days left',
    status: 'Active',
    users: 36,
    amount: '₹49,999',
    billingCycle: 'Monthly',
    color: '#10B981',
  },
  {
    id: 'SUB-004',
    client: 'EduSmart Learning',
    plan: 'Gold',
    startDate: '30 Sep 2024',
    endDate: '30 Sep 2025',
    daysLeft: '22 days left',
    status: 'Expiring Soon',
    users: 22,
    amount: '₹8,999',
    billingCycle: 'Monthly',
    color: '#F59E0B',
  },
  {
    id: 'SUB-005',
    client: 'RetailCorp',
    plan: 'Silver',
    startDate: '10 Feb 2025',
    endDate: '10 Feb 2026',
    daysLeft: '157 days left',
    status: 'Active',
    users: 16,
    amount: '₹19,999',
    billingCycle: 'Monthly',
    color: '#10B981',
  },
];

// LLM Data Imports
const INITIAL_IMPORTS = [
  {
    id: 'IMP-20250908-001',
    client: 'TechNova Solutions',
    source: 'Client Upload',
    files: 5,
    fileTypes: 'PDF, DOCX',
    date: '08 Sep 2026 • 10:15 AM',
    status: 'Completed',
    chunks: 420,
    size: '14.2 MB',
    color: '#10B981',
    details: '5 technical product manuals and customer onboarding handbooks indexed with embeddings.',
  },
  {
    id: 'IMP-20250906-002',
    client: 'AutoDrive Ltd',
    source: 'Client Upload',
    files: 3,
    fileTypes: 'PDF, XLSX',
    date: '06 Sep 2026 • 04:30 PM',
    status: 'Completed',
    chunks: 210,
    size: '8.7 MB',
    color: '#10B981',
    details: 'Vehicle diagnostic trouble codes (DTC) and warranty service troubleshooting manuals.',
  },
  {
    id: 'IMP-20250907-015',
    client: 'HealthPlus',
    source: 'API Sync',
    files: 8,
    fileTypes: 'PDF, JSON',
    date: '05 Sep 2026 • 11:20 AM',
    status: 'Processing',
    chunks: 1840,
    size: '42.6 MB',
    color: '#F59E0B',
    details: 'Clinical protocol guidelines and patient EHR privacy handling runbooks.',
  },
  {
    id: 'IMP-20250905-011',
    client: 'EduSmart Learning',
    source: 'Client Upload',
    files: 12,
    fileTypes: 'DOCX, PDF',
    date: '05 Sep 2026 • 02:15 PM',
    status: 'Completed',
    chunks: 890,
    size: '26.4 MB',
    color: '#10B981',
    details: 'Undergraduate student handbook, academic grading rubric, and campus policies.',
  },
  {
    id: 'IMP-20250904-009',
    client: 'RetailCorp',
    source: 'API Sync',
    files: 4,
    fileTypes: 'CSV, JSON',
    date: '04 Sep 2026 • 09:40 AM',
    status: 'Failed',
    chunks: 0,
    size: '3.1 MB',
    color: '#EF4444',
    details: 'Schema validation error: Missing required inventory category key in CSV header row.',
  },
];

// Client Growth Data Sets for Interactive Dropdown
const GROWTH_DATA_MAP = {
  'Last 6 Months': [
    { month: 'Mar', value: 16.0, label: '16 clients' },
    { month: 'Apr', value: 22.0, label: '22 clients' },
    { month: 'May', value: 28.0, label: '28 clients' },
    { month: 'Jun', value: 33.5, label: '34 clients' },
    { month: 'Jul', value: 40.0, label: '40 clients' },
    { month: 'Aug', value: 48.0, label: '48 clients' },
  ],
  'Last 3 Months': [
    { month: 'Jun', value: 33.5, label: '34 clients' },
    { month: 'Jul', value: 40.0, label: '40 clients' },
    { month: 'Aug', value: 48.0, label: '48 clients' },
  ],
  'Year to Date': [
    { month: 'Jan', value: 8.0, label: '8 clients' },
    { month: 'Feb', value: 12.0, label: '12 clients' },
    { month: 'Mar', value: 16.0, label: '16 clients' },
    { month: 'Apr', value: 22.0, label: '22 clients' },
    { month: 'May', value: 28.0, label: '28 clients' },
    { month: 'Jun', value: 33.5, label: '34 clients' },
    { month: 'Jul', value: 40.0, label: '40 clients' },
    { month: 'Aug', value: 48.0, label: '48 clients' },
  ],
};

export default function AdminPortalView({ onBackToLanding, themeColor: initialThemeColor, onThemeChange }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 980;
  const scrollY = useRef(new Animated.Value(0)).current;

  // View state: 'login' | 'portal'
  const [viewState, setViewState] = useState('portal');
  const [email, setEmail] = useState('admin@platinumsoftware.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotPasswordAlert, setForgotPasswordAlert] = useState(false);

  // Active navigation tab
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Live clock
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Search & Notifications State
  const [globalSearch, setGlobalSearch] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [reportActionMessage, setReportActionMessage] = useState(null);

  // Growth Chart State
  const [selectedGrowthFilter, setSelectedGrowthFilter] = useState('Last 6 Months');
  const [showGrowthDropdown, setShowGrowthDropdown] = useState(false);
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);

  // ==========================================
  // CLIENTS MODULE STATE
  // ==========================================
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [clientSearch, setClientSearch] = useState('');
  const [clientIndustryFilter, setClientIndustryFilter] = useState('All Industries');
  const [clientPlanFilter, setClientPlanFilter] = useState('All Plans');
  const [clientStatusFilter, setClientStatusFilter] = useState('All Statuses');

  // Client Modals
  const [selectedClientModal, setSelectedClientModal] = useState(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [editingClientModal, setEditingClientModal] = useState(null);
  const [clientActionMessage, setClientActionMessage] = useState(null);

  // Client Form State
  const [clientFormName, setClientFormName] = useState('');
  const [clientFormIndustry, setClientFormIndustry] = useState('IT Services');
  const [clientFormSize, setClientFormSize] = useState('51 - 200 employees');
  const [clientFormWebsite, setClientFormWebsite] = useState('');
  const [clientFormContact, setClientFormContact] = useState('');
  const [clientFormDesignation, setClientFormDesignation] = useState('');
  const [clientFormEmail, setClientFormEmail] = useState('');
  const [clientFormPhone, setClientFormPhone] = useState('');
  const [clientFormPlan, setClientFormPlan] = useState('Gold');
  const [clientFormStartDate, setClientFormStartDate] = useState('18 Sep 2025');
  const [clientFormEndDate, setClientFormEndDate] = useState('18 Sep 2026');
  const [clientFormStatus, setClientFormStatus] = useState('Active');
  const [clientFormNotes, setClientFormNotes] = useState('');

  // ==========================================
  // PLANS MODULE STATE
  // ==========================================
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [planSearch, setPlanSearch] = useState('');
  const [planStatusFilter, setPlanStatusFilter] = useState('All Statuses');

  // Plan Modals
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [editingPlanModal, setEditingPlanModal] = useState(null);
  const [planActionMessage, setPlanActionMessage] = useState(null);

  // Plan Form State
  const [planFormName, setPlanFormName] = useState('');
  const [planFormType, setPlanFormType] = useState('Subscription');
  const [planFormShortDesc, setPlanFormShortDesc] = useState('');
  const [planFormDetailedDesc, setPlanFormDetailedDesc] = useState('');
  const [planFormPrice, setPlanFormPrice] = useState('₹9,999');
  const [planFormBilling, setPlanFormBilling] = useState('Monthly');
  const [planFormValidity, setPlanFormValidity] = useState('12');
  const [planFormCurrency, setPlanFormCurrency] = useState('INR (₹)');
  const [planFormMaxQueries, setPlanFormMaxQueries] = useState('2,500');
  const [planFormKeyFeatures, setPlanFormKeyFeatures] = useState('Up to 2,500 queries/month\nStandard LLM model\nEmail support\nBasic analytics');
  const [planFormMaxUsers, setPlanFormMaxUsers] = useState('10');
  const [planFormStorage, setPlanFormStorage] = useState('20 MB');
  const [planFormStatus, setPlanFormStatus] = useState('Active');
  const [planFormDisplayOrder, setPlanFormDisplayOrder] = useState('5');

  // ==========================================
  // MASTER SETTINGS MODULE STATE
  // ==========================================
  const [settingsTab, setSettingsTab] = useState('Role Management');
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [roleSearch, setRoleSearch] = useState('');
  const [roleStatusFilter, setRoleStatusFilter] = useState('All Status');
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [editingRoleModal, setEditingRoleModal] = useState(null);
  const [roleActionMessage, setRoleActionMessage] = useState(null);

  // Role Form
  const [roleFormName, setRoleFormName] = useState('');
  const [roleFormDesc, setRoleFormDesc] = useState('');
  const [roleFormStatus, setRoleFormStatus] = useState('Active');
  const [roleFormPermissions, setRoleFormPermissions] = useState(['Dashboard', 'Reports']);

  // System Configurations
  const [configs, setConfigs] = useState(INITIAL_CONFIGS);
  const [configSearch, setConfigSearch] = useState('');
  const [showAddConfigModal, setShowAddConfigModal] = useState(false);
  const [configFormName, setConfigFormName] = useState('');
  const [configFormDesc, setConfigFormDesc] = useState('');
  const [configFormValue, setConfigFormValue] = useState('');

  // General Settings Form
  const [platformName, setPlatformName] = useState('Platinum Software');
  const [platformDesc, setPlatformDesc] = useState('AI Chatbot Platform for Businesses');
  const [platformUrl, setPlatformUrl] = useState('https://admin.platinumai.com');
  const [supportEmail, setSupportEmail] = useState('support@platinumsoftware.com');
  const [defaultLang, setDefaultLang] = useState('English');
  const [timeZone, setTimeZone] = useState('Asia/Kolkata (IST)');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('12 Hour (AM/PM)');
  const [prefTitleInBrowser, setPrefTitleInBrowser] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [prefLogging, setPrefLogging] = useState(true);
  const [settingsSavedAlert, setSettingsSavedAlert] = useState(false);

  // Appearance & Branding Form
  const [brandingTagline, setBrandingTagline] = useState('AI Chatbot Platform');
  const [brandingFooter, setBrandingFooter] = useState('© 2025 Platinum Software. All rights reserved.');
  const [primaryColor, setPrimaryColor] = useState(() => {
    try {
      if (initialThemeColor) return initialThemeColor;
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem('platinum_brand_color') || '#0066FF';
      }
    } catch (e) {}
    return '#0066FF';
  });

  useEffect(() => {
    if (initialThemeColor && initialThemeColor !== primaryColor) {
      setPrimaryColor(initialThemeColor);
    }
  }, [initialThemeColor]);

  const brandColor = primaryColor || '#0066FF';

  const applyBrandColor = (newColor) => {
    setPrimaryColor(newColor);
    onThemeChange?.(newColor);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('platinum_brand_color', newColor);
      }
    } catch (e) {}
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--primary-color', newColor);
      document.documentElement.style.setProperty('--brand-primary', newColor);
      let styleTag = document.getElementById('platinum-dynamic-theme');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'platinum-dynamic-theme';
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = `
        :root {
          --primary-color: ${newColor} !important;
          --brand-primary: ${newColor} !important;
        }
      `;
    }
  };

  const [brandingSavedAlert, setBrandingSavedAlert] = useState(false);

  // ==========================================
  // SUBSCRIPTIONS MODULE STATE
  // ==========================================
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  const [subSearch, setSubSearch] = useState('');
  const [subStatusFilter, setSubStatusFilter] = useState('All Statuses');
  const [subPlanFilter, setSubPlanFilter] = useState('All Plans');
  const [subDateFilter, setSubDateFilter] = useState('All Time');
  const [showAddSubModal, setShowAddSubModal] = useState(false);
  const [selectedSubModal, setSelectedSubModal] = useState(null);
  const [editingSubModal, setEditingSubModal] = useState(null);
  const [subActionMessage, setSubActionMessage] = useState(null);

  // Subscription Form State
  const [subFormClient, setSubFormClient] = useState('');
  const [subFormContact, setSubFormContact] = useState('');
  const [subFormPlan, setSubFormPlan] = useState('Gold');
  const [subFormStartDate, setSubFormStartDate] = useState('');
  const [subFormEndDate, setSubFormEndDate] = useState('');
  const [subFormBilling, setSubFormBilling] = useState('Monthly');
  const [subFormUsers, setSubFormUsers] = useState('');
  const [subFormAmount, setSubFormAmount] = useState('');
  const [subFormStatus, setSubFormStatus] = useState('Active');
  const [subFormNotes, setSubFormNotes] = useState('');

  // ==========================================
  // LLM DATA IMPORT MODULE STATE
  // ==========================================
  const [imports, setImports] = useState(INITIAL_IMPORTS);
  const [importSearch, setImportSearch] = useState('');
  const [importTab, setImportTab] = useState('Import History');
  const [importClientFilter, setImportClientFilter] = useState('All Clients');
  const [importStatusFilter, setImportStatusFilter] = useState('All Statuses');
  const [importDateFilter, setImportDateFilter] = useState('All Time');
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedImportModal, setSelectedImportModal] = useState(null);

  // Import Form State
  const [importFormClient, setImportFormClient] = useState('');
  const [importFormSource, setImportFormSource] = useState('Client Upload');
  const [importFormChunkSize, setImportFormChunkSize] = useState('512');
  const [importFormOverlap, setImportFormOverlap] = useState('50');
  const [importFormNotes, setImportFormNotes] = useState('');

  // ==========================================
  // REPORTS MODULE STATE
  // ==========================================
  const [reportTab, setReportTab] = useState('Overview');
  const [reportClientFilter, setReportClientFilter] = useState('All Clients');
  const [reportSubFilter, setReportSubFilter] = useState('All Subscriptions');
  const [reportDateFrom, setReportDateFrom] = useState('01 Sep 2025');
  const [reportDateTo, setReportDateTo] = useState('30 Sep 2025');
  const [reportStatusFilter, setReportStatusFilter] = useState('All Statuses');
  const [reportPlanFilter, setReportPlanFilter] = useState('All Plans');
  const [reportGenerating, setReportGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Dropdown open toggles for filter bars
  const [subPlanOpen, setSubPlanOpen] = useState(false);
  const [subStatusOpen, setSubStatusOpen] = useState(false);
  const [subDateOpen, setSubDateOpen] = useState(false);

  const [impClientOpen, setImpClientOpen] = useState(false);
  const [impStatusOpen, setImpStatusOpen] = useState(false);
  const [impDateOpen, setImpDateOpen] = useState(false);

  const [repTopDateOpen, setRepTopDateOpen] = useState(false);
  const [repTopDateRange, setRepTopDateRange] = useState('01 Sep 2025 — 30 Sep 2025');
  const [repClientOpen, setRepClientOpen] = useState(false);
  const [repPlanOpen, setRepPlanOpen] = useState(false);
  const [repStatusOpen, setRepStatusOpen] = useState(false);
  const [repDateRangeOpen, setRepDateRangeOpen] = useState(false);

  // Dynamic Reports Metrics Dataset per Time Interval
  const REPORT_METRICS_MAP = {
    '01 Sep 2025 — 30 Sep 2025': {
      questions: '1,24,532',
      qTrend: '18%',
      activeClients: '48',
      cTrend: '9%',
      users: '2,356',
      uTrend: '12%',
      latency: '2.3 sec',
      lTrend: '28%',
      revenue: '₹12,49,000',
      rTrend: '15%',
      periodLabel: 'this period',
      subtext: 'vs previous period',
      chartPoints: [[30,90],[100,80],[170,60],[240,40],[310,48],[380,30],[430,15]],
      chartPath: "M 30,90 Q 75,70 100,80 T 170,60 T 240,40 T 310,48 T 380,30 L 430,15",
      chartFill: "M 30,95 L 30,90 Q 75,70 100,80 T 170,60 T 240,40 T 310,48 T 380,30 L 430,15 L 430,120 L 30,120 Z",
    },
    'Last 30 Days': {
      questions: '1,32,840',
      qTrend: '21%',
      activeClients: '49',
      cTrend: '11%',
      users: '2,410',
      uTrend: '14%',
      latency: '2.1 sec',
      lTrend: '32%',
      revenue: '₹13,10,000',
      rTrend: '18%',
      periodLabel: 'last 30 days',
      subtext: 'vs prior 30 days',
      chartPoints: [[30,80],[100,68],[170,52],[240,36],[310,40],[380,24],[430,10]],
      chartPath: "M 30,80 Q 75,60 100,68 T 170,52 T 240,36 T 310,40 T 380,24 L 430,10",
      chartFill: "M 30,85 L 30,80 Q 75,60 100,68 T 170,52 T 240,36 T 310,40 T 380,24 L 430,10 L 430,120 L 30,120 Z",
    },
    'Last Quarter': {
      questions: '3,89,120',
      qTrend: '34%',
      activeClients: '45',
      cTrend: '15%',
      users: '2,180',
      uTrend: '25%',
      latency: '2.5 sec',
      lTrend: '19%',
      revenue: '₹36,50,000',
      rTrend: '28%',
      periodLabel: 'last quarter',
      subtext: 'vs previous quarter',
      chartPoints: [[30,100],[100,85],[170,70],[240,55],[310,50],[380,35],[430,20]],
      chartPath: "M 30,100 Q 75,80 100,85 T 170,70 T 240,55 T 310,50 T 380,35 L 430,20",
      chartFill: "M 30,105 L 30,100 Q 75,80 100,85 T 170,70 T 240,55 T 310,50 T 380,35 L 430,20 L 430,120 L 30,120 Z",
    },
    'Year to Date': {
      questions: '11,45,600',
      qTrend: '68%',
      activeClients: '52',
      cTrend: '42%',
      users: '2,680',
      uTrend: '55%',
      latency: '2.2 sec',
      lTrend: '35%',
      revenue: '₹1,12,00,000',
      rTrend: '62%',
      periodLabel: 'year to date',
      subtext: 'vs previous year',
      chartPoints: [[30,110],[100,90],[170,75],[240,45],[310,35],[380,20],[430,8]],
      chartPath: "M 30,110 Q 75,90 100,90 T 170,75 T 240,45 T 310,35 T 380,20 L 430,8",
      chartFill: "M 30,115 L 30,110 Q 75,90 100,90 T 170,75 T 240,45 T 310,35 T 380,20 L 430,8 L 430,120 L 30,120 Z",
    },
    'Custom Range': {
      questions: '86,400',
      qTrend: '10%',
      activeClients: '46',
      cTrend: '7%',
      users: '1,940',
      uTrend: '8%',
      latency: '2.4 sec',
      lTrend: '22%',
      revenue: '₹8,90,000',
      rTrend: '12%',
      periodLabel: 'custom period',
      subtext: 'vs prior equivalent',
      chartPoints: [[30,85],[100,75],[170,65],[240,50],[310,55],[380,40],[430,25]],
      chartPath: "M 30,85 Q 75,70 100,75 T 170,65 T 240,50 T 310,55 T 380,40 L 430,25",
      chartFill: "M 30,90 L 30,85 Q 75,70 100,75 T 170,65 T 240,50 T 310,55 T 380,40 L 430,25 L 430,120 L 30,120 Z",
    },
  };


  // Current growth dataset
  const currentGrowthData = GROWTH_DATA_MAP[selectedGrowthFilter] || GROWTH_DATA_MAP['Last 6 Months'];

  const notifyAction = (setter, msg) => {
    setter(msg);
    setTimeout(() => setter(null), 3000);
  };

  // =========================================================
  // LOGIN SCREEN (Matching PDF Page 2)
  // =========================================================
  if (viewState === 'login') {
    return (
      <View style={styles.loginContainer}>
        <ScrollAnimation scrollY={scrollY} />
        <View style={styles.topBackNav}>
          <TouchableOpacity style={styles.backBtn} onPress={onBackToLanding}>
            <Feather name="arrow-left" size={16} color="#0066FF" style={{ marginRight: 6 }} />
            <Text style={styles.backBtnText}>Back to Landing Page</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.loginCardWrapper, isMobile && styles.loginCardWrapperMobile]}>
          {!isMobile && (
            <View style={styles.loginLeftPane}>
              <View style={styles.paneLogoRow}>
                <MaterialCommunityIcons name="hexagon-multiple" size={28} color="#FFFFFF" />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.paneLogoTitle}>PLATINUM SOFTWARE</Text>
                  <Text style={styles.paneLogoSub}>AI Chatbot Platform</Text>
                </View>
              </View>

              <Text style={styles.paneHeroTitle}>Powering{'\n'}Smarter{'\n'}Organizations</Text>
              <Text style={styles.paneHeroDesc}>
                A secure, multi-tenant AI platform that helps organizations integrate knowledge,
                automate support, and make better decisions.
              </Text>

              <View style={styles.paneFeaturesList}>
                <PaneFeature icon="account-group-outline" title="Manage Clients" desc="Handle organizations, subscriptions, and plans." />
                <PaneFeature icon="chart-bar" title="Gain Insights" desc="Monitor usage and generate reports." />
                <PaneFeature icon="cog-outline" title="Control & Configure" desc="Manage platform settings with ease." />
                <PaneFeature icon="shield-check-outline" title="Enterprise-Grade Security" desc="Your data. Always protected." />
              </View>

              <Text style={styles.paneFooterText}>Smarter Knowledge. Brighter Possibilities.</Text>
            </View>
          )}

          <View style={styles.loginRightPane}>
            <View style={styles.loginRightHeader}>
              <View style={styles.loginTopSecurityTag}>
                <Feather name="shield" size={12} color="#10B981" style={{ marginRight: 4 }} />
                <Text style={styles.loginTopSecurityTagText}>Secure | Reliable | Scalable</Text>
              </View>
              <View style={styles.loginLogoIconRow}>
                <MaterialCommunityIcons name="hexagon-multiple" size={32} color="#0066FF" />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.rightHeaderTitle}>PLATINUM SOFTWARE</Text>
                  <Text style={styles.rightHeaderSub}>AI Chatbot Platform</Text>
                </View>
              </View>
            </View>

            <View style={styles.loginFormBox}>
              <Text style={styles.loginFormHeading}>Administrator Login</Text>
              <Text style={styles.loginFormSub}>Sign in to access the Platinum Software Admin Portal.</Text>

              {forgotPasswordAlert && (
                <View style={styles.forgotAlertBox}>
                  <Feather name="info" size={15} color="#0066FF" style={{ marginRight: 6 }} />
                  <Text style={styles.forgotAlertText}>
                    Password recovery link has been dispatched to {email}. Check your inbox.
                  </Text>
                </View>
              )}

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email Address</Text>
                <View style={styles.inputBox}>
                  <Feather name="mail" size={16} color="#94A3B8" style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.textInput}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your official email"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Password</Text>
                <View style={styles.inputBox}>
                  <Feather name="lock" size={16} color="#94A3B8" style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? 'eye-off' : 'eye'} size={16} color="#94A3B8" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.loginOptsRow}>
                <TouchableOpacity
                  style={styles.rememberRow}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons
                    name={rememberMe ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={18}
                    color={rememberMe ? '#0066FF' : '#94A3B8'}
                  />
                  <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setForgotPasswordAlert(true)}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.signInPrimaryBtn}
                onPress={() => setViewState('portal')}
                activeOpacity={0.85}
              >
                <Text style={styles.signInPrimaryBtnText}>Sign In</Text>
                <Feather name="arrow-right" size={16} color="#FFFFFF" style={{ marginLeft: 8 }} />
              </TouchableOpacity>

              <View style={styles.adminPortalWarningBanner}>
                <MaterialCommunityIcons name="shield-lock-outline" size={18} color="#0284C7" style={{ marginRight: 8, marginTop: 1 }} />
                <Text style={styles.adminPortalWarningText}>
                  This portal is for authorized Platinum Software administrators only. Unauthorized access is prohibited.
                </Text>
              </View>
            </View>

            <Text style={styles.portalFooterCopy}>
              © 2025 Platinum Software. All rights reserved. | Privacy Policy | Terms of Service | Contact Us
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // =========================================================
  // ADMIN PORTAL MAIN SHELL (Sidebar + Topbar + Content Area)
  // =========================================================
  // ---- live date/time helpers ----
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const liveDay = dayNames[now.getDay()];
  const liveDate = now.getDate();
  const liveMonth = monthNames[now.getMonth()];
  const liveYear = now.getFullYear();
  const liveHour = now.getHours();
  const liveMin = String(now.getMinutes()).padStart(2, '0');
  const liveSec = String(now.getSeconds()).padStart(2, '0');
  const liveAmPm = liveHour >= 12 ? 'PM' : 'AM';
  const liveHour12 = liveHour % 12 || 12;
  const liveDateStr = `${liveDay}, ${liveDate} ${liveMonth} ${liveYear}`;
  const liveTimeStr = `${liveHour12}:${liveMin}:${liveSec} ${liveAmPm}`;

  return (
    <View style={styles.portalContainer}>
      {/* 1. LEFT SIDEBAR */}
      {!isMobile && (
        <View style={[styles.sidebar, sidebarCollapsed && styles.sidebarCollapsed]}>
          {/* Logo Row */}
          <View style={[styles.sidebarLogoRow, sidebarCollapsed && { justifyContent: 'center', paddingHorizontal: 0 }]}>
            <View style={[styles.sidebarLogoIconBox, { backgroundColor: brandColor }]}>
              <MaterialCommunityIcons name="hexagon-multiple" size={24} color="#FFFFFF" />
            </View>
            {!sidebarCollapsed && (
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.sidebarBrandTitle}>PLATINUM SOFTWARE</Text>
                <Text style={styles.sidebarBrandSub}>AI Chatbot Platform</Text>
              </View>
            )}
          </View>

          <View style={styles.sidebarMenuList}>
            {[
              { id: 'Dashboard', label: 'Dashboard', icon: 'home-outline' },
              { id: 'Clients', label: 'Clients', icon: 'account-group-outline' },
              { id: 'Plans', label: 'Plans', icon: 'card-bulleted-outline' },
              { id: 'Subscriptions', label: 'Subscriptions', icon: 'receipt-text-outline' },
              { id: 'LLM Data Import', label: 'LLM Data Import', icon: 'cloud-sync-outline' },
              { id: 'Reports', label: 'Reports', icon: 'chart-box-outline' },
              { id: 'Master Settings', label: 'Master Settings', icon: 'cog-outline' },
            ].map((item) => {
              const isActive = activeNav === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.sidebarNavItem, isActive && styles.sidebarNavItemActive, isActive && { backgroundColor: brandColor }, sidebarCollapsed && { justifyContent: 'center', paddingHorizontal: 0 }]}
                  onPress={() => setActiveNav(item.id)}
                  activeOpacity={0.85}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={20}
                    color={isActive ? '#FFFFFF' : '#8F9BB3'}
                    style={{ marginRight: sidebarCollapsed ? 0 : 14 }}
                  />
                  {!sidebarCollapsed && (
                    <Text style={[styles.sidebarNavText, isActive && styles.sidebarNavTextActive]}>
                      {item.label}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ flex: 1 }} />

          {!sidebarCollapsed && (
            <TouchableOpacity
              style={styles.needHelpCard}
              onPress={() => alert('Platinum Support: support@platinumsoftware.com')}
              activeOpacity={0.8}
            >
              <View style={styles.needHelpLeft}>
                <View style={styles.headphoneIconBox}>
                  <MaterialCommunityIcons name="headphones" size={18} color="#0066FF" />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.needHelpTitle}>Need Help?</Text>
                  <Text style={styles.needHelpSub}>Contact Support</Text>
                </View>
              </View>
              <Feather name="arrow-right" size={16} color="#0066FF" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* 2. MAIN AREA */}
      <View style={styles.mainArea}>
        {/* Topbar */}
        <View style={styles.topNavbar}>
          {/* Hamburger Toggle Button */}
          <TouchableOpacity
            style={styles.hamburgerBtn}
            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
            activeOpacity={0.7}
          >
            <Feather name={sidebarCollapsed ? 'menu' : 'sidebar'} size={20} color="#475569" />
          </TouchableOpacity>

          <View style={styles.topSearchBox}>
            <Feather name="search" size={16} color="#94A3B8" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Search clients, plans, reports..."
              placeholderTextColor="#94A3B8"
              value={globalSearch}
              onChangeText={setGlobalSearch}
              style={styles.topSearchInput}
            />
          </View>

          <View style={styles.topNavRight}>
            <TouchableOpacity
              style={styles.bellBtn}
              onPress={() => setShowNotifications(!showNotifications)}
            >
              <Feather name="bell" size={19} color="#475569" />
              <View style={styles.bellBadge}>
                <Text style={styles.bellBadgeText}>3</Text>
              </View>
            </TouchableOpacity>

            <View style={{ position: 'relative', zIndex: 300 }}>
              <TouchableOpacity
                style={[styles.adminUserChip, showAdminMenu && { borderColor: brandColor, backgroundColor: '#F8FAFC' }]}
                onPress={() => {
                  setShowAdminMenu(!showAdminMenu);
                  setShowNotifications(false);
                }}
                activeOpacity={0.8}
              >
                <View style={[styles.adminAvatarCircle, { backgroundColor: brandColor }]}>
                  <Text style={styles.adminAvatarLetter}>A</Text>
                </View>
                <View style={{ marginLeft: 8, marginRight: 6 }}>
                  <Text style={styles.adminUserName}>Admin</Text>
                  <Text style={styles.adminOrgName}>Platinum Software</Text>
                </View>
                <Feather name={showAdminMenu ? "chevron-up" : "chevron-down"} size={14} color={showAdminMenu ? brandColor : "#64748B"} />
              </TouchableOpacity>

              {showAdminMenu && (
                <View style={styles.adminMenuDropdown}>
                  <View style={styles.adminMenuHeader}>
                    <View style={[styles.adminAvatarCircle, { backgroundColor: brandColor, width: 36, height: 36 }]}>
                      <Text style={[styles.adminAvatarLetter, { fontSize: 16 }]}>A</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F172A' }}>Admin User</Text>
                      <Text style={{ fontSize: 11, color: '#64748B' }}>admin@platinumsoftware.com</Text>
                      <View style={[styles.adminRolePill, { backgroundColor: '#EFF6FF', marginTop: 4 }]}>
                        <Text style={[styles.adminRolePillText, { color: brandColor }]}>Super Administrator</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.adminMenuDivider} />

                  <TouchableOpacity
                    style={styles.adminMenuItem}
                    onPress={() => {
                      setActiveNav('Master Settings');
                      setSettingsTab('Appearance & Branding');
                      setShowAdminMenu(false);
                    }}
                  >
                    <Feather name="layout" size={15} color="#64748B" style={{ marginRight: 10 }} />
                    <Text style={styles.adminMenuItemText}>Theme & Branding</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.adminMenuItem}
                    onPress={() => {
                      setActiveNav('Master Settings');
                      setSettingsTab('General Settings');
                      setShowAdminMenu(false);
                    }}
                  >
                    <Feather name="sliders" size={15} color="#64748B" style={{ marginRight: 10 }} />
                    <Text style={styles.adminMenuItemText}>Platform Preferences</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.adminMenuItem}
                    onPress={() => {
                      setActiveNav('Master Settings');
                      setSettingsTab('Role Management');
                      setShowAdminMenu(false);
                    }}
                  >
                    <Feather name="shield" size={15} color="#64748B" style={{ marginRight: 10 }} />
                    <Text style={styles.adminMenuItemText}>Roles & Permissions</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.adminMenuItem}
                    onPress={() => {
                      setShowAdminMenu(false);
                      onBackToLanding?.();
                    }}
                  >
                    <Feather name="globe" size={15} color="#64748B" style={{ marginRight: 10 }} />
                    <Text style={styles.adminMenuItemText}>Back to Landing Page</Text>
                  </TouchableOpacity>

                  <View style={styles.adminMenuDivider} />

                  <TouchableOpacity
                    style={[styles.adminMenuItem, { paddingVertical: 10 }]}
                    onPress={() => {
                      setShowAdminMenu(false);
                      setViewState('login');
                    }}
                  >
                    <Feather name="log-out" size={15} color="#EF4444" style={{ marginRight: 10 }} />
                    <Text style={[styles.adminMenuItemText, { color: '#EF4444', fontWeight: '600' }]}>Sign Out</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.exitIconBtn}
              onPress={() => setViewState('login')}
              accessibilityLabel="Sign out"
            >
              <Feather name="log-out" size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>

        {showNotifications && (
          <View style={styles.notificationDropdown}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationHeaderTitle}>System Notifications (3)</Text>
              <TouchableOpacity onPress={() => setShowNotifications(false)}>
                <Feather name="x" size={14} color="#64748B" />
              </TouchableOpacity>
            </View>
            <NotificationItem text="New client 'EduSmart Learning' added" time="2 hours ago" dotColor="#0066FF" />
            <NotificationItem text="Subscription for 'HealthPlus' renewed" time="5 hours ago" dotColor="#10B981" />
            <NotificationItem text="LLM data import completed for 'AutoDrive Ltd'" time="1 day ago" dotColor="#7C3AED" />
          </View>
        )}

        <ScrollView style={styles.scrollBody} contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
          {clientActionMessage && (
            <View style={styles.actionSuccessToast}>
              <Feather name="check-circle" size={16} color="#059669" style={{ marginRight: 8 }} />
              <Text style={styles.actionSuccessToastText}>{clientActionMessage}</Text>
            </View>
          )}

          {planActionMessage && (
            <View style={styles.actionSuccessToast}>
              <Feather name="check-circle" size={16} color="#059669" style={{ marginRight: 8 }} />
              <Text style={styles.actionSuccessToastText}>{planActionMessage}</Text>
            </View>
          )}

          {roleActionMessage && (
            <View style={styles.actionSuccessToast}>
              <Feather name="check-circle" size={16} color="#059669" style={{ marginRight: 8 }} />
              <Text style={styles.actionSuccessToastText}>{roleActionMessage}</Text>
            </View>
          )}

          {/* ========================================================= */}
          {/* DASHBOARD TAB (Exact Matching Layout of Uploaded Image)   */}
          {/* ========================================================= */}
          {activeNav === 'Dashboard' && (
            <>
              <View style={styles.greetingHeaderRow}>
                <View>
                  <Text style={styles.greetingTitle}>Welcome back, Admin! 👋</Text>
                  <Text style={styles.greetingSubtitle}>Here's an overview of your AI chatbot platform.</Text>
                </View>
                <View style={styles.headerDateBadge}>
                  <Text style={styles.headerDateText}>{liveDateStr}  |  {liveTimeStr}</Text>
                </View>
              </View>

              {/* 1. OVERVIEW / 4 KPI CARDS */}
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#EBF3FF' }]}>
                    <MaterialCommunityIcons name="office-building" size={24} color="#0066FF" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Total Clients</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>48</Text>
                      <View style={styles.kpiTrendBadge}>
                        <Feather name="arrow-up-right" size={12} color="#10B981" />
                        <Text style={styles.kpiTrendText}>12%</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>+5 new this month</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#ECFDF5' }]}>
                    <MaterialCommunityIcons name="account-group" size={24} color="#10B981" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Active Clients</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>42</Text>
                      <View style={styles.kpiTrendBadge}>
                        <Feather name="arrow-up-right" size={12} color="#10B981" />
                        <Text style={styles.kpiTrendText}>8%</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>87.5% of total</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#F3E8FF' }]}>
                    <MaterialCommunityIcons name="database" size={24} color="#8B5CF6" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Total Subscriptions</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>52</Text>
                      <View style={styles.kpiTrendBadge}>
                        <Feather name="arrow-up-right" size={12} color="#10B981" />
                        <Text style={styles.kpiTrendText}>15%</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>across all plans</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#E0F2FE' }]}>
                    <MaterialCommunityIcons name="file-document-outline" size={24} color="#0284C7" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Total Documents</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>12,480</Text>
                      <View style={styles.kpiTrendBadge}>
                        <Feather name="arrow-up-right" size={12} color="#10B981" />
                        <Text style={styles.kpiTrendText}>22%</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>uploaded by clients</Text>
                  </View>
                </View>
              </View>

              {/* 2. MIDDLE ROW: Client Growth | Subscriptions by Plan | Recent Activity */}
              <View style={[styles.middleGridRow, isMobile && styles.middleGridRowMobile]}>
                {/* 2.1 Client Growth Area Chart Card */}
                <View style={[styles.contentCard, { flex: 1.15 }]}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardHeaderTitle}>Client Growth</Text>
                    <View style={{ position: 'relative' }}>
                      <TouchableOpacity
                        style={styles.timeFilterPill}
                        onPress={() => setShowGrowthDropdown(!showGrowthDropdown)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.timeFilterPillText}>{selectedGrowthFilter}</Text>
                        <Feather name="chevron-down" size={13} color="#64748B" style={{ marginLeft: 4 }} />
                      </TouchableOpacity>

                      {showGrowthDropdown && (
                        <View style={styles.timeFilterDropdownMenu}>
                          {['Last 3 Months', 'Last 6 Months', 'Year to Date'].map((opt) => (
                            <TouchableOpacity
                              key={opt}
                              style={styles.dropdownMenuItem}
                              onPress={() => {
                                setSelectedGrowthFilter(opt);
                                setShowGrowthDropdown(false);
                              }}
                            >
                              <Text
                                style={[
                                  styles.dropdownMenuItemText,
                                  selectedGrowthFilter === opt && { color: '#0066FF', fontWeight: '700' },
                                ]}
                              >
                                {opt}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>

                  {(() => {
                    const points = currentGrowthData.map((d, index) => {
                      const x = 50 + (index / (currentGrowthData.length - 1)) * (496 - 50);
                      const y = 184 - (d.value / 50) * (184 - 24);
                      return { ...d, x, y };
                    });
                    const linePathD = points.reduce((acc, pt, idx) => acc + (idx === 0 ? 'M ' : ' L ') + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1), '');
                    const areaPathD = linePathD + ' L ' + points[points.length - 1].x.toFixed(1) + ' 184 L ' + points[0].x.toFixed(1) + ' 184 Z';

                    return (
                      <View style={{ width: '100%', marginTop: 6 }}>
                        <svg viewBox="0 0 524 220" style={{ width: '100%', height: 210, overflow: 'visible' }}>
                          <defs>
                            <linearGradient id="exactClientGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.38" />
                              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.02" />
                            </linearGradient>
                          </defs>

                          <line x1="34" y1="24" x2="506" y2="24" stroke="#EEF2F6" strokeWidth="1.2" />
                          <line x1="34" y1="56" x2="506" y2="56" stroke="#EEF2F6" strokeWidth="1.2" />
                          <line x1="34" y1="88" x2="506" y2="88" stroke="#EEF2F6" strokeWidth="1.2" />
                          <line x1="34" y1="120" x2="506" y2="120" stroke="#EEF2F6" strokeWidth="1.2" />
                          <line x1="34" y1="152" x2="506" y2="152" stroke="#EEF2F6" strokeWidth="1.2" />
                          <line x1="34" y1="184" x2="506" y2="184" stroke="#EEF2F6" strokeWidth="1.2" />

                          <text x="24" y="28" fill="#64748B" fontSize="12" fontWeight="500" textAnchor="end" fontFamily="sans-serif">50</text>
                          <text x="24" y="60" fill="#64748B" fontSize="12" fontWeight="500" textAnchor="end" fontFamily="sans-serif">40</text>
                          <text x="24" y="92" fill="#64748B" fontSize="12" fontWeight="500" textAnchor="end" fontFamily="sans-serif">30</text>
                          <text x="24" y="124" fill="#64748B" fontSize="12" fontWeight="500" textAnchor="end" fontFamily="sans-serif">20</text>
                          <text x="24" y="156" fill="#64748B" fontSize="12" fontWeight="500" textAnchor="end" fontFamily="sans-serif">10</text>
                          <text x="24" y="188" fill="#64748B" fontSize="12" fontWeight="500" textAnchor="end" fontFamily="sans-serif">0</text>

                          <path d={areaPathD} fill="url(#exactClientGrowthGrad)" />
                          <path d={linePathD} fill="none" stroke="#0066FF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />

                          {points.map((pt, idx) => (
                            <g
                              key={idx}
                              style={{ cursor: 'pointer' }}
                              onMouseEnter={() => setHoveredDataPoint(idx)}
                              onMouseLeave={() => setHoveredDataPoint(null)}
                            >
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r={hoveredDataPoint === idx ? 6.5 : 5}
                                fill="#0066FF"
                                stroke="#FFFFFF"
                                strokeWidth={hoveredDataPoint === idx ? 3 : 2.5}
                              />
                              {hoveredDataPoint === idx && (
                                <g>
                                  <rect x={pt.x - 40} y={pt.y - 34} width="80" height="24" rx="6" fill="#0F172A" />
                                  <text x={pt.x} y={pt.y - 18} fill="#FFFFFF" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
                                    {pt.label}
                                  </text>
                                </g>
                              )}
                            </g>
                          ))}

                          {points.map((pt, idx) => (
                            <text key={idx} x={pt.x} y="210" fill="#64748B" fontSize="12" fontWeight="500" textAnchor="middle" fontFamily="sans-serif">
                              {pt.month}
                            </text>
                          ))}
                        </svg>
                      </View>
                    );
                  })()}
                </View>

                {/* 2.2 Subscriptions by Plan (Exact Donut Chart) */}
                <View style={[styles.contentCard, { flex: 0.95 }]}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardHeaderTitle}>Subscriptions by Plan</Text>
                  </View>

                  <View style={styles.donutVisualLayout}>
                    <View style={styles.donutRingOuter}>
                      <View style={styles.donutRingHole}>
                        <Text style={styles.donutCenterBigNum}>52</Text>
                        <Text style={styles.donutCenterSub}>Total</Text>
                      </View>
                    </View>

                    <View style={styles.donutLegendCol}>
                      <View style={styles.donutLegendRow}>
                        <View style={[styles.legendColorDot, { backgroundColor: '#0066FF' }]} />
                        <Text style={styles.legendPlanName}>Gold</Text>
                        <Text style={styles.legendPlanMetric}>24 (46%)</Text>
                      </View>
                      <View style={styles.donutLegendRow}>
                        <View style={[styles.legendColorDot, { backgroundColor: '#8B5CF6' }]} />
                        <Text style={styles.legendPlanName}>Silver</Text>
                        <Text style={styles.legendPlanMetric}>14 (27%)</Text>
                      </View>
                      <View style={styles.donutLegendRow}>
                        <View style={[styles.legendColorDot, { backgroundColor: '#06B6D4' }]} />
                        <Text style={styles.legendPlanName}>Platinum</Text>
                        <Text style={styles.legendPlanMetric}>10 (19%)</Text>
                      </View>
                      <View style={styles.donutLegendRow}>
                        <View style={[styles.legendColorDot, { backgroundColor: '#64748B' }]} />
                        <Text style={styles.legendPlanName}>Others</Text>
                        <Text style={styles.legendPlanMetric}>4 (8%)</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* 2.3 Recent Activity */}
                <View style={[styles.contentCard, { flex: 1.0 }]}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardHeaderTitle}>Recent Activity</Text>
                    <TouchableOpacity onPress={() => setActiveNav('Reports')}>
                      <Text style={styles.viewAllActionLink}>View All →</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.activityFeedList}>
                    <ActivityFeedItem icon="account-plus-outline" iconColor="#10B981" iconBg="#ECFDF5" title='New client "EduSmart Learning" added' time="2 hours ago" />
                    <ActivityFeedItem icon="refresh" iconColor="#0066FF" iconBg="#EFF6FF" title='Subscription for "HealthPlus" renewed' time="5 hours ago" />
                    <ActivityFeedItem icon="file-document-outline" iconColor="#EF4444" iconBg="#FEF2F2" title='LLM data import completed for "AutoDrive Ltd"' time="1 day ago" />
                    <ActivityFeedItem icon="star-outline" iconColor="#F59E0B" iconBg="#FFFBEB" title='Plan "Platinum" assigned to "FinSecure Bank"' time="1 day ago" />
                    <ActivityFeedItem icon="account-plus-outline" iconColor="#10B981" iconBg="#ECFDF5" title='New client "GreenEnergy Co" added' time="2 days ago" />
                  </View>
                </View>
              </View>

              {/* 3. LOWER ROW: Top Clients by Usage & Subscription Expiry */}
              <View style={[styles.middleGridRow, isMobile && styles.middleGridRowMobile]}>
                {/* 3.1 Top Clients by Usage Table */}
                <View style={[styles.contentCard, { flex: 1.1 }]}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardHeaderTitle}>Top Clients by Usage</Text>
                    <TouchableOpacity onPress={() => setActiveNav('Clients')}>
                      <Text style={styles.viewAllActionLink}>View All →</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.tableHeadBar}>
                    <Text style={[styles.thColText, { width: 28 }]}>#</Text>
                    <Text style={[styles.thColText, { flex: 1.7 }]}>Company Name</Text>
                    <Text style={[styles.thColText, { flex: 1.0 }]}>Documents</Text>
                    <Text style={[styles.thColText, { flex: 1.1 }]}>Conversations</Text>
                    <Text style={[styles.thColText, { flex: 0.9 }]}>Status</Text>
                  </View>

                  {[
                    { id: 1, name: 'HealthPlus', char: 'H', color: '#EF4444', docs: '2,480', conv: '18,230', status: 'Active' },
                    { id: 2, name: 'TechNova Solutions', char: 'T', color: '#0066FF', docs: '1,920', conv: '12,450', status: 'Active' },
                    { id: 3, name: 'AutoDrive Ltd', char: 'A', color: '#7C3AED', docs: '1,540', conv: '10,230', status: 'Active' },
                    { id: 4, name: 'EduSmart Learning', char: 'E', color: '#10B981', docs: '980', conv: '7,560', status: 'Expiring Soon' },
                    { id: 5, name: 'RetailCorp', char: 'R', color: '#2563EB', docs: '860', conv: '6,780', status: 'Active' },
                  ].map((row, idx) => (
                    <TouchableOpacity
                      key={row.id}
                      style={styles.tableClickableRow}
                      onPress={() => {
                        const found = clients.find(c => c.name === row.name) || clients[0];
                        setSelectedClientModal(found);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.tdIndexText, { width: 28 }]}>{idx + 1}</Text>
                      <View style={[styles.companyAvatarCell, { flex: 1.7 }]}>
                        <View style={[styles.circleInitialAvatar, { backgroundColor: row.color }]}>
                          <Text style={styles.circleInitialText}>{row.char}</Text>
                        </View>
                        <Text style={styles.companyNameCellText} numberOfLines={1}>{row.name}</Text>
                      </View>
                      <Text style={[styles.tdNumberText, { flex: 1.0 }]}>{row.docs}</Text>
                      <Text style={[styles.tdNumberText, { flex: 1.1 }]}>{row.conv}</Text>
                      <View style={{ flex: 0.9 }}>
                        {row.status === 'Active' ? (
                          <View style={styles.statusActivePill}>
                            <View style={styles.dotActiveGreen} />
                            <Text style={styles.statusActiveText}>Active</Text>
                          </View>
                        ) : (
                          <View style={styles.statusExpiringPill}>
                            <Text style={styles.statusExpiringText}>Expiring Soon</Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 3.2 Subscription Expiry Table */}
                <View style={[styles.contentCard, { flex: 1.05 }]}>
                  <View style={styles.cardHeaderRow}>
                    <Text style={styles.cardHeaderTitle}>Subscription Expiry</Text>
                    <TouchableOpacity onPress={() => setActiveNav('Subscriptions')}>
                      <Text style={styles.viewAllActionLink}>View All →</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.tableHeadBar}>
                    <Text style={[styles.thColText, { flex: 1.6 }]}>Company Name</Text>
                    <Text style={[styles.thColText, { flex: 0.9 }]}>Plan</Text>
                    <Text style={[styles.thColText, { flex: 1.2 }]}>Expiry Date</Text>
                    <Text style={[styles.thColText, { flex: 0.8, textAlign: 'center' }]}>Days Left</Text>
                  </View>

                  {[
                    { name: 'EduSmart Learning', char: 'E', color: '#10B981', plan: 'Gold', date: '30 Sep 2025', days: 22 },
                    { name: 'GreenEnergy Co', char: 'G', color: '#059669', plan: 'Silver', date: '15 Oct 2025', days: 37 },
                    { name: 'HealthPlus', char: 'H', color: '#EF4444', plan: 'Platinum', date: '20 Oct 2025', days: 42 },
                    { name: 'FinSecure Bank', char: 'F', color: '#7C3AED', plan: 'Gold', date: '05 Nov 2025', days: 58 },
                    { name: 'LogiTrans Global', char: 'L', color: '#EA580C', plan: 'Silver', date: '14 Nov 2025', days: 67 },
                  ].map((row, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.tableClickableRow}
                      onPress={() => {
                        const found = clients.find(c => c.name === row.name) || clients[0];
                        setSelectedClientModal(found);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.companyAvatarCell, { flex: 1.6 }]}>
                        <View style={[styles.circleInitialAvatar, { backgroundColor: row.color }]}>
                          <Text style={styles.circleInitialText}>{row.char}</Text>
                        </View>
                        <Text style={styles.companyNameCellText} numberOfLines={1}>{row.name}</Text>
                      </View>
                      <Text style={[styles.tdPlanText, { flex: 0.9 }]}>{row.plan}</Text>
                      <Text style={[styles.tdDateText, { flex: 1.2 }]}>{row.date}</Text>
                      <View style={{ flex: 0.8, alignItems: 'center' }}>
                        <View style={styles.daysLeftAmberPill}>
                          <Text style={styles.daysLeftAmberText}>{row.days}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* 4. BOTTOM BANNER */}
              <View style={styles.bottomCalloutCard}>
                <View style={styles.calloutLeftContent}>
                  <View style={styles.targetIconCircle}>
                    <MaterialCommunityIcons name="bullseye-arrow" size={22} color="#7C3AED" />
                  </View>
                  <View style={{ marginLeft: 14 }}>
                    <Text style={styles.calloutHeading}>Let's make AI accessible to every business.</Text>
                    <Text style={styles.calloutSub}>
                      Manage clients, subscriptions and knowledge — all in one place.
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.calloutActionBtn}
                  onPress={() => setActiveNav('Reports')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.calloutActionBtnText}>View Reports →</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* ========================================================= */}
          {/* CLIENTS MANAGEMENT TAB (Exact Matching PDF Page 4, 5, 6)  */}
          {/* ========================================================= */}
          {activeNav === 'Clients' && (
            <View style={styles.tabContentContainer}>
              <View style={styles.subScreenHeaderRow}>
                <View>
                  <View style={styles.breadcrumbRow}>
                    <Text style={styles.breadcrumbLink} onPress={() => setActiveNav('Dashboard')}>Dashboard</Text>
                    <Text style={styles.breadcrumbDivider}>›</Text>
                    <Text style={styles.breadcrumbActive}>Clients</Text>
                  </View>
                  <Text style={styles.greetingTitle}>Client Management</Text>
                  <Text style={styles.greetingSubtitle}>Manage and monitor all client organizations using the Platinum Software AI platform.</Text>
                </View>
                <TouchableOpacity
                  style={styles.primaryActionBtn}
                  onPress={() => {
                    setClientFormName('');
                    setClientFormIndustry('IT Services');
                    setClientFormSize('51 - 200 employees');
                    setClientFormWebsite('https://');
                    setClientFormContact('');
                    setClientFormDesignation('');
                    setClientFormEmail('');
                    setClientFormPhone('');
                    setClientFormPlan('Gold');
                    setClientFormStartDate('18 Sep 2025');
                    setClientFormEndDate('18 Sep 2026');
                    setClientFormStatus('Active');
                    setClientFormNotes('');
                    setShowAddClientModal(true);
                  }}
                >
                  <Feather name="plus" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.primaryActionBtnText}>Add Client</Text>
                </TouchableOpacity>
              </View>

              {/* 4 Summary KPI Cards */}
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#EBF3FF' }]}>
                    <MaterialCommunityIcons name="office-building" size={24} color="#0066FF" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Total Clients</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>48</Text>
                      <View style={styles.kpiTrendBadge}>
                        <Feather name="arrow-up-right" size={12} color="#10B981" />
                        <Text style={styles.kpiTrendText}>12%</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>+5 new this month</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#ECFDF5' }]}>
                    <MaterialCommunityIcons name="check-circle-outline" size={24} color="#10B981" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Active Clients</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>42</Text>
                      <View style={styles.kpiTrendBadge}>
                        <Feather name="arrow-up-right" size={12} color="#10B981" />
                        <Text style={styles.kpiTrendText}>8%</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>87.5% of total</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#FEF2F2' }]}>
                    <MaterialCommunityIcons name="minus-circle-outline" size={24} color="#EF4444" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Inactive Clients</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>6</Text>
                      <View style={[styles.kpiTrendBadge, { backgroundColor: '#FEF2F2' }]}>
                        <Feather name="arrow-down-right" size={12} color="#EF4444" />
                        <Text style={[styles.kpiTrendText, { color: '#EF4444' }]}>25%</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>12.5% of total</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#FFFBEB' }]}>
                    <MaterialCommunityIcons name="clock-outline" size={24} color="#F59E0B" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Expiring Soon</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>5</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.kpiCardSubtext}>in next 30 days</Text>
                      <TouchableOpacity onPress={() => setClientStatusFilter('Expiring Soon')}>
                        <Text style={[styles.viewAllActionLink, { fontSize: 12 }]}>View →</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* Search & Filter Bar */}
              <View style={styles.contentCard}>
                <View style={[styles.filterBarRow, isMobile && styles.filterBarRowMobile]}>
                  <View style={[styles.searchBarBox, { flex: 1.4 }]}>
                    <Feather name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                    <TextInput
                      placeholder="Search by company name, industry, or contact..."
                      placeholderTextColor="#94A3B8"
                      value={clientSearch}
                      onChangeText={setClientSearch}
                      style={styles.innerSearch}
                    />
                    {clientSearch.length > 0 && (
                      <TouchableOpacity onPress={() => setClientSearch('')}>
                        <Feather name="x" size={14} color="#94A3B8" />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.filterDropdownWrapper}>
                    <Text style={styles.filterFieldLabel}>Industry</Text>
                    <select
                      style={styles.nativeHtmlSelect}
                      value={clientIndustryFilter}
                      onChange={(e) => setClientIndustryFilter(e.target.value)}
                    >
                      <option value="All Industries">All Industries</option>
                      <option value="IT Services">IT Services</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Energy">Energy</option>
                      <option value="Finance">Finance</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Cloud Services">Cloud Services</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </View>

                  <View style={styles.filterDropdownWrapper}>
                    <Text style={styles.filterFieldLabel}>Plan</Text>
                    <select
                      style={styles.nativeHtmlSelect}
                      value={clientPlanFilter}
                      onChange={(e) => setClientPlanFilter(e.target.value)}
                    >
                      <option value="All Plans">All Plans</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Platinum">Platinum</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                  </View>

                  <View style={styles.filterDropdownWrapper}>
                    <Text style={styles.filterFieldLabel}>Status</Text>
                    <select
                      style={styles.nativeHtmlSelect}
                      value={clientStatusFilter}
                      onChange={(e) => setClientStatusFilter(e.target.value)}
                    >
                      <option value="All Statuses">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Expiring Soon">Expiring Soon</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </View>

                  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.filterActionButton}>
                      <Feather name="filter" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.filterActionButtonText}>Filter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.resetActionButton}
                      onPress={() => {
                        setClientSearch('');
                        setClientIndustryFilter('All Industries');
                        setClientPlanFilter('All Plans');
                        setClientStatusFilter('All Statuses');
                      }}
                    >
                      <Feather name="rotate-ccw" size={14} color="#64748B" style={{ marginRight: 6 }} />
                      <Text style={styles.resetActionButtonText}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Table of clients */}
                <View style={{ marginTop: 16 }}>
                  <View style={styles.tableSubheaderRow}>
                    <Text style={styles.tableTitleText}>All Clients ({clients.length})</Text>
                  </View>

                  <View style={styles.tableHeadBar}>
                    <Text style={[styles.thColText, { width: 32 }]}>#</Text>
                    <Text style={[styles.thColText, { flex: 1.8 }]}>Company Name</Text>
                    <Text style={[styles.thColText, { flex: 1.2 }]}>Industry</Text>
                    <Text style={[styles.thColText, { flex: 1.6 }]}>Contact Person</Text>
                    <Text style={[styles.thColText, { flex: 0.9 }]}>Plan</Text>
                    <Text style={[styles.thColText, { flex: 1.1 }]}>Status</Text>
                    <Text style={[styles.thColText, { flex: 0.7, textAlign: 'center' }]}>Users</Text>
                    <Text style={[styles.thColText, { flex: 1.4 }]}>Subscription End</Text>
                    <Text style={[styles.thColText, { flex: 1.2, textAlign: 'right' }]}>Actions</Text>
                  </View>

                  {clients
                    .filter((c) => {
                      const matchesSearch =
                        c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
                        c.industry.toLowerCase().includes(clientSearch.toLowerCase()) ||
                        c.contactPerson.toLowerCase().includes(clientSearch.toLowerCase()) ||
                        c.email.toLowerCase().includes(clientSearch.toLowerCase());
                      const matchesIndustry = clientIndustryFilter === 'All Industries' || c.industry === clientIndustryFilter;
                      const matchesPlan = clientPlanFilter === 'All Plans' || c.plan.toLowerCase().includes(clientPlanFilter.toLowerCase());
                      const matchesStatus = clientStatusFilter === 'All Statuses' || c.status === clientStatusFilter;
                      return matchesSearch && matchesIndustry && matchesPlan && matchesStatus;
                    })
                    .map((client, i) => (
                      <View key={client.id} style={styles.tableClickableRow}>
                        <Text style={[styles.tdIndexText, { width: 32 }]}>{i + 1}</Text>

                        <View style={[styles.companyAvatarCell, { flex: 1.8 }]}>
                          <View style={[styles.circleInitialAvatar, { backgroundColor: client.avatarColor }]}>
                            <Text style={styles.circleInitialText}>{client.avatarChar}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.companyNameCellText} numberOfLines={1}>{client.name}</Text>
                          </View>
                        </View>

                        <Text style={[styles.tdNumberText, { flex: 1.2 }]}>{client.industry}</Text>

                        <View style={{ flex: 1.6 }}>
                          <Text style={styles.contactNameText}>{client.contactPerson}</Text>
                          <Text style={styles.contactEmailText}>{client.email}</Text>
                        </View>

                        <View style={{ flex: 0.9 }}>
                          <View
                            style={[
                              styles.planBadgeTag,
                              client.plan === 'Gold' && styles.planBadgeGold,
                              client.plan === 'Silver' && styles.planBadgeSilver,
                              client.plan === 'Platinum' && styles.planBadgePlatinum,
                            ]}
                          >
                            <Text
                              style={[
                                styles.planBadgeTagText,
                                client.plan === 'Gold' && styles.planBadgeGoldText,
                                client.plan === 'Silver' && styles.planBadgeSilverText,
                                client.plan === 'Platinum' && styles.planBadgePlatinumText,
                              ]}
                            >
                              {client.plan}
                            </Text>
                          </View>
                        </View>

                        <View style={{ flex: 1.1 }}>
                          {client.status === 'Active' && (
                            <View style={styles.statusActivePill}>
                              <View style={styles.dotActiveGreen} />
                              <Text style={styles.statusActiveText}>Active</Text>
                            </View>
                          )}
                          {client.status === 'Expiring Soon' && (
                            <View style={styles.statusExpiringPill}>
                              <View style={styles.dotAmber} />
                              <Text style={styles.statusExpiringText}>Expiring Soon</Text>
                            </View>
                          )}
                          {client.status === 'Inactive' && (
                            <View style={styles.statusExpiredPill}>
                              <View style={styles.dotRed} />
                              <Text style={styles.statusExpiredText}>Inactive</Text>
                            </View>
                          )}
                        </View>

                        <Text style={[styles.tdNumberText, { flex: 0.7, textAlign: 'center' }]}>{client.users}</Text>

                        <View style={{ flex: 1.4 }}>
                          <Text
                            style={[
                              styles.tdDateText,
                              client.status === 'Inactive' && { color: '#EF4444' },
                            ]}
                          >
                            {client.endDate}
                          </Text>
                          <Text
                            style={[
                              styles.daysLeftSubText,
                              client.status === 'Expiring Soon' && { color: '#D97706', fontWeight: '600' },
                              client.status === 'Inactive' && { color: '#EF4444', fontWeight: '600' },
                            ]}
                          >
                            {client.daysLeftText}
                          </Text>
                        </View>

                        <View style={{ flex: 1.2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}>
                          <TouchableOpacity
                            style={styles.viewSmallBtn}
                            onPress={() => setSelectedClientModal(client)}
                          >
                            <Text style={styles.viewSmallBtnText}>View</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.editSmallBtn}
                            onPress={() => {
                              setEditingClientModal(client);
                              setClientFormName(client.name);
                              setClientFormIndustry(client.industry);
                              setClientFormSize(client.companySize || '51 - 200 employees');
                              setClientFormWebsite(client.website || 'https://');
                              setClientFormContact(client.contactPerson);
                              setClientFormDesignation(client.designation || 'Manager');
                              setClientFormEmail(client.email);
                              setClientFormPhone(client.phone || '+91 98000 00000');
                              setClientFormPlan(client.plan);
                              setClientFormStartDate(client.startDate || '01 Jan 2025');
                              setClientFormEndDate(client.endDate);
                              setClientFormStatus(client.status);
                              setClientFormNotes(client.notes || '');
                            }}
                          >
                            <Text style={styles.editSmallBtnText}>Edit</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.iconActionBtn}
                            onPress={() => {
                              const newStatus = client.status === 'Active' ? 'Inactive' : 'Active';
                              setClients(clients.map(c => c.id === client.id ? { ...c, status: newStatus } : c));
                              notifyAction(setClientActionMessage, `Client ${client.name} status updated to ${newStatus}.`);
                            }}
                            title={client.status === 'Active' ? 'Deactivate Client' : 'Activate Client'}
                          >
                            <Feather
                              name={client.status === 'Active' ? 'slash' : 'check-circle'}
                              size={14}
                              color={client.status === 'Active' ? '#EF4444' : '#10B981'}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.iconActionBtn}
                            onPress={() => {
                              if (window?.confirm ? window.confirm(`Are you sure you want to delete ${client.name}?`) : true) {
                                setClients(clients.filter(c => c.id !== client.id));
                                notifyAction(setClientActionMessage, `Client ${client.name} successfully deleted.`);
                              }
                            }}
                            title="Delete Client"
                          >
                            <Feather name="trash-2" size={14} color="#94A3B8" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}

                  <View style={styles.tablePaginationFooter}>
                    <Text style={styles.paginationShowingText}>Showing 1 to 10 of 48 clients</Text>
                    <View style={styles.paginationPagesRow}>
                      <TouchableOpacity style={styles.pageBtn}><Feather name="chevron-left" size={14} color="#64748B" /></TouchableOpacity>
                      <TouchableOpacity style={[styles.pageBtn, styles.pageBtnActive]}><Text style={styles.pageBtnActiveText}>1</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.pageBtn}><Text style={styles.pageBtnText}>2</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.pageBtn}><Text style={styles.pageBtnText}>3</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.pageBtn}><Text style={styles.pageBtnText}>4</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.pageBtn}><Text style={styles.pageBtnText}>5</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.pageBtn}><Feather name="chevron-right" size={14} color="#64748B" /></TouchableOpacity>
                    </View>
                    <View style={styles.pageSizeSelectWrapper}>
                      <select style={styles.pageSizeSelect}>
                        <option>10 per page</option>
                        <option>25 per page</option>
                        <option>50 per page</option>
                      </select>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* PLANS MANAGEMENT TAB (Exact Matching PDF Page 7 & 8)       */}
          {/* ========================================================= */}
          {activeNav === 'Plans' && (
            <View style={styles.tabContentContainer}>
              <View style={styles.subScreenHeaderRow}>
                <View>
                  <View style={styles.breadcrumbRow}>
                    <Text style={styles.breadcrumbLink} onPress={() => setActiveNav('Dashboard')}>Dashboard</Text>
                    <Text style={styles.breadcrumbDivider}>›</Text>
                    <Text style={styles.breadcrumbActive}>Plans</Text>
                  </View>
                  <Text style={styles.greetingTitle}>Plans Management</Text>
                  <Text style={styles.greetingSubtitle}>Create and manage subscription plans for your clients.</Text>
                </View>
                <TouchableOpacity
                  style={styles.primaryActionBtn}
                  onPress={() => {
                    setPlanFormName('');
                    setPlanFormType('Subscription');
                    setPlanFormShortDesc('');
                    setPlanFormDetailedDesc('');
                    setPlanFormPrice('₹0.00');
                    setPlanFormBilling('Monthly');
                    setPlanFormValidity('12');
                    setPlanFormCurrency('INR (₹)');
                    setPlanFormMaxQueries('1000');
                    setPlanFormKeyFeatures('Up to 1,000 queries/month\nStandard LLM model\nEmail support\nBasic analytics');
                    setPlanFormMaxUsers('5');
                    setPlanFormStorage('10 MB');
                    setPlanFormStatus('Active');
                    setPlanFormDisplayOrder(String(plans.length + 1));
                    setShowAddPlanModal(true);
                  }}
                >
                  <Feather name="plus" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.primaryActionBtnText}>Add Plan</Text>
                </TouchableOpacity>
              </View>

              {/* 4 KPI Summary Cards */}
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#EFF6FF' }]}>
                    <MaterialCommunityIcons name="card-bulleted-outline" size={24} color="#0066FF" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Total Plans</Text>
                    <Text style={styles.kpiCardValue}>{plans.length}</Text>
                    <Text style={styles.kpiCardSubtext}>Active subscription plans</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#ECFDF5' }]}>
                    <MaterialCommunityIcons name="check-circle-outline" size={24} color="#10B981" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Active Plans</Text>
                    <Text style={styles.kpiCardValue}>{plans.filter(p => p.status === 'Active').length}</Text>
                    <Text style={styles.kpiCardSubtext}>100% of total</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#FEF2F2' }]}>
                    <MaterialCommunityIcons name="minus-circle-outline" size={24} color="#EF4444" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Inactive Plans</Text>
                    <Text style={styles.kpiCardValue}>{plans.filter(p => p.status === 'Inactive').length}</Text>
                    <Text style={styles.kpiCardSubtext}>0% of total</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#FFFBEB' }]}>
                    <MaterialCommunityIcons name="account-multiple-check-outline" size={24} color="#F59E0B" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Total Clients Using Plans</Text>
                    <Text style={styles.kpiCardValue}>48</Text>
                    <Text style={styles.kpiCardSubtext}>Across all active plans</Text>
                  </View>
                </View>
              </View>

              {/* Search & Filter Bar */}
              <View style={styles.contentCard}>
                <View style={[styles.filterBarRow, isMobile && styles.filterBarRowMobile]}>
                  <View style={[styles.searchBarBox, { flex: 1.8 }]}>
                    <Feather name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                    <TextInput
                      placeholder="Search plans by name or description..."
                      placeholderTextColor="#94A3B8"
                      value={planSearch}
                      onChangeText={setPlanSearch}
                      style={styles.innerSearch}
                    />
                    {planSearch.length > 0 && (
                      <TouchableOpacity onPress={() => setPlanSearch('')}>
                        <Feather name="x" size={14} color="#94A3B8" />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={styles.filterDropdownWrapper}>
                    <Text style={styles.filterFieldLabel}>Status</Text>
                    <select
                      style={styles.nativeHtmlSelect}
                      value={planStatusFilter}
                      onChange={(e) => setPlanStatusFilter(e.target.value)}
                    >
                      <option value="All Statuses">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </View>

                  <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.filterActionButton}>
                      <Feather name="filter" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.filterActionButtonText}>Filter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.resetActionButton}
                      onPress={() => {
                        setPlanSearch('');
                        setPlanStatusFilter('All Statuses');
                      }}
                    >
                      <Feather name="rotate-ccw" size={14} color="#64748B" style={{ marginRight: 6 }} />
                      <Text style={styles.resetActionButtonText}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Table of all plans (Matching PDF Page 7) */}
                <View style={{ marginTop: 16 }}>
                  <View style={styles.tableSubheaderRow}>
                    <Text style={styles.tableTitleText}>All Plans ({plans.length})</Text>
                  </View>

                  <View style={styles.tableHeadBar}>
                    <Text style={[styles.thColText, { width: 32 }]}>#</Text>
                    <Text style={[styles.thColText, { flex: 1.2 }]}>Plan</Text>
                    <Text style={[styles.thColText, { flex: 2.0 }]}>Description</Text>
                    <Text style={[styles.thColText, { flex: 1.2 }]}>Price (Monthly)</Text>
                    <Text style={[styles.thColText, { flex: 2.4 }]}>Key Features</Text>
                    <Text style={[styles.thColText, { flex: 1.0 }]}>Status</Text>
                    <Text style={[styles.thColText, { flex: 0.8, textAlign: 'center' }]}>Clients</Text>
                    <Text style={[styles.thColText, { flex: 1.4, textAlign: 'right' }]}>Actions</Text>
                  </View>

                  {plans
                    .filter((p) => {
                      const matchesSearch =
                        p.name.toLowerCase().includes(planSearch.toLowerCase()) ||
                        p.desc.toLowerCase().includes(planSearch.toLowerCase());
                      const matchesStatus = planStatusFilter === 'All Statuses' || p.status === planStatusFilter;
                      return matchesSearch && matchesStatus;
                    })
                    .map((plan, idx) => (
                      <View key={plan.id} style={styles.tableClickableRow}>
                        <Text style={[styles.tdIndexText, { width: 32 }]}>{idx + 1}</Text>

                        <View style={{ flex: 1.2 }}>
                          <Text style={styles.planNameColumnText}>{plan.name}</Text>
                          {plan.badge && (
                            <View style={styles.popularBadge}>
                              <Text style={styles.popularBadgeText}>{plan.badge}</Text>
                            </View>
                          )}
                        </View>

                        <Text style={[styles.tdDescText, { flex: 2.0 }]}>{plan.desc}</Text>

                        <Text style={[styles.planPriceColumnText, { flex: 1.2 }]}>{plan.price}</Text>

                        <View style={{ flex: 2.4, paddingVertical: 4 }}>
                          {plan.features.map((feat, fidx) => (
                            <View key={fidx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                              <Text style={styles.featureBulletDot}>•</Text>
                              <Text style={styles.featureBulletText} numberOfLines={1}>{feat}</Text>
                            </View>
                          ))}
                        </View>

                        <View style={{ flex: 1.0 }}>
                          {plan.status === 'Active' ? (
                            <View style={styles.statusActivePill}>
                              <View style={styles.dotActiveGreen} />
                              <Text style={styles.statusActiveText}>Active</Text>
                            </View>
                          ) : (
                            <View style={styles.statusExpiredPill}>
                              <View style={styles.dotRed} />
                              <Text style={styles.statusExpiredText}>Inactive</Text>
                            </View>
                          )}
                        </View>

                        <Text style={[styles.tdNumberText, { flex: 0.8, textAlign: 'center' }]}>{plan.clients}</Text>

                        <View style={{ flex: 1.4, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 6 }}>
                          <TouchableOpacity
                            style={styles.viewSmallBtn}
                            onPress={() => setSelectedPlanModal(plan)}
                          >
                            <Text style={styles.viewSmallBtnText}>View</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.editSmallBtn}
                            onPress={() => {
                              setEditingPlanModal(plan);
                              setPlanFormName(plan.name);
                              setPlanFormType('Subscription');
                              setPlanFormShortDesc(plan.desc);
                              setPlanFormDetailedDesc(plan.detailedDesc || plan.desc);
                              setPlanFormPrice(plan.price);
                              setPlanFormBilling(plan.billingCycle || 'Monthly');
                              setPlanFormValidity(plan.validity || '12');
                              setPlanFormCurrency(plan.currency || 'INR (₹)');
                              setPlanFormMaxQueries(plan.queries || '1,000');
                              setPlanFormKeyFeatures(plan.features.join('\n'));
                              setPlanFormMaxUsers(String(plan.maxUsers || 5));
                              setPlanFormStorage(plan.storage || '10 MB');
                              setPlanFormStatus(plan.status);
                              setPlanFormDisplayOrder(String(plan.displayOrder || 1));
                            }}
                          >
                            <Text style={styles.editSmallBtnText}>Edit</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.iconActionBtn}
                            onPress={() => {
                              const newStatus = plan.status === 'Active' ? 'Inactive' : 'Active';
                              setPlans(plans.map(p => p.id === plan.id ? { ...p, status: newStatus } : p));
                              notifyAction(setPlanActionMessage, `Plan ${plan.name} status changed to ${newStatus}.`);
                            }}
                            title={plan.status === 'Active' ? 'Deactivate Plan' : 'Activate Plan'}
                          >
                            <Feather
                              name={plan.status === 'Active' ? 'slash' : 'check-circle'}
                              size={14}
                              color={plan.status === 'Active' ? '#EF4444' : '#10B981'}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.iconActionBtn}
                            onPress={() => {
                              if (window?.confirm ? window.confirm(`Are you sure you want to delete plan ${plan.name}?`) : true) {
                                setPlans(plans.filter(p => p.id !== plan.id));
                                notifyAction(setPlanActionMessage, `Plan ${plan.name} successfully deleted.`);
                              }
                            }}
                            title="Delete Plan"
                          >
                            <Feather name="trash-2" size={14} color="#94A3B8" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}

                  <View style={styles.tablePaginationFooter}>
                    <Text style={styles.paginationShowingText}>Showing 1 to 4 of 4 plans</Text>
                    <View style={styles.paginationPagesRow}>
                      <TouchableOpacity style={styles.pageBtn}><Feather name="chevron-left" size={14} color="#64748B" /></TouchableOpacity>
                      <TouchableOpacity style={[styles.pageBtn, styles.pageBtnActive]}><Text style={styles.pageBtnActiveText}>1</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.pageBtn}><Feather name="chevron-right" size={14} color="#64748B" /></TouchableOpacity>
                    </View>
                    <View style={styles.pageSizeSelectWrapper}>
                      <select style={styles.pageSizeSelect}>
                        <option>10 per page</option>
                        <option>25 per page</option>
                      </select>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {activeNav === 'Subscriptions' && (
            <View style={styles.tabContentContainer}>
              {/* Breadcrumb */}
              <View style={styles.breadcrumbRow}>
                <Text style={styles.breadcrumbLink} onPress={() => setActiveNav('Dashboard')}>Dashboard</Text>
                <Text style={styles.breadcrumbDivider}>›</Text>
                <Text style={styles.breadcrumbActive}>Subscriptions</Text>
              </View>

              <View style={styles.subScreenHeaderRow}>
                <View>
                  <Text style={styles.greetingTitle}>Subscriptions Management</Text>
                  <Text style={styles.greetingSubtitle}>Manage client subscriptions, monitor usage, renewals and status.</Text>
                </View>
                <TouchableOpacity
                  style={styles.primaryActionBtn}
                  onPress={() => {
                    if (!subFormClient && clients.length > 0) setSubFormClient(clients[0].name);
                    if (!subFormPlan && plans.length > 0) setSubFormPlan(plans[0].name);
                    setShowAddSubModal(true);
                  }}
                >
                  <Feather name="plus" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.primaryActionBtnText}>Add Subscription</Text>
                </TouchableOpacity>
              </View>

              {subActionMessage && (
                <View style={{ backgroundColor: '#ECFDF5', borderRadius: 8, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="check-circle" size={16} color="#10B981" style={{ marginRight: 8 }} />
                  <Text style={{ fontSize: 13, color: '#065F46', fontWeight: '600' }}>{subActionMessage}</Text>
                </View>
              )}

              {/* KPI Summary Cards */}
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <TouchableOpacity
                  style={[styles.kpiCard, subStatusFilter === 'All Statuses' && { borderColor: '#0066FF', borderWidth: 1.5 }]}
                  onPress={() => {
                    setSubStatusFilter('All Statuses');
                    notifyAction(setSubActionMessage, 'Showing all subscriptions.');
                  }}
                  activeOpacity={0.85}
                >
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#EFF6FF' }]}>
                    <MaterialCommunityIcons name="credit-card-check-outline" size={24} color="#0066FF" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Total Subscriptions</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>48</Text>
                      <View style={styles.kpiTrendBadge}>
                        <Feather name="arrow-up-right" size={12} color="#10B981" />
                        <Text style={styles.kpiTrendText}>+12%</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>+5 new this month</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.kpiCard, subStatusFilter === 'Active' && { borderColor: '#10B981', borderWidth: 1.5 }]}
                  onPress={() => {
                    const next = subStatusFilter === 'Active' ? 'All Statuses' : 'Active';
                    setSubStatusFilter(next);
                    notifyAction(setSubActionMessage, next === 'Active' ? 'Filtered: active subscriptions.' : 'Showing all subscriptions.');
                  }}
                  activeOpacity={0.85}
                >
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#ECFDF5' }]}>
                    <MaterialCommunityIcons name="shield-check-outline" size={24} color="#10B981" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Active</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>42</Text>
                      <View style={[styles.kpiTrendBadge, { backgroundColor: '#ECFDF5' }]}>
                        <Text style={[styles.kpiTrendText, { color: '#059669' }]}>87.5% of total</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>Currently active</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.kpiCard, subStatusFilter === 'Expired' && { borderColor: '#EF4444', borderWidth: 1.5 }]}
                  onPress={() => {
                    const next = subStatusFilter === 'Expired' ? 'All Statuses' : 'Expired';
                    setSubStatusFilter(next);
                    notifyAction(setSubActionMessage, next === 'Expired' ? 'Filtered: expired subscriptions.' : 'Showing all subscriptions.');
                  }}
                  activeOpacity={0.85}
                >
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#FEE2E2' }]}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#EF4444" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Expired</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>3</Text>
                      <View style={[styles.kpiTrendBadge, { backgroundColor: '#FEE2E2' }]}>
                        <Text style={[styles.kpiTrendText, { color: '#DC2626' }]}>6.25% of total</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>Needs renewal</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.kpiCard, subStatusFilter === 'Expiring Soon' && { borderColor: '#F59E0B', borderWidth: 1.5 }]}
                  onPress={() => {
                    const next = subStatusFilter === 'Expiring Soon' ? 'All Statuses' : 'Expiring Soon';
                    setSubStatusFilter(next);
                    notifyAction(setSubActionMessage, next === 'Expiring Soon' ? 'Filtered: subscriptions expiring soon.' : 'Showing all subscriptions.');
                  }}
                  activeOpacity={0.85}
                >
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#FEF3C7' }]}>
                    <MaterialCommunityIcons name="timer-sand" size={24} color="#F59E0B" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Expiring Soon</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>5</Text>
                      <View style={[styles.kpiTrendBadge, { backgroundColor: '#FEF3C7' }]}>
                        <Text style={[styles.kpiTrendText, { color: '#B45309' }]}>In next 30 days</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                      <Text style={{ fontSize: 11.5, color: '#0066FF', fontWeight: '700', textDecorationLine: 'underline' }}>
                        {subStatusFilter === 'Expiring Soon' ? '✓ Filtered (Click to clear)' : 'View →'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Compact Search + Filters Bar */}
              <View style={[styles.actionFilterBar, { zIndex: 120 }]}>
                {/* Search Box */}
                <View style={styles.compactSearchBox}>
                  <Feather name="search" size={15} color="#94A3B8" style={{ marginRight: 8 }} />
                  <TextInput
                    placeholder="Search client, plan, or ID..."
                    placeholderTextColor="#94A3B8"
                    value={subSearch}
                    onChangeText={setSubSearch}
                    style={styles.innerSearch}
                  />
                  {subSearch ? (
                    <TouchableOpacity onPress={() => setSubSearch('')}>
                      <Feather name="x" size={14} color="#94A3B8" />
                    </TouchableOpacity>
                  ) : null}
                </View>

                {/* Plan Dropdown */}
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity
                    style={[styles.filterDropdownBtn, subPlanFilter !== 'All Plans' && styles.filterDropdownBtnActive]}
                    onPress={() => {
                      setSubPlanOpen(!subPlanOpen);
                      setSubStatusOpen(false);
                      setSubDateOpen(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.filterInlineLabel}>Plan:</Text>
                    <Text style={[styles.filterDropdownText, subPlanFilter !== 'All Plans' && { color: '#0066FF', fontWeight: '700' }]}>{subPlanFilter}</Text>
                    <Feather name="chevron-down" size={13} color={subPlanFilter !== 'All Plans' ? '#0066FF' : '#64748B'} />
                  </TouchableOpacity>
                  {subPlanOpen && (
                    <View style={styles.filterDropdownMenu}>
                      {['All Plans', 'Gold', 'Silver', 'Platinum', 'Enterprise'].map((p) => (
                        <TouchableOpacity
                          key={p}
                          style={[styles.dropdownMenuItem, subPlanFilter === p && { backgroundColor: '#EFF6FF' }]}
                          onPress={() => {
                            setSubPlanFilter(p);
                            setSubPlanOpen(false);
                          }}
                        >
                          <Text style={[styles.dropdownMenuItemText, subPlanFilter === p && { color: '#0066FF', fontWeight: '700' }]}>
                            {p}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Status Dropdown */}
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity
                    style={[styles.filterDropdownBtn, subStatusFilter !== 'All Statuses' && styles.filterDropdownBtnActive]}
                    onPress={() => {
                      setSubStatusOpen(!subStatusOpen);
                      setSubPlanOpen(false);
                      setSubDateOpen(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.filterInlineLabel}>Status:</Text>
                    <Text style={[styles.filterDropdownText, subStatusFilter !== 'All Statuses' && { color: '#0066FF', fontWeight: '700' }]}>{subStatusFilter}</Text>
                    <Feather name="chevron-down" size={13} color={subStatusFilter !== 'All Statuses' ? '#0066FF' : '#64748B'} />
                  </TouchableOpacity>
                  {subStatusOpen && (
                    <View style={styles.filterDropdownMenu}>
                      {['All Statuses', 'Active', 'Expiring Soon', 'Expired'].map((s) => (
                        <TouchableOpacity
                          key={s}
                          style={[styles.dropdownMenuItem, subStatusFilter === s && { backgroundColor: '#EFF6FF' }]}
                          onPress={() => {
                            setSubStatusFilter(s);
                            setSubStatusOpen(false);
                          }}
                        >
                          <Text style={[styles.dropdownMenuItemText, subStatusFilter === s && { color: '#0066FF', fontWeight: '700' }]}>
                            {s}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Date Range Dropdown */}
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity
                    style={[styles.filterDropdownBtn, subDateFilter !== 'All Time' && styles.filterDropdownBtnActive]}
                    onPress={() => {
                      setSubDateOpen(!subDateOpen);
                      setSubPlanOpen(false);
                      setSubStatusOpen(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Feather name="calendar" size={13} color="#64748B" style={{ marginRight: 4 }} />
                    <Text style={styles.filterInlineLabel}>Date:</Text>
                    <Text style={[styles.filterDropdownText, subDateFilter !== 'All Time' && { color: '#0066FF', fontWeight: '700' }]}>{subDateFilter}</Text>
                    <Feather name="chevron-down" size={13} color="#64748B" />
                  </TouchableOpacity>
                  {subDateOpen && (
                    <View style={styles.filterDropdownMenu}>
                      {['All Time', 'This Month', 'Last 3 Months', 'This Year'].map((d) => (
                        <TouchableOpacity
                          key={d}
                          style={[styles.dropdownMenuItem, subDateFilter === d && { backgroundColor: '#EFF6FF' }]}
                          onPress={() => {
                            setSubDateFilter(d);
                            setSubDateOpen(false);
                          }}
                        >
                          <Text style={[styles.dropdownMenuItemText, subDateFilter === d && { color: '#0066FF', fontWeight: '700' }]}>
                            {d}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Filter and Reset Buttons */}
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <TouchableOpacity style={styles.filterApplyBtn} onPress={() => notifyAction(setSubActionMessage, 'Filters applied successfully.')}>
                    <Feather name="filter" size={13} color="#FFF" style={{ marginRight: 5 }} />
                    <Text style={styles.filterApplyBtnText}>Filter</Text>
                  </TouchableOpacity>

                  {(subSearch !== '' || subPlanFilter !== 'All Plans' || subStatusFilter !== 'All Statuses' || subDateFilter !== 'All Time') && (
                    <TouchableOpacity style={styles.filterResetBtn} onPress={() => { setSubSearch(''); setSubPlanFilter('All Plans'); setSubStatusFilter('All Statuses'); setSubDateFilter('All Time'); }}>
                      <Feather name="rotate-ccw" size={13} color="#64748B" style={{ marginRight: 4 }} />
                      <Text style={styles.filterResetBtnText}>Reset</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>


              {/* All Subscriptions Table */}
              <View style={styles.contentCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <Text style={styles.cardHeaderTitle}>
                    All Subscriptions ({subscriptions.filter(s => {
                      const ms = subSearch.toLowerCase();
                      const matchSearch = s.client.toLowerCase().includes(ms) || s.id.toLowerCase().includes(ms) || s.plan.toLowerCase().includes(ms);
                      const matchStatus = subStatusFilter === 'All Statuses' || s.status === subStatusFilter;
                      const matchPlan = subPlanFilter === 'All Plans' || s.plan === subPlanFilter;
                      return matchSearch && matchStatus && matchPlan;
                    }).length})
                  </Text>
                </View>

                {/* Table Header */}
                <View style={[styles.tableHeadBar, { backgroundColor: '#F8FAFC' }]}>
                  <Text style={[styles.thColText, { flex: 0.4 }]}>#</Text>
                  <Text style={[styles.thColText, { flex: 1.2 }]}>Subscription ID</Text>
                  <Text style={[styles.thColText, { flex: 1.6 }]}>Client Name</Text>
                  <Text style={[styles.thColText, { flex: 0.8 }]}>Plan</Text>
                  <Text style={[styles.thColText, { flex: 1.1 }]}>Start Date</Text>
                  <Text style={[styles.thColText, { flex: 1.1 }]}>End Date</Text>
                  <Text style={[styles.thColText, { flex: 0.9 }]}>Status</Text>
                  <Text style={[styles.thColText, { flex: 0.6 }]}>Users</Text>
                  <Text style={[styles.thColText, { flex: 0.9 }]}>Amount</Text>
                  <Text style={[styles.thColText, { flex: 1.0, textAlign: 'right' }]}>Actions</Text>
                </View>

                {subscriptions
                  .filter(s => {
                    const ms = subSearch.toLowerCase();
                    const matchSearch = s.client.toLowerCase().includes(ms) || s.id.toLowerCase().includes(ms) || s.plan.toLowerCase().includes(ms);
                    const matchStatus = subStatusFilter === 'All Statuses' || s.status === subStatusFilter;
                    const matchPlan = subPlanFilter === 'All Plans' || s.plan === subPlanFilter;
                    return matchSearch && matchStatus && matchPlan;
                  })
                  .map((sub, idx) => {
                    const planColors = { Gold: '#F59E0B', Silver: '#64748B', Platinum: '#7C3AED', Enterprise: '#0066FF' };
                    const planBg = { Gold: '#FEF3C7', Silver: '#F1F5F9', Platinum: '#F5F3FF', Enterprise: '#EFF6FF' };
                    return (
                      <View key={sub.id} style={styles.tableClickableRow}>
                        <Text style={[styles.tdNumberText, { flex: 0.4 }]}>{idx + 1}</Text>
                        <Text style={[styles.tdBoldIdText, { flex: 1.2 }]}>{sub.id}</Text>
                        <Text style={[styles.companyNameCellText, { flex: 1.6 }]}>{sub.client}</Text>
                        <View style={{ flex: 0.8 }}>
                          <View style={{ backgroundColor: planBg[sub.plan] || '#F1F5F9', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' }}>
                            <Text style={{ fontSize: 11.5, fontWeight: '700', color: planColors[sub.plan] || '#64748B' }}>{sub.plan}</Text>
                          </View>
                        </View>
                        <Text style={[styles.tdDateText, { flex: 1.1 }]}>{sub.startDate}</Text>
                        <Text style={[styles.tdDateText, { flex: 1.1 }]}>{sub.endDate}</Text>
                        <View style={{ flex: 0.9 }}>
                          <View style={sub.status === 'Active' ? styles.statusActivePill : sub.status === 'Expiring Soon' ? styles.statusExpiringPill : styles.statusExpiredPill}>
                            <View style={sub.status === 'Active' ? styles.dotActiveGreen : sub.status === 'Expiring Soon' ? styles.dotAmber : styles.dotRed} />
                            <Text style={sub.status === 'Active' ? styles.statusActiveText : sub.status === 'Expiring Soon' ? styles.statusExpiringText : styles.statusExpiredText}>
                              {sub.status}
                            </Text>
                          </View>
                        </View>
                        <Text style={[styles.tdNumberText, { flex: 0.6 }]}>{sub.users || 24}</Text>
                        <Text style={[styles.tdBoldIdText, { flex: 0.9, color: '#0F172A' }]}>{sub.amount}</Text>
                        <View style={{ flex: 1.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                          <TouchableOpacity style={styles.viewSmallBtn} onPress={() => setSelectedSubModal(sub)}>
                            <Text style={styles.viewSmallBtnText}>View</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.viewSmallBtn, { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0' }]} onPress={() => setEditingSubModal(sub)}>
                            <Text style={[styles.viewSmallBtnText, { color: '#475569' }]}>Edit</Text>
                          </TouchableOpacity>
                          {sub.status === 'Expired' && (
                            <TouchableOpacity style={[styles.viewSmallBtn, { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' }]}
                              onPress={() => notifyAction(setSubActionMessage, `Renewal initiated for ${sub.client}`)}>
                              <Text style={[styles.viewSmallBtnText, { color: '#92400E' }]}>Renew</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    );
                  })}
              </View>

              {/* Plans vs Subscriptions Explanation Card (Matching Image media_1789816227394.png) */}
              <View style={styles.plansVsSubBanner}>
                <View style={styles.plansVsSubBannerInner}>
                  <Text style={styles.plansVsSubTitle}>Plans vs Subscriptions</Text>
                  <Text style={styles.plansVsSubDesc}>
                    <Text style={{ fontWeight: '700' }}>Plans</Text> are the products you create (e.g., Gold, Silver, Platinum).{'\n'}
                    <Text style={{ fontWeight: '700' }}>Subscriptions</Text> are the actual assignments of a plan to a client with a start date, end date, status, number of users, etc.
                  </Text>
                  <View style={styles.plansVsSubExampleBox}>
                    <Text style={styles.plansVsSubExampleTitle}>Example:</Text>
                    <Text style={styles.plansVsSubExampleBullet}>• <Text style={{ fontWeight: '600' }}>Plan:</Text> Gold (₹9,999/month)</Text>
                    <Text style={styles.plansVsSubExampleBullet}>• <Text style={{ fontWeight: '600' }}>Subscription:</Text> TechNova Solutions uses Gold from 12 Dec 2024 to 12 Dec 2025 (24 users)</Text>
                  </View>
                </View>
              </View>


              {/* View Subscription Detail Modal */}
              {selectedSubModal && (
                <View style={styles.modalOverlay}>
                  <View style={[styles.modalBox, { maxWidth: 560 }]}>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Subscription Details</Text>
                      <TouchableOpacity onPress={() => setSelectedSubModal(null)}>
                        <Feather name="x" size={20} color="#64748B" />
                      </TouchableOpacity>
                    </View>
                    <View style={{ gap: 12, padding: 20 }}>
                      {[
                        ['Subscription ID', selectedSubModal.id],
                        ['Client Name', selectedSubModal.client],
                        ['Plan', selectedSubModal.plan],
                        ['Start Date', selectedSubModal.startDate],
                        ['End Date', selectedSubModal.endDate],
                        ['Status', selectedSubModal.status],
                        ['Users', String(selectedSubModal.users || 24)],
                        ['Amount', selectedSubModal.amount],
                      ].map(([label, val]) => (
                        <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' }}>
                          <Text style={{ fontSize: 13, color: '#64748B', fontWeight: '500' }}>{label}</Text>
                          <Text style={{ fontSize: 13, color: '#0F172A', fontWeight: '700' }}>{val}</Text>
                        </View>
                      ))}
                      <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
                        <TouchableOpacity style={[styles.modalSubmitBtn, { flex: 1 }]} onPress={() => { setEditingSubModal(selectedSubModal); setSelectedSubModal(null); }}>
                          <Text style={styles.modalSubmitBtnText}>Edit Subscription</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalCancelBtn, { flex: 1 }]} onPress={() => setSelectedSubModal(null)}>
                          <Text style={styles.modalCancelBtnText}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {/* Edit Subscription Modal */}
              {editingSubModal && (
                <View style={styles.modalOverlay}>
                  <View style={[styles.modalBox, { maxWidth: 560 }]}>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Edit Subscription — {editingSubModal.id}</Text>
                      <TouchableOpacity onPress={() => setEditingSubModal(null)}>
                        <Feather name="x" size={20} color="#64748B" />
                      </TouchableOpacity>
                    </View>
                    <View style={{ padding: 20, gap: 14 }}>
                      <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.modalSectionLabel}>Plan</Text>
                          <View style={[styles.modalInput, { justifyContent: 'center' }]}>
                            <Text style={{ color: '#0F172A', fontSize: 13 }}>{editingSubModal.plan}</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.modalSectionLabel}>Status</Text>
                          <View style={[styles.modalInput, { justifyContent: 'center' }]}>
                            <Text style={{ color: '#0F172A', fontSize: 13 }}>{editingSubModal.status}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.modalSectionLabel}>Start Date</Text>
                          <View style={[styles.modalInput, { justifyContent: 'center' }]}>
                            <Text style={{ color: '#0F172A', fontSize: 13 }}>{editingSubModal.startDate}</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.modalSectionLabel}>End Date</Text>
                          <View style={[styles.modalInput, { justifyContent: 'center' }]}>
                            <Text style={{ color: '#0F172A', fontSize: 13 }}>{editingSubModal.endDate}</Text>
                          </View>
                        </View>
                      </View>
                      <Text style={styles.modalSectionLabel}>Additional Notes</Text>
                      <TextInput
                        style={[styles.modalInput, { height: 72, textAlignVertical: 'top' }]}
                        placeholder="Add notes about this edit..."
                        placeholderTextColor="#94A3B8"
                        multiline
                      />
                      <View style={styles.modalActions}>
                        <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setEditingSubModal(null)}>
                          <Text style={styles.modalCancelBtnText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalSubmitBtn} onPress={() => { notifyAction(setSubActionMessage, `Subscription ${editingSubModal.id} updated successfully.`); setEditingSubModal(null); }}>
                          <Text style={styles.modalSubmitBtnText}>Save Changes</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* ========================================================= */}
          {/* LLM DATA IMPORT TAB                                       */}
          {/* ========================================================= */}

          {/* ========================================================= */}
          {/* LLM DATA IMPORT TAB                                       */}
          {/* ========================================================= */}
          {activeNav === 'LLM Data Import' && (
            <View style={styles.tabContentContainer}>
              {/* Breadcrumb */}
              <View style={styles.breadcrumbRow}>
                <Text style={styles.breadcrumbLink} onPress={() => setActiveNav('Dashboard')}>Dashboard</Text>
                <Text style={styles.breadcrumbDivider}>›</Text>
                <Text style={styles.breadcrumbActive}>LLM Data Import</Text>
              </View>

              <View style={styles.subScreenHeaderRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.greetingTitle}>LLM Data Import</Text>
                  <Text style={styles.greetingSubtitle}>Monitor and manage data ingestion into the AI/LLM knowledge layer.</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: 10, maxWidth: 320 }}>
                    <Text style={{ fontSize: 11, color: '#1E40AF', lineHeight: 15 }}>
                      ℹ️ Client documents are uploaded by each client through their portal. This page lets you monitor, manage and reprocess the imported data.
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.primaryActionBtn} onPress={() => setShowImportModal(true)}>
                    <Feather name="upload-cloud" size={16} color="#FFF" style={{ marginRight: 6 }} />
                    <Text style={styles.primaryActionBtnText}>Import Data</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* KPI Cards */}
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#EFF6FF' }]}>
                    <MaterialCommunityIcons name="cloud-sync-outline" size={24} color="#0066FF" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Total Imports</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>128</Text>
                      <View style={styles.kpiTrendBadge}>
                        <Feather name="arrow-up-right" size={12} color="#10B981" />
                        <Text style={styles.kpiTrendText}>+12%</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>+14 this month</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#ECFDF5' }]}>
                    <MaterialCommunityIcons name="check-circle-outline" size={24} color="#10B981" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Completed</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>116</Text>
                      <View style={[styles.kpiTrendBadge, { backgroundColor: '#ECFDF5' }]}>
                        <Text style={[styles.kpiTrendText, { color: '#059669' }]}>90.6% of total</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>Indexed into knowledge base</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#FEF3C7' }]}>
                    <MaterialCommunityIcons name="timer-outline" size={24} color="#F59E0B" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Processing</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>8</Text>
                      <View style={[styles.kpiTrendBadge, { backgroundColor: '#FEF3C7' }]}>
                        <Text style={[styles.kpiTrendText, { color: '#B45309' }]}>6.3% of total</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>Currently vectorizing</Text>
                  </View>
                </View>

                <View style={styles.kpiCard}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#FEE2E2' }]}>
                    <MaterialCommunityIcons name="alert-octagon-outline" size={24} color="#EF4444" />
                  </View>
                  <View style={styles.kpiInfoCol}>
                    <Text style={styles.kpiCardLabel}>Failed</Text>
                    <View style={styles.kpiValueRow}>
                      <Text style={styles.kpiCardValue}>4</Text>
                      <View style={[styles.kpiTrendBadge, { backgroundColor: '#FEE2E2' }]}>
                        <Text style={[styles.kpiTrendText, { color: '#DC2626' }]}>3.1% of total</Text>
                      </View>
                    </View>
                    <Text style={styles.kpiCardSubtext}>Needs reprocessing</Text>
                  </View>
                </View>
              </View>

              {/* Tabs */}
              <View style={styles.moduleTabBar}>
                {['Import History', 'Data Sources', 'Failed Imports', 'Processing Queue', 'Settings'].map(tab => (
                  <TouchableOpacity key={tab} style={[styles.moduleTab, importTab === tab && styles.moduleTabActive]}
                    onPress={() => setImportTab(tab)}>
                    <Text style={[styles.moduleTabText, importTab === tab && styles.moduleTabTextActive]}>{tab}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Compact Search + Filters */}
              <View style={[styles.actionFilterBar, { zIndex: 110 }]}>
                {/* Search Box */}
                <View style={styles.compactSearchBox}>
                  <Feather name="search" size={15} color="#94A3B8" style={{ marginRight: 8 }} />
                  <TextInput
                    placeholder="Search client, file, ID..."
                    placeholderTextColor="#94A3B8"
                    value={importSearch}
                    onChangeText={setImportSearch}
                    style={styles.innerSearch}
                  />
                  {importSearch ? (
                    <TouchableOpacity onPress={() => setImportSearch('')}>
                      <Feather name="x" size={14} color="#94A3B8" />
                    </TouchableOpacity>
                  ) : null}
                </View>

                {/* Client Dropdown */}
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity
                    style={[styles.filterDropdownBtn, importClientFilter !== 'All Clients' && styles.filterDropdownBtnActive]}
                    onPress={() => {
                      setImpClientOpen(!impClientOpen);
                      setImpStatusOpen(false);
                      setImpDateOpen(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.filterInlineLabel}>Client:</Text>
                    <Text style={[styles.filterDropdownText, importClientFilter !== 'All Clients' && { color: '#0066FF', fontWeight: '700' }]}>{importClientFilter}</Text>
                    <Feather name="chevron-down" size={13} color={importClientFilter !== 'All Clients' ? '#0066FF' : '#64748B'} />
                  </TouchableOpacity>
                  {impClientOpen && (
                    <View style={styles.filterDropdownMenu}>
                      {['All Clients', 'TechNova Solutions', 'AutoDrive Ltd', 'HealthPlus', 'EduSmart Learning', 'RetailCorp', 'GreenEnergy Inc', 'FinSecure Bank'].map((c) => (
                        <TouchableOpacity
                          key={c}
                          style={[styles.dropdownMenuItem, importClientFilter === c && { backgroundColor: '#EFF6FF' }]}
                          onPress={() => {
                            setImportClientFilter(c);
                            setImpClientOpen(false);
                          }}
                        >
                          <Text style={[styles.dropdownMenuItemText, importClientFilter === c && { color: '#0066FF', fontWeight: '700' }]}>
                            {c}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Status Dropdown */}
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity
                    style={[styles.filterDropdownBtn, importStatusFilter !== 'All Statuses' && styles.filterDropdownBtnActive]}
                    onPress={() => {
                      setImpStatusOpen(!impStatusOpen);
                      setImpClientOpen(false);
                      setImpDateOpen(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.filterInlineLabel}>Status:</Text>
                    <Text style={[styles.filterDropdownText, importStatusFilter !== 'All Statuses' && { color: '#0066FF', fontWeight: '700' }]}>{importStatusFilter}</Text>
                    <Feather name="chevron-down" size={13} color={importStatusFilter !== 'All Statuses' ? '#0066FF' : '#64748B'} />
                  </TouchableOpacity>
                  {impStatusOpen && (
                    <View style={styles.filterDropdownMenu}>
                      {['All Statuses', 'Completed', 'Processing', 'Failed'].map((s) => (
                        <TouchableOpacity
                          key={s}
                          style={[styles.dropdownMenuItem, importStatusFilter === s && { backgroundColor: '#EFF6FF' }]}
                          onPress={() => {
                            setImportStatusFilter(s);
                            setImpStatusOpen(false);
                          }}
                        >
                          <Text style={[styles.dropdownMenuItemText, importStatusFilter === s && { color: '#0066FF', fontWeight: '700' }]}>
                            {s}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Date Range Dropdown */}
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity
                    style={[styles.filterDropdownBtn, importDateFilter !== 'All Time' && styles.filterDropdownBtnActive]}
                    onPress={() => {
                      setImpDateOpen(!impDateOpen);
                      setImpClientOpen(false);
                      setImpStatusOpen(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Feather name="calendar" size={13} color="#64748B" style={{ marginRight: 4 }} />
                    <Text style={styles.filterInlineLabel}>Date:</Text>
                    <Text style={[styles.filterDropdownText, importDateFilter !== 'All Time' && { color: '#0066FF', fontWeight: '700' }]}>{importDateFilter}</Text>
                    <Feather name="chevron-down" size={13} color="#64748B" />
                  </TouchableOpacity>
                  {impDateOpen && (
                    <View style={styles.filterDropdownMenu}>
                      {['All Time', 'Today', 'This Week', 'This Month'].map((d) => (
                        <TouchableOpacity
                          key={d}
                          style={[styles.dropdownMenuItem, importDateFilter === d && { backgroundColor: '#EFF6FF' }]}
                          onPress={() => {
                            setImportDateFilter(d);
                            setImpDateOpen(false);
                          }}
                        >
                          <Text style={[styles.dropdownMenuItemText, importDateFilter === d && { color: '#0066FF', fontWeight: '700' }]}>
                            {d}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Filter and Reset Buttons */}
                <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                  <TouchableOpacity style={styles.filterApplyBtn} onPress={() => {}}>
                    <Feather name="filter" size={13} color="#FFF" style={{ marginRight: 5 }} />
                    <Text style={styles.filterApplyBtnText}>Filter</Text>
                  </TouchableOpacity>

                  {(importSearch !== '' || importClientFilter !== 'All Clients' || importStatusFilter !== 'All Statuses' || importDateFilter !== 'All Time') && (
                    <TouchableOpacity style={styles.filterResetBtn} onPress={() => { setImportSearch(''); setImportClientFilter('All Clients'); setImportStatusFilter('All Statuses'); setImportDateFilter('All Time'); }}>
                      <Feather name="rotate-ccw" size={13} color="#64748B" style={{ marginRight: 4 }} />
                      <Text style={styles.filterResetBtnText}>Reset</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>


              {/* Table + Detail Panel Row */}
              <View style={{ flexDirection: 'row', gap: 16 }}>
                {/* Import History Table */}
                <View style={[styles.contentCard, { flex: selectedImportModal ? 1.4 : 1 }]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <Text style={styles.cardHeaderTitle}>Import History (128)</Text>
                    <Text style={{ fontSize: 12, color: '#64748B' }}>Showing 1 to 10 of 128 imports</Text>
                  </View>

                  <View style={[styles.tableHeadBar, { backgroundColor: '#F8FAFC' }]}>
                    <Text style={[styles.thColText, { flex: 0.4 }]}>#</Text>
                    <Text style={[styles.thColText, { flex: 1.4 }]}>Import ID</Text>
                    <Text style={[styles.thColText, { flex: 1.4 }]}>Client</Text>
                    <Text style={[styles.thColText, { flex: 1.0 }]}>Data Source</Text>
                    <Text style={[styles.thColText, { flex: 0.5 }]}>Files</Text>
                    <Text style={[styles.thColText, { flex: 1.4 }]}>Imported On</Text>
                    <Text style={[styles.thColText, { flex: 0.8 }]}>Status</Text>
                    <Text style={[styles.thColText, { flex: 0.7, textAlign: 'right' }]}>Actions</Text>
                  </View>

                  {[
                    { id: 'IMP-20250908-001', client: 'TechNova Solutions', source: 'Client Upload', files: 5, date: '08 Sep 2025\n10:15 AM', status: 'Completed' },
                    { id: 'IMP-20250907-003', client: 'AutoDrive Ltd', source: 'Client Upload', files: 8, date: '07 Sep 2025\n04:30 PM', status: 'Completed' },
                    { id: 'IMP-20250907-015', client: 'HealthPlus', source: 'Client Upload', files: 6, date: '06 Sep 2025\n11:22 AM', status: 'Failed' },
                    { id: 'IMP-20250906-011', client: 'EduSmart Learning', source: 'Client Upload', files: 12, date: '06 Sep 2025\n02:10 PM', status: 'Processing' },
                    { id: 'IMP-20250906-008', client: 'RetailCorp', source: 'API Import', files: 3, date: '05 Sep 2025\n08:45 AM', status: 'Completed' },
                    { id: 'IMP-20250904-006', client: 'GreenEnergy Inc', source: 'Client Upload', files: 7, date: '04 Sep 2025\n05:15 PM', status: 'Completed' },
                    { id: 'IMP-20250903-003', client: 'FinSecure Bank', source: 'API Import', files: 10, date: '03 Sep 2025\n09:30 AM', status: 'Completed' },
                    { id: 'IMP-20250902-004', client: 'LogiTrans Global', source: 'Client Upload', files: 4, date: '02 Sep 2025\n11:05 AM', status: 'Failed' },
                    { id: 'IMP-20250901-002', client: 'CloudNest', source: 'Client Upload', files: 9, date: '01 Sep 2025\n05:40 PM', status: 'Completed' },
                    { id: 'IMP-20250831-001', client: 'InnoTech Systems', source: 'Manual Import', files: 5, date: '31 Aug 2025\n10:25 AM', status: 'Completed' },
                  ].filter(item => {
                    const ms = importSearch.toLowerCase();
                    const matchSearch = item.client.toLowerCase().includes(ms) || item.id.toLowerCase().includes(ms) || item.source.toLowerCase().includes(ms);
                    const matchStatus = importStatusFilter === 'All Statuses' || item.status === importStatusFilter;
                    const matchClient = importClientFilter === 'All Clients' || item.client === importClientFilter;
                    return matchSearch && matchStatus && matchClient;
                  }).map((item, idx) => (
                    <View key={item.id} style={[styles.tableClickableRow, selectedImportModal?.id === item.id && { backgroundColor: '#EFF6FF' }]}>
                      <Text style={[styles.tdNumberText, { flex: 0.4 }]}>{idx + 1}</Text>
                      <Text style={[styles.tdBoldIdText, { flex: 1.4, fontSize: 11 }]}>{item.id}</Text>
                      <Text style={[styles.companyNameCellText, { flex: 1.4, fontSize: 12 }]}>{item.client}</Text>
                      <Text style={[styles.tdNumberText, { flex: 1.0 }]}>{item.source}</Text>
                      <Text style={[styles.tdNumberText, { flex: 0.5 }]}>{item.files}</Text>
                      <Text style={[styles.tdDateText, { flex: 1.4, fontSize: 11 }]}>{item.date}</Text>
                      <View style={{ flex: 0.8 }}>
                        <View style={item.status === 'Completed' ? styles.statusActivePill : item.status === 'Processing' ? styles.statusExpiringPill : styles.statusExpiredPill}>
                          <View style={item.status === 'Completed' ? styles.dotActiveGreen : item.status === 'Processing' ? styles.dotAmber : styles.dotRed} />
                          <Text style={item.status === 'Completed' ? styles.statusActiveText : item.status === 'Processing' ? styles.statusExpiringText : styles.statusExpiredText}>
                            {item.status}
                          </Text>
                        </View>
                      </View>
                      <View style={{ flex: 0.7, flexDirection: 'row', justifyContent: 'flex-end', gap: 4 }}>
                        <TouchableOpacity style={styles.viewSmallBtn} onPress={() => setSelectedImportModal(selectedImportModal?.id === item.id ? null : item)}>
                          <Text style={styles.viewSmallBtnText}>View</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}

                  {/* Pagination */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' }}>
                    <TouchableOpacity style={[styles.filterResetBtn, { paddingHorizontal: 12 }]}>
                      <Text style={{ fontSize: 12, color: '#64748B' }}>‹ Prev</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                      {[1, 2, 3, 4, 5].map(p => (
                        <View key={p} style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: p === 1 ? '#0066FF' : '#F1F5F9', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 12, color: p === 1 ? '#FFF' : '#64748B', fontWeight: '600' }}>{p}</Text>
                        </View>
                      ))}
                      <Text style={{ fontSize: 12, color: '#64748B', alignSelf: 'center' }}>... 13</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Text style={{ fontSize: 12, color: '#64748B' }}>10 per page</Text>
                      <TouchableOpacity style={[styles.filterApplyBtn, { paddingHorizontal: 12 }]}>
                        <Text style={{ fontSize: 12, color: '#FFF' }}>Next ›</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Import Details Side Panel */}
                {selectedImportModal && (
                  <View style={{ width: 300, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 16, alignSelf: 'flex-start' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: '#0F172A' }}>Import Details</Text>
                      <TouchableOpacity onPress={() => setSelectedImportModal(null)}>
                        <Feather name="x" size={16} color="#64748B" />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>{selectedImportModal.id}</Text>
                      <View style={selectedImportModal.status === 'Completed' ? styles.statusActivePill : selectedImportModal.status === 'Processing' ? styles.statusExpiringPill : styles.statusExpiredPill}>
                        <View style={selectedImportModal.status === 'Completed' ? styles.dotActiveGreen : selectedImportModal.status === 'Processing' ? styles.dotAmber : styles.dotRed} />
                        <Text style={selectedImportModal.status === 'Completed' ? styles.statusActiveText : selectedImportModal.status === 'Processing' ? styles.statusExpiringText : styles.statusExpiredText}>{selectedImportModal.status}</Text>
                      </View>
                    </View>

                    {[
                      ['Client', selectedImportModal.client],
                      ['Data Source', selectedImportModal.source],
                      ['Imported On', selectedImportModal.date],
                      ['Files Processed', String(selectedImportModal.files)],
                      ['Total Size', '12.4 MB'],
                      ['Processed Records', '1,245'],
                      ['Duration', '3 min 12 sec'],
                    ].map(([label, val]) => (
                      <View key={label} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' }}>
                        <Text style={{ fontSize: 11.5, color: '#64748B' }}>{label}</Text>
                        <Text style={{ fontSize: 11.5, color: '#0F172A', fontWeight: '600', maxWidth: 140, textAlign: 'right' }}>{val}</Text>
                      </View>
                    ))}

                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A', marginTop: 12, marginBottom: 8 }}>Files ({selectedImportModal.files})</Text>
                    {['hr_policy.pdf', 'leave_policy.docx', 'employee_handbook.pdf', 'faq_company.csv', 'benefits_guide.pdf'].slice(0, selectedImportModal.files).map((f, i) => (
                      <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <MaterialCommunityIcons name="file-document-outline" size={14} color="#0066FF" />
                          <Text style={{ fontSize: 11, color: '#475569', maxWidth: 140 }} numberOfLines={1}>{f}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <Text style={{ fontSize: 10, color: '#64748B' }}>{(Math.random() * 2 + 1).toFixed(1)} MB</Text>
                          <View style={styles.statusActivePill}>
                            <View style={styles.dotActiveGreen} />
                            <Text style={styles.statusActiveText}>Processed</Text>
                          </View>
                        </View>
                      </View>
                    ))}

                    <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
                      <TouchableOpacity style={[styles.filterResetBtn, { flex: 1, justifyContent: 'center' }]}>
                        <Feather name="download" size={13} color="#64748B" style={{ marginRight: 4 }} />
                        <Text style={{ fontSize: 11, color: '#64748B', fontWeight: '600' }}>Download Report</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.filterApplyBtn, { flex: 1, justifyContent: 'center' }]}>
                        <Feather name="refresh-cw" size={13} color="#FFF" style={{ marginRight: 4 }} />
                        <Text style={{ fontSize: 11, color: '#FFF', fontWeight: '600' }}>Reprocess</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}



          {/* ========================================================= */}
          {/* REPORTS & PLATFORM ANALYTICS TAB                          */}
          {/* ========================================================= */}
          {activeNav === 'Reports' && (
            <View style={styles.tabContentContainer}>
              {/* Breadcrumb */}
              <View style={styles.breadcrumbRow}>
                <Text style={styles.breadcrumbLink} onPress={() => setActiveNav('Dashboard')}>Dashboard</Text>
                <Text style={styles.breadcrumbDivider}>›</Text>
                <Text style={styles.breadcrumbActive}>Reports</Text>
              </View>

              {/* Header */}
              <View style={[styles.subScreenHeaderRow, { zIndex: 600, position: 'relative' }]}>
                <View>
                  <Text style={styles.greetingTitle}>Reports</Text>
                  <Text style={styles.greetingSubtitle}>Comprehensive platform analytics, client usage reports, and operational metrics.</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', zIndex: 700 }}>
                  <View style={{ position: 'relative', zIndex: 800 }}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 12, height: 38, gap: 8 }}
                      onPress={() => setRepTopDateOpen(!repTopDateOpen)}
                      activeOpacity={0.8}
                    >
                      <Feather name="calendar" size={14} color="#64748B" />
                      <Text style={{ fontSize: 13, color: '#0F172A', fontWeight: '500' }}>{repTopDateRange}</Text>
                      <Feather name="chevron-down" size={14} color="#64748B" />
                    </TouchableOpacity>
                    {repTopDateOpen && (
                      <View style={[styles.filterDropdownMenu, { right: 0, left: 'auto', minWidth: 230, zIndex: 9999, elevation: 25 }]}>
                        {['01 Sep 2025 — 30 Sep 2025', 'Last 30 Days', 'Last Quarter', 'Year to Date', 'Custom Range'].map((r) => (
                          <TouchableOpacity
                            key={r}
                            style={[styles.dropdownMenuItem, repTopDateRange === r && { backgroundColor: '#EFF6FF' }]}
                            onPress={() => {
                              setRepTopDateRange(r);
                              setRepTopDateOpen(false);
                              notifyAction(setReportActionMessage, `Reports updated for ${r}`);
                            }}
                          >
                            <Text style={[styles.dropdownMenuItemText, repTopDateRange === r && { color: brandColor, fontWeight: '700' }]}>{r}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    style={[styles.primaryActionBtn, { backgroundColor: brandColor }]}
                    onPress={() => {
                      setReportGenerating(true);
                      setTimeout(() => {
                        setReportGenerating(false);
                        setReportGenerated(true);
                        notifyAction(setReportActionMessage, `Report generated successfully for ${repTopDateRange}!`);
                      }, 700);
                    }}
                  >
                    <Feather name="bar-chart-2" size={16} color="#FFF" style={{ marginRight: 6 }} />
                    <Text style={styles.primaryActionBtnText}>{reportGenerating ? 'Generating...' : 'Generate Report'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {reportActionMessage && (
                <View style={{ backgroundColor: '#ECFDF5', borderRadius: 8, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="check-circle" size={16} color="#10B981" style={{ marginRight: 8 }} />
                  <Text style={{ fontSize: 13, color: '#065F46', fontWeight: '600' }}>{reportActionMessage}</Text>
                </View>
              )}

              {/* Sub-tabs bar */}
              <View style={styles.moduleTabBar}>
                {['Overview', 'Client Reports', 'Usage Analytics', 'Subscription Reports', 'LLM Data Reports', 'Custom Reports'].map(tab => (
                  <TouchableOpacity key={tab} style={[styles.moduleTab, reportTab === tab && [styles.moduleTabActive, { borderBottomColor: brandColor }]]}
                    onPress={() => setReportTab(tab)}>
                    <Text style={[styles.moduleTabText, reportTab === tab && [styles.moduleTabTextActive, { color: brandColor }]]}>{tab}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* OVERVIEW TAB CONTENT */}
              {reportTab === 'Overview' && (
                <>
                  {/* 5 KPI Summary Cards */}
                  {(() => {
                    const metrics = REPORT_METRICS_MAP[repTopDateRange] || REPORT_METRICS_MAP['01 Sep 2025 — 30 Sep 2025'];
                    return (
                      <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                        <View style={styles.kpiCard}>
                          <View style={[styles.kpiIconSquare, { backgroundColor: '#EFF6FF' }]}>
                            <MaterialCommunityIcons name="message-text-outline" size={22} color={brandColor} />
                          </View>
                          <View style={styles.kpiInfoCol}>
                            <Text style={styles.kpiCardLabel}>Total Questions</Text>
                            <View style={styles.kpiValueRow}>
                              <Text style={styles.kpiCardValue}>{metrics.questions}</Text>
                              <View style={styles.kpiTrendBadge}>
                                <Feather name="arrow-up-right" size={12} color="#10B981" />
                                <Text style={styles.kpiTrendText}>{metrics.qTrend}</Text>
                              </View>
                            </View>
                            <Text style={styles.kpiCardSubtext}>{metrics.subtext}</Text>
                          </View>
                        </View>

                        <View style={styles.kpiCard}>
                          <View style={[styles.kpiIconSquare, { backgroundColor: '#F0FDF4' }]}>
                            <MaterialCommunityIcons name="account-group-outline" size={22} color="#16A34A" />
                          </View>
                          <View style={styles.kpiInfoCol}>
                            <Text style={styles.kpiCardLabel}>Active Clients</Text>
                            <View style={styles.kpiValueRow}>
                              <Text style={styles.kpiCardValue}>{metrics.activeClients}</Text>
                              <View style={styles.kpiTrendBadge}>
                                <Feather name="arrow-up-right" size={12} color="#10B981" />
                                <Text style={styles.kpiTrendText}>{metrics.cTrend}</Text>
                              </View>
                            </View>
                            <Text style={styles.kpiCardSubtext}>of 52 total clients</Text>
                          </View>
                        </View>

                        <View style={styles.kpiCard}>
                          <View style={[styles.kpiIconSquare, { backgroundColor: '#F5F3FF' }]}>
                            <MaterialCommunityIcons name="account-multiple-outline" size={22} color="#7C3AED" />
                          </View>
                          <View style={styles.kpiInfoCol}>
                            <Text style={styles.kpiCardLabel}>Total Users</Text>
                            <View style={styles.kpiValueRow}>
                              <Text style={styles.kpiCardValue}>{metrics.users}</Text>
                              <View style={styles.kpiTrendBadge}>
                                <Feather name="arrow-up-right" size={12} color="#10B981" />
                                <Text style={styles.kpiTrendText}>{metrics.uTrend}</Text>
                              </View>
                            </View>
                            <Text style={styles.kpiCardSubtext}>across all clients</Text>
                          </View>
                        </View>

                        <View style={styles.kpiCard}>
                          <View style={[styles.kpiIconSquare, { backgroundColor: '#E0F2FE' }]}>
                            <MaterialCommunityIcons name="speedometer" size={22} color="#0284C7" />
                          </View>
                          <View style={styles.kpiInfoCol}>
                            <Text style={styles.kpiCardLabel}>Avg. Response Time</Text>
                            <View style={styles.kpiValueRow}>
                              <Text style={styles.kpiCardValue}>{metrics.latency}</Text>
                              <View style={styles.kpiTrendBadge}>
                                <Feather name="arrow-down-right" size={12} color="#10B981" />
                                <Text style={styles.kpiTrendText}>{metrics.lTrend}</Text>
                              </View>
                            </View>
                            <Text style={styles.kpiCardSubtext}>{metrics.subtext}</Text>
                          </View>
                        </View>

                        <View style={styles.kpiCard}>
                          <View style={[styles.kpiIconSquare, { backgroundColor: '#ECFDF5' }]}>
                            <MaterialCommunityIcons name="currency-inr" size={22} color="#10B981" />
                          </View>
                          <View style={styles.kpiInfoCol}>
                            <Text style={styles.kpiCardLabel}>Subscription Revenue</Text>
                            <View style={styles.kpiValueRow}>
                              <Text style={styles.kpiCardValue}>{metrics.revenue}</Text>
                              <View style={styles.kpiTrendBadge}>
                                <Feather name="arrow-up-right" size={12} color="#10B981" />
                                <Text style={styles.kpiTrendText}>{metrics.rTrend}</Text>
                              </View>
                            </View>
                            <Text style={styles.kpiCardSubtext}>{metrics.periodLabel}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })()}

                  {/* Charts Row 1 */}
                  <View style={[styles.middleGridRow, isMobile && styles.middleGridRowMobile]}>
                    {/* Questions Over Time Line Graph */}
                    <View style={[styles.contentCard, { flex: 1.2 }]}>
                      <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardHeaderTitle}>Questions Over Time</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <Text style={{ fontSize: 12, color: '#64748B' }}>Questions Asked</Text>
                          <Feather name="chevron-down" size={14} color="#64748B" />
                        </View>
                      </View>

                      {/* SVG Line Graph */}
                      <View style={{ height: 160, width: '100%', marginTop: 10 }}>
                        <svg width="100%" height="100%" viewBox="0 0 450 140" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                          <defs>
                            <linearGradient id="qOverTimeGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0066FF" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          {/* Gridlines */}
                          {[20, 50, 80, 110].map((y, i) => (
                            <line key={i} x1="30" y1={y} x2="440" y2={y} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                          ))}
                          {/* Area Fill */}
                          <path d="M 30,95 L 30,90 Q 75,70 100,80 T 170,60 T 240,40 T 310,48 T 380,30 L 430,15 L 430,120 L 30,120 Z" fill="url(#qOverTimeGrad)" />
                          {/* Line */}
                          <path d="M 30,90 Q 75,70 100,80 T 170,60 T 240,40 T 310,48 T 380,30 L 430,15" fill="none" stroke="#0066FF" strokeWidth="3" strokeLinecap="round" />
                          {/* Data points */}
                          {[[30,90],[100,80],[170,60],[240,40],[310,48],[380,30],[430,15]].map(([cx, cy], i) => (
                            <circle key={i} cx={cx} cy={cy} r="4" fill="#0066FF" stroke="#FFF" strokeWidth="2" />
                          ))}
                        </svg>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 4 }}>
                        {['1 Sep', '5 Sep', '10 Sep', '15 Sep', '20 Sep', '25 Sep', '30 Sep'].map((lbl, idx) => (
                          <Text key={idx} style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: '500' }}>{lbl}</Text>
                        ))}
                      </View>
                    </View>

                    {/* Client Usage Distribution */}
                    <View style={[styles.contentCard, { flex: 0.9 }]}>
                      <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardHeaderTitle}>Client Usage Distribution</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 16 }}>
                        {/* Donut graphic */}
                        <View style={{ width: 110, height: 110, borderRadius: 55, borderWidth: 14, borderColor: '#0066FF', justifyContent: 'center', alignItems: 'center', borderRightColor: '#7C3AED', borderBottomColor: '#10B981', borderLeftColor: '#F59E0B' }}>
                          <Text style={{ fontSize: 13, fontWeight: '800', color: '#0F172A' }}>1,24,532</Text>
                          <Text style={{ fontSize: 9.5, color: '#64748B', fontWeight: '600' }}>Questions</Text>
                        </View>
                        <View style={{ gap: 6, flex: 1 }}>
                          {[
                            { label: 'TechNova Solutions', val: '28%', color: '#0066FF' },
                            { label: 'AutoDrive Ltd', val: '22%', color: '#7C3AED' },
                            { label: 'HealthPlus', val: '18%', color: '#10B981' },
                            { label: 'EduSmart Learning', val: '15%', color: '#F59E0B' },
                            { label: 'RetailCorp', val: '10%', color: '#EC4899' },
                            { label: 'Others', val: '7%', color: '#64748B' },
                          ].map((item, i) => (
                            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: item.color }} />
                                <Text style={{ fontSize: 11, color: '#475569', fontWeight: '500' }} numberOfLines={1}>{item.label}</Text>
                              </View>
                              <Text style={{ fontSize: 11, color: '#0F172A', fontWeight: '700' }}>{item.val}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>

                    {/* Plan-wise Usage Bar Chart */}
                    <View style={[styles.contentCard, { flex: 0.9 }]}>
                      <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardHeaderTitle}>Plan-wise Usage</Text>
                        <Text style={{ fontSize: 11, color: '#64748B' }}>Questions Asked</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', height: 140, marginTop: 12 }}>
                        {[
                          { plan: 'Gold', val: '58,230', height: 85, color: '#0066FF' },
                          { plan: 'Silver', val: '34,450', height: 55, color: '#0066FF' },
                          { plan: 'Platinum', val: '24,120', height: 40, color: '#0066FF' },
                          { plan: 'Custom', val: '7,732', height: 18, color: '#0066FF' },
                        ].map((b, i) => (
                          <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 10, color: '#475569', fontWeight: '700', marginBottom: 4 }}>{b.val}</Text>
                            <View style={{ width: 28, height: Math.round(b.height * 1.4), backgroundColor: b.color, borderRadius: 4, opacity: 0.8 + (i * 0.05) }} />
                            <Text style={{ fontSize: 11, color: '#64748B', fontWeight: '600', marginTop: 6 }}>{b.plan}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  {/* Charts Row 2 */}
                  <View style={[styles.middleGridRow, isMobile && styles.middleGridRowMobile, { marginTop: 16 }]}>
                    {/* Subscription Status Donut */}
                    <View style={[styles.contentCard, { flex: 0.9 }]}>
                      <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardHeaderTitle}>Subscription Status</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 16 }}>
                        <View style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 12, borderColor: '#10B981', justifyContent: 'center', alignItems: 'center', borderRightColor: '#F59E0B', borderBottomColor: '#EF4444' }}>
                          <Text style={{ fontSize: 15, fontWeight: '800', color: '#0F172A' }}>52</Text>
                          <Text style={{ fontSize: 9, color: '#64748B', fontWeight: '600' }}>Total Clients</Text>
                        </View>
                        <View style={{ gap: 10, flex: 1 }}>
                          {[
                            { label: 'Active', count: '48 (92%)', color: '#10B981' },
                            { label: 'Expiring Soon', count: '3 (6%)', color: '#F59E0B' },
                            { label: 'Expired', count: '1 (2%)', color: '#EF4444' },
                          ].map((st, i) => (
                            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: st.color }} />
                                <Text style={{ fontSize: 12, color: '#475569', fontWeight: '500' }}>{st.label}</Text>
                              </View>
                              <Text style={{ fontSize: 12, color: '#0F172A', fontWeight: '700' }}>{st.count}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>

                    {/* Response Time Distribution */}
                    <View style={[styles.contentCard, { flex: 1.1 }]}>
                      <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardHeaderTitle}>Response Time Distribution</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', height: 140, marginTop: 12 }}>
                        {[
                          { range: '< 1s', val: '35,420', height: 90, color: '#7C3AED' },
                          { range: '1-2s', val: '28,310', height: 72, color: '#7C3AED' },
                          { range: '2-5s', val: '19,620', height: 48, color: '#7C3AED' },
                          { range: '5-10s', val: '8,450', height: 22, color: '#7C3AED' },
                          { range: '> 10s', val: '3,732', height: 10, color: '#7C3AED' },
                        ].map((b, i) => (
                          <View key={i} style={{ alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 9.5, color: '#475569', fontWeight: '700', marginBottom: 4 }}>{b.val}</Text>
                            <View style={{ width: 26, height: Math.round(b.height * 1.4), backgroundColor: b.color, borderRadius: 4, opacity: 0.75 + (i * 0.05) }} />
                            <Text style={{ fontSize: 11, color: '#64748B', fontWeight: '600', marginTop: 6 }}>{b.range}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    {/* Top Clients by Active Users */}
                    <View style={[styles.contentCard, { flex: 1.0 }]}>
                      <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardHeaderTitle}>Top Clients by Active Users</Text>
                        <Text style={{ fontSize: 11, color: '#64748B' }}>Active Users</Text>
                      </View>
                      <View style={{ gap: 10, marginTop: 10 }}>
                        {[
                          { name: 'TechNova Solutions', users: '420', pct: 90 },
                          { name: 'AutoDrive Ltd', users: '310', pct: 68 },
                          { name: 'HealthPlus', users: '290', pct: 62 },
                          { name: 'EduSmart Learning', users: '210', pct: 45 },
                          { name: 'RetailCorp', users: '180', pct: 38 },
                        ].map((c, i) => (
                          <View key={i}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                              <Text style={{ fontSize: 11.5, color: '#0F172A', fontWeight: '600' }}>{c.name}</Text>
                              <Text style={{ fontSize: 11.5, color: '#0066FF', fontWeight: '700' }}>{c.users}</Text>
                            </View>
                            <View style={{ height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, overflow: 'hidden', flexDirection: 'row' }}>
                              <View style={{ flex: c.pct, height: 6, backgroundColor: '#0066FF', borderRadius: 3 }} />
                              <View style={{ flex: 100 - c.pct }} />
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  {/* Bottom Table: Recent Activity Overview */}
                  <View style={[styles.contentCard, { marginTop: 16 }]}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardHeaderTitle}>Recent Activity Overview</Text>
                      <Text style={{ fontSize: 12, color: '#64748B' }}>Showing 1 to 5 of 52 clients</Text>
                    </View>

                    <View style={[styles.tableHeadBar, { backgroundColor: '#F8FAFC' }]}>
                      <Text style={[styles.thColText, { flex: 0.4 }]}>#</Text>
                      <Text style={[styles.thColText, { flex: 1.8 }]}>Client Name</Text>
                      <Text style={[styles.thColText, { flex: 1.2 }]}>Questions Asked</Text>
                      <Text style={[styles.thColText, { flex: 1.0 }]}>Active Users</Text>
                      <Text style={[styles.thColText, { flex: 1.2 }]}>Avg Response Time</Text>
                      <Text style={[styles.thColText, { flex: 1.2 }]}>Subscription Plan</Text>
                      <Text style={[styles.thColText, { flex: 1.0 }]}>Status</Text>
                      <Text style={[styles.thColText, { flex: 1.5 }]}>Last Activity</Text>
                      <Text style={[styles.thColText, { flex: 0.8, textAlign: 'right' }]}>Actions</Text>
                    </View>

                    {[
                      { id: 1, name: 'TechNova Solutions', questions: '28,450', users: 420, latency: '2.1 sec', plan: 'Gold', status: 'Active', time: '08 Sep 2025, 10:24 AM' },
                      { id: 2, name: 'AutoDrive Ltd', questions: '18,230', users: 310, latency: '2.5 sec', plan: 'Silver', status: 'Active', time: '08 Sep 2025, 09:18 AM' },
                      { id: 3, name: 'HealthPlus', questions: '15,620', users: 200, latency: '2.8 sec', plan: 'Platinum', status: 'Active', time: '07 Sep 2025, 05:42 PM' },
                      { id: 4, name: 'EduSmart Learning', questions: '12,450', users: 210, latency: '3.1 sec', plan: 'Gold', status: 'Expiring Soon', time: '07 Sep 2025, 11:30 AM' },
                      { id: 5, name: 'RetailCorp', questions: '9,780', users: 180, latency: '2.9 sec', plan: 'Silver', status: 'Active', time: '06 Sep 2025, 02:15 PM' },
                    ].map((row) => (
                      <View key={row.id} style={styles.tableClickableRow}>
                        <Text style={[styles.tdNumberText, { flex: 0.4 }]}>{row.id}</Text>
                        <Text style={[styles.companyNameCellText, { flex: 1.8 }]}>{row.name}</Text>
                        <Text style={[styles.tdNumberText, { flex: 1.2 }]}>{row.questions}</Text>
                        <Text style={[styles.tdNumberText, { flex: 1.0 }]}>{row.users}</Text>
                        <Text style={[styles.tdNumberText, { flex: 1.2 }]}>{row.latency}</Text>
                        <Text style={[styles.tdPlanText, { flex: 1.2 }]}>{row.plan}</Text>
                        <View style={{ flex: 1.0 }}>
                          <View style={row.status === 'Active' ? styles.statusActivePill : styles.statusExpiringPill}>
                            <View style={row.status === 'Active' ? styles.dotActiveGreen : styles.dotAmber} />
                            <Text style={row.status === 'Active' ? styles.statusActiveText : styles.statusExpiringText}>{row.status}</Text>
                          </View>
                        </View>
                        <Text style={[styles.tdDateText, { flex: 1.5 }]}>{row.time}</Text>
                        <View style={{ flex: 0.8, alignItems: 'flex-end' }}>
                          <TouchableOpacity style={styles.viewSmallBtn} onPress={() => alert(`Detailed operational report for ${row.name}`)}>
                            <Text style={styles.viewSmallBtnText}>View</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9' }}>
                      <Text style={{ fontSize: 12, color: '#64748B' }}>Showing 1 to 5 of 52 clients</Text>
                      <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.filterResetBtn, { paddingHorizontal: 10 }]}><Text style={{ fontSize: 11 }}>‹</Text></TouchableOpacity>
                        {[1, 2, 3, 4, 5].map(p => (
                          <View key={p} style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: p === 1 ? '#0066FF' : '#F1F5F9', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: p === 1 ? '#FFF' : '#64748B', fontWeight: '600' }}>{p}</Text>
                          </View>
                        ))}
                        <Text style={{ fontSize: 11, color: '#64748B' }}>... 11</Text>
                        <TouchableOpacity style={[styles.filterApplyBtn, { paddingHorizontal: 10 }]}><Text style={{ fontSize: 11, color: '#FFF' }}>›</Text></TouchableOpacity>
                      </View>
                      <Text style={{ fontSize: 12, color: '#64748B' }}>5 per page</Text>
                    </View>
                  </View>
                </>
              )}

              {/* CLIENT REPORTS TAB CONTENT */}
              {reportTab === 'Client Reports' && (
                <View style={{ gap: 16 }}>
                  {/* Filters Bar */}
                  <View style={[styles.contentCard, { gap: 14, zIndex: 120 }]}>
                    <Text style={styles.cardHeaderTitle}>Filter Client Reports</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                      {/* Client Dropdown */}
                      <View style={{ position: 'relative' }}>
                        <TouchableOpacity
                          style={[styles.filterDropdownBtn, reportClientFilter !== 'All Clients' && styles.filterDropdownBtnActive]}
                          onPress={() => {
                            setRepClientOpen(!repClientOpen);
                            setRepPlanOpen(false);
                            setRepStatusOpen(false);
                            setRepDateRangeOpen(false);
                          }}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.filterInlineLabel}>Client:</Text>
                          <Text style={[styles.filterDropdownText, reportClientFilter !== 'All Clients' && { color: '#0066FF', fontWeight: '700' }]}>{reportClientFilter}</Text>
                          <Feather name="chevron-down" size={13} color={reportClientFilter !== 'All Clients' ? '#0066FF' : '#64748B'} />
                        </TouchableOpacity>
                        {repClientOpen && (
                          <View style={styles.filterDropdownMenu}>
                            {['All Clients', 'TechNova Solutions', 'AutoDrive Ltd', 'HealthPlus', 'EduSmart Learning', 'RetailCorp'].map((c) => (
                              <TouchableOpacity
                                key={c}
                                style={[styles.dropdownMenuItem, reportClientFilter === c && { backgroundColor: '#EFF6FF' }]}
                                onPress={() => {
                                  setReportClientFilter(c);
                                  setRepClientOpen(false);
                                }}
                              >
                                <Text style={[styles.dropdownMenuItemText, reportClientFilter === c && { color: '#0066FF', fontWeight: '700' }]}>{c}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </View>

                      {/* Subscription Plan Dropdown */}
                      <View style={{ position: 'relative' }}>
                        <TouchableOpacity
                          style={[styles.filterDropdownBtn, reportPlanFilter !== 'All Plans' && styles.filterDropdownBtnActive]}
                          onPress={() => {
                            setRepPlanOpen(!repPlanOpen);
                            setRepClientOpen(false);
                            setRepStatusOpen(false);
                            setRepDateRangeOpen(false);
                          }}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.filterInlineLabel}>Plan:</Text>
                          <Text style={[styles.filterDropdownText, reportPlanFilter !== 'All Plans' && { color: '#0066FF', fontWeight: '700' }]}>{reportPlanFilter}</Text>
                          <Feather name="chevron-down" size={13} color={reportPlanFilter !== 'All Plans' ? '#0066FF' : '#64748B'} />
                        </TouchableOpacity>
                        {repPlanOpen && (
                          <View style={styles.filterDropdownMenu}>
                            {['All Plans', 'Gold', 'Silver', 'Platinum', 'Enterprise'].map((p) => (
                              <TouchableOpacity
                                key={p}
                                style={[styles.dropdownMenuItem, reportPlanFilter === p && { backgroundColor: '#EFF6FF' }]}
                                onPress={() => {
                                  setReportPlanFilter(p);
                                  setRepPlanOpen(false);
                                }}
                              >
                                <Text style={[styles.dropdownMenuItemText, reportPlanFilter === p && { color: '#0066FF', fontWeight: '700' }]}>{p}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </View>

                      {/* Date Range Dropdown */}
                      <View style={{ position: 'relative' }}>
                        <TouchableOpacity
                          style={styles.filterDropdownBtn}
                          onPress={() => {
                            setRepDateRangeOpen(!repDateRangeOpen);
                            setRepClientOpen(false);
                            setRepPlanOpen(false);
                            setRepStatusOpen(false);
                          }}
                          activeOpacity={0.8}
                        >
                          <Feather name="calendar" size={13} color="#64748B" style={{ marginRight: 4 }} />
                          <Text style={styles.filterInlineLabel}>Date:</Text>
                          <Text style={styles.filterDropdownText}>{reportDateFrom} — {reportDateTo}</Text>
                          <Feather name="chevron-down" size={13} color="#64748B" />
                        </TouchableOpacity>
                        {repDateRangeOpen && (
                          <View style={styles.filterDropdownMenu}>
                            {['01 Sep 2025 — 30 Sep 2025', 'This Month', 'Last 3 Months', 'Year to Date'].map((d) => (
                              <TouchableOpacity
                                key={d}
                                style={[styles.dropdownMenuItem, `${reportDateFrom} — ${reportDateTo}` === d && { backgroundColor: '#EFF6FF' }]}
                                onPress={() => {
                                  if (d.includes('—')) {
                                    const parts = d.split(' — ');
                                    setReportDateFrom(parts[0]);
                                    setReportDateTo(parts[1]);
                                  }
                                  setRepDateRangeOpen(false);
                                }}
                              >
                                <Text style={styles.dropdownMenuItemText}>{d}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </View>

                      {/* Status Dropdown */}
                      <View style={{ position: 'relative' }}>
                        <TouchableOpacity
                          style={[styles.filterDropdownBtn, reportStatusFilter !== 'All Statuses' && styles.filterDropdownBtnActive]}
                          onPress={() => {
                            setRepStatusOpen(!repStatusOpen);
                            setRepClientOpen(false);
                            setRepPlanOpen(false);
                            setRepDateRangeOpen(false);
                          }}
                          activeOpacity={0.8}
                        >
                          <Text style={styles.filterInlineLabel}>Status:</Text>
                          <Text style={[styles.filterDropdownText, reportStatusFilter !== 'All Statuses' && { color: '#0066FF', fontWeight: '700' }]}>{reportStatusFilter}</Text>
                          <Feather name="chevron-down" size={13} color={reportStatusFilter !== 'All Statuses' ? '#0066FF' : '#64748B'} />
                        </TouchableOpacity>
                        {repStatusOpen && (
                          <View style={styles.filterDropdownMenu}>
                            {['All Statuses', 'Active', 'Expiring Soon', 'Expired'].map((s) => (
                              <TouchableOpacity
                                key={s}
                                style={[styles.dropdownMenuItem, reportStatusFilter === s && { backgroundColor: '#EFF6FF' }]}
                                onPress={() => {
                                  setReportStatusFilter(s);
                                  setRepStatusOpen(false);
                                }}
                              >
                                <Text style={[styles.dropdownMenuItemText, reportStatusFilter === s && { color: '#0066FF', fontWeight: '700' }]}>{s}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </View>

                      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.filterApplyBtn} onPress={() => setReportGenerated(true)}>
                          <Feather name="play" size={13} color="#FFF" style={{ marginRight: 5 }} />
                          <Text style={styles.filterApplyBtnText}>Generate Report</Text>
                        </TouchableOpacity>
                        {(reportClientFilter !== 'All Clients' || reportPlanFilter !== 'All Plans' || reportStatusFilter !== 'All Statuses') && (
                          <TouchableOpacity style={styles.filterResetBtn} onPress={() => { setReportClientFilter('All Clients'); setReportPlanFilter('All Plans'); setReportStatusFilter('All Statuses'); }}>
                            <Feather name="rotate-ccw" size={13} color="#64748B" style={{ marginRight: 4 }} />
                            <Text style={styles.filterResetBtnText}>Reset</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>


                  {/* Generated Client Report Data Table */}
                  <View style={styles.contentCard}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardHeaderTitle}>Client Operational & Subscription Report</Text>
                      <TouchableOpacity style={styles.filterResetBtn} onPress={() => alert('Exporting Client Report CSV...')}>
                        <Feather name="download" size={13} color="#0066FF" style={{ marginRight: 4 }} />
                        <Text style={{ fontSize: 12, color: '#0066FF', fontWeight: '600' }}>Export CSV</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[styles.tableHeadBar, { backgroundColor: '#F8FAFC' }]}>
                      <Text style={[styles.thColText, { flex: 1.6 }]}>Client Organization</Text>
                      <Text style={[styles.thColText, { flex: 1.0 }]}>Subscription</Text>
                      <Text style={[styles.thColText, { flex: 1.1 }]}>Users Limit</Text>
                      <Text style={[styles.thColText, { flex: 1.2 }]}>Documents Uploaded</Text>
                      <Text style={[styles.thColText, { flex: 1.2 }]}>Total Queries</Text>
                      <Text style={[styles.thColText, { flex: 1.1 }]}>Avg Latency</Text>
                      <Text style={[styles.thColText, { flex: 1.0 }]}>Status</Text>
                      <Text style={[styles.thColText, { flex: 1.0, textAlign: 'right' }]}>Actions</Text>
                    </View>

                    {[
                      { name: 'TechNova Solutions', sub: 'Gold Plan', users: '420 / 500', docs: '128 docs', queries: '28,450', latency: '2.1s', status: 'Active' },
                      { name: 'AutoDrive Ltd', sub: 'Silver Plan', users: '310 / 350', docs: '85 docs', queries: '18,230', latency: '2.5s', status: 'Active' },
                      { name: 'HealthPlus', sub: 'Platinum Plan', users: '200 / 1000', docs: '240 docs', queries: '15,620', latency: '2.8s', status: 'Active' },
                      { name: 'EduSmart Learning', sub: 'Gold Plan', users: '210 / 500', docs: '92 docs', queries: '12,450', latency: '3.1s', status: 'Expiring Soon' },
                      { name: 'RetailCorp', sub: 'Silver Plan', users: '180 / 350', docs: '64 docs', queries: '9,780', latency: '2.9s', status: 'Active' },
                    ].map((row, idx) => (
                      <View key={idx} style={styles.tableClickableRow}>
                        <Text style={[styles.companyNameCellText, { flex: 1.6 }]}>{row.name}</Text>
                        <Text style={[styles.tdPlanText, { flex: 1.0 }]}>{row.sub}</Text>
                        <Text style={[styles.tdNumberText, { flex: 1.1 }]}>{row.users}</Text>
                        <Text style={[styles.tdNumberText, { flex: 1.2 }]}>{row.docs}</Text>
                        <Text style={[styles.tdNumberText, { flex: 1.2 }]}>{row.queries}</Text>
                        <Text style={[styles.tdNumberText, { flex: 1.1 }]}>{row.latency}</Text>
                        <View style={{ flex: 1.0 }}>
                          <View style={row.status === 'Active' ? styles.statusActivePill : styles.statusExpiringPill}>
                            <View style={row.status === 'Active' ? styles.dotActiveGreen : styles.dotAmber} />
                            <Text style={row.status === 'Active' ? styles.statusActiveText : styles.statusExpiringText}>{row.status}</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1.0, alignItems: 'flex-end' }}>
                          <TouchableOpacity style={styles.viewSmallBtn} onPress={() => alert(`Full report generated for ${row.name}`)}>
                            <Text style={styles.viewSmallBtnText}>Full Report</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* OTHER SUB-TABS PLACEHOLDER (Usage, Subscription, LLM Data, Custom Reports) */}
              {(reportTab === 'Usage Analytics' || reportTab === 'Subscription Reports' || reportTab === 'LLM Data Reports' || reportTab === 'Custom Reports') && (
                <View style={[styles.contentCard, { alignItems: 'center', paddingVertical: 40 }]}>
                  <MaterialCommunityIcons name="chart-box-outline" size={48} color="#94A3B8" style={{ marginBottom: 12 }} />
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#0F172A' }}>{reportTab}</Text>
                  <Text style={{ fontSize: 13, color: '#64748B', marginTop: 4, textAlign: 'center', maxWidth: 400 }}>
                    Detailed dimensional analytics for {reportTab.toLowerCase()}. Use the date picker above or generate custom query breakdowns.
                  </Text>
                  <TouchableOpacity style={[styles.primaryActionBtn, { marginTop: 16 }]} onPress={() => alert(`Generating ${reportTab}...`)}>
                    <Text style={styles.primaryActionBtnText}>Export {reportTab} (PDF)</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}


          {/* ========================================================= */}
          {/* MASTER SETTINGS TAB                                       */}

          {/* ========================================================= */}
          {/* MASTER SETTINGS TAB (Exact Matching PDF Page 15, 16, 17)  */}
          {/* ========================================================= */}
          {activeNav === 'Master Settings' && (
            <View style={styles.tabContentContainer}>
              <View style={styles.subScreenHeaderRow}>
                <View>
                  <View style={styles.breadcrumbRow}>
                    <Text style={styles.breadcrumbLink} onPress={() => setActiveNav('Dashboard')}>Dashboard</Text>
                    <Text style={styles.breadcrumbDivider}>›</Text>
                    <Text style={styles.breadcrumbActive}>Master Settings</Text>
                    {settingsTab && (
                      <>
                        <Text style={styles.breadcrumbDivider}>›</Text>
                        <Text style={styles.breadcrumbActive}>{settingsTab}</Text>
                      </>
                    )}
                  </View>
                  <Text style={styles.greetingTitle}>Master Settings</Text>
                  <Text style={styles.greetingSubtitle}>Manage platform-level configuration and master data.</Text>
                </View>
              </View>

              {/* Info Banner (PDF Page 15) */}
              <View style={styles.masterSettingsInfoBanner}>
                <Feather name="info" size={18} color="#0066FF" style={{ marginRight: 10, marginTop: 1 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.masterSettingsInfoTitle}>Master Settings</Text>
                  <Text style={styles.masterSettingsInfoDesc}>
                    Centralized configuration variables used across the platform. These settings help maintain consistent platform behavior and configuration.
                  </Text>
                </View>
              </View>

              {/* 5 Sub-Section Navigation Tabs */}
              <View style={styles.settingsSubTabsRow}>
                {[
                  { id: 'Role Management', label: 'Role Management', icon: 'shield-account-outline' },
                  { id: 'System Configuration', label: 'System Configuration', icon: 'server-security' },
                  { id: 'General Settings', label: 'General Settings', icon: 'tune' },
                  { id: 'Appearance & Branding', label: 'Appearance & Branding', icon: 'palette-outline' },
                  { id: 'Master Data', label: 'Master Data', icon: 'database-settings' },
                ].map((t) => (
                  <TouchableOpacity
                    key={t.id}
                    style={[styles.settingsSubTabBtn, settingsTab === t.id && [styles.settingsSubTabBtnActive, { borderColor: brandColor }]]}
                    onPress={() => setSettingsTab(t.id)}
                  >
                    <MaterialCommunityIcons
                      name={t.icon}
                      size={16}
                      color={settingsTab === t.id ? brandColor : '#64748B'}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={[styles.settingsSubTabBtnText, settingsTab === t.id && [styles.settingsSubTabBtnTextActive, { color: brandColor }]]}>
                      {t.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* 1. ROLE MANAGEMENT (PDF Page 16 Top - Primary SOW Scope) */}
              {settingsTab === 'Role Management' && (
                <View style={styles.contentCard}>
                  <View style={styles.cardHeaderRow}>
                    <View>
                      <Text style={styles.cardHeaderTitle}>Role Management</Text>
                      <Text style={styles.greetingSubtitle}>Manage user roles and permissions. Add, edit, activate or deactivate roles to control platform access.</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.primaryActionBtn}
                      onPress={() => {
                        setRoleFormName('');
                        setRoleFormDesc('');
                        setRoleFormStatus('Active');
                        setRoleFormPermissions(['Dashboard', 'Reports']);
                        setShowAddRoleModal(true);
                      }}
                    >
                      <Feather name="plus" size={14} color="#FFF" style={{ marginRight: 6 }} />
                      <Text style={styles.primaryActionBtnText}>Add Role</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rbacInfoCard}>
                    <MaterialCommunityIcons name="shield-lock-outline" size={20} color="#0066FF" style={{ marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rbacInfoTitle}>Role-Based Access Control</Text>
                      <Text style={styles.rbacInfoDesc}>Define roles and assign permissions to control access to platform features across Admin and Client portals.</Text>
                    </View>
                  </View>

                  <View style={[styles.filterBarRow, { marginTop: 14, marginBottom: 14 }]}>
                    <View style={[styles.searchBarBox, { flex: 1.6 }]}>
                      <Feather name="search" size={15} color="#94A3B8" style={{ marginRight: 8 }} />
                      <TextInput
                        placeholder="Search roles by role name..."
                        placeholderTextColor="#94A3B8"
                        value={roleSearch}
                        onChangeText={setRoleSearch}
                        style={styles.innerSearch}
                      />
                      {roleSearch.length > 0 && (
                        <TouchableOpacity onPress={() => setRoleSearch('')}>
                          <Feather name="x" size={14} color="#94A3B8" />
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={styles.filterDropdownWrapper}>
                      <Text style={styles.filterFieldLabel}>Status</Text>
                      <select
                        style={styles.nativeHtmlSelect}
                        value={roleStatusFilter}
                        onChange={(e) => setRoleStatusFilter(e.target.value)}
                      >
                        <option value="All Status">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </View>
                  </View>

                  <View style={styles.tableHeadBar}>
                    <Text style={[styles.thColText, { width: 32 }]}>#</Text>
                    <Text style={[styles.thColText, { flex: 1.3 }]}>Role Name</Text>
                    <Text style={[styles.thColText, { flex: 2.4 }]}>Description</Text>
                    <Text style={[styles.thColText, { flex: 1.0 }]}>Status</Text>
                    <Text style={[styles.thColText, { flex: 1.0, textAlign: 'right' }]}>Actions</Text>
                  </View>

                  {roles
                    .filter((r) => {
                      const matchesSearch = r.name.toLowerCase().includes(roleSearch.toLowerCase()) || r.desc.toLowerCase().includes(roleSearch.toLowerCase());
                      const matchesStatus = roleStatusFilter === 'All Status' || r.status === roleStatusFilter;
                      return matchesSearch && matchesStatus;
                    })
                    .map((role, idx) => (
                      <View key={role.id} style={styles.tableClickableRow}>
                        <Text style={[styles.tdIndexText, { width: 32 }]}>{idx + 1}</Text>
                        <Text style={[styles.roleNameText, { flex: 1.3 }]}>{role.name}</Text>
                        <Text style={[styles.tdNumberText, { flex: 2.4 }]}>{role.desc}</Text>
                        <View style={{ flex: 1.0 }}>
                          {role.status === 'Active' ? (
                            <View style={styles.statusActivePill}>
                              <View style={styles.dotActiveGreen} />
                              <Text style={styles.statusActiveText}>Active</Text>
                            </View>
                          ) : (
                            <View style={styles.statusExpiredPill}>
                              <View style={styles.dotRed} />
                              <Text style={styles.statusExpiredText}>Inactive</Text>
                            </View>
                          )}
                        </View>
                        <View style={{ flex: 1.0, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
                          <TouchableOpacity
                            style={styles.editSmallBtn}
                            onPress={() => {
                              setEditingRoleModal(role);
                              setRoleFormName(role.name);
                              setRoleFormDesc(role.desc);
                              setRoleFormStatus(role.status);
                              setRoleFormPermissions(role.permissions || ['Dashboard', 'Reports']);
                            }}
                          >
                            <Feather name="edit-2" size={13} color="#0066FF" style={{ marginRight: 4 }} />
                            <Text style={styles.editSmallBtnText}>Edit</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.iconActionBtn}
                            onPress={() => {
                              const newStatus = role.status === 'Active' ? 'Inactive' : 'Active';
                              setRoles(roles.map(r => r.id === role.id ? { ...r, status: newStatus } : r));
                              notifyAction(setRoleActionMessage, `Role ${role.name} set to ${newStatus}.`);
                            }}
                            title={role.status === 'Active' ? 'Deactivate Role' : 'Activate Role'}
                          >
                            <Feather
                              name={role.status === 'Active' ? 'slash' : 'check-circle'}
                              size={14}
                              color={role.status === 'Active' ? '#EF4444' : '#10B981'}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.iconActionBtn}
                            onPress={() => {
                              if (window?.confirm ? window.confirm(`Delete role ${role.name}?`) : true) {
                                setRoles(roles.filter(r => r.id !== role.id));
                                notifyAction(setRoleActionMessage, `Role ${role.name} deleted.`);
                              }
                            }}
                            title="Delete Role"
                          >
                            <Feather name="trash-2" size={14} color="#94A3B8" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}

                  <View style={styles.tablePaginationFooter}>
                    <Text style={styles.paginationShowingText}>Showing 1 to {roles.length} of {roles.length} roles</Text>
                    <View style={styles.paginationPagesRow}>
                      <TouchableOpacity style={[styles.pageBtn, styles.pageBtnActive]}><Text style={styles.pageBtnActiveText}>1</Text></TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* 2. SYSTEM CONFIGURATION (PDF Page 16 Bottom) */}
              {settingsTab === 'System Configuration' && (
                <View style={styles.contentCard}>
                  <View style={styles.cardHeaderRow}>
                    <View>
                      <Text style={styles.cardHeaderTitle}>System Configuration</Text>
                      <Text style={styles.greetingSubtitle}>Maintain platform-level configurable values used by the application.</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.primaryActionBtn}
                      onPress={() => {
                        setConfigFormName('');
                        setConfigFormDesc('');
                        setConfigFormValue('');
                        setShowAddConfigModal(true);
                      }}
                    >
                      <Feather name="plus" size={14} color="#FFF" style={{ marginRight: 6 }} />
                      <Text style={styles.primaryActionBtnText}>Add Configuration</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.rbacInfoCard}>
                    <MaterialCommunityIcons name="tune-vertical" size={20} color="#0066FF" style={{ marginRight: 10 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rbacInfoTitle}>Configuration Settings</Text>
                      <Text style={styles.rbacInfoDesc}>Manage application configuration values. Changes can be made by an administrator and will take effect as per system behavior.</Text>
                    </View>
                  </View>

                  <View style={[styles.filterBarRow, { marginTop: 14, marginBottom: 14 }]}>
                    <View style={[styles.searchBarBox, { flex: 1.8 }]}>
                      <Feather name="search" size={15} color="#94A3B8" style={{ marginRight: 8 }} />
                      <TextInput
                        placeholder="Search configuration name..."
                        placeholderTextColor="#94A3B8"
                        value={configSearch}
                        onChangeText={setConfigSearch}
                        style={styles.innerSearch}
                      />
                    </View>
                  </View>

                  <View style={styles.tableHeadBar}>
                    <Text style={[styles.thColText, { width: 32 }]}>#</Text>
                    <Text style={[styles.thColText, { flex: 1.8 }]}>Configuration Name</Text>
                    <Text style={[styles.thColText, { flex: 2.4 }]}>Description</Text>
                    <Text style={[styles.thColText, { flex: 1.3 }]}>Value</Text>
                    <Text style={[styles.thColText, { flex: 1.0 }]}>Status</Text>
                    <Text style={[styles.thColText, { flex: 0.8, textAlign: 'right' }]}>Actions</Text>
                  </View>

                  {configs
                    .filter(c => c.name.toLowerCase().includes(configSearch.toLowerCase()) || c.desc.toLowerCase().includes(configSearch.toLowerCase()))
                    .map((item, idx) => (
                      <View key={item.id} style={styles.tableClickableRow}>
                        <Text style={[styles.tdIndexText, { width: 32 }]}>{idx + 1}</Text>
                        <Text style={[styles.companyNameCellText, { flex: 1.8 }]}>{item.name}</Text>
                        <Text style={[styles.tdNumberText, { flex: 2.4 }]}>{item.desc}</Text>
                        <View style={{ flex: 1.3 }}>
                          <View style={styles.configBadge}>
                            <Text style={styles.configBadgeText}>{item.value}</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1.0 }}>
                          <View style={styles.statusActivePill}>
                            <View style={styles.dotActiveGreen} />
                            <Text style={styles.statusActiveText}>{item.status}</Text>
                          </View>
                        </View>
                        <View style={{ flex: 0.8, alignItems: 'flex-end' }}>
                          <TouchableOpacity
                            style={styles.viewSmallBtn}
                            onPress={() => {
                              const newVal = prompt(`Edit value for ${item.name}:`, item.value);
                              if (newVal) {
                                setConfigs(configs.map(c => c.id === item.id ? { ...c, value: newVal } : c));
                              }
                            }}
                          >
                            <Text style={styles.viewSmallBtnText}>Edit</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                </View>
              )}

              {/* 3. GENERAL SETTINGS (PDF Page 15 Bottom) */}
              {settingsTab === 'General Settings' && (
                <View style={[styles.middleGridRow, isMobile && styles.middleGridRowMobile]}>
                  <View style={[styles.contentCard, { flex: 1.4 }]}>
                    <Text style={styles.cardHeaderTitle}>Platform Information</Text>
                    <Text style={[styles.greetingSubtitle, { marginBottom: 16 }]}>Basic information about the Platinum Software platform.</Text>

                    {settingsSavedAlert && (
                      <View style={styles.actionSuccessToast}>
                        <Feather name="check-circle" size={16} color="#059669" style={{ marginRight: 8 }} />
                        <Text style={styles.actionSuccessToastText}>General settings updated and applied successfully!</Text>
                      </View>
                    )}

                    <View style={{ gap: 12 }}>
                      <View>
                        <Text style={styles.formLabel}>Platform Name *</Text>
                        <TextInput style={styles.settingsInputBox} value={platformName} onChangeText={setPlatformName} />
                      </View>

                      <View>
                        <Text style={styles.formLabel}>Platform Description</Text>
                        <TextInput style={styles.settingsInputBox} value={platformDesc} onChangeText={setPlatformDesc} />
                      </View>

                      <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.formLabel}>Platform URL</Text>
                          <TextInput style={styles.settingsInputBox} value={platformUrl} onChangeText={setPlatformUrl} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.formLabel}>Support Email</Text>
                          <TextInput style={styles.settingsInputBox} value={supportEmail} onChangeText={setSupportEmail} />
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.formLabel}>Default Language</Text>
                          <select style={styles.settingsSelectBox} value={defaultLang} onChange={(e) => setDefaultLang(e.target.value)}>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                          </select>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.formLabel}>Time Zone</Text>
                          <select style={styles.settingsSelectBox} value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
                            <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                            <option value="America/New_York (EST)">America/New_York (EST)</option>
                            <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                            <option value="Asia/Singapore (SGT)">Asia/Singapore (SGT)</option>
                          </select>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.formLabel}>Date Format</Text>
                          <select style={styles.settingsSelectBox} value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.formLabel}>Time Format</Text>
                          <select style={styles.settingsSelectBox} value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)}>
                            <option value="12 Hour (AM/PM)">12 Hour (AM/PM)</option>
                            <option value="24 Hour">24 Hour</option>
                          </select>
                        </View>
                      </View>

                      <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 14 }}>
                        <Text style={[styles.cardHeaderTitle, { fontSize: 14, marginBottom: 12 }]}>Additional Preferences</Text>

                        <View style={styles.prefToggleRow}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.prefToggleTitle}>Show platform name in browser title</Text>
                            <Text style={styles.prefToggleDesc}>Display platform name in the browser tab title bar.</Text>
                          </View>
                          <TouchableOpacity
                            style={[styles.toggleBtn, prefTitleInBrowser && styles.toggleBtnActive]}
                            onPress={() => setPrefTitleInBrowser(!prefTitleInBrowser)}
                          >
                            <View style={[styles.toggleThumb, prefTitleInBrowser && styles.toggleThumbActive]} />
                          </TouchableOpacity>
                        </View>

                        <View style={styles.prefToggleRow}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.prefToggleTitle}>Enable platform maintenance mode</Text>
                            <Text style={styles.prefToggleDesc}>When active, client logins are held while admins perform updates.</Text>
                          </View>
                          <TouchableOpacity
                            style={[styles.toggleBtn, maintenanceMode && styles.toggleBtnActive]}
                            onPress={() => setMaintenanceMode(!maintenanceMode)}
                          >
                            <View style={[styles.toggleThumb, maintenanceMode && styles.toggleThumbActive]} />
                          </TouchableOpacity>
                        </View>

                        <View style={styles.prefToggleRow}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.prefToggleTitle}>Enable logs & session tracking</Text>
                            <Text style={styles.prefToggleDesc}>Track client active sessions and error logs for debugging.</Text>
                          </View>
                          <TouchableOpacity
                            style={[styles.toggleBtn, prefLogging && styles.toggleBtnActive]}
                            onPress={() => setPrefLogging(!prefLogging)}
                          >
                            <View style={[styles.toggleThumb, prefLogging && styles.toggleThumbActive]} />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                        <TouchableOpacity
                          style={styles.resetActionButton}
                          onPress={() => {
                            setPlatformName('Platinum Software');
                            setPlatformDesc('AI Chatbot Platform for Businesses');
                            setSupportEmail('support@platinumsoftware.com');
                          }}
                        >
                          <Text style={styles.resetActionButtonText}>Reset to Default</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.primaryActionBtn}
                          onPress={() => {
                            setSettingsSavedAlert(true);
                            setTimeout(() => setSettingsSavedAlert(false), 3000);
                          }}
                        >
                          <Text style={styles.primaryActionBtnText}>Save Changes</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={{ flex: 0.95, gap: 16 }}>
                    <View style={styles.contentCard}>
                      <Text style={styles.cardHeaderTitle}>Platform Logo</Text>
                      <Text style={[styles.greetingSubtitle, { marginBottom: 12 }]}>Custom platform logo (recommended size: 320 x 80 px).</Text>
                      <View style={styles.logoPreviewBox}>
                        <MaterialCommunityIcons name="hexagon-multiple" size={32} color="#0066FF" />
                        <View style={{ marginLeft: 10 }}>
                          <Text style={styles.logoPreviewTitle}>{platformName.toUpperCase()}</Text>
                          <Text style={styles.logoPreviewSub}>{brandingTagline}</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={[styles.resetActionButton, { alignSelf: 'flex-start', marginTop: 12 }]} onPress={() => alert('Logo upload dialog ready')}>
                        <Feather name="upload" size={14} color="#0066FF" style={{ marginRight: 6 }} />
                        <Text style={[styles.resetActionButtonText, { color: '#0066FF' }]}>Change Logo</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.contentCard}>
                      <Text style={styles.cardHeaderTitle}>Favicon</Text>
                      <Text style={[styles.greetingSubtitle, { marginBottom: 12 }]}>Custom browser tab icon (recommended size: 32 x 32 px).</Text>
                      <View style={styles.faviconPreviewBox}>
                        <MaterialCommunityIcons name="hexagon-multiple" size={24} color="#0066FF" />
                      </View>
                      <TouchableOpacity style={[styles.resetActionButton, { alignSelf: 'flex-start', marginTop: 12 }]} onPress={() => alert('Favicon upload dialog ready')}>
                        <Feather name="upload" size={14} color="#0066FF" style={{ marginRight: 6 }} />
                        <Text style={[styles.resetActionButtonText, { color: '#0066FF' }]}>Change Favicon</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* 4. APPEARANCE & BRANDING (PDF Page 17 Top) */}
              {settingsTab === 'Appearance & Branding' && (
                <View style={[styles.middleGridRow, isMobile && styles.middleGridRowMobile]}>
                  <View style={[styles.contentCard, { flex: 1.2 }]}>
                    <Text style={styles.cardHeaderTitle}>Customize Platform Branding</Text>
                    <Text style={[styles.greetingSubtitle, { marginBottom: 16 }]}>Customize the visual elements that are displayed across the platform.</Text>

                    {brandingSavedAlert && (
                      <View style={styles.actionSuccessToast}>
                        <Feather name="check-circle" size={16} color="#059669" style={{ marginRight: 8 }} />
                        <Text style={styles.actionSuccessToastText}>Branding elements saved and applied!</Text>
                      </View>
                    )}

                    <View style={{ gap: 14 }}>
                      <View>
                        <Text style={styles.formLabel}>Tagline (Optional)</Text>
                        <TextInput style={styles.settingsInputBox} value={brandingTagline} onChangeText={setBrandingTagline} />
                      </View>

                      <View>
                        <Text style={styles.formLabel}>Footer Text (Optional)</Text>
                        <TextInput style={styles.settingsInputBox} value={brandingFooter} onChangeText={setBrandingFooter} />
                      </View>

                      <View>
                        <Text style={styles.formLabel}>Primary Brand Color</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 }}>
                          <View style={[styles.colorPreviewSquare, { backgroundColor: brandColor }]} />
                          <TextInput
                            style={[styles.settingsInputBox, { width: 140 }]}
                            value={primaryColor}
                            onChangeText={(val) => {
                              setPrimaryColor(val);
                              if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                                applyBrandColor(val);
                              }
                            }}
                          />
                          <View style={{ flexDirection: 'row', gap: 6 }}>
                            {['#0066FF', '#2563EB', '#7C3AED', '#059669', '#DC2626', '#06B6D4'].map(hex => (
                              <TouchableOpacity
                                key={hex}
                                style={[styles.colorSwatchBtn, { backgroundColor: hex }, primaryColor === hex && styles.colorSwatchBtnActive]}
                                onPress={() => applyBrandColor(hex)}
                              />
                            ))}
                          </View>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
                        <TouchableOpacity style={styles.resetActionButton} onPress={() => applyBrandColor('#0066FF')}>
                          <Text style={styles.resetActionButtonText}>Reset to Default</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.primaryActionBtn, { backgroundColor: brandColor }]}
                          onPress={() => {
                            applyBrandColor(primaryColor);
                            setBrandingSavedAlert(true);
                            setTimeout(() => setBrandingSavedAlert(false), 3000);
                          }}
                        >
                          <Text style={styles.primaryActionBtnText}>Save Changes</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.contentCard, { flex: 1.0 }]}>
                    <Text style={styles.cardHeaderTitle}>Live Interface Preview</Text>
                    <Text style={[styles.greetingSubtitle, { marginBottom: 14 }]}>Real-time simulation of your chosen brand colors and platform title.</Text>

                    <View style={styles.livePreviewFrame}>
                      <View style={styles.livePreviewTopBar}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <MaterialCommunityIcons name="hexagon-multiple" size={16} color={primaryColor} />
                          <Text style={[styles.livePreviewLogoText, { color: '#0F172A' }]}>{platformName}</Text>
                        </View>
                        <View style={[styles.livePreviewAvatar, { backgroundColor: primaryColor }]}>
                          <Text style={{ color: '#FFF', fontSize: 10, fontWeight: '700' }}>A</Text>
                        </View>
                      </View>

                      <View style={styles.livePreviewBody}>
                        <Text style={styles.livePreviewWelcome}>Welcome, Admin</Text>
                        <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                          <View style={styles.livePreviewMetricBox}>
                            <Text style={[styles.livePreviewMetricNum, { color: primaryColor }]}>48</Text>
                            <Text style={styles.livePreviewMetricLbl}>Clients</Text>
                          </View>
                          <View style={styles.livePreviewMetricBox}>
                            <Text style={styles.livePreviewMetricNum}>52</Text>
                            <Text style={styles.livePreviewMetricLbl}>Subscriptions</Text>
                          </View>
                        </View>
                        <TouchableOpacity style={[styles.livePreviewBtn, { backgroundColor: primaryColor }]}>
                          <Text style={styles.livePreviewBtnText}>Primary Button</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {/* 5. MASTER DATA */}
              {settingsTab === 'Master Data' && (
                <View style={styles.contentCard}>
                  <Text style={styles.cardHeaderTitle}>Platform Master Data</Text>
                  <Text style={[styles.greetingSubtitle, { marginBottom: 16 }]}>Centralized reference enumerations used across the platform.</Text>

                  <View style={styles.masterDataGrid}>
                    <View style={styles.masterDataCard}>
                      <Text style={styles.masterDataCardTitle}>Client Statuses</Text>
                      <View style={styles.masterDataPillsRow}>
                        <Text style={styles.masterDataPill}>Active</Text>
                        <Text style={styles.masterDataPill}>Expiring Soon</Text>
                        <Text style={styles.masterDataPill}>Inactive</Text>
                      </View>
                    </View>

                    <View style={styles.masterDataCard}>
                      <Text style={styles.masterDataCardTitle}>Industry Verticals</Text>
                      <View style={styles.masterDataPillsRow}>
                        <Text style={styles.masterDataPill}>IT Services</Text>
                        <Text style={styles.masterDataPill}>Healthcare</Text>
                        <Text style={styles.masterDataPill}>Automotive</Text>
                        <Text style={styles.masterDataPill}>Education</Text>
                        <Text style={styles.masterDataPill}>Retail</Text>
                        <Text style={styles.masterDataPill}>Finance</Text>
                        <Text style={styles.masterDataPill}>Energy</Text>
                      </View>
                    </View>

                    <View style={styles.masterDataCard}>
                      <Text style={styles.masterDataCardTitle}>Currencies & Formats</Text>
                      <View style={styles.masterDataPillsRow}>
                        <Text style={styles.masterDataPill}>INR (₹)</Text>
                        <Text style={styles.masterDataPill}>USD ($)</Text>
                        <Text style={styles.masterDataPill}>EUR (€)</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              <View style={styles.masterSettingsNoteBox}>
                <Feather name="alert-triangle" size={16} color="#0284C7" style={{ marginRight: 8, marginTop: 1 }} />
                <Text style={styles.masterSettingsNoteText}>
                  Note: Changes made in Master Settings will apply across the platform. Please ensure the values are correct before saving.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* ========================================================= */}
      {/* MODALS SECTION                                            */}
      {/* ========================================================= */}

      {/* 1. VIEW CLIENT MODAL */}
      {selectedClientModal && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalDialogCard}>
              <View style={styles.modalDialogHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.circleInitialAvatar, { backgroundColor: selectedClientModal.avatarColor, width: 36, height: 36 }]}>
                    <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '800' }}>{selectedClientModal.avatarChar}</Text>
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.modalDialogTitle}>{selectedClientModal.name}</Text>
                    <Text style={styles.modalDialogSub}>{selectedClientModal.industry} • Plan: {selectedClientModal.plan}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setSelectedClientModal(null)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalDialogBody}>
                <View style={styles.modalStatGrid}>
                  <View style={styles.modalStatBox}>
                    <Text style={styles.modalStatNum}>{selectedClientModal.docs}</Text>
                    <Text style={styles.modalStatLbl}>Indexed Documents</Text>
                  </View>
                  <View style={styles.modalStatBox}>
                    <Text style={styles.modalStatNum}>{selectedClientModal.conversations}</Text>
                    <Text style={styles.modalStatLbl}>Total Queries</Text>
                  </View>
                  <View style={styles.modalStatBox}>
                    <Text style={styles.modalStatNum}>{selectedClientModal.users}</Text>
                    <Text style={styles.modalStatLbl}>Active Users</Text>
                  </View>
                </View>

                <View style={styles.modalFieldRow}>
                  <Text style={styles.modalFieldKey}>Contact Person:</Text>
                  <Text style={styles.modalFieldVal}>{selectedClientModal.contactPerson} ({selectedClientModal.designation || 'Operations'})</Text>
                </View>
                <View style={styles.modalFieldRow}>
                  <Text style={styles.modalFieldKey}>Email Address:</Text>
                  <Text style={styles.modalFieldVal}>{selectedClientModal.email}</Text>
                </View>
                <View style={styles.modalFieldRow}>
                  <Text style={styles.modalFieldKey}>Website:</Text>
                  <Text style={styles.modalFieldVal}>{selectedClientModal.website || 'https://example.com'}</Text>
                </View>
                <View style={styles.modalFieldRow}>
                  <Text style={styles.modalFieldKey}>Subscription Period:</Text>
                  <Text style={styles.modalFieldVal}>{selectedClientModal.startDate} to {selectedClientModal.endDate} ({selectedClientModal.daysLeftText})</Text>
                </View>
                <View style={styles.modalFieldRow}>
                  <Text style={styles.modalFieldKey}>Status:</Text>
                  <Text style={[styles.modalFieldVal, { fontWeight: '700', color: selectedClientModal.status === 'Active' ? '#10B981' : selectedClientModal.status === 'Expiring Soon' ? '#D97706' : '#EF4444' }]}>
                    {selectedClientModal.status}
                  </Text>
                </View>
                <View style={styles.modalFieldRow}>
                  <Text style={styles.modalFieldKey}>Operational Notes:</Text>
                  <Text style={styles.modalFieldVal}>{selectedClientModal.notes}</Text>
                </View>
              </View>

              <View style={styles.modalDialogFooter}>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setSelectedClientModal(null)}
                >
                  <Text style={styles.modalCloseBtnText}>Close Window</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* 2. ADD CLIENT MODAL (Matching PDF Page 5 Top) */}
      {showAddClientModal && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBoxLarge}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Add Client</Text>
                  <Text style={styles.modalSubtitle}>Create a new client organization.</Text>
                </View>
                <TouchableOpacity onPress={() => setShowAddClientModal(false)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 460, paddingRight: 6 }}>
                <Text style={styles.modalSectionHeading}>Company Information</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Company Name *</Text>
                    <TextInput style={styles.modalInput} placeholder="Enter company name" value={clientFormName} onChangeText={setClientFormName} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Industry *</Text>
                    <select style={styles.modalSelect} value={clientFormIndustry} onChange={(e) => setClientFormIndustry(e.target.value)}>
                      <option value="IT Services">IT Services</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Energy">Energy</option>
                      <option value="Finance">Finance</option>
                      <option value="Logistics">Logistics</option>
                    </select>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Company Size</Text>
                    <select style={styles.modalSelect} value={clientFormSize} onChange={(e) => setClientFormSize(e.target.value)}>
                      <option value="1 - 50 employees">1 - 50 employees</option>
                      <option value="51 - 200 employees">51 - 200 employees</option>
                      <option value="201 - 500 employees">201 - 500 employees</option>
                      <option value="500+ employees">500+ employees</option>
                    </select>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Website</Text>
                    <TextInput style={styles.modalInput} placeholder="https://www.example.com" value={clientFormWebsite} onChangeText={setClientFormWebsite} />
                  </View>
                </View>

                <Text style={styles.modalSectionHeading}>Contact Information</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Contact Person *</Text>
                    <TextInput style={styles.modalInput} placeholder="Enter contact person name" value={clientFormContact} onChangeText={setClientFormContact} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Designation</Text>
                    <TextInput style={styles.modalInput} placeholder="Enter designation" value={clientFormDesignation} onChangeText={setClientFormDesignation} />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Email *</Text>
                    <TextInput style={styles.modalInput} placeholder="Enter email address" value={clientFormEmail} onChangeText={setClientFormEmail} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Phone *</Text>
                    <TextInput style={styles.modalInput} placeholder="Enter phone number" value={clientFormPhone} onChangeText={setClientFormPhone} />
                  </View>
                </View>

                <Text style={styles.modalSectionHeading}>Additional Notes</Text>
                <TextInput
                  style={[styles.modalInput, { height: 64, textAlignVertical: 'top' }]}
                  placeholder="Enter any additional notes about the client..."
                  multiline
                  value={clientFormNotes}
                  onChangeText={setClientFormNotes}
                />
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddClientModal(false)}>
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={() => {
                    if (!clientFormName.trim()) {
                      alert('Please enter a company name.');
                      return;
                    }
                    const newClient = {
                      id: Date.now(),
                      name: clientFormName,
                      industry: clientFormIndustry,
                      avatarChar: clientFormName.charAt(0).toUpperCase() || 'C',
                      avatarColor: '#0066FF',
                      contactPerson: clientFormContact || 'Authorized Representative',
                      email: clientFormEmail || 'admin@company.com',
                      phone: clientFormPhone,
                      designation: clientFormDesignation,
                      companySize: clientFormSize,
                      website: clientFormWebsite,
                      plan: 'No Plan',
                      status: 'Active',
                      users: 0,
                      startDate: '-',
                      endDate: '-',
                      daysLeftNumber: 0,
                      daysLeftText: 'No Subscription',
                      notes: clientFormNotes || 'Newly added organization.',
                      docs: '0',
                      conversations: '0',
                    };
                    setClients([newClient, ...clients]);
                    setShowAddClientModal(false);
                    setClientFormName('');
                    setClientFormContact('');
                    setClientFormDesignation('');
                    setClientFormEmail('');
                    setClientFormPhone('');
                    setClientFormWebsite('');
                    setClientFormNotes('');
                    notifyAction(setClientActionMessage, `Client organization "${clientFormName}" created successfully!`);
                  }}
                >
                  <Text style={styles.modalSubmitBtnText}>Create Client</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* 3. EDIT CLIENT MODAL (Matching PDF Page 5 Bottom) */}
      {editingClientModal && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBoxLarge}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Edit Client</Text>
                  <Text style={styles.modalSubtitle}>Update the client organization details below.</Text>
                </View>
                <TouchableOpacity onPress={() => setEditingClientModal(null)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 460, paddingRight: 6 }}>
                <Text style={styles.modalSectionHeading}>Company Information</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Company Name *</Text>
                    <TextInput style={styles.modalInput} value={clientFormName} onChangeText={setClientFormName} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Industry *</Text>
                    <select style={styles.modalSelect} value={clientFormIndustry} onChange={(e) => setClientFormIndustry(e.target.value)}>
                      <option value="IT Services">IT Services</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Energy">Energy</option>
                      <option value="Finance">Finance</option>
                      <option value="Logistics">Logistics</option>
                    </select>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Company Size</Text>
                    <select style={styles.modalSelect} value={clientFormSize} onChange={(e) => setClientFormSize(e.target.value)}>
                      <option value="1 - 50 employees">1 - 50 employees</option>
                      <option value="51 - 200 employees">51 - 200 employees</option>
                      <option value="201 - 500 employees">201 - 500 employees</option>
                      <option value="500+ employees">500+ employees</option>
                    </select>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Website</Text>
                    <TextInput style={styles.modalInput} value={clientFormWebsite} onChangeText={setClientFormWebsite} />
                  </View>
                </View>

                <Text style={styles.modalSectionHeading}>Contact Information</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Contact Person *</Text>
                    <TextInput style={styles.modalInput} value={clientFormContact} onChangeText={setClientFormContact} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Designation</Text>
                    <TextInput style={styles.modalInput} value={clientFormDesignation} onChangeText={setClientFormDesignation} />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Email *</Text>
                    <TextInput style={styles.modalInput} value={clientFormEmail} onChangeText={setClientFormEmail} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Phone *</Text>
                    <TextInput style={styles.modalInput} value={clientFormPhone} onChangeText={setClientFormPhone} />
                  </View>
                </View>

                <Text style={styles.modalSectionHeading}>Subscription Details</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Plan *</Text>
                    <select style={styles.modalSelect} value={clientFormPlan} onChange={(e) => setClientFormPlan(e.target.value)}>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Platinum">Platinum</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Subscription Start Date</Text>
                    <TextInput style={styles.modalInput} value={clientFormStartDate} onChangeText={setClientFormStartDate} />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Subscription End Date</Text>
                    <TextInput style={styles.modalInput} value={clientFormEndDate} onChangeText={setClientFormEndDate} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Status *</Text>
                    <select style={styles.modalSelect} value={clientFormStatus} onChange={(e) => setClientFormStatus(e.target.value)}>
                      <option value="Active">Active</option>
                      <option value="Expiring Soon">Expiring Soon</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </View>
                </View>

                <Text style={styles.modalSectionHeading}>Additional Notes</Text>
                <TextInput
                  style={[styles.modalInput, { height: 64, textAlignVertical: 'top' }]}
                  multiline
                  value={clientFormNotes}
                  onChangeText={setClientFormNotes}
                />
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setEditingClientModal(null)}>
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={() => {
                    setClients(clients.map(c => {
                      if (c.id === editingClientModal.id) {
                        return {
                          ...c,
                          name: clientFormName,
                          industry: clientFormIndustry,
                          companySize: clientFormSize,
                          website: clientFormWebsite,
                          contactPerson: clientFormContact,
                          designation: clientFormDesignation,
                          email: clientFormEmail,
                          phone: clientFormPhone,
                          plan: clientFormPlan,
                          startDate: clientFormStartDate,
                          endDate: clientFormEndDate,
                          status: clientFormStatus,
                          notes: clientFormNotes,
                        };
                      }
                      return c;
                    }));
                    setEditingClientModal(null);
                    notifyAction(setClientActionMessage, `Changes to ${clientFormName} saved successfully!`);
                  }}
                >
                  <Text style={styles.modalSubmitBtnText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* 4. ADD PLAN MODAL (Matching PDF Page 7 Bottom) */}
      {showAddPlanModal && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBoxLarge}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Add Plan</Text>
                  <Text style={styles.modalSubtitle}>Create a new subscription plan for your clients.</Text>
                </View>
                <TouchableOpacity onPress={() => setShowAddPlanModal(false)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 460, paddingRight: 6 }}>
                <Text style={styles.modalSectionHeading}>Basic Information</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Plan Name *</Text>
                    <TextInput style={styles.modalInput} placeholder="Enter plan name (e.g. Gold)" value={planFormName} onChangeText={setPlanFormName} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Plan Type *</Text>
                    <select style={styles.modalSelect} value={planFormType} onChange={(e) => setPlanFormType(e.target.value)}>
                      <option value="Subscription">Subscription</option>
                      <option value="Custom Tier">Custom Tier</option>
                      <option value="Add-on">Add-on</option>
                    </select>
                  </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.formLabel}>Short Description *</Text>
                  <TextInput style={styles.modalInput} placeholder="Enter a short description" value={planFormShortDesc} onChangeText={setPlanFormShortDesc} />
                </View>

                <View style={{ marginBottom: 14 }}>
                  <Text style={styles.formLabel}>Detailed Description</Text>
                  <TextInput style={[styles.modalInput, { height: 50 }]} placeholder="Enter detailed description of the plan" multiline value={planFormDetailedDesc} onChangeText={setPlanFormDetailedDesc} />
                </View>

                <Text style={styles.modalSectionHeading}>Pricing & Validity</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Price (Monthly) *</Text>
                    <TextInput style={styles.modalInput} placeholder="₹ 0.00" value={planFormPrice} onChangeText={setPlanFormPrice} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Billing Cycle *</Text>
                    <select style={styles.modalSelect} value={planFormBilling} onChange={(e) => setPlanFormBilling(e.target.value)}>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Annual">Annual</option>
                    </select>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Validity (in months)</Text>
                    <TextInput style={styles.modalInput} placeholder="12" value={planFormValidity} onChangeText={setPlanFormValidity} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Currency</Text>
                    <TextInput style={styles.modalInput} value={planFormCurrency} onChangeText={setPlanFormCurrency} />
                  </View>
                </View>

                <Text style={styles.modalSectionHeading}>Features & Limits</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Max Queries per Month *</Text>
                    <TextInput style={styles.modalInput} placeholder="1000" value={planFormMaxQueries} onChangeText={setPlanFormMaxQueries} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Max Users *</Text>
                    <TextInput style={styles.modalInput} placeholder="5" value={planFormMaxUsers} onChangeText={setPlanFormMaxUsers} />
                  </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.formLabel}>Storage Limit (MB) *</Text>
                  <TextInput style={styles.modalInput} placeholder="10" value={planFormStorage} onChangeText={setPlanFormStorage} />
                </View>

                <View style={{ marginBottom: 14 }}>
                  <Text style={styles.formLabel}>Key Features * (one per line)</Text>
                  <TextInput
                    style={[styles.modalInput, { height: 70, textAlignVertical: 'top' }]}
                    multiline
                    value={planFormKeyFeatures}
                    onChangeText={setPlanFormKeyFeatures}
                  />
                </View>

                <Text style={styles.modalSectionHeading}>Other Settings</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Status *</Text>
                    <select style={styles.modalSelect} value={planFormStatus} onChange={(e) => setPlanFormStatus(e.target.value)}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Display Order</Text>
                    <TextInput style={styles.modalInput} value={planFormDisplayOrder} onChangeText={setPlanFormDisplayOrder} />
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddPlanModal(false)}>
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={() => {
                    if (!planFormName.trim()) {
                      alert('Please enter a plan name.');
                      return;
                    }
                    const newPlan = {
                      id: planFormName.toLowerCase().replace(/\s+/g, '-'),
                      name: planFormName,
                      badge: null,
                      desc: planFormShortDesc || 'Subscription plan for organizations.',
                      detailedDesc: planFormDetailedDesc,
                      price: planFormPrice,
                      rawPrice: planFormPrice.replace(/[^0-9]/g, '') || '0',
                      billingCycle: planFormBilling,
                      validity: `${planFormValidity} Months`,
                      currency: planFormCurrency,
                      queries: `Up to ${planFormMaxQueries} queries/month`,
                      maxUsers: planFormMaxUsers,
                      storage: planFormStorage,
                      features: planFormKeyFeatures.split('\n').filter(Boolean),
                      status: planFormStatus,
                      clients: 0,
                      displayOrder: Number(planFormDisplayOrder) || 5,
                      color: '#0066FF',
                      bgColor: '#EFF6FF',
                    };
                    setPlans([...plans, newPlan]);
                    setShowAddPlanModal(false);
                    notifyAction(setPlanActionMessage, `Subscription plan "${planFormName}" created successfully!`);
                  }}
                >
                  <Text style={styles.modalSubmitBtnText}>Create Plan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* 5. EDIT PLAN MODAL */}
      {editingPlanModal && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBoxLarge}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Edit Plan</Text>
                  <Text style={styles.modalSubtitle}>Update the subscription plan configurations.</Text>
                </View>
                <TouchableOpacity onPress={() => setEditingPlanModal(null)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 460, paddingRight: 6 }}>
                <Text style={styles.modalSectionHeading}>Basic Information</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Plan Name *</Text>
                    <TextInput style={styles.modalInput} value={planFormName} onChangeText={setPlanFormName} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Plan Type</Text>
                    <select style={styles.modalSelect} value={planFormType} onChange={(e) => setPlanFormType(e.target.value)}>
                      <option value="Subscription">Subscription</option>
                      <option value="Custom Tier">Custom Tier</option>
                      <option value="Add-on">Add-on</option>
                    </select>
                  </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.formLabel}>Short Description</Text>
                  <TextInput style={styles.modalInput} value={planFormShortDesc} onChangeText={setPlanFormShortDesc} />
                </View>

                <Text style={styles.modalSectionHeading}>Pricing & Validity</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Price (Monthly) *</Text>
                    <TextInput style={styles.modalInput} value={planFormPrice} onChangeText={setPlanFormPrice} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Billing Cycle</Text>
                    <select style={styles.modalSelect} value={planFormBilling} onChange={(e) => setPlanFormBilling(e.target.value)}>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Annual">Annual</option>
                    </select>
                  </View>
                </View>

                <Text style={styles.modalSectionHeading}>Features & Limits</Text>
                <View style={{ marginBottom: 14 }}>
                  <Text style={styles.formLabel}>Key Features (one per line)</Text>
                  <TextInput
                    style={[styles.modalInput, { height: 75, textAlignVertical: 'top' }]}
                    multiline
                    value={planFormKeyFeatures}
                    onChangeText={setPlanFormKeyFeatures}
                  />
                </View>

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.formLabel}>Status</Text>
                    <select style={styles.modalSelect} value={planFormStatus} onChange={(e) => setPlanFormStatus(e.target.value)}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setEditingPlanModal(null)}>
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={() => {
                    setPlans(plans.map(p => {
                      if (p.id === editingPlanModal.id) {
                        return {
                          ...p,
                          name: planFormName,
                          desc: planFormShortDesc,
                          price: planFormPrice,
                          billingCycle: planFormBilling,
                          features: planFormKeyFeatures.split('\n').filter(Boolean),
                          status: planFormStatus,
                        };
                      }
                      return p;
                    }));
                    setEditingPlanModal(null);
                    notifyAction(setPlanActionMessage, `Plan ${planFormName} updated successfully!`);
                  }}
                >
                  <Text style={styles.modalSubmitBtnText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* 6. VIEW PLAN MODAL */}
      {selectedPlanModal && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalDialogCard}>
              <View style={styles.modalDialogHeader}>
                <View>
                  <Text style={styles.modalDialogTitle}>{selectedPlanModal.name} Plan Details</Text>
                  <Text style={styles.modalDialogSub}>{selectedPlanModal.desc}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedPlanModal(null)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <View style={styles.modalDialogBody}>
                <View style={styles.modalStatGrid}>
                  <View style={styles.modalStatBox}>
                    <Text style={styles.modalStatNum}>{selectedPlanModal.price}</Text>
                    <Text style={styles.modalStatLbl}>Monthly Price</Text>
                  </View>
                  <View style={styles.modalStatBox}>
                    <Text style={styles.modalStatNum}>{selectedPlanModal.clients}</Text>
                    <Text style={styles.modalStatLbl}>Clients Enrolled</Text>
                  </View>
                  <View style={styles.modalStatBox}>
                    <Text style={styles.modalStatNum}>{selectedPlanModal.maxUsers || 10}</Text>
                    <Text style={styles.modalStatLbl}>Max Users</Text>
                  </View>
                </View>

                <Text style={[styles.modalSectionHeading, { marginTop: 12 }]}>Included Features:</Text>
                <View style={{ gap: 6, marginVertical: 8 }}>
                  {selectedPlanModal.features.map((f, fi) => (
                    <View key={fi} style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Feather name="check" size={14} color="#10B981" style={{ marginRight: 8 }} />
                      <Text style={styles.featureBulletText}>{f}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.modalDialogFooter}>
                <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setSelectedPlanModal(null)}>
                  <Text style={styles.modalCloseBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* 7. ADD NEW ROLE MODAL (Matching PDF Page 16 Top Right) */}
      {showAddRoleModal && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Add New Role</Text>
                  <Text style={styles.modalSubtitle}>Create a user role and assign permissions.</Text>
                </View>
                <TouchableOpacity onPress={() => setShowAddRoleModal(false)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 420 }}>
                <View style={{ marginBottom: 12 }}>
                  <Text style={styles.formLabel}>Role Name *</Text>
                  <TextInput style={styles.modalInput} placeholder="Enter role name (e.g. Compliance Officer)" value={roleFormName} onChangeText={setRoleFormName} />
                </View>

                <View style={{ marginBottom: 14 }}>
                  <Text style={styles.formLabel}>Description *</Text>
                  <TextInput
                    style={[styles.modalInput, { height: 60, textAlignVertical: 'top' }]}
                    placeholder="Enter role description"
                    multiline
                    value={roleFormDesc}
                    onChangeText={setRoleFormDesc}
                  />
                </View>

                <View style={{ marginBottom: 14 }}>
                  <Text style={styles.formLabel}>Status *</Text>
                  <View style={{ flexDirection: 'row', gap: 18, marginTop: 4 }}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => setRoleFormStatus('Active')}
                    >
                      <MaterialCommunityIcons
                        name={roleFormStatus === 'Active' ? 'radiobox-marked' : 'radiobox-blank'}
                        size={18}
                        color={roleFormStatus === 'Active' ? '#0066FF' : '#94A3B8'}
                      />
                      <Text style={{ marginLeft: 6, fontSize: 13, color: '#334155' }}>Active</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => setRoleFormStatus('Inactive')}
                    >
                      <MaterialCommunityIcons
                        name={roleFormStatus === 'Inactive' ? 'radiobox-marked' : 'radiobox-blank'}
                        size={18}
                        color={roleFormStatus === 'Inactive' ? '#0066FF' : '#94A3B8'}
                      />
                      <Text style={{ marginLeft: 6, fontSize: 13, color: '#334155' }}>Inactive</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.formLabel}>Permissions * (Select modules this role can access)</Text>
                  <View style={{ gap: 8, marginTop: 6 }}>
                    {['Dashboard', 'Clients', 'Plans', 'Subscriptions', 'LLM Data Import', 'Reports', 'Master Settings'].map(mod => {
                      const isChecked = roleFormPermissions.includes(mod);
                      return (
                        <TouchableOpacity
                          key={mod}
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                          onPress={() => {
                            if (isChecked) {
                              setRoleFormPermissions(roleFormPermissions.filter(p => p !== mod));
                            } else {
                              setRoleFormPermissions([...roleFormPermissions, mod]);
                            }
                          }}
                        >
                          <MaterialCommunityIcons
                            name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                            size={18}
                            color={isChecked ? '#0066FF' : '#94A3B8'}
                          />
                          <Text style={{ marginLeft: 8, fontSize: 13, color: '#1E293B' }}>{mod}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddRoleModal(false)}>
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={() => {
                    if (!roleFormName.trim()) {
                      alert('Please enter a role name.');
                      return;
                    }
                    const newRole = {
                      id: Date.now(),
                      name: roleFormName,
                      desc: roleFormDesc || 'User role for platform access.',
                      status: roleFormStatus,
                      permissions: roleFormPermissions,
                    };
                    setRoles([...roles, newRole]);
                    setShowAddRoleModal(false);
                    notifyAction(setRoleActionMessage, `Role "${roleFormName}" created successfully!`);
                  }}
                >
                  <Text style={styles.modalSubmitBtnText}>Save Role</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* 8. EDIT ROLE MODAL */}
      {editingRoleModal && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Edit Role</Text>
                  <Text style={styles.modalSubtitle}>Update role permissions and status.</Text>
                </View>
                <TouchableOpacity onPress={() => setEditingRoleModal(null)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 420 }}>
                <View style={{ marginBottom: 12 }}>
                  <Text style={styles.formLabel}>Role Name *</Text>
                  <TextInput style={styles.modalInput} value={roleFormName} onChangeText={setRoleFormName} />
                </View>

                <View style={{ marginBottom: 14 }}>
                  <Text style={styles.formLabel}>Description *</Text>
                  <TextInput style={[styles.modalInput, { height: 60, textAlignVertical: 'top' }]} multiline value={roleFormDesc} onChangeText={setRoleFormDesc} />
                </View>

                <View style={{ marginBottom: 14 }}>
                  <Text style={styles.formLabel}>Status</Text>
                  <View style={{ flexDirection: 'row', gap: 18, marginTop: 4 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setRoleFormStatus('Active')}>
                      <MaterialCommunityIcons name={roleFormStatus === 'Active' ? 'radiobox-marked' : 'radiobox-blank'} size={18} color={roleFormStatus === 'Active' ? '#0066FF' : '#94A3B8'} />
                      <Text style={{ marginLeft: 6, fontSize: 13, color: '#334155' }}>Active</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setRoleFormStatus('Inactive')}>
                      <MaterialCommunityIcons name={roleFormStatus === 'Inactive' ? 'radiobox-marked' : 'radiobox-blank'} size={18} color={roleFormStatus === 'Inactive' ? '#0066FF' : '#94A3B8'} />
                      <Text style={{ marginLeft: 6, fontSize: 13, color: '#334155' }}>Inactive</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.formLabel}>Permissions</Text>
                  <View style={{ gap: 8, marginTop: 6 }}>
                    {['Dashboard', 'Clients', 'Plans', 'Subscriptions', 'LLM Data Import', 'Reports', 'Master Settings'].map(mod => {
                      const isChecked = roleFormPermissions.includes(mod);
                      return (
                        <TouchableOpacity
                          key={mod}
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                          onPress={() => {
                            if (isChecked) {
                              setRoleFormPermissions(roleFormPermissions.filter(p => p !== mod));
                            } else {
                              setRoleFormPermissions([...roleFormPermissions, mod]);
                            }
                          }}
                        >
                          <MaterialCommunityIcons name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'} size={18} color={isChecked ? '#0066FF' : '#94A3B8'} />
                          <Text style={{ marginLeft: 8, fontSize: 13, color: '#1E293B' }}>{mod}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setEditingRoleModal(null)}>
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={() => {
                    setRoles(roles.map(r => {
                      if (r.id === editingRoleModal.id) {
                        return {
                          ...r,
                          name: roleFormName,
                          desc: roleFormDesc,
                          status: roleFormStatus,
                          permissions: roleFormPermissions,
                        };
                      }
                      return r;
                    }));
                    setEditingRoleModal(null);
                    notifyAction(setRoleActionMessage, `Role ${roleFormName} updated successfully!`);
                  }}
                >
                  <Text style={styles.modalSubmitBtnText}>Save Role</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* 9. ADD CONFIGURATION MODAL */}
      {showAddConfigModal && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Configuration</Text>
                <TouchableOpacity onPress={() => setShowAddConfigModal(false)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>
              <View style={{ gap: 12, paddingVertical: 10 }}>
                <View>
                  <Text style={styles.formLabel}>Configuration Name *</Text>
                  <TextInput style={styles.modalInput} placeholder="e.g. Audit Log Purge Interval" value={configFormName} onChangeText={setConfigFormName} />
                </View>
                <View>
                  <Text style={styles.formLabel}>Description</Text>
                  <TextInput style={styles.modalInput} placeholder="Short description of this setting" value={configFormDesc} onChangeText={setConfigFormDesc} />
                </View>
                <View>
                  <Text style={styles.formLabel}>Value *</Text>
                  <TextInput style={styles.modalInput} placeholder="e.g. 90 Days" value={configFormValue} onChangeText={setConfigFormValue} />
                </View>
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddConfigModal(false)}>
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={() => {
                    if (!configFormName.trim()) return;
                    setConfigs([
                      ...configs,
                      {
                        id: Date.now(),
                        name: configFormName,
                        desc: configFormDesc || 'Configurable application setting.',
                        value: configFormValue || 'Default',
                        status: 'Active',
                      }
                    ]);
                    setShowAddConfigModal(false);
                  }}
                >
                  <Text style={styles.modalSubmitBtnText}>Save Config</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* 10. ADD SUBSCRIPTION MODAL (Client & Plan selection with auto-fetched details) */}
      {showAddSubModal && (() => {
        const activeClient = clients.find(c => c.name === subFormClient) || clients[0];
        const activePlan = plans.find(p => p.name === subFormPlan) || plans[0];

        // Format dates dynamically
        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const autoStartDate = `${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`;
        const nextYear = new Date(now);
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        const autoEndDate = `${String(nextYear.getDate()).padStart(2, '0')} ${months[nextYear.getMonth()]} ${nextYear.getFullYear()}`;

        return (
          <Modal visible={true} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={[styles.modalBox, { maxWidth: 720, width: '92%' }]}>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={[styles.kpiIconSquare, { backgroundColor: '#EFF6FF', width: 38, height: 38, borderRadius: 8 }]}>
                      <MaterialCommunityIcons name="file-document-edit-outline" size={20} color="#0066FF" />
                    </View>
                    <View>
                      <Text style={styles.modalTitle}>Add Subscription</Text>
                      <Text style={styles.modalSubtitle}>Select client and plan to automatically load subscription details.</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => setShowAddSubModal(false)}>
                    <Feather name="x" size={20} color="#64748B" />
                  </TouchableOpacity>
                </View>

                {/* Body: Two Fields Only + Automatically Fetched Details Card */}
                <ScrollView style={{ maxHeight: 520, paddingVertical: 10 }}>
                  {/* TWO FIELDS ONLY: Client Name & Plan Name */}
                  <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 16, marginBottom: 18 }}>
                    {/* Field 1: Client Name */}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.formLabel}>Client Name *</Text>
                      <select
                        style={{ ...styles.modalSelect, height: 42, fontSize: 13.5 }}
                        value={subFormClient || activeClient?.name || ''}
                        onChange={(e) => setSubFormClient(e.target.value)}
                      >
                        {clients.map(c => (
                          <option key={c.id || c.name} value={c.name}>
                            {c.name} {c.industry ? `(${c.industry})` : ''}
                          </option>
                        ))}
                      </select>
                    </View>

                    {/* Field 2: Plan Name */}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.formLabel}>Plan Name *</Text>
                      <select
                        style={{ ...styles.modalSelect, height: 42, fontSize: 13.5 }}
                        value={subFormPlan || activePlan?.name || ''}
                        onChange={(e) => setSubFormPlan(e.target.value)}
                      >
                        {plans.map(p => (
                          <option key={p.id || p.name} value={p.name}>
                            {p.name} — {p.price}{p.billingCycle ? ` / ${p.billingCycle}` : ''}
                          </option>
                        ))}
                      </select>
                    </View>
                  </View>

                  {/* AUTO-FETCHED DETAILS PREVIEW */}
                  <View style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: '#E2E8F0',
                    padding: 16,
                    gap: 14,
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingBottom: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center' }}>
                          <MaterialCommunityIcons name="lightning-bolt" size={16} color="#0066FF" />
                        </View>
                        <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F172A' }}>
                          Auto-Fetched Subscription Details
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 }}>
                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981' }} />
                        <Text style={{ fontSize: 11, fontWeight: '700', color: '#059669' }}>Automatically Loaded</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: isMobile ? 'column' : 'row', gap: 14 }}>
                      {/* Left Sub-card: Client Organization Details */}
                      <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: '#F1F5F9', padding: 14, gap: 10 }}>
                        <Text style={{ fontSize: 11.5, fontWeight: '700', color: '#0066FF', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Client Organization
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 12, color: '#64748B' }}>Contact Person:</Text>
                          <Text style={{ fontSize: 12, fontWeight: '600', color: '#0F172A' }}>{activeClient?.contactPerson || 'Authorized Rep'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 12, color: '#64748B' }}>Official Email:</Text>
                          <Text style={{ fontSize: 12, fontWeight: '600', color: '#0F172A' }}>{activeClient?.email || 'admin@company.com'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 12, color: '#64748B' }}>Phone Number:</Text>
                          <Text style={{ fontSize: 12, fontWeight: '600', color: '#0F172A' }}>{activeClient?.phone || '-'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 12, color: '#64748B' }}>Industry Vertical:</Text>
                          <Text style={{ fontSize: 12, fontWeight: '600', color: '#0F172A' }}>{activeClient?.industry || 'General Enterprise'}</Text>
                        </View>
                      </View>

                      {/* Right Sub-card: Plan & Subscription Details */}
                      <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: '#F1F5F9', padding: 14, gap: 10 }}>
                        <Text style={{ fontSize: 11.5, fontWeight: '700', color: '#0066FF', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Plan Parameters
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 12, color: '#64748B' }}>Subscription Rate:</Text>
                          <Text style={{ fontSize: 12, fontWeight: '700', color: '#059669' }}>{activePlan?.price || 'Custom'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 12, color: '#64748B' }}>Billing Cycle:</Text>
                          <Text style={{ fontSize: 12, fontWeight: '600', color: '#0F172A' }}>{activePlan?.billingCycle || 'Monthly'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 12, color: '#64748B' }}>Included User Seats:</Text>
                          <Text style={{ fontSize: 12, fontWeight: '600', color: '#0F172A' }}>{activePlan?.maxUsers || '10'} Users</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 12, color: '#64748B' }}>Monthly AI Queries:</Text>
                          <Text style={{ fontSize: 12, fontWeight: '600', color: '#0F172A' }}>{activePlan?.queries || 'Standard'}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Auto-Calculated Subscription Schedule Row */}
                    <View style={{ flexDirection: 'row', backgroundColor: '#EFF6FF', borderRadius: 8, padding: 12, justifyContent: 'space-around', alignItems: 'center' }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: '#64748B', marginBottom: 2 }}>Effective Start Date</Text>
                        <Text style={{ fontSize: 12.5, fontWeight: '700', color: '#0066FF' }}>{autoStartDate}</Text>
                      </View>
                      <View style={{ width: 1, height: 24, backgroundColor: '#DBEAFE' }} />
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: '#64748B', marginBottom: 2 }}>Renewal / End Date</Text>
                        <Text style={{ fontSize: 12.5, fontWeight: '700', color: '#0066FF' }}>{autoEndDate}</Text>
                      </View>
                      <View style={{ width: 1, height: 24, backgroundColor: '#DBEAFE' }} />
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 11, color: '#64748B', marginBottom: 2 }}>Initial Status</Text>
                        <Text style={{ fontSize: 12.5, fontWeight: '700', color: '#059669' }}>Active</Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>

                {/* Actions Footer */}
                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddSubModal(false)}>
                    <Text style={styles.modalCancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalSubmitBtn}
                    onPress={() => {
                      const clientName = subFormClient || activeClient?.name || 'Client';
                      const planName = subFormPlan || activePlan?.name || 'Gold';
                      const targetClient = clients.find(c => c.name === clientName) || activeClient;
                      const targetPlan = plans.find(p => p.name === planName) || activePlan;

                      const newSub = {
                        id: `SUB-00${subscriptions.length + 1}`,
                        client: targetClient.name,
                        plan: targetPlan.name,
                        startDate: autoStartDate,
                        endDate: autoEndDate,
                        daysLeft: '365 days',
                        status: 'Active',
                        amount: targetPlan.price ? `${targetPlan.price}/${targetPlan.billingCycle || 'month'}` : 'Custom',
                        billingCycle: targetPlan.billingCycle || 'Monthly',
                        users: parseInt(targetPlan.maxUsers) || 10,
                        contactPerson: targetClient.contactPerson,
                        email: targetClient.email,
                      };
                      setSubscriptions([newSub, ...subscriptions]);

                      // Automatically update the client in clients list
                      setClients(clients.map(c => c.name === targetClient.name ? {
                        ...c,
                        plan: targetPlan.name,
                        startDate: autoStartDate,
                        endDate: autoEndDate,
                        daysLeftNumber: 365,
                        daysLeftText: '365 days left',
                        status: 'Active',
                        users: parseInt(targetPlan.maxUsers) || c.users || 10,
                      } : c));

                      setShowAddSubModal(false);
                      notifyAction(setSubActionMessage, `Subscription created: ${targetClient.name} assigned to ${targetPlan.name} plan!`);
                    }}
                  >
                    <Feather name="file-plus" size={15} color="#FFF" style={{ marginRight: 6 }} />
                    <Text style={styles.modalSubmitBtnText}>Create Subscription</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        );
      })()}

      {/* 11. IMPORT KNOWLEDGE DATA MODAL */}
      {showImportModal && (
        <Modal visible={true} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalBox, { maxWidth: 640, width: '92%' }]}>
              <View style={styles.modalHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={[styles.kpiIconSquare, { backgroundColor: '#EFF6FF', width: 38, height: 38, borderRadius: 8 }]}>
                    <Feather name="upload-cloud" size={20} color="#0066FF" />
                  </View>
                  <View>
                    <Text style={styles.modalTitle}>Import Knowledge Data</Text>
                    <Text style={styles.modalSubtitle}>Ingest multi-tenant documents into the AI knowledge layer.</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setShowImportModal(false)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 480, paddingVertical: 10 }}>
                <View style={{ gap: 14 }}>
                  <View>
                    <Text style={styles.formLabel}>Target Client / Organization *</Text>
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Select or enter client name"
                      value={importFormClient}
                      onChangeText={setImportFormClient}
                    />
                  </View>

                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.formLabel}>Data Source *</Text>
                      <TextInput
                        style={styles.modalInput}
                        value={importFormSource}
                        onChangeText={setImportFormSource}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.formLabel}>Chunk Size (Tokens)</Text>
                      <TextInput
                        style={styles.modalInput}
                        keyboardType="numeric"
                        value={importFormChunkSize}
                        onChangeText={setImportFormChunkSize}
                      />
                    </View>
                  </View>

                  {/* File Upload Drop Area */}
                  <View>
                    <Text style={styles.formLabel}>Upload Document Files *</Text>
                    <View style={{ borderWidth: 2, borderColor: '#CBD5E1', borderStyle: 'dashed', borderRadius: 10, padding: 24, alignItems: 'center', backgroundColor: '#F8FAFC' }}>
                      <Feather name="upload-cloud" size={32} color="#0066FF" style={{ marginBottom: 8 }} />
                      <Text style={{ fontSize: 13, fontWeight: '600', color: '#0F172A' }}>Click to browse or drag and drop files here</Text>
                      <Text style={{ fontSize: 11.5, color: '#64748B', marginTop: 4 }}>PDF, DOCX, TXT, CSV, JSON (Up to 50MB per file)</Text>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.formLabel}>Ingestion Notes</Text>
                    <TextInput
                      style={[styles.modalInput, { height: 60, textAlignVertical: 'top' }]}
                      placeholder="Optional notes or description for this data import batch..."
                      multiline
                      value={importFormNotes}
                      onChangeText={setImportFormNotes}
                    />
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowImportModal(false)}>
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={() => {
                    const newImp = {
                      id: `IMP-20250908-0${imports.length + 1}`,
                      client: importFormClient.trim() || 'TechNova Solutions',
                      source: importFormSource,
                      files: 4,
                      fileTypes: 'PDF, DOCX',
                      date: '08 Sep 2025\n02:30 PM',
                      status: 'Processing',
                      chunks: '512 chunks',
                    };
                    setImports([newImp, ...imports]);
                    setShowImportModal(false);
                    alert(`Import batch ${newImp.id} initiated for ${newImp.client}!`);
                  }}
                >
                  <Feather name="zap" size={15} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.modalSubmitBtnText}>Start Ingestion</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

    </View>
  );
}

// Subcomponents
function PaneFeature({ icon, title, desc }) {
  return (
    <View style={styles.paneFeatureRow}>
      <View style={styles.paneFeatureIconSquare}>
        <MaterialCommunityIcons name={icon} size={20} color="#00D2FF" />
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.paneFeatureTitle}>{title}</Text>
        <Text style={styles.paneFeatureDesc}>{desc}</Text>
      </View>
    </View>
  );
}

function ActivityFeedItem({ icon, iconColor, iconBg, title, time }) {
  return (
    <View style={styles.activityItemRow}>
      <View style={[styles.activityIconCircle, { backgroundColor: iconBg }]}>
        <MaterialCommunityIcons name={icon} size={16} color={iconColor} />
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.activityItemTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.activityItemTime}>{time}</Text>
      </View>
    </View>
  );
}

function NotificationItem({ text, time, dotColor }) {
  return (
    <View style={styles.notificationItemRow}>
      <View style={[styles.notificationDot, { backgroundColor: dotColor }]} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.notificationText}>{text}</Text>
        <Text style={styles.notificationTime}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  portalContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    minHeight: '100vh',
  },
  sidebar: {
    width: 240,
    backgroundColor: '#0A1329',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
    flexDirection: 'column',
    transition: 'width 0.25s ease',
  },
  sidebarCollapsed: {
    width: 64,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  sidebarLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  sidebarLogoIconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarBrandTitle: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sidebarBrandSub: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  sidebarMenuList: {
    gap: 4,
  },
  sidebarNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  sidebarNavItemActive: {
    backgroundColor: '#0066FF',
  },
  sidebarNavText: {
    color: '#94A3B8',
    fontSize: 13.5,
    fontWeight: '600',
  },
  sidebarNavTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  needHelpCard: {
    backgroundColor: '#0F1E36',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  needHelpLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headphoneIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#EBF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  needHelpTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  needHelpSub: {
    color: '#94A3B8',
    fontSize: 11,
  },
  mainArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F8FAFC',
  },
  topNavbar: {
    height: 64,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  hamburgerBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 38,
    width: 320,
  },
  topSearchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  topNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  bellBtn: {
    position: 'relative',
    padding: 6,
  },
  bellBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#EF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  adminUserChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adminAvatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminAvatarLetter: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  adminUserName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  adminOrgName: {
    fontSize: 10.5,
    color: '#64748B',
  },
  adminMenuDropdown: {
    position: 'absolute',
    top: 44,
    right: 0,
    width: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 25,
    zIndex: 9999,
    paddingVertical: 8,
  },
  adminMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  adminRolePill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  adminRolePillText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  adminMenuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 6,
  },
  adminMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  adminMenuItemText: {
    fontSize: 12.5,
    color: '#334155',
    fontWeight: '500',
  },
  exitIconBtn: {
    padding: 6,
  },
  notificationDropdown: {
    position: 'absolute',
    top: 70,
    right: 24,
    width: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    zIndex: 999,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  notificationHeaderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  notificationItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  notificationText: {
    fontSize: 12,
    color: '#1E293B',
  },
  notificationTime: {
    fontSize: 10.5,
    color: '#94A3B8',
  },
  scrollBody: {
    flex: 1,
  },
  greetingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  greetingSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  headerDateBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  headerDateText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  kpiRowMobile: {
    flexDirection: 'column',
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  kpiIconSquare: {
    width: 46,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  kpiInfoCol: {
    flex: 1,
  },
  kpiCardLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  kpiValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  kpiCardValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 8,
  },
  kpiTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  kpiTrendText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  kpiCardSubtext: {
    fontSize: 11,
    color: '#94A3B8',
  },
  middleGridRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  middleGridRowMobile: {
    flexDirection: 'column',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  timeFilterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  timeFilterPillText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  timeFilterDropdownMenu: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    zIndex: 100,
    width: 120,
  },
  dropdownMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  dropdownMenuItemText: {
    fontSize: 12,
    color: '#334155',
  },
  donutVisualLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 14,
  },
  donutRingOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 14,
    borderColor: '#0066FF',
    borderTopColor: '#06B6D4',
    borderRightColor: '#8B5CF6',
    borderBottomColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutRingHole: {
    alignItems: 'center',
  },
  donutCenterBigNum: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  donutCenterSub: {
    fontSize: 11,
    color: '#64748B',
  },
  donutLegendCol: {
    gap: 8,
  },
  donutLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendPlanName: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
    width: 60,
  },
  legendPlanMetric: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  viewAllActionLink: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0066FF',
  },
  activityFeedList: {
    gap: 12,
    paddingTop: 4,
  },
  activityItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityItemTitle: {
    fontSize: 12.5,
    color: '#1E293B',
    fontWeight: '600',
  },
  activityItemTime: {
    fontSize: 11,
    color: '#94A3B8',
  },
  tableHeadBar: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  thColText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  tableClickableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tdIndexText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  companyAvatarCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleInitialAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  circleInitialText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  companyNameCellText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  tdNumberText: {
    fontSize: 12.5,
    color: '#334155',
    fontWeight: '500',
  },
  tdPlanText: {
    fontSize: 12.5,
    color: '#0F172A',
    fontWeight: '600',
  },
  tdDateText: {
    fontSize: 12,
    color: '#475569',
  },
  daysLeftSubText: {
    fontSize: 11,
    color: '#64748B',
  },
  contactNameText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E293B',
  },
  contactEmailText: {
    fontSize: 11,
    color: '#64748B',
  },
  daysLeftAmberPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  daysLeftAmberText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  statusActivePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  dotActiveGreen: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusActiveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  statusExpiringPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  dotAmber: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    marginRight: 6,
  },
  statusExpiringText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  statusExpiredPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  dotRed: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  statusExpiredText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  bottomCalloutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  calloutLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  targetIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  calloutSub: {
    fontSize: 12,
    color: '#64748B',
  },
  calloutActionBtn: {
    backgroundColor: '#4338CA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  calloutActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  tabContentContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  subScreenHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  breadcrumbLink: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    cursor: 'pointer',
  },
  breadcrumbDivider: {
    fontSize: 12,
    color: '#94A3B8',
  },
  breadcrumbActive: {
    fontSize: 12,
    color: '#0066FF',
    fontWeight: '700',
  },
  primaryActionBtn: {
    backgroundColor: '#0066FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  primaryActionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  filterBarRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filterBarRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 38,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  innerSearch: {
    flex: 1,
    fontSize: 12.5,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  filterDropdownWrapper: {
    flex: 1,
  },
  filterFieldLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  nativeHtmlSelect: {
    height: 38,
    borderRadius: 8,
    borderColor: '#CBD5E1',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    fontSize: 12.5,
    color: '#0F172A',
    outlineStyle: 'none',
    width: '100%',
  },
  filterActionButton: {
    backgroundColor: '#0066FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  filterActionButtonText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },
  resetActionButton: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  resetActionButtonText: {
    color: '#475569',
    fontSize: 12.5,
    fontWeight: '600',
  },
  tableSubheaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tableTitleText: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  planBadgeTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  planBadgeGold: {
    backgroundColor: '#FEF3C7',
  },
  planBadgeGoldText: {
    color: '#B45309',
    fontWeight: '700',
    fontSize: 11,
  },
  planBadgeSilver: {
    backgroundColor: '#F1F5F9',
  },
  planBadgeSilverText: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 11,
  },
  planBadgePlatinum: {
    backgroundColor: '#F3E8FF',
  },
  planBadgePlatinumText: {
    color: '#7C3AED',
    fontWeight: '700',
    fontSize: 11,
  },
  viewSmallBtn: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  viewSmallBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#0066FF',
  },
  editSmallBtn: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editSmallBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#0066FF',
  },
  iconActionBtn: {
    padding: 6,
    borderRadius: 6,
  },
  tablePaginationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  paginationShowingText: {
    fontSize: 12,
    color: '#64748B',
  },
  paginationPagesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pageBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  pageBtnActive: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  pageBtnActiveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  pageBtnText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },
  pageSizeSelectWrapper: {
    width: 110,
  },
  pageSizeSelect: {
    height: 30,
    borderRadius: 6,
    borderColor: '#CBD5E1',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    fontSize: 11.5,
    color: '#334155',
    outlineStyle: 'none',
  },
  planNameColumnText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  popularBadge: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  tdDescText: {
    fontSize: 12,
    color: '#64748B',
  },
  planPriceColumnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  featureBulletDot: {
    fontSize: 14,
    color: '#10B981',
    marginRight: 6,
  },
  featureBulletText: {
    fontSize: 11.5,
    color: '#334155',
  },
  masterSettingsInfoBanner: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  masterSettingsInfoTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1E40AF',
    marginBottom: 2,
  },
  masterSettingsInfoDesc: {
    fontSize: 12,
    color: '#1E3A8A',
    lineHeight: 18,
  },
  settingsSubTabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  settingsSubTabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  settingsSubTabBtnActive: {
    borderColor: '#0066FF',
    backgroundColor: '#EFF6FF',
  },
  settingsSubTabBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#475569',
  },
  settingsSubTabBtnTextActive: {
    color: '#0066FF',
    fontWeight: '700',
  },
  rbacInfoCard: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rbacInfoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  rbacInfoDesc: {
    fontSize: 11.5,
    color: '#64748B',
  },
  roleNameText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  configBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  configBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
  },
  settingsInputBox: {
    height: 38,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    outlineStyle: 'none',
  },
  settingsSelectBox: {
    height: 38,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 12.5,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    outlineStyle: 'none',
    width: '100%',
  },
  prefToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  prefToggleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  prefToggleDesc: {
    fontSize: 11.5,
    color: '#64748B',
  },
  toggleBtn: {
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    padding: 2,
    justifyContent: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#0066FF',
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  logoPreviewBox: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPreviewTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  logoPreviewSub: {
    fontSize: 10.5,
    color: '#64748B',
  },
  faviconPreviewBox: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  colorPreviewSquare: {
    width: 38,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  colorSwatchBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  colorSwatchBtnActive: {
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  livePreviewFrame: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
  },
  livePreviewTopBar: {
    height: 38,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  livePreviewLogoText: {
    fontSize: 11.5,
    fontWeight: '800',
    marginLeft: 6,
  },
  livePreviewAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  livePreviewBody: {
    padding: 14,
  },
  livePreviewWelcome: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  livePreviewMetricBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  livePreviewMetricNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  livePreviewMetricLbl: {
    fontSize: 10.5,
    color: '#64748B',
  },
  livePreviewBtn: {
    marginTop: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  livePreviewBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  masterDataGrid: {
    gap: 12,
  },
  masterDataCard: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F8FAFC',
  },
  masterDataCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  masterDataPillsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  masterDataPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11.5,
    color: '#334155',
    fontWeight: '600',
  },
  masterSettingsNoteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  masterSettingsNoteText: {
    fontSize: 11.5,
    color: '#0369A1',
    lineHeight: 16,
  },
  actionSuccessToast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  actionSuccessToastText: {
    color: '#065F46',
    fontSize: 12.5,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalDialogCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  modalDialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalDialogTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalDialogSub: {
    fontSize: 12,
    color: '#64748B',
  },
  modalDialogBody: {
    paddingVertical: 14,
  },
  modalStatGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  modalStatBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalStatNum: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalStatLbl: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  modalFieldRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  modalFieldKey: {
    width: 130,
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  modalFieldVal: {
    flex: 1,
    fontSize: 12,
    color: '#0F172A',
  },
  modalDialogFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    alignItems: 'flex-end',
  },
  modalCloseBtn: {
    backgroundColor: '#0F172A',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  modalCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  modalBox: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },
  modalBoxLarge: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 22,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  modalSectionHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0066FF',
    marginVertical: 10,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  modalInput: {
    height: 38,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 12.5,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  modalSelect: {
    height: 38,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 12.5,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    outlineStyle: 'none',
    width: '100%',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  modalCancelBtn: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalCancelBtnText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#475569',
  },
  modalSubmitBtn: {
    backgroundColor: '#0066FF',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  modalSubmitBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#070D1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    minHeight: '100vh',
  },
  topBackNav: {
    position: 'absolute',
    top: 20,
    left: 24,
    zIndex: 10,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  backBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0066FF',
  },
  loginCardWrapper: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 920,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 25,
  },
  loginCardWrapperMobile: {
    flexDirection: 'column',
    maxWidth: 440,
  },
  loginLeftPane: {
    flex: 1.1,
    backgroundColor: '#0A1329',
    padding: 36,
    justifyContent: 'space-between',
  },
  paneLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paneLogoTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  paneLogoSub: {
    color: '#00D2FF',
    fontSize: 11,
    fontWeight: '600',
  },
  paneHeroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 36,
    marginVertical: 14,
  },
  paneHeroDesc: {
    fontSize: 12.5,
    color: '#94A3B8',
    lineHeight: 18,
    marginBottom: 20,
  },
  paneFeaturesList: {
    gap: 12,
  },
  paneFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paneFeatureIconSquare: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 210, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paneFeatureTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  paneFeatureDesc: {
    fontSize: 11,
    color: '#64748B',
  },
  paneFooterText: {
    fontSize: 11,
    color: '#475569',
    fontStyle: 'italic',
    marginTop: 20,
  },
  loginRightPane: {
    flex: 1.2,
    padding: 36,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  loginRightHeader: {
    marginBottom: 20,
  },
  loginTopSecurityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  loginTopSecurityTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  loginLogoIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  rightHeaderSub: {
    fontSize: 11.5,
    color: '#0066FF',
    fontWeight: '600',
  },
  loginFormBox: {
    gap: 12,
  },
  loginFormHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  loginFormSub: {
    fontSize: 12.5,
    color: '#64748B',
    marginBottom: 8,
  },
  forgotAlertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
  },
  forgotAlertText: {
    fontSize: 11.5,
    color: '#1D4ED8',
    flex: 1,
  },
  formGroup: {
    marginBottom: 4,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  loginOptsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 12,
    color: '#475569',
    marginLeft: 6,
  },
  forgotText: {
    fontSize: 12,
    color: '#0066FF',
    fontWeight: '600',
  },
  signInPrimaryBtn: {
    backgroundColor: '#0066FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 8,
    marginTop: 8,
  },
  signInPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  adminPortalWarningBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  adminPortalWarningText: {
    fontSize: 11.5,
    color: '#0369A1',
    lineHeight: 16,
    flex: 1,
  },
  portalFooterCopy: {
    fontSize: 10.5,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 20,
  },

  // Module Tab Bar Styles (LLM Data Import, Reports)
  moduleTabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 20,
    gap: 4,
    width: '100%',
  },
  moduleTab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginBottom: -1,
  },
  moduleTabActive: {
    borderBottomColor: '#0066FF',
  },
  moduleTabText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#64748B',
  },
  moduleTabTextActive: {
    color: '#0066FF',
    fontWeight: '700',
  },

  // Filter Group & Dropdown Styles (Subscriptions, LLM Data Import, Reports)
  actionFilterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    gap: 8,
    flexWrap: 'wrap',
  },
  compactSearchBox: {
    flex: 1,
    minWidth: 180,
    maxWidth: 280,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 10,
  },
  filterInlineLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginRight: 4,
  },
  filterFieldGroup: {
    flexDirection: 'column',
    gap: 4,
  },
  filterFieldLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
  },
  filterDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
    gap: 6,
  },
  filterDropdownBtnActive: {
    borderColor: '#0066FF',
    backgroundColor: '#EFF6FF',
  },
  filterDropdownText: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#0F172A',
  },
  filterDropdownMenu: {
    position: 'absolute',
    top: 42,
    left: 0,
    minWidth: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 12,
    zIndex: 1000,
  },
  filterApplyBtn: {
    backgroundColor: '#0066FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 13,
    height: 38,
    borderRadius: 8,
  },
  filterApplyBtnText: {
    fontSize: 12.5,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  filterResetBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
    height: 38,
    borderRadius: 8,
  },
  filterResetBtnText: {
    fontSize: 12.5,
    color: '#64748B',
    fontWeight: '600',
  },

  // Plans vs Subscriptions Banner Card
  plansVsSubBanner: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 18,
    marginTop: 20,
  },
  plansVsSubBannerInner: {
    gap: 10,
  },
  plansVsSubTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  plansVsSubDesc: {
    fontSize: 12.5,
    color: '#475569',
    lineHeight: 18,
  },
  plansVsSubExampleBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    gap: 4,
  },
  plansVsSubExampleTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  plansVsSubExampleBullet: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 17,
  },
});



