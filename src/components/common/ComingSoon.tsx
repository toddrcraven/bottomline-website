type ComingSoonProps = {
  title: string;
  description?: string;
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Wider max width + responsive padding for laptop-friendly, readable layout. */}
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
      <p className="mt-4 text-brandSlate">
        {description ?? "Content coming soon."}
      </p>
    </main>
  );
}
