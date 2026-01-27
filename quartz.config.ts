import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Emberfall",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://randomvsstuff.github.io/site/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Uncial Antiqua",
        body: "Crimson Text",
        code: "Jacquard 24",
      },
      colors: {
        lightMode: {
          light: "#f4f1e8",
          lightgray: "#d9d0c1",
          gray: "#7a6f5d",
          darkgray: "#5a4f3f",
          dark: "#3a3025",
          secondary: "#8b6239",
          tertiary: "#a67c52",
          highlight: "rgba(165, 124, 82, 0.12)",
          textHighlight: "rgba(222, 184, 135, 0.35)",
        },
        darkMode: {
          light: "#2a2a2a",
          lightgray: "#3d3d3d",
          gray: "#a8a8a8",
          darkgray: "#d4d0c8",
          dark: "#f0ead6",
          secondary: "#c4a57b",
          tertiary: "#d4b896",
          highlight: "rgba(212, 165, 116, 0.1)",
          textHighlight: "rgba(255, 228, 181, 0.2)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.HardLineBreaks(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
      
    ],
  },
}

export default config
