# 构建与自托管部署说明

## 环境要求

- Node.js 20+
- npm

## 本地开发

```bash
npm install
npm run dev
```

开发服务器通过 Vite 配置监听 `0.0.0.0:8080`。

## 质量校验

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
```

端到端测试会自动启动本地 Vite 服务，并覆盖编辑、多行保存、刷新持久化和确认清空流程。

## 构建产物

```bash
npm run build
```

构建完成后，静态文件输出到 `dist/`：

- `dist/index.html`
- `dist/assets/`

可以用以下命令本地预览构建产物：

```bash
npm run preview
```

预览服务器同样监听 `0.0.0.0:8080`。

## 静态部署

将 `dist/` 目录作为静态站点根目录发布到任意静态文件服务器。应用不需要 Node.js 服务端运行时，也不需要数据库。

因为应用是单页应用，服务器需要把未知路径回退到 `index.html`。Nginx 示例：

```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/todo-editor/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

## 环境变量

当前没有必需的敏感配置。浏览器可见的 Vite 环境变量必须使用 `VITE_` 前缀，示例见 `.env.example`。修改构建期环境变量后需要重新执行 `npm run build`。

## 数据存储

待办文本保存在浏览器 `localStorage` 中。自托管服务器只负责分发静态文件，不接收或保存用户数据。
