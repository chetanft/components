export interface InspectorBox {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface InspectorContentBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface InspectorMeasurement {
  rootRect: DOMRect;
  hostRect: DOMRect;
  border: InspectorBox;
  padding: InspectorBox;
  gap: number;
  outer: InspectorBox;
  content: InspectorContentBox;
}

export interface InspectorViewOptions {
  scale?: number;
  highContrast?: boolean;
}

