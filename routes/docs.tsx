import { Head } from "$fresh/runtime.ts";

export default function Docs() {
  return (
    <>
      <Head>
        <title>文档中心 - gcli2api</title>
        <meta name="description" content="Documentation for gcli2api project" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-2xl font-bold text-gray-900">gcli2api</a>
              </div>
              <div className="flex items-center space-x-8">
                <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">首页</a>
                <a href="/api-test" className="text-gray-700 hover:text-blue-600 transition-colors">API 测试</a>
                <a href="/monitoring" className="text-gray-700 hover:text-blue-600 transition-colors">监控</a>
                <a href="/docs" className="text-blue-600 font-semibold">文档</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">文档中心</h1>
            <p className="text-xl">详细的部署文档和使用指南</p>
          </div>
        </section>

        {/* Documentation Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">文档目录</h3>
                  <nav className="space-y-2">
                    <a href="#overview" className="block px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      项目概述
                    </a>
                    <a href="#installation" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      安装指南
                    </a>
                    <a href="#configuration" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      配置说明
                    </a>
                    <a href="#deployment" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      部署方案
                    </a>
                    <a href="#api-reference" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      API 参考
                    </a>
                    <a href="#troubleshooting" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      故障排除
                    </a>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="prose max-w-none">
                    <h2 id="overview" className="text-3xl font-bold mb-6">项目概述</h2>
                    <p className="text-gray-600 mb-6">
                      gcli2api 是一个开源项目，旨在将 Google Gemini CLI 转换为标准的 OpenAI 和 Gemini API 接口，
                      提供企业级的多账号管理和负载均衡功能。
                    </p>

                    <h3 className="text-2xl font-semibold mb-4">核心功能</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8">
                      <li><strong>API 转换</strong>: 将 Gemini CLI 转换为标准 API 接口</li>
                      <li><strong>多账号管理</strong>: 支持多个 Google 账号的凭证管理</li>
                      <li><strong>自动轮换</strong>: 自动切换账号避免调用限制</li>
                      <li><strong>分布式存储</strong>: 支持 Redis、MongoDB、Postgres 等多种存储后端</li>
                      <li><strong>负载均衡</strong>: 智能分配请求到不同账号</li>
                      <li><strong>监控统计</strong>: 提供详细的使用统计和性能监控</li>
                    </ul>

                    <h2 id="installation" className="text-3xl font-bold mb-6">安装指南</h2>
                    <h3 className="text-xl font-semibold mb-4">系统要求</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                      <li>Docker 20.10+</li>
                      <li>Docker Compose 2.0+</li>
                      <li>至少 2GB RAM</li>
                      <li>至少 1GB 存储空间</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-4">快速安装</h3>
                    <div className="bg-gray-900 rounded-lg p-4 mb-8">
                      <pre className="text-green-400 text-sm"><code># 克隆项目
git clone https://github.com/su-kaka/gcli2api.git
cd gcli2api

# 启动服务
docker-compose up -d

# 访问服务
open http://localhost:7861</code></pre>
                    </div>

                    <h2 id="configuration" className="text-3xl font-bold mb-6">配置说明</h2>
                    <h3 className="text-xl font-semibold mb-4">环境变量</h3>
                    <div className="overflow-x-auto mb-8">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">变量名</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">默认值</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PASSWORD</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">通用访问密码</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">pwd</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">API_PASSWORD</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">API 访问密码</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">继承 PASSWORD</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PANEL_PASSWORD</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">控制面板密码</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">继承 PASSWORD</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PORT</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">服务端口</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7861</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">REDIS_URI</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Redis 连接字符串</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">MONGODB_URI</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">MongoDB 连接字符串</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h2 id="deployment" className="text-3xl font-bold mb-6">部署方案</h2>
                    <h3 className="text-xl font-semibold mb-4">Docker Compose (推荐)</h3>
                    <p className="text-gray-600 mb-4">
                      使用 Docker Compose 可以快速部署 gcli2api 服务，包含 Redis 和 MongoDB 依赖。
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 mb-8">
                      <pre className="text-green-400 text-sm"><code>version: '3.8'
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
  redis_data:</code></pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Kubernetes 部署</h3>
                    <p className="text-gray-600 mb-4">
                      对于生产环境，推荐使用 Kubernetes 进行容器编排部署。
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 mb-8">
                      <pre className="text-green-400 text-sm"><code>kubectl create namespace gcli2api
kubectl apply -f k8s-deployment.yaml</code></pre>
                    </div>

                    <h2 id="api-reference" className="text-3xl font-bold mb-6">API 参考</h2>
                    <h3 className="text-xl font-semibold mb-4">聊天完成 API</h3>
                    <div className="bg-gray-900 rounded-lg p-4 mb-6">
                      <pre className="text-green-400 text-sm"><code>POST /v1/chat/completions
Authorization: Bearer {api_key}
Content-Type: application/json

{
  "model": "gemini-1.5-pro",
  "messages": [
    {
      "role": "user",
      "content": "Hello, Gemini!"
    }
  ]
}</code></pre>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">模型列表 API</h3>
                    <div className="bg-gray-900 rounded-lg p-4 mb-6">
                      <pre className="text-green-400 text-sm"><code>GET /v1/models
Authorization: Bearer {api_key}</code></pre>
                    </div>

                    <h2 id="troubleshooting" className="text-3xl font-bold mb-6">故障排除</h2>
                    <h3 className="text-xl font-semibold mb-4">常见问题</h3>
                    <div className="space-y-6">
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <h4 className="font-semibold text-yellow-800">连接超时</h4>
                        <p className="text-yellow-700">检查网络配置和防火墙规则，确保端口已开放。</p>
                      </div>
                      <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <h4 className="font-semibold text-red-800">认证失败</h4>
                        <p className="text-red-700">验证 Google 凭证文件是否正确配置。</p>
                      </div>
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                        <h4 className="font-semibold text-blue-800">存储错误</h4>
                        <p className="text-blue-700">检查 Redis/MongoDB 连接配置和网络连通性。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">© 2024 gcli2api 项目. 完整技术文档.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
