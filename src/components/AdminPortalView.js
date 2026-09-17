import React, { useState, useRef } from 'react';
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
import ScrollAnimation from './ScrollAnimation';

// INITIAL MOCK CLIENTS DATA (from PDF Pages 3, 4, 5, 6)
const INITIAL_CLIENTS = [
  {
    id: 1,
    name: 'TechNova Solutions',
    industry: 'IT Services',
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
    daysLeft: '95 days left',
    notes: 'Key client in IT Services sector. Interested in upgrading to Platinum plan next year.',
    color: '#0056FF',
    docs: '2,480',
    conversations: '18,220',
  },
  {
    id: 2,
    name: 'AutoDrive Ltd',
    industry: 'Automotive',
    contactPerson: 'Michael Chen',
    email: 'mchen@autodrive.com',
    phone: '+91 98123 45678',
    designation: 'VP of Engineering',
    companySize: '201 - 500 employees',
    website: 'https://www.autodrive.com',
    plan: 'Silver',
    status: 'Active',
    users: 16,
    startDate: '20 Nov 2024',
    endDate: '20 Nov 2025',
    daysLeft: '73 days left',
    notes: 'Requires high throughput for technical SOP indexing and diagnostics.',
    color: '#7C3AED',
    docs: '1,720',
    conversations: '12,450',
  },
  {
    id: 3,
    name: 'HealthPlus',
    industry: 'Healthcare',
    contactPerson: 'Dr. Emily Carter',
    email: 'carter@healthplus.org',
    phone: '+91 98456 78901',
    designation: 'Head of Clinical IT',
    companySize: '500+ employees',
    website: 'https://www.healthplus.org',
    plan: 'Platinum',
    status: 'Active',
    users: 38,
    startDate: '16 Jan 2025',
    endDate: '16 Jan 2026',
    daysLeft: '130 days left',
    notes: 'HIPAA and BAA isolation required across all clinical hospital networks.',
    color: '#10B981',
    docs: '1,540',
    conversations: '10,110',
  },
  {
    id: 4,
    name: 'EduSmart Learning',
    industry: 'Education',
    contactPerson: 'Robert Williams',
    email: 'rwilliams@edusmart.com',
    phone: '+91 98234 56789',
    designation: 'Academic Dean',
    companySize: '51 - 200 employees',
    website: 'https://www.edusmart.com',
    plan: 'Gold',
    status: 'Active',
    users: 22,
    startDate: '30 Sep 2024',
    endDate: '30 Sep 2025',
    daysLeft: '22 days left',
    notes: 'Renewal discussion in progress for student admission policy AI.',
    color: '#EAB308',
    docs: '980',
    conversations: '7,300',
  },
  {
    id: 5,
    name: 'RetailCorp',
    industry: 'Retail',
    contactPerson: 'Priya Mehta',
    email: 'priya@retailcorp.com',
    phone: '+91 98901 23456',
    designation: 'Supply Chain Lead',
    companySize: '500+ employees',
    website: 'https://www.retailcorp.com',
    plan: 'Silver',
    status: 'Active',
    users: 14,
    startDate: '10 Feb 2025',
    endDate: '10 Feb 2026',
    daysLeft: '155 days left',
    notes: 'Retail store operations and inventory policy assistance.',
    color: '#0284C7',
    docs: '890',
    conversations: '5,780',
  },
  {
    id: 6,
    name: 'GreenEnergy Co',
    industry: 'Clean Energy',
    contactPerson: 'Daniel Brooks',
    email: 'brooks@greenenergy.com',
    phone: '+91 98345 67890',
    designation: 'Operations Director',
    companySize: '51 - 200 employees',
    website: 'https://www.greenenergy.com',
    plan: 'Platinum',
    status: 'Active',
    users: 19,
    startDate: '18 Mar 2025',
    endDate: '18 Mar 2026',
    daysLeft: '191 days left',
    notes: 'Solar and wind turbine field maintenance documentation.',
    color: '#059669',
    docs: '650',
    conversations: '4,890',
  },
  {
    id: 7,
    name: 'FinSecure Bank',
    industry: 'Financial Services',
    contactPerson: 'James Wilson',
    email: 'wilson@finsecure.com',
    phone: '+91 98678 90123',
    designation: 'Chief Compliance Officer',
    companySize: '500+ employees',
    website: 'https://www.finsecure.com',
    plan: 'Gold',
    status: 'Active',
    users: 28,
    startDate: '05 Nov 2024',
    endDate: '05 Nov 2025',
    daysLeft: '58 days left',
    notes: 'Strict cryptographic tenant vector isolation and audit logs.',
    color: '#4F46E5',
    docs: '1,120',
    conversations: '9,450',
  },
  {
    id: 8,
    name: 'LogiTrans Global',
    industry: 'Logistics',
    contactPerson: 'Aisha Khan',
    email: 'akhan@logitrans.com',
    phone: '+91 98789 01234',
    designation: 'Global Logistics Manager',
    companySize: '201 - 500 employees',
    website: 'https://www.logitrans.com',
    plan: 'Silver',
    status: 'Active',
    users: 12,
    startDate: '14 Aug 2024',
    endDate: '14 Aug 2025',
    daysLeft: 'Expired',
    notes: 'Cross-border customs and supply chain SOP assistant.',
    color: '#D97706',
    docs: '740',
    conversations: '5,120',
  },
  {
    id: 9,
    name: 'CloudNest',
    industry: 'Cloud & Hosting',
    contactPerson: 'Kevin Martin',
    email: 'kevin@cloudnest.io',
    phone: '+91 98890 12345',
    designation: 'CTO',
    companySize: '11 - 50 employees',
    website: 'https://www.cloudnest.io',
    plan: 'Gold',
    status: 'Active',
    users: 12,
    startDate: '22 Dec 2024',
    endDate: '22 Dec 2025',
    daysLeft: '105 days left',
    notes: 'Cloud infrastructure runbook and incident response.',
    color: '#2563EB',
    docs: '530',
    conversations: '3,800',
  },
  {
    id: 10,
    name: 'InnoTech Systems',
    industry: 'Technology',
    contactPerson: 'Neha Gupta',
    email: 'ngupta@innotech.com',
    phone: '+91 98901 34567',
    designation: 'HR Lead',
    companySize: '51 - 200 employees',
    website: 'https://www.innotech.com',
    plan: 'Silver',
    status: 'Active',
    users: 14,
    startDate: '28 Jan 2025',
    endDate: '28 Jan 2026',
    daysLeft: '142 days left',
    notes: 'HR policy and onboarding handbook AI assistant.',
    color: '#9333EA',
    docs: '610',
    conversations: '4,210',
  },
];

// INITIAL MOCK PLANS DATA (from PDF Pages 7, 8)
const INITIAL_PLANS = [
  {
    id: 'gold',
    name: 'Gold',
    badge: null,
    desc: 'Essential features for growing businesses.',
    detailedDesc: 'Perfect for startups and small teams beginning their knowledge management journey.',
    price: '₹8,999',
    billingCycle: 'Monthly',
    validity: '12 Months',
    currency: 'INR (₹)',
    queries: 'Up to 1,000 queries/month',
    maxUsers: 5,
    storage: '500 MB',
    features: [
      'Up to 1,000 queries/month',
      'Standard LLM model',
      'Email support',
      'Basic analytics',
    ],
    status: 'Active',
    clients: 18,
    displayOrder: 1,
    color: '#EAB308',
    bgColor: '#FEF9C3',
  },
  {
    id: 'silver',
    name: 'Silver',
    badge: null,
    desc: 'Advanced capabilities for established teams.',
    detailedDesc: 'Designed for scaling departments needing priority support and deeper vector search.',
    price: '₹19,999',
    billingCycle: 'Monthly',
    validity: '12 Months',
    currency: 'INR (₹)',
    queries: 'Up to 5,000 queries/month',
    maxUsers: 15,
    storage: '2,000 MB',
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
    color: '#94A3B8',
    bgColor: '#F1F5F9',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    badge: 'Most Popular',
    desc: 'Full-featured AI platform for large organizations.',
    detailedDesc: 'Our enterprise-grade tier with dedicated account management, multi-tenant isolation, and 24/7 SLA.',
    price: '₹49,999',
    billingCycle: 'Monthly',
    validity: '12 Months',
    currency: 'INR (₹)',
    queries: 'Up to 20,000 queries/month',
    maxUsers: 50,
    storage: '10,000 MB',
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
    color: '#0056FF',
    bgColor: '#EFF6FF',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: null,
    desc: 'Tailored solution for enterprise needs.',
    detailedDesc: 'Custom private VPC, dedicated inference endpoints, and bespoke integrations.',
    price: 'Custom',
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
    clients: 3,
    displayOrder: 4,
    color: '#10B981',
    bgColor: '#ECFDF5',
  },
];

// INITIAL ROLES FOR MASTER SETTINGS (from PDF Page 16, 17)
const INITIAL_ROLES = [
  {
    id: 1,
    name: 'Admin',
    desc: 'Platform administration and management access.',
    status: 'Active',
    createdOn: 'Aug 1, 2025',
    permissions: ['Dashboard', 'Clients', 'Plans', 'Subscriptions', 'LLM Data Import', 'Reports', 'Master Settings'],
  },
  {
    id: 2,
    name: 'Client Admin',
    desc: 'Administration access for client organization.',
    status: 'Active',
    createdOn: 'Aug 2, 2025',
    permissions: ['Dashboard', 'Profile', 'Subscriptions', 'Users', 'Integration', 'Data Upload', 'Master Settings'],
  },
  {
    id: 3,
    name: 'Client User',
    desc: 'Standard user access for client organization.',
    status: 'Active',
    createdOn: 'Aug 3, 2025',
    permissions: ['Dashboard', 'Data Upload'],
  },
];

export default function AdminPortalView({ onBackToLanding }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;
  const scrollY = useRef(new Animated.Value(0)).current;

  // VIEW STATE: 'login' | 'portal'
  const [viewState, setViewState] = useState('login');
  const [email, setEmail] = useState('admin@platinumsoftware.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // ACTIVE NAVIGATION TAB:
  // 'Dashboard' | 'Clients' | 'Plans' | 'Subscriptions' | 'LLM Data Import' | 'Reports' | 'Master Settings'
  const [activeNav, setActiveNav] = useState('Dashboard');

  // MASTER SETTINGS ACTIVE TAB:
  // 'General Settings' | 'Role Management' | 'Master Data' | 'System Configuration' | 'Appearance & Branding'
  const [settingsTab, setSettingsTab] = useState('General Settings');

  // DATA STATES
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [plans, setPlans] = useState(INITIAL_PLANS);
  const [roles, setRoles] = useState(INITIAL_ROLES);

  // CLIENTS FILTER & SEARCH
  const [clientSearch, setClientSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // PLANS FILTER & SEARCH
  const [planSearch, setPlanSearch] = useState('');
  const [planStatusFilter, setPlanStatusFilter] = useState('All');
  const [planViewMode, setPlanViewMode] = useState('table'); // 'table' | 'grid'

  // MODALS
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showViewClientModal, setShowViewClientModal] = useState(false);

  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [showAddRoleModal, setShowAddRoleModal] = useState(false);

  // FORM STATES (Add Client)
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    industry: 'IT Services',
    companySize: '51 - 200 employees',
    website: 'https://',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    plan: 'Gold',
    startDate: '17/09/2026',
    endDate: '17/09/2027',
    status: 'Active',
    notes: '',
  });

  // FORM STATES (Add Plan)
  const [newPlanForm, setNewPlanForm] = useState({
    name: '',
    planType: 'Standard Tier',
    shortDesc: '',
    detailedDesc: '',
    price: '₹',
    billingCycle: 'Monthly',
    validity: '12',
    currency: 'INR (₹)',
    maxQueries: '5,000',
    keyFeatures: 'Up to 5,000 queries/month\nAdvanced LLM model\nPriority support\nBasic analytics',
    maxUsers: '10',
    storageLimit: '2,000',
    status: 'Active',
    displayOrder: '5',
  });

  // FORM STATES (Add Role)
  const [newRoleForm, setNewRoleForm] = useState({
    name: '',
    desc: '',
    status: 'Active',
    permissions: ['Dashboard', 'Clients'],
  });

  // GENERAL SETTINGS STATES (from PDF Page 15)
  const [platformName, setPlatformName] = useState('Platinum Software');
  const [platformDesc, setPlatformDesc] = useState('AI Chatbot Platform for Businesses');
  const [platformUrl, setPlatformUrl] = useState('https://app.platinum.ai');
  const [supportEmail, setSupportEmail] = useState('support@platinumsoftware.com');
  const [defaultLang, setDefaultLang] = useState('English');
  const [timeZone, setTimeZone] = useState('Asia/Kolkata (IST)');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timeFormat, setTimeFormat] = useState('12-Hour (AM/PM)');
  const [showNameInTitle, setShowNameInTitle] = useState(true);
  const [showLiveDateTime, setShowLiveDateTime] = useState(true);
  const [enableSupportLink, setEnableSupportLink] = useState(true);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // APPEARANCE & BRANDING STATES (from PDF Page 17)
  const [primaryColor, setPrimaryColor] = useState('#0056FF');
  const [tagline, setTagline] = useState('AI Chatbot Platform');
  const [footerText, setFooterText] = useState('© 2026 Platinum Software. All rights reserved.');

  // HELPERS
  const handleSaveSettings = () => {
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  const handleCreateClient = () => {
    if (!newClientForm.name) return;
    const created = {
      id: clients.length + 1,
      name: newClientForm.name,
      industry: newClientForm.industry,
      contactPerson: newClientForm.contactPerson || 'Authorized Rep',
      email: newClientForm.email || 'contact@company.com',
      phone: newClientForm.phone || '+91 90000 00000',
      designation: newClientForm.designation || 'Manager',
      companySize: newClientForm.companySize,
      website: newClientForm.website,
      plan: newClientForm.plan,
      status: newClientForm.status,
      users: 10,
      startDate: newClientForm.startDate,
      endDate: newClientForm.endDate,
      daysLeft: '365 days left',
      notes: newClientForm.notes || 'Newly registered client organization.',
      color: '#0056FF',
      docs: '120',
      conversations: '450',
    };
    setClients([created, ...clients]);
    setShowAddClientModal(false);
  };

  const handleCreatePlan = () => {
    if (!newPlanForm.name) return;
    const featuresList = newPlanForm.keyFeatures.split('\n').filter((f) => f.trim().length > 0);
    const created = {
      id: newPlanForm.name.toLowerCase().replace(/\s+/g, '-'),
      name: newPlanForm.name,
      badge: null,
      desc: newPlanForm.shortDesc || 'Customized subscription plan.',
      detailedDesc: newPlanForm.detailedDesc,
      price: newPlanForm.price,
      billingCycle: newPlanForm.billingCycle,
      validity: `${newPlanForm.validity} Months`,
      currency: newPlanForm.currency,
      queries: `Up to ${newPlanForm.maxQueries} queries/month`,
      maxUsers: newPlanForm.maxUsers,
      storage: `${newPlanForm.storageLimit} MB`,
      features: featuresList.length ? featuresList : ['Standard AI Model Access'],
      status: newPlanForm.status,
      clients: 0,
      displayOrder: parseInt(newPlanForm.displayOrder) || plans.length + 1,
      color: '#0056FF',
      bgColor: '#EFF6FF',
    };
    setPlans([...plans, created]);
    setShowAddPlanModal(false);
  };

  const handleCreateRole = () => {
    if (!newRoleForm.name) return;
    const created = {
      id: roles.length + 1,
      name: newRoleForm.name,
      desc: newRoleForm.desc || 'Custom access role.',
      status: newRoleForm.status,
      createdOn: 'Sep 17, 2026',
      permissions: newRoleForm.permissions,
    };
    setRoles([...roles, created]);
    setShowAddRoleModal(false);
  };

  // Filtered Clients
  const filteredClients = clients.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.industry.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(clientSearch.toLowerCase());
    const matchIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
    const matchPlan = selectedPlanFilter === 'All' || c.plan === selectedPlanFilter;
    const matchStatus = selectedStatusFilter === 'All' || c.status === selectedStatusFilter;
    return matchSearch && matchIndustry && matchPlan && matchStatus;
  });

  // Filtered Plans
  const filteredPlans = plans.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(planSearch.toLowerCase()) ||
      p.desc.toLowerCase().includes(planSearch.toLowerCase());
    const matchStatus = planStatusFilter === 'All' || p.status === planStatusFilter;
    return matchSearch && matchStatus;
  });

  // ==========================================
  // VIEW 1: ADMINISTRATOR LOGIN SCREEN (Page 2)
  // ==========================================
  if (viewState === 'login') {
    return (
      <View style={styles.loginContainer}>
        <ScrollAnimation scrollY={scrollY} />
        <View style={styles.topBackNav}>
          <TouchableOpacity style={styles.backBtn} onPress={onBackToLanding}>
            <Feather name="arrow-left" size={16} color="#0056FF" style={{ marginRight: 6 }} />
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
              <MaterialCommunityIcons name="hexagon-multiple" size={32} color="#0056FF" />
              <Text style={styles.rightHeaderTitle}>PLATINUM SOFTWARE</Text>
              <Text style={styles.rightHeaderSub}>AI Chatbot Platform</Text>
            </View>

            <View style={styles.loginFormBox}>
              <Text style={styles.loginFormHeading}>Administrator Login</Text>
              <Text style={styles.loginFormSub}>Sign in to access the Platinum Software Admin Portal.</Text>

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
                    color={rememberMe ? '#0056FF' : '#94A3B8'}
                  />
                  <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity>
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

              <View style={styles.securityWarningBox}>
                <Feather name="shield" size={16} color="#0056FF" style={{ marginRight: 8 }} />
                <Text style={styles.securityWarningText}>
                  This portal is for authorized Platinum Software administrators only. Unauthorized access is prohibited.
                </Text>
              </View>
            </View>

            <Text style={styles.portalFooterCopy}>
              © 2026 Platinum Software. All rights reserved. • Privacy Policy • Terms of Service
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // ==========================================
  // VIEW 2: FULL ADMINISTRATOR MANAGEMENT PORTAL
  // ==========================================
  return (
    <View style={styles.dashContainer}>
      {/* Top Admin Navbar (PDF Template) */}
      <View style={styles.dashTopNav}>
        <View style={styles.dashLogoBox}>
          <MaterialCommunityIcons name="hexagon-multiple" size={24} color="#0056FF" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.dashLogoText}>PLATINUM SOFTWARE</Text>
            <Text style={styles.dashLogoSubText}>AI Chatbot Platform</Text>
          </View>
        </View>

        <View style={styles.dashSearchBar}>
          <Feather name="search" size={15} color="#94A3B8" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search clients, plans, reports..."
            placeholderTextColor="#94A3B8"
            style={styles.dashSearchInput}
          />
        </View>

        <View style={styles.dashNavRight}>
          {showLiveDateTime && (
            <View style={styles.dateTimeBadge}>
              <Feather name="calendar" size={13} color="#64748B" style={{ marginRight: 6 }} />
              <Text style={styles.dateTimeText}>Monday, 8 September 2025  10:24 AM</Text>
            </View>
          )}

          <TouchableOpacity style={styles.dashNavIconBtn}>
            <Feather name="bell" size={17} color="#475569" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <View style={styles.adminUserBadge}>
            <View style={styles.adminAvatar}>
              <Text style={styles.adminAvatarText}>A</Text>
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.adminName}>Admin</Text>
              <Text style={styles.adminRole}>Platform Administrator</Text>
            </View>
            <Feather name="chevron-down" size={14} color="#94A3B8" style={{ marginLeft: 6 }} />
          </View>

          <TouchableOpacity
            style={styles.dashExitBtn}
            onPress={() => setViewState('login')}
            accessibilityLabel="Log out"
          >
            <Feather name="log-out" size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Body Layout: Sidebar + Workspace Content */}
      <View style={styles.dashBody}>
        {/* Left Sidebar (Matches PDF Navigation) */}
        {!isMobile && (
          <View style={styles.sidebar}>
            {[
              { name: 'Dashboard', icon: 'view-dashboard-outline' },
              { name: 'Clients', icon: 'account-group-outline' },
              { name: 'Plans', icon: 'card-bulleted-outline' },
              { name: 'Subscriptions', icon: 'receipt-text-outline' },
              { name: 'LLM Data Import', icon: 'cloud-sync-outline' },
              { name: 'Reports', icon: 'chart-box-outline' },
              { name: 'Master Settings', icon: 'cog-outline' },
            ].map((item) => {
              const isActive = activeNav === item.name;
              return (
                <TouchableOpacity
                  key={item.name}
                  style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
                  onPress={() => setActiveNav(item.name)}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={19}
                    color={isActive ? '#0056FF' : '#64748B'}
                    style={{ marginRight: 12 }}
                  />
                  <Text style={[styles.sidebarItemText, isActive && styles.sidebarItemTextActive]}>
                    {item.name}
                  </Text>
                  {isActive && <View style={styles.sidebarActivePill} />}
                </TouchableOpacity>
              );
            })}

            <View style={{ flex: 1 }} />

            <View style={styles.sidebarNeedHelpBox}>
              <Feather name="help-circle" size={16} color="#0056FF" style={{ marginBottom: 6 }} />
              <Text style={styles.sidebarNeedHelpTitle}>Need help?</Text>
              <Text style={styles.sidebarNeedHelpSub}>Contact support</Text>
            </View>

            <TouchableOpacity style={styles.sidebarBackToWeb} onPress={onBackToLanding}>
              <Feather name="globe" size={16} color="#0056FF" style={{ marginRight: 8 }} />
              <Text style={styles.sidebarBackToWebText}>Return to Website</Text>
            </TouchableOpacity>

            <Text style={styles.sidebarVersionText}>© 2026 Platinum Software  v1.0.0</Text>
          </View>
        )}

        {/* Dynamic Main Content Container */}
        <ScrollView style={styles.mainContent} contentContainerStyle={{ padding: 24, paddingBottom: 60 }}>
          {/* Breadcrumb Header Bar */}
          <View style={styles.breadcrumbHeaderRow}>
            <View>
              <View style={styles.breadcrumbRow}>
                <Text style={styles.breadcrumbMuted}>Dashboard</Text>
                {activeNav !== 'Dashboard' && (
                  <>
                    <Feather name="chevron-right" size={13} color="#94A3B8" style={{ marginHorizontal: 4 }} />
                    <Text style={styles.breadcrumbActive}>{activeNav}</Text>
                  </>
                )}
                {activeNav === 'Master Settings' && (
                  <>
                    <Feather name="chevron-right" size={13} color="#94A3B8" style={{ marginHorizontal: 4 }} />
                    <Text style={styles.breadcrumbActive}>{settingsTab}</Text>
                  </>
                )}
              </View>
              <Text style={styles.screenMainHeading}>
                {activeNav === 'Dashboard' && 'Welcome back, Admin! 👋'}
                {activeNav === 'Clients' && 'Client Management'}
                {activeNav === 'Plans' && 'Plans Management'}
                {activeNav === 'Subscriptions' && 'Subscriptions Management'}
                {activeNav === 'LLM Data Import' && 'LLM Data Import'}
                {activeNav === 'Reports' && 'Reports & Analytics'}
                {activeNav === 'Master Settings' && 'Master Settings'}
              </Text>
              <Text style={styles.screenMainSub}>
                {activeNav === 'Dashboard' && "Here's an overview of your AI chatbot platform."}
                {activeNav === 'Clients' && 'Manage and monitor all client organizations using the Platinum Software AI platform.'}
                {activeNav === 'Plans' && 'Create and manage subscription plans for your clients.'}
                {activeNav === 'Subscriptions' && 'Monitor and manage client subscription lifecycles.'}
                {activeNav === 'LLM Data Import' && 'Operational control and monitoring screen for AI knowledge ingestion.'}
                {activeNav === 'Reports' && 'Cross-tenant performance analytics and operational usage logs.'}
                {activeNav === 'Master Settings' && 'Manage platform-level configuration, master lists, and RBAC permissions.'}
              </Text>
            </View>

            {/* Quick Actions in Header */}
            {activeNav === 'Clients' && (
              <TouchableOpacity style={styles.topActionBtn} onPress={() => setShowAddClientModal(true)}>
                <Feather name="plus" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.topActionBtnText}>Add Client</Text>
              </TouchableOpacity>
            )}

            {activeNav === 'Plans' && (
              <TouchableOpacity style={styles.topActionBtn} onPress={() => setShowAddPlanModal(true)}>
                <Feather name="plus" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.topActionBtnText}>Add Plan</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Toast Notification */}
          {settingsSavedToast && (
            <View style={styles.toastCard}>
              <Feather name="check-circle" size={16} color="#10B981" style={{ marginRight: 8 }} />
              <Text style={styles.toastText}>Changes saved successfully to platform master configuration!</Text>
            </View>
          )}

          {/* ========================================================= */}
          {/* 1. DASHBOARD VIEW (Exact Template from PDF Page 3)         */}
          {/* ========================================================= */}
          {activeNav === 'Dashboard' && (
            <View style={styles.sectionContainer}>
              {/* 4 KPI Cards */}
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard
                  icon="account-group"
                  title="Total Clients"
                  value="48"
                  trend="+ 12%"
                  sub="+5 new this month"
                  color="#0056FF"
                  bgColor="#EFF6FF"
                />
                <KPICard
                  icon="account-check"
                  title="Active Clients"
                  value="42"
                  trend="+ 8%"
                  sub="87.5% of total"
                  color="#10B981"
                  bgColor="#ECFDF5"
                />
                <KPICard
                  icon="receipt"
                  title="Total Subscriptions"
                  value="52"
                  trend="+ 15%"
                  sub="across all clients"
                  color="#7C3AED"
                  bgColor="#F5F3FF"
                />
                <KPICard
                  icon="file-document-multiple"
                  title="Total Documents"
                  value="12,480"
                  trend="+ 22%"
                  sub="Uploaded by clients"
                  color="#0284C7"
                  bgColor="#F0F9FF"
                />
              </View>

              {/* Middle Row: Client Growth | Subscriptions by Plan | Recent Activity */}
              <View style={[styles.middleGridRow, isMobile && styles.middleGridRowMobile]}>
                {/* 1. Client Growth Chart */}
                <View style={[styles.gridCard, { flex: 1.1 }]}>
                  <View style={styles.gridCardHeader}>
                    <Text style={styles.gridCardTitle}>Client Growth</Text>
                    <View style={styles.filterDropdownPill}>
                      <Text style={styles.filterDropdownPillText}>Last 6 Months</Text>
                      <Feather name="chevron-down" size={13} color="#64748B" style={{ marginLeft: 4 }} />
                    </View>
                  </View>

                  <View style={styles.areaChartContainer}>
                    <View style={styles.chartYAxis}>
                      <Text style={styles.axisLabel}>50</Text>
                      <Text style={styles.axisLabel}>40</Text>
                      <Text style={styles.axisLabel}>30</Text>
                      <Text style={styles.axisLabel}>20</Text>
                      <Text style={styles.axisLabel}>10</Text>
                    </View>
                    <View style={styles.chartBarsGroup}>
                      {[
                        { month: 'Apr', value: 24, active: false },
                        { month: 'May', value: 28, active: false },
                        { month: 'Jun', value: 34, active: false },
                        { month: 'Jul', value: 40, active: false },
                        { month: 'Aug', value: 48, active: true },
                      ].map((item, idx) => (
                        <View key={item.month} style={styles.chartBarCol}>
                          <View
                            style={[
                              styles.chartBarFill,
                              item.active ? styles.chartBarFillActive : styles.chartBarFillNormal,
                              { height: `${(item.value / 50) * 100}%` },
                            ]}
                          >
                            <Text style={styles.chartBarValue}>{item.value}</Text>
                          </View>
                          <Text style={[styles.chartBarMonth, item.active && { color: '#0056FF', fontWeight: '700' }]}>
                            {item.month}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                {/* 2. Subscriptions by Plan (Donut Chart) */}
                <View style={[styles.gridCard, { flex: 1.0 }]}>
                  <View style={styles.gridCardHeader}>
                    <Text style={styles.gridCardTitle}>Subscriptions by Plan</Text>
                  </View>

                  <View style={styles.donutLayout}>
                    <View style={styles.donutCenterCircle}>
                      <Text style={styles.donutCenterValue}>52</Text>
                      <Text style={styles.donutCenterLabel}>Total</Text>
                    </View>
                    <View style={styles.donutLegendCol}>
                      <DonutLegendItem color="#EAB308" label="Gold" count="24 (46%)" />
                      <DonutLegendItem color="#94A3B8" label="Silver" count="14 (27%)" />
                      <DonutLegendItem color="#0056FF" label="Platinum" count="10 (19%)" />
                      <DonutLegendItem color="#64748B" label="Others" count="4 (8%)" />
                    </View>
                  </View>
                </View>

                {/* 3. Recent Activity */}
                <View style={[styles.gridCard, { flex: 1.1 }]}>
                  <View style={styles.gridCardHeader}>
                    <Text style={styles.gridCardTitle}>Recent Activity</Text>
                    <TouchableOpacity onPress={() => setActiveNav('Reports')}>
                      <Text style={styles.viewAllLinkText}>View All →</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.timelineList}>
                    <TimelineRow
                      icon="account-plus"
                      color="#0056FF"
                      text="New client 'EduSmart Learning' added"
                      time="2 hours ago"
                    />
                    <TimelineRow
                      icon="refresh"
                      color="#10B981"
                      text="Subscription for 'HealthPlus' renewed"
                      time="5 hours ago"
                    />
                    <TimelineRow
                      icon="cloud-check"
                      color="#7C3AED"
                      text="LLM data import completed for 'AutoDrive Ltd'"
                      time="1 day ago"
                    />
                    <TimelineRow
                      icon="star-check"
                      color="#EAB308"
                      text="Plan 'Platinum' assigned to 'FinSecure Bank'"
                      time="1 day ago"
                    />
                    <TimelineRow
                      icon="domain-plus"
                      color="#0284C7"
                      text="New client 'GreenEnergy Co' added"
                      time="2 days ago"
                    />
                  </View>
                </View>
              </View>

              {/* Lower Row: Top Clients by Usage & Subscription Expiry */}
              <View style={[styles.middleGridRow, isMobile && styles.middleGridRowMobile]}>
                {/* Top Clients by Usage Table */}
                <View style={[styles.gridCard, { flex: 1.1 }]}>
                  <View style={styles.gridCardHeader}>
                    <Text style={styles.gridCardTitle}>Top Clients by Usage</Text>
                    <TouchableOpacity onPress={() => setActiveNav('Clients')}>
                      <Text style={styles.viewAllLinkText}>View All →</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thText, { width: 30 }]}>#</Text>
                    <Text style={[styles.thText, { flex: 1.6 }]}>Company Name</Text>
                    <Text style={[styles.thText, { flex: 1.0 }]}>Documents</Text>
                    <Text style={[styles.thText, { flex: 1.1 }]}>Conversations</Text>
                    <Text style={[styles.thText, { flex: 0.9 }]}>Status</Text>
                  </View>

                  {clients.slice(0, 5).map((client, idx) => (
                    <View key={client.id} style={styles.tableBodyRow}>
                      <Text style={[styles.tdTextMuted, { width: 30 }]}>{idx + 1}</Text>
                      <View style={[styles.clientNameCol, { flex: 1.6 }]}>
                        <View style={[styles.clientMiniAvatar, { backgroundColor: client.color }]}>
                          <Text style={styles.clientMiniAvatarText}>{client.name.charAt(0)}</Text>
                        </View>
                        <Text style={styles.clientNameText} numberOfLines={1}>
                          {client.name}
                        </Text>
                      </View>
                      <Text style={[styles.tdText, { flex: 1.0 }]}>{client.docs}</Text>
                      <Text style={[styles.tdText, { flex: 1.1 }]}>{client.conversations}</Text>
                      <View style={{ flex: 0.9 }}>
                        <View style={styles.statusBadgeActive}>
                          <View style={styles.statusDotActive} />
                          <Text style={styles.statusBadgeTextActive}>Active</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Subscription Expiry Table */}
                <View style={[styles.gridCard, { flex: 1.1 }]}>
                  <View style={styles.gridCardHeader}>
                    <Text style={styles.gridCardTitle}>Subscription Expiry</Text>
                    <TouchableOpacity onPress={() => setActiveNav('Subscriptions')}>
                      <Text style={styles.viewAllLinkText}>View All →</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thText, { flex: 1.5 }]}>Company Name</Text>
                    <Text style={[styles.thText, { flex: 1.0 }]}>Plan</Text>
                    <Text style={[styles.thText, { flex: 1.2 }]}>Expiry Date</Text>
                    <Text style={[styles.thText, { flex: 1.1 }]}>Days Left</Text>
                  </View>

                  {clients.slice(3, 8).map((c) => (
                    <View key={c.id} style={styles.tableBodyRow}>
                      <Text style={[styles.clientNameText, { flex: 1.5 }]} numberOfLines={1}>
                        {c.name}
                      </Text>
                      <View style={{ flex: 1.0 }}>
                        <Text style={[styles.planBadgeText, { color: getPlanColor(c.plan) }]}>
                          {c.plan}
                        </Text>
                      </View>
                      <Text style={[styles.tdTextMuted, { flex: 1.2 }]}>{c.endDate}</Text>
                      <View style={{ flex: 1.1 }}>
                        <View
                          style={[
                            styles.daysLeftPill,
                            c.daysLeft === 'Expired'
                              ? styles.daysLeftExpired
                              : c.daysLeft.includes('22') || c.daysLeft.includes('58')
                              ? styles.daysLeftWarning
                              : styles.daysLeftNormal,
                          ]}
                        >
                          <Text
                            style={[
                              styles.daysLeftText,
                              c.daysLeft === 'Expired'
                                ? { color: '#EF4444' }
                                : c.daysLeft.includes('22') || c.daysLeft.includes('58')
                                ? { color: '#B45309' }
                                : { color: '#0056FF' },
                            ]}
                          >
                            {c.daysLeft}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Bottom CTA Banner (from PDF Page 3) */}
              <View style={styles.bottomCtaBanner}>
                <View style={styles.ctaBannerLeft}>
                  <View style={styles.ctaBannerIconBox}>
                    <MaterialCommunityIcons name="lightning-bolt" size={22} color="#0056FF" />
                  </View>
                  <View>
                    <Text style={styles.ctaBannerHeading}>Let's make AI accessible to every business.</Text>
                    <Text style={styles.ctaBannerSub}>
                      Manage clients, subscriptions, and knowledge—all in one unified control pane.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.ctaBannerBtn}
                  onPress={() => setActiveNav('Reports')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.ctaBannerBtnText}>View Reports →</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* 2. CLIENTS MANAGEMENT VIEW (PDF Pages 4, 5, 6)             */}
          {/* ========================================================= */}
          {activeNav === 'Clients' && (
            <View style={styles.sectionContainer}>
              {/* 4 Summary Cards */}
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard
                  icon="account-group"
                  title="Total Clients"
                  value="48"
                  trend="+ 12%"
                  sub="+5 new this month"
                  color="#0056FF"
                  bgColor="#EFF6FF"
                />
                <KPICard
                  icon="account-check"
                  title="Active Clients"
                  value="42"
                  trend="+ 8%"
                  sub="87.5% of total"
                  color="#10B981"
                  bgColor="#ECFDF5"
                />
                <KPICard
                  icon="account-remove"
                  title="Inactive Clients"
                  value="6"
                  trend="+ 25%"
                  sub="12.5% of total"
                  color="#EF4444"
                  bgColor="#FEF2F2"
                />
                <KPICard
                  icon="clock-alert-outline"
                  title="Expiring Soon"
                  value="5"
                  trend="Alert"
                  sub="in next 30 days View →"
                  color="#F59E0B"
                  bgColor="#FFFBEB"
                />
              </View>

              {/* Search & Filters Bar (from PDF Page 4) */}
              <View style={[styles.searchFilterCard, isMobile && styles.searchFilterCardMobile]}>
                <View style={styles.searchBoxInputWrapper}>
                  <Feather name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                  <TextInput
                    placeholder="Search by company name, industry, or contact..."
                    placeholderTextColor="#94A3B8"
                    value={clientSearch}
                    onChangeText={setClientSearch}
                    style={styles.innerSearchInput}
                  />
                </View>

                <View style={styles.filterDropdownsRow}>
                  {/* Industry Dropdown */}
                  <View style={styles.dropdownSelector}>
                    <Text style={styles.dropdownLabel}>Industry: {selectedIndustry}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedIndustry((prev) =>
                          prev === 'All' ? 'IT Services' : prev === 'IT Services' ? 'Healthcare' : 'All'
                        )
                      }
                    >
                      <Feather name="chevron-down" size={14} color="#64748B" />
                    </TouchableOpacity>
                  </View>

                  {/* Plan Dropdown */}
                  <View style={styles.dropdownSelector}>
                    <Text style={styles.dropdownLabel}>Plan: {selectedPlanFilter}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedPlanFilter((prev) =>
                          prev === 'All' ? 'Gold' : prev === 'Gold' ? 'Platinum' : 'All'
                        )
                      }
                    >
                      <Feather name="chevron-down" size={14} color="#64748B" />
                    </TouchableOpacity>
                  </View>

                  {/* Reset Button */}
                  <TouchableOpacity
                    style={styles.resetFilterBtn}
                    onPress={() => {
                      setClientSearch('');
                      setSelectedIndustry('All');
                      setSelectedPlanFilter('All');
                      setSelectedStatusFilter('All');
                    }}
                  >
                    <Feather name="rotate-ccw" size={14} color="#64748B" style={{ marginRight: 4 }} />
                    <Text style={styles.resetFilterBtnText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* All Clients (48) Table Card (from PDF Page 4) */}
              <View style={styles.fullTableCard}>
                <View style={styles.tableCardTitleBar}>
                  <Text style={styles.tableCardMainTitle}>All Clients ({filteredClients.length})</Text>
                  <Text style={styles.tableCardSubtitle}>Complete list of enrolled client tenants</Text>
                </View>

                {/* Table Headers */}
                <View style={styles.tableHeaderRow}>
                  <Text style={[styles.thText, { width: 32 }]}>#</Text>
                  <Text style={[styles.thText, { flex: 1.6 }]}>Company Name</Text>
                  <Text style={[styles.thText, { flex: 1.2 }]}>Industry</Text>
                  <Text style={[styles.thText, { flex: 1.5 }]}>Contact Person</Text>
                  <Text style={[styles.thText, { flex: 0.9 }]}>Plan</Text>
                  <Text style={[styles.thText, { flex: 0.9 }]}>Status</Text>
                  <Text style={[styles.thText, { flex: 0.7 }]}>Users</Text>
                  <Text style={[styles.thText, { flex: 1.3 }]}>Subscription End</Text>
                  <Text style={[styles.thText, { flex: 1.1, textAlign: 'right' }]}>Actions</Text>
                </View>

                {/* Table Rows */}
                {filteredClients.map((client, index) => (
                  <View key={client.id} style={styles.tableBodyRow}>
                    <Text style={[styles.tdTextMuted, { width: 32 }]}>{index + 1}</Text>

                    {/* Company */}
                    <View style={[styles.clientNameCol, { flex: 1.6 }]}>
                      <View style={[styles.clientMiniAvatar, { backgroundColor: client.color }]}>
                        <Text style={styles.clientMiniAvatarText}>{client.name.charAt(0)}</Text>
                      </View>
                      <View>
                        <Text style={styles.clientNameText}>{client.name}</Text>
                        <Text style={styles.clientSubText}>{client.website}</Text>
                      </View>
                    </View>

                    {/* Industry */}
                    <Text style={[styles.tdText, { flex: 1.2 }]}>{client.industry}</Text>

                    {/* Contact Person */}
                    <View style={{ flex: 1.5 }}>
                      <Text style={styles.contactNameText}>{client.contactPerson}</Text>
                      <Text style={styles.contactEmailText}>{client.email}</Text>
                    </View>

                    {/* Plan */}
                    <View style={{ flex: 0.9 }}>
                      <View style={[styles.planPill, { backgroundColor: getPlanBg(client.plan) }]}>
                        <Text style={[styles.planPillText, { color: getPlanColor(client.plan) }]}>
                          {client.plan}
                        </Text>
                      </View>
                    </View>

                    {/* Status */}
                    <View style={{ flex: 0.9 }}>
                      <View style={client.status === 'Active' ? styles.statusBadgeActive : styles.statusBadgeInactive}>
                        <View style={client.status === 'Active' ? styles.statusDotActive : styles.statusDotInactive} />
                        <Text style={client.status === 'Active' ? styles.statusBadgeTextActive : styles.statusBadgeTextInactive}>
                          {client.status}
                        </Text>
                      </View>
                    </View>

                    {/* Users */}
                    <Text style={[styles.tdText, { flex: 0.7 }]}>{client.users}</Text>

                    {/* Subscription End */}
                    <View style={{ flex: 1.3 }}>
                      <Text style={styles.dateEndText}>{client.endDate}</Text>
                      <Text style={styles.daysLeftSubText}>{client.daysLeft}</Text>
                    </View>

                    {/* Action Buttons: View & Edit */}
                    <View style={[styles.actionButtonsCol, { flex: 1.1 }]}>
                      <TouchableOpacity
                        style={styles.actionBtnView}
                        onPress={() => {
                          setSelectedClient(client);
                          setShowViewClientModal(true);
                        }}
                      >
                        <Text style={styles.actionBtnViewText}>View</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.actionBtnEdit}
                        onPress={() => {
                          setSelectedClient(client);
                          setShowEditClientModal(true);
                        }}
                      >
                        <Text style={styles.actionBtnEditText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* Table Footer Pagination */}
                <View style={styles.tablePaginationFooter}>
                  <Text style={styles.paginationInfoText}>
                    Showing 1 to {filteredClients.length} of {clients.length} clients
                  </Text>
                  <View style={styles.paginationControls}>
                    <TouchableOpacity style={styles.pageArrowBtn}>
                      <Feather name="chevron-left" size={14} color="#64748B" />
                    </TouchableOpacity>
                    <View style={styles.pageNumberActive}>
                      <Text style={styles.pageNumberActiveText}>1</Text>
                    </View>
                    <TouchableOpacity style={styles.pageNumberBtn}>
                      <Text style={styles.pageNumberText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pageNumberBtn}>
                      <Text style={styles.pageNumberText}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.pageArrowBtn}>
                      <Feather name="chevron-right" size={14} color="#64748B" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* 3. PLANS MANAGEMENT VIEW (PDF Pages 7, 8)                  */}
          {/* ========================================================= */}
          {activeNav === 'Plans' && (
            <View style={styles.sectionContainer}>
              {/* 4 Summary Cards */}
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard
                  icon="card-bulleted"
                  title="Total Plans"
                  value={plans.length.toString()}
                  trend="Active"
                  sub="Active subscription plans"
                  color="#0056FF"
                  bgColor="#EFF6FF"
                />
                <KPICard
                  icon="check-circle"
                  title="Active Plans"
                  value={plans.filter((p) => p.status === 'Active').length.toString()}
                  trend="100%"
                  sub="100% of total"
                  color="#10B981"
                  bgColor="#ECFDF5"
                />
                <KPICard
                  icon="close-circle"
                  title="Inactive Plans"
                  value="0"
                  trend="0%"
                  sub="0% of total"
                  color="#64748B"
                  bgColor="#F1F5F9"
                />
                <KPICard
                  icon="domain"
                  title="Total Clients Using Plans"
                  value="48"
                  trend="Active"
                  sub="Across all plans"
                  color="#F59E0B"
                  bgColor="#FFFBEB"
                />
              </View>

              {/* Search & View Mode Toggle */}
              <View style={[styles.searchFilterCard, isMobile && styles.searchFilterCardMobile]}>
                <View style={styles.searchBoxInputWrapper}>
                  <Feather name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                  <TextInput
                    placeholder="Search plans by name or description..."
                    placeholderTextColor="#94A3B8"
                    value={planSearch}
                    onChangeText={setPlanSearch}
                    style={styles.innerSearchInput}
                  />
                </View>

                <View style={styles.filterDropdownsRow}>
                  {/* Status Filter */}
                  <View style={styles.dropdownSelector}>
                    <Text style={styles.dropdownLabel}>Status: {planStatusFilter}</Text>
                    <TouchableOpacity
                      onPress={() => setPlanStatusFilter((prev) => (prev === 'All' ? 'Active' : 'All'))}
                    >
                      <Feather name="chevron-down" size={14} color="#64748B" />
                    </TouchableOpacity>
                  </View>

                  {/* View Mode Switcher */}
                  <View style={styles.viewModeToggle}>
                    <TouchableOpacity
                      style={[styles.viewModeBtn, planViewMode === 'table' && styles.viewModeBtnActive]}
                      onPress={() => setPlanViewMode('table')}
                    >
                      <Feather name="list" size={15} color={planViewMode === 'table' ? '#0056FF' : '#64748B'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.viewModeBtn, planViewMode === 'grid' && styles.viewModeBtnActive]}
                      onPress={() => setPlanViewMode('grid')}
                    >
                      <Feather name="grid" size={15} color={planViewMode === 'grid' ? '#0056FF' : '#64748B'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* TABLE VIEW (Exact layout from PDF Page 7) */}
              {planViewMode === 'table' ? (
                <View style={styles.fullTableCard}>
                  <View style={styles.tableCardTitleBar}>
                    <Text style={styles.tableCardMainTitle}>All Plans ({filteredPlans.length})</Text>
                    <Text style={styles.tableCardSubtitle}>Configured subscription tiers and feature allocations</Text>
                  </View>

                  <View style={styles.tableHeaderRow}>
                    <Text style={[styles.thText, { width: 30 }]}>#</Text>
                    <Text style={[styles.thText, { flex: 1.2 }]}>Plan</Text>
                    <Text style={[styles.thText, { flex: 1.6 }]}>Description</Text>
                    <Text style={[styles.thText, { flex: 1.1 }]}>Price (Monthly)</Text>
                    <Text style={[styles.thText, { flex: 2.2 }]}>Key Features</Text>
                    <Text style={[styles.thText, { flex: 0.8 }]}>Status</Text>
                    <Text style={[styles.thText, { flex: 0.7 }]}>Clients</Text>
                    <Text style={[styles.thText, { flex: 1.0, textAlign: 'right' }]}>Actions</Text>
                  </View>

                  {filteredPlans.map((plan, index) => (
                    <View key={plan.id} style={styles.tableBodyRow}>
                      <Text style={[styles.tdTextMuted, { width: 30 }]}>{index + 1}</Text>

                      {/* Plan Badge */}
                      <View style={[styles.planCellCol, { flex: 1.2 }]}>
                        <View style={[styles.planIconCircle, { backgroundColor: plan.bgColor }]}>
                          <MaterialCommunityIcons name="card-bulleted" size={16} color={plan.color} />
                        </View>
                        <View>
                          <Text style={styles.planCellName}>{plan.name}</Text>
                          {plan.badge && (
                            <View style={styles.popularBadge}>
                              <Text style={styles.popularBadgeText}>{plan.badge}</Text>
                            </View>
                          )}
                        </View>
                      </View>

                      {/* Description */}
                      <Text style={[styles.tdTextMuted, { flex: 1.6 }]}>{plan.desc}</Text>

                      {/* Price */}
                      <Text style={[styles.planPriceText, { flex: 1.1 }]}>{plan.price}</Text>

                      {/* Key Features (Bullet list from PDF) */}
                      <View style={[styles.featuresBulletList, { flex: 2.2 }]}>
                        {plan.features.map((f, i) => (
                          <View key={i} style={styles.featureBulletItem}>
                            <Text style={styles.bulletDot}>•</Text>
                            <Text style={styles.featureBulletText}>{f}</Text>
                          </View>
                        ))}
                      </View>

                      {/* Status */}
                      <View style={{ flex: 0.8 }}>
                        <View style={styles.statusBadgeActive}>
                          <View style={styles.statusDotActive} />
                          <Text style={styles.statusBadgeTextActive}>{plan.status}</Text>
                        </View>
                      </View>

                      {/* Clients Count */}
                      <Text style={[styles.tdTextBold, { flex: 0.7 }]}>{plan.clients}</Text>

                      {/* Actions: View & Edit */}
                      <View style={[styles.actionButtonsCol, { flex: 1.0 }]}>
                        <TouchableOpacity
                          style={styles.actionBtnView}
                          onPress={() => {
                            setSelectedPlan(plan);
                            setShowEditPlanModal(true);
                          }}
                        >
                          <Text style={styles.actionBtnViewText}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                /* GRID CARDS VIEW */
                <View style={styles.plansGrid}>
                  {filteredPlans.map((plan) => (
                    <View key={plan.id} style={styles.planCardItem}>
                      <View style={styles.planCardHeader}>
                        <View style={[styles.planIconCircleLarge, { backgroundColor: plan.bgColor }]}>
                          <MaterialCommunityIcons name="card-bulleted" size={24} color={plan.color} />
                        </View>
                        {plan.badge && (
                          <View style={styles.popularBadge}>
                            <Text style={styles.popularBadgeText}>{plan.badge}</Text>
                          </View>
                        )}
                      </View>

                      <Text style={styles.planCardTitle}>{plan.name}</Text>
                      <Text style={styles.planCardPrice}>
                        {plan.price}
                        <Text style={styles.planCardBilling}> /month</Text>
                      </Text>
                      <Text style={styles.planCardDesc}>{plan.desc}</Text>

                      <View style={styles.planCardDivider} />

                      <Text style={styles.planCardFeaturesLabel}>Included Features:</Text>
                      <View style={styles.planCardFeatureList}>
                        {plan.features.map((f, i) => (
                          <View key={i} style={styles.planCardFeatureRow}>
                            <Feather name="check" size={14} color="#10B981" style={{ marginRight: 8 }} />
                            <Text style={styles.planCardFeatureText}>{f}</Text>
                          </View>
                        ))}
                      </View>

                      <View style={{ flex: 1 }} />

                      <View style={styles.planCardFooterRow}>
                        <Text style={styles.planCardClientsActive}>{plan.clients} Active Clients</Text>
                        <TouchableOpacity
                          style={styles.planCardEditBtn}
                          onPress={() => {
                            setSelectedPlan(plan);
                            setShowEditPlanModal(true);
                          }}
                        >
                          <Text style={styles.planCardEditBtnText}>Edit Plan</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* ========================================================= */}
          {/* 4. MASTER SETTINGS VIEW (PDF Pages 15, 16, 17)             */}
          {/* ========================================================= */}
          {activeNav === 'Master Settings' && (
            <View style={styles.sectionContainer}>
              {/* Blue Platform Info Card (from PDF Page 15 top) */}
              <View style={styles.masterSettingsInfoBanner}>
                <MaterialCommunityIcons name="information" size={22} color="#0056FF" style={{ marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.masterSettingsInfoTitle}>Master Settings</Text>
                  <Text style={styles.masterSettingsInfoDesc}>
                    Centralized platform configuration across all modules. These settings help maintain consistent
                    management, RBAC permissions, and multi-tenant operational limits.
                  </Text>
                </View>
              </View>

              {/* Master Settings 5 Category Cards (from PDF Page 15 top) */}
              <View style={styles.settingsCategoryGrid}>
                {[
                  {
                    id: 'General Settings',
                    title: 'General Settings',
                    desc: 'Configure basic platform information, timezone, language and general preferences.',
                    icon: 'tune-vertical',
                    color: '#0056FF',
                  },
                  {
                    id: 'Role Management',
                    title: 'Role Management',
                    desc: 'Manage user roles and permissions. Add, edit, or control platform access across portals.',
                    icon: 'shield-account',
                    color: '#10B981',
                  },
                  {
                    id: 'Master Data',
                    title: 'Master Data',
                    desc: 'Manage common master data such as client status, subscription status and reference values.',
                    icon: 'database-settings',
                    color: '#7C3AED',
                  },
                  {
                    id: 'System Configuration',
                    title: 'System Configuration',
                    desc: 'Configure application-level settings such as session timeout, page size, and maintenance mode.',
                    icon: 'server',
                    color: '#0284C7',
                  },
                  {
                    id: 'Appearance & Branding',
                    title: 'Appearance & Branding',
                    desc: 'Customize the look and feel of the platform including logo, theme, color scheme and brand info.',
                    icon: 'palette',
                    color: '#F59E0B',
                  },
                ].map((cat) => {
                  const isSelected = settingsTab === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[styles.categoryNavCard, isSelected && styles.categoryNavCardSelected]}
                      onPress={() => setSettingsTab(cat.id)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.categoryIconCircle, { backgroundColor: cat.color + '15' }]}>
                        <MaterialCommunityIcons name={cat.icon} size={22} color={cat.color} />
                      </View>
                      <Text style={[styles.categoryNavTitle, isSelected && { color: '#0056FF' }]}>
                        {cat.title}
                      </Text>
                      <Text style={styles.categoryNavDesc}>{cat.desc}</Text>
                      <View style={styles.categoryNavArrow}>
                        <Feather name="arrow-right" size={14} color={isSelected ? '#0056FF' : '#94A3B8'} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* 4.1 GENERAL SETTINGS SCREEN (PDF Page 15 bottom) */}
              {settingsTab === 'General Settings' && (
                <View style={styles.settingsSubScreenCard}>
                  <View style={styles.settingsSubHeader}>
                    <Text style={styles.settingsSubTitle}>General Settings</Text>
                    <Text style={styles.settingsSubDesc}>Configure basic platform information and general preferences.</Text>
                  </View>

                  <View style={[styles.generalSettingsGrid, isMobile && styles.generalSettingsGridMobile]}>
                    {/* Left Col: Platform Information Form */}
                    <View style={styles.generalLeftCol}>
                      <Text style={styles.subSectionTitle}>Platform Information</Text>

                      <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Platform Name *</Text>
                        <TextInput
                          style={styles.textInputRegular}
                          value={platformName}
                          onChangeText={setPlatformName}
                        />
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Platform Description</Text>
                        <TextInput
                          style={styles.textInputRegular}
                          value={platformDesc}
                          onChangeText={setPlatformDesc}
                        />
                      </View>

                      <View style={styles.formRowTwo}>
                        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                          <Text style={styles.formLabel}>Platform URL</Text>
                          <TextInput
                            style={styles.textInputRegular}
                            value={platformUrl}
                            onChangeText={setPlatformUrl}
                          />
                        </View>
                        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                          <Text style={styles.formLabel}>Support Email *</Text>
                          <TextInput
                            style={styles.textInputRegular}
                            value={supportEmail}
                            onChangeText={setSupportEmail}
                          />
                        </View>
                      </View>

                      <View style={styles.formRowTwo}>
                        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                          <Text style={styles.formLabel}>Default Language</Text>
                          <TextInput
                            style={styles.textInputRegular}
                            value={defaultLang}
                            onChangeText={setDefaultLang}
                          />
                        </View>
                        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                          <Text style={styles.formLabel}>Time Zone</Text>
                          <TextInput
                            style={styles.textInputRegular}
                            value={timeZone}
                            onChangeText={setTimeZone}
                          />
                        </View>
                      </View>

                      <View style={styles.formRowTwo}>
                        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                          <Text style={styles.formLabel}>Date Format</Text>
                          <TextInput
                            style={styles.textInputRegular}
                            value={dateFormat}
                            onChangeText={setDateFormat}
                          />
                        </View>
                        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                          <Text style={styles.formLabel}>Time Format</Text>
                          <TextInput
                            style={styles.textInputRegular}
                            value={timeFormat}
                            onChangeText={setTimeFormat}
                          />
                        </View>
                      </View>
                    </View>

                    {/* Right Col: Logos & Preferences */}
                    <View style={styles.generalRightCol}>
                      {/* Logo Uploader */}
                      <View style={styles.logoCardBox}>
                        <Text style={styles.subSectionTitle}>Platform Logo</Text>
                        <Text style={styles.logoHintText}>Recommended size: 200 x 50 px (PNG, SVG)</Text>

                        <View style={styles.logoPreviewBox}>
                          <MaterialCommunityIcons name="hexagon-multiple" size={28} color="#0056FF" />
                          <View style={{ marginLeft: 8 }}>
                            <Text style={styles.logoPreviewTitle}>PLATINUM SOFTWARE</Text>
                            <Text style={styles.logoPreviewSub}>AI Chatbot Platform</Text>
                          </View>
                        </View>

                        <TouchableOpacity style={styles.uploadOutlineBtn}>
                          <Feather name="upload" size={14} color="#0056FF" style={{ marginRight: 6 }} />
                          <Text style={styles.uploadOutlineBtnText}>Change Logo</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Favicon Uploader */}
                      <View style={styles.logoCardBox}>
                        <Text style={styles.subSectionTitle}>Favicon</Text>
                        <Text style={styles.logoHintText}>Recommended size: 32 x 32 px (PNG, ICO)</Text>

                        <View style={styles.faviconPreviewBox}>
                          <MaterialCommunityIcons name="hexagon-multiple" size={22} color="#0056FF" />
                        </View>

                        <TouchableOpacity style={styles.uploadOutlineBtn}>
                          <Feather name="upload" size={14} color="#0056FF" style={{ marginRight: 6 }} />
                          <Text style={styles.uploadOutlineBtnText}>Change Favicon</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Additional Preferences Toggles (PDF Page 15) */}
                  <View style={styles.preferencesSection}>
                    <Text style={styles.subSectionTitle}>Additional Preferences</Text>

                    <PreferenceToggleRow
                      title="Show platform name in browser title"
                      desc="Appends Platinum Software to browser tab titles"
                      value={showNameInTitle}
                      onToggle={() => setShowNameInTitle(!showNameInTitle)}
                    />
                    <PreferenceToggleRow
                      title="Show live date and time in top header"
                      desc="Displays live synchronized enterprise timestamp"
                      value={showLiveDateTime}
                      onToggle={() => setShowLiveDateTime(!showLiveDateTime)}
                    />
                    <PreferenceToggleRow
                      title="Enable help & support link"
                      desc="Shows customer support link in left sidebar and footer"
                      value={enableSupportLink}
                      onToggle={() => setEnableSupportLink(!enableSupportLink)}
                    />
                  </View>

                  {/* Actions Footer */}
                  <View style={styles.settingsFooterActions}>
                    <TouchableOpacity
                      style={styles.resetBtn}
                      onPress={() => {
                        setPlatformName('Platinum Software');
                        setSupportEmail('support@platinumsoftware.com');
                      }}
                    >
                      <Text style={styles.resetBtnText}>Reset to Default</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveChangesBtn} onPress={handleSaveSettings}>
                      <Text style={styles.saveChangesBtnText}>Save Changes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* 4.2 ROLE MANAGEMENT SCREEN (PDF Page 16 top & Page 17) */}
              {settingsTab === 'Role Management' && (
                <View style={styles.settingsSubScreenCard}>
                  <View style={styles.roleHeaderBar}>
                    <View>
                      <Text style={styles.settingsSubTitle}>Role Management</Text>
                      <Text style={styles.settingsSubDesc}>
                        Manage user roles and permissions. Add, edit, activate or deactivate roles to control access.
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.topActionBtn}
                      onPress={() => setShowAddRoleModal(true)}
                    >
                      <Feather name="plus" size={15} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.topActionBtnText}>Add Role</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Roles Table */}
                  <View style={styles.fullTableCard}>
                    <View style={styles.tableHeaderRow}>
                      <Text style={[styles.thText, { width: 32 }]}>#</Text>
                      <Text style={[styles.thText, { flex: 1.5 }]}>Role Name</Text>
                      <Text style={[styles.thText, { flex: 3.0 }]}>Description</Text>
                      <Text style={[styles.thText, { flex: 1.0 }]}>Status</Text>
                      <Text style={[styles.thText, { flex: 1.0, textAlign: 'right' }]}>Actions</Text>
                    </View>

                    {roles.map((r, i) => (
                      <View key={r.id} style={styles.tableBodyRow}>
                        <Text style={[styles.tdTextMuted, { width: 32 }]}>{i + 1}</Text>
                        <View style={{ flex: 1.5 }}>
                          <Text style={styles.roleNameText}>{r.name}</Text>
                          <Text style={styles.rolePermissionsCount}>
                            {r.permissions.length} module permissions
                          </Text>
                        </View>
                        <Text style={[styles.tdText, { flex: 3.0 }]}>{r.desc}</Text>
                        <View style={{ flex: 1.0 }}>
                          <View style={styles.statusBadgeActive}>
                            <View style={styles.statusDotActive} />
                            <Text style={styles.statusBadgeTextActive}>{r.status}</Text>
                          </View>
                        </View>
                        <View style={[styles.actionButtonsCol, { flex: 1.0 }]}>
                          <TouchableOpacity style={styles.actionBtnEdit}>
                            <Text style={styles.actionBtnEditText}>Edit</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* 4.3 MASTER DATA SCREEN */}
              {settingsTab === 'Master Data' && (
                <View style={styles.settingsSubScreenCard}>
                  <Text style={styles.settingsSubTitle}>Platform Master Data</Text>
                  <Text style={styles.settingsSubDesc}>
                    Maintain centralized common master lists used across client and admin modules.
                  </Text>

                  <View style={styles.masterDataGrid}>
                    <MasterDataCategory title="Client Industries" count="10 items" desc="IT Services, Healthcare, Automotive, Retail..." />
                    <MasterDataCategory title="Subscription Statuses" count="4 items" desc="Active, Expiring Soon, Expired, Suspended..." />
                    <MasterDataCategory title="Supported Currencies" count="3 items" desc="INR (₹), USD ($), EUR (€)..." />
                    <MasterDataCategory title="Document Ingestion Types" count="5 items" desc="PDF, DOCX, XLSX, TXT, CSV..." />
                  </View>
                </View>
              )}

              {/* 4.4 SYSTEM CONFIGURATION SCREEN (PDF Page 16 bottom) */}
              {settingsTab === 'System Configuration' && (
                <View style={styles.settingsSubScreenCard}>
                  <View style={styles.roleHeaderBar}>
                    <View>
                      <Text style={styles.settingsSubTitle}>System Configuration</Text>
                      <Text style={styles.settingsSubDesc}>
                        Manage platform-level configurable parameters used across application runtimes.
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.topActionBtn}>
                      <Feather name="plus" size={15} color="#FFFFFF" style={{ marginRight: 6 }} />
                      <Text style={styles.topActionBtnText}>Add Configuration</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.fullTableCard}>
                    <View style={styles.tableHeaderRow}>
                      <Text style={[styles.thText, { flex: 2.0 }]}>Configuration Name</Text>
                      <Text style={[styles.thText, { flex: 2.5 }]}>Description</Text>
                      <Text style={[styles.thText, { flex: 1.2 }]}>Value</Text>
                      <Text style={[styles.thText, { flex: 0.9 }]}>Status</Text>
                    </View>

                    {[
                      { name: 'Session Timeout', desc: 'Auto logout after period of inactivity', val: '60 Minutes', status: 'Active' },
                      { name: 'Default Page Size', desc: 'Pagination record limit across tables', val: '10 records', status: 'Active' },
                      { name: 'Max Upload Limit', desc: 'Maximum allowable file size per upload', val: '50 MB', status: 'Active' },
                      { name: 'API Rate Limit', desc: 'Client endpoint request throttle quota', val: '100 req/min', status: 'Active' },
                      { name: 'Maintenance Mode', desc: 'Temporary platform maintenance switch', val: 'Disabled', status: 'Inactive' },
                    ].map((cfg, idx) => (
                      <View key={idx} style={styles.tableBodyRow}>
                        <Text style={[styles.clientNameText, { flex: 2.0 }]}>{cfg.name}</Text>
                        <Text style={[styles.tdTextMuted, { flex: 2.5 }]}>{cfg.desc}</Text>
                        <Text style={[styles.tdTextBold, { flex: 1.2 }]}>{cfg.val}</Text>
                        <View style={{ flex: 0.9 }}>
                          <View style={cfg.status === 'Active' ? styles.statusBadgeActive : styles.statusBadgeInactive}>
                            <View style={cfg.status === 'Active' ? styles.statusDotActive : styles.statusDotInactive} />
                            <Text style={cfg.status === 'Active' ? styles.statusBadgeTextActive : styles.statusBadgeTextInactive}>
                              {cfg.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* 4.5 APPEARANCE & BRANDING SCREEN (PDF Page 17 top) */}
              {settingsTab === 'Appearance & Branding' && (
                <View style={styles.settingsSubScreenCard}>
                  <View style={styles.settingsSubHeader}>
                    <Text style={styles.settingsSubTitle}>Appearance & Branding</Text>
                    <Text style={styles.settingsSubDesc}>
                      Customize the visual branding of the platform including logo, colors, and live UI preview.
                    </Text>
                  </View>

                  <View style={[styles.generalSettingsGrid, isMobile && styles.generalSettingsGridMobile]}>
                    {/* Controls */}
                    <View style={styles.generalLeftCol}>
                      <Text style={styles.subSectionTitle}>Brand Theme & Colors</Text>

                      <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Primary Brand Color (Hex)</Text>
                        <View style={styles.colorPickerInputRow}>
                          <View style={[styles.colorSwatchBox, { backgroundColor: primaryColor }]} />
                          <TextInput
                            style={[styles.textInputRegular, { flex: 1 }]}
                            value={primaryColor}
                            onChangeText={setPrimaryColor}
                          />
                        </View>
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Platform Tagline</Text>
                        <TextInput
                          style={styles.textInputRegular}
                          value={tagline}
                          onChangeText={setTagline}
                        />
                      </View>

                      <View style={styles.formGroup}>
                        <Text style={styles.formLabel}>Footer Copyright Text</Text>
                        <TextInput
                          style={styles.textInputRegular}
                          value={footerText}
                          onChangeText={setFooterText}
                        />
                      </View>

                      <TouchableOpacity style={styles.saveChangesBtn} onPress={handleSaveSettings}>
                        <Text style={styles.saveChangesBtnText}>Apply Brand Styling</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Live Preview (from PDF Page 17 top right) */}
                    <View style={styles.generalRightCol}>
                      <Text style={styles.subSectionTitle}>Live Portal Preview</Text>
                      <View style={styles.livePreviewMiniMock}>
                        <View style={[styles.miniMockHeader, { backgroundColor: primaryColor }]}>
                          <Text style={styles.miniMockHeaderText}>PLATINUM SOFTWARE</Text>
                          <View style={styles.miniMockAvatar} />
                        </View>
                        <View style={styles.miniMockBody}>
                          <View style={styles.miniMockSidebar}>
                            <View style={styles.miniMockBar} />
                            <View style={styles.miniMockBar} />
                            <View style={styles.miniMockBar} />
                          </View>
                          <View style={styles.miniMockContent}>
                            <View style={styles.miniMockCardRow}>
                              <View style={[styles.miniMockCard, { borderColor: primaryColor }]} />
                              <View style={styles.miniMockCard} />
                            </View>
                            <View style={styles.miniMockTable} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* ========================================================= */}
          {/* 5. SUBSCRIPTIONS VIEW                                      */}
          {/* ========================================================= */}
          {activeNav === 'Subscriptions' && (
            <View style={styles.sectionContainer}>
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard icon="receipt" title="Total Subscriptions" value="48" trend="+12%" sub="Total created" color="#0056FF" bgColor="#EFF6FF" />
                <KPICard icon="check-circle" title="Active Subscriptions" value="42" trend="87.5%" sub="Currently valid" color="#10B981" bgColor="#ECFDF5" />
                <KPICard icon="alert-circle" title="Expired" value="3" trend="6.2%" sub="Needs renewal" color="#EF4444" bgColor="#FEF2F2" />
                <KPICard icon="clock-alert-outline" title="Expiring Soon" value="5" trend="Alert" sub="In next 30 days" color="#F59E0B" bgColor="#FFFBEB" />
              </View>

              <View style={styles.fullTableCard}>
                <View style={styles.tableHeaderRow}>
                  <Text style={[styles.thText, { flex: 1.0 }]}>Subscription ID</Text>
                  <Text style={[styles.thText, { flex: 1.8 }]}>Client Name</Text>
                  <Text style={[styles.thText, { flex: 1.0 }]}>Plan</Text>
                  <Text style={[styles.thText, { flex: 1.2 }]}>Start Date</Text>
                  <Text style={[styles.thText, { flex: 1.2 }]}>End Date</Text>
                  <Text style={[styles.thText, { flex: 1.0 }]}>Status</Text>
                </View>

                {clients.map((c, i) => (
                  <View key={c.id} style={styles.tableBodyRow}>
                    <Text style={[styles.tdTextBold, { flex: 1.0 }]}>SUB-{100 + i}</Text>
                    <Text style={[styles.clientNameText, { flex: 1.8 }]}>{c.name}</Text>
                    <Text style={[styles.tdText, { flex: 1.0, color: getPlanColor(c.plan) }]}>{c.plan}</Text>
                    <Text style={[styles.tdTextMuted, { flex: 1.2 }]}>{c.startDate}</Text>
                    <Text style={[styles.tdTextMuted, { flex: 1.2 }]}>{c.endDate}</Text>
                    <View style={{ flex: 1.0 }}>
                      <View style={styles.statusBadgeActive}>
                        <View style={styles.statusDotActive} />
                        <Text style={styles.statusBadgeTextActive}>Active</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* 6. LLM DATA IMPORT VIEW (PDF Pages 11, 12)                 */}
          {/* ========================================================= */}
          {activeNav === 'LLM Data Import' && (
            <View style={styles.sectionContainer}>
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard icon="cloud-sync" title="Total Imports" value="128" trend="+12%" sub="+14 this month" color="#0056FF" bgColor="#EFF6FF" />
                <KPICard icon="check-all" title="Completed" value="116" trend="90.6%" sub="90.6% of total" color="#10B981" bgColor="#ECFDF5" />
                <KPICard icon="progress-clock" title="Processing" value="8" trend="6.3%" sub="6.3% of total" color="#F59E0B" bgColor="#FFFBEB" />
                <KPICard icon="alert-circle" title="Failed" value="4" trend="3.1%" sub="3.1% of total" color="#EF4444" bgColor="#FEF2F2" />
              </View>

              <View style={styles.fullTableCard}>
                <View style={styles.tableHeaderRow}>
                  <Text style={[styles.thText, { flex: 1.2 }]}>Import ID</Text>
                  <Text style={[styles.thText, { flex: 1.8 }]}>Client</Text>
                  <Text style={[styles.thText, { flex: 1.2 }]}>Data Source</Text>
                  <Text style={[styles.thText, { flex: 0.8 }]}>Files</Text>
                  <Text style={[styles.thText, { flex: 1.4 }]}>Imported On</Text>
                  <Text style={[styles.thText, { flex: 1.0 }]}>Status</Text>
                </View>

                {[
                  { id: 'IMP-20250908-001', client: 'TechNova Solutions', src: 'Client Upload', files: 5, date: '08 Sep 2025, 10:15 AM', status: 'Completed' },
                  { id: 'IMP-20250906-002', client: 'AutoDrive Ltd', src: 'API Import', files: 3, date: '06 Sep 2025, 04:30 PM', status: 'Completed' },
                  { id: 'IMP-20250907-015', client: 'HealthPlus', src: 'Client Upload', files: 8, date: '07 Sep 2025, 11:20 AM', status: 'Completed' },
                  { id: 'IMP-20250905-011', client: 'EduSmart Learning', src: 'Client Upload', files: 12, date: '05 Sep 2025, 02:10 PM', status: 'Processing' },
                ].map((item) => (
                  <View key={item.id} style={styles.tableBodyRow}>
                    <Text style={[styles.tdTextBold, { flex: 1.2 }]}>{item.id}</Text>
                    <Text style={[styles.clientNameText, { flex: 1.8 }]}>{item.client}</Text>
                    <Text style={[styles.tdText, { flex: 1.2 }]}>{item.src}</Text>
                    <Text style={[styles.tdText, { flex: 0.8 }]}>{item.files}</Text>
                    <Text style={[styles.tdTextMuted, { flex: 1.4 }]}>{item.date}</Text>
                    <View style={{ flex: 1.0 }}>
                      <View style={item.status === 'Completed' ? styles.statusBadgeActive : styles.statusBadgeWarning}>
                        <Text style={item.status === 'Completed' ? styles.statusBadgeTextActive : styles.statusBadgeTextWarning}>
                          {item.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* ========================================================= */}
          {/* 7. REPORTS VIEW (PDF Pages 13, 14)                         */}
          {/* ========================================================= */}
          {activeNav === 'Reports' && (
            <View style={styles.sectionContainer}>
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard icon="chat-question" title="Total Questions" value="1,24,532" trend="+18%" sub="Across all clients" color="#0056FF" bgColor="#EFF6FF" />
                <KPICard icon="domain" title="Active Clients" value="48" trend="Total" sub="48 of 52 clients" color="#10B981" bgColor="#ECFDF5" />
                <KPICard icon="account-multiple" title="Total Users" value="2,356" trend="+12%" sub="Active employees" color="#7C3AED" bgColor="#F5F3FF" />
                <KPICard icon="timer-outline" title="Avg Response Time" value="2.3 sec" trend="-28%" sub="Sub-second retrieval" color="#0284C7" bgColor="#F0F9FF" />
                <KPICard icon="cash-multiple" title="Subscription Revenue" value="₹12,49,000" trend="+15%" sub="This period" color="#10B981" bgColor="#ECFDF5" />
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* ========================================================= */}
      {/* MODAL 1: ADD CLIENT MODAL (Exact Layout from PDF Page 5)  */}
      {/* ========================================================= */}
      <Modal visible={showAddClientModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCardLarge, isMobile && styles.modalCardMobile]}>
            {/* Header */}
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalMainTitle}>Add Client</Text>
                <Text style={styles.modalSubTitle}>Create a new client organization in the system.</Text>
              </View>
              <TouchableOpacity onPress={() => setShowAddClientModal(false)}>
                <Feather name="x" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 520 }} contentContainerStyle={{ padding: 20 }}>
              {/* Section 1: Company Information */}
              <Text style={styles.formSectionHeader}>Company Information</Text>
              <View style={styles.formRowTwo}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.formLabel}>Company Name *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="Enter company name"
                    value={newClientForm.name}
                    onChangeText={(v) => setNewClientForm({ ...newClientForm, name: v })}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>Industry *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="e.g. IT Services, Healthcare"
                    value={newClientForm.industry}
                    onChangeText={(v) => setNewClientForm({ ...newClientForm, industry: v })}
                  />
                </View>
              </View>

              <View style={styles.formRowTwo}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.formLabel}>Company Size</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="e.g. 51-200 employees"
                    value={newClientForm.companySize}
                    onChangeText={(v) => setNewClientForm({ ...newClientForm, companySize: v })}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>Website</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="https://www.example.com"
                    value={newClientForm.website}
                    onChangeText={(v) => setNewClientForm({ ...newClientForm, website: v })}
                  />
                </View>
              </View>

              {/* Section 2: Contact Information */}
              <Text style={[styles.formSectionHeader, { marginTop: 16 }]}>Contact Information</Text>
              <View style={styles.formRowTwo}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.formLabel}>Contact Person *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="Enter contact person name"
                    value={newClientForm.contactPerson}
                    onChangeText={(v) => setNewClientForm({ ...newClientForm, contactPerson: v })}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>Designation</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="e.g. Operations Manager"
                    value={newClientForm.designation}
                    onChangeText={(v) => setNewClientForm({ ...newClientForm, designation: v })}
                  />
                </View>
              </View>

              <View style={styles.formRowTwo}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.formLabel}>Email Address *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="contact@company.com"
                    value={newClientForm.email}
                    onChangeText={(v) => setNewClientForm({ ...newClientForm, email: v })}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>Phone Number *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="+91 98765 43210"
                    value={newClientForm.phone}
                    onChangeText={(v) => setNewClientForm({ ...newClientForm, phone: v })}
                  />
                </View>
              </View>

              {/* Section 3: Subscription Details */}
              <Text style={[styles.formSectionHeader, { marginTop: 16 }]}>Subscription Details</Text>
              <View style={styles.formRowTwo}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.formLabel}>Assigned Plan *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="Gold, Silver, Platinum, Enterprise"
                    value={newClientForm.plan}
                    onChangeText={(v) => setNewClientForm({ ...newClientForm, plan: v })}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>Status *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="Active / Inactive"
                    value={newClientForm.status}
                    onChangeText={(v) => setNewClientForm({ ...newClientForm, status: v })}
                  />
                </View>
              </View>

              {/* Section 4: Notes */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Additional Notes</Text>
                <TextInput
                  style={[styles.textInputRegular, { height: 70 }]}
                  multiline
                  placeholder="Enter any administrative notes about this client..."
                  value={newClientForm.notes}
                  onChangeText={(v) => setNewClientForm({ ...newClientForm, notes: v })}
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooterRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddClientModal(false)}>
                <Text style={styles.modalCancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSubmitBtn} onPress={handleCreateClient}>
                <Text style={styles.modalSubmitBtnText}>Create Client</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ========================================================= */}
      {/* MODAL 2: ADD PLAN MODAL (Exact Layout from PDF Page 7)    */}
      {/* ========================================================= */}
      <Modal visible={showAddPlanModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCardLarge, isMobile && styles.modalCardMobile]}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalMainTitle}>Add Plan</Text>
                <Text style={styles.modalSubTitle}>Create a new subscription plan tier for your clients.</Text>
              </View>
              <TouchableOpacity onPress={() => setShowAddPlanModal(false)}>
                <Feather name="x" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 520 }} contentContainerStyle={{ padding: 20 }}>
              <Text style={styles.formSectionHeader}>Basic Information</Text>
              <View style={styles.formRowTwo}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.formLabel}>Plan Name *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="e.g. Diamond Enterprise"
                    value={newPlanForm.name}
                    onChangeText={(v) => setNewPlanForm({ ...newPlanForm, name: v })}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>Plan Type *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="e.g. Standard Tier, Enterprise Tier"
                    value={newPlanForm.planType}
                    onChangeText={(v) => setNewPlanForm({ ...newPlanForm, planType: v })}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Short Description</Text>
                <TextInput
                  style={styles.textInputRegular}
                  placeholder="Enter a short summary of this plan"
                  value={newPlanForm.shortDesc}
                  onChangeText={(v) => setNewPlanForm({ ...newPlanForm, shortDesc: v })}
                />
              </View>

              <Text style={[styles.formSectionHeader, { marginTop: 14 }]}>Pricing & Validity</Text>
              <View style={styles.formRowTwo}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.formLabel}>Price (Monthly) *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="e.g. ₹29,999"
                    value={newPlanForm.price}
                    onChangeText={(v) => setNewPlanForm({ ...newPlanForm, price: v })}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>Billing Cycle *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="Monthly / Yearly"
                    value={newPlanForm.billingCycle}
                    onChangeText={(v) => setNewPlanForm({ ...newPlanForm, billingCycle: v })}
                  />
                </View>
              </View>

              <Text style={[styles.formSectionHeader, { marginTop: 14 }]}>Features & Limits</Text>
              <View style={styles.formRowTwo}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.formLabel}>Max Queries per Month *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="10000"
                    value={newPlanForm.maxQueries}
                    onChangeText={(v) => setNewPlanForm({ ...newPlanForm, maxQueries: v })}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.formLabel}>Max Users *</Text>
                  <TextInput
                    style={styles.textInputRegular}
                    placeholder="25"
                    value={newPlanForm.maxUsers}
                    onChangeText={(v) => setNewPlanForm({ ...newPlanForm, maxUsers: v })}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Key Features (one per line) *</Text>
                <TextInput
                  style={[styles.textInputRegular, { height: 90 }]}
                  multiline
                  placeholder="Enter features (e.g. Up to 10,000 queries&#10;24/7 Priority Support&#10;Advanced Vector Embeddings)"
                  value={newPlanForm.keyFeatures}
                  onChangeText={(v) => setNewPlanForm({ ...newPlanForm, keyFeatures: v })}
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooterRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddPlanModal(false)}>
                <Text style={styles.modalCancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSubmitBtn} onPress={handleCreatePlan}>
                <Text style={styles.modalSubmitBtnText}>Create Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ========================================================= */}
      {/* MODAL 3: ADD ROLE MODAL (Exact Layout from PDF Page 16)   */}
      {/* ========================================================= */}
      <Modal visible={showAddRoleModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCardRegular, isMobile && styles.modalCardMobile]}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalMainTitle}>Add New Role</Text>
                <Text style={styles.modalSubTitle}>Define a new RBAC role and assign permissions.</Text>
              </View>
              <TouchableOpacity onPress={() => setShowAddRoleModal(false)}>
                <Feather name="x" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 20 }}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Role Name *</Text>
                <TextInput
                  style={styles.textInputRegular}
                  placeholder="e.g. Compliance Auditor"
                  value={newRoleForm.name}
                  onChangeText={(v) => setNewRoleForm({ ...newRoleForm, name: v })}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description *</Text>
                <TextInput
                  style={[styles.textInputRegular, { height: 70 }]}
                  multiline
                  placeholder="Enter a brief description of this role's scope..."
                  value={newRoleForm.desc}
                  onChangeText={(v) => setNewRoleForm({ ...newRoleForm, desc: v })}
                />
              </View>

              <Text style={styles.formLabel}>Permissions *</Text>
              <View style={styles.permissionsCheckboxGrid}>
                {['Dashboard', 'Clients', 'Plans', 'Subscriptions', 'LLM Data Import', 'Reports', 'Master Settings'].map((mod) => {
                  const isChecked = newRoleForm.permissions.includes(mod);
                  return (
                    <TouchableOpacity
                      key={mod}
                      style={styles.permissionCheckItem}
                      onPress={() => {
                        if (isChecked) {
                          setNewRoleForm({
                            ...newRoleForm,
                            permissions: newRoleForm.permissions.filter((p) => p !== mod),
                          });
                        } else {
                          setNewRoleForm({
                            ...newRoleForm,
                            permissions: [...newRoleForm.permissions, mod],
                          });
                        }
                      }}
                    >
                      <MaterialCommunityIcons
                        name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                        size={18}
                        color={isChecked ? '#0056FF' : '#94A3B8'}
                        style={{ marginRight: 8 }}
                      />
                      <Text style={styles.permissionCheckLabel}>{mod}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.modalFooterRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddRoleModal(false)}>
                <Text style={styles.modalCancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSubmitBtn} onPress={handleCreateRole}>
                <Text style={styles.modalSubmitBtnText}>Save Role</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ========================================================= */}
      {/* MODAL 4: VIEW CLIENT MODAL                                */}
      {/* ========================================================= */}
      {selectedClient && (
        <Modal visible={showViewClientModal} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalCardRegular, isMobile && styles.modalCardMobile]}>
              <View style={styles.modalHeaderRow}>
                <View>
                  <Text style={styles.modalMainTitle}>{selectedClient.name}</Text>
                  <Text style={styles.modalSubTitle}>{selectedClient.industry} • Plan: {selectedClient.plan}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowViewClientModal(false)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>

              <View style={{ padding: 20, gap: 12 }}>
                <DetailField label="Contact Person" val={`${selectedClient.contactPerson} (${selectedClient.designation})`} />
                <DetailField label="Official Email" val={selectedClient.email} />
                <DetailField label="Phone" val={selectedClient.phone} />
                <DetailField label="Company Size" val={selectedClient.companySize} />
                <DetailField label="Website" val={selectedClient.website} />
                <DetailField label="Subscription Validity" val={`${selectedClient.startDate} → ${selectedClient.endDate} (${selectedClient.daysLeft})`} />
                <DetailField label="Administrative Notes" val={selectedClient.notes} />
              </View>

              <View style={styles.modalFooterRow}>
                <TouchableOpacity
                  style={styles.modalSubmitBtn}
                  onPress={() => setShowViewClientModal(false)}
                >
                  <Text style={styles.modalSubmitBtnText}>Close Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

// SUB-COMPONENTS
function KPICard({ icon, title, value, trend, sub, color, bgColor }) {
  return (
    <View style={styles.kpiCard}>
      <View style={styles.kpiTopRow}>
        <View style={[styles.kpiIconCircle, { backgroundColor: bgColor }]}>
          <MaterialCommunityIcons name={icon} size={20} color={color} />
        </View>
        <View style={styles.kpiTrendPill}>
          <Text style={[styles.kpiTrendText, { color }]}>{trend}</Text>
        </View>
      </View>
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={styles.kpiTitle}>{title}</Text>
      <Text style={styles.kpiSub}>{sub}</Text>
    </View>
  );
}

function DonutLegendItem({ color, label, count }) {
  return (
    <View style={styles.donutLegendRow}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
      <Text style={styles.legendCount}>{count}</Text>
    </View>
  );
}

function TimelineRow({ icon, color, text, time }) {
  return (
    <View style={styles.timelineItemRow}>
      <View style={[styles.timelineIconBox, { backgroundColor: color + '15' }]}>
        <MaterialCommunityIcons name={icon} size={15} color={color} />
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineText}>{text}</Text>
        <Text style={styles.timelineTime}>{time}</Text>
      </View>
    </View>
  );
}

function PreferenceToggleRow({ title, desc, value, onToggle }) {
  return (
    <View style={styles.prefToggleRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.prefTitle}>{title}</Text>
        <Text style={styles.prefDesc}>{desc}</Text>
      </View>
      <TouchableOpacity
        style={[styles.toggleSwitch, value ? styles.toggleSwitchActive : styles.toggleSwitchInactive]}
        onPress={onToggle}
      >
        <View style={[styles.toggleKnob, value ? styles.toggleKnobActive : styles.toggleKnobInactive]} />
      </TouchableOpacity>
    </View>
  );
}

function MasterDataCategory({ title, count, desc }) {
  return (
    <View style={styles.masterDataCard}>
      <View style={styles.masterDataTop}>
        <Text style={styles.masterDataTitle}>{title}</Text>
        <View style={styles.masterDataPill}>
          <Text style={styles.masterDataPillText}>{count}</Text>
        </View>
      </View>
      <Text style={styles.masterDataDesc}>{desc}</Text>
      <TouchableOpacity style={styles.masterDataEditLink}>
        <Text style={styles.masterDataEditLinkText}>Manage Items →</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailField({ label, val }) {
  return (
    <View style={styles.detailFieldRow}>
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailVal}>{val}</Text>
    </View>
  );
}

function PaneFeature({ icon, title, desc }) {
  return (
    <View style={styles.paneFeatureRow}>
      <View style={styles.paneFeatureIcon}>
        <MaterialCommunityIcons name={icon} size={18} color="#FFFFFF" />
      </View>
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.paneFeatureTitle}>{title}</Text>
        <Text style={styles.paneFeatureDesc}>{desc}</Text>
      </View>
    </View>
  );
}

// UTILITIES FOR STYLING
function getPlanColor(plan) {
  switch (plan) {
    case 'Gold':
      return '#B45309';
    case 'Silver':
      return '#64748B';
    case 'Platinum':
      return '#0056FF';
    case 'Enterprise':
      return '#059669';
    default:
      return '#0F172A';
  }
}

function getPlanBg(plan) {
  switch (plan) {
    case 'Gold':
      return '#FEF3C7';
    case 'Silver':
      return '#F1F5F9';
    case 'Platinum':
      return '#EFF6FF';
    case 'Enterprise':
      return '#ECFDF5';
    default:
      return '#F8FAFC';
  }
}

const styles = StyleSheet.create({
  // LOGIN SCREEN STYLES
  loginContainer: {
    flex: 1,
    backgroundColor: '#FAFCFF',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: 24,
  },
  topBackNav: {
    position: 'absolute',
    top: 24,
    left: 24,
    zIndex: 10,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  backBtnText: {
    color: '#0056FF',
    fontSize: 13.5,
    fontWeight: '700',
  },
  loginCardWrapper: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    maxWidth: 960,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 28,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    zIndex: 2,
  },
  loginCardWrapperMobile: {
    flexDirection: 'column',
  },
  loginLeftPane: {
    flex: 1,
    backgroundColor: '#0056FF',
    padding: 40,
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
    letterSpacing: 1,
  },
  paneLogoSub: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
  },
  paneHeroTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    marginVertical: 20,
  },
  paneHeroDesc: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13.5,
    lineHeight: 22,
    marginBottom: 24,
  },
  paneFeaturesList: {
    gap: 16,
    marginBottom: 24,
  },
  paneFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paneFeatureIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paneFeatureTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  paneFeatureDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
  },
  paneFooterText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11.5,
  },
  loginRightPane: {
    flex: 1.2,
    padding: 40,
    justifyContent: 'space-between',
  },
  loginRightHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rightHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 1,
    marginTop: 6,
  },
  rightHeaderSub: {
    fontSize: 11,
    color: '#64748B',
  },
  loginFormBox: {
    width: '100%',
  },
  loginFormHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  loginFormSub: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 14,
  },
  formLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  textInputRegular: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: '#FFFFFF',
    fontSize: 13.5,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  loginOptsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
  },
  rememberText: {
    fontSize: 12.5,
    color: '#475569',
  },
  forgotText: {
    fontSize: 12.5,
    color: '#0056FF',
    fontWeight: '600',
  },
  signInPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0056FF',
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#0056FF',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    cursor: 'pointer',
  },
  signInPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  securityWarningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 10,
    borderRadius: 8,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  securityWarningText: {
    color: '#1E40AF',
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
  portalFooterCopy: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 20,
  },

  // PORTAL SHELL STYLES
  dashContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    minHeight: '100vh',
  },
  dashTopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  dashLogoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashLogoText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  dashLogoSubText: {
    fontSize: 10,
    color: '#64748B',
    marginTop: -2,
  },
  dashSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    width: 340,
  },
  dashSearchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  dashNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dateTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  dateTimeText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  dashNavIconBtn: {
    position: 'relative',
    padding: 6,
    cursor: 'pointer',
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
  },
  adminUserBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adminAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminAvatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  adminName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  adminRole: {
    fontSize: 10,
    color: '#64748B',
  },
  dashExitBtn: {
    padding: 6,
    cursor: 'pointer',
  },
  dashBody: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 230,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
    position: 'relative',
    cursor: 'pointer',
  },
  sidebarItemActive: {
    backgroundColor: '#EFF6FF',
  },
  sidebarItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  sidebarItemTextActive: {
    color: '#0056FF',
    fontWeight: '700',
  },
  sidebarActivePill: {
    position: 'absolute',
    right: 0,
    top: 8,
    bottom: 8,
    width: 3,
    backgroundColor: '#0056FF',
    borderRadius: 2,
  },
  sidebarNeedHelpBox: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  sidebarNeedHelpTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  sidebarNeedHelpSub: {
    fontSize: 11,
    color: '#0056FF',
    marginTop: 2,
  },
  sidebarBackToWeb: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    marginBottom: 10,
    cursor: 'pointer',
  },
  sidebarBackToWebText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0056FF',
  },
  sidebarVersionText: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
  },
  breadcrumbHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  breadcrumbMuted: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  breadcrumbActive: {
    fontSize: 12,
    color: '#0056FF',
    fontWeight: '600',
  },
  screenMainHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  screenMainSub: {
    fontSize: 13.5,
    color: '#64748B',
  },
  topActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0056FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#0056FF',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    cursor: 'pointer',
  },
  topActionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  toastText: {
    fontSize: 13,
    color: '#065F46',
    fontWeight: '600',
  },

  // KPI CARDS
  sectionContainer: {
    width: '100%',
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  kpiRowMobile: {
    flexDirection: 'column',
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  kpiTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiTrendPill: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  kpiTrendText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  kpiValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  kpiTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  kpiSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },

  // CHARTS & GRIDS
  middleGridRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  middleGridRowMobile: {
    flexDirection: 'column',
  },
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },
  gridCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  gridCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  filterDropdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterDropdownPillText: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '600',
  },
  viewAllLinkText: {
    fontSize: 12,
    color: '#0056FF',
    fontWeight: '700',
    cursor: 'pointer',
  },

  // CLIENT GROWTH MOCK CHART
  areaChartContainer: {
    flexDirection: 'row',
    height: 160,
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  chartYAxis: {
    justifyContent: 'space-between',
    height: '100%',
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  axisLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  chartBarsGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    paddingLeft: 10,
  },
  chartBarCol: {
    alignItems: 'center',
    width: 36,
    height: '100%',
    justifyContent: 'flex-end',
  },
  chartBarFill: {
    width: 24,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
  },
  chartBarFillNormal: {
    backgroundColor: '#BFDBFE',
  },
  chartBarFillActive: {
    backgroundColor: '#0056FF',
  },
  chartBarValue: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chartBarMonth: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 6,
  },

  // DONUT MOCK
  donutLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 160,
  },
  donutCenterCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 14,
    borderColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  donutCenterValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  donutCenterLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  donutLegendCol: {
    gap: 8,
  },
  donutLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
    width: 90,
  },
  legendCount: {
    fontSize: 12,
    color: '#64748B',
  },

  // TIMELINE
  timelineList: {
    gap: 12,
  },
  timelineItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineIconBox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  timelineContent: {
    flex: 1,
  },
  timelineText: {
    fontSize: 12.5,
    color: '#1E293B',
    fontWeight: '500',
  },
  timelineTime: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },

  // CTA BANNER (from PDF Page 3)
  bottomCtaBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 6,
    flexWrap: 'wrap',
    gap: 16,
  },
  ctaBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  ctaBannerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaBannerHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  ctaBannerSub: {
    fontSize: 12.5,
    color: '#64748B',
    marginTop: 2,
  },
  ctaBannerBtn: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    cursor: 'pointer',
  },
  ctaBannerBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0056FF',
  },

  // SEARCH & FILTER BAR
  searchFilterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 12,
  },
  searchFilterCardMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  searchBoxInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    flex: 1,
    minWidth: 260,
  },
  innerSearchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  filterDropdownsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 6,
  },
  dropdownLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  resetFilterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    cursor: 'pointer',
  },
  resetFilterBtnText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },

  // TABLES
  fullTableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },
  tableCardTitleBar: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableCardMainTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  tableCardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  thText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  tableBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tdText: {
    fontSize: 13,
    color: '#1E293B',
  },
  tdTextMuted: {
    fontSize: 12.5,
    color: '#64748B',
  },
  tdTextBold: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  clientNameCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  clientMiniAvatar: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientMiniAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  clientNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  clientSubText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  contactNameText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  contactEmailText: {
    fontSize: 11,
    color: '#64748B',
  },
  dateEndText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#1E293B',
  },
  daysLeftSubText: {
    fontSize: 11,
    color: '#64748B',
  },
  daysLeftPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  daysLeftNormal: {
    backgroundColor: '#EFF6FF',
  },
  daysLeftWarning: {
    backgroundColor: '#FEF3C7',
  },
  daysLeftExpired: {
    backgroundColor: '#FEE2E2',
  },
  daysLeftText: {
    fontSize: 11,
    fontWeight: '700',
  },
  planPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  planPillText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  statusBadgeActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 5,
    alignSelf: 'flex-start',
  },
  statusDotActive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusBadgeTextActive: {
    fontSize: 11.5,
    color: '#059669',
    fontWeight: '600',
  },
  statusBadgeInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 5,
    alignSelf: 'flex-start',
  },
  statusDotInactive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  statusBadgeTextInactive: {
    fontSize: 11.5,
    color: '#DC2626',
    fontWeight: '600',
  },
  statusBadgeWarning: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeTextWarning: {
    fontSize: 11.5,
    color: '#B45309',
    fontWeight: '600',
  },
  actionButtonsCol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionBtnView: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    cursor: 'pointer',
  },
  actionBtnViewText: {
    fontSize: 11.5,
    color: '#0056FF',
    fontWeight: '700',
  },
  actionBtnEdit: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    cursor: 'pointer',
  },
  actionBtnEditText: {
    fontSize: 11.5,
    color: '#475569',
    fontWeight: '700',
  },
  tablePaginationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  paginationInfoText: {
    fontSize: 12.5,
    color: '#64748B',
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pageArrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    cursor: 'pointer',
  },
  pageNumberBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
  },
  pageNumberText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  pageNumberActive: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageNumberActiveText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // PLANS TABLE CELLS
  planCellCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planCellName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  popularBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  popularBadgeText: {
    fontSize: 9.5,
    color: '#0056FF',
    fontWeight: '700',
  },
  planPriceText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  featuresBulletList: {
    gap: 2,
  },
  featureBulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletDot: {
    fontSize: 12,
    color: '#0056FF',
    marginRight: 4,
  },
  featureBulletText: {
    fontSize: 11.5,
    color: '#475569',
    lineHeight: 16,
    flex: 1,
  },

  // PLANS GRID CARDS
  viewModeToggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  viewModeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
  },
  viewModeBtnActive: {
    backgroundColor: '#EFF6FF',
  },
  plansGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  planCardItem: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  planIconCircleLarge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planCardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  planCardPrice: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0056FF',
    marginBottom: 8,
  },
  planCardBilling: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  planCardDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 16,
  },
  planCardDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 16,
  },
  planCardFeaturesLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  planCardFeatureList: {
    gap: 8,
    marginBottom: 20,
  },
  planCardFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planCardFeatureText: {
    fontSize: 12.5,
    color: '#334155',
  },
  planCardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  planCardClientsActive: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  planCardEditBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  planCardEditBtnText: {
    fontSize: 12,
    color: '#0056FF',
    fontWeight: '700',
  },

  // MASTER SETTINGS STYLES (PDF Pages 15, 16, 17)
  masterSettingsInfoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  masterSettingsInfoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 2,
  },
  masterSettingsInfoDesc: {
    fontSize: 12.5,
    color: '#1E40AF',
    lineHeight: 18,
  },
  settingsCategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 24,
  },
  categoryNavCard: {
    flexBasis: '18%',
    flexGrow: 1,
    minWidth: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 16,
    cursor: 'pointer',
  },
  categoryNavCardSelected: {
    borderColor: '#0056FF',
    shadowColor: '#0056FF',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  categoryIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryNavTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  categoryNavDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 12,
  },
  categoryNavArrow: {
    alignSelf: 'flex-end',
  },

  // SETTINGS SUB SCREENS
  settingsSubScreenCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },
  settingsSubHeader: {
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingsSubTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  settingsSubDesc: {
    fontSize: 12.5,
    color: '#64748B',
  },
  generalSettingsGrid: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  generalSettingsGridMobile: {
    flexDirection: 'column',
  },
  generalLeftCol: {
    flex: 1.5,
  },
  generalRightCol: {
    flex: 1,
    gap: 16,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  formRowTwo: {
    flexDirection: 'row',
  },
  logoCardBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
  },
  logoHintText: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 12,
  },
  logoPreviewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 12,
  },
  logoPreviewTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  logoPreviewSub: {
    fontSize: 9.5,
    color: '#64748B',
  },
  faviconPreviewBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadOutlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0056FF',
    borderRadius: 8,
    paddingVertical: 7,
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
  },
  uploadOutlineBtnText: {
    fontSize: 12,
    color: '#0056FF',
    fontWeight: '700',
  },
  preferencesSection: {
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginBottom: 24,
  },
  prefToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  prefTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  prefDesc: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  toggleSwitch: {
    width: 42,
    height: 24,
    borderRadius: 12,
    padding: 2,
    cursor: 'pointer',
  },
  toggleSwitchActive: {
    backgroundColor: '#0056FF',
  },
  toggleSwitchInactive: {
    backgroundColor: '#CBD5E1',
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  toggleKnobActive: {
    transform: [{ translateX: 18 }],
  },
  toggleKnobInactive: {
    transform: [{ translateX: 0 }],
  },
  settingsFooterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  resetBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    cursor: 'pointer',
  },
  resetBtnText: {
    fontSize: 12.5,
    color: '#475569',
    fontWeight: '600',
  },
  saveChangesBtn: {
    backgroundColor: '#0056FF',
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 8,
    cursor: 'pointer',
  },
  saveChangesBtnText: {
    fontSize: 12.5,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // ROLE MANAGEMENT STYLES
  roleHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  roleNameText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  rolePermissionsCount: {
    fontSize: 11,
    color: '#0056FF',
    fontWeight: '500',
  },

  // MASTER DATA CARDS
  masterDataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
  },
  masterDataCard: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
  },
  masterDataTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  masterDataTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  masterDataPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  masterDataPillText: {
    fontSize: 11,
    color: '#0056FF',
    fontWeight: '600',
  },
  masterDataDesc: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
  },
  masterDataEditLink: {
    alignSelf: 'flex-start',
  },
  masterDataEditLinkText: {
    fontSize: 12,
    color: '#0056FF',
    fontWeight: '700',
  },

  // APPEARANCE COLOR SWATCH & LIVE MINI MOCK
  colorPickerInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  colorSwatchBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  livePreviewMiniMock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    overflow: 'hidden',
    height: 180,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  miniMockHeader: {
    height: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  miniMockHeaderText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  miniMockAvatar: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  miniMockBody: {
    flex: 1,
    flexDirection: 'row',
  },
  miniMockSidebar: {
    width: 44,
    backgroundColor: '#F8FAFC',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    padding: 6,
    gap: 6,
  },
  miniMockBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  miniMockContent: {
    flex: 1,
    padding: 8,
    gap: 8,
  },
  miniMockCardRow: {
    flexDirection: 'row',
    gap: 6,
  },
  miniMockCard: {
    flex: 1,
    height: 34,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  miniMockTable: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },

  // MODALS GENERAL
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCardLarge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 720,
    maxHeight: '90vh',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  modalCardRegular: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 540,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  modalCardMobile: {
    maxWidth: '100%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  modalMainTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSubTitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  formSectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0056FF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  modalFooterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 10,
  },
  modalCancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    cursor: 'pointer',
  },
  modalCancelBtnText: {
    fontSize: 12.5,
    color: '#475569',
    fontWeight: '600',
  },
  modalSubmitBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#0056FF',
    cursor: 'pointer',
  },
  modalSubmitBtnText: {
    fontSize: 12.5,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // PERMISSION CHECKBOXES
  permissionsCheckboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  permissionCheckItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
    paddingVertical: 4,
    cursor: 'pointer',
  },
  permissionCheckLabel: {
    fontSize: 12.5,
    color: '#334155',
    fontWeight: '500',
  },

  // DETAIL FIELD
  detailFieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailLabel: {
    fontSize: 12.5,
    color: '#64748B',
    fontWeight: '600',
  },
  detailVal: {
    fontSize: 12.5,
    color: '#0F172A',
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
});
