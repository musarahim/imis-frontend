import LicensingProcessingPage from "@/components/licensing/LicensingProcessingPage";

export default async function Page({ searchParams }: {
  searchParams: Promise<{ queue?: string }>;
}) {
  const { queue } = await searchParams;
  return <LicensingProcessingPage applicationType="university-provisional" queue={queue} />;
}
