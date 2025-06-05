import React from 'react';
export interface UploadZoneProps extends React.HTMLAttributes<HTMLDivElement> {
    onFileSelect?: (files: FileList) => void;
    acceptedFileTypes?: string[];
    maxFileSize?: number;
    disabled?: boolean;
    multiple?: boolean;
}
export declare const UploadZone: React.ForwardRefExoticComponent<UploadZoneProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=UploadZone.d.ts.map