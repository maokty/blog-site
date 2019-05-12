---
title: 在 TypeScript 中使用2
description: description
publishDate: 2015-05-05
---

## 测试下

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| afterClose | Called when close animation is finished | () => void | - |
| banner | Whether to show as banner | boolean | false |
| closable | Whether Alert can be closed | boolean | - |
| closeText | Close text to show | string\|ReactNode | - |
| description | Additional content of Alert | string\|ReactNode | - |
| icon | Custom icon, effective when `showIcon` is `true` | ReactNode | - |
| message | Content of Alert | string\|ReactNode | - |
| showIcon | Whether to show icon | boolean | false, in `banner` mode default is true |
| type | Type of Alert styles, options: `success`, `info`, `warning`, `error` | string | `info`, in `banner` mode default is `warning` |
| onClose | Callback when Alert is closed | (e: MouseEvent) => void | - |
