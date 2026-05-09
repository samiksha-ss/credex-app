import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const savings = searchParams.get('savings') || '0';
  const name = searchParams.get('name') || 'Your Team';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #e5e7eb 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e5e7eb 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: '40px 60px',
            borderRadius: '24px',
            border: '2px solid #10b981',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#10b981', borderRadius: '8px', marginRight: '12px' }} />
            <span style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '-0.05em' }}>credex</span>
          </div>
          
          <div style={{ fontSize: '24px', color: '#6b7280', marginBottom: '10px' }}>
            AI Spend Audit for {name}
          </div>
          
          <div style={{ fontSize: '64px', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>
            Saved ${savings}/mo
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#10b981', padding: '12px 24px', borderRadius: '9999px' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Run your audit at credex.app</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
