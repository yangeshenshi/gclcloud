# gcli2api Deno 部署指南

## 概述

本指南详细介绍了如何将 gcli2api 项目部署到 Deno 平台，包括 Deno Deploy、Deno Land 和其他支持 Deno 的运行环境。

## Deno 平台优势

- **安全性**: 默认沙箱环境，显式权限管理
- **TypeScript 原生支持**: 无需编译步骤
- **现代 JavaScript 特性**: 支持最新的 JS/TS 功能
- **分布式部署**: 全球边缘节点，低延迟访问
- **自动扩展**: 根据流量自动调整资源

## 部署前准备

### 1. 环境要求

- Deno 1.38+
- Git
- Docker (可选)
- GitHub 账户 (用于 Deno Deploy)

### 2. 项目结构

```
gcli2api/
├── main.ts              # 主入口文件
├── dev.ts               # 开发服务器
├── fresh.config.ts      # Fresh 框架配置
├── deno.json            # Deno 配置文件
├── import_map.json      # 导入映射
├── twind.config.ts      # Twind CSS 配置
├── routes/              # 路由目录
│   ├── index.tsx        # 首页
│   ├── api-test.tsx     # API 测试页
│   ├── monitoring.tsx   # 监控页
│   └── docs.tsx         # 文档页
├── islands/             # 交互式组件
│   └── Counter.tsx      # 计数器组件
├── static/              # 静态资源
└── .github/workflows/   # GitHub Actions
```

## 部署方案

### 方案一：Deno Deploy (推荐)

Deno Deploy 是官方的无服务器平台，提供全球边缘部署。

#### 1. 准备工作

```bash
# 克隆项目
git clone https://github.com/su-kaka/gcli2api.git
cd gcli2api

# 安装依赖
deno cache main.ts

# 本地测试
deno task start
```

#### 2. 连接到 Deno Deploy

1. 访问 [Deno Deploy](https://dash.deno.com)
2. 使用 GitHub 账户登录
3. 点击 "New Project"
4. 选择 "Import from GitHub"
5. 选择 gcli2api 仓库
6. 配置项目：
   - 入口文件: `main.ts`
   - 导入映射: `import_map.json`

#### 3. 环境变量配置

在 Deno Deploy 控制台设置环境变量：

```env
# 基础配置
PORT=8000
HOST=0.0.0.0

# 密码配置
PASSWORD=pwd
API_PASSWORD=api_pwd
PANEL_PASSWORD=panel_pwd

# Redis 配置 (可选)
REDIS_URI=redis://your-redis-url

# MongoDB 配置 (可选)
MONGODB_URI=mongodb://your-mongodb-url
```

#### 4. 自动部署

GitHub Actions 会自动部署到 Deno Deploy：

```yaml
# .github/workflows/deploy.yml
name: Deploy to Deno Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: denoland/setup-deno@v1
      with:
        deno-version: 1.38.x
    - uses: denoland/deployctl@v1
      with:
        project: gcli2api-web
        entrypoint: main.ts
        root: .
        import-map: import_map.json
```

### 方案二：Docker + Deno

使用 Docker 容器化部署 Deno 应用。

#### 1. 创建 Dockerfile

```dockerfile
# Dockerfile
FROM denoland/deno:1.38.0

WORKDIR /app

# 复制配置文件
COPY deno.json import_map.json ./
COPY fresh.config.ts twind.config.ts ./

# 复制源码
COPY main.ts dev.ts ./
COPY routes/ ./routes/
COPY islands/ ./islands/
COPY static/ ./static/

# 缓存依赖
RUN deno cache main.ts

# 暴露端口
EXPOSE 8000

# 启动应用
CMD ["deno", "run", "--allow-all", "main.ts"]
```

#### 2. 构建和运行

```bash
# 构建镜像
docker build -t gcli2api-deno .

# 运行容器
docker run -d \
  --name gcli2api-deno \
  -p 8000:8000 \
  -e PASSWORD=pwd \
  gcli2api-deno
```

### 方案三：传统服务器部署

在 VPS 或物理服务器上直接部署。

#### 1. 安装 Deno

```bash
# 安装 Deno
curl -fsSL https://deno.land/install.sh | sh

# 添加到 PATH
export PATH="$HOME/.deno/bin:$PATH"

# 验证安装
deno --version
```

#### 2. 部署应用

```bash
# 克隆项目
git clone https://github.com/su-kaka/gcli2api.git
cd gcli2api

# 安装依赖
deno cache main.ts

# 生产环境运行
deno run --allow-all main.ts

# 或使用 PM2 管理
npm install -g pm2
pm2 start main.ts --interpreter="deno" --interpreter-args="run --allow-all"
```

### 方案四：Kubernetes 部署

在 Kubernetes 集群中部署 Deno 应用。

#### 1. 创建 Deployment

```yaml
# k8s-deno-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gcli2api-deno
spec:
  replicas: 3
  selector:
    matchLabels:
      app: gcli2api-deno
  template:
    metadata:
      labels:
        app: gcli2api-deno
    spec:
      containers:
      - name: gcli2api-deno
        image: denoland/deno:1.38.0
        ports:
        - containerPort: 8000
        env:
        - name: PASSWORD
          value: "pwd"
        - name: PORT
          value: "8000"
        command: ["deno", "run", "--allow-all", "main.ts"]
        workingDir: /app
        volumeMounts:
        - name: app-code
          mountPath: /app
      volumes:
      - name: app-code
        configMap:
          name: gcli2api-code
```

#### 2. 创建 Service

```yaml
# k8s-deno-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: gcli2api-deno-service
spec:
  selector:
    app: gcli2api-deno
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: LoadBalancer
```

## 配置优化

### 1. 性能优化

```typescript
// fresh.config.ts
import { defineConfig } from "$fresh/server.ts";

export default defineConfig({
  server: {
    port: 8000,
    host: "0.0.0.0",
  },
  plugins: [],
  // 启用压缩
  compress: true,
  // 缓存策略
  cache: {
    maxAge: 3600,
    staleWhileRevalidate: 86400,
  },
});
```

### 2. 安全配置

```typescript
// 中间件示例
import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  // CORS 配置
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // 认证检查
  const url = new URL(req.url);
  if (url.pathname.startsWith("/api")) {
    const auth = req.headers.get("Authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
      return new Response("Unauthorized", {
        status: 401,
        headers: corsHeaders,
      });
    }
  }

  const resp = await ctx.next();
  
  // 添加安全头
  resp.headers.set("X-Content-Type-Options", "nosniff");
  resp.headers.set("X-Frame-Options", "DENY");
  resp.headers.set("X-XSS-Protection", "1; mode=block");
  
  return resp;
}
```

### 3. 监控配置

```typescript
// 监控中间件
export async function monitoringHandler(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const start = performance.now();
  const resp = await ctx.next();
  const duration = performance.now() - start;
  
  // 记录性能指标
  console.log(`${req.method} ${req.url} - ${resp.status} (${duration.toFixed(2)}ms)`);
  
  return resp;
}
```

## 环境变量管理

### 1. 开发环境

```bash
# .env
PASSWORD=dev_password
REDIS_URI=redis://localhost:6379
LOG_LEVEL=debug
```

### 2. 生产环境

```bash
# 生产环境变量
PASSWORD=your_secure_password_here
REDIS_URI=redis://prod-redis-url
MONGODB_URI=mongodb://prod-mongodb-url
LOG_LEVEL=info
```

### 3. Deno Deploy 环境变量

在 Deno Deploy 控制台设置：
- 进入项目设置
- 点击 "Environment Variables"
- 添加所需的环境变量

## 数据库配置

### 1. Redis 配置

```typescript
// redis.ts
import { connect } from "https://deno.land/x/redis@v0.32.1/mod.ts";

const redis = await connect({
  hostname: Deno.env.get("REDIS_HOST") || "localhost",
  port: parseInt(Deno.env.get("REDIS_PORT") || "6379"),
  password: Deno.env.get("REDIS_PASSWORD"),
});

export { redis };
```

### 2. MongoDB 配置

```typescript
// mongodb.ts
import { MongoClient } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const client = new MongoClient();
await client.connect(Deno.env.get("MONGODB_URI") || "mongodb://localhost:27017");

const db = client.database("gcli2api");
export { db };
```

## CI/CD 配置

### 1. GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: denoland/setup-deno@v1
      with:
        deno-version: 1.38.x
    - run: deno lint
    - run: deno fmt --check
    - run: deno test --allow-all

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v4
    - uses: denoland/deployctl@v1
      with:
        project: gcli2api-web
        entrypoint: main.ts
```

### 2. 测试配置

```typescript
// test.ts
import { assertEquals } from "https://deno.land/std@0.216.0/testing/asserts.ts";

Deno.test("API endpoint test", async () => {
  const response = await fetch("http://localhost:8000/api/models", {
    headers: {
      "Authorization": "Bearer test_token",
    },
  });
  
  assertEquals(response.status, 200);
});
```

## 性能监控

### 1. 日志配置

```typescript
// logger.ts
export const logger = {
  info: (message: string) => {
    console.log(`[${new Date().toISOString()}] INFO: ${message}`);
  },
  error: (message: string, error?: Error) => {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`, error);
  },
  warn: (message: string) => {
    console.warn(`[${new Date().toISOString()}] WARN: ${message}`);
  },
};
```

### 2. 性能指标

```typescript
// metrics.ts
export class Metrics {
  private static requests = 0;
  private static errors = 0;
  private static responseTime: number[] = [];

  static recordRequest() {
    this.requests++;
  }

  static recordError() {
    this.errors++;
  }

  static recordResponseTime(time: number) {
    this.responseTime.push(time);
  }

  static getStats() {
    return {
      totalRequests: this.requests,
      totalErrors: this.errors,
      errorRate: (this.errors / this.requests) * 100,
      avgResponseTime: this.responseTime.reduce((a, b) => a + b, 0) / this.responseTime.length,
    };
  }
}
```

## 故障排除

### 1. 常见问题

#### 权限错误
```bash
# 错误信息: Permission denied
# 解决方案: 添加正确的权限标志
deno run --allow-net --allow-read --allow-env main.ts
```

#### 模块导入错误
```bash
# 错误信息: Module not found
# 解决方案: 检查 import_map.json 配置
```

#### 端口占用
```bash
# 错误信息: Address already in use
# 解决方案: 修改端口或关闭占用程序
PORT=8001 deno run --allow-all main.ts
```

### 2. 调试技巧

```typescript
// 调试模式
if (Deno.env.get("DEBUG")) {
  console.log("Debug mode enabled");
  // 添加调试日志
}

// 性能分析
console.time("request");
// 执行操作
console.timeEnd("request");
```

## 最佳实践

### 1. 代码组织

```
src/
├── routes/          # 路由处理
├── components/      # 可复用组件
├── utils/          # 工具函数
├── services/       # 业务服务
├── middleware/     # 中间件
├── types/          # 类型定义
└── config/         # 配置文件
```

### 2. 错误处理

```typescript
// 统一错误处理
export class AppError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

// 错误处理中间件
export async function errorHandler(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  try {
    return await ctx.next();
  } catch (error) {
    if (error instanceof AppError) {
      return new Response(error.message, {
        status: error.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

### 3. 安全配置

```typescript
// 安全配置
export const securityConfig = {
  // CORS 配置
  cors: {
    origin: Deno.env.get("CORS_ORIGIN")?.split(",") || ["*"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  
  // 速率限制
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100, // 限制每个 IP 100 个请求
  },
  
  // 认证配置
  auth: {
    secret: Deno.env.get("JWT_SECRET") || "your-secret-key",
    expiresIn: "1h",
  },
};
```

## 总结

Deno 平台为 gcli2api 提供了现代化的部署方案，具有以下优势：

1. **安全性**: 默认沙箱环境，权限明确
2. **性能**: 原生 TypeScript 支持，无需编译
3. **可扩展性**: 支持多种部署方式
4. **开发者体验**: 现代化的开发工具和生态
5. **全球部署**: 通过 Deno Deploy 实现边缘部署

通过本指南，你可以轻松地将 gcli2api 部署到 Deno 平台，享受现代化 Web 部署的便利。