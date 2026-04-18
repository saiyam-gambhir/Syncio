module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script"
  },
  ignorePatterns: [
    "client/**",
    "node_modules/**",
    "prisma/**",
    ".next/**"
  ]
}
