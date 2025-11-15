@echo off
REM gcli2api 快速启动脚本 (Windows)
REM 这个脚本会自动检查环境并启动 gcli2api

echo 🚀 gcli2api 快速启动脚本
echo ==========================
echo.

REM 检查当前目录是否有 docker-compose.yml
if not exist "docker-compose.yml" (
    echo ❌ 在当前目录找不到 docker-compose.yml 文件
    echo 请确保你在包含 docker-compose.yml 的目录中运行此脚本
    pause
    exit /b 1
)

REM 检查 Docker
echo 🔍 检查 Docker 环境...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker 未安装
    echo 请先安装 Docker: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose 未安装
    echo 请先安装 Docker Compose: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)

echo ✅ Docker 环境检查通过
echo.

REM 创建必要的目录
echo 📁 创建必要的目录...
if not exist "data\creds" mkdir data\creds
if not exist "logs" mkdir logs
echo ✅ 目录创建完成
echo.

REM 检查端口占用
netstat -ano | findstr :7861 >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  端口 7861 已被占用
    echo 你可以选择：
    echo 1. 停止占用该端口的服务
    echo 2. 修改 docker-compose.yml 中的端口映射
    set /p continue="是否继续？(y/n): "
    if /i not "%continue%"=="y" (
        echo 已取消启动
        pause
        exit /b 1
    )
)

REM 拉取最新镜像
echo 📥 拉取最新镜像...
docker-compose pull
echo ✅ 镜像拉取完成
echo.

REM 启动服务
echo 🚀 启动 gcli2api 服务...
docker-compose up -d
echo ✅ 服务启动完成
echo.

REM 等待服务启动
echo ⏳ 等待服务完全启动...
timeout /t 10 /nobreak >nul

REM 检查服务状态
echo 🔍 检查服务状态...
docker-compose ps
echo.

REM 测试服务是否正常运行
echo 🧪 测试服务是否正常运行...
curl -s -f -H "Authorization: Bearer pwd" http://localhost:7861/v1/models >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 服务运行正常！
    echo.
    echo 🎉 部署成功！
    echo.
    echo 📱 访问地址:
    echo   主网站: http://localhost:7861
    echo   API 测试: http://localhost:7861/api-test
    echo   监控面板: http://localhost:7861/monitoring
    echo   文档中心: http://localhost:7861/docs
    echo.
    echo 🔑 默认密码: pwd
    echo ⚠️  生产环境请务必修改密码！
    echo.
    echo 📚 常用命令:
    echo   查看日志: docker logs gcli2api
    echo   停止服务: docker-compose down
    echo   重启服务: docker-compose restart
    echo   更新服务: docker-compose pull ^&^& docker-compose up -d
) else (
    echo ❌ 服务启动失败
    echo 请检查日志: docker logs gcli2api
    echo 或查看详细教程: non-technical-deployment-guide.md
)

echo.
echo 按任意键退出...
pause >nul