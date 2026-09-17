import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

const STEPS = [
  {
    id: 1,
    number: '01',
    title: 'Upload Knowledge',
    shortDesc: 'Connect enterprise policies, documents, and databases.',
    badge: 'Multi-format ingestion',
    icon: 'cloud-upload-outline',
    color: '#0056FF',
    bgColor: '#EFF6FF',
    details: [
      'Ingest PDFs, Word docs, Notion pages, Confluence, and internal wikis.',
      'Automatic parsing with OCR for scanned files and tables.',
      'Strict tenant data isolation and access boundary verification.',
    ],
    previewType: 'upload',
  },
  {
    id: 2,
    number: '02',
    title: 'AI Processes',
    shortDesc: 'Validates, indexes, and prepares your data securely.',
    badge: 'Vector Embeddings & RAG',
    icon: 'brain',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    details: [
      'High-dimension semantic vector embeddings with smart chunking.',
      'Document deduplication and incremental sync upon file updates.',
      'Your private data is never used to train public foundation models.',
    ],
    previewType: 'process',
  },
  {
    id: 3,
    number: '03',
    title: 'Integrate',
    shortDesc: 'Connect into your intranet, Slack, Teams, or custom apps.',
    badge: 'REST API & Webhooks',
    icon: 'code-tags',
    color: '#10B981',
    bgColor: '#ECFDF5',
    details: [
      'Plug-and-play JavaScript and React Native widget snippets.',
      'Tenant-specific API keys with granular rate-limiting controls.',
      'Enterprise SSO (SAML, Okta, Google Workspace, Azure AD) ready.',
    ],
    previewType: 'integrate',
  },
  {
    id: 4,
    number: '04',
    title: 'Get Answers',
    shortDesc: 'Deliver instant, verified answers with source citations.',
    badge: '100% Citation Backed',
    icon: 'chat-processing-outline',
    color: '#0284C7',
    bgColor: '#F0F9FF',
    details: [
      'Sub-second query response time with exact document page citations.',
      'Role-based answer filtering (employees only see authorized docs).',
      'Confidence scoring with human-in-the-loop escalation pathways.',
    ],
    previewType: 'answers',
  },
];

export default function HowItWorks() {
  const { width } = useWindowDimensions();
  const isMobile = width < 860;
  const [activeStepId, setActiveStepId] = useState(1);

  const activeStep = STEPS.find((s) => s.id === activeStepId) || STEPS[0];

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={styles.taglineBadge}>
          <Feather name="zap" size={14} color="#0056FF" style={{ marginRight: 6 }} />
          <Text style={styles.tagline}>HOW IT WORKS</Text>
        </View>
        <Text style={styles.title}>From Your Knowledge to Real Answers</Text>
        <Text style={styles.subtitle}>
          A simple, enterprise-grade architecture to transform scattered company documentation
          into an intelligent, conversational knowledge layer.
        </Text>
      </View>

      {/* Interactive Step Selector Tabs */}
      <View style={[styles.stepsTabsContainer, isMobile && styles.stepsTabsContainerMobile]}>
        {STEPS.map((step, index) => {
          const isActive = step.id === activeStepId;
          return (
            <React.Fragment key={step.id}>
              <TouchableOpacity
                style={[
                  styles.stepTab,
                  isActive && styles.stepTabActive,
                  isActive && { borderColor: step.color },
                ]}
                onPress={() => setActiveStepId(step.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.stepNumberBadge, { backgroundColor: isActive ? step.color : '#F1F5F9' }]}>
                  <Text style={[styles.stepNumberText, { color: isActive ? '#FFFFFF' : '#64748B' }]}>
                    {step.number}
                  </Text>
                </View>

                <View style={styles.stepTabInfo}>
                  <Text style={[styles.stepTabTitle, isActive && { color: step.color }]}>
                    {step.title}
                  </Text>
                  <Text style={styles.stepTabDesc} numberOfLines={1}>
                    {step.shortDesc}
                  </Text>
                </View>
              </TouchableOpacity>

              {index < STEPS.length - 1 && !isMobile && (
                <View style={styles.stepArrowDivider}>
                  <Feather name="chevron-right" size={20} color="#CBD5E1" />
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Active Step Deep-Dive Showcase Card */}
      <View style={[styles.showcaseCard, isMobile && styles.showcaseCardMobile]}>
        {/* Left Side: Step Details */}
        <View style={[styles.showcaseLeft, isMobile && styles.showcaseFullWidth]}>
          <View style={[styles.showcaseBadge, { backgroundColor: activeStep.bgColor }]}>
            <MaterialCommunityIcons name={activeStep.icon} size={18} color={activeStep.color} />
            <Text style={[styles.showcaseBadgeText, { color: activeStep.color }]}>
              {activeStep.badge}
            </Text>
          </View>

          <Text style={styles.showcaseTitle}>
            Step {activeStep.number}: {activeStep.title}
          </Text>

          <Text style={styles.showcaseDesc}>{activeStep.shortDesc}</Text>

          <View style={styles.bulletList}>
            {activeStep.details.map((point, idx) => (
              <View key={idx} style={styles.bulletRow}>
                <View style={[styles.bulletIconCircle, { backgroundColor: activeStep.color }]}>
                  <Feather name="check" size={12} color="#FFFFFF" />
                </View>
                <Text style={styles.bulletText}>{point}</Text>
              </View>
            ))}
          </View>

          {/* Step Carousel Navigation Controls */}
          <View style={styles.stepCarouselControlRow}>
            <TouchableOpacity
              style={[
                styles.stepNavBtn,
                activeStep.id === 1 && styles.stepNavBtnDisabled,
              ]}
              onPress={() => {
                setActiveStepId((prev) => (prev > 1 ? prev - 1 : 4));
              }}
              activeOpacity={0.8}
            >
              <Feather name="chevron-left" size={18} color={activeStep.id === 1 ? '#94A3B8' : '#0F172A'} />
              <Text style={[styles.stepNavBtnText, activeStep.id === 1 && { color: '#94A3B8' }]}>
                Previous Step
              </Text>
            </TouchableOpacity>

            <View style={styles.stepDotsGroup}>
              {STEPS.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  onPress={() => setActiveStepId(s.id)}
                  style={[
                    styles.stepIndicatorDot,
                    s.id === activeStepId && [styles.stepIndicatorDotActive, { backgroundColor: activeStep.color }],
                  ]}
                  activeOpacity={0.8}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[styles.stepNavBtn, styles.stepNavBtnNext, { backgroundColor: activeStep.color }]}
              onPress={() => {
                setActiveStepId((prev) => (prev < 4 ? prev + 1 : 1));
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.stepNavBtnNextText}>
                {activeStep.id === 4 ? 'Restart (Step 1)' : 'Next Step'}
              </Text>
              <Feather name="chevron-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Side: Interactive Mock Visual for the selected step */}
        <View style={[styles.showcaseRight, isMobile && styles.showcaseFullWidth]}>
          {activeStep.previewType === 'upload' && <UploadPreview />}
          {activeStep.previewType === 'process' && <ProcessPreview />}
          {activeStep.previewType === 'integrate' && <IntegratePreview />}
          {activeStep.previewType === 'answers' && <AnswersPreview />}
        </View>
      </View>
    </View>
  );
}

// 1. Upload Preview Component
function UploadPreview() {
  return (
    <View style={styles.previewBox}>
      <View style={styles.previewHeader}>
        <Feather name="folder" size={16} color="#0056FF" />
        <Text style={styles.previewHeaderTitle}>Knowledge Ingestion Queue</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Syncing</Text>
        </View>
      </View>

      <View style={styles.fileCard}>
        <MaterialCommunityIcons name="file-pdf-box" size={28} color="#EF4444" />
        <View style={styles.fileDetails}>
          <Text style={styles.fileName}>Leave_and_Attendance_Policy_2026.pdf</Text>
          <Text style={styles.fileMeta}>PDF • 1.2 MB • Human Resources</Text>
        </View>
        <View style={styles.statusPillSuccess}>
          <Text style={styles.statusPillText}>Processed</Text>
        </View>
      </View>

      <View style={styles.fileCard}>
        <MaterialCommunityIcons name="file-word-box" size={28} color="#2563EB" />
        <View style={styles.fileDetails}>
          <Text style={styles.fileName}>IT_Security_Compliance_SOP.docx</Text>
          <Text style={styles.fileMeta}>DOCX • 3.4 MB • Engineering</Text>
        </View>
        <View style={styles.statusPillSuccess}>
          <Text style={styles.statusPillText}>Processed</Text>
        </View>
      </View>

      <View style={styles.fileCard}>
        <MaterialCommunityIcons name="file-excel-box" size={28} color="#10B981" />
        <View style={styles.fileDetails}>
          <Text style={styles.fileName}>Travel_Expense_Rates_Global.xlsx</Text>
          <Text style={styles.fileMeta}>Excel • 840 KB • Finance</Text>
        </View>
        <View style={styles.statusPillProcessing}>
          <Text style={styles.statusPillTextProcessing}>Indexing...</Text>
        </View>
      </View>

      <View style={styles.dropZoneMock}>
        <Feather name="upload-cloud" size={22} color="#0056FF" />
        <Text style={styles.dropZoneText}>Drag & drop more documents to ingest</Text>
      </View>
    </View>
  );
}

// 2. Process Preview Component
function ProcessPreview() {
  return (
    <View style={styles.previewBox}>
      <View style={styles.previewHeader}>
        <MaterialCommunityIcons name="brain" size={16} color="#7C3AED" />
        <Text style={styles.previewHeaderTitle}>Neural Vector Embedding Engine</Text>
        <View style={[styles.liveIndicator, { backgroundColor: '#F5F3FF' }]}>
          <Text style={[styles.liveText, { color: '#7C3AED' }]}>Encrypted</Text>
        </View>
      </View>

      <View style={styles.pipelineSteps}>
        <PipelineNode
          step="01"
          label="Document Ingestion"
          metric="3,480 chunks extracted"
          status="Done"
          color="#7C3AED"
        />
        <PipelineNode
          step="02"
          label="Semantic Embedding"
          metric="1536-dim vector space"
          status="Done"
          color="#7C3AED"
        />
        <PipelineNode
          step="03"
          label="Tenant-Isolated Index"
          metric="AES-256 encrypted vector partition"
          status="Active"
          color="#10B981"
        />
      </View>

      <View style={styles.encryptionNotice}>
        <Feather name="shield" size={16} color="#10B981" style={{ marginRight: 8 }} />
        <Text style={styles.encryptionNoticeText}>
          Private VPC isolation: Zero data retention on third-party LLMs
        </Text>
      </View>
    </View>
  );
}

function PipelineNode({ step, label, metric, status, color }) {
  return (
    <View style={styles.pipelineNode}>
      <View style={[styles.nodeStepNum, { backgroundColor: color }]}>
        <Text style={styles.nodeStepNumText}>{step}</Text>
      </View>
      <View style={styles.nodeInfo}>
        <Text style={styles.nodeLabel}>{label}</Text>
        <Text style={styles.nodeMetric}>{metric}</Text>
      </View>
      <View style={styles.nodeStatusBadge}>
        <Text style={[styles.nodeStatusText, { color }]}>{status}</Text>
      </View>
    </View>
  );
}

// 3. Integrate Preview Component
function IntegratePreview() {
  return (
    <View style={styles.previewBox}>
      <View style={styles.previewHeader}>
        <Feather name="terminal" size={16} color="#10B981" />
        <Text style={styles.previewHeaderTitle}>cURL / REST API Integration</Text>
        <View style={[styles.liveIndicator, { backgroundColor: '#ECFDF5' }]}>
          <Text style={[styles.liveText, { color: '#10B981' }]}>v1.0 Ready</Text>
        </View>
      </View>

      <View style={styles.codeSnippetBox}>
        <Text style={styles.codeComment}># 1. Query the authenticated Platinum AI endpoint</Text>
        <Text style={styles.codeLine}>
          <Text style={styles.codeMethod}>curl</Text> -X POST https://api.platinum.ai/v1/chat \
        </Text>
        <Text style={styles.codeLine}>  -H "Authorization: Bearer <Text style={styles.codeVar}>pk_live_94827...</Text>" \</Text>
        <Text style={styles.codeLine}>  -H "Content-Type: application/json" \</Text>
        <Text style={styles.codeLine}>{"  -d '{"}</Text>
        <Text style={styles.codeLine}>    "client_id": "<Text style={styles.codeString}>technova_001</Text>",</Text>
        <Text style={styles.codeLine}>    "message": "<Text style={styles.codeString}>What is the leave policy?</Text>"</Text>
        <Text style={styles.codeLine}>{"  }'"}</Text>
      </View>

      <View style={styles.sdkBadgesRow}>
        <Text style={styles.sdkBadge}>Python SDK</Text>
        <Text style={styles.sdkBadge}>Node.js</Text>
        <Text style={styles.sdkBadge}>React Native</Text>
        <Text style={styles.sdkBadge}>REST API</Text>
      </View>
    </View>
  );
}

// 4. Answers Preview Component
function AnswersPreview() {
  return (
    <View style={styles.previewBox}>
      <View style={styles.previewHeader}>
        <MaterialCommunityIcons name="robot" size={16} color="#0056FF" />
        <Text style={styles.previewHeaderTitle}>Real-time Verified Response</Text>
        <View style={styles.liveIndicator}>
          <Text style={styles.liveText}>99.8% Confident</Text>
        </View>
      </View>

      {/* User Query Mock */}
      <View style={styles.mockUserMessage}>
        <Text style={styles.mockUserQuery}>"How many paid leaves can an employee take annually?"</Text>
      </View>

      {/* Bot Response Mock with Citations */}
      <View style={styles.mockBotResponseCard}>
        <View style={styles.mockBotHeader}>
          <MaterialCommunityIcons name="check-decagram" size={18} color="#0056FF" />
          <Text style={styles.mockBotHeaderText}>Verified from company records</Text>
        </View>
        <Text style={styles.mockBotText}>
          Employees are entitled to <Text style={{ fontWeight: '700' }}>12 paid leaves</Text> per calendar year, accrued monthly. Unused leaves may carry over up to a maximum of 5 days.
        </Text>

        <View style={styles.citationBadge}>
          <Feather name="file-text" size={12} color="#0056FF" style={{ marginRight: 6 }} />
          <Text style={styles.citationText}>Source: Leave Policy 2026 • Section 3.1, Page 4</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 44,
    maxWidth: 760,
  },
  taglineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 14,
  },
  tagline: {
    color: '#0056FF',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 26,
  },

  /* Step Selector Tabs */
  stepsTabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1100,
    marginBottom: 36,
  },
  stepsTabsContainerMobile: {
    flexDirection: 'column',
    gap: 12,
  },
  stepTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    cursor: 'pointer',
  },
  stepTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  stepNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 13,
    fontWeight: '800',
  },
  stepTabInfo: {
    flex: 1,
  },
  stepTabTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  stepTabDesc: {
    fontSize: 11.5,
    color: '#64748B',
  },
  stepArrowDivider: {
    paddingHorizontal: 8,
  },

  /* Showcase Card */
  showcaseCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 32,
    maxWidth: 1100,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 8,
    alignItems: 'center',
    gap: 36,
  },
  showcaseCardMobile: {
    flexDirection: 'column',
    padding: 20,
    gap: 24,
  },
  showcaseLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  showcaseRight: {
    flex: 1.1,
    width: '100%',
  },
  showcaseFullWidth: {
    width: '100%',
  },
  showcaseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 14,
    gap: 6,
  },
  showcaseBadgeText: {
    fontSize: 12.5,
    fontWeight: '700',
  },
  showcaseTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  showcaseDesc: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 20,
  },
  bulletList: {
    width: '100%',
    marginBottom: 28,
    gap: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletIconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 13.5,
    color: '#334155',
    lineHeight: 22,
    flex: 1,
  },
  stepCarouselControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
    flexWrap: 'wrap',
    gap: 12,
  },
  stepNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    cursor: 'pointer',
    gap: 4,
  },
  stepNavBtnDisabled: {
    opacity: 0.6,
  },
  stepNavBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  stepDotsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stepIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    cursor: 'pointer',
  },
  stepIndicatorDotActive: {
    width: 20,
    borderRadius: 4,
  },
  stepNavBtnNext: {
    borderWidth: 0,
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  stepNavBtnNextText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  /* Preview Container */
  previewBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    width: '100%',
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 16,
  },
  previewHeaderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
    marginLeft: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0056FF',
  },
  liveText: {
    fontSize: 11,
    color: '#0056FF',
    fontWeight: '600',
  },

  /* File items for Upload */
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    marginBottom: 8,
  },
  fileDetails: {
    flex: 1,
    marginLeft: 10,
  },
  fileName: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#0F172A',
  },
  fileMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  statusPillSuccess: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusPillText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '600',
  },
  statusPillProcessing: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusPillTextProcessing: {
    fontSize: 11,
    color: '#0056FF',
    fontWeight: '600',
  },
  dropZoneMock: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 6,
    gap: 4,
  },
  dropZoneText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },

  /* Process Preview */
  pipelineSteps: {
    gap: 10,
    marginBottom: 14,
  },
  pipelineNode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 10,
  },
  nodeStepNum: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  nodeStepNumText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  nodeInfo: {
    flex: 1,
  },
  nodeLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  nodeMetric: {
    fontSize: 11,
    color: '#64748B',
  },
  nodeStatusBadge: {
    paddingHorizontal: 6,
  },
  nodeStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  encryptionNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  encryptionNoticeText: {
    fontSize: 11.5,
    color: '#065F46',
    fontWeight: '600',
    flex: 1,
  },

  /* Integrate Preview */
  codeSnippetBox: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  codeComment: {
    color: '#64748B',
    fontSize: 11,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  codeLine: {
    color: '#F8FAFC',
    fontSize: 11.5,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  codeMethod: {
    color: '#38BDF8',
    fontWeight: '700',
  },
  codeVar: {
    color: '#F43F5E',
  },
  codeString: {
    color: '#34D399',
  },
  sdkBadgesRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  sdkBadge: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '600',
  },

  /* Answers Preview */
  mockUserMessage: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignSelf: 'flex-end',
    maxWidth: '90%',
  },
  mockUserQuery: {
    color: '#0056FF',
    fontSize: 12.5,
    fontWeight: '600',
  },
  mockBotResponseCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  mockBotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  mockBotHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0056FF',
  },
  mockBotText: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 20,
    marginBottom: 10,
  },
  citationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  citationText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
});
