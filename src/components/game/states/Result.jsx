import CricleCheck from "@/components/icons/CricleCheck"
import CricleXmark from "@/components/icons/CricleXmark"
import { SFX_RESULTS_SOUND } from "@/constants"
import { usePlayerContext } from "@/context/player"
import { useEffect } from "react"
import useSound from "use-sound"

export default function Result({
  data: { correct, message, points, myPoints, totalPlayer, rank, aheadOfMe },
}) {
  const { dispatch } = usePlayerContext()

  const [sfxResults] = useSound(SFX_RESULTS_SOUND, {
    volume: 0.2,
  })

  useEffect(() => {
    dispatch({
      type: "UPDATE",
      payload: { points: myPoints },
    })

    sfxResults()
  }, [sfxResults])

  return (
    <section className="anim-show relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center text-green-400">
      {correct ? (
        <CricleCheck className="aspect-square max-h-60 w-full text-green-500" />
      ) : (
        <CricleXmark className="aspect-square max-h-60 w-full text-red-500" />
      )}

      <h2 className="mt-1 text-4xl font-bold text-green-400 drop-shadow-lg">
        {message}
      </h2>

      <p className="mt-1 text-xl font-bold text-green-400 drop-shadow-lg">
        {`You are top ${rank}` + (aheadOfMe ? ", behind " + aheadOfMe : "")}
      </p>

      {correct && (
        <span className="mt-2 rounded border border-green-500 bg-black px-4 py-2 text-2xl font-bold text-green-400 shadow-lg shadow-green-500/50">
          +{points}
        </span>
      )}
    </section>
  )
}
