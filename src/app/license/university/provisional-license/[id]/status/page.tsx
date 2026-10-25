import LicensingStatusPage from "@/components/licensing/LicensingStatusPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LicensingStatusPage applicationType="university-provisional" id={Number(id)} />;
}
