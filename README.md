# gcli2api - Gemini CLI to API Converter

[![CI/CD Pipeline](https://github.com/su-kaka/gcli2api/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/su-kaka/gcli2api/actions)
[![Deno Deploy](https://img.shields.io/badge/deno-deploy-blue.svg)](https://dash.deno.com)
[![License: CNC-1.0](https://img.shields.io/badge/license-CNC--1.0-green.svg)](LICENSE)

## 项目简介

gcli2api 是一个开源项目，旨在将 Google Gemini CLI 转换为标准的 OpenAI 和 Gemini API 接口。通过这个项目，开发者可以轻松地将 Gemini 模型集成到自己的应用中，同时支持多账号管理和负载均衡。

## ✨ 核心特性

- 🔧 **API 转换**: 将 Gemini CLI 转换为标准 API 接口，兼容 OpenAI API 格式
- 👥 **多账号管理**: 支持多个 Google 账号的凭证管理和自动轮换
- 🔄 **智能负载均衡**: 自动在多个账号间分配请求，避免 API 限制
- 💾 **分布式存储**: 支持 Redis、MongoDB、Postgres 等多种存储后端
- 🔒 **安全可靠**: 支持认证、限流、重试机制，确保服务稳定
- 📊 **监控统计**: 提供详细的使用统计和性能监控
- 🚀 **易于部署**: 支持 Docker、Kubernetes 和各大云平台部署

## 🚀 快速开始

### 使用 Docker Compose (推荐)

```bash
# 克隆项目
git clone https://github.com/su-kaka/gcli2api.git
cd gcli2api

# 启动服务
docker-compose up -d

# 访问服务
open http://localhost:7861
```

### 使用 Deno Deploy

```bash
# 安装 Denocurl -fsSL https://deno.land/install.sh | sh

# 克隆项目
git clone https://github.com/su-kaka/gcli2api.git
cd gcli2api

# 本地测试
deno task start

# 部署到 Deno Deploy
deno deploy --project=gcli2api-web main.ts
```

## 📖 文档

- [项目概述](docs/overview.md) - 了解 gcli2api 的核心概念
- [安装指南](docs/installation.md) - 详细的安装步骤
- [配置说明](docs/configuration.md) - 环境变量和配置选项
- [部署方案](docs/deployment.md) - 多种部署方式
- [API 参考](docs/api.md) - API 接口文档
- [故障排除](docs/troubleshooting.md) - 常见问题解决

## 🛠️ API 使用示例

### cURL 示例

```bash
# 发送聊天请求
curl -X POST "http://localhost:7861/v1/chat/completions" \
  -H "Authorization: Bearer pwd" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-1.5-pro",
    "messages": [
      {
        "role": "user",
        "content": "Hello, Gemini!"
      }
    ]
  }'

# 获取模型列表
curl -X GET "http://localhost:7861/v1/models" \
  -H "Authorization: Bearer pwd"
```

### Python 示例

```python
import requests
import json

# API 配置
url = "http://localhost:7861/v1/chat/completions"
headers = {
    "Authorization": "Bearer pwd",
    "Content-Type": "application/json"
}

# 请求数据
data = {
    "model": "gemini-1.5-pro",
    "messages": [
        {
            "role": "user",
            "content": "Hello, Gemini!"
        }
    ]
}

# 发送请求
response = requests.post(url, headers=headers, json=data)
print(response.json())
```

### JavaScript 示例

```javascript
// API 调用示例
const response = await fetch('http://localhost:7861/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer pwd',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gemini-1.5-pro',
    messages: [
      {
        role: 'user',
        content: 'Hello, Gemini!'
      }
    ]
  })
});

const data = await response.json();
console.log(data);
```

## 🏗️ 部署方案

### Docker 部署

```yaml
# docker-compose.yml
version: '3.8'
services:
  gcli2api:
    image: ghcr.io/su-kaka/gcli2api:latest
    ports:
      - "7861:7861"
    environment:
      - PASSWORD=your_secure_password
      - REDIS_URI=redis://redis:6379
    volumes:
      - ./data/creds:/app/creds
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  redis_data:
```

### Kubernetes 部署

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gcli2api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: gcli2api
  template:
    metadata:
      labels:
        app: gcli2api
    spec:
      containers:
      - name: gcli2api
        image: ghcr.io/su-kaka/gcli2api:latest
        ports:
        - containerPort: 7861
        env:
        - name: PASSWORD
          value: "your_secure_password"
        - name: REDIS_URI
          value: "redis://redis-service:6379"
```

### 云平台部署

- **AWS ECS**: 使用 AWS Fargate 部署容器化应用
- **Google Cloud Run**: 无服务器容器部署
- **Azure Container Instances**: 快速容器部署
- **阿里云容器服务**: 企业级容器管理平台

## 🔧 配置选项

### 环境变量

| 变量名 | 描述 | 默认值 |
|--------|------|--------|
| `PASSWORD` | 通用访问密码 | `pwd` |
| `API_PASSWORD` | API 访问密码 | 继承 `PASSWORD` |
| `PANEL_PASSWORD` | 控制面板密码 | 继承 `PASSWORD` |
| `PORT` | 服务端口 | `7861` |
| `REDIS_URI` | Redis 连接字符串 | - |
| `MONGODB_URI` | MongoDB 连接字符串 | - |
| `LOG_LEVEL` | 日志级别 | `INFO` |

### 存储后端

#### Redis (推荐)
```bash
export REDIS_URI="redis://localhost:6379"
export REDIS_DATABASE="0"
```

#### MongoDB
```bash
export MONGODB_URI="mongodb://localhost:27017"
export MONGODB_DATABASE="gcli2api"
```

#### PostgreSQL
```bash
export POSTGRES_DSN="postgresql://user:password@localhost:5432/gcli2api"
```

## 📊 监控和日志

### 监控指标

- 请求总量和成功率
- 平均响应时间
- 账号使用分布
- 错误率统计
- 系统资源使用率

### 日志配置

```bash
# 日志级别
LOG_LEVEL=INFO  # DEBUG, INFO, WARNING, ERROR
LOG_FILE=gcli2api.log

# 结构化日志
export LOG_FORMAT=json  # 或 text
```

## 🔒 安全最佳实践

1. **使用强密码**: 避免使用默认密码
2. **配置 HTTPS**: 生产环境必须使用 SSL/TLS
3. **限制网络访问**: 配置防火墙规则
4. **定期更新**: 保持项目和依赖的最新版本
5. **监控异常**: 设置告警和监控

## 🤝 贡献指南

我们欢迎社区贡献！请查看以下资源：

- [贡献指南](CONTRIBUTING.md) - 如何参与项目开发
- [开发文档](docs/development.md) - 开发环境设置
- [代码规范](docs/coding-standards.md) - 代码风格指南

## 📄 许可证

本项目采用 [Cooperative Non-Commercial License (CNC-1.0)](LICENSE) 许可证。

### 允许的用途：
- 个人学习、研究、教育用途
- 非营利组织使用
- 开源项目集成（需遵循相同协议）
- 学术研究和论文发表

### 禁止的用途：
- 任何形式的商业使用
- 年收入超过100万美元的企业使用
- 风投支持或公开交易的公司使用
- 提供付费服务或产品
- 商业竞争用途

## 🙏 致谢

感谢以下项目和社区的支持：

- [Google Gemini](https://deepmind.google/technologies/gemini/) - 强大的 AI 模型
- [Deno](https://deno.land/) - 现代 JavaScript 和 TypeScript 运行时
- [Fresh](https://fresh.deno.dev/) - Deno 的全栈 Web 框架
- [Docker](https://www.docker.com/) - 容器化平台

## 📞 联系我们

- **GitHub Issues**: [报告问题](https://github.com/su-kaka/gcli2api/issues)
- **Discussions**: [社区讨论](https://github.com/su-kaka/gcli2api/discussions)
- **Email**: support@gcli2api.com

## 🌟 Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=su-kaka/gcli2api&type=Date)](https://star-history.com/#su-kaka/gcli2api&Date)

---

**gcli2api** - 让 Gemini API 集成变得简单高效！ 🚀