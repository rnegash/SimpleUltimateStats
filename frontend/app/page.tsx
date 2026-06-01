import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="max-w-3xl w-full px-6 py-20">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            SimpleUltiStats
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 max-w-xl mb-8">
            Track and record ultimate frisbee game events—scores, pulls,
            turnovers—and save games for later analysis.
          </p>

          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Log in
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-zinc-200 dark:border-zinc-700"
            >
              Register
            </Link>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            Record mode supports score, pull, and turn events.
          </p>
        </div>
      </main>
    </div>
  );
}
