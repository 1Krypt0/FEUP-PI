/**
 * Applies custom tailwind classes to elements in the page according the theme
 */
export function setTheme (theme: string) {
  const accentFg = document.getElementsByClassName('accent-fg')
  const accentBg = document.getElementsByClassName('accent-bg')
  const accentB = document.getElementsByClassName('accent-b')
  const arrFg = Array.from(accentFg)
  const arrBg = Array.from(accentBg)
  const arrB = Array.from(accentB)
  arrFg.forEach(element => {
    element.classList.add('text-accent_' + theme)
  })
  arrBg.forEach(element => {
    element.classList.add('bg-accent_' + theme)
  })
  arrB.forEach(element => {
    element.classList.add('border-b-accent_' + theme)
  })
}
