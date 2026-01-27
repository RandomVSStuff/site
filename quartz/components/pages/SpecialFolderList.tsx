import { QuartzComponent, QuartzComponentProps } from "../../components/types"
import { QuartzPluginData } from "../../plugins/vfile"
import path from "path"

export default (() => {
  function SpecialFolderList({ fileData, allFiles }: QuartzComponentProps) {
    const currentSlug = fileData.slug!
    const folderSlug = currentSlug.replace(/\/[^\/]+$/, "")

    // Filter files in the same folder (excluding this special page itself)
    const folderFiles = allFiles.filter((file: QuartzPluginData) => {
      const fileSlug = file.slug
      if (!fileSlug) return false

      const isInFolder = fileSlug.startsWith(folderSlug) && fileSlug !== folderSlug
      const isNotSpecialPage = fileSlug !== currentSlug
      const isNotIndex = !fileSlug.endsWith("/index")

      return isInFolder && isNotSpecialPage && isNotIndex
    })

    if (folderFiles.length === 0) {
      return (
        <div class="folder-list">
          <h2>Pages in this folder</h2>
          <p>No content found in this folder.</p>
        </div>
      )
    }

    return (
      <div class="folder-list">
        <h2>Pages in this folder</h2>
        <ul>
          {folderFiles.map((file: QuartzPluginData) => {
            const title = file.frontmatter?.title || file.slug?.split("/").pop() || "Untitled"
            const relativePath = path.relative(folderSlug, file.slug || "").replace(/\.md$/, "")
            const description = file.frontmatter?.description || ""

            return (
              <li>
                <a href={`/${relativePath}`}>{title}</a>
                {description && <p class="page-description">{description}</p>}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return SpecialFolderList
}) satisfies QuartzComponent
