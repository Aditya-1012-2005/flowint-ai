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
        background: '#fbf9f3',
        color: '#1c1a15',
      }}
    >
      <div style={{ display: 'flex', fontSize: 44, fontWeight: 800 }}>
        Flowint<span style={{ color: '#1f7a4d' }}>.</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
          AI automation for small businesses
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: '#6d6555' }}>
          Inventory · GST invoicing · WhatsApp orders · AI data entry · Reports
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignSelf: 'flex-start',
          background: '#ff5c39',
          color: '#ffffff',
          fontSize: 30,
          fontWeight: 700,
          padding: '16px 32px',
          borderRadius: 999,
        }}
      >
        Book a free demo
      </div>
    </div>,
    size,
  );
}
