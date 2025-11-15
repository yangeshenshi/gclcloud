import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface CounterProps {
  count: any;
}

export default function Counter({ count }: CounterProps) {
  const localCount = useSignal(count.value);

  return (
    <div class="flex flex-col items-center space-y-4 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <div class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        {localCount.value}
      </div>
      <div class="flex space-x-4">
        <button
          onClick={() => localCount.value--}
          disabled={!IS_BROWSER}
          class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          -1
        </button>
        <button
          onClick={() => localCount.value++}
          disabled={!IS_BROWSER}
          class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          +1
        </button>
      </div>
      <p class="text-gray-600 text-center max-w-md">
        这个计数器演示了 Fresh 框架的交互式组件功能。
        {IS_BROWSER ? "组件已在浏览器中激活！" : "正在加载交互功能..."}
      </p>
    </div>
  );
}