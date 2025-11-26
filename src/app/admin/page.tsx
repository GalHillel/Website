import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import { contentService } from "@/services/contentService";
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your portfolio content.',
};

export default async function AdminPage() {
  const content = await contentService.getAllContent();

  return (
    <main className="container mx-auto py-10">
      <AdminDashboardClient initialContent={content} />
    </main>
  );
}
