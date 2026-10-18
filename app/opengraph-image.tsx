import { ImageResponse } from 'next/og';

export const alt = 'Flowint AI: AI automation for small businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        color: '#ffffff',
        background: 'linear-gradient(125deg, #6d4dff 0%, #8b3bf0 42%, #ff3d81 100%)',
      }}
    >
      <div style={{ display: 'flex', fontSize: 46, fontWeight: 800 }}>
        Flowint<span style={{ color: '#b6f03c' }}>.</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.03, letterSpacing: -2 }}>
          AI automation for small businesses
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: 'rgba(255,255,255,0.88)' }}>
          AI agents · Live dashboards · Google Sheets · GST invoicing · Data analysis
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          background: '#ffffff',
          color: '#6d4dff',
          fontSize: 30,
          fontWeight: 700,
          padding: '16px 34px',
          borderRadius: 999,
        }}
      >
        Book a free demo →
      </div>
    </div>,
    size,
  );
}
