import { useEffect } from "react"

type UseClickOutsideParams = {
  ref: React.RefObject<HTMLElement | null>
  handler: () => void
}

export const useClickOutside = ({ ref, handler }: UseClickOutsideParams) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || !(event.target instanceof Node)) return

      if (!ref.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener("click", listener)

    return () => {
      document.removeEventListener("click", listener)
    }
  }, [ref, handler])
}