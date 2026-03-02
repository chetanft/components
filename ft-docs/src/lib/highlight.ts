import { codeToHtml } from "shiki"

export async function highlightCode(code: string, lang: string = "tsx"): Promise<string> {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  })
  return html
}
