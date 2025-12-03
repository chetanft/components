"use client";

import React, { createContext, useContext, useState } from 'react';
import type { UploadFile } from '../../molecules/UploadItem/UploadItem';
import type { ValidationStats } from '../../molecules/FileValidationCard/FileValidationCard';

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

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('Upload sub-components must be used within an Upload component');
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

