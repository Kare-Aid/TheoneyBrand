import { Fragment } from "react/jsx-runtime"

type Props = { number: number }

function SkeletonLoaders({ number }: Props) {
  return (
    <Fragment>
      {Array.from({ length: number }).map((_, index) => (
        <div className="sm:max-w-[450px] space-y-1 sm:space-y-2" key={index}>
          <div className="bg-slate-400 animate-pulse h-48 sm:h-56 rounded-2xl" />
          <div className="flex justify-between">
            <div className="space-y-1 w-5/12">
              <div className="bg-slate-400 w-full animate-pulse h-3 sm:h-4 rounded-full" />
              <div className="bg-slate-400 w-11/12 animate-pulse h-3 sm:h-4 rounded-full" />
            </div>
            <div className="bg-slate-400 w-2/5 sm:w-1/3 animate-pulse h-4 sm:h-6 rounded-full" />
          </div>
          <div className="bg-slate-400 animate-pulse h-5 sm:h-8 rounded-full" />
        </div>
      ))}
    </Fragment>
  )
}

export default SkeletonLoaders
