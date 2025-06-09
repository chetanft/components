import { LogoName } from '../components/atoms/Logos';

export interface CompanyInfo {
  name: LogoName;
  displayName?: string;
}

// Legacy interface for backwards compatibility
export interface LegacyCompanyInfo {
  name: string;
  logoType: 'tata' | 'ft' | 'google' | 'vodafone' | 'airtel' | 'jio' | 'custom';
  colors?: {
    primary: string;
    secondary: string;
  };
  customLogo?: React.ReactNode;
} 