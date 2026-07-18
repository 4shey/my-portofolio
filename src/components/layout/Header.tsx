import { MagneticText } from '../ui/MagneticText'

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-8 py-6 text-light mix-blend-difference">
      <MagneticText className="font-body text-sm font-light tracking-[0.2em] uppercase">
        TA-2026
      </MagneticText>
      <MagneticText className="font-body text-sm font-light tracking-[0.2em] uppercase">
        MENU
      </MagneticText>
    </header>
  )
}
