"use client";

import { MenuPopup } from '@/components';
import { useEffect, useRef, useState } from 'react';
function page() {
    const ref = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [height, setHeight] = useState(900);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      console.log('Received message:', e.data, 'from origin:', e.origin);
      // Allow messages from the OJS system or same origin
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
    }, 8000); // Increased timeout to allow for slower loading
    
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      clearTimeout(timeout);
    };
  }, [origin]);
  return (
    <main className="p-0">
      {!ready && !error && <div className="p-4 text-sm">Loading OJS…</div>}
      {error && (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg m-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                OJS System Access Issue
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Unable to load the OJS system. This may be due to SSL configuration or server issues.</p>
                <div className="mt-3 space-y-1">
                  <p>Try accessing OJS directly:</p>
                  <div className="space-x-2">
                    <a 
                      href="https://ojs.unche.or.ug" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium underline hover:text-yellow-600"
                    >
                      HTTPS Version
                    </a>
                    <span>|</span>
                    <a 
                      href="http://ojs.unche.or.ug" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium underline hover:text-yellow-600"
                    >
                      HTTP Version
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <iframe
        ref={ref}
        title="NCHE  Journal System"
        src="/_apps/ojs/" // proxied to https://ojs.unche.or.ug/
        sandbox="allow-scripts allow-same-origin allow-forms"
        style={{ width: '100%', height, border: 0, display: ready && !error ? 'block' : 'none' }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => {
          console.log('Iframe loaded');
          // Check if iframe content loaded successfully
          try {
            const iframeDoc = ref.current?.contentDocument;
            if (iframeDoc && iframeDoc.title.includes('400') || iframeDoc?.body?.innerText?.includes('Server host not allowed')) {
              setError('Server host not allowed - OJS system configuration issue');
            } else {
              setReady(true);
            }
          } catch (e) {
            // Cross-origin restrictions prevent checking content, assume it loaded
            setReady(true);
          }
        }}
        onError={() => {
          console.log('Iframe error');
          setError('Failed to load OJS system');
        }}
      />
     <MenuPopup />
    </main>
  )
}
export default page

