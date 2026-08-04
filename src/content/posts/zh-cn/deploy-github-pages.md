---
title: "将 Astro Narrow 部署到 GitHub Pages"
description: "正确配置 GitHub Pages、项目 base 路径和本地生产构建，避免部署后链接失效。"
pubDate: 2026-06-25
categories: ["部署"]
tags: ["GitHub Pages", "部署", "Astro"]
toc: "side"
---

Astro Narrow 内置 `.github/workflows/deploy.yml`，推送到 `main` 时会构建示例站点，也支持手动触发。该 workflow 同时处理用户站点和仓库项目站点，因为两者的 URL base 不同。

## 将 GitHub Actions 设为 Pages 来源

首次部署前，进入仓库设置并选择 **Pages → Build and deployment → GitHub Actions**。workflow 使用已有的 `pages: write` 和 `id-token: write` 权限发布构建产物。

## 理解 `ASTRO_SITE` 和 `ASTRO_BASE`

名称为 `<owner>.github.io` 的用户站点使用 `/` 作为 base；普通项目仓库则使用 `/<repository-name>/`。内置 workflow 会自动推导这两个值：

```text
ASTRO_SITE=https://<owner>.github.io
ASTRO_BASE=/<repository-name>
```

`ASTRO_SITE` 提供 sitemap 和 RSS 所需的绝对域名，`ASTRO_BASE` 则确保内部链接和构建资源都位于项目路径下。

> [!WARNING]
> `href="/archives/"` 这样的硬编码链接会绕过项目 base。主题内部链接应使用 `getLocalePath()` 或已有的 locale helper 生成。

## 在本地复现部署构建

推送前运行同样对路径敏感的构建：

```sh
ASTRO_SITE=https://example.github.io ASTRO_BASE=/astro-narrow/ pnpm build
```

构建成功后检查 `dist/sitemap.xml` 和任意一个内容页面。URL 应包含 `/astro-narrow/`；英文路由不带语言前缀，中文路由则包含 `/zh-cn/`。

## 排查常见问题

- Pages 返回 `Not Found`，通常是因为尚未将 GitHub Actions 设为 Pages 来源。
- 项目页缺少样式，通常表示 `ASTRO_BASE` 缺失或不正确。
- Sitemap 域名错误应检查 `ASTRO_SITE`，而不是路由逻辑。
- 页面在根路径正常、进入仓库项目路径后失效，通常存在手写的根路径 URL。

只要改动涉及导航、资源、RSS、sitemap 或本地化链接，就应把 base-path 构建作为部署验证的一部分。

