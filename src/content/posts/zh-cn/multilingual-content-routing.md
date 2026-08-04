---
title: "组织多语言内容与内部链接"
description: "让中英文内容、路由、taxonomy 词条和 base-aware 链接保持清晰可预测。"
pubDate: 2026-06-23
categories: ["指南"]
tags: ["i18n", "路由", "Astro"]
toc: "side"
---

Astro Narrow 使用英文作为默认语言，并将简体中文作为第二种示例语言。两种语言的 URL 结构有意保持不对称：英文页面不带 `/en/` 前缀，中文页面则位于 `/zh-cn/` 下。

## 按语言目录对应组织内容

将翻译后的条目放入同一 collection 对应的语言目录：

```text
src/content/posts/en/deploy-github-pages.md
src/content/posts/zh-cn/deploy-github-pages.md
```

相同文件名便于理解两篇内容的关系，但每个文件仍是完整、独立的内容条目，分别拥有标题、摘要、日期、正文、分类和标签。翻译可以稍后补充，不会阻塞原始文章发布。

## 本地化展示 taxonomy

归档词条是当前语言的展示值，而不是跨语言 ID：

```yaml
# 英文
categories: ["Guides"]
tags: ["Routing", "Astro"]

# 简体中文
categories: ["指南"]
tags: ["路由", "Astro"]
```

这种方式让写作约定保持简单，筛选器中的文字也更自然。但主题不会自动推断 `Guides` 和 `指南` 属于同一实体，因此需要在每种语言内部维护一致命名。

## 通过 helper 生成内部路径

系统页面和内容链接应使用 `getLocalePath(locale, path)`。它会同时处理默认语言规则和 `ASTRO_BASE`：

```ts
getLocalePath('en', '/archives/')
// /archives/

getLocalePath('zh-cn', '/archives/')
// /zh-cn/archives/
```

部署到 GitHub Pages 项目页时，两种结果还会自动带上仓库 base。语言切换使用 `switchLocalePath()`，组件无需自行拆分 locale 和 base 路径段。

## 同时验证两种路由形式

新增语言或修改导航后，使用 `ASTRO_BASE=/astro-narrow/` 构建一次。确认英文路径没有多出 `/en/`，中文路径仍包含 `/zh-cn/`，并且资源、Archives 链接、搜索结果、RSS 和 sitemap 都位于项目 base 内。

