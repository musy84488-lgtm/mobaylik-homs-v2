import { AdminSidebar, AdminHeader } from '@/components/admin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <AdminSidebar />
      <div className="mr-64 min-h-screen">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
