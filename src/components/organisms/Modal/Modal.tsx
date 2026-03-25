"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

/**
 * Modal component props
 *
 * @public
 *
 * @example
 * ```tsx
 * <Modal open={open} onOpenChange={setOpen}>
 *   <ModalTrigger>
 *     <Button>Open Modal</Button>
 *   </ModalTrigger>
 *   <ModalContent>
 *     <ModalHeader>
 *       <ModalTitle>Confirm Action</ModalTitle>
 *       <ModalDescription>
 *         Are you sure you want to proceed?
 *       </ModalDescription>
 *       <ModalClose />
 *     </ModalHeader>
 *     <ModalBody>
 *       <p>Modal content goes here</p>
 *     </ModalBody>
 *     <ModalFooter>
 *       <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *     </ModalFooter>
 *   </ModalContent>
 * </Modal>
 * ```
 */
export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether modal is open/visible
   * @required
   */
  open: boolean;

  /**
   * Callback when modal open state changes
   * Use this for controlled modals
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Modal content
   * @required
   */
  children: React.ReactNode;
}

/**
 * Modal Component
 *
 * A composable modal dialog component that displays content in an overlay.
 * Uses sub-components (ModalTrigger, ModalContent, ModalHeader, etc.) for maximum flexibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from 'ft-design-system';
 *
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <Modal open={open} onOpenChange={setOpen}>
 *       <ModalTrigger>
 *         <Button>Open Modal</Button>
 *       </ModalTrigger>
 *       <ModalContent>
 *         <ModalHeader>
 *           <ModalTitle>Modal Title</ModalTitle>
 *           <ModalClose />
 *         </ModalHeader>
 *         <ModalBody>
 *           <p>Modal content goes here</p>
 *         </ModalBody>
 *         <ModalFooter>
 *           <Button onClick={() => setOpen(false)}>Close</Button>
 *         </ModalFooter>
 *       </ModalContent>
 *     </Modal>
 *   );
 * }
 * ```
 *
 * @remarks
 * - All sub-components (ModalTrigger, ModalContent, ModalHeader, etc.) support `asChild`
 * - Prevents body scroll when open
 * - Closes on ESC key press and backdrop click
 * - Accessible: includes ARIA attributes and focus management
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(({
  open,
  onOpenChange,
  children,
}, _ref) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  );
});

Modal.displayName = 'Modal';
