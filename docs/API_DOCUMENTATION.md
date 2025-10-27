# Savvly Backend API Documentation

## 🚀 快速开始

### 1. 数据库设置

你需要先设置PostgreSQL数据库。有两个选项:

#### 选项A: 本地PostgreSQL
```bash
# 更新 .env 文件中的 DATABASE_URL
DATABASE_URL="postgresql://user:password@localhost:5432/savvly_db?schema=public"
```

#### 选项B: 云数据库 (推荐开发使用)
使用 [Supabase](https://supabase.com/) 或 [Neon](https://neon.tech/) 免费PostgreSQL:

```bash
# 示例 Supabase URL
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
```

### 2. 运行数据库迁移

```bash
# 生成Prisma客户端并同步数据库schema
npx prisma db push

# 或者创建migration
npx prisma migrate dev --name init
```

### 3. 启动开发服务器

```bash
npm run dev
```

服务器运行在: `http://localhost:3000`

---

## 📚 API端点总览

### 认证 (Authentication)

| 方法 | 路径 | 描述 | 需要认证 |
|------|------|------|----------|
| POST | `/api/auth/register` | 用户注册 | ❌ |
| POST | `/api/auth/signin` | 用户登录 | ❌ |
| POST | `/api/auth/signout` | 用户登出 | ✅ |
| GET  | `/api/auth/session` | 获取当前session | ❌ |

### 预算 (Budgets)

| 方法 | 路径 | 描述 | 需要认证 |
|------|------|------|----------|
| GET | `/api/budgets` | 获取用户预算列表 | ✅ |
| POST | `/api/budgets` | 创建新预算 | ✅ |
| GET | `/api/budgets/[id]` | 获取单个预算 | ✅ |
| PATCH | `/api/budgets/[id]` | 更新预算 | ✅ |
| DELETE | `/api/budgets/[id]` | 删除预算 | ✅ |

### 交易 (Transactions)

| 方法 | 路径 | 描述 | 需要认证 |
|------|------|------|----------|
| GET | `/api/transactions` | 获取交易列表 | ✅ |
| POST | `/api/transactions` | 创建新交易 | ✅ |
| GET | `/api/transactions/[id]` | 获取单个交易 | ✅ |
| PATCH | `/api/transactions/[id]` | 更新交易 | ✅ |
| DELETE | `/api/transactions/[id]` | 删除交易 | ✅ |

### 用户 (User)

| 方法 | 路径 | 描述 | 需要认证 |
|------|------|------|----------|
| GET | `/api/user/settings` | 获取用户设置 | ✅ |
| PATCH | `/api/user/settings` | 更新用户设置 | ✅ |
| GET | `/api/user/stats` | 获取用户统计数据 | ✅ |

---

## 🔐 认证API详情

### POST `/api/auth/register` - 用户注册

**请求体:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "张三" // 可选
}
```

**成功响应 (201):**
```json
{
  "message": "注册成功",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "张三",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**验证规则:**
- `email`: 必须是有效的邮箱格式
- `password`: 至少8个字符
- `name`: 可选,如果不提供会使用邮箱前缀

---

### POST `/api/auth/[...nextauth]` - 登录 (NextAuth)

使用NextAuth进行登录。前端示例:

```typescript
import { signIn } from "next-auth/react";

const result = await signIn("credentials", {
  email: "user@example.com",
  password: "password123",
  redirect: false,
});

if (result?.error) {
  console.error("登录失败:", result.error);
} else {
  console.log("登录成功");
}
```

---

## 💰 预算API详情

### GET `/api/budgets` - 获取预算列表

**查询参数:**
- `month` (可选): 月份 (1-12)
- `year` (可选): 年份 (例: 2025)

如果不提供参数,返回当前月份的预算。

**成功响应 (200):**
```json
{
  "budgets": [
    {
      "id": "uuid",
      "category": "食品",
      "amount": 400,
      "spent": 280,
      "month": 1,
      "year": 2025,
      "rolloverStrategy": "FULL",
      "isTaxReserve": false,
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### POST `/api/budgets` - 创建预算

**请求体:**
```json
{
  "category": "食品",
  "amount": 400,
  "month": 1,
  "year": 2025,
  "rolloverStrategy": "FULL", // 可选: FULL | PARTIAL | NONE | GOAL
  "isTaxReserve": false // 可选
}
```

**成功响应 (201):**
```json
{
  "message": "预算创建成功",
  "budget": {
    "id": "uuid",
    "category": "食品",
    "amount": 400,
    "spent": 0,
    "month": 1,
    "year": 2025,
    "rolloverStrategy": "FULL",
    "isTaxReserve": false
  }
}
```

**预算回滚策略说明:**
- `FULL`: 完全回滚 - 未用金额100%结转下月
- `PARTIAL`: 部分回滚 - 未用金额50%结转,50%回收
- `NONE`: 无回滚 - 每月重新开始
- `GOAL`: 目标导向 - 永久累积直到达成目标

---

### PATCH `/api/budgets/[id]` - 更新预算

**请求体 (所有字段可选):**
```json
{
  "amount": 500,
  "spent": 300,
  "rolloverStrategy": "PARTIAL"
}
```

---

### DELETE `/api/budgets/[id]` - 删除预算

**成功响应 (200):**
```json
{
  "message": "预算删除成功"
}
```

---

## 📊 交易API详情

### GET `/api/transactions` - 获取交易列表

**查询参数:**
- `limit` (可选): 每页数量,默认50
- `offset` (可选): 偏移量,默认0
- `category` (可选): 按类别筛选
- `type` (可选): `INCOME` 或 `EXPENSE`
- `startDate` (可选): 起始日期 (ISO 8601)
- `endDate` (可选): 结束日期 (ISO 8601)

**成功响应 (200):**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "amount": 50,
      "category": "食品",
      "type": "EXPENSE",
      "description": "超市购物",
      "date": "2025-01-15T10:30:00.000Z",
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

---

### POST `/api/transactions` - 创建交易

**请求体:**
```json
{
  "amount": 50,
  "category": "食品",
  "type": "EXPENSE", // INCOME | EXPENSE
  "description": "超市购物", // 可选
  "date": "2025-01-15T10:30:00.000Z" // 可选,默认当前时间
}
```

**重要**: 创建EXPENSE类型交易时,会自动更新对应预算的`spent`金额。

**成功响应 (201):**
```json
{
  "message": "交易创建成功",
  "transaction": {
    "id": "uuid",
    "amount": 50,
    "category": "食品",
    "type": "EXPENSE",
    "description": "超市购物",
    "date": "2025-01-15T10:30:00.000Z"
  }
}
```

---

### PATCH `/api/transactions/[id]` - 更新交易

**请求体 (所有字段可选):**
```json
{
  "amount": 60,
  "category": "餐饮",
  "description": "晚餐",
  "date": "2025-01-15T18:00:00.000Z"
}
```

**重要**: 更新EXPENSE交易的金额或类别时,会自动调整预算:
1. 从旧预算中减去旧金额
2. 向新预算中添加新金额

---

### DELETE `/api/transactions/[id]` - 删除交易

删除EXPENSE交易时,会自动从对应预算的`spent`中减去该金额。

---

## ⚙️ 用户设置API详情

### GET `/api/user/settings` - 获取用户设置

**成功响应 (200):**
```json
{
  "settings": {
    "id": "uuid",
    "userId": "uuid",
    "budgetMode": "IRREGULAR_INCOME",
    "taxRate": 0.28,
    "currentSavings": 5000,
    "monthlyExpenses": 2000,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-15T00:00:00.000Z"
  }
}
```

**预算模式说明:**
- `IRREGULAR_INCOME`: 不规则收入模式 (自由职业者)
- `FIXED_INCOME`: 固定收入模式 (全职工作)
- `RUNWAY_MODE`: 储蓄跑道模式 (学生/消耗期)

---

### PATCH `/api/user/settings` - 更新用户设置

**请求体 (所有字段可选):**
```json
{
  "budgetMode": "IRREGULAR_INCOME",
  "taxRate": 0.28, // 0-1 之间,例如0.28 = 28%
  "currentSavings": 5000,
  "monthlyExpenses": 2000
}
```

**税率参考 (加拿大):**
- BC省 (温哥华): 0.28 (28%)
- 安大略省 (多伦多): 0.30 (30%)
- 魁北克省: 0.32 (32%)
- 阿尔伯塔省: 0.25 (25%)

---

## 📈 用户统计API详情

### GET `/api/user/stats` - 获取统计数据

提供当前月份的综合财务统计。

**成功响应 (200):**
```json
{
  "stats": {
    "currentMonth": {
      "income": 3500,
      "expenses": 2200,
      "netCashFlow": 1300
    },
    "budget": {
      "total": 2500,
      "spent": 1800,
      "remaining": 700,
      "percentUsed": 72
    },
    "taxReserve": {
      "amount": 980,
      "reserved": 980
    },
    "savingsRunway": {
      "months": 6.5,
      "currentSavings": 13000,
      "monthlyExpenses": 2000
    },
    "budgetCategories": [
      {
        "category": "食品",
        "budgeted": 400,
        "spent": 320,
        "remaining": 80,
        "percentUsed": 80
      }
    ]
  }
}
```

**储蓄跑道计算:**
```
储蓄跑道(月) = 当前储蓄 / 月支出
```

这个指标特别适合:
- 学生 (计算能撑到毕业)
- 失业求职期
- 职业转型期
- 创业准备期

---

## 🔒 认证与授权

所有需要认证的端点都使用NextAuth.js session验证。

### 在客户端组件中使用:

```typescript
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>加载中...</div>;
  if (status === "unauthenticated") return <div>请登录</div>;

  return <div>欢迎, {session.user.email}</div>;
}
```

### 在服务器组件中使用:

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>请登录</div>;
  }

  return <div>欢迎, {session.user.email}</div>;
}
```

### 在API中发送认证请求:

```typescript
// 使用fetch
const response = await fetch("/api/budgets", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    category: "食品",
    amount: 400,
    month: 1,
    year: 2025,
  }),
  credentials: "include", // 重要: 包含cookies
});
```

---

## ❌ 错误处理

所有API端点返回一致的错误格式:

**验证错误 (400):**
```json
{
  "error": "验证失败",
  "details": [
    {
      "path": ["email"],
      "message": "邮箱格式无效"
    }
  ]
}
```

**未授权 (401):**
```json
{
  "error": "未授权"
}
```

**未找到 (404):**
```json
{
  "error": "预算不存在"
}
```

**服务器错误 (500):**
```json
{
  "error": "创建预算失败"
}
```

---

## 🧪 测试API

### 使用curl测试:

```bash
# 注册
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 创建预算 (需要先登录获取session)
curl -X POST http://localhost:3000/api/budgets \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{"category":"食品","amount":400,"month":1,"year":2025}'
```

### 使用Postman:

1. 导入环境变量: `BASE_URL = http://localhost:3000`
2. 先调用注册/登录API
3. Session会自动保存在cookies中
4. 后续请求会自动包含认证信息

---

## 📝 下一步开发

### 即将实现的功能:

1. **预算回滚自动化**
   - `POST /api/budgets/rollover` - 月末自动执行回滚

2. **税务计算工具**
   - `POST /api/tax/calculate` - 根据收入计算应预留税款
   - `GET /api/tax/summary` - 年度税务总结

3. **目标(Goals)管理**
   - `GET /api/goals` - 获取储蓄目标列表
   - `POST /api/goals` - 创建新目标

4. **收入平滑可视化**
   - `GET /api/income/analysis` - 收入波动分析

5. **AI自动分类**
   - `POST /api/transactions/classify` - AI智能分类交易

---

## 🐛 常见问题

### Q: 为什么Prisma报错"DATABASE_URL未定义"?

A: 检查`.env`文件是否存在且包含有效的DATABASE_URL。

### Q: NextAuth版本与Next.js 16不兼容?

A: 使用`--legacy-peer-deps`安装依赖:
```bash
npm install --legacy-peer-deps
```

### Q: 如何重置数据库?

A:
```bash
npx prisma db push --force-reset
```
**警告**: 这会删除所有数据!

### Q: 如何查看数据库内容?

A:
```bash
npx prisma studio
```
这会打开一个Web界面来查看和编辑数据。

---

## 📚 相关文档

- [Prisma文档](https://www.prisma.io/docs)
- [NextAuth.js文档](https://next-auth.js.org/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Zod验证库](https://zod.dev/)

---

**最后更新**: 2025-01-27
**版本**: 1.0.0
