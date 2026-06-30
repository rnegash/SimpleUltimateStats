import Link from "next/link";
import { copy } from "../_assets/strings";
import { LinkButton } from "../_components/LinkButton";
import { LogoutButton } from "./_components/LogoutButton";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 px-4 py-10">
      <main className="mx-auto w-full max-w-5xl space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-sm uppercase tracking-[0.3em] text-sky-600/90">
                {copy.dashboardPage.title}
              </h1>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                <Link
                  className="underline hover:no-underline"
                  href={"/dashboard"}
                >
                  {copy.dashboardPage.subtitle}
                </Link>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <LinkButton href="/game" variant="primary">
                {copy.dashboardPage.links.startGame}
              </LinkButton>
              <LinkButton href="/dashboard/pastGames">
                {copy.dashboardPage.links.pastGames}
              </LinkButton>
              <LinkButton href="/dashboard/addPlayers">
                {copy.dashboardPage.links.addPlayers}
              </LinkButton>
              <LogoutButton />
              {/* <Link
                href="#"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {copy.dashboardPage.links.reports}
              </Link> */}
            </div>
          </div>
        </section>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
