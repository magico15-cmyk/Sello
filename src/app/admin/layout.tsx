import React from 'react';
import DashboardShell from '@/components/admin/DashboardShell';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}
