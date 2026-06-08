import { copy } from "../../assets/strings";

const PastGamesPage = ({}) => {
  const data = null;
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Games</h2>
        </div>
      </div>
      {!data ? (
        copy.dashboardPage.pastGamesPage.gameList.emptyState
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
            <thead className="bg-slate-50">
              <tr>
                {Object.values(
                  copy.dashboardPage.pastGamesPage.gameList.columns,
                ).map((column) => (
                  <th className="px-6 py-4 font-medium text-slate-500">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-5 text-slate-500">—</td>
                <td className="px-6 py-5 text-slate-500">—</td>
                <td className="px-6 py-5 text-slate-500">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default PastGamesPage;
