import { createPortal } from "react-dom"
import { useEffect, useRef } from "react"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRoot = document.getElementById("modal-root")
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const focusableSelectors = [
      "button",
      "a[href]",
      "input",
      "textarea",
      "select",
      "[tabindex]:not([tabindex='-1'])",
    ]

    const focusableElements =
      modalRef.current.querySelectorAll<HTMLElement>(
        focusableSelectors.join(",")
      )

    if (focusableElements.length === 0) return

    const firstEl = focusableElements[0]
    const lastEl = focusableElements[focusableElements.length - 1]

    firstEl.focus()

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }

    document.addEventListener("keydown", handleTab)

    return () => {
      document.removeEventListener("keydown", handleTab)
    }
  }, [isOpen])

  if (!isOpen || !modalRoot) return null

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  )
}