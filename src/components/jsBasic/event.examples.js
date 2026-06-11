export const delegateHtmlExample = [
  '<ul id="myLinks">',
  '  <li id="goSomewhere">Go somewhere</li>',
  '  <li id="doSomething">Do something</li>',
  '  <li id="sayHi">Say hi</li>',
  '</ul>',
].join('\n')

export const multipleHandlersExample = `let item2 = document.getElementById("doSomething");
let item3 = document.getElementById("sayHi");

item1.addEventListener("click", (event) => {
  location.href = "http://www.wrox.com";
});

item2.addEventListener("click", (event) => {
  document.title = "I changed the document's title";
});

item3.addEventListener("click", (event) => {
  console.log("hi");
});`

export const delegatedHandlerExample = `let list = document.getElementById("myLinks");

list.addEventListener("click", (event) => {
  let target = event.target;

  switch (target.id) {
    case "doSomething":
      document.title = "I changed the document's title";
      break;
    case "goSomewhere":
      location.href = "http://www.wrox.com";
      break;
    case "sayHi":
      console.log("hi");
      break;
  }
});`

export const eventLoopExample = `console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
  console.log('promise then')
})

queueMicrotask(() => {
  console.log('queueMicrotask')
})

console.log('script end')

// 输出顺序:
// script start
// script end
// promise then
// queueMicrotask
// setTimeout`
