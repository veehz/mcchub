import AuthLayout from "./AuthLayout";

export default function FormLayout({
  children,
  title = "MCC",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <AuthLayout title={title}>
      <div className="max-w-md mx-auto flex">
        <div className="space-y-8 w-full">{children}</div>
      </div>
    </AuthLayout>
  );
}
