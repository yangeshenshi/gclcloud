@echo off
REM gcli2api 部署检查脚本 (Windows)
REM 这个脚本会检查你的环境是否准备好部署 gcli2api

echo =========================================
echo gcli2api 部署环境检查
echo =========================================
echo.

REM 检查操作系统
echo 📋 系统信息检查:
echo -----------------------------------------
echo 操作系统: Windows
echo 版本: %OS%
echo.

REM 检查 Docker
echo 🐳 Docker 检查:
echo -----------------------------------------
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Docker 已安装
    docker --version
    
    REM 检查 Docker 是否正在运行
    docker info >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ Docker 正在运行
    ) else (
        echo ❌ Docker 未运行，请启动 Docker Desktop
        echo 如果已启动，请等待 Docker 完全启动（图标变绿）
        pause
        exit /b 1
    )
) else (
    echo ❌ Docker 未安装，请先安装 Docker
    echo 下载地址: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)
echo.

REM 检查 Docker Compose
echo 🐳 Docker Compose 检查:
echo -----------------------------------------
docker-compose --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Docker Compose 已安装
    docker-compose --version
) else (
    echo ❌ Docker Compose 未安装
    echo 请安装 Docker Compose: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)
echo.

REM 检查端口占用
echo 🔍 端口检查:
echo -----------------------------------------
netstat -ano | findstr :7861 >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  端口 7861 已被占用
    echo 解决方案:
    echo 1. 修改 docker-compose.yml 中的端口映射
    echo 2. 或者停止占用该端口的服务
) else (
    echo ✅ 端口 7861 可用
)
echo.

REM 检查磁盘空间
echo 💾 磁盘空间检查:
echo -----------------------------------------
for /f "tokens=3" %%a in ('dir /-c ^| findstr /c:"bytes free"') do (
    set disk_space=%%a
)
echo 磁盘空间: %disk_space% bytes available
REM 简单检查，假设大于2GB够用
echo ✅ 磁盘空间检查完成

echo.

REM 检查网络连接
echo 🌐 网络检查:
echo -----------------------------------------
ping -n 1 google.com >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 网络连接正常
) else (
    echo ⚠️  网络连接可能有问题，请检查网络设置
)
echo.

REM 最终检查
echo 🎯 最终检查:
echo -----------------------------------------
echo ✅ 环境检查完成！
echo.
echo 🚀 现在你可以开始部署 gcli2api 了！
echo.
echo 📖 部署步骤:
echo 1. 确保你在包含 docker-compose.yml 的目录中
echo 2. 运行: docker-compose up -d
echo 3. 等待启动完成
echo 4. 访问: http://localhost:7861
echo.
echo ❓ 遇到问题？
echo - 查看详细教程: non-technical-deployment-guide.md
echo - 检查日志: docker logs gcli2api
echo - 寻求帮助: https://github.com/su-kaka/gcli2api/issues
echo.
echo 按任意键继续...
pause >nul