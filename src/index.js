// 本地项目.prettierrc配置测试 确保每个人项目里面的配置都是一样的
// npx prettier --write app/ 格式化
export function test(a, b) {
  const c = 6111;
  const diff = a - b;
  const count = a + b + c;
  return count;
}
