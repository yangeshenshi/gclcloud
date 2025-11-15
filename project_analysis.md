# gcli2api 项目分析

## 项目概述
gcli2api 是一个将 Google Gemini CLI 转换为 OpenAI 和 Gemini API 接口的开源项目。它允许用户通过 API 方式调用 Gemini 模型，支持多账号管理和自动轮换。

## 核心功能
1. **API 转换**: 将 Gemini CLI 转换为标准 API 接口
2. **多账号管理**: 支持多个 Google 账号的凭证管理
3. **自动轮换**: 自动切换账号避免调用限制
4. **分布式存储**: 支持 Redis、MongoDB、Postgres 等多种存储后端

## 技术架构
- **编程语言**: Python
- **容器化**: Docker 支持
- **存储后端**: Redis > Postgres > MongoDB > 本地文件
- **API 兼容**: OpenAI API 格式 + Gemini API 格式

## 部署方式
1. **Docker 部署** (推荐)
2. **本地部署**: Windows/Linux/macOS
3. **Termux 部署**: Android 环境
4. **云端部署**: 支持多种云服务商

## 环境变量配置
- `PASSWORD`: 通用访问密码
- `API_PASSWORD`: API 访问密码
- `PANEL_PASSWORD`: 控制面板密码
- `PORT`: 服务端口 (默认 7861)
- 存储后端配置: Redis、MongoDB、Postgres

## 使用场景
- AI 应用开发
- 多账号 Gemini API 管理
- 避免 API 调用频率限制
- 企业级 Gemini 服务部署

## 许可证
采用 Cooperative Non-Commercial License (CNC-1.0)，限制商业使用。