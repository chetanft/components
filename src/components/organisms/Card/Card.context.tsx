"use client";

import React from 'react';

interface CardContextValue {
    size: 'sm' | 'md' | 'lg';
    loading: boolean;
}

const CardContext = React.createContext<CardContextValue | null>(null);

/**
 * Hook to access Card context
 * @returns Card context value or null if used outside Card
 */
export const useCardContext = () => React.useContext(CardContext);

export interface CardProviderProps {
    children: React.ReactNode;
    value: CardContextValue;
}

export const CardProvider: React.FC<CardProviderProps> = ({ children, value }) => (
    <CardContext.Provider value={value}>
        {children}
    </CardContext.Provider>
);
