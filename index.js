setTimeout(() => {
  console.log("Hello World");
}, 3000);

new Promise((resolve, reject) => {
  console.log("feed back");
  return resolve();
}).then((res) => {
  console.log("Resolve");
});

console.log("req");
