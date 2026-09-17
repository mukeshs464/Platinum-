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

export default function ClientPortalView({ onBackToLanding }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 860;
  const scrollY = useRef(new Animated.Value(0)).current;

  // View state: 'login' | 'portal'
  const [viewState, setViewState] = useState('login');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [integrationSubTab, setIntegrationSubTab] = useState('Credentials'); // 'Credentials' | 'Documentation'
  const [subBillingCycle, setSubBillingCycle] = useState('Monthly'); // 'Monthly' | 'Yearly'

  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  // Login credentials
  const [username, setUsername] = useState('riya.sharma@technova.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // Modals
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAddClientRoleModal, setShowAddClientRoleModal] = useState(false);

  const handleCopyKey = () => {
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // 1. CLIENT LOGIN VIEW (Page 18)
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
                  <Text style={styles.paneLogoTitle}>PLATINUM</Text>
                  <Text style={styles.paneLogoSub}>AI Chatbot Platform • Client Portal</Text>
                </View>
              </View>

              <Text style={styles.paneHeroTitle}>
                Turn Your{'\n'}Organization's{'\n'}Knowledge into{'\n'}Conversations
              </Text>
              <Text style={styles.paneHeroDesc}>
                A secure and scalable AI chatbot platform built for your business.
              </Text>

              <View style={styles.paneFeaturesList}>
                <PaneFeature icon="shield-check-outline" title="Your Data, Your Control" desc="Secure and tenant-isolated environment." />
                <PaneFeature icon="power-plug-outline" title="Seamless Integration" desc="Easily connect with your internal applications." />
                <PaneFeature icon="file-document-outline" title="Turn Documents into Answers" desc="Upload policies, manuals, SOPs, and more." />
                <PaneFeature icon="chart-timeline-variant" title="Empower Your Teams" desc="Get accurate, contextual responses in real-time." />
              </View>

              <Text style={styles.paneQuote}>"AI that understands your organization." — Platinum</Text>
            </View>
          )}

          <View style={styles.loginRightPane}>
            <View style={styles.loginRightHeader}>
              <MaterialCommunityIcons name="hexagon-multiple" size={32} color="#0056FF" />
              <Text style={styles.rightHeaderTitle}>PLATINUM</Text>
              <Text style={styles.rightHeaderSub}>AI Chatbot Platform</Text>
            </View>

            <View style={styles.loginFormBox}>
              <Text style={styles.loginFormHeading}>Welcome to Client Portal</Text>
              <Text style={styles.loginFormSub}>Sign in to access your organization's AI account.</Text>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email / Username</Text>
                <View style={styles.inputBox}>
                  <Feather name="user" size={16} color="#94A3B8" style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.textInput}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your email or username"
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

              <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signInBtn}
                onPress={() => setViewState('portal')}
                activeOpacity={0.88}
              >
                <Text style={styles.signInBtnText}>Sign In</Text>
                <Feather name="arrow-right" size={16} color="#FFF" style={{ marginLeft: 8 }} />
              </TouchableOpacity>

              <View style={styles.secureAccessBanner}>
                <Feather name="shield" size={16} color="#0056FF" style={{ marginRight: 8 }} />
                <Text style={styles.secureAccessText}>
                  Secure Access: Your account is protected with industry-best encryption.
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

  // 2. CLIENT PORTAL MAIN APP (Pages 19 - 33)
  return (
    <View style={styles.dashContainer}>
      {/* Top Navbar */}
      <View style={styles.dashTopNav}>
        <View style={styles.dashLogoBox}>
          <MaterialCommunityIcons name="hexagon-multiple" size={24} color="#0056FF" />
          <Text style={styles.dashLogoText}>PLATINUM</Text>
          <View style={styles.tenantBadge}>
            <Text style={styles.tenantBadgeText}>TechNova Solutions ▾</Text>
          </View>
        </View>

        <View style={styles.dashNavRight}>
          <TouchableOpacity style={styles.dashNavIconBtn}>
            <Feather name="bell" size={18} color="#64748B" />
          </TouchableOpacity>

          <View style={styles.adminUserBadge}>
            <View style={styles.clientAvatar}>
              <Text style={styles.clientAvatarText}>RS</Text>
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.adminName}>Riya Sharma</Text>
              <Text style={styles.adminRole}>Client Administrator</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.dashExitBtn} onPress={() => setViewState('login')}>
            <Feather name="log-out" size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body: Sidebar + Main Content */}
      <View style={styles.dashBody}>
        {/* Sidebar */}
        {!isMobile && (
          <View style={styles.sidebar}>
            {['Dashboard', 'Profile', 'Subscription', 'Users', 'Integration', 'Data Upload', 'Master Settings'].map((item) => {
              const isActive = activeTab === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
                  onPress={() => setActiveTab(item)}
                >
                  <MaterialCommunityIcons
                    name={getClientSidebarIcon(item)}
                    size={18}
                    color={isActive ? '#0056FF' : '#64748B'}
                    style={{ marginRight: 12 }}
                  />
                  <Text style={[styles.sidebarItemText, isActive && styles.sidebarItemTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity style={styles.sidebarBackToWeb} onPress={onBackToLanding}>
              <Feather name="globe" size={16} color="#0056FF" style={{ marginRight: 8 }} />
              <Text style={styles.sidebarBackToWebText}>Back to Website</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Dynamic Views based on activeTab */}
        <ScrollView style={styles.mainContent} contentContainerStyle={{ padding: 24 }}>
          {/* Header Title Bar */}
          <View style={styles.welcomeBanner}>
            <View>
              <Text style={styles.welcomeTitle}>{activeTab}</Text>
              <Text style={styles.welcomeSub}>TechNova Solutions • Organization AI Portal</Text>
            </View>
            <TouchableOpacity style={styles.returnWebPill} onPress={onBackToLanding}>
              <Feather name="arrow-left" size={14} color="#0056FF" style={{ marginRight: 6 }} />
              <Text style={styles.returnWebPillText}>Return to Landing Page</Text>
            </TouchableOpacity>
          </View>

          {/* Mobile Tab Switcher */}
          {isMobile && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {['Dashboard', 'Profile', 'Subscription', 'Users', 'Integration', 'Data Upload', 'Master Settings'].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.mobileTabBtn, activeTab === t && styles.mobileTabBtnActive]}
                  onPress={() => setActiveTab(t)}
                >
                  <Text style={[styles.mobileTabText, activeTab === t && styles.mobileTabTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* PAGE 1: DASHBOARD (Page 19) */}
          {activeTab === 'Dashboard' && (
            <View style={styles.pageWrapper}>
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <SummaryCard title="Current Plan" value="Professional" badge="Active" sub="Valid until Oct 8, 2026" icon="crown-outline" color="#0056FF" />
                <SummaryCard title="AI Chatbot" value="Online" badge="Active" sub="Integrated & serving" icon="robot" color="#10B981" />
                <SummaryCard title="Knowledge Base" value="12 Docs" badge="Indexed" sub="15.8 MB total size" icon="database-check-outline" color="#7C3AED" />
                <SummaryCard title="Usage This Month" value="1,250" badge="82% left" sub="Questions processed" icon="chart-bar" color="#0284C7" />
              </View>

              <View style={[styles.chartsRow, isMobile && styles.chartsRowMobile]}>
                <View style={[styles.chartCard, { flex: 1.2 }]}>
                  <Text style={styles.chartTitle}>Recent Activity</Text>
                  <ActivityRow date="Sep 8, 2026 • 10:24 AM" desc="Uploaded Leave_Policy.pdf" status="Processed" />
                  <ActivityRow date="Sep 6, 2026 • 03:15 PM" desc="User Amit Kumar added" status="Success" />
                  <ActivityRow date="Sep 1, 2026 • 11:40 AM" desc="Regenerated new API credentials" status="Success" />
                  <ActivityRow date="Aug 28, 2026 • 09:10 AM" desc="Updated product_manual.pdf" status="Processed" />
                </View>

                <View style={[styles.chartCard, { flex: 0.9 }]}>
                  <Text style={styles.chartTitle}>Subscription Overview</Text>
                  <View style={styles.subDetailBox}>
                    <DetailItem label="Plan Name" value="Professional Plan" />
                    <DetailItem label="Status" value="Active (Auto-Renew)" />
                    <DetailItem label="Start Date" value="Aug 8, 2026" />
                    <DetailItem label="Expiry Date" value="Oct 8, 2026" />
                    <DetailItem label="Monthly Quota" value="10,000 queries" />
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* PAGE 2: CLIENT PROFILE (Pages 21, 22) */}
          {activeTab === 'Profile' && (
            <View style={styles.pageWrapper}>
              <View style={styles.profileCard}>
                <View style={styles.profileHeaderRow}>
                  <View style={styles.profileAvatarBox}>
                    <Text style={styles.profileAvatarInitials}>TN</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.profileOrgName}>TechNova Solutions</Text>
                    <Text style={styles.profileOrgMotto}>Building a Smarter Tomorrow</Text>
                  </View>
                  <TouchableOpacity style={styles.editProfileBtn} onPress={() => setShowEditProfileModal(true)}>
                    <Feather name="edit-2" size={14} color="#FFF" style={{ marginRight: 6 }} />
                    <Text style={styles.editProfileBtnText}>Edit Profile</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.profileStatsRow}>
                  <ProfilePill icon="briefcase-outline" label="Industry" val="Information Technology" />
                  <ProfilePill icon="account-group-outline" label="Employees" val="501 - 1,000" />
                  <ProfilePill icon="map-marker-outline" label="Headquarters" val="Hyderabad, India" />
                  <ProfilePill icon="calendar-outline" label="Customer Since" val="Aug 8, 2025" />
                </View>

                <View style={styles.dividerLine} />

                <Text style={styles.sectionSubHeading}>Organization Details</Text>
                <View style={styles.infoGrid}>
                  <InfoField label="Organization Name" value="TechNova Solutions Pvt Ltd" />
                  <InfoField label="Industry" value="Information Technology & SaaS" />
                  <InfoField label="Website" value="https://www.technova.com" />
                  <InfoField label="Contact Email" value="admin@technova.com" />
                  <InfoField label="Contact Phone" value="+91 98765 43210" />
                  <InfoField label="Address" value="Plot No. 123, Tech Park, Gachibowli, Hyderabad, Telangana 500032" />
                  <InfoField label="Time Zone" value="(UTC+05:30) India Standard Time (IST)" />
                  <InfoField label="Language" value="English (United States)" />
                </View>
              </View>
            </View>
          )}

          {/* PAGE 3: CLIENT SUBSCRIPTION (Pages 23, 24) */}
          {activeTab === 'Subscription' && (
            <View style={styles.pageWrapper}>
              <View style={styles.currentSubBanner}>
                <View style={{ flex: 1 }}>
                  <View style={styles.activePill}><Text style={styles.activePillText}>Active Subscription</Text></View>
                  <Text style={styles.currentSubTitle}>Professional Plan</Text>
                  <Text style={styles.currentSubDates}>Aug 8, 2026 → Oct 8, 2026 • 30 Days Remaining</Text>
                  <Text style={styles.currentSubDesc}>Includes up to 10,000 queries/month, 5 AI chatbots, and priority support.</Text>
                </View>
                <View style={styles.validityBox}>
                  <Text style={styles.validityDays}>30</Text>
                  <Text style={styles.validityLabel}>Days Left</Text>
                </View>
              </View>

              {/* Billing Cycle Toggle */}
              <View style={styles.cycleToggleContainer}>
                <Text style={styles.cycleHeading}>Available Upgrade Plans</Text>
                <View style={styles.togglePill}>
                  <TouchableOpacity
                    style={[styles.toggleBtn, subBillingCycle === 'Monthly' && styles.toggleBtnActive]}
                    onPress={() => setSubBillingCycle('Monthly')}
                  >
                    <Text style={[styles.toggleBtnText, subBillingCycle === 'Monthly' && styles.toggleBtnTextActive]}>Monthly</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.toggleBtn, subBillingCycle === 'Yearly' && styles.toggleBtnActive]}
                    onPress={() => setSubBillingCycle('Yearly')}
                  >
                    <Text style={[styles.toggleBtnText, subBillingCycle === 'Yearly' && styles.toggleBtnTextActive]}>Yearly (Save 20%)</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Pricing Cards */}
              <View style={styles.pricingCardsRow}>
                <ClientPlanCard
                  name="Starter"
                  price="₹0"
                  billing="/month"
                  desc="For small testing teams"
                  features={['Up to 1,000 queries/month', '1 AI Chatbot', 'Basic analytics', 'Email support']}
                  btnText="Downgrade"
                  isCurrent={false}
                />
                <ClientPlanCard
                  name="Professional"
                  price={subBillingCycle === 'Monthly' ? '₹2,499' : '₹23,990'}
                  billing={subBillingCycle === 'Monthly' ? '/month' : '/year'}
                  desc="For growing businesses"
                  features={['Up to 10,000 queries/month', '5 AI Chatbots', 'Advanced analytics', 'Priority support', 'Custom branding']}
                  btnText="Current Plan"
                  isCurrent={true}
                />
                <ClientPlanCard
                  name="Enterprise"
                  price={subBillingCycle === 'Monthly' ? '₹7,999' : '₹76,790'}
                  billing={subBillingCycle === 'Monthly' ? '/month' : '/year'}
                  desc="For large organizations"
                  features={['Unlimited queries', 'Unlimited chatbots', 'Advanced analytics', 'Dedicated support', 'Custom AI fine-tuning']}
                  btnText="Upgrade Plan"
                  isCurrent={false}
                />
              </View>
            </View>
          )}

          {/* PAGE 4: USERS MANAGEMENT (Pages 25, 26) */}
          {activeTab === 'Users' && (
            <View style={styles.pageWrapper}>
              <View style={styles.actionFilterBar}>
                <View style={styles.searchBarBox}>
                  <Feather name="search" size={16} color="#94A3B8" />
                  <TextInput placeholder="Search users by name or email..." style={styles.innerSearch} />
                </View>
                <TouchableOpacity style={styles.addPrimaryBtn} onPress={() => setShowAddUserModal(true)}>
                  <Feather name="user-plus" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.addPrimaryBtnText}>Add User</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tableCard}>
                <View style={styles.tableHeadRow}>
                  <Text style={[styles.th, { flex: 1.5 }]}>Name</Text>
                  <Text style={[styles.th, { flex: 2 }]}>Email</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Status</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Actions</Text>
                </View>
                <ClientUserRow name="Riya Sharma" email="riya@technova.com" status="Active" isOwner={true} />
                <ClientUserRow name="Amit Kumar" email="amit@technova.com" status="Active" />
                <ClientUserRow name="Sneha Reddy" email="sneha@technova.com" status="Active" />
                <ClientUserRow name="Karan Mehta" email="karan@technova.com" status="Active" />
                <ClientUserRow name="Priya Nair" email="priya@technova.com" status="Active" />
                <ClientUserRow name="Vikram Singh" email="vikram@technova.com" status="Inactive" />
              </View>
            </View>
          )}

          {/* PAGE 5: INTEGRATION & DOCUMENTATION (Pages 26, 27, 28, 29) */}
          {activeTab === 'Integration' && (
            <View style={styles.pageWrapper}>
              <View style={styles.settingsTabNav}>
                <TouchableOpacity
                  style={[styles.settingsTabBtn, integrationSubTab === 'Credentials' && styles.settingsTabBtnActive]}
                  onPress={() => setIntegrationSubTab('Credentials')}
                >
                  <Text style={[styles.settingsTabBtnText, integrationSubTab === 'Credentials' && styles.settingsTabBtnTextActive]}>
                    Credentials
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.settingsTabBtn, integrationSubTab === 'Documentation' && styles.settingsTabBtnActive]}
                  onPress={() => setIntegrationSubTab('Documentation')}
                >
                  <Text style={[styles.settingsTabBtnText, integrationSubTab === 'Documentation' && styles.settingsTabBtnTextActive]}>
                    Documentation
                  </Text>
                </TouchableOpacity>
              </View>

              {integrationSubTab === 'Credentials' ? (
                <View style={styles.integrationBox}>
                  <View style={styles.credentialsCol}>
                    <Text style={styles.credLabel}>Client ID</Text>
                    <View style={styles.credValueBox}><Text style={styles.credValueText}>technova_001</Text></View>

                    <Text style={[styles.credLabel, { marginTop: 14 }]}>API Key (Private)</Text>
                    <View style={styles.credValueBox}>
                      <Text style={styles.credValueText}>
                        {showApiKey ? 'pk_live_7f3e9d4c5b2a8e1f5d6c4a3b2e5f6d7c' : '••••••••••••••••••••••••••••••••••••••••'}
                      </Text>
                      <TouchableOpacity onPress={() => setShowApiKey(!showApiKey)} style={{ marginLeft: 8 }}>
                        <Feather name={showApiKey ? 'eye-off' : 'eye'} size={16} color="#64748B" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleCopyKey} style={{ marginLeft: 10 }}>
                        <Feather name={copiedKey ? 'check' : 'copy'} size={16} color={copiedKey ? '#10B981' : '#0056FF'} />
                      </TouchableOpacity>
                    </View>

                    <Text style={[styles.credLabel, { marginTop: 14 }]}>API Chat Endpoint</Text>
                    <View style={styles.credValueBox}><Text style={styles.credValueText}>https://api.platinum.ai/v1/chat</Text></View>

                    <View style={styles.credStatusNotice}>
                      <Feather name="check-circle" size={16} color="#059669" style={{ marginRight: 6 }} />
                      <Text style={styles.credStatusText}>Your integration is active and serving production traffic.</Text>
                    </View>
                  </View>

                  <View style={styles.guideCol}>
                    <Text style={styles.guideHeading}>Quick cURL Integration</Text>
                    <View style={styles.curlCard}>
                      <Text style={styles.codeText}>curl -X POST https://api.platinum.ai/v1/chat \</Text>
                      <Text style={styles.codeText}>  -H "Authorization: Bearer pk_live_..." \</Text>
                      <Text style={styles.codeText}>  -H "Content-Type: application/json" \</Text>
                      <Text style={styles.codeText}>{"  -d '{"}</Text>
                      <Text style={styles.codeText}>    "client_id": "technova_001",</Text>
                      <Text style={styles.codeText}>    "message": "What is the leave policy?"</Text>
                      <Text style={styles.codeText}>{"  }'"}</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.docViewWrapper}>
                  <Text style={styles.sectionHeaderTitle}>API Documentation & Endpoints</Text>
                  <Text style={styles.sectionHeaderSub}>Complete technical reference for connecting your knowledge base into any custom software.</Text>
                  <DocSection title="1. Base URL & Endpoints" content="Production Endpoint: https://api.platinum.ai/v1/chat (Method: POST)" />
                  <DocSection title="2. Authentication" content="Include your client API Key in the Authorization Bearer header: Authorization: Bearer <YOUR_API_KEY>" />
                  <DocSection title="3. Request Payload (JSON)" content={'{\n  "client_id": "technova_001",\n  "message": "User query string",\n  "session_id": "optional_session_uuid"\n}'} isCode={true} />
                  <DocSection title="4. Response Payload (JSON)" content={'{\n  "response": "According to company policy...",\n  "sources": [{ "title": "Leave Policy", "page": 4 }],\n  "status": "success"\n}'} isCode={true} />
                </View>
              )}
            </View>
          )}

          {/* PAGE 6: DATA UPLOAD (Pages 30, 31) */}
          {activeTab === 'Data Upload' && (
            <View style={styles.pageWrapper}>
              <View style={styles.dropZoneArea}>
                <Feather name="upload-cloud" size={38} color="#0056FF" style={{ marginBottom: 8 }} />
                <Text style={styles.dropZoneTitle}>Upload Knowledge Data</Text>
                <Text style={styles.dropZoneSub}>Drag and drop company policies, SOPs, and manuals</Text>
                <TouchableOpacity style={styles.chooseFilesBtn}>
                  <Text style={styles.chooseFilesText}>Choose Files</Text>
                </TouchableOpacity>
                <Text style={styles.dropZoneNote}>Supported: PDF, DOCX, TXT, CSV, XLSX (Up to 50MB per file)</Text>
              </View>

              <View style={styles.tableCard}>
                <Text style={styles.tableTitle}>Uploaded Knowledge Documents (12)</Text>
                <DocRow name="HR_Policy_2026.pdf" date="Aug 8, 2026 • 10:24 AM" size="1.2 MB" status="Processed" color="#10B981" />
                <DocRow name="Employee_Handbook_Global.docx" date="Aug 6, 2026 • 02:15 PM" size="4.1 MB" status="Processed" color="#10B981" />
                <DocRow name="Company_Guidelines_draft.pdf" date="Aug 4, 2026 • 11:40 AM" size="850 KB" status="Failed" color="#EF4444" />
                <DocRow name="IT_Security_Protocols.pdf" date="Jul 28, 2026 • 04:20 PM" size="2.6 MB" status="Processed" color="#10B981" />
                <DocRow name="Finance_Travel_Rates.xlsx" date="Jul 15, 2026 • 09:12 AM" size="920 KB" status="Processed" color="#10B981" />
              </View>
            </View>
          )}

          {/* PAGE 7: MASTER SETTINGS / ROLES (Pages 32, 33) */}
          {activeTab === 'Master Settings' && (
            <View style={styles.pageWrapper}>
              <View style={styles.settingsCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <Text style={styles.settingsSectionTitle}>Manage Roles for Your Organization</Text>
                  <TouchableOpacity style={styles.addPrimaryBtn} onPress={() => setShowAddClientRoleModal(true)}>
                    <Feather name="plus" size={14} color="#FFF" style={{ marginRight: 6 }} />
                    <Text style={styles.addPrimaryBtnText}>Add Role</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.tableHeadRow}>
                  <Text style={[styles.th, { flex: 1.2 }]}>Role Name</Text>
                  <Text style={[styles.th, { flex: 2 }]}>Description</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Status</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Actions</Text>
                </View>
                <RoleItem name="Admin" desc="Full access to all client features and uploaded data." status="Active" />
                <RoleItem name="Manager" desc="Can manage users, data uploads, and integrations." status="Active" />
                <RoleItem name="Viewer" desc="Read-only access to dashboard and uploaded data." status="Active" />
                <RoleItem name="HR" desc="Access to HR-related documents and chat reports." status="Active" />
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* ADD USER MODAL (Page 25) */}
      {showAddUserModal && (
        <Modal transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New User</Text>
                <TouchableOpacity onPress={() => setShowAddUserModal(false)}><Feather name="x" size={20} color="#64748B" /></TouchableOpacity>
              </View>
              <TextInput style={styles.modalInput} placeholder="Full Name *" />
              <TextInput style={styles.modalInput} placeholder="Email Address *" />
              <TextInput style={styles.modalInput} placeholder="Role (e.g. User, Admin)" />
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddUserModal(false)}><Text style={styles.modalCancelBtnText}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.modalSubmitBtn} onPress={() => setShowAddUserModal(false)}><Text style={styles.modalSubmitBtnText}>Create User</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* EDIT PROFILE MODAL (Page 21) */}
      {showEditProfileModal && (
        <Modal transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Organization Profile</Text>
                <TouchableOpacity onPress={() => setShowEditProfileModal(false)}><Feather name="x" size={20} color="#64748B" /></TouchableOpacity>
              </View>
              <TextInput style={styles.modalInput} defaultValue="TechNova Solutions" placeholder="Company Name" />
              <TextInput style={styles.modalInput} defaultValue="Information Technology" placeholder="Industry" />
              <TextInput style={styles.modalInput} defaultValue="admin@technova.com" placeholder="Contact Email" />
              <TextInput style={styles.modalInput} defaultValue="+91 98765 43210" placeholder="Phone" />
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowEditProfileModal(false)}><Text style={styles.modalCancelBtnText}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity style={styles.modalSubmitBtn} onPress={() => setShowEditProfileModal(false)}><Text style={styles.modalSubmitBtnText}>Save Changes</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

// Subcomponents
function SummaryCard({ title, value, badge, sub, icon, color }) {
  return (
    <View style={styles.kpiCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text style={styles.kpiTitle}>{title}</Text>
        <MaterialCommunityIcons name={icon} size={18} color={color} />
      </View>
      <View style={styles.kpiValueRow}>
        <Text style={styles.kpiValue}>{value}</Text>
        <View style={[styles.kpiTrendBadge, { backgroundColor: color + '15' }]}>
          <Text style={[styles.kpiTrendText, { color }]}>{badge}</Text>
        </View>
      </View>
      <Text style={styles.kpiSub}>{sub}</Text>
    </View>
  );
}

function ActivityRow({ date, desc, status }) {
  return (
    <View style={styles.activityRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.activityDesc}>{desc}</Text>
        <Text style={styles.activityDate}>{date}</Text>
      </View>
      <View style={styles.activityBadge}>
        <Text style={styles.activityBadgeText}>{status}</Text>
      </View>
    </View>
  );
}

function DetailItem({ label, value }) {
  return (
    <View style={styles.detailItemRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function ProfilePill({ icon, label, val }) {
  return (
    <View style={styles.profilePill}>
      <MaterialCommunityIcons name={icon} size={18} color="#0056FF" style={{ marginRight: 8 }} />
      <View>
        <Text style={styles.profilePillLabel}>{label}</Text>
        <Text style={styles.profilePillVal}>{val}</Text>
      </View>
    </View>
  );
}

function InfoField({ label, value }) {
  return (
    <View style={styles.infoFieldBox}>
      <Text style={styles.infoFieldLabel}>{label}</Text>
      <Text style={styles.infoFieldValue}>{value}</Text>
    </View>
  );
}

function ClientPlanCard({ name, price, billing, desc, features, btnText, isCurrent }) {
  return (
    <View style={[styles.clientPlanBox, isCurrent && styles.clientPlanBoxActive]}>
      {isCurrent && <View style={styles.currentBadge}><Text style={styles.currentBadgeText}>Current Plan</Text></View>}
      <Text style={styles.clientPlanName}>{name}</Text>
      <Text style={styles.clientPlanDesc}>{desc}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginVertical: 10 }}>
        <Text style={styles.clientPlanPrice}>{price}</Text>
        <Text style={styles.clientPlanBilling}>{billing}</Text>
      </View>
      <View style={{ gap: 8, marginVertical: 14 }}>
        {features.map((f, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="check" size={14} color="#10B981" style={{ marginRight: 6 }} />
            <Text style={styles.clientPlanFeatureText}>{f}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={[styles.planActionBtn, isCurrent ? styles.planActionBtnCurrent : styles.planActionBtnUpgrade]}>
        <Text style={[styles.planActionBtnText, isCurrent ? styles.planActionTextCurrent : styles.planActionTextUpgrade]}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
}

function ClientUserRow({ name, email, status, isOwner }) {
  return (
    <View style={styles.tr}>
      <Text style={[styles.tdBold, { flex: 1.5 }]}>{name} {isOwner && '(You)'}</Text>
      <Text style={[styles.td, { flex: 2 }]}>{email}</Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.statusDot, { backgroundColor: status === 'Active' ? '#10B981' : '#EF4444' }]} />
        <Text style={[styles.statusText, { color: status === 'Active' ? '#10B981' : '#EF4444' }]}>{status}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity><Feather name="edit-2" size={14} color="#0056FF" /></TouchableOpacity>
        <TouchableOpacity><Feather name="slash" size={14} color="#64748B" /></TouchableOpacity>
      </View>
    </View>
  );
}

function DocRow({ name, date, size, status, color }) {
  return (
    <View style={styles.docRow}>
      <MaterialCommunityIcons name="file-document-outline" size={24} color="#0056FF" style={{ marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.docName}>{name}</Text>
        <Text style={styles.docMeta}>{date} • {size}</Text>
      </View>
      <View style={[styles.docStatusBadge, { backgroundColor: color + '15' }]}>
        <Text style={[styles.docStatusText, { color }]}>{status}</Text>
      </View>
      <TouchableOpacity style={{ marginLeft: 14 }}>
        <Feather name="trash-2" size={16} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
}

function DocSection({ title, content, isCode }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={{ fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 6 }}>{title}</Text>
      {isCode ? (
        <View style={styles.curlCard}><Text style={styles.codeText}>{content}</Text></View>
      ) : (
        <Text style={{ fontSize: 13, color: '#475569', lineHeight: 20 }}>{content}</Text>
      )}
    </View>
  );
}

function RoleItem({ name, desc, status }) {
  return (
    <View style={styles.tr}>
      <Text style={[styles.tdBold, { flex: 1.2 }]}>{name}</Text>
      <Text style={[styles.td, { flex: 2 }]}>{desc}</Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
        <Text style={[styles.statusText, { color: '#10B981' }]}>{status}</Text>
      </View>
      <View style={{ flex: 1 }}><TouchableOpacity><Text style={styles.actionLink}>Edit Role</Text></TouchableOpacity></View>
    </View>
  );
}

function PaneFeature({ icon, title, desc }) {
  return (
    <View style={styles.paneFeatureRow}>
      <MaterialCommunityIcons name={icon} size={20} color="#60A5FA" style={{ marginRight: 12, marginTop: 2 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.paneFeatureTitle}>{title}</Text>
        <Text style={styles.paneFeatureDesc}>{desc}</Text>
      </View>
    </View>
  );
}

function getClientSidebarIcon(name) {
  switch (name) {
    case 'Dashboard': return 'view-dashboard-outline';
    case 'Profile': return 'domain';
    case 'Subscription': return 'credit-card-outline';
    case 'Users': return 'account-group-outline';
    case 'Integration': return 'code-braces';
    case 'Data Upload': return 'cloud-upload-outline';
    case 'Master Settings': return 'cog-outline';
    default: return 'circle';
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    minHeight: '100vh',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  topBackNav: {
    width: '100%',
    maxWidth: 1040,
    marginBottom: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  backBtnText: {
    color: '#0056FF',
    fontWeight: '700',
    fontSize: 14,
  },
  loginCardWrapper: {
    flexDirection: 'row',
    maxWidth: 1040,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 36,
    elevation: 8,
  },
  loginCardWrapperMobile: {
    flexDirection: 'column',
  },
  loginLeftPane: {
    flex: 1.1,
    backgroundColor: '#0F172A',
    padding: 40,
    justifyContent: 'space-between',
  },
  paneLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
  },
  paneLogoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  paneLogoSub: {
    color: '#94A3B8',
    fontSize: 11,
  },
  paneHeroTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: 16,
  },
  paneHeroDesc: {
    color: '#94A3B8',
    fontSize: 13.5,
    lineHeight: 22,
    marginBottom: 36,
  },
  paneFeaturesList: {
    gap: 18,
    marginBottom: 36,
  },
  paneFeatureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  paneFeatureTitle: {
    color: '#F8FAFC',
    fontSize: 13.5,
    fontWeight: '700',
  },
  paneFeatureDesc: {
    color: '#64748B',
    fontSize: 12,
  },
  paneQuote: {
    color: '#475569',
    fontSize: 12,
    fontStyle: 'italic',
  },
  loginRightPane: {
    flex: 1.3,
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  loginRightHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  rightHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 1,
    marginTop: 8,
  },
  rightHeaderSub: {
    fontSize: 11.5,
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
    textAlign: 'center',
  },
  loginFormSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
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
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
  },
  textInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  forgotText: {
    fontSize: 12.5,
    color: '#0056FF',
    fontWeight: '600',
  },
  signInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0056FF',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 18,
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  signInBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secureAccessBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 8,
    padding: 10,
  },
  secureAccessText: {
    fontSize: 11.5,
    color: '#1E40AF',
    flex: 1,
    lineHeight: 16,
  },
  portalFooterCopy: {
    fontSize: 11.5,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 24,
  },

  /* DASHBOARD */
  dashContainer: {
    minHeight: '100vh',
    backgroundColor: '#F8FAFC',
  },
  dashTopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dashLogoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dashLogoText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  tenantBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tenantBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0056FF',
  },
  dashNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  dashNavIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminUserBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientAvatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  adminName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  adminRole: {
    fontSize: 10.5,
    color: '#64748B',
  },
  dashExitBtn: {
    padding: 8,
  },
  dashBody: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 240,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    padding: 16,
    gap: 6,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  sidebarItemActive: {
    backgroundColor: '#EFF6FF',
  },
  sidebarItemText: {
    fontSize: 13.5,
    color: '#64748B',
    fontWeight: '500',
  },
  sidebarItemTextActive: {
    color: '#0056FF',
    fontWeight: '700',
  },
  sidebarBackToWeb: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  sidebarBackToWebText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0056FF',
  },
  mainContent: {
    flex: 1,
  },
  welcomeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: 13.5,
    color: '#64748B',
  },
  returnWebPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  returnWebPillText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0056FF',
  },
  mobileTabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mobileTabBtnActive: {
    backgroundColor: '#0056FF',
    borderColor: '#0056FF',
  },
  mobileTabText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  mobileTabTextActive: {
    color: '#FFFFFF',
  },
  pageWrapper: {
    gap: 20,
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
  },
  kpiTitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#64748B',
  },
  kpiValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  kpiTrendBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  kpiTrendText: {
    fontSize: 11,
    fontWeight: '700',
  },
  kpiSub: {
    fontSize: 11,
    color: '#94A3B8',
  },
  chartsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  chartsRowMobile: {
    flexDirection: 'column',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  activityDesc: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  activityDate: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  activityBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activityBadgeText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  subDetailBox: {
    gap: 10,
  },
  detailItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 12.5,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },

  /* Profile */
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
  },
  profileHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  profileAvatarBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarInitials: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  profileOrgName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  profileOrgMotto: {
    fontSize: 13,
    color: '#64748B',
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0056FF',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
  },
  editProfileBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  profileStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginVertical: 16,
  },
  profilePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexGrow: 1,
  },
  profilePillLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  profilePillVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 18,
  },
  sectionSubHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoFieldBox: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
  },
  infoFieldLabel: {
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: 2,
  },
  infoFieldValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },

  /* Subscriptions */
  currentSubBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
    gap: 16,
  },
  activePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  activePillText: {
    color: '#059669',
    fontSize: 11.5,
    fontWeight: '700',
  },
  currentSubTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  currentSubDates: {
    fontSize: 13,
    color: '#0056FF',
    fontWeight: '600',
    marginBottom: 6,
  },
  currentSubDesc: {
    fontSize: 13,
    color: '#64748B',
  },
  validityBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    minWidth: 90,
  },
  validityDays: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0056FF',
  },
  validityLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  cycleToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
    gap: 10,
  },
  cycleHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  togglePill: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    padding: 3,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: '#0056FF',
  },
  toggleBtnText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
  },
  pricingCardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  clientPlanBox: {
    flexBasis: '31%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    position: 'relative',
  },
  clientPlanBoxActive: {
    borderColor: '#0056FF',
    borderWidth: 2,
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  currentBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  currentBadgeText: {
    color: '#0056FF',
    fontSize: 11,
    fontWeight: '700',
  },
  clientPlanName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  clientPlanDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  clientPlanPrice: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  clientPlanBilling: {
    fontSize: 12.5,
    color: '#64748B',
    marginLeft: 4,
  },
  clientPlanFeatureText: {
    fontSize: 12.5,
    color: '#475569',
  },
  planActionBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  planActionBtnCurrent: {
    backgroundColor: '#F1F5F9',
  },
  planActionBtnUpgrade: {
    backgroundColor: '#0056FF',
  },
  planActionBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
  planActionTextCurrent: {
    color: '#64748B',
  },
  planActionTextUpgrade: {
    color: '#FFFFFF',
  },

  /* Integration */
  integrationBox: {
    flexDirection: 'row',
    gap: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
  },
  credentialsCol: {
    flex: 1.1,
  },
  guideCol: {
    flex: 1,
  },
  credLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  credValueBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  credValueText: {
    flex: 1,
    fontSize: 12.5,
    color: '#0F172A',
    fontFamily: 'monospace',
  },
  credStatusNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  credStatusText: {
    fontSize: 12,
    color: '#065F46',
    fontWeight: '600',
  },
  guideHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  curlCard: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 14,
  },
  codeText: {
    color: '#F8FAFC',
    fontSize: 11.5,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  docViewWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  sectionHeaderSub: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
  },

  /* Data Upload */
  dropZoneArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  dropZoneTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  dropZoneSub: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 14,
  },
  chooseFilesBtn: {
    backgroundColor: '#0056FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  chooseFilesText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  dropZoneNote: {
    fontSize: 11,
    color: '#94A3B8',
  },

  /* Table */
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  tableHeadRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    marginBottom: 8,
  },
  th: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  tr: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  tdBold: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  td: {
    fontSize: 13,
    color: '#64748B',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionLink: {
    fontSize: 12,
    color: '#0056FF',
    fontWeight: '600',
  },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  docName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  docMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  docStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  docStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },

  /* Settings */
  settingsTabNav: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 20,
    gap: 12,
  },
  settingsTabBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  settingsTabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#0056FF',
  },
  settingsTabBtnText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#64748B',
  },
  settingsTabBtnTextActive: {
    color: '#0056FF',
    fontWeight: '700',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 480,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#0F172A',
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 18,
  },
  modalCancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  modalCancelBtnText: {
    color: '#475569',
    fontSize: 13,
    fontWeight: '600',
  },
  modalSubmitBtn: {
    backgroundColor: '#0056FF',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8,
  },
  modalSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  actionFilterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    gap: 14,
    flexWrap: 'wrap',
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    maxWidth: 400,
    gap: 8,
  },
  innerSearch: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    outlineStyle: 'none',
  },
  addPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0056FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
