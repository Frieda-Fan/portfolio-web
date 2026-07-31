# Figma 网页图层规范｜低嵌套版

## 核心原则

> 页面只保留“页面 → 内容块”两层。图片、文字和区块按照网页中的阅读顺序直接排列。

## 1. 推荐结构

```text
Home
├─ Nav / Fixed
├─ Hero
├─ Heading / Intro
├─ Text / Intro
├─ Image / Project A / 16:9
├─ Text / Project A
├─ Gallery / Selected Work
├─ FX / Background Glow
├─ Contact
└─ Footer
```

除画廊、卡片等必须组合的内容外，不添加 `Content`、`Media`、`Motion` 或 `FX` 文件夹等中间层。

## 2. 页面设置

页面使用纵向 Auto Layout：

- 宽度使用固定值或 `Fill container`。
- 高度使用 `Hug contents`，适应长页面和下拉滚动。
- 内容从上到下排列，图层顺序就是网页阅读顺序。
- 使用 Auto Layout 的 Gap 控制间距。
- 不使用空白矩形占位。
- 不使用绝对定位排列正文。

这样可以直接拖动图层调整顺序，也可以随时在图片之间插入文字。

## 3. 图片规范

图片直接作为页面的子图层：

```text
Image / 项目名称 / 比例
```

例如：

```text
Image / Otter Planet / 16:9
Image / Poster / 3:4
Image / Detail / Free
```

图片自身使用 Frame：

- 宽度设置为 `Fill container`。
- 高度使用固定比例或自由高度。
- 图片填充使用 `Fill`。
- 通过 Crop 调整图片在框内的位置。
- 圆角、遮罩和裁切直接设置在图片 Frame 上。

修改方式：

- 改大小：调整图片 Frame。
- 改构图：调整 Crop。
- 换图片：替换 Fill。
- 换顺序：直接拖动整个图片图层。

不需要额外建立 `Image Block`。

## 4. 文字规范

文字直接作为页面的子图层：

```text
Title / 页面标题
Heading / 项目名称
Text / 项目说明
Caption / 图片说明
```

图片之间插入文字时，直接放在两张图片中间：

```text
Image / Project A / 16:9
Text / Project A
Image / Project B / 4:3
```

只有标题和正文必须一起移动时，才增加一层：

```text
Text Block / Intro
├─ Heading
└─ Text
```

## 5. 多图排列

单张图片直接放在页面中。只有多张图片需要并排时，增加一层：

```text
Gallery / 2 Columns
├─ Image / A
└─ Image / B
```

或：

```text
Gallery / Grid
├─ Image / A
├─ Image / B
├─ Image / C
└─ Image / D
```

需要调换图片时，直接在 `Gallery` 内拖动顺序。不要为每张图片再增加容器。

## 6. 动画和特效

不创建 `Motion` 或 `FX` 文件夹。

动画状态直接写在图层名称中：

```text
Image / Default
Image / Hover
Menu / Closed
Menu / Open
```

重复使用的交互元素通过 Component Variant 保存状态：

```text
Button：Default / Hover
Card：Default / Hover
Menu：Closed / Open
```

纯装饰图层直接加 `FX` 前缀，并放在相关内容旁边：

```text
Hero
FX / Hero Glow
FX / Background Noise
```

规则：

- 简单阴影、模糊、渐变直接设置在目标图层上。
- 只有独立的光效、粒子和纹理才建立 `FX` 图层。
- 动画说明写在 Prototype 或开发备注中。
- 不为动画开始和结束状态复制整套页面。

## 7. 吸顶和滚动元素

导航直接放在页面顶部：

```text
Home
├─ Nav / Fixed
├─ Hero
├─ Image / Project A
├─ Text / Project A
└─ Footer
```

在 Prototype 中将导航设置为固定位置，不需要额外建立 `Fixed` 容器。

## 8. 嵌套限制

推荐最多三层：

```text
页面
└─ 内容块
   └─ 必须一起移动的内部元素
```

允许嵌套：

- 导航内部元素。
- 图文组合。
- 多图画廊。
- 卡片内部元素。
- 必须共同移动的标题和正文。
- 负责 Auto Layout、裁切、遮罩、组件或原型交互的容器。

不建议嵌套：

- 单张图片。
- 单段文字。
- 动画状态。
- 阴影、圆角和渐变。
- 仅用于分类的空 Frame。
- 只有一个子图层且没有实际作用的 Frame。

## 最终模板

```text
Home
├─ Nav / Fixed
├─ Hero
├─ Heading / Intro
├─ Text / Intro
├─ Image / Project A / 16:9
├─ Text / Project A
├─ Gallery / 2 Columns
│  ├─ Image / Detail A
│  └─ Image / Detail B
├─ Image / Project B / 4:3
├─ FX / Background Glow
├─ Contact
└─ Footer
```

## 快速检查

- 图片和文字是否尽量作为页面的直属图层？
- 图层顺序是否与网页阅读顺序一致？
- 图片能否通过 Frame、Crop 和 Fill 快速调整？
- 图片和文字能否直接拖动换位？
- 能否在任意两张图片之间直接插入文字？
- 页面能否通过纵向 Auto Layout 自动适应内容增减？
- 每个保留的容器是否确实负责布局、裁切、组件或动画？

一句话版本：

> 图片和文字直接放在页面里，按网页顺序排列；只有必须一起移动、并排展示、裁切或交互的内容才增加一层 Frame。
