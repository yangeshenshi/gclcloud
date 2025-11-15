import { Head } from "$fresh/runtime.ts";
import { useSignal, useEffect } from "@preact/signals";

export default function Monitoring() {
  const totalRequests = useSignal(12543);
  const successRate = useSignal(98.7);
  const avgResponseTime = useSignal(245);
  const activeAccounts = useSignal(8);

  useEffect(() => {
    const interval = setInterval(() => {
      totalRequests.value += Math.floor(Math.random() * 5) + 1;
      successRate.value = 98.5 + Math.random() * 0.4;
      avgResponseTime.value = Math.floor(240 + Math.random() * 20);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>监控仪表板 - gcli2api</title>
        <meta name="description" content="Real-time monitoring dashboard for gcli2api" />
      </Head>

      <div class="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav class="bg-white shadow-lg sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-gray-900">gcli2api</a>
              </div>
              <div class="flex items-center space-x-8">
                <a href="/" class="text-gray-700 hover:text-blue-600 transition-colors">首页</a>
                <a href="/api-test" class="text-gray-700 hover:text-blue-600 transition-colors">API 测试</a>
                <a href="/monitoring" class="text-blue-600 font-semibold">监控</a>
                <a href="/docs" class="text-gray-700 hover:text-blue-600 transition-colors">文档</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl font-bold mb-4">监控仪表板</h1>
            <p class="text-xl">实时监控 gcli2api 服务状态和性能指标</p>
          </div>
        </section>

        {/* Metrics Overview */}
        <section class="py-12">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Total Requests */}
              <div class="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">总请求数</p>
                    <p class="text-3xl font-bold text-blue-600">{totalRequests.value.toLocaleString()}</p>
                  </div>
                  <div class="bg-blue-100 p-3 rounded-full">
                    <i class="fas fa-chart-line text-blue-600 text-xl"></i>
                  </div>
                </div>
                <div class="mt-4">
                  <span class="text-green-600 text-sm">
                    <i class="fas fa-arrow-up mr-1"></i>+12.5%
                  </span>
                  <span class="text-gray-500 text-sm ml-2">较昨日</span>
                </div>
              </div>
              
              {/* Success Rate */}
              <div class="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">成功率</p>
                    <p class="text-3xl font-bold text-green-600">{successRate.value.toFixed(1)}%</p>
                  </div>
                  <div class="bg-green-100 p-3 rounded-full">
                    <i class="fas fa-check-circle text-green-600 text-xl"></i>
                  </div>
                </div>
                <div class="mt-4">
                  <span class="text-green-600 text-sm">
                    <i class="fas fa-arrow-up mr-1"></i>+0.3%
                  </span>
                  <span class="text-gray-500 text-sm ml-2">较昨日</span>
                </div>
              </div>
              
              {/* Average Response Time */}
              <div class="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">平均响应时间</p>
                    <p class="text-3xl font-bold text-purple-600">{avgResponseTime.value}ms</p>
                  </div>
                  <div class="bg-purple-100 p-3 rounded-full">
                    <i class="fas fa-clock text-purple-600 text-xl"></i>
                  </div>
                </div>
                <div class="mt-4">
                  <span class="text-red-600 text-sm">
                    <i class="fas fa-arrow-down mr-1"></i>-5ms
                  </span>
                  <span class="text-gray-500 text-sm ml-2">较昨日</span>
                </div>
              </div>
              
              {/* Active Accounts */}
              <div class="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">活跃账号数</p>
                    <p class="text-3xl font-bold text-orange-600">{activeAccounts.value}</p>
                  </div>
                  <div class="bg-orange-100 p-3 rounded-full">
                    <i class="fas fa-users text-orange-600 text-xl"></i>
                  </div>
                </div>
                <div class="mt-4">
                  <span class="text-gray-600 text-sm">
                    <i class="fas fa-minus mr-1"></i>0
                  </span>
                  <span class="text-gray-500 text-sm ml-2">较昨日</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Status */}
        <section class="py-12">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-xl shadow-lg p-8">
              <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-server text-blue-600 mr-3"></i>
                服务状态
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center p-6 bg-green-50 rounded-lg">
                  <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-green-600 text-2xl"></i>
                  </div>
                  <h3 class="text-lg font-semibold text-green-800">API 服务</h3>
                  <p class="text-green-600">正常运行</p>
                </div>
                
                <div class="text-center p-6 bg-green-50 rounded-lg">
                  <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-green-600 text-2xl"></i>
                  </div>
                  <h3 class="text-lg font-semibold text-green-800">Redis 存储</h3>
                  <p class="text-green-600">正常运行</p>
                </div>
                
                <div class="text-center p-6 bg-yellow-50 rounded-lg">
                  <div class="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-exclamation-triangle text-yellow-600 text-2xl"></i>
                  </div>
                  <h3 class="text-lg font-semibold text-yellow-800">MongoDB</h3>
                  <p class="text-yellow-600">连接缓慢</p>
                </div>
              </div>
              
              <div class="mt-8">
                <h3 class="text-lg font-semibold mb-4">系统日志</h3>
                <div class="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto">
                  <div class="text-green-400 text-sm font-mono">
                    <div>[2024-01-15 10:23:45] INFO: API request processed successfully</div>
                    <div>[2024-01-15 10:23:44] INFO: Account rotation completed</div>
                    <div>[2024-01-15 10:23:43] INFO: Redis connection established</div>
                    <div>[2024-01-15 10:23:42] WARN: MongoDB connection timeout</div>
                    <div>[2024-01-15 10:23:41] INFO: Service startup completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer class="bg-gray-900 text-white py-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-400">© 2024 gcli2api 项目. 实时监控系统.</p>
          </div>
        </footer>
      </div>
    </>
  );
}