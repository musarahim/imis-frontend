import LicensingPreliminaryReviewPage from "@/components/licensing/LicensingPreliminaryReviewPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LicensingPreliminaryReviewPage applicationType="odai-provisional" id={Number(id)} />;
}
