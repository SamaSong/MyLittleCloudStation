export const windowGlobalExample = `var age = 29;
var sayAge = () => alert(this.age);

alert(window.age); // 29
sayAge(); // 29
window.sayAge(); // 29`

export const queryStringArgsExample = `let getQueryStringArgs = function() {
  // 取得没有开头问号的查询字符串
  let qs = location.search.length > 0 ? location.search.substring(1) : "";
  let args = {};

  // 把每个参数添加到 args 对象
  for (let item of qs.split("&").map(kv => kv.split("="))) {
    let name = decodeURIComponent(item[0]);
    let value = decodeURIComponent(item[1]);

    if (name.length) {
      args[name] = value;
    }
  }

  return args;
}`

export const urlSearchParamsExample = 'let searchParams = new URLSearchParams(location.search);'
