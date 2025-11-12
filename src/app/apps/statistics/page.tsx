"use client";
import { MenuPopup } from '@/components';
import { useEffect, useRef, useState } from 'react';

function page() {
    const ref = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [height, setHeight] = useState(900);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      console.log('Received message:', e.data, 'from origin:', e.origin);
      // Allow messages from the statistics system or same origin
      if (e.origin !== origin && !e.origin.includes('unche.or.ug')) {
        console.log('Message rejected due to origin mismatch');
        return;
      }
      const { type, payload } = e.data || {};
      if (type === 'iframe:ready') setReady(true);
      if (type === 'iframe:resize' && typeof payload?.height === 'number') {
        setHeight(Math.max(500, Math.min(payload.height, 3000)));
      }
    };
    
    // Set ready to true after a timeout if no message is received
    const timeout = setTimeout(() => {
      console.log('Setting ready to true due to timeout');
      setReady(true);
    }, 5000);
    
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      clearTimeout(timeout);
    };
  }, [origin]);

  return (
    <main className="p-0">
      {!ready && <div className="p-4 text-sm">Loading Statistics…</div>}
      <iframe
        ref={ref}
        title="NCHE Statistics"
        src="/_apps/statistics/" // proxied to https://statistics.unche.or.ug/
        sandbox="allow-scripts allow-same-origin allow-forms"
        style={{ width: '100%', height, border: 0, display: ready ? 'block' : 'none' }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => {
          console.log('Statistics iframe loaded');
          setReady(true);
        }}
      />
      <MenuPopup />
    </main>

  )
}

export default page