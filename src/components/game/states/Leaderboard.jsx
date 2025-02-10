export default function Leaderboard({ data: { leaderboard } }) {
  return (
    <section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-2">
      <h2 className="mb-6 text-5xl font-bold text-green-400 drop-shadow-lg">
        Leaderboard
      </h2>
      <div className="flex w-full flex-col gap-2">
        {leaderboard.map(({ username, points }, key) => (
          <div
            key={key}
            className="flex w-full justify-between rounded-md bg-green-500 p-3 text-2xl font-bold text-black shadow-lg shadow-green-500/50"
          >
            <span className="drop-shadow-md text-green-900">{username}</span>
            <span className="drop-shadow-md text-green-900">{points}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
