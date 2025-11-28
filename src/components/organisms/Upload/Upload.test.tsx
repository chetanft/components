import React from 'react';
import { render } from '@testing-library/react';
import { Upload } from './Upload';

// Basic smoke test for Upload component
describe('Upload', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <Upload
          onFilesChange={() => {}}
          onUploadComplete={() => {}}
          onValidationComplete={() => {}}
        />
      );
    }).not.toThrow();
  });
});
