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

export default function AdminPortalView({ onBackToLanding }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 860;
  const scrollY = useRef(new Animated.Value(0)).current;

  // View State
  const [viewState, setViewState] = useState('login'); // 'login' | 'portal'
  const [email, setEmail] = useState('admin@platinumsoftware.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Active Navigation Tab
  const [activeNav, setActiveNav] = useState('Dashboard');

  // Modals
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [showAddSubModal, setShowAddSubModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedImportDetails, setSelectedImportDetails] = useState(null);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);

  // Settings active tab
  const [settingsTab, setSettingsTab] = useState('General Settings');

  // LOGIN SCREEN (Page 2)
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

              <View style={styles.rememberForgotRow}>
                <TouchableOpacity
                  style={styles.rememberBox}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                    {rememberMe && <Feather name="check" size={12} color="#FFF" />}
                  </View>
                  <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.signInBtn}
                onPress={() => setViewState('portal')}
                activeOpacity={0.88}
              >
                <Text style={styles.signInBtnText}>Sign In</Text>
                <Feather name="arrow-right" size={16} color="#FFF" style={{ marginLeft: 8 }} />
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

  // ADMIN PORTAL MAIN APP (Pages 3 - 17)
  return (
    <View style={styles.dashContainer}>
      {/* Top Admin Navbar */}
      <View style={styles.dashTopNav}>
        <View style={styles.dashLogoBox}>
          <MaterialCommunityIcons name="hexagon-multiple" size={24} color="#0056FF" />
          <Text style={styles.dashLogoText}>PLATINUM SOFTWARE</Text>
        </View>

        <View style={styles.dashSearchBar}>
          <Feather name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search clients, plans, reports..."
            placeholderTextColor="#94A3B8"
            style={styles.dashSearchInput}
          />
        </View>

        <View style={styles.dashNavRight}>
          <TouchableOpacity style={styles.dashNavIconBtn}>
            <Feather name="bell" size={18} color="#64748B" />
          </TouchableOpacity>

          <View style={styles.adminUserBadge}>
            <View style={styles.adminAvatar}>
              <Text style={styles.adminAvatarText}>A</Text>
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.adminName}>Admin</Text>
              <Text style={styles.adminRole}>Platform Administrator</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.dashExitBtn} onPress={() => setViewState('login')}>
            <Feather name="log-out" size={16} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body: Sidebar + Dynamic Main Views */}
      <View style={styles.dashBody}>
        {/* Sidebar */}
        {!isMobile && (
          <View style={styles.sidebar}>
            {['Dashboard', 'Clients', 'Plans', 'Subscriptions', 'LLM Data Import', 'Reports', 'Master Settings'].map((item) => {
              const isActive = activeNav === item;
              return (
                <TouchableOpacity
                  key={item}
                  style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
                  onPress={() => setActiveNav(item)}
                >
                  <MaterialCommunityIcons
                    name={getSidebarIcon(item)}
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

        {/* Dynamic Content Views based on activeNav */}
        <ScrollView style={styles.mainContent} contentContainerStyle={{ padding: 24 }}>
          {/* Header Title Bar */}
          <View style={styles.welcomeBanner}>
            <View>
              <Text style={styles.welcomeTitle}>{activeNav}</Text>
              <Text style={styles.welcomeSub}>Manage and monitor your enterprise AI platform.</Text>
            </View>
            <TouchableOpacity style={styles.returnWebPill} onPress={onBackToLanding}>
              <Feather name="arrow-left" size={14} color="#0056FF" style={{ marginRight: 6 }} />
              <Text style={styles.returnWebPillText}>Return to Landing Page</Text>
            </TouchableOpacity>
          </View>

          {/* Mobile Tab Pills */}
          {isMobile && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {['Dashboard', 'Clients', 'Plans', 'Subscriptions', 'LLM Data Import', 'Reports', 'Master Settings'].map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.mobileTabBtn, activeNav === item && styles.mobileTabBtnActive]}
                  onPress={() => setActiveNav(item)}
                >
                  <Text style={[styles.mobileTabText, activeNav === item && styles.mobileTabTextActive]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* 1. DASHBOARD VIEW (Page 3) */}
          {activeNav === 'Dashboard' && (
            <>
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard title="Total Clients" value="48" trend="+12%" sub="+5 new this month" color="#0056FF" />
                <KPICard title="Active Clients" value="42" trend="+8%" sub="87.5% of total" color="#10B981" />
                <KPICard title="Total Subscriptions" value="52" trend="+15%" sub="Across all plans" color="#7C3AED" />
                <KPICard title="Total Documents" value="12,480" trend="+22%" sub="Uploaded by clients" color="#0284C7" />
              </View>

              <View style={[styles.chartsRow, isMobile && styles.chartsRowMobile]}>
                <View style={[styles.chartCard, { flex: 1.2 }]}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>Client Growth</Text>
                    <Text style={styles.chartFilter}>Last 6 Months ▾</Text>
                  </View>
                  <View style={styles.growthChartMock}>
                    {['May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => (
                      <View key={m} style={styles.growthBarCol}>
                        <View style={[i === 4 ? styles.growthBarActive : styles.growthBar, { height: `${35 + i * 15}%` }]} />
                        <Text style={[styles.growthMonth, i === 4 && { color: '#0056FF', fontWeight: '700' }]}>{m}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={[styles.chartCard, { flex: 0.9 }]}>
                  <Text style={styles.chartTitle}>Subscriptions by Plan</Text>
                  <View style={styles.donutMock}>
                    <View style={styles.donutCircle}>
                      <Text style={styles.donutTotal}>52</Text>
                      <Text style={styles.donutTotalLabel}>Total</Text>
                    </View>
                    <View style={styles.donutLegend}>
                      <LegendItem label="Gold (46%)" count="24" color="#EAB308" />
                      <LegendItem label="Silver (27%)" count="14" color="#94A3B8" />
                      <LegendItem label="Platinum (19%)" count="10" color="#0056FF" />
                      <LegendItem label="Others (8%)" count="4" color="#64748B" />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.tableCard}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableTitle}>Top Clients by Usage</Text>
                  <TouchableOpacity onPress={() => setActiveNav('Clients')}><Text style={styles.viewAllLink}>View All →</Text></TouchableOpacity>
                </View>
                <View style={styles.tableHeadRow}>
                  <Text style={[styles.th, { flex: 1.5 }]}>Company Name</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Documents</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Queries</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Status</Text>
                </View>
                <TableRow company="Technova Solutions" docs="2,480" queries="18,220" status="Active" color="#10B981" />
                <TableRow company="AutoDrive Ltd" docs="1,720" queries="12,450" status="Active" color="#10B981" />
                <TableRow company="HealthPlus Inc" docs="1,540" queries="10,110" status="Active" color="#10B981" />
                <TableRow company="EduSmart Learning" docs="980" queries="7,300" status="Expiring Soon" color="#EAB308" />
              </View>
            </>
          )}

          {/* 2. CLIENTS MANAGEMENT (Pages 4, 5, 6) */}
          {activeNav === 'Clients' && (
            <View style={styles.pageWrapper}>
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard title="Total Clients" value="48" trend="+12%" sub="+5 new this month" color="#0056FF" />
                <KPICard title="Active Clients" value="42" trend="+8%" sub="87.5% of total" color="#10B981" />
                <KPICard title="Inactive Clients" value="6" trend="+25%" sub="12.5% of total" color="#EF4444" />
                <KPICard title="Expiring Soon" value="5" trend="Alert" sub="In next 30 days" color="#F59E0B" />
              </View>

              <View style={styles.actionFilterBar}>
                <View style={styles.searchBarBox}>
                  <Feather name="search" size={16} color="#94A3B8" />
                  <TextInput placeholder="Search by company, industry, or contact..." style={styles.innerSearch} />
                </View>
                <TouchableOpacity style={styles.addPrimaryBtn} onPress={() => setShowAddClientModal(true)}>
                  <Feather name="plus" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.addPrimaryBtnText}>Add Client</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tableCard}>
                <View style={styles.tableHeadRow}>
                  <Text style={[styles.th, { flex: 1.5 }]}>Company Name</Text>
                  <Text style={[styles.th, { flex: 1.2 }]}>Contact Person</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Plan</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Status</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Users</Text>
                  <Text style={[styles.th, { flex: 1.2 }]}>Subscription End</Text>
                  <Text style={[styles.th, { flex: 0.8 }]}>Actions</Text>
                </View>
                <ClientRow name="Technova Solutions" contact="Sarah Johnson" plan="Gold" status="Active" users="24" end="12 Dec 2026" color="#10B981" />
                <ClientRow name="AutoDrive Ltd" contact="Michael Chen" plan="Silver" status="Active" users="16" end="20 Nov 2026" color="#10B981" />
                <ClientRow name="HealthPlus Inc" contact="Dr. Emily Carter" plan="Platinum" status="Active" users="38" end="16 Jan 2027" color="#10B981" />
                <ClientRow name="EduSmart Learning" contact="Robert Williams" plan="Gold" status="Active" users="22" end="30 Sep 2026" color="#10B981" />
                <ClientRow name="RetailCorp" contact="Priya Mehta" plan="Silver" status="Inactive" users="14" end="10 Feb 2026" color="#EF4444" />
                <ClientRow name="GreenEnergy Co" contact="Daniel Brooks" plan="Platinum" status="Active" users="19" end="18 Mar 2027" color="#10B981" />
              </View>
            </View>
          )}

          {/* 3. PLANS MANAGEMENT (Pages 7, 8) */}
          {activeNav === 'Plans' && (
            <View style={styles.pageWrapper}>
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard title="Total Plans" value="4" trend="Active" sub="Subscription tiers" color="#0056FF" />
                <KPICard title="Active Plans" value="4" trend="100%" sub="Available for purchase" color="#10B981" />
                <KPICard title="Inactive Plans" value="0" trend="0%" sub="Archived plans" color="#64748B" />
                <KPICard title="Total Clients Using Plans" value="48" trend="Total" sub="Across all organizations" color="#F59E0B" />
              </View>

              <View style={styles.actionFilterBar}>
                <View style={styles.searchBarBox}>
                  <Feather name="search" size={16} color="#94A3B8" />
                  <TextInput placeholder="Search plans by name or description..." style={styles.innerSearch} />
                </View>
                <TouchableOpacity style={styles.addPrimaryBtn} onPress={() => setShowAddPlanModal(true)}>
                  <Feather name="plus" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.addPrimaryBtnText}>Add Plan</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.plansGrid}>
                <PlanCard
                  name="Gold"
                  price="₹8,999"
                  billing="/month"
                  desc="Essential features for growing businesses."
                  queries="Up to 1,000 queries/month"
                  features={['Standard LLM model', 'Email support', 'Basic analytics']}
                  clients={24}
                  status="Active"
                />
                <PlanCard
                  name="Silver"
                  price="₹19,999"
                  billing="/month"
                  desc="Advanced capabilities for established teams."
                  queries="Up to 5,000 queries/month"
                  features={['Advanced LLM model', 'Priority support', 'Detailed analytics', 'Custom knowledge base']}
                  clients={14}
                  status="Active"
                />
                <PlanCard
                  name="Platinum"
                  price="₹49,999"
                  billing="/month"
                  badge="Most Popular"
                  desc="Enterprise power for large organizations."
                  queries="Up to 20,000 queries/month"
                  features={['Latest LLM model', '24/7 dedicated support', 'Advanced analytics', 'Custom integrations', 'Dedicated account manager']}
                  clients={10}
                  status="Active"
                />
                <PlanCard
                  name="Enterprise"
                  price="Custom"
                  billing=""
                  desc="Tailored solution for global enterprise scale."
                  queries="Unlimited queries/month"
                  features={['Custom LLM deployment', 'On-premise option', 'Dedicated support team', 'Custom features']}
                  clients={3}
                  status="Active"
                />
              </View>
            </View>
          )}

          {/* 4. SUBSCRIPTION MANAGEMENT (Pages 9, 10) */}
          {activeNav === 'Subscriptions' && (
            <View style={styles.pageWrapper}>
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard title="Total Subscriptions" value="48" trend="+12%" sub="Total created" color="#0056FF" />
                <KPICard title="Active Subscriptions" value="42" trend="87.5%" sub="Currently valid" color="#10B981" />
                <KPICard title="Expired" value="3" trend="6.2%" sub="Needs renewal" color="#EF4444" />
                <KPICard title="Expiring Soon" value="5" trend="Alert" sub="In next 30 days" color="#F59E0B" />
              </View>

              <View style={styles.actionFilterBar}>
                <View style={styles.searchBarBox}>
                  <Feather name="search" size={16} color="#94A3B8" />
                  <TextInput placeholder="Search by client name, subscription ID..." style={styles.innerSearch} />
                </View>
                <TouchableOpacity style={styles.addPrimaryBtn} onPress={() => setShowAddSubModal(true)}>
                  <Feather name="plus" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.addPrimaryBtnText}>Add Subscription</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tableCard}>
                <View style={styles.tableHeadRow}>
                  <Text style={[styles.th, { flex: 1 }]}>Subscription ID</Text>
                  <Text style={[styles.th, { flex: 1.5 }]}>Client Name</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Plan</Text>
                  <Text style={[styles.th, { flex: 1.2 }]}>Start Date</Text>
                  <Text style={[styles.th, { flex: 1.2 }]}>End Date</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Status</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Amount</Text>
                  <Text style={[styles.th, { flex: 0.8 }]}>Actions</Text>
                </View>
                <SubRow id="SUB-001" client="Technova Solutions" plan="Gold" start="12 Dec 2025" end="12 Dec 2026" status="Active" amount="₹8,999" color="#10B981" />
                <SubRow id="SUB-002" client="AutoDrive Ltd" plan="Silver" start="20 Nov 2025" end="20 Nov 2026" status="Active" amount="₹19,999" color="#10B981" />
                <SubRow id="SUB-003" client="HealthPlus Inc" plan="Platinum" start="15 Jan 2026" end="15 Jan 2027" status="Active" amount="₹49,999" color="#10B981" />
                <SubRow id="SUB-004" client="EduSmart Learning" plan="Gold" start="30 Sep 2025" end="30 Sep 2026" status="Expiring Soon" amount="₹8,999" color="#F59E0B" />
                <SubRow id="SUB-005" client="RetailCorp" plan="Silver" start="10 Feb 2025" end="10 Feb 2026" status="Expired" amount="₹19,999" color="#EF4444" />
              </View>
            </View>
          )}

          {/* 5. LLM DATA IMPORT (Pages 11, 12) */}
          {activeNav === 'LLM Data Import' && (
            <View style={styles.pageWrapper}>
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard title="Total Imports" value="128" trend="+12%" sub="+14 this month" color="#0056FF" />
                <KPICard title="Completed" value="116" trend="90.6%" sub="Indexed into RAG" color="#10B981" />
                <KPICard title="Processing" value="8" trend="6.3%" sub="Vectorizing" color="#F59E0B" />
                <KPICard title="Failed" value="4" trend="3.1%" sub="Needs retry" color="#EF4444" />
              </View>

              <View style={styles.actionFilterBar}>
                <View style={styles.searchBarBox}>
                  <Feather name="search" size={16} color="#94A3B8" />
                  <TextInput placeholder="Search by client, file, or import ID..." style={styles.innerSearch} />
                </View>
                <TouchableOpacity style={styles.addPrimaryBtn} onPress={() => setShowImportModal(true)}>
                  <Feather name="upload-cloud" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.addPrimaryBtnText}>Import Data</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tableCard}>
                <View style={styles.tableHeadRow}>
                  <Text style={[styles.th, { flex: 1.2 }]}>Import ID</Text>
                  <Text style={[styles.th, { flex: 1.5 }]}>Client</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Data Source</Text>
                  <Text style={[styles.th, { flex: 0.8 }]}>Files</Text>
                  <Text style={[styles.th, { flex: 1.2 }]}>Imported On</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Status</Text>
                  <Text style={[styles.th, { flex: 0.8 }]}>Details</Text>
                </View>
                <ImportRow id="IMP-20250908-001" client="Technova Solutions" source="Client Upload" files={5} date="08 Sep 2026 • 10:15 AM" status="Completed" color="#10B981" onSelect={() => setSelectedImportDetails('IMP-20250908-001')} />
                <ImportRow id="IMP-20250906-002" client="AutoDrive Ltd" source="Client Upload" files={3} date="06 Sep 2026 • 04:30 PM" status="Completed" color="#10B981" onSelect={() => setSelectedImportDetails('IMP-20250906-002')} />
                <ImportRow id="IMP-20250907-015" client="HealthPlus Inc" source="API Import" files={8} date="05 Sep 2026 • 11:20 AM" status="Processing" color="#F59E0B" onSelect={() => setSelectedImportDetails('IMP-20250907-015')} />
                <ImportRow id="IMP-20250905-011" client="EduSmart Learning" source="Client Upload" files={12} date="05 Sep 2026 • 02:15 PM" status="Completed" color="#10B981" onSelect={() => setSelectedImportDetails('IMP-20250905-011')} />
                <ImportRow id="IMP-20250904-009" client="RetailCorp" source="API Import" files={4} date="04 Sep 2026 • 09:40 AM" status="Failed" color="#EF4444" onSelect={() => setSelectedImportDetails('IMP-20250904-009')} />
              </View>
            </View>
          )}

          {/* 6. REPORTS (Pages 13, 14) */}
          {activeNav === 'Reports' && (
            <View style={styles.pageWrapper}>
              <View style={[styles.kpiRow, isMobile && styles.kpiRowMobile]}>
                <KPICard title="Total Questions" value="1,24,532" trend="+18%" sub="Across all clients" color="#0056FF" />
                <KPICard title="Active Clients" value="48" trend="Total" sub="48 of 52 clients" color="#10B981" />
                <KPICard title="Total Users" value="2,356" trend="+12%" sub="Active employees" color="#7C3AED" />
                <KPICard title="Avg Response Time" value="2.3 sec" trend="-28%" sub="Sub-second retrieval" color="#0284C7" />
                <KPICard title="Subscription Revenue" value="₹12,49,000" trend="+15%" sub="This period" color="#10B981" />
              </View>

              <View style={[styles.chartsRow, isMobile && styles.chartsRowMobile]}>
                <View style={[styles.chartCard, { flex: 1.2 }]}>
                  <Text style={styles.chartTitle}>Questions Over Time</Text>
                  <View style={styles.growthChartMock}>
                    {['Sep 1-5', 'Sep 6-10', 'Sep 11-15', 'Sep 16-20', 'Sep 21-25', 'Sep 26-30'].map((period, i) => (
                      <View key={period} style={styles.growthBarCol}>
                        <View style={[styles.growthBarActive, { height: `${40 + i * 11}%` }]} />
                        <Text style={styles.growthMonth}>{period}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={[styles.chartCard, { flex: 0.9 }]}>
                  <Text style={styles.chartTitle}>Client Usage Distribution</Text>
                  <View style={styles.donutMock}>
                    <View style={styles.donutCircle}>
                      <Text style={styles.donutTotal}>1.24L</Text>
                      <Text style={styles.donutTotalLabel}>Queries</Text>
                    </View>
                    <View style={styles.donutLegend}>
                      <LegendItem label="Technova (28%)" count="34.8k" color="#0056FF" />
                      <LegendItem label="AutoDrive (22%)" count="27.4k" color="#7C3AED" />
                      <LegendItem label="HealthPlus (18%)" count="22.4k" color="#10B981" />
                      <LegendItem label="EduSmart (15%)" count="18.6k" color="#F59E0B" />
                      <LegendItem label="Others (17%)" count="21.3k" color="#64748B" />
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.tableCard}>
                <Text style={styles.tableTitle}>Recent Activity Overview</Text>
                <View style={styles.tableHeadRow}>
                  <Text style={[styles.th, { flex: 1.5 }]}>Client Name</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Questions Asked</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Active Users</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Avg Response</Text>
                  <Text style={[styles.th, { flex: 1 }]}>Status</Text>
                </View>
                <ReportRow client="Technova Solutions" questions="25,430" users="420" latency="2.1 sec" status="Active" color="#10B981" />
                <ReportRow client="AutoDrive Ltd" questions="18,220" users="310" latency="2.5 sec" status="Active" color="#10B981" />
                <ReportRow client="HealthPlus Inc" questions="15,100" users="290" latency="2.8 sec" status="Active" color="#10B981" />
                <ReportRow client="EduSmart Learning" questions="12,400" users="210" latency="3.1 sec" status="Active" color="#10B981" />
              </View>
            </View>
          )}

          {/* 7. MASTER SETTINGS (Pages 15, 16, 17) */}
          {activeNav === 'Master Settings' && (
            <View style={styles.pageWrapper}>
              <View style={styles.settingsTabNav}>
                {['General Settings', 'Role Management', 'System Configuration', 'Appearance & Branding'].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={[styles.settingsTabBtn, settingsTab === tab && styles.settingsTabBtnActive]}
                    onPress={() => setSettingsTab(tab)}
                  >
                    <Text style={[styles.settingsTabBtnText, settingsTab === tab && styles.settingsTabBtnTextActive]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {settingsTab === 'General Settings' && (
                <View style={styles.settingsCard}>
                  <Text style={styles.settingsSectionTitle}>Platform Information & Preferences</Text>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Platform Name</Text>
                    <TextInput style={styles.inputBoxText} value="Platinum Software" />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Platform Description</Text>
                    <TextInput style={styles.inputBoxText} value="AI Chatbot Platform for Businesses" />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Support Email</Text>
                    <TextInput style={styles.inputBoxText} value="support@platinumsoftware.com" />
                  </View>
                  <View style={styles.formGroup}>
                    <Text style={styles.formLabel}>Default Time Zone</Text>
                    <TextInput style={styles.inputBoxText} value="Asia/Kolkata (IST) (UTC+05:30)" />
                  </View>
                  <TouchableOpacity style={styles.saveSettingsBtn}>
                    <Text style={styles.saveSettingsBtnText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
              )}

              {settingsTab === 'Role Management' && (
                <View style={styles.settingsCard}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Text style={styles.settingsSectionTitle}>Role-Based Access Control</Text>
                    <TouchableOpacity style={styles.addPrimaryBtn} onPress={() => setShowAddRoleModal(true)}>
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
                  <RoleRow name="Admin" desc="Platform administration and management access." status="Active" />
                  <RoleRow name="Client Admin" desc="Administration access for client organization." status="Active" />
                  <RoleRow name="Client User" desc="Standard user access for client organization." status="Active" />
                </View>
              )}

              {settingsTab === 'System Configuration' && (
                <View style={styles.settingsCard}>
                  <Text style={styles.settingsSectionTitle}>Application-Level Configuration</Text>
                  <Text style={styles.settingsSectionSub}>Session timeouts, rate limits, and LLM retry policies.</Text>
                  <View style={styles.sysConfigRow}>
                    <Text style={styles.sysConfigLabel}>Session Timeout Duration</Text>
                    <Text style={styles.sysConfigValue}>60 Minutes</Text>
                  </View>
                  <View style={styles.sysConfigRow}>
                    <Text style={styles.sysConfigLabel}>Max Daily API Ingestion Quota</Text>
                    <Text style={styles.sysConfigValue}>500 MB / Organization</Text>
                  </View>
                  <View style={styles.sysConfigRow}>
                    <Text style={styles.sysConfigLabel}>Default Temperature</Text>
                    <Text style={styles.sysConfigValue}>0.2 (Factually Grounded)</Text>
                  </View>
                </View>
              )}

              {settingsTab === 'Appearance & Branding' && (
                <View style={styles.settingsCard}>
                  <Text style={styles.settingsSectionTitle}>Customize Platform Appearance & Branding</Text>
                  <Text style={styles.settingsSectionSub}>Update colors, logos, and UI appearance.</Text>
                  <View style={styles.brandingRow}>
                    <Text style={styles.brandingLabel}>Primary Brand Color</Text>
                    <View style={styles.colorPreviewBox}>
                      <View style={[styles.colorSwatch, { backgroundColor: '#0056FF' }]} />
                      <Text style={styles.colorHex}>#0056FF (Electric Blue)</Text>
                    </View>
                  </View>
                  <View style={styles.brandingRow}>
                    <Text style={styles.brandingLabel}>Platform Logo</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <MaterialCommunityIcons name="hexagon-multiple" size={30} color="#0056FF" />
                      <TouchableOpacity style={styles.uploadSmallBtn}>
                        <Text style={styles.uploadSmallBtnText}>Change Logo</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>

      {/* ADD CLIENT MODAL */}
      {showAddClientModal && (
        <Modal transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Client</Text>
                <TouchableOpacity onPress={() => setShowAddClientModal(false)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 420 }}>
                <Text style={styles.modalSectionLabel}>Company Information</Text>
                <TextInput style={styles.modalInput} placeholder="Company Name *" />
                <TextInput style={styles.modalInput} placeholder="Industry (e.g. IT Services)" />
                <TextInput style={styles.modalInput} placeholder="Company Size (e.g. 51-200 employees)" />
                <TextInput style={styles.modalInput} placeholder="Website URL" />

                <Text style={[styles.modalSectionLabel, { marginTop: 14 }]}>Contact Information</Text>
                <TextInput style={styles.modalInput} placeholder="Contact Person Name *" />
                <TextInput style={styles.modalInput} placeholder="Email Address *" />
                <TextInput style={styles.modalInput} placeholder="Phone Number" />

                <Text style={[styles.modalSectionLabel, { marginTop: 14 }]}>Subscription Details</Text>
                <TextInput style={styles.modalInput} placeholder="Select Plan (Gold, Silver, Platinum)" />
              </ScrollView>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddClientModal(false)}>
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSubmitBtn} onPress={() => setShowAddClientModal(false)}>
                  <Text style={styles.modalSubmitBtnText}>Create Client</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* ADD PLAN MODAL */}
      {showAddPlanModal && (
        <Modal transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Subscription Plan</Text>
                <TouchableOpacity onPress={() => setShowAddPlanModal(false)}>
                  <Feather name="x" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 420 }}>
                <TextInput style={styles.modalInput} placeholder="Plan Name *" />
                <TextInput style={styles.modalInput} placeholder="Price (e.g. ₹19,999/mo) *" />
                <TextInput style={styles.modalInput} placeholder="Max Queries per Month *" />
                <TextInput style={styles.modalInput} placeholder="Max Users Allowed *" />
                <TextInput style={styles.modalInput} placeholder="Storage Limit (GB) *" />
                <TextInput style={styles.modalInput} placeholder="Key Features (comma separated)" />
              </ScrollView>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowAddPlanModal(false)}>
                  <Text style={styles.modalCancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSubmitBtn} onPress={() => setShowAddPlanModal(false)}>
                  <Text style={styles.modalSubmitBtnText}>Create Plan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

// Helpers
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

function KPICard({ title, value, trend, sub, color }) {
  return (
    <View style={styles.kpiCard}>
      <Text style={styles.kpiTitle}>{title}</Text>
      <View style={styles.kpiValueRow}>
        <Text style={styles.kpiValue}>{value}</Text>
        <View style={[styles.kpiTrendBadge, { backgroundColor: color + '15' }]}>
          <Text style={[styles.kpiTrendText, { color }]}>{trend}</Text>
        </View>
      </View>
      <Text style={styles.kpiSub}>{sub}</Text>
    </View>
  );
}

function LegendItem({ label, count, color }) {
  return (
    <View style={styles.legendRow}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
      <Text style={styles.legendCount}>{count}</Text>
    </View>
  );
}

function TableRow({ company, docs, queries, status, color }) {
  return (
    <View style={styles.tr}>
      <Text style={[styles.tdBold, { flex: 1.5 }]}>{company}</Text>
      <Text style={[styles.td, { flex: 1 }]}>{docs}</Text>
      <Text style={[styles.td, { flex: 1 }]}>{queries}</Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.statusDot, { backgroundColor: color }]} />
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
    </View>
  );
}

function ClientRow({ name, contact, plan, status, users, end, color }) {
  return (
    <View style={styles.tr}>
      <Text style={[styles.tdBold, { flex: 1.5 }]}>{name}</Text>
      <Text style={[styles.td, { flex: 1.2 }]}>{contact}</Text>
      <View style={[styles.planBadge, { flex: 1 }]}>
        <Text style={styles.planBadgeText}>{plan}</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.statusDot, { backgroundColor: color }]} />
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
      <Text style={[styles.td, { flex: 1 }]}>{users}</Text>
      <Text style={[styles.td, { flex: 1.2 }]}>{end}</Text>
      <View style={{ flex: 0.8, flexDirection: 'row', gap: 6 }}>
        <TouchableOpacity><Text style={styles.actionLink}>View</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.actionLink}>Edit</Text></TouchableOpacity>
      </View>
    </View>
  );
}

function PlanCard({ name, price, billing, desc, queries, features, clients, status, badge }) {
  return (
    <View style={styles.planBox}>
      {badge && <View style={styles.popularBadge}><Text style={styles.popularBadgeText}>{badge}</Text></View>}
      <Text style={styles.planName}>{name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginVertical: 8 }}>
        <Text style={styles.planPrice}>{price}</Text>
        <Text style={styles.planBilling}>{billing}</Text>
      </View>
      <Text style={styles.planDesc}>{desc}</Text>
      <View style={styles.planDivider} />
      <Text style={styles.planQueries}>{queries}</Text>
      <View style={{ gap: 6, marginVertical: 12 }}>
        {features.map((f, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="check" size={13} color="#10B981" style={{ marginRight: 6 }} />
            <Text style={styles.planFeatureText}>{f}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.planClientsFooter}>Clients Using: <Text style={{ fontWeight: '700', color: '#0F172A' }}>{clients}</Text></Text>
    </View>
  );
}

function SubRow({ id, client, plan, start, end, status, amount, color }) {
  return (
    <View style={styles.tr}>
      <Text style={[styles.tdBold, { flex: 1 }]}>{id}</Text>
      <Text style={[styles.td, { flex: 1.5 }]}>{client}</Text>
      <Text style={[styles.td, { flex: 1 }]}>{plan}</Text>
      <Text style={[styles.td, { flex: 1.2 }]}>{start}</Text>
      <Text style={[styles.td, { flex: 1.2 }]}>{end}</Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.statusDot, { backgroundColor: color }]} />
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
      <Text style={[styles.tdBold, { flex: 1 }]}>{amount}</Text>
      <View style={{ flex: 0.8 }}>
        <TouchableOpacity><Text style={styles.actionLink}>View</Text></TouchableOpacity>
      </View>
    </View>
  );
}

function ImportRow({ id, client, source, files, date, status, color, onSelect }) {
  return (
    <View style={styles.tr}>
      <Text style={[styles.tdBold, { flex: 1.2 }]}>{id}</Text>
      <Text style={[styles.td, { flex: 1.5 }]}>{client}</Text>
      <Text style={[styles.td, { flex: 1 }]}>{source}</Text>
      <Text style={[styles.td, { flex: 0.8 }]}>{files}</Text>
      <Text style={[styles.td, { flex: 1.2 }]}>{date}</Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.statusDot, { backgroundColor: color }]} />
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
      <TouchableOpacity style={{ flex: 0.8 }} onPress={onSelect}>
        <Text style={styles.actionLink}>View</Text>
      </TouchableOpacity>
    </View>
  );
}

function ReportRow({ client, questions, users, latency, status, color }) {
  return (
    <View style={styles.tr}>
      <Text style={[styles.tdBold, { flex: 1.5 }]}>{client}</Text>
      <Text style={[styles.td, { flex: 1 }]}>{questions}</Text>
      <Text style={[styles.td, { flex: 1 }]}>{users}</Text>
      <Text style={[styles.td, { flex: 1 }]}>{latency}</Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.statusDot, { backgroundColor: color }]} />
        <Text style={[styles.statusText, { color }]}>{status}</Text>
      </View>
    </View>
  );
}

function RoleRow({ name, desc, status }) {
  return (
    <View style={styles.tr}>
      <Text style={[styles.tdBold, { flex: 1.2 }]}>{name}</Text>
      <Text style={[styles.td, { flex: 2 }]}>{desc}</Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
        <Text style={[styles.statusText, { color: '#10B981' }]}>{status}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity><Text style={styles.actionLink}>Edit Role</Text></TouchableOpacity>
      </View>
    </View>
  );
}

function getSidebarIcon(name) {
  switch (name) {
    case 'Dashboard': return 'view-dashboard-outline';
    case 'Clients': return 'domain';
    case 'Plans': return 'card-account-details-outline';
    case 'Subscriptions': return 'credit-card-outline';
    case 'LLM Data Import': return 'database-arrow-up-outline';
    case 'Reports': return 'chart-box-outline';
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
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 42,
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
  paneFooterText: {
    color: '#475569',
    fontSize: 12,
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
  rememberForgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  rememberBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: '#0056FF',
    borderColor: '#0056FF',
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
  securityWarningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 8,
    padding: 10,
  },
  securityWarningText: {
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

  /* DASHBOARD MAIN STYLES */
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
    gap: 8,
  },
  dashLogoText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  dashSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 380,
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
  adminAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminAvatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
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
    fontSize: 26,
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
    marginBottom: 8,
  },
  kpiValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  kpiValue: {
    fontSize: 24,
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
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tableTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  viewAllLink: {
    fontSize: 12.5,
    color: '#0056FF',
    fontWeight: '600',
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
  planBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  planBadgeText: {
    fontSize: 11,
    color: '#0056FF',
    fontWeight: '700',
  },
  plansGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  planBox: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#0056FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  planName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  planPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0056FF',
  },
  planBilling: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 4,
  },
  planDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  planDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  planQueries: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  planFeatureText: {
    fontSize: 12,
    color: '#64748B',
  },
  planClientsFooter: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
  },

  /* Settings Styles */
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
  settingsSectionSub: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
  },
  inputBoxText: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13.5,
    color: '#0F172A',
  },
  saveSettingsBtn: {
    backgroundColor: '#0056FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveSettingsBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  sysConfigRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sysConfigLabel: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  sysConfigValue: {
    fontSize: 13,
    color: '#0056FF',
    fontWeight: '700',
  },
  brandingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  brandingLabel: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
  },
  colorPreviewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  colorHex: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  uploadSmallBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  uploadSmallBtnText: {
    fontSize: 12,
    color: '#0056FF',
    fontWeight: '600',
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
    maxWidth: 520,
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
  modalSectionLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0056FF',
    marginBottom: 8,
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
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  chartFilter: {
    fontSize: 12,
    color: '#64748B',
  },
  growthChartMock: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 140,
    paddingTop: 10,
  },
  growthBarCol: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    width: 44,
  },
  growthBar: {
    width: 24,
    backgroundColor: '#DBEAFE',
    borderRadius: 6,
  },
  growthBarActive: {
    width: 24,
    backgroundColor: '#0056FF',
    borderRadius: 6,
  },
  growthMonth: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 8,
  },
  donutMock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 140,
  },
  donutCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 10,
    borderColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutTotal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  donutTotalLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  donutLegend: {
    gap: 6,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 11.5,
    color: '#475569',
  },
  legendCount: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 'auto',
  },
});
