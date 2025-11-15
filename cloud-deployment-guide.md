# gcli2api 云部署指南

## 概述
本指南提供多种云平台的部署方案，包括 Docker、Kubernetes、以及各大云服务商的部署方法。

## 部署前准备

### 1. 环境要求
- Docker 20.10+
- Docker Compose 2.0+
- Kubernetes 1.20+ (可选)
- 至少 2GB RAM
- 至少 1GB 存储空间

### 2. 获取项目
```bash
# 克隆项目
git clone https://github.com/su-kaka/gcli2api.git
cd gcli2api

# 或者直接下载配置文件
wget https://raw.githubusercontent.com/su-kaka/gcli2api/master/docker-compose.yml
```

## 部署方案

### 方案一：Docker Compose 部署 (推荐)

#### 1. 基本部署
```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

#### 2. 生产环境配置
```bash
# 创建数据目录
mkdir -p data/creds
mkdir -p logs

# 设置权限
chmod 755 data/creds
chmod 755 logs

# 启动服务
docker-compose -f docker-compose.yml up -d
```

#### 3. 环境变量配置
创建 `.env` 文件：
```env
# 密码配置 (请使用强密码)
PASSWORD=your_secure_password
API_PASSWORD=your_api_password
PANEL_PASSWORD=your_panel_password

# 端口配置
PORT=7861

# 存储配置
REDIS_URI=redis://redis:6379
MONGODB_URI=mongodb://admin:password123@mongodb:27017/admin
```

### 方案二：Kubernetes 部署

#### 1. 使用 kubectl 部署
```bash
# 创建命名空间
kubectl create namespace gcli2api

# 部署应用
kubectl apply -f k8s-deployment.yaml

# 查看状态
kubectl get pods -n gcli2api
kubectl get services -n gcli2api
```

#### 2. 使用 Helm 部署 (可选)
```bash
# 添加 Helm Chart (如果需要)
helm repo add gcli2api https://charts.gcli2api.com
helm install gcli2api gcli2api/gcli2api --namespace gcli2api --create-namespace
```

### 方案三：云平台部署

#### 1. AWS ECS 部署
```bash
# 使用 AWS CLI 部署
aws ecs create-cluster --cluster-name gcli2api
aws ecs register-task-definition --cli-input-json file://aws-task-definition.json
aws ecs create-service --cluster gcli2api --service-name gcli2api-service --task-definition gcli2api
```

#### 2. Google Cloud Run 部署
```bash
# 构建镜像
gcloud builds submit --tag gcr.io/PROJECT_ID/gcli2api

# 部署到 Cloud Run
gcloud run deploy gcli2api --image gcr.io/PROJECT_ID/gcli2api --port 7861
```

#### 3. Azure Container Instances 部署
```bash
# 创建容器组
az container create --resource-group myResourceGroup --name gcli2api --image ghcr.io/su-kaka/gcli2api:latest --ports 7861
```

#### 4. 阿里云容器服务部署
```bash
# 使用阿里云 CLI
aliyun cs CreateCluster --name gcli2api --region cn-hangzhou
```

### 方案四：无服务器部署

#### 1. Render.com 部署
```yaml
# render.yaml
services:
  - type: web
    name: gcli2api
    env: docker
    repo: https://github.com/su-kaka/gcli2api
    envVars:
      - key: PASSWORD
        value: pwd
      - key: PORT
        value: 7861
```

#### 2. Railway 部署
```bash
# 连接 GitHub 仓库并部署
railway login
railway init
railway up
```

#### 3. Fly.io 部署
```bash
# 安装 flyctl
flyctl launch
flyctl deploy
```

## 配置管理

### 1. 凭证管理
```bash
# 创建凭证目录
mkdir -p data/creds

# 添加 Google 凭证文件
cp your-google-creds.json data/creds/

# 设置权限
chmod 600 data/creds/*.json
```

### 2. 存储后端配置

#### Redis 配置
```yaml
environment:
  - REDIS_URI=redis://redis:6379
  - REDIS_DATABASE=0
```

#### MongoDB 配置
```yaml
environment:
  - MONGODB_URI=mongodb://admin:password@mongodb:27017/admin
  - MONGODB_DATABASE=gcli2api
```

### 3. 安全配置
```bash
# 生成强密码
openssl rand -base64 32

# 配置 HTTPS (生产环境必需)
# 使用反向代理如 Nginx 或 Traefik
```

## 监控和日志

### 1. 健康检查
```bash
# API 健康检查
curl -H "Authorization: Bearer pwd" http://localhost:7861/v1/models

# 控制面板访问
curl http://localhost:7861
```

### 2. 日志管理
```bash
# Docker 日志
docker-compose logs -f gcli2api

# Kubernetes 日志
kubectl logs -f deployment/gcli2api -n gcli2api
```

### 3. 监控指标
- API 调用次数
- 响应时间
- 错误率
- 账号轮换状态

## 扩展和优化

### 1. 水平扩展
```bash
# Kubernetes 水平扩展
kubectl scale deployment gcli2api --replicas=3 -n gcli2api

# Docker Compose 扩展
docker-compose up -d --scale gcli2api=3
```

### 2. 负载均衡
```yaml
# 配置负载均衡器
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - gcli2api
```

### 3. 自动伸缩
```yaml
# Kubernetes HPA
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: gcli2api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: gcli2api
  minReplicas: 2
  maxReplicas: 10
```

## 故障排除

### 常见问题
1. **连接超时**: 检查网络配置和防火墙规则
2. **认证失败**: 验证 Google 凭证文件
3. **存储错误**: 检查 Redis/MongoDB 连接
4. **性能问题**: 调整资源限制和并发设置

### 调试工具
```bash
# 进入容器
docker exec -it gcli2api bash

# 查看配置文件
cat /app/config.py

# 测试 API
curl -X POST http://localhost:7861/v1/chat/completions \
  -H "Authorization: Bearer pwd" \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

## 最佳实践

1. **安全配置**: 使用强密码，配置 HTTPS
2. **监控告警**: 设置监控和告警机制
3. **备份策略**: 定期备份凭证和配置
4. **资源限制**: 设置合理的资源限制
5. **日志管理**: 集中化日志管理

## 支持和维护

- **文档**: https://github.com/su-kaka/gcli2api
- **社区**: GitHub Issues
- **更新**: 定期更新镜像和依赖
- **备份**: 定期备份重要数据