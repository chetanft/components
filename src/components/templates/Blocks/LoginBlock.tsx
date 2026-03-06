"use client";

import React from 'react';
import { Card } from '../../organisms/Card';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography';
import { Input } from '../../atoms/Input';

export interface LoginBlockProps {
  onSubmit?: () => void;
}

export const LoginBlock: React.FC<LoginBlockProps> = ({ onSubmit }) => {
  return (
    <div className="flex justify-center p-[var(--spacing-x6)]">
      <div className="flex flex-col gap-[var(--spacing-x5)] w-full max-w-[22.5rem]">
        <div className="flex items-center gap-[var(--spacing-x2)] justify-center">
          <div className="w-6 h-6 rounded-lg bg-[var(--primary)] text-[var(--bg-primary)] flex items-center justify-center font-semibold">
            FT
          </div>
          <Typography variant="body-primary-medium" className="text-[var(--primary)]">
            FT Design System
          </Typography>
        </div>
        <Card>
          <div className="p-[var(--spacing-x5)] flex flex-col gap-[var(--spacing-x4)]">
            <div>
              <Typography variant="body-primary-medium" className="text-[var(--primary)] text-2xl">
                Welcome back
              </Typography>
              <Typography variant="body-secondary-regular" className="text-[var(--secondary)] text-sm">
                Enter your credentials to access your account
              </Typography>
            </div>
            <div className="flex flex-col gap-[var(--spacing-x4)]">
              <Input label="Email" type="email" placeholder="name@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <Button variant="primary" size="md" className="w-full" onClick={onSubmit}>
                Sign in
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
