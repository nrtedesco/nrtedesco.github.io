---
title: "构建有序的系列文章"
description: "使用 Astro typed references 定义阅读路径，同时保持文章、归档和 taxonomy 边界清晰。"
pubDate: 2026-06-25
categories: ["指南"]
tags: ["系列", "内容集合", "Astro"]
toc: "side"
---

Astro Narrow 将 Series 建模为有序阅读路径，而不是另一种 taxonomy。Categories 和 Tags 帮助读者找到相关内容，Series 则明确规定一组文章应该按照什么顺序阅读。

## 创建 Series 条目

Series 条目位于 `src/content/series/<locale>/`。每个条目包含公开标题、简短摘要、可选的 Markdown 导读，以及一组有顺序的 typed post references。

```yaml title="src/content/series/zh-cn/astro-narrow-practical-guide.md"
---
title: "Astro Narrow 实战指南"
description: "从内容编写、系列组织到主题定制和部署。"
chapters:
  - zh-cn/authoring-content-collections
  - zh-cn/configure-series
  - zh-cn/customize-theme-tokens
  - zh-cn/multilingual-content-routing
  - zh-cn/deploy-github-pages
---
```

`chapters` 中的位置就是章节顺序。调整数组即可改变阅读路径，不需要重命名文章文件，也不会改变文章公开 URL。

## 将关系集中在一个位置

文章自身的 frontmatter 不重复填写 Series 名称和章节序号，因此不会产生顺序冲突或名称拼写漂移。Astro 的 `reference('posts')` schema 也会阻止 Projects 或 Pages 被误用为章节。

公开 Series 遵循严格的内容约定：

- 至少包含两个章节；
- 不允许重复引用同一章节；
- 所有章节必须与 Series 使用相同 locale；
- 已发布 Series 不允许引用草稿文章；
- 一篇文章只能属于一个已发布 Series。

这些检查都在 Astro 静态构建期间完成。

## 本地化阅读路径

中文版本放在 `src/content/series/zh-cn/`，可以拥有本地化标题、导读和章节列表。对应语言使用相同文件名能让语言切换更可预测，但两个条目仍是独立内容。

## 理解公开页面

`/series/` 展示可用阅读路径，`/series/<slug>/` 渲染导读和有序章节。系列章节会在文章标题上方显示轻量 Series 链接，底部导航也会按照章节顺序工作，而不是发布日期。

Archives 继续按时间组织文章，只通过 Categories 和 Tags 筛选。RSS 仍然只输出 Posts，Search 和 Sitemap 则可以发现公开 Series 页面。

