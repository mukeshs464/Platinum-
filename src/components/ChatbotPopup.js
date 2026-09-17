import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { sendChatMessage } from '../services/aiChatService';

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'bot',
    timestamp: '10:24 AM',
    text: `Hello! 👋\nI can help you with your company's policies, HR information, IT support and more.\n\nWhat would you like to know?`,
  },
  {
    id: 'msg-2',
    sender: 'user',
    timestamp: '10:25 AM',
    text: 'What is the leave policy?',
  },
  {
    id: 'msg-3',
    sender: 'bot',
    timestamp: '10:25 AM',
    text: `According to the company's Leave Policy:\n• Employees are entitled to 12 paid leaves per year.\n• You can apply through the Leave & Attendance section in the application.\n• Approval is subject to your manager's confirmation.\n\nFor more details, please refer to the full document.`,
    attachment: {
      title: 'Leave Policy',
      type: 'PDF',
      size: '1.2 MB',
      url: '#',
    },
  },
];

const SUGGESTED_QUESTIONS = [
  'What is the leave policy?',
  'IT Support help',
  'Expense claim guidelines',
];

export default function ChatbotPopup({
  isOpen: externalIsOpen,
  onToggle: externalOnToggle,
  onClose: externalOnClose,
}) {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 540;

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const toggleChat = () => {
    if (externalOnToggle) {
      externalOnToggle(!isOpen);
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  };

  const closeChat = () => {
    if (externalOnClose) {
      externalOnClose();
    } else if (externalOnToggle) {
      externalOnToggle(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation values
  const animValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      Animated.spring(animValue, {
        toValue: 1,
        tension: 65,
        friction: 9,
        useNativeDriver: false,
      }).start();
      // Scroll to bottom after opening
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 150);
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen]);


  const handleSend = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Auto scroll down
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const response = await sendChatMessage(text, messages);
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "I'm having a brief issue connecting to the organizational repository. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [35, 0],
  });

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1],
  });

  const opacity = animValue.interpolate({
    inputRange: [0, 0.1, 1],
    outputRange: [0, 0.5, 1],
  });

  // Calculate dynamic dimensions
  const popupWidth = isMobile ? width - 32 : 410;
  const popupMaxHeight = isMobile ? height - 120 : Math.min(660, height - 110);

  return (
    <View style={[styles.fixedWrapper, { pointerEvents: 'box-none' }]}>
      {/* 1. CHATBOT POPUP WINDOW */}
      {isOpen && (
        <Animated.View
          style={[
            styles.popupWindow,
            {
              width: popupWidth,
              height: popupMaxHeight,
              opacity,
              transform: [{ translateY }, { scale }],
              right: 0,
              bottom: 74,
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.logoBadge}>
                <MaterialCommunityIcons name="hexagon-multiple" size={18} color="#0056FF" />
              </View>
              <View style={styles.headerTitleCol}>
                <Text style={styles.headerTitle}>Platinum AI Assistant</Text>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusText}>Online • Ready to help</Text>
                </View>
              </View>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={closeChat}
                style={styles.headerIconBtn}
                accessibilityLabel="Minimize AI Assistant"
              >
                <Feather name="minus" size={18} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeChat}
                style={styles.headerIconBtn}
                accessibilityLabel="Close AI Assistant"
              >
                <Feather name="x" size={18} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Suggestions */}
          <View style={styles.suggestionsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.suggestionsScroll}
            >
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.suggestionChip}
                  onPress={() => handleSend(q)}
                >
                  <Text style={styles.suggestionChipText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Conversation Area */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.chatScroll}
            contentContainerStyle={styles.chatScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.messageRow,
                  item.sender === 'user' ? styles.messageRowUser : styles.messageRowBot,
                ]}
              >
                {item.sender === 'bot' && (
                  <View style={styles.botAvatar}>
                    <MaterialCommunityIcons name="robot" size={16} color="#FFF" />
                  </View>
                )}

                <View
                  style={[
                    styles.bubble,
                    item.sender === 'user' ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.bubbleText,
                      item.sender === 'user' ? styles.userBubbleText : styles.botBubbleText,
                    ]}
                  >
                    {item.text}
                  </Text>

                  {/* Document Attachment Card */}
                  {item.attachment && (
                    <TouchableOpacity
                      style={styles.attachmentCard}
                      activeOpacity={0.8}
                    >
                      <View style={styles.attachmentIconBox}>
                        <MaterialCommunityIcons name="file-pdf-box" size={32} color="#EF4444" />
                      </View>
                      <View style={styles.attachmentDetails}>
                        <Text style={styles.attachmentTitle} numberOfLines={1}>
                          {item.attachment.title}
                        </Text>
                        <Text style={styles.attachmentMeta}>
                          {item.attachment.type} • {item.attachment.size}
                        </Text>
                      </View>
                      <View style={styles.downloadIconBox}>
                        <Feather name="download" size={18} color="#0056FF" />
                      </View>
                    </TouchableOpacity>
                  )}

                  <Text
                    style={[
                      styles.timestamp,
                      item.sender === 'user' ? styles.timestampUser : styles.timestampBot,
                    ]}
                  >
                    {item.timestamp}
                  </Text>
                </View>

                {item.sender === 'user' && (
                  <View style={styles.userAvatar}>
                    <Feather name="user" size={16} color="#FFF" />
                  </View>
                )}
              </View>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <View style={[styles.messageRow, styles.messageRowBot]}>
                <View style={styles.botAvatar}>
                  <MaterialCommunityIcons name="robot" size={16} color="#FFF" />
                </View>
                <View style={[styles.bubble, styles.botBubble, styles.typingBubble]}>
                  <Text style={styles.typingText}>Platinum AI is searching documents...</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Footer Input Area */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.attachmentBtn} activeOpacity={0.7}>
              <Feather name="paperclip" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Type your question here..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSend()}
              returnKeyType="send"
            />

            <TouchableOpacity
              style={[
                styles.sendBtn,
                !inputText.trim() && styles.sendBtnDisabled,
              ]}
              onPress={() => handleSend()}
              disabled={!inputText.trim() || isTyping}
              activeOpacity={0.8}
            >
              <Ionicons name="send" size={15} color="#FFF" style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* 2. FLOATING TRIGGER BUTTON */}
      <View style={styles.triggerContainer}>
        {/* Accessible Tooltip shown on hover/desktop */}
        {!isOpen && isHovered && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>Ask Platinum AI</Text>
            <View style={styles.tooltipArrow} />
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.floatingBtn,
            isOpen && styles.floatingBtnOpen,
            isHovered && styles.floatingBtnHovered,
          ]}
          onPress={toggleChat}
          activeOpacity={0.88}
          accessibilityLabel="Toggle Platinum AI Assistant"
          // @ts-ignore for web hover support
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isOpen ? (
            <Feather name="x" size={26} color="#FFFFFF" />
          ) : (
            <View style={styles.btnContent}>
              <MaterialCommunityIcons name="robot" size={28} color="#FFFFFF" />
              <View style={styles.onlineBadge} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedWrapper: {
    ...Platform.select({
      web: {
        position: 'fixed',
      },
      default: {
        position: 'absolute',
      },
    }),
    right: 24,
    bottom: 24,
    zIndex: 99999,
  },
  triggerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.38,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  floatingBtnHovered: {
    transform: [{ scale: 1.08 }],
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  floatingBtnOpen: {
    backgroundColor: '#1E293B',
    shadowColor: '#000000',
  },
  btnContent: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineBadge: {
    position: 'absolute',
    top: -2,
    right: -3,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#0056FF',
  },
  tooltip: {
    position: 'absolute',
    right: 72,
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tooltipArrow: {
    position: 'absolute',
    right: -5,
    top: '50%',
    marginTop: -5,
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#0F172A',
  },

  /* POPUP WINDOW */
  popupWindow: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 36,
    elevation: 24,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 99999,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerTitleCol: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },

  /* Suggestions */
  suggestionsContainer: {
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingVertical: 8,
  },
  suggestionsScroll: {
    paddingHorizontal: 16,
  },
  suggestionChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 8,
  },
  suggestionChipText: {
    fontSize: 12,
    color: '#0056FF',
    fontWeight: '500',
  },

  /* Conversation Area */
  chatScroll: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  chatScrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  messageRowBot: {
    justifyContent: 'flex-start',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
    shadowColor: '#0056FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 2,
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: 16,
    padding: 14,
  },
  botBubble: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  userBubble: {
    backgroundColor: '#EFF6FF',
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  bubbleText: {
    fontSize: 13.5,
    lineHeight: 21,
  },
  botBubbleText: {
    color: '#1E293B',
  },
  userBubbleText: {
    color: '#0056FF',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 6,
  },
  timestampBot: {
    color: '#94A3B8',
    alignSelf: 'flex-start',
  },
  timestampUser: {
    color: '#60A5FA',
    alignSelf: 'flex-end',
  },

  /* Document Attachment Card */
  attachmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  attachmentIconBox: {
    marginRight: 10,
  },
  attachmentDetails: {
    flex: 1,
  },
  attachmentTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  attachmentMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  downloadIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Typing */
  typingBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  typingText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },

  /* Footer */
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  attachmentBtn: {
    padding: 6,
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    paddingVertical: 6,
    paddingHorizontal: 8,
    outlineStyle: 'none', // Remove web outline
  },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  sendBtnDisabled: {
    backgroundColor: '#CBD5E1',
  },
});
