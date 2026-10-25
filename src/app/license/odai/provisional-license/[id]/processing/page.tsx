import LicensingProcessingPage from "@/components/licensing/LicensingProcessingPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LicensingProcessingPage applicationType="odai-provisional" id={Number(id)} />;
}
