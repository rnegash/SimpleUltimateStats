import { BackToDashboard } from "./_components/BackToDashboard";

const GameLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <section className="flex justify-end">
          <BackToDashboard />
        </section>
        {children}
      </div>
    </div>
  );
};

export default GameLayout;
