// 本地项目.prettierrc配置测试 确保每个人项目里面的配置都是一样的
// npx prettier --write app/ 格式化
function test(a, b) {
  const diff = a -b;
  const count = a + b;
  return count;
}
