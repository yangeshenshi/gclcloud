import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { signal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const status = url.searchParams.get("status") || "ready";
    
    return ctx.render({ status });
  },
};

export default function Home({ data }: PageProps) {
  const count = signal(3);
  
  return (
    <>
      <Head>
        <title>gcli2api - Gemini CLI to API Converter</title>
        <meta name="description" content="Web interface for gcli2api - Convert Gemini CLI to API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Navigation */}
        <nav class="bg-white shadow-lg sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <h1 class="text-2xl font-bold text-gray-900">gcli2api</h1>
              </div>
              <div class="flex items-center space-x-8">
                <a href="/" class="text-blue-600 font-semibold">首页</a>
                <a href="/api-test" class="text-gray-700 hover:text-blue-600 transition-colors">API 测试</a>
                <a href="/monitoring" class="text-gray-700 hover:text-blue-600 transition-colors">监控</a>
                <a href="/docs" class="text-gray-700 hover:text-blue-600 transition-colors">文档</a>
                <a href="https://github.com/su-kaka/gcli2api" target="_blank" class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <i class="fab fa-github mr-2"></i>GitHub
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section class="py-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-5xl font-bold text-gray-900 mb-6">
              Gemini CLI to API
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Converter
              </span>
            </h1>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              将 Google Gemini CLI 转换为标准 API 接口，支持多账号管理和云端部署
            </p>
            <div class="flex justify-center space-x-4">
              <a href="/api-test" class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                开始测试
              </a>
              <a href="/docs" class="bg-white text-gray-900 px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-semibold">
                查看文档
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section class="py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">核心特性</h2>
              <p class="text-xl text-gray-600">企业级的功能和性能，满足生产环境需求</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
                <div class="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-exchange-alt text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">API 转换</h3>
                <p class="text-gray-600">将 Gemini CLI 转换为标准 API 接口，兼容 OpenAI API 格式</p>
              </div>
              
              <div class="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
                <div class="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-users text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">多账号管理</h3>
                <p class="text-gray-600">支持多个 Google 账号的凭证管理和自动轮换</p>
              </div>
              
              <div class="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-shadow">
                <div class="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-cloud text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">云端部署</h3>
                <p class="text-gray-600">支持 Docker、Kubernetes 和各大云平台部署</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section class="py-20 bg-gray-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">快速开始</h2>
              <p class="text-xl text-gray-600">简单几步即可开始使用 gcli2api</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 class="text-2xl font-semibold mb-6">部署步骤</h3>
                <div class="space-y-6">
                  <div class="flex items-start space-x-4">
                    <div class="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                    <div>
                      <h4 class="font-semibold mb-2">克隆项目</h4>
                      <p class="text-gray-600">从 GitHub 克隆 gcli2api 项目到本地</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                    <div>
                      <h4 class="font-semibold mb-2">配置环境</h4>
                      <p class="text-gray-600">设置环境变量和配置文件</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
                    <div>
                      <h4 class="font-semibold mb-2">启动服务</h4>
                      <p class="text-gray-600">运行 docker-compose up -d 启动服务</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">4</div>
                    <div>
                      <h4 class="font-semibold mb-2">测试 API</h4>
                      <p class="text-gray-600">使用我们的 API 测试工具验证功能</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 class="text-2xl font-semibold mb-6">代码示例</h3>
                <div class="bg-gray-900 rounded-lg p-4">
                  <pre class="text-green-400 text-sm overflow-x-auto"><code># 快速部署
git clone https://github.com/su-kaka/gcli2api.git
cd gcli2api
docker-compose up -d

# API 调用示例
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
  }'</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Counter Demo */}
        <section class="py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-8">交互式演示</h2>
            <p class="text-xl text-gray-600 mb-8">这是一个使用 Fresh 框架构建的交互式组件</p>
            <div class="flex justify-center">
              <Counter count={count} />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer class="bg-gray-900 text-white py-12">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 class="text-2xl font-bold mb-4">gcli2api</h3>
            <p class="text-gray-400 mb-6">将 Gemini CLI 转换为 API 接口，实现云端智能部署</p>
            <div class="flex justify-center space-x-6">
              <a href="https://github.com/su-kaka/gcli2api" target="_blank" class="text-gray-400 hover:text-white transition-colors">
                <i class="fab fa-github text-2xl"></i>
              </a>
              <a href="https://gcli2api-9xbf.onrender.com" target="_blank" class="text-gray-400 hover:text-white transition-colors">
                <i class="fas fa-external-link-alt text-2xl"></i>
              </a>
            </div>
            <div class="mt-8 pt-8 border-t border-gray-800">
              <p class="text-gray-400">© 2024 gcli2api 项目. 采用 CNC-1.0 许可证.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}