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
  | 'shadowfax';

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
    default:
      console.warn(`Logo "${name}" not found`);
      return null;
  }
};

export default Logo; 