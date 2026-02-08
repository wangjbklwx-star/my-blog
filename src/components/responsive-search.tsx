'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { useRouter } from 'next/navigation';

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
      router.push(query.data[0].url);
      setIsOpen(false);
      setSearch('');
    }
  };

  // 手机端：点击放大镜展开搜索框
  if (isMobile) {
    return (
      <div className="relative flex items-center">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="打开搜索"
          >
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        ) : (
          <div className="fixed inset-0 top-16 bg-white dark:bg-gray-900 z-50 p-4 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <form onSubmit={handleSubmit} className="w-full">
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="搜索文档..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </form>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearch('');
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            {/* 搜索结果 */}
            {query.data && query.data !== 'empty' && (
              <div className="space-y-2">
                {query.data.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => {
                      router.push(result.url);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {result.title}
                    </div>
                    {result.description && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索文档... (Ctrl K)"
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </form>
      
      {/* 下拉搜索结果 */}
      {search && query.data && query.data !== 'empty' && (
        <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg max-h-96 overflow-auto z-50">
          {query.data.map((result) => (
            <button
              key={result.id}
              onClick={() => {
                router.push(result.url);
                setSearch('');
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                {result.title}
              </div>
              {result.description && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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
