#!/bin/bash

# gcli2api 快速启动脚本
# 这个脚本会自动检查环境并启动 gcli2api

set -e

echo "🚀 gcli2api 快速启动脚本"
echo "=========================="
echo ""

# 检查当前目录是否有 docker-compose.yml
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ 在当前目录找不到 docker-compose.yml 文件"
    echo "请确保你在包含 docker-compose.yml 的目录中运行此脚本"
    exit 1
fi

# 检查 Docker
echo "🔍 检查 Docker 环境..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装"
    echo "请先安装 Docker: https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose 未安装"
    echo "请先安装 Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker 环境检查通过"
echo ""

# 创建必要的目录
echo "📁 创建必要的目录..."
mkdir -p data/creds
mkdir -p logs
chmod 755 data/creds
chmod 755 logs
echo "✅ 目录创建完成"
echo ""

# 检查端口占用
if lsof -Pi :7861 -sTCP:LISTEN -t &> /dev/null; then
    echo "⚠️  端口 7861 已被占用"
    echo "你可以选择："
    echo "1. 停止占用该端口的服务"
    echo "2. 修改 docker-compose.yml 中的端口映射"
    read -p "是否继续？(y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "已取消启动"
        exit 1
    fi
fi

# 拉取最新镜像
echo "📥 拉取最新镜像..."
if command -v docker-compose &> /dev/null; then
    docker-compose pull
else
    docker compose pull
fi
echo "✅ 镜像拉取完成"
echo ""

# 启动服务
echo "🚀 启动 gcli2api 服务..."
if command -v docker-compose &> /dev/null; then
    docker-compose up -d
else
    docker compose up -d
fi
echo "✅ 服务启动完成"
echo ""

# 等待服务启动
echo "⏳ 等待服务完全启动..."
sleep 10

# 检查服务状态
echo "🔍 检查服务状态..."
if command -v docker-compose &> /dev/null; then
    docker-compose ps
else
    docker compose ps
fi
echo ""

# 测试服务是否正常运行
echo "🧪 测试服务是否正常运行..."
if curl -s -f -H "Authorization: Bearer pwd" http://localhost:7861/v1/models > /dev/null; then
    echo "✅ 服务运行正常！"
    echo ""
    echo "🎉 部署成功！"
    echo ""
    echo "📱 访问地址:"
    echo "  主网站: http://localhost:7861"
    echo "  API 测试: http://localhost:7861/api-test"
    echo "  监控面板: http://localhost:7861/monitoring"
    echo "  文档中心: http://localhost:7861/docs"
    echo ""
    echo "🔑 默认密码: pwd"
    echo "⚠️  生产环境请务必修改密码！"
    echo ""
    echo "📚 常用命令:"
    echo "  查看日志: docker logs gcli2api"
    echo "  停止服务: docker-compose down"
    echo "  重启服务: docker-compose restart"
    echo "  更新服务: docker-compose pull && docker-compose up -d"
else
    echo "❌ 服务启动失败"
    echo "请检查日志: docker logs gcli2api"
    echo "或查看详细教程: non-technical-deployment-guide.md"
fi

echo ""
echo "按任意键退出..."
read -n 1 -s