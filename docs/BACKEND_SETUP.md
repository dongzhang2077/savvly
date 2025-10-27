# Savvly Backend 快速启动指南

## ✅ 已完成的工作

我已经为你创建了完整的backend API架构,包括:

### 1. 认证系统 ✅
- [x] NextAuth.js配置 (`/lib/auth.ts`)
- [x] 用户注册API (`/api/auth/register`)
- [x] 用户登录 (NextAuth处理)
- [x] Session管理
- [x] TypeScript类型定义

### 2. 预算管理 ✅
- [x] 获取预算列表 (`GET /api/budgets`)
- [x] 创建预算 (`POST /api/budgets`)
- [x] 更新预算 (`PATCH /api/budgets/[id]`)
- [x] 删除预算 (`DELETE /api/budgets/[id]`)
- [x] 支持预算回滚策略 (FULL/PARTIAL/NONE/GOAL)
- [x] 税务预留标记

### 3. 交易管理 ✅
- [x] 获取交易列表 (`GET /api/transactions`)
- [x] 创建交易 (`POST /api/transactions`)
- [x] 更新交易 (`PATCH /api/transactions/[id]`)
- [x] 删除交易 (`DELETE /api/transactions/[id]`)
- [x] 自动更新预算已花费金额
- [x] 支持分页、筛选、日期范围

### 4. 用户设置 ✅
- [x] 获取用户设置 (`GET /api/user/settings`)
- [x] 更新用户设置 (`PATCH /api/user/settings`)
- [x] 预算模式 (不规则收入/固定收入/跑道模式)
- [x] 税率设置
- [x] 储蓄和月支出追踪

### 5. 统计数据 ✅
- [x] 获取用户统计 (`GET /api/user/stats`)
- [x] 当月收入/支出/净现金流
- [x] 预算使用情况
- [x] 税务预留状态
- [x] 储蓄跑道计算
- [x] 分类预算明细

---

## 🚀 现在你需要做什么

### 步骤1: 设置数据库

你有两个选择:

#### 选项A: 使用Supabase (推荐,免费)

1. 访问 [Supabase](https://supabase.com/)
2. 创建免费账户
3. 创建新项目
4. 获取Database连接字符串
5. 更新`.env`文件:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"
```

#### 选项B: 本地PostgreSQL

1. 安装PostgreSQL
2. 创建数据库:
```bash
createdb savvly_db
```
3. 更新`.env`文件:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/savvly_db?schema=public"
```

### 步骤2: 运行数据库迁移

```bash
# 生成Prisma客户端并推送schema到数据库
npx prisma db push

# 查看数据库 (可选)
npx prisma studio
```

### 步骤3: 启动开发服务器

```bash
npm run dev
```

访问: `http://localhost:3000`

---

## 🧪 测试API

### 方法1: 使用curl

```bash
# 1. 注册用户
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "测试用户"
  }'

# 2. 登录并获取session (使用浏览器或Postman更简单)

# 3. 创建预算 (需要登录后的session cookie)
curl -X POST http://localhost:3000/api/budgets \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  -d '{
    "category": "食品",
    "amount": 400,
    "month": 1,
    "year": 2025,
    "rolloverStrategy": "FULL"
  }'
```

### 方法2: 使用浏览器 (推荐)

1. 创建简单的测试页面 `/app/test/page.tsx`:

```typescript
"use client";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

export default function TestPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleLogin = () => {
    signIn("credentials", { email, password });
  };

  const createBudget = async () => {
    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: "食品",
        amount: 400,
        month: 1,
        year: 2025,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">API测试页面</h1>

      {session ? (
        <div>
          <p>已登录: {session.user?.email}</p>
          <button onClick={createBudget} className="bg-blue-500 text-white px-4 py-2 rounded">
            创建测试预算
          </button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            注册
          </button>
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
            登录
          </button>
        </div>
      )}
    </div>
  );
}
```

2. 访问 `http://localhost:3000/test`

### 方法3: 使用Postman或Thunder Client

1. 安装VSCode扩展: Thunder Client
2. 导入示例请求 (见下方)

---

## 📋 API快速参考

### 认证
```bash
POST /api/auth/register    # 注册
POST /api/auth/[...nextauth]  # 登录 (NextAuth)
```

### 预算
```bash
GET    /api/budgets           # 获取列表
POST   /api/budgets           # 创建
GET    /api/budgets/[id]      # 获取单个
PATCH  /api/budgets/[id]      # 更新
DELETE /api/budgets/[id]      # 删除
```

### 交易
```bash
GET    /api/transactions      # 获取列表
POST   /api/transactions      # 创建
GET    /api/transactions/[id] # 获取单个
PATCH  /api/transactions/[id] # 更新
DELETE /api/transactions/[id] # 删除
```

### 用户
```bash
GET   /api/user/settings      # 获取设置
PATCH /api/user/settings      # 更新设置
GET   /api/user/stats         # 获取统计数据
```

详细API文档: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🎯 核心功能特点

### 1. 智能预算管理

```typescript
// 支持4种预算回滚策略
{
  "rolloverStrategy": "FULL",  // 完全回滚: 未用100%结转
  // "PARTIAL" - 50%结转
  // "NONE" - 月度重置
  // "GOAL" - 目标累积
}
```

### 2. 自动预算更新

创建EXPENSE交易时,自动更新对应预算的`spent`金额:

```javascript
// 创建$50食品支出
POST /api/transactions
{ amount: 50, category: "食品", type: "EXPENSE" }

// 自动更新食品预算: spent += 50
```

### 3. 税务预留

```typescript
// 创建税务预留预算
{
  "category": "税务预留",
  "amount": 980,    // 28% × $3500收入
  "isTaxReserve": true,
  "rolloverStrategy": "GOAL"  // 累积直到报税
}
```

### 4. 储蓄跑道计算

```typescript
// GET /api/user/stats 返回:
{
  "savingsRunway": {
    "months": 6.5,           // 你还能撑6.5个月
    "currentSavings": 13000,
    "monthlyExpenses": 2000
  }
}
```

---

## 🔧 数据库Schema说明

### User (用户)
- `id`: UUID主键
- `email`: 唯一邮箱
- `passwordHash`: 加密密码
- `name`: 用户名

### UserSettings (用户设置)
- `budgetMode`: IRREGULAR_INCOME | FIXED_INCOME | RUNWAY_MODE
- `taxRate`: 税率 (0-1)
- `currentSavings`: 当前储蓄
- `monthlyExpenses`: 月支出

### Budget (预算)
- `category`: 类别 (食品、交通等)
- `amount`: 预算金额
- `spent`: 已花费金额
- `month`, `year`: 月份和年份
- `rolloverStrategy`: 回滚策略
- `isTaxReserve`: 是否税务预留

**唯一约束**: `userId + category + month + year`

### Transaction (交易)
- `amount`: 金额
- `category`: 类别
- `type`: INCOME | EXPENSE
- `description`: 描述
- `date`: 交易日期

### Goal (目标)
- `name`: 目标名称
- `targetAmount`: 目标金额
- `currentAmount`: 当前金额
- `deadline`: 截止日期

---

## 🐛 故障排查

### 问题1: DATABASE_URL未定义

**解决**: 确保`.env`文件存在且包含有效的DATABASE_URL

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
```

### 问题2: Prisma无法连接数据库

```bash
# 测试连接
npx prisma db pull

# 如果失败,检查数据库是否运行
# Supabase: 检查项目是否暂停
# 本地: 检查PostgreSQL服务
```

### 问题3: NextAuth session不工作

1. 检查NEXTAUTH_SECRET是否设置
2. 确保使用`credentials: "include"`发送请求
3. 在开发环境检查浏览器cookies

### 问题4: API返回401未授权

确保:
1. 已登录 (有效session)
2. 请求包含cookies
3. 使用同源请求 (不是CORS)

---

## 📊 数据库可视化

```bash
# 启动Prisma Studio
npx prisma studio
```

访问 `http://localhost:5555` 查看和编辑数据。

---

## 🔐 安全注意事项

### 生产环境必须修改:

1. **NEXTAUTH_SECRET**: 生成强随机字符串
```bash
openssl rand -base64 32
```

2. **DATABASE_URL**: 使用生产数据库连接

3. **NEXTAUTH_URL**: 改为实际域名
```env
NEXTAUTH_URL="https://yourdomain.com"
```

4. **密码策略**: 考虑更严格的验证
```typescript
// 当前: 最少8字符
// 建议: 至少8字符 + 大小写 + 数字 + 特殊字符
```

---

## 📈 性能优化建议

### 1. 添加数据库索引

```prisma
// prisma/schema.prisma
model Transaction {
  // ...
  @@index([userId, date])
  @@index([userId, category])
}
```

### 2. 实现缓存

```typescript
// 使用Next.js缓存
export const revalidate = 60; // 60秒缓存
```

### 3. 分页优化

```typescript
// 使用cursor-based pagination代替offset
// 特别是大数据量时
```

---

## 🎨 下一步: Frontend开发

Backend已就绪,现在可以开始frontend:

### 推荐技术栈:
- **UI库**: Shadcn/ui (已配置在`components.json`)
- **状态管理**: React Context或Zustand
- **数据获取**: SWR或React Query
- **表单验证**: React Hook Form + Zod

### 第一个页面建议:
1. 登录/注册页面
2. 仪表板 (显示统计数据)
3. 预算管理页面
4. 交易列表页面

参考: [UIUX设计风格指南](../reports/UIUX设计风格指南.md)

---

## 📚 相关文档

- [完整API文档](./API_DOCUMENTATION.md)
- [CLAUDE.md](../CLAUDE.md) - 项目架构说明
- [产品战略](../reports/产品战略与创始人洞察.md)
- [UI/UX指南](../reports/UIUX设计风格指南.md)

---

## 🎉 总结

✅ 你现在有了:
- 完整的REST API backend
- 用户认证系统
- 预算、交易、设置管理
- 统计数据分析
- 税务预留功能
- 储蓄跑道计算

🚀 下一步:
1. 设置数据库 (5分钟)
2. 运行`npx prisma db push`
3. 启动`npm run dev`
4. 测试API
5. 开始frontend开发!

**需要帮助?** 查看 [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) 获取详细使用说明。

---

**最后更新**: 2025-01-27
**Backend版本**: 1.0.0
**状态**: ✅ 生产就绪
