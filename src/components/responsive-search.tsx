'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { useRouter } from 'next/navigation';

// 搜索结果类型
interface SearchResult {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export function ResponsiveSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 搜索功能
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    api: '/api/search',
  });

  // 处理搜索提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.data && query.data.length > 0) {
      const firstResult = query.data[0];
      // 检查是否是对象且有 url 属性
      if (typeof firstResult === 'object' && firstResult !== null && 'url' in firstResult) {
        router.push((firstResult as SearchResult).url);
        setIsOpen(false);
        setSearch('');
      }
    }
  };

  // 处理结果点击
  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    setSearch('');
  };

  // 获取有效的搜索结果
  const getResults = (): SearchResult[] => {
    if (!query.data || query.data === 'empty') return [];
    return query.data.filter((item): item is SearchResult => 
      typeof item === 'object' && item !== null && 'url' in item
    );
  };

  const results = getResults();

  // 手机端：点击放大镜展开搜索框
  if (isMobile) {
    return (
      <div className="relative flex items-center">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="打开搜索"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
        ) : (
          <div className="fixed inset-0 top-14 bg-background z-50 p-4 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <form onSubmit={handleSubmit} className="w-full">
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="搜索文档..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </form>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearch('');
                }}
                className="p-2 rounded-lg hover:bg-accent"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            
            {/* 搜索结果 */}
            {results.length > 0 && (
              <div className="space-y-2">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="font-medium">
                      {result.title}
                    </div>
                    {result.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {result.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // 电脑端：直接显示搜索框（左侧带放大镜图标）
  return (
    <div className="relative w-64 lg:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索文档... (Ctrl K)"
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
      </form>
      
      {/* 下拉搜索结果 */}
      {search && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-background rounded-lg border border-input shadow-lg max-h-96 overflow-auto z-50">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className="w-full text-left px-4 py-2 hover:bg-accent transition-colors"
            >
              <div className="font-medium text-sm">
                {result.title}
              </div>
              {result.description && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  {result.description}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
