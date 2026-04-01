import { getChartGlowTokens } from './chartConfig';

describe('getChartGlowTokens', () => {
  it('returns fallback chart glow tokens when CSS variables are unavailable', () => {
    expect(getChartGlowTokens()).toEqual({
      blurSm: '8px',
      blurMd: '16px',
      blurLg: '24px',
      alphaPrimary: 0.32,
      alphaSecondary: 0.18,
    });
  });
});
