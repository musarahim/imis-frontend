// no "use client" here
import ActivationClient from "./ActivationClient";

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string; token: string }>;
}) {
  const { uid, token } = await params;
  return <ActivationClient uid={uid} token={token} />;
}
