# Astro Narrow

一个多配色的 Astro 主题，由 Hugo Narrow 迁移，保留整体 Narrow 设计。

[English](README.md) · [简体中文](README.zh-CN.md) · [Hugo Narrow](https://github.com/tom2almighty/hugo-narrow)

## 功能

- 多配色
- 目录
- 搜索
- 多语言
- 公式和图表
- 多种布局图库

## 快速开始

```sh
pnpm install
pnpm dev
pnpm build
```

## 主要配置文件

| 文件                    | 用途                             | 常用参数                                                                       |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `src/config/site.ts`    | 站点、作者和全局功能             | `contentWidth`, `nav`, `footerNav`, `comments`, `analytics`, `gallery`, `post` |
| `src/config/content.ts` | Posts、Projects 的列表和首页展示 | `cardStyle`, `listLayout`, `gridColumns`, `home.enabled`, `home.limit`         |
| `src/config/i18n.ts`    | 语言和显示名称                   | `defaultLocale`, `locales`, `localeMeta`                                       |
| `src/config/theme.ts`   | Dock 中的可选配色                | `themes`                                                                       |
| `src/content.config.ts` | 可用 frontmatter 字段            | 修改或增加内容字段时更新                                                       |

`cardStyle` 可使用 `article`、`showcase`、`compact`；`listLayout` 可使用 `stack`、`grid`；`gridColumns` 可设置为 `1`、`2`、`3`。

新增语言时，还需要同步更新 `astro.config.mjs` 的 `i18n.locales` 和 `src/content.config.ts` 的 `lang` 可选值。

导航可使用 `posts`、`series`、`projects`、`archives`：

```ts
nav: ["posts", "series", "projects", "archives"],
footerNav: ["archives"],
```

自定义导航项需要提供多语言名称、链接和 Lucide 图标：

```ts
{
  label: { en: "Docs", "zh-cn": "文档" },
  href: "https://example.com/docs/",
  icon: "lucide:book-open",
}
```

## 内容分类

Posts 使用 `categories` 和 `tags`，两者都是字符串数组：

```yaml
---
title: 使用 Astro Narrow 编写文章
pubDate: 2026-07-10
categories: [指南]
tags: [Astro, Markdown]
---
```

- `categories`：文章所属分类，适合填写“指南”“随笔”等较宽泛的内容类型。
- `tags`：文章涉及的主题或技术，可填写多个。
- Projects 只使用 `tags`。
- Pages 不使用 `categories` 或 `tags`。

Archives 支持通过 URL 直接打开筛选结果：

```text
/archives/?category=Guides
/archives/?tag=Astro
/archives/?category=Guides&tag=Astro
```

## 有序系列

在 `src/content/series/<locale>/` 中创建 Markdown 文件，文件名会成为 Series 的 URL slug。Markdown 正文可用于编写系列导读。

```yaml
---
title: Astro Narrow 实战指南
description: 从内容编写到生产部署。
draft: false
chapters:
  - zh-cn/authoring-content-collections
  - zh-cn/configure-series
  - zh-cn/deploy-github-pages
---
按照章节顺序阅读，可以从内容编写逐步完成站点部署。
```

| 参数          | 必填 | 用途                               |
| ------------- | ---- | ---------------------------------- |
| `title`       | 是   | Series 标题                        |
| `description` | 否   | 索引页和页面摘要                   |
| `chapters`    | 是   | 按阅读顺序填写的 Post ID，至少两篇 |
| `draft`       | 否   | 设为 `true` 时不生成公开 Series    |
| `lang`        | 否   | 通常由 `<locale>` 目录自动确定     |

Post ID 是 `src/content/posts/` 后的相对路径，不包含扩展名。Series 与所有章节必须使用同一语言，章节必须已经发布，并且一篇文章只能加入一个公开 Series。调整 `chapters` 数组顺序即可重新排序，不会改变文章 URL。

`/series/` 展示全部 Series，`/series/<slug>/` 展示导读和章节列表。不需要顶部入口时，从 `siteConfig.nav` 中移除 `"series"` 即可。

## Markdown Tabs

Tabs 使用 `remark-directive` 语法。外层容器使用四个冒号，因为内部还嵌套了 directive。

````md
::::tabs
:::tab{title="site.ts"}

```ts
export const siteConfig = {
  // 默认页面宽度，访客可在 Dock 的显示设置中调整。
  contentWidth: "56rem",
};
```

:::

:::tab{title="content.ts"}

```ts
export const contentTypes = {
  posts: { listLayout: "stack" },
};
```

:::
::::
````

## GitHub Pages

示例 workflow 位于 `.github/workflows/deploy.yml`。第一次部署前，先进入仓库 **Settings > Pages**，将 **Build and deployment > Source** 设置为 **GitHub Actions**。如果没有开启这个设置，`actions/deploy-pages` 可能会报 `HttpError: Not Found`。

workflow 会自动为用户页面和项目页面设置 `ASTRO_SITE` 与 `ASTRO_BASE`。

## 许可证

本项目基于 [GNU General Public License Version 3](LICENSE) 开源。
