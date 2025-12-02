import React from 'react';
import { ClipboardList } from 'lucide-react';

export function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-xl border-x border-gray-100">
            <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <ClipboardList className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 leading-none">Attendance</h1>
                        <p className="text-[10px] font-medium text-gray-500">Daily</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-4 overflow-y-auto">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 p-4 text-center text-xs text-gray-400">
                Attendance Keeper &copy; {new Date().getFullYear()}
            </footer>
        </div>
    );
}
