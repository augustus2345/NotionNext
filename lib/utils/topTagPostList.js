import { siteConfig } from '@/lib/config'
import { sortPostsByTopTag } from '@/lib/utils/pinnedPosts'

/**
 * 当配置了全局 TOP_TAG 时，将带该标签的文章排到当前列表最前（首页/分页/分类/标签/搜索等）。
 * 与 SiteDataApi 中对全量 allPages 的 sortPinnedPostsByLatestUpdate 互补：后者不解决分页下列表「第一页」问题。
 *
 * @param {Array} posts
 * @param {object} NOTION_CONFIG
 * @returns {Array}
 */
export function maybeSortPostsByTopTag(posts, NOTION_CONFIG) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return posts
  }
  const topTag = siteConfig('TOP_TAG', '', NOTION_CONFIG || {})
  if (!topTag) {
    return posts
  }
  return sortPostsByTopTag(posts, topTag)
}
