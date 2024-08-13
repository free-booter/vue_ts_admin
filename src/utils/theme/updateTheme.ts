import { ThemeEnum } from "@/enums/appEnum";

export async function updateTheme(mode: ThemeEnum = ThemeEnum.LIGHT) {
  const htmlRoot = document.getElementById('htmlRoot')
  if(!htmlRoot) return

  const hasDarkClass = htmlRoot.classList.contains('dark')
  if(mode === ThemeEnum.DARK) {
    htmlRoot.setAttribute('data-theme', 'dark')
    if(!hasDarkClass) {
      htmlRoot.classList.add('dark')
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light')
    if(hasDarkClass) {
      htmlRoot.classList.remove('dark')
    }
  }
}