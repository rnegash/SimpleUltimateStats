import Link from "next/link";
import { copy } from "../assets/strings";

const DashboardPage = ({}) => {
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
                {copy.dashboardPage.subtitle}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/game"
                className="rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600"
              >
                {copy.dashboardPage.links.startGame}
              </Link>
              <Link
                href="#"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {copy.dashboardPage.links.pastGames}
              </Link>
              <Link
                href="#"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {copy.dashboardPage.links.addPlayers}
              </Link>
              <Link
                href="#"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {copy.dashboardPage.links.reports}
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Players</h2>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 font-medium text-slate-500">
                    Player
                  </th>
                  <th className="px-6 py-4 font-medium text-slate-500">
                    Position
                  </th>
                  <th className="px-6 py-4 font-medium text-slate-500">
                    Games
                  </th>
                  <th className="px-6 py-4 font-medium text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="px-6 py-5 text-slate-900">
                    {" "}
                    {copy.dashboardPage.playersList.emptyState}
                  </td>
                  <td className="px-6 py-5 text-slate-500">—</td>
                  <td className="px-6 py-5 text-slate-500">—</td>
                  <td className="px-6 py-5 text-slate-500">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
