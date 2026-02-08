// components/comments.tsx
'use client';

import { useEffect, useRef } from 'react';

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // 加载 Waline JS
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';
      
      init({
        el: '#waline',
        serverURL: 'https://comment.wangjb.appinn.me',
        lang: 'zh-CN',
      });
    `;

    ref.current.appendChild(script);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, []);

  return <div id="waline" ref={ref} />;
}

:root {
  --waline-border: none;
  --waline-box-shadow: 0 12px 40px rgb(134 151 168 / 25%);
}

@media (prefers-color-scheme: dark) {
  body {
    --waline-box-shadow: 0 12px 40px #0f0e0d;
  }
}
