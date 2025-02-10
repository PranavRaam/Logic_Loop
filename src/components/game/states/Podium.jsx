import Loader from "@/components/Loader"
import {
  SFX_PODIUM_FIRST,
  SFX_PODIUM_SECOND,
  SFX_PODIUM_THREE,
  SFX_SNEAR_ROOL,
} from "@/constants"
import useScreenSize from "@/hook/useScreenSize"
import clsx from "clsx"
import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti"
import useSound from "use-sound"

export default function Podium({ data: { subject, top } }) {
  const [apparition, setApparition] = useState(0)

  const { width, height } = useScreenSize()

  const [sfxtThree] = useSound(SFX_PODIUM_THREE, { volume: 0.2 })
  const [sfxSecond] = useSound(SFX_PODIUM_SECOND, { volume: 0.2 })
  const [sfxRool, { stop: sfxRoolStop }] = useSound(SFX_SNEAR_ROOL, { volume: 0.2 })
  const [sfxFirst] = useSound(SFX_PODIUM_FIRST, { volume: 0.2 })

  useEffect(() => {
    switch (apparition) {
      case 4:
        sfxRoolStop()
        sfxFirst()
        break
      case 3:
        sfxRool()
        break
      case 2:
        sfxSecond()
        break
      case 1:
        sfxtThree()
        break
    }
  }, [apparition, sfxFirst, sfxSecond, sfxtThree, sfxRool])

  useEffect(() => {
    if (top.length < 3) {
      setApparition(4)
      return
    }

    const interval = setInterval(() => {
      if (apparition > 4) {
        clearInterval(interval)
        return
      }
      setApparition((value) => value + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [apparition])

  return (
    <>
      {apparition >= 4 && (
        <ReactConfetti
          width={width}
          height={height}
          className="h-full w-full"
          colors={["#00ff00", "#111"]}
        />
      )}

      {apparition >= 3 && top.length >= 3 && (
        <div className="absolute min-h-screen w-full overflow-hidden">
          <div className="spotlight shadow-green-500/50"></div>
        </div>
      )}

      <section className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-between text-green-400">
        <h2 className="anim-show text-center text-3xl font-bold drop-shadow-lg md:text-4xl lg:text-5xl">
          {subject}
        </h2>

        <div className={`grid w-full max-w-[800px] flex-1 grid-cols-${top.length} items-end justify-center justify-self-end overflow-y-hidden overflow-x-visible`}>
          {top[1] && (
            <div className={clsx(
              "z-20 flex h-[50%] w-full translate-y-full flex-col items-center justify-center gap-3 opacity-0 transition-all",
              { "!translate-y-0 opacity-100": apparition >= 2 },
            )}>
              <p className="text-2xl font-bold drop-shadow-md">{top[1].username}</p>
              <div className="flex h-full w-full flex-col items-center gap-4 rounded-t-md bg-green-500 pt-6 text-center shadow-lg shadow-green-500/50">
                <p className="flex aspect-square h-14 items-center justify-center rounded-full border-4 border-green-400 bg-green-500 text-3xl font-bold text-black drop-shadow-md">
                  <span>2</span>
                </p>
                <p className="text-2xl font-bold">{top[1].points}</p>
              </div>
            </div>
          )}

          <div className={clsx(
            "z-30 flex h-[60%] w-full translate-y-full flex-col items-center gap-3 opacity-0 transition-all",
            { "!translate-y-0 opacity-100": apparition >= 3 },
            { "md:min-w-64": top.length < 2 },
          )}>
            <p className="text-2xl font-bold opacity-0 drop-shadow-md md:text-4xl { 'opacity-100': apparition >= 4 }">
              {top[0].username}
            </p>
            <div className="flex h-full w-full flex-col items-center gap-4 rounded-t-md bg-green-500 pt-6 text-center shadow-lg shadow-green-500/50">
              <p className="flex aspect-square h-14 items-center justify-center rounded-full border-4 border-green-400 bg-green-500 text-3xl font-bold text-black drop-shadow-md">
                <span>1</span>
              </p>
              <p className="text-2xl font-bold">{top[0].points}</p>
            </div>
          </div>

          {top[2] && (
            <div className={clsx(
              "z-10 flex h-[40%] w-full translate-y-full flex-col items-center gap-3 opacity-0 transition-all",
              { "!translate-y-0 opacity-100": apparition >= 1 },
            )}>
              <p className="text-2xl font-bold drop-shadow-md">{top[2].username}</p>
              <div className="flex h-full w-full flex-col items-center gap-4 rounded-t-md bg-green-500 pt-6 text-center shadow-lg shadow-green-500/50">
                <p className="flex aspect-square h-14 items-center justify-center rounded-full border-4 border-green-400 bg-green-500 text-3xl font-bold text-black drop-shadow-md">
                  <span>3</span>
                </p>
                <p className="text-2xl font-bold">{top[2].points}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
