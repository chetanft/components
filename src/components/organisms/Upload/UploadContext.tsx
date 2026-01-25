"use client";

import React, { createContext, useContext } from 'react';
import type { UploadFile } from '../../molecules/UploadItem';
import type { ValidationStats } from '../../molecules/FileValidationCard';

export type UploadType = 'drag-drop' | 'button' | 'thumbnail';

export interface UploadContextType {
  type: UploadType;
  files: UploadFile[];
  setFiles: (files: UploadFile[]) => void;
  maxFiles: number;
  acceptedFileTypes: string[];
  maxFileSize: number;
  multiple: boolean;
  showValidation: boolean;
  autoUpload: boolean;
  onFilesChange?: (files: UploadFile[]) => void;
  onUploadComplete?: (file: UploadFile) => void;
  onValidationComplete?: (file: UploadFile, stats?: ValidationStats) => void;
  handleFileSelect: (fileList: FileList) => void;
  handleDelete: (fileId: string) => void;
  handleRetry: (fileId: string) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of an Upload parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: UploadContextType = {
  type: 'drag-drop',
  files: [],
  setFiles: () => {},
  maxFiles: 10,
  acceptedFileTypes: [],
  maxFileSize: 10 * 1024 * 1024, // 10MB
  multiple: true,
  showValidation: false,
  autoUpload: false,
  onFilesChange: undefined,
  onUploadComplete: undefined,
  onValidationComplete: undefined,
  handleFileSelect: () => {},
  handleDelete: () => {},
  handleRetry: () => {},
};

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  
  if (!context) {
    return defaultContext;
  }
  return context;
};

export interface UploadProviderProps {
  value: UploadContextType;
  children: React.ReactNode;
}

export const UploadProvider: React.FC<UploadProviderProps> = ({ value, children }) => {
  return (
    <UploadContext.Provider value={value}>
      {children}
    </UploadContext.Provider>
  );
};

