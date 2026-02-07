import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const title = searchParams.get('title');
  const description = searchParams.get('description');

  // 系统字体栈
  const fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';

  if (!title) {
    return new ImageResponse(
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          background: 'linear-gradient(to bottom, #5b90ff, #86e1fc)',
        }}
      >
        <div
          style={{
            backgroundColor: '#1e2030',
            color: '#c8d3f5',
            fontWeight: 600,
            display: 'flex',
            flexDirection: 'column',
            margin: '2rem',
            flexGrow: '1',
            borderRadius: '1rem',
            fontFamily,
          }}
        >
          <p
            style={{
              fontSize: 100,
              margin: 'auto',
            }}
          >
            wangjb.appinn.me
          </p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        // 不指定 fonts，使用系统默认
      },
    );
  }

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        background: 'linear-gradient(to bottom, #5b90ff, #86e1fc)',
      }}
    >
      <div
        style={{
          backgroundColor: '#1e2030',
          color: '#c8d3f5',
          fontWeight: 600,
          display: 'flex',
          flexDirection: 'column',
          margin: '2rem',
          flexGrow: '1',
          borderRadius: '1rem',
          fontFamily,
        }}
      >
        <p
          style={{
            fontSize: 50,
            margin: '2rem 4rem auto',
          }}
        >
          wangjb.appinn.me
        </p>
        <div
          style={{
            fontSize: 70,
            margin: '0 4rem',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            margin: 'auto 4rem 2rem',
          }}
        >
          {description}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      // 不指定 fonts，使用系统默认
    },
  );
};
