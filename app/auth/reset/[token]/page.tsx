import ResetPasswordTokenPage from "./ResetForm";

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <ResetPasswordTokenPage token={token} />;
}
