"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { IconName } from '../../atoms/Icons';
import { Alert, AlertVariant } from '../Alert';

export interface NotificationConfig {
  key?: string;
  message: string;
  description?: React.ReactNode;
  type?: AlertVariant;
  duration?: number;
  icon?: IconName;
  closable?: boolean;
  onClose?: () => void;
}

interface NotificationItem extends NotificationConfig {
  key: string;
  visible: boolean;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  addNotification: (config: NotificationConfig) => string;
  removeNotification: (key: string) => void;
  clearAll: () => void;
}

const NotificationContext = React.createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

/**
 * Notification Provider component built using FT Design System tokens.
 * Figma design not available - component created based on design system specifications.
 */
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = (config: NotificationConfig): string => {
    const key = config.key || `notification-${Date.now()}-${Math.random()}`;
    const duration = config.duration ?? 4500;

    const newNotification: NotificationItem = {
      ...config,
      key,
      visible: true,
      type: config.type || 'info',
    };

    setNotifications((prev) => [...prev, newNotification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(key);
      }, duration);
    }

    return key;
  };

  const removeNotification = (key: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.key === key ? { ...notif, visible: false } : notif
      )
    );

    // Remove from DOM after animation
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.key !== key));
    }, 300);
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, clearAll }}
    >
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};

interface NotificationContainerProps {
  notifications: NotificationItem[];
  onRemove: (key: string) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onRemove,
}) => {
  if (notifications.length === 0) return null;

  return (
    <div
      className="fixed top-[var(--spacing-x4)] right-[var(--spacing-x4)] z-50 flex flex-col gap-[var(--spacing-x2)] max-w-md"
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.key}
          notification={notification}
          onClose={() => onRemove(notification.key)}
        />
      ))}
    </div>
  );
};

interface NotificationItemProps {
  notification: NotificationItem;
  onClose: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification.visible) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [notification.visible]);

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      )}
    >
      <Alert
        variant={notification.type}
        title={notification.message}
        icon={notification.icon}
        closable={notification.closable !== false}
        onClose={onClose}
      >
        {notification.description}
      </Alert>
    </div>
  );
};

/**
 * Notification hook for easy access
 */
export const createNotification = () => {
  let context: NotificationContextType | null = null;

  return {
    setContext: (ctx: NotificationContextType) => {
      context = ctx;
    },
    success: (message: string, description?: React.ReactNode, config?: Partial<NotificationConfig>) => {
      context?.addNotification({ ...config, message, description, type: 'success' });
    },
    error: (message: string, description?: React.ReactNode, config?: Partial<NotificationConfig>) => {
      context?.addNotification({ ...config, message, description, type: 'danger' });
    },
    warning: (message: string, description?: React.ReactNode, config?: Partial<NotificationConfig>) => {
      context?.addNotification({ ...config, message, description, type: 'warning' });
    },
    info: (message: string, description?: React.ReactNode, config?: Partial<NotificationConfig>) => {
      context?.addNotification({ ...config, message, description, type: 'info' });
    },
  };
};
