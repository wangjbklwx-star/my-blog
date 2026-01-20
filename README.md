# Blog

一个基于 [Fumadocs](https://www.fumadocs.dev/)、Next.js 16 和 React 19 构建的现代化极简博客。

## 核心特性

### 设计

- **字体**：正文采用 **Geist Sans**，代码采用 **JetBrains Mono**。几何无衬线体与等宽字体的组合，保证了长时间阅读的舒适度。
- **深色模式**：基于 Tailwind CSS v4 构建，支持明暗主题切换。
- **响应式布局**：对于移动端视口进行了适配，保证在任何设备上都能获得一致的阅读体验。
- **丰富主题**：[Fumadocs UI](https://www.fumadocs.dev/docs/ui/theme)

### 功能

- **语法高亮**：采用构建时渲染的 Shiki 高亮，内置多种颜色主题。
- **Twoslash 智能提示**：支持代码块内的静态类型检查。悬停变量即可查看 TypeScript 类型定义，通过 Shiki 和 Twoslash 驱动。
- **图表与公式**：原生支持 Mermaid 流程图绘制与 KaTeX 数学公式渲染。
- **本地搜索**：快速的客户端全文搜索功能，支持中英文混合搜索。
- **RSS**：支持 RSS 订阅

### 技术栈

- **Next.js App Router**：基于 Next.js 16 架构，利用 React Server Components 实现最佳性能。
- **极速构建**：采用 **Bun** 作为包管理器，依赖安装与构建速度显著提升。
- **代码规范**：引入 **Biome** 替代 ESLint/Prettier，提供极致的格式化与 Lint 检查速度。

## 本地运行

安装依赖：

```bash
bun install
```

运行：

```bash
bun dev
```
