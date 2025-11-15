import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";

interface ApiTestState {
  url: string;
  apiKey: string;
  model: string;
  message: string;
  response: string;
  status: string;
  responseTime: number;
}

export default function ApiTest() {
  const url = useSignal("http://localhost:7861/v1/chat/completions");
  const apiKey = useSignal("pwd");
  const model = useSignal("gemini-1.5-pro");
  const message = useSignal("你好，请介绍一下你自己。");
  const response = useSignal("");
  const status = useSignal("等待请求...");
  const responseTime = useSignal(0);
  const curlCode = useSignal("");
  const pythonCode = useSignal("");

  const testAPI = async () => {
    status.value = "发送请求中...";
    const startTime = Date.now();

    try {
      const res = await fetch(url.value, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model.value,
          messages: [
            {
              role: "user",
              content: message.value,
            },
          ],
        }),
      });

      const endTime = Date.now();
      responseTime.value = endTime - startTime;

      if (res.ok) {
        const data = await res.json();
        status.value = `成功 (${res.status})`;
        response.value = JSON.stringify(data, null, 2);
      } else {
        const error = await res.text();
        status.value = `错误 (${res.status})`;
        response.value = error;
      }
    } catch (error) {
      const endTime = Date.now();
      responseTime.value = endTime - startTime;
      status.value = "网络错误";
      response.value = error.message;
    }
  };

  const generateCode = () => {
    curlCode.value = `curl -X POST "${url.value}" \
  -H "Authorization: Bearer ${apiKey.value}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "${model.value}",
    "messages": [
      {
        "role": "user",
        "content": "${message.value}"
      }
    ]
  }'`;

    pythonCode.value = `import requests
import json

url = "${url.value}"
headers = {
    "Authorization": "Bearer ${apiKey.value}",
    "Content-Type": "application/json"
}

data = {
    "model": "${model.value}",
    "messages": [
        {
            "role": "user",
            "content": "${message.value}"
        }
    ]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`;
  };

  // Generate initial code
  if (!curlCode.value) {
    generateCode();
  }

  return (
    <>
      <Head>
        <title>API 测试 - gcli2api</title>
        <meta name="description" content="Test gcli2api API functionality" />
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
                <a href="/api-test" class="text-blue-600 font-semibold">API 测试</a>
                <a href="/monitoring" class="text-gray-700 hover:text-blue-600 transition-colors">监控</a>
                <a href="/docs" class="text-gray-700 hover:text-blue-600 transition-colors">文档</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Header */}
        <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl font-bold mb-4">API 测试工具</h1>
            <p class="text-xl">测试 gcli2api 的 API 功能和响应</p>
          </div>
        </section>

        {/* API Test Section */}
        <section class="py-20">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Request Configuration */}
              <div class="bg-white rounded-xl shadow-lg p-8">
                <h2 class="text-2xl font-bold mb-6 flex items-center">
                  <i class="fas fa-paper-plane text-blue-600 mr-3"></i>
                  请求配置
                </h2>
                
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">API 地址</label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => url.value = e.currentTarget.value}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">认证密钥</label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => apiKey.value = e.currentTarget.value}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">模型选择</label>
                    <select
                      value={model}
                      onChange={(e) => model.value = e.currentTarget.value}
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                      <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                      <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">消息内容</label>
                    <textarea
                      value={message}
                      onChange={(e) => message.value = e.currentTarget.value}
                      rows="4"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div class="flex space-x-4">
                    <button
                      onClick={testAPI}
                      class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      <i class="fas fa-play mr-2"></i>发送请求
                    </button>
                    <button
                      onClick={generateCode}
                      class="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                    >
                      <i class="fas fa-code mr-2"></i>生成代码
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Response Display */}
              <div class="bg-white rounded-xl shadow-lg p-8">
                <h2 class="text-2xl font-bold mb-6 flex items-center">
                  <i class="fas fa-reply text-green-600 mr-3"></i>
                  响应结果
                </h2>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">状态</label>
                    <div class="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">
                      {status}
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">响应时间</label>
                    <div class="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">
                      {responseTime} ms
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">响应内容</label>
                    <div class="bg-gray-900 rounded-lg p-4 h-64 overflow-auto">
                      <pre class="text-green-400 text-sm">{response || "// 响应将在这里显示"}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Code Generation */}
            <div class="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h2 class="text-2xl font-bold mb-6 flex items-center">
                <i class="fas fa-code text-purple-600 mr-3"></i>
                代码示例
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="text-lg font-semibold mb-4">cURL 命令</h3>
                  <div class="bg-gray-900 rounded-lg p-4 h-48 overflow-auto">
                    <pre class="text-green-400 text-sm">{curlCode || "# 点击\"生成代码\"按钮生成 cURL 命令"}</pre>
                  </div>
                </div>
                
                <div>
                  <h3 class="text-lg font-semibold mb-4">Python 代码</h3>
                  <div class="bg-gray-900 rounded-lg p-4 h-48 overflow-auto">
                    <pre class="text-green-400 text-sm">{pythonCode || "# 点击\"生成代码\"按钮生成 Python 代码"}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer class="bg-gray-900 text-white py-8">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-400">© 2024 gcli2api 项目. 开源 API 转换工具.</p>
          </div>
        </footer>
      </div>
    </>
  );
}