"use client";

import React from 'react';
import { Icon } from '../../atoms/Icons';
import { useRateContext } from './RateContext';

export interface RateIconProps {
  /**
   * Fill state of the icon
   */
  fillState?: 'full' | 'half' | 'empty';
  /**
   * Icon index (0-based)
   */
  index: number;
}

/**
 * RateIcon Component
 *
 * A composable component for star icons in a Rate component.
 * Typically used within RateItem.
 *
 * @public
 *
 * @example
 * ```tsx
 * <RateItem index={0}>
 *   <RateIcon fillState="full" index={0} />
 * </RateItem>
 * ```
 *
 * @remarks
 * - Automatically styled based on fill state.
 * - Uses Icon component with star icon by default.
 * - Supports custom characters via Rate context.
 */
export const RateIcon: React.FC<RateIconProps> = ({ fillState = 'empty', index }) => {
  const {
    character,
    size,
    activeColor,
    inactiveColor,
  } = useRateContext();
  
  const sizeConfig = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
  };
  
  const iconSize = sizeConfig[size];
  const activeStyle = activeColor || 'var(--warning)';
  const inactiveStyle = inactiveColor || 'var(--border-primary)';
  
  // Get character
  const getCharacter = () => {
    if (typeof character === 'function') {
      return character({ index });
    }
    if (character) {
      return character;
    }
    return <Icon name="star" size={iconSize} />;
  };
  
  const starChar = getCharacter();
  
  return (
    <>
      {/* Background star (inactive) */}
      <span style={{ color: inactiveStyle }}>
        {starChar}
      </span>
      
      {/* Foreground star (active) - full or half */}
      {fillState !== 'empty' && (
        <span
          className="absolute top-0 left-0 overflow-hidden"
          style={{
            color: activeStyle,
            width: fillState === 'half' ? '50%' : '100%',
          }}
        >
          {starChar}
        </span>
      )}
    </>
  );
};

RateIcon.displayName = 'RateIcon';

