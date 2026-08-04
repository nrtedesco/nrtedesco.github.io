---
title: "在不破坏深色模式的前提下定制主题颜色"
description: "通过语义化 OKLCH token 和配套深色值，为 Astro Narrow 添加或调整配色主题。"
pubDate: 2026-06-24
categories: ["定制"]
tags: ["主题", "Tailwind CSS", "设计令牌"]
toc: "side"
---

Astro Narrow 使用 `primary`、`background`、`muted`、`border` 等语义 token 设置组件样式。组件不需要知道具体色板，因此一次 token 调整就能一致地影响导航、卡片、正文、筛选器和 dock。

## 注册可选择的主题

Dock 从 `src/config/theme.ts` 读取主题选项。添加一个稳定 ID 和展示名称：

```ts title="src/config/theme.ts"
export const themes = [
  { id: 'default', name: 'Default' },
  { id: 'ocean', name: 'Ocean' }
] as const
```

主题 ID 会成为文档的 `data-theme` 属性值，因此它必须与 CSS selector 完全一致。

## 定义语义颜色

在 `src/styles/themes.css` 中增加浅色配色，不要直接修改组件 class：

```css title="src/styles/themes.css"
[data-theme="ocean"] {
  --color-primary: oklch(0.58 0.13 235);
  --color-primary-foreground: oklch(0.98 0.01 235);
  --color-background: oklch(0.98 0.01 225);
  --color-foreground: oklch(0.25 0.03 235);
  --color-muted: oklch(0.93 0.02 225);
  --color-muted-foreground: oklch(0.48 0.04 235);
  --color-border: oklch(0.87 0.03 225);
  --color-card: oklch(1 0 0);
  --color-card-foreground: oklch(0.25 0.03 235);
}
```

随后还要提供对应的 `[data-theme="ocean"].dark`。深色模式不是机械反相：次要文字仍要保持足够对比度，边框需要克制，卡片也必须能从页面背景中区分出来。

## 在真实内容界面中检查

只看色块不能代表配色已经完成，还需要检查：

- 包含标题、链接、代码和 alerts 的文章；
- 归档筛选器的选中、hover 和 focus 状态；
- 有封面和无封面的项目卡片；
- 两种颜色模式下的 dock 和弹出面板。

优先调整语义 token，不要给单个组件添加主题专用 selector。这样新 UI 才能自然兼容所有配色，也能避免某个主题逐渐演变为平行样式表。

