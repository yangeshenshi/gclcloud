# gcli2api 零基础部署教程

## 🎯 写给谁看的？

这份教程专门为以下人群编写：
- ✅ 完全不懂编程的初学者
- ✅ 有一定电脑操作基础的用户
- ✅ 想要快速部署 gcli2api 的懒人
- ✅ 不想折腾复杂配置的用户

**承诺：按照这份教程，30分钟内完成部署！**

## 📋 准备工作

### 你需要准备什么？

1. **一台电脑**（Windows/Mac/Linux 都可以）
2. **网络连接**（需要下载一些文件）
3. **30分钟时间**
4. **一颗耐心的心** ❤️

### 需要安装的软件

#### Windows 用户
1. **Docker Desktop** - 我们的部署工具
   - 下载地址：https://www.docker.com/products/docker-desktop
   - 如果不会安装，看下面的详细步骤

#### Mac 用户
1. **Docker Desktop** - 我们的部署工具
   - 下载地址：https://www.docker.com/products/docker-desktop
   - 如果不会安装，看下面的详细步骤

#### Linux 用户
1. **Docker** 和 **Docker Compose**
   - 我们会提供详细的安装命令

## 🚀 开始部署

### 第1步：安装 Docker（5分钟）

#### Windows 安装步骤

1. **下载 Docker Desktop**
   - 打开浏览器，访问：https://www.docker.com/products/docker-desktop
   - 点击 "Download for Windows" 按钮
   - 等待下载完成

2. **安装 Docker Desktop**
   - 双击下载的文件（通常叫 Docker Desktop Installer.exe）
   - 按照提示点击 "Next" → "Next" → "Install"
   - 安装完成后，重启电脑

3. **验证安装**
   - 重启后，在桌面找到 Docker Desktop 图标
   - 双击打开，等待 Docker 启动（图标变成绿色）

#### Mac 安装步骤

1. **下载 Docker Desktop**
   - 打开浏览器，访问：https://www.docker.com/products/docker-desktop
   - 点击 "Download for Mac" 按钮
   - 等待下载完成

2. **安装 Docker Desktop**
   - 双击下载的 .dmg 文件
   - 将 Docker 图标拖到 Applications 文件夹
   - 打开 Launchpad，找到 Docker Desktop 并打开

3. **验证安装**
   - 打开 Docker Desktop，等待启动（菜单栏图标变成绿色）

#### Linux 安装步骤

1. **打开终端**
2. **运行安装命令**：
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   ```
3. **重启电脑**

### 第2步：创建项目文件夹（2分钟）

1. **在桌面创建文件夹**
   - 在桌面空白处右键 → 新建 → 文件夹
   - 命名为 `gcli2api`

2. **打开文件夹**
   - 双击进入刚创建的 `gcli2api` 文件夹

### 第3步：下载配置文件（3分钟）

1. **创建配置文件**
   - 在 `gcli2api` 文件夹中，右键 → 新建 → 文本文档
   - 命名为 `docker-compose.yml`（注意：要删除 .txt 后缀）

2. **编辑配置文件**
   - 右键点击 `docker-compose.yml` → 选择 "编辑" 或 "打开方式" → 选择记事本
   - 复制下面的内容，粘贴到文件中：

```yaml
version: '3.8'

services:
  # Redis 服务 (用于存储数据)
  redis:
    image: redis:7-alpine
    container_name: gcli2api-redis
    restart: unless-stopped
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    networks:
      - gcli2api-network

  # MongoDB 服务 (用于存储数据)
  mongodb:
    image: mongo:7
    container_name: gcli2api-mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    volumes:
      - mongodb_data:/data/db
    ports:
      - "27017:27017"
    networks:
      - gcli2api-network

  # gcli2api 主服务
  gcli2api:
    image: ghcr.io/su-kaka/gcli2api:latest
    container_name: gcli2api
    restart: unless-stopped
    depends_on:
      - redis
      - mongodb
    environment:
      # 基础配置
      - PORT=7861
      - HOST=0.0.0.0
      
      # 密码配置 - 重要：生产环境请修改密码！
      - PASSWORD=pwd
      
      # Redis 配置
      - REDIS_URI=redis://redis:6379
      - REDIS_DATABASE=0
      
      # MongoDB 配置
      - MONGODB_URI=mongodb://admin:password123@mongodb:27017/admin
      - MONGODB_DATABASE=gcli2api
      
      # 性能配置
      - CALLS_PER_ROTATION=10
      - RETRY_429_ENABLED=true
      - RETRY_429_MAX_RETRIES=3
      - RETRY_429_INTERVAL=1.0
      
      # 日志配置
      - LOG_LEVEL=INFO
      - LOG_FILE=gcli2api.log
      
      # 自动化配置
      - AUTO_BAN=true
      - AUTO_LOAD_ENV_CREDS=false
      
      # 兼容性配置
      - COMPATIBILITY_MODE=false
      
    ports:
      - "7861:7861"
    volumes:
      - ./data/creds:/app/creds
      - ./logs:/app/logs
    networks:
      - gcli2api-network
    healthcheck:
      test: ["CMD-SHELL", "python -c \"import sys, urllib.request, os; port = os.environ.get('PORT', '7861'); req = urllib.request.Request(f'http://localhost:{port}/v1/models', headers={'Authorization': 'Bearer ' + os.environ.get('PASSWORD', 'pwd')}); sys.exit(0 if urllib.request.urlopen(req, timeout=5).getcode() == 200 else 1)\""]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  redis_data:
  mongodb_data:

networks:
  gcli2api-network:
    driver: bridge
```

3. **保存文件**
   - 按 `Ctrl+S` 保存文件
   - 关闭记事本

### 第4步：启动服务（15分钟）

#### Windows 用户

1. **打开 PowerShell**
   - 按 `Win+R` 键
   - 输入 `powershell` 回车

2. **进入项目目录**
   ```powershell
   cd Desktop\gcli2api
   ```

3. **启动服务**
   ```powershell
   docker-compose up -d
   ```

4. **等待启动完成**
   - 第一次启动会下载镜像，需要一些时间
   - 看到 "Creating gcli2api ... done" 表示成功

#### Mac 用户

1. **打开终端**
   - 打开 Launchpad → 其他 → 终端

2. **进入项目目录**
   ```bash
   cd ~/Desktop/gcli2api
   ```

3. **启动服务**
   ```bash
   docker-compose up -d
   ```

4. **等待启动完成**
   - 第一次启动会下载镜像，需要一些时间
   - 看到 "Creating gcli2api ... done" 表示成功

#### Linux 用户

1. **打开终端**

2. **进入项目目录**
   ```bash
   cd ~/Desktop/gcli2api
   ```

3. **启动服务**
   ```bash
   docker-compose up -d
   ```

4. **等待启动完成**
   - 第一次启动会下载镜像，需要一些时间
   - 看到 "Creating gcli2api ... done" 表示成功

### 第5步：验证部署（3分钟）

1. **打开浏览器**
   - 任何浏览器都可以

2. **访问服务**
   - 在地址栏输入：`http://localhost:7861`
   - 回车

3. **看到欢迎页面**
   - 如果看到 gcli2api 的欢迎页面，说明部署成功！🎉

4. **测试 API**
   - 点击页面上的 "API 测试" 链接
   - 点击 "发送请求" 按钮
   - 如果能看到响应结果，说明 API 正常工作

## 🔧 常见问题解决

### 问题1：端口被占用

**症状**：启动时报错 "port is already allocated"

**解决方法**：
1. 打开 `docker-compose.yml` 文件
2. 找到 `ports: - "7861:7861"`
3. 修改为 `ports: - "7862:7861"`
4. 重新启动：`docker-compose up -d`
5. 访问地址改为：`http://localhost:7862`

### 问题2：Docker 启动失败

**症状**：Docker Desktop 无法启动

**解决方法**：
1. 重启电脑
2. 检查系统是否支持虚拟化
3. 在 BIOS 中启用虚拟化技术

### 问题3：无法访问服务

**症状**：浏览器打不开页面

**解决方法**：
1. 检查 Docker 是否正常运行
2. 查看容器状态：`docker ps`
3. 查看日志：`docker logs gcli2api`
4. 确保防火墙没有阻止端口

### 问题4：API 认证失败

**症状**：API 测试返回 401 错误

**解决方法**：
1. 检查密码是否正确（默认是 `pwd`）
2. 确保在 API 测试中输入了正确的认证密钥

## 🔐 安全设置（重要！）

### 修改默认密码

**警告**：默认密码 `pwd` 非常不安全，生产环境必须修改！

1. **打开 docker-compose.yml**
2. **找到密码配置**：
   ```yaml
   - PASSWORD=pwd
   ```
3. **修改为强密码**：
   ```yaml
   - PASSWORD=YourSecurePassword123!
   ```
4. **重新启动服务**：
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### 使用分离密码（推荐）

更安全的方式是使用不同的密码：

```yaml
environment:
  - API_PASSWORD=YourApiPassword123!
  - PANEL_PASSWORD=YourPanelPassword123!
  # 不设置 PASSWORD，这样 API 和面板使用不同密码
```

## 📊 日常使用

### 查看服务状态

```bash
docker ps
```

### 查看日志

```bash
docker logs gcli2api
```

### 停止服务

```bash
docker-compose down
```

### 重启服务

```bash
docker-compose restart
```

### 更新服务

```bash
docker-compose pull
docker-compose up -d
```

## 🎯 下一步做什么？

现在你已经成功部署了 gcli2api，可以：

1. **添加 Google 账号** - 在控制面板中添加你的 Google 账号
2. **配置模型** - 选择你想要使用的 Gemini 模型
3. **测试 API** - 使用我们的在线测试工具
4. **集成应用** - 将你的应用连接到 gcli2api

## 📞 需要帮助？

如果遇到问题：

1. **查看日志** - 使用 `docker logs gcli2api` 查看错误信息
2. **检查配置** - 确保 docker-compose.yml 格式正确
3. **重启服务** - 有时候重启能解决大部分问题
4. **寻求帮助** - 在 GitHub 提交 issue

## 🎉 恭喜！

你现在已经成功部署了 gcli2api！🎊

这个过程可能看起来有点复杂，但你已经成功运行了一个现代化的 API 服务。你可以：

- 向朋友炫耀你的技术能力 💪
- 在你的项目中使用 Gemini API 🚀
- 继续学习更多高级功能 📚

**记住：技术并不可怕，只要一步步来，每个人都能掌握！**

---

## 📚 进阶阅读

如果你想了解更多：
- [详细配置说明](docs/configuration.md)
- [API 使用指南](docs/api.md)
- [故障排除手册](docs/troubleshooting.md)

**祝你使用愉快！** 🌟