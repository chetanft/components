import React from 'react';
import { FTLogo } from './FTLogo';
import { FTLogoWhite } from './FTLogoWhite';
import { TataMotorsLogo } from './TataMotorsLogo';
import { MDCLabsLogo } from './MDCLabsLogo';
import { ShakthiLogisticsLogo } from './ShakthiLogisticsLogo';
import { GatiLogo } from './GatiLogo';
import { BirlaPivotLogo } from './BirlaPivotLogo';
import { DiageoLogo } from './DiageoLogo';
import { DiageoWhiteLogo } from './DiageoWhiteLogo';
import { JSWOneLogo } from './JSWOneLogo';
import { ShadowfaxLogo } from './ShadowfaxLogo';
import { DelhiveryLogo } from './DelhiveryLogo';
import { DHLLogo } from './DHLLogo';
import { KGCLogo } from './KGCLogo';
import { AvikamLogo } from './AvikamLogo';
import { SafexpressLogo } from './SafexpressLogo';
import { BluedartLogo } from './BluedartLogo';
import { TVSLogo } from './TVSLogo';
import { CriticalogLogo } from './CriticalogLogo';
import { MECLogo } from './MECLogo';
import { OMLogisticsLogo } from './OMLogisticsLogo';
import { ApolloTyresLogo } from './ApolloTyresLogo';
import { Slot, type ComposableProps } from '../../../lib/slot';

export type LogoName =
  | 'ft'
  | 'ft-white'
  | 'tata-motors'
  | 'mdc-labs'
  | 'shakthi-logistics'
  | 'gati'
  | 'birla-pivot'
  | 'diageo'
  | 'diageo-white'
  | 'jsw-one'
  | 'shadowfax'
  | 'delhivery'
  | 'dhl'
  | 'kgc'
  | 'avikam'
  | 'safexpress'
  | 'bluedart'
  | 'tvs'
  | 'criticalog'
  | 'mec'
  | 'om-logistics'
  | 'apollo-tyres';

interface LogoProps extends ComposableProps<'div'> {
  name: LogoName;
  width?: number;
  height?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  name, 
  width, 
  height, 
  className,
  asChild,
  ...props
}) => {
  const Comp = asChild ? Slot : 'div';
  
  switch (name) {
    case 'ft':
      return asChild ? (
        <Comp className={className} {...props}>
          <FTLogo width={width} height={height} />
        </Comp>
      ) : (
        <FTLogo width={width} height={height} className={className} />
      );
    case 'ft-white':
      return asChild ? (
        <Comp className={className} {...props}>
          <FTLogoWhite width={width} height={height} />
        </Comp>
      ) : (
        <FTLogoWhite width={width} height={height} className={className} />
      );
    case 'tata-motors':
      return asChild ? (
        <Comp className={className} {...props}>
          <TataMotorsLogo width={width} height={height} />
        </Comp>
      ) : (
        <TataMotorsLogo width={width} height={height} className={className} />
      );
    case 'mdc-labs':
      return asChild ? (
        <Comp className={className} {...props}>
          <MDCLabsLogo width={width} height={height} />
        </Comp>
      ) : (
        <MDCLabsLogo width={width} height={height} className={className} />
      );
    case 'shakthi-logistics':
      return asChild ? (
        <Comp className={className} {...props}>
          <ShakthiLogisticsLogo width={width} height={height} />
        </Comp>
      ) : (
        <ShakthiLogisticsLogo width={width} height={height} className={className} />
      );
    case 'gati':
      return asChild ? (
        <Comp className={className} {...props}>
          <GatiLogo width={width} height={height} />
        </Comp>
      ) : (
        <GatiLogo width={width} height={height} className={className} />
      );
    case 'birla-pivot':
      return asChild ? (
        <Comp className={className} {...props}>
          <BirlaPivotLogo width={width} height={height} />
        </Comp>
      ) : (
        <BirlaPivotLogo width={width} height={height} className={className} />
      );
    case 'diageo':
      return asChild ? (
        <Comp className={className} {...props}>
          <DiageoLogo width={width} height={height} />
        </Comp>
      ) : (
        <DiageoLogo width={width} height={height} className={className} />
      );
    case 'diageo-white':
      return asChild ? (
        <Comp className={className} {...props}>
          <DiageoWhiteLogo width={width} height={height} />
        </Comp>
      ) : (
        <DiageoWhiteLogo width={width} height={height} className={className} />
      );
    case 'jsw-one':
      return asChild ? (
        <Comp className={className} {...props}>
          <JSWOneLogo width={width} height={height} />
        </Comp>
      ) : (
        <JSWOneLogo width={width} height={height} className={className} />
      );
    case 'shadowfax':
      return asChild ? (
        <Comp className={className} {...props}>
          <ShadowfaxLogo width={width} height={height} />
        </Comp>
      ) : (
        <ShadowfaxLogo width={width} height={height} className={className} />
      );
    case 'delhivery':
      return asChild ? (
        <Comp className={className} {...props}>
          <DelhiveryLogo width={width} height={height} />
        </Comp>
      ) : (
        <DelhiveryLogo width={width} height={height} className={className} />
      );
    case 'dhl':
      return asChild ? (
        <Comp className={className} {...props}>
          <DHLLogo width={width} height={height} />
        </Comp>
      ) : (
        <DHLLogo width={width} height={height} className={className} />
      );
    case 'kgc':
      return asChild ? (
        <Comp className={className} {...props}>
          <KGCLogo width={width} height={height} />
        </Comp>
      ) : (
        <KGCLogo width={width} height={height} className={className} />
      );
    case 'avikam':
      return asChild ? (
        <Comp className={className} {...props}>
          <AvikamLogo width={width} height={height} />
        </Comp>
      ) : (
        <AvikamLogo width={width} height={height} className={className} />
      );
    case 'safexpress':
      return asChild ? (
        <Comp className={className} {...props}>
          <SafexpressLogo width={width} height={height} />
        </Comp>
      ) : (
        <SafexpressLogo width={width} height={height} className={className} />
      );
    case 'bluedart':
      return asChild ? (
        <Comp className={className} {...props}>
          <BluedartLogo width={width} height={height} />
        </Comp>
      ) : (
        <BluedartLogo width={width} height={height} className={className} />
      );
    case 'tvs':
      return asChild ? (
        <Comp className={className} {...props}>
          <TVSLogo width={width} height={height} />
        </Comp>
      ) : (
        <TVSLogo width={width} height={height} className={className} />
      );
    case 'criticalog':
      return asChild ? (
        <Comp className={className} {...props}>
          <CriticalogLogo width={width} height={height} />
        </Comp>
      ) : (
        <CriticalogLogo width={width} height={height} className={className} />
      );
    case 'mec':
      return asChild ? (
        <Comp className={className} {...props}>
          <MECLogo width={width} height={height} />
        </Comp>
      ) : (
        <MECLogo width={width} height={height} className={className} />
      );
    case 'om-logistics':
      return asChild ? (
        <Comp className={className} {...props}>
          <OMLogisticsLogo width={width} height={height} />
        </Comp>
      ) : (
        <OMLogisticsLogo width={width} height={height} className={className} />
      );
    case 'apollo-tyres':
      return asChild ? (
        <Comp className={className} {...props}>
          <ApolloTyresLogo width={width} height={height} />
        </Comp>
      ) : (
        <ApolloTyresLogo width={width} height={height} className={className} />
      );
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Logo "${name}" not found`);
      }
      return null;
  }
};

export default Logo; 