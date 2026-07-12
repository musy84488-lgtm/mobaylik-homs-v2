'use client';

import { Bell, Search, User } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث سريع..."
            className="h-9 pr-10 pl-4 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
          <Bell className="w-4 h-4 text-gray-600" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <User className="w-4 h-4 text-primary-600" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">المدير</p>
            <p className="text-[10px] text-gray-400">admin@mobaylik.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
