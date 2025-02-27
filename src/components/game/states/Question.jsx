import { SFX_SHOW_SOUND } from "@/constants"
import { useEffect } from "react"
import useSound from "use-sound"

export default function Question({ data: { question, image, cooldown } }) {
  const [sfxShow] = useSound(SFX_SHOW_SOUND, { volume: 0.5 })

  useEffect(() => {
    sfxShow()
  }, [sfxShow])

  return (
    <section className="relative mx-auto flex h-full w-full max-w-7xl flex-1 flex-col items-center px-4 text-green-400">
      <div className="flex flex-1 flex-col items-center justify-center gap-5">
        <h2 className="anim-show text-center text-3xl font-bold text-green-400 drop-shadow-lg md:text-4xl lg:text-5xl">
          {question}
        </h2>

        {!!image && (
          <img
            src={image}
            className="h-48 max-h-60 w-auto rounded-md border-4 border-green-500 shadow-lg shadow-green-500/50"
          />
        )}
      </div>

      <div
        className="mb-20 h-4 self-start justify-self-end rounded-full bg-green-500 shadow-lg shadow-green-500/50"
        style={{ animation: `progressBar ${cooldown}s linear forwards` }}
      ></div>
    </section>
  )
}
