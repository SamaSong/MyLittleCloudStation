// 函数防抖
/**
 * 延迟执行 func，若在 delay 时间内再次调用则重新计时
 * @param {Function} func 需要延迟执行的函数
 * @param {number} delay 等待的毫秒数
 * @returns {Function} 包装后的防抖函数
 */
export default function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    // 每次触发时清除之前的定时器，确保只执行最后一次调用
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      // 使用 callsite 的 this 和参数执行原函数
      func.apply(this, args);
    }, delay);
  };
}
