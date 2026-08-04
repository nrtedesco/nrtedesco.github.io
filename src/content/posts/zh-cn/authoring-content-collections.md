---
title: "使用 Astro Content Collections 编写文章"
description: "一套适用于 Astro Narrow 的文章、草稿、分类和标签编写流程。"
pubDate: 2026-06-26
categories: ["指南"]
tags: ["内容集合", "Markdown", "分类系统"]
toc: "side"
---

Astro Narrow 保留接近原生 Markdown 的写作体验，同时使用 Astro Content Collections 在构建期校验 frontmatter。文章是 `src/content/posts/<locale>/` 下的 `.md` 或 `.mdx` 文件，文件名会成为公开 slug。

## 从最小必要 frontmatter 开始

文章只有 `title` 和 `pubDate` 是必填字段，其余字段应在页面确实需要时再添加。

```yaml title="src/content/posts/zh-cn/first-note.md"
---
title: "我的第一篇笔记"
description: "记录搭建站点时学到的内容。"
pubDate: 2026-06-26
categories: ["笔记"]
tags: ["Astro", "Markdown"]
toc: "side"
---
```

`description` 会用于列表卡片和页面元信息；发生实质性修订时可以设置 `updatedDate`。`cover` 并非必需，不设置封面时会得到更安静的文字优先卡片，很适合短篇笔记。

## 有意识地区分分类和标签

分类回答“这是什么类型的文章”，标签则描述文章涉及的技术或概念。一个实用约定是只选择一个分类，再添加少量准确标签：

- 分类：`指南`
- 标签：`Astro`、`Markdown`、`内容集合`

归档页会从当前语言的已发布文章中自动发现这些词条，不需要额外维护注册文件。但拼写和大小写仍然重要：`GitHub Pages` 和 `Github pages` 会被视为不同词条。

## 发布前使用草稿

文章尚未完成时设置 `draft: true`。草稿不会进入公开列表、归档、搜索、RSS 和 taxonomy 计数。

```yaml
draft: true
```

发布前应确认摘要脱离正文仍能表达文章内容、taxonomy 拼写与现有文章一致，并且内部链接考虑了 locale 和 base。随后移除草稿标记并运行 `pnpm build`，schema 错误会在构建阶段暴露，而不是成为线上坏页面。

