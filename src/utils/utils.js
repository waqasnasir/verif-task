const focussableElements =
  'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])'

export const focusNextElement = () => {
  // add all elements we want to include in our selection
  if (document.activeElement) {
    const focussable = Array.from(document.querySelectorAll(focussableElements))
    const index = focussable.indexOf(document.activeElement)
    if (index > -1) {
      const nextElement = focussable[index + 1] || focussable[0]
      nextElement.focus()
    }
  }
}

export const focusPreviousElement = () => {
  // add all elements we want to include in our selection
  if (document.activeElement) {
    const focussable = Array.from(document.querySelectorAll(focussableElements))
    const index = focussable.indexOf(document.activeElement)
    if (index > -1) {
      const nextElement =
        focussable[index - 1] || focussable[focussable.length - 1]
      nextElement.focus()
    }
  }
}
