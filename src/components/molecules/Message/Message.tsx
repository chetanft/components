"use client";

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading';

export interface MessageConfig {
  /** Message content */
  content: React.ReactNode;
  /** Duration in seconds (0 = no auto close) */
  duration?: number;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Unique key for updating/removing */
  key?: string | number;
  /** Callback when closed */
  onClose?: () => void;
  /** Additional className */
  className?: string;
}

interface MessageItem extends MessageConfig {
  id: string;
  type: MessageType;
}

// Message context for imperative API
interface MessageContextValue {
  addMessage: (type: MessageType, config: MessageConfig | string) => string;
  removeMessage: (id: string) => void;
}

const MessageContext = createContext<MessageContextValue | null>(null);

/**
 * Single message item component
 */
const MessageItem: React.FC<{
  item: MessageItem;
  onClose: (id: string) => void;
}> = ({ item, onClose }) => {
  const { id, type, content, duration = 3, icon, className } = item;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  // Type configurations using FT Design System tokens
  const typeConfig: Record<MessageType, {
    icon: IconName;
    color: string;
    bgColor: string;
    borderColor: string;
  }> = {
    info: {
      icon: 'alert-informational',
      color: 'var(--neutral)',
      bgColor: 'var(--neutral-light)',
      borderColor: 'var(--neutral)',
    },
    success: {
      icon: 'check',
      color: 'var(--positive)',
      bgColor: 'var(--positive-light)',
      borderColor: 'var(--positive)',
    },
    warning: {
      icon: 'triangle-alert',
      color: 'var(--warning)',
      bgColor: 'var(--warning-light)',
      borderColor: 'var(--warning)',
    },
    error: {
      icon: 'alert-critical',
      color: 'var(--critical)',
      bgColor: 'var(--critical-light)',
      borderColor: 'var(--critical)',
    },
    loading: {
      icon: 'loading',
      color: 'var(--primary)',
      bgColor: 'var(--bg-primary)',
      borderColor: 'var(--border-primary)',
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={cn(
        "flex items-center gap-[var(--x3)]",
        "px-[var(--x4)] py-[var(--x3)]",
        "rounded-[var(--radius-md)]",
        "shadow-lg",
        "animate-in fade-in slide-in-from-top-[var(--spacing-x2)] duration-200",
        className
      )}
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
      }}
      role="alert"
    >
      {/* Icon */}
      <span style={{ color: config.color }}>
        {icon || (
          <Icon
            name={config.icon}
            size={18}
            className={type === 'loading' ? 'animate-spin' : ''}
          />
        )}
      </span>

      {/* Content */}
      <span className="text-sm text-[var(--primary)] font-medium">
        {content}
      </span>

      {/* Close button (only for duration 0) */}
      {duration === 0 && (
        <button
          onClick={() => onClose(id)}
          className="ml-auto p-[var(--spacing-x1)] text-[var(--tertiary)] hover:text-[var(--primary)] transition-colors"
        >
          <Icon name="cross" size={14} />
        </button>
      )}
    </div>
  );
};

/**
 * Message container component
 */
export const MessageContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addMessage = useCallback((type: MessageType, config: MessageConfig | string): string => {
    const normalizedConfig: MessageConfig = typeof config === 'string'
      ? { content: config }
      : config;

    const id = normalizedConfig.key?.toString() || generateId();

    setMessages(prev => {
      // If key exists, update existing message
      if (normalizedConfig.key) {
        const existingIndex = prev.findIndex(m => m.key === normalizedConfig.key);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = { ...normalizedConfig, id, type };
          return updated;
        }
      }
      return [...prev, { ...normalizedConfig, id, type }];
    });

    return id;
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages(prev => {
      const message = prev.find(m => m.id === id);
      if (message?.onClose) {
        message.onClose();
      }
      return prev.filter(m => m.id !== id);
    });
  }, []);

  const contextValue: MessageContextValue = {
    addMessage,
    removeMessage,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
      {mounted && createPortal(
        <div
          className={cn(
            "fixed top-[var(--x4)] left-1/2 -translate-x-1/2",
            "z-[1080]",
            "flex flex-col items-center gap-[var(--x2)]",
            "pointer-events-none"
          )}
        >
          {messages.map(item => (
            <div key={item.id} className="pointer-events-auto">
              <MessageItem item={item} onClose={removeMessage} />
            </div>
          ))}
        </div>,
        document.body
      )}
    </MessageContext.Provider>
  );
};

/**
 * Hook to use message API
 */
export const useMessage = () => {
  const context = useContext(MessageContext);

  if (!context) {
    // Return no-op functions if not in provider
    return {
      info: () => '',
      success: () => '',
      warning: () => '',
      error: () => '',
      loading: () => '',
      destroy: () => { },
    };
  }

  return {
    info: (config: MessageConfig | string) => context.addMessage('info', config),
    success: (config: MessageConfig | string) => context.addMessage('success', config),
    warning: (config: MessageConfig | string) => context.addMessage('warning', config),
    error: (config: MessageConfig | string) => context.addMessage('error', config),
    loading: (config: MessageConfig | string) => context.addMessage('loading', config),
    destroy: (id: string) => context.removeMessage(id),
  };
};

/**
 * Static message methods (requires MessageContainer in app root)
 */
let staticContext: MessageContextValue | null = null;

export const setMessageContext = (context: MessageContextValue) => {
  staticContext = context;
};

/**
 * Message component with static methods
 * 
 * Usage:
 * 1. Wrap app with <MessageContainer>
 * 2. Use message.info('Hello'), message.success('Done'), etc.
 * 
 * Or use the useMessage() hook for React context-based API.
 */
export const message = {
  info: (config: MessageConfig | string) => staticContext?.addMessage('info', config) || '',
  success: (config: MessageConfig | string) => staticContext?.addMessage('success', config) || '',
  warning: (config: MessageConfig | string) => staticContext?.addMessage('warning', config) || '',
  error: (config: MessageConfig | string) => staticContext?.addMessage('error', config) || '',
  loading: (config: MessageConfig | string) => staticContext?.addMessage('loading', config) || '',
  destroy: (id: string) => staticContext?.removeMessage(id),
};

// Standalone Message component for direct rendering
export interface MessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  type?: MessageType;
  content: React.ReactNode;
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ type = 'info', content, icon, closable = false, onClose, className, ...props }, ref) => {
    const typeConfig: Record<MessageType, {
      icon: IconName;
      color: string;
      bgColor: string;
      borderColor: string;
    }> = {
      info: {
        icon: 'alert-informational',
        color: 'var(--neutral)',
        bgColor: 'var(--neutral-light)',
        borderColor: 'var(--neutral)',
      },
      success: {
        icon: 'check',
        color: 'var(--positive)',
        bgColor: 'var(--positive-light)',
        borderColor: 'var(--positive)',
      },
      warning: {
        icon: 'triangle-alert',
        color: 'var(--warning)',
        bgColor: 'var(--warning-light)',
        borderColor: 'var(--warning)',
      },
      error: {
        icon: 'alert-critical',
        color: 'var(--critical)',
        bgColor: 'var(--critical-light)',
        borderColor: 'var(--critical)',
      },
      loading: {
        icon: 'loading',
        color: 'var(--primary)',
        bgColor: 'var(--bg-primary)',
        borderColor: 'var(--border-primary)',
      },
    };

    const config = typeConfig[type];

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-[var(--x3)]",
          "px-[var(--x4)] py-[var(--x3)]",
          "rounded-[var(--radius-md)]",
          className
        )}
        style={{
          backgroundColor: config.bgColor,
          border: `1px solid ${config.borderColor}`,
        }}
        role="alert"
        {...props}
      >
        <span style={{ color: config.color }}>
          {icon || (
            <Icon
              name={config.icon}
              size={18}
              className={type === 'loading' ? 'animate-spin' : ''}
            />
          )}
        </span>
        <span className="text-sm text-[var(--primary)] font-medium flex-1">
          {content}
        </span>
        {closable && (
          <button
            onClick={onClose}
            className="p-1 text-[var(--tertiary)] hover:text-[var(--primary)] transition-colors"
          >
            <Icon name="cross" size={14} />
          </button>
        )}
      </div>
    );
  }
);

Message.displayName = 'Message';

