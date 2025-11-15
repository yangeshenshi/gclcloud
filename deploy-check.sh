#!/bin/bash

# gcli2api 部署检查脚本
# 这个脚本会检查你的环境是否准备好部署 gcli2api

echo "========================================="
echo "gcli2api 部署环境检查"
echo "========================================="
echo ""

# 检查操作系统
echo "📋 系统信息检查:"
echo "-----------------------------------------"
echo "操作系统: $(uname -s)"
echo "架构: $(uname -m)"
echo ""

# 检查 Docker
echo "🐳 Docker 检查:"
echo "-----------------------------------------"
if command -v docker &> /dev/null; then
    echo "✅ Docker 已安装"
    docker --version
    
    # 检查 Docker 是否正在运行
    if docker info &> /dev/null; then
        echo "✅ Docker 正在运行"
    else
        echo "❌ Docker 未运行，请启动 Docker Desktop"
        exit 1
    fi
else
    echo "❌ Docker 未安装，请先安装 Docker"
    echo "Windows/Mac: https://www.docker.com/products/docker-desktop"
    echo "Linux: curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh"
    exit 1
fi
echo ""

# 检查 Docker Compose
echo "🐳 Docker Compose 检查:"
echo "-----------------------------------------"
if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose 已安装"
    docker-compose --version
else
    echo "❌ Docker Compose 未安装"
    echo "请安装 Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi
echo ""

# 检查端口占用
echo "🔍 端口检查:"
echo "-----------------------------------------"
if lsof -Pi :7861 -sTCP:LISTEN -t &> /dev/null; then
    echo "⚠️  端口 7861 已被占用"
    echo "解决方案:"
    echo "1. 修改 docker-compose.yml 中的端口映射"
    echo "2. 或者停止占用该端口的服务"
else
    echo "✅ 端口 7861 可用"
fi
echo ""

# 检查磁盘空间
echo "💾 磁盘空间检查:"
echo "-----------------------------------------"
disk_space=$(df . | tail -1 | awk '{print $4}')
disk_space_gb=$((disk_space / 1024 / 1024))
if [ $disk_space_gb -gt 2 ]; then
    echo "✅ 磁盘空间充足 (${disk_space_gb}GB)"
else
    echo "⚠️  磁盘空间可能不足，建议至少 2GB"
    echo "当前可用空间: ${disk_space_gb}GB"
fi
echo ""

# 检查内存
echo "🧠 内存检查:"
echo "-----------------------------------------"
if command -v free &> /dev/null; then
    memory_mb=$(free -m | awk 'NR==2{printf "%.0f", $7}')
    echo "可用内存: ${memory_mb}MB"
    if [ $memory_mb -gt 1024 ]; then
        echo "✅ 内存充足"
    else
        echo "⚠️  内存可能不足，建议至少 1GB"
    fi
elif command -v vm_stat &> /dev/null; then
    # macOS
    memory_mb=$(vm_stat | awk '/Pages free/ {free=$3} /Pages inactive/ {inactive=$3} /Pages speculative/ {spec=$3} END {print (free+inactive+spec)*4096/1024/1024}')
    echo "可用内存: ${memory_mb}MB"
    if [ ${memory_mb%.*} -gt 1024 ]; then
        echo "✅ 内存充足"
    else
        echo "⚠️  内存可能不足，建议至少 1GB"
    fi
else
    echo "⚠️  无法检查内存，请确保至少有 1GB 可用内存"
fi
echo ""

# 检查网络连接
echo "🌐 网络检查:"
echo "-----------------------------------------"
if ping -c 1 google.com &> /dev/null; then
    echo "✅ 网络连接正常"
else
    echo "⚠️  网络连接可能有问题，请检查网络设置"
fi
echo ""

# 最终检查
echo "🎯 最终检查:"
echo "-----------------------------------------"
echo "✅ 环境检查完成！"
echo ""
echo "🚀 现在你可以开始部署 gcli2api 了！"
echo ""
echo "📖 部署步骤:"
echo "1. 确保你在包含 docker-compose.yml 的目录中"
echo "2. 运行: docker-compose up -d"
echo "3. 等待启动完成"
echo "4. 访问: http://localhost:7861"
echo ""
echo "❓ 遇到问题？"
echo "- 查看详细教程: non-technical-deployment-guide.md"
echo "- 检查日志: docker logs gcli2api"
echo "- 寻求帮助: https://github.com/su-kaka/gcli2api/issues"
echo ""
echo "祝你好运！🎉"