import 'chart.js';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    ftBulletTargetMarker?: {
      target?: number;
    };
  }

  interface ChartDatasetProperties<TType extends ChartType, TData> {
    ftGlow?: boolean;
  }
}
