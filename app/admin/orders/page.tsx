'use client';

import { useState } from 'react';
import { XCircle } from 'lucide-react';
import { DataTable } from '@/components/admin';
import { formatPrice } from '@/lib/utils';

const mockOrders = [
  { id: 'ORD-001', customerName: 'أحمد محمد', customerPhone: '0933123456', city: 'حمص', total: 3200000, status: 'pending', paymentMethod: 'cash', createdAt: '2024-01-15' },
  { id: 'ORD-002', customerName: 'خالد العلي', customerPhone: '0933987654', city: 'الوعر', total: 1500000, status: 'confirmed', paymentMethod: 'transfer', createdAt: '2024-01-14' },
  { id: 'ORD-003', customerName: 'سارة أحمد', customerPhone: '0933567890', city: 'الخالدية', total: 850000, status: 'shipped', paymentMethod: 'cash', createdAt: '2024-01-13' },
  { id: 'ORD-004', customerName: 'محمد حسين', customerPhone: '0933345678', city: 'حمص', total: 2100000, status: 'delivered', paymentMethod: 'cash', createdAt: '2024-01-12' },
  { id: 'ORD-005', customerName: 'ليلى سالم', customerPhone: '0933789012', city: 'العاصي', total: 580000, status: 'cancelled', paymentMethod: 'transfer', createdAt: '2024-01-11' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: 'قيد الانتظار', color: 'bg-amber-100 text-amber-700' },
  confirmed: { label: 'مؤكد', color: 'bg-blue-100 text-blue-700' },
  processing: { label: 'قيد المعالجة', color: 'bg-purple-100 text-purple-700' },
  shipped: { label: 'تم الشحن', color: 'bg-indigo-100 text-indigo-700' },
  delivered: { label: 'تم التوصيل', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-700' },
};

const paymentConfig: Record<string, string> = {
  cash: 'نقدي',
  transfer: 'تحويل بنكي',
  card: 'بطاقة',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const updateStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">الطلبات</h1>
          <p className="text-gray-500 text-sm">إدارة طلبات العملاء</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'الكل', value: orders.length, color: 'bg-gray-100 text-gray-700' },
          { label: 'قيد الانتظار', value: orders.filter((o) => o.status === 'pending').length, color: 'bg-amber-100 text-amber-700' },
          { label: 'تم التوصيل', value: orders.filter((o) => o.status === 'delivered').length, color: 'bg-green-100 text-green-700' },
          { label: 'ملغي', value: orders.filter((o) => o.status === 'cancelled').length, color: 'bg-red-100 text-red-700' },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      <DataTable
        columns={[
          { key: 'id', label: 'رقم الطلب' },
          { key: 'customerName', label: 'العميل' },
          { key: 'customerPhone', label: 'الهاتف' },
          { key: 'city', label: 'المدينة' },
          {
            key: 'total',
            label: 'المجموع',
            render: (v) => <span className="font-semibold">{formatPrice(v)}</span>,
          },
          {
            key: 'status',
            label: 'الحالة',
            render: (v) => {
              const config = statusConfig[v] || { label: v, color: 'bg-gray-100 text-gray-700' };
              return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
            },
          },
          {
            key: 'paymentMethod',
            label: 'الدفع',
            render: (v) => <span className="text-sm">{paymentConfig[v] || v}</span>,
          },
          { key: 'createdAt', label: 'التاريخ' },
        ]}
        data={orders}
        onView={(row) => setSelectedOrder(row)}
        itemsPerPage={10}
      />

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">تفاصيل الطلب {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"><XCircle className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">العميل:</span><span className="font-semibold">{selectedOrder.customerName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">الهاتف:</span><span dir="ltr">{selectedOrder.customerPhone}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">المدينة:</span><span>{selectedOrder.city}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">المجموع:</span><span className="font-bold text-primary-600">{formatPrice(selectedOrder.total)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">طريقة الدفع:</span><span>{paymentConfig[selectedOrder.paymentMethod]}</span></div>
              <div className="border-t pt-3 mt-3">
                <p className="text-gray-500 mb-2">تغيير الحالة:</p>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <button key={key} onClick={() => { updateStatus(selectedOrder.id, key); setSelectedOrder(null); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${config.color} hover:opacity-80 transition-opacity`}>
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
