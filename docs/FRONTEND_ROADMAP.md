# Savvly 前端开发路线图

## 🎯 开发策略

**开发流程**: 环境配置 → 基础组件 → 静态页面 → API 集成 → 联调测试 → 优化上线

---

## 📅 详细开发计划（10周）

### 第一阶段：环境配置与基础设施（Week 1）

#### 任务清单

**1. 配置开发环境（Day 1-2）**

```bash
# 1. 初始化 Shadcn/ui
npx shadcn@latest init

# 选择配置:
# - Style: New York
# - Base color: Blue
# - CSS variables: Yes

# 2. 安装基础组件
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add toast
npx shadcn@latest add progress
npx shadcn@latest add badge
npx shadcn@latest add skeleton

# 3. 安装额外依赖
npm install lucide-react       # 图标库
npm install react-hook-form    # 表单管理
npm install @hookform/resolvers # 表单验证
npm install date-fns           # 日期处理（已安装）
```

**2. 配置 Tailwind 色彩系统（Day 2）**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - 平静蓝
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        // Secondary - 成长绿
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
        },
        // Accent - 希望橙
        accent: {
          50: '#fffbeb',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // Attention - 柔和珊瑚（替代红色）
        attention: {
          400: '#fb923c',
          500: '#f97316',
        },
      },
    },
  },
  plugins: [],
}
export default config
```

**3. 创建项目目录结构（Day 2）**

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 认证路由组
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/       # 仪表板路由组
│   │   ├── budgets/
│   │   ├── transactions/
│   │   └── settings/
│   ├── api/               # API 路由（已有）
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                # Shadcn/ui 基础组件
│   ├── layout/            # 布局组件
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── bottom-navigation.tsx
│   ├── dashboard/         # 仪表板组件
│   │   ├── stat-card.tsx
│   │   └── budget-card.tsx
│   ├── budget/            # 预算组件
│   └── transaction/       # 交易组件
├── lib/
│   ├── utils.ts           # 工具函数（已有）
│   ├── api-client.ts      # API 客户端
│   └── constants.ts       # 常量定义
└── types/
    └── index.ts           # 类型定义（已有）
```

**4. 创建 API 客户端（Day 3）**

```typescript
// lib/api-client.ts
import { getSession } from "next-auth/react"

class ApiClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || ''

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const session = await getSession()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(session?.user && {
        Authorization: `Bearer ${session.user.id}`
      }),
      ...options.headers,
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  // Budget APIs
  async getBudgets(month?: number, year?: number) {
    const params = new URLSearchParams()
    if (month) params.append('month', month.toString())
    if (year) params.append('year', year.toString())

    return this.request(`/api/budgets?${params}`)
  }

  async createBudget(data: any) {
    return this.request('/api/budgets', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // 更多 API 方法...
}

export const apiClient = new ApiClient()
```

**验收标准：**
- [ ] Shadcn/ui 组件正常导入
- [ ] Tailwind 色彩变量生效
- [ ] 项目结构清晰
- [ ] API 客户端可用

---

### 第二阶段：基础组件开发（Week 2）

#### 任务清单

**1. 开发布局组件（Day 1-2）**

```typescript
// components/layout/dashboard-layout.tsx
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r bg-white">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </div>
  )
}
```

**2. 开发复合组件（Day 3-4）**

- `BudgetCard` - 预算卡片（多种状态）
- `StatCard` - 统计卡片
- `TransactionRow` - 交易行
- `EmptyState` - 空状态

**3. 创建常量和工具（Day 5）**

```typescript
// lib/constants.ts
export const BUDGET_CATEGORIES = [
  { value: 'food', label: 'Food', emoji: '🍔' },
  { value: 'transport', label: 'Transport', emoji: '🚗' },
  { value: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  // ...
] as const

export const ROLLOVER_STRATEGIES = [
  { value: 'FULL', label: 'Full Rollover' },
  { value: 'PARTIAL', label: 'Partial Rollover' },
  { value: 'NONE', label: 'No Rollover' },
  { value: 'GOAL', label: 'Goal-Based' },
] as const

// lib/utils.ts 新增
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function getProgressColor(percentage: number): string {
  if (percentage > 90) return 'bg-attention-400'
  if (percentage > 70) return 'bg-yellow-500'
  return 'bg-secondary-500'
}
```

**验收标准：**
- [ ] 所有基础组件可正常渲染
- [ ] 组件支持响应式
- [ ] 组件样式符合设计规范
- [ ] 工具函数测试通过

---

### 第三阶段：认证页面开发（Week 3）

#### 任务清单

**1. 实现登录页面（Day 1-2）**

```typescript
// app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      toast({
        title: "Hmm...",
        description: "Email or password doesn't match. Try again?",
        variant: "destructive",
      })
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">👋 Welcome Back</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Google OAuth */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In →'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-primary-600 hover:underline">
            Sign up
          </a>
        </p>

        <p className="text-center text-xs text-gray-500">
          🔒 Your data is securely encrypted
        </p>
      </div>
    </div>
  )
}
```

**2. 实现注册页面（Day 2-3）**

**3. 表单验证（Day 4）**

使用 React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

// 在组件中使用
const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
})
```

**验收标准：**
- [ ] 登录页面完整实现
- [ ] 注册页面完整实现
- [ ] 表单验证正常工作
- [ ] Google OAuth 可用
- [ ] 错误提示友好（英文）

---

### 第四阶段：主仪表板开发（Week 4-5）

#### 任务清单

**1. 实现仪表板布局（Week 4, Day 1-2）**

```typescript
// app/(dashboard)/page.tsx
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AvailableIncomeCard } from '@/components/dashboard/available-income-card'
import { BudgetHealthCard } from '@/components/dashboard/budget-health-card'
import { BudgetCard } from '@/components/dashboard/budget-card'
import { UpcomingBillsCard } from '@/components/dashboard/upcoming-bills-card'
import { RecentTransactions } from '@/components/dashboard/recent-transactions'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Top Summary Cards */}
      <div className="space-y-6 mb-6">
        <AvailableIncomeCard />
        <BudgetHealthCard />
      </div>

      {/* Budget Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <BudgetCard category="food" />
        <BudgetCard category="transport" />
        <BudgetCard category="entertainment" />
        {/* More budget cards */}
      </div>

      {/* Upcoming Bills */}
      <UpcomingBillsCard />

      {/* Recent Transactions */}
      <RecentTransactions />
    </DashboardLayout>
  )
}
```

**2. 开发仪表板组件（Week 4, Day 3-5）**

- `AvailableIncomeCard` - 可用收入卡片
- `BudgetHealthCard` - 预算健康卡片
- `BudgetCard` - 预算卡片（完整版）
- `UpcomingBillsCard` - 即将到来的账单
- `RecentTransactions` - 最近交易

**3. 实现空状态（Week 5, Day 1）**

**4. 实现骨架屏加载（Week 5, Day 2）**

**5. 响应式优化（Week 5, Day 3-5）**

**验收标准：**
- [ ] 仪表板所有组件正常显示
- [ ] 数据使用 mock 数据
- [ ] 响应式在所有设备正常
- [ ] 空状态友好
- [ ] 加载状态流畅

---

### 第五阶段：预算管理开发（Week 6-7）

#### 任务清单

**1. 预算列表页面（Week 6, Day 1-2）**

```typescript
// app/(dashboard)/budgets/page.tsx
export default function BudgetsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Budget Management</h1>
          <Button onClick={() => router.push('/budgets/create')}>
            + Create Budget
          </Button>
        </div>

        {/* Monthly Overview */}
        <MonthlyOverviewCard />

        {/* Filters */}
        <BudgetFilters />

        {/* Budget List */}
        <BudgetList />
      </div>
    </DashboardLayout>
  )
}
```

**2. 创建预算表单（Week 6, Day 3-5）**

- 预算类别选择
- 金额输入
- 回滚策略设置（4种策略）
- 表单验证

**3. 编辑预算页面（Week 7, Day 1-2）**

**4. 预算详情页面（Week 7, Day 3-4）**

- 预算使用情况
- 趋势图表（可用 Recharts）
- 回滚设置显示
- 相关交易列表

**5. 批量操作（Week 7, Day 5）**

**验收标准：**
- [ ] 预算 CRUD 完整实现
- [ ] 回滚策略设置可用
- [ ] 表单验证完善
- [ ] UI 响应流畅

---

### 第六阶段：交易管理开发（Week 8）

#### 任务清单

**1. 交易列表页面（Day 1-2）**

**2. 添加交易表单（Day 3-4）**

- 金额输入
- 类别选择
- 日期选择
- 描述输入
- 收入/支出切换

**3. 编辑交易（Day 5）**

**验收标准：**
- [ ] 交易列表可正常显示
- [ ] 添加交易表单完整
- [ ] 分类筛选可用
- [ ] 日期筛选可用

---

### 第七阶段：API 集成与联调（Week 9）

#### 任务清单

**1. 替换 Mock 数据为真实 API（Day 1-3）**

```typescript
// Before (Mock)
const budgets = [
  { id: '1', category: 'food', amount: 400, spent: 280 }
]

// After (Real API)
const { data: budgets, isLoading } = useQuery({
  queryKey: ['budgets', month, year],
  queryFn: () => apiClient.getBudgets(month, year)
})
```

**2. 实现数据获取 Hooks（Day 2-3）**

使用 TanStack Query (React Query):

```bash
npm install @tanstack/react-query
```

```typescript
// hooks/use-budgets.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

export function useBudgets(month?: number, year?: number) {
  return useQuery({
    queryKey: ['budgets', month, year],
    queryFn: () => apiClient.getBudgets(month, year),
  })
}

export function useCreateBudget() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) => apiClient.createBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })
}
```

**3. 错误处理（Day 4）**

**4. 联调测试（Day 5）**

- 测试所有 API 端点
- 验证数据流
- 修复 bug

**验收标准：**
- [ ] 所有页面连接真实 API
- [ ] 数据获取正常
- [ ] 错误处理完善
- [ ] 加载状态正常

---

### 第八阶段：优化与测试（Week 10）

#### 任务清单

**1. 性能优化（Day 1-2）**

- 代码分割
- 图片优化
- 懒加载

**2. 响应式测试（Day 3）**

- 移动端测试（iPhone, Android）
- 平板测试（iPad）
- 桌面测试（各种屏幕尺寸）

**3. 浏览器兼容性（Day 4）**

- Chrome
- Safari
- Firefox
- Edge

**4. 无障碍测试（Day 5）**

- 键盘导航
- 屏幕阅读器
- 色彩对比度

**验收标准：**
- [ ] Lighthouse 分数 > 90
- [ ] 所有设备显示正常
- [ ] 所有浏览器兼容
- [ ] 无障碍检查通过

---

## 🛠️ 开发工具推荐

### 必装 VS Code 插件

```
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
```

### 浏览器开发工具

```
- React Developer Tools
- Redux DevTools (如果使用)
- TanStack Query DevTools
```

---

## 📊 进度追踪

### Week 1: 环境配置
- [ ] Shadcn/ui 安装
- [ ] Tailwind 配置
- [ ] 项目结构
- [ ] API 客户端

### Week 2: 基础组件
- [ ] 布局组件
- [ ] 复合组件
- [ ] 工具函数
- [ ] 常量定义

### Week 3: 认证页面
- [ ] 登录页面
- [ ] 注册页面
- [ ] 表单验证
- [ ] OAuth 集成

### Week 4-5: 主仪表板
- [ ] 布局实现
- [ ] 统计卡片
- [ ] 预算卡片
- [ ] 交易列表
- [ ] 响应式优化

### Week 6-7: 预算管理
- [ ] 预算列表
- [ ] 创建预算
- [ ] 编辑预算
- [ ] 预算详情
- [ ] 批量操作

### Week 8: 交易管理
- [ ] 交易列表
- [ ] 添加交易
- [ ] 编辑交易
- [ ] 筛选功能

### Week 9: API 集成
- [ ] 替换 Mock 数据
- [ ] 实现数据 Hooks
- [ ] 错误处理
- [ ] 联调测试

### Week 10: 优化测试
- [ ] 性能优化
- [ ] 响应式测试
- [ ] 浏览器测试
- [ ] 无障碍测试

---

## 🎯 关键注意事项

### 1. 所有 UI 文本使用英文
参考 [docs/wireframes/ENGLISH-COPY-REFERENCE.md](../wireframes/ENGLISH-COPY-REFERENCE.md)

### 2. 保持设计语调
- ✅ "You're doing great!"
- ❌ "Warning: Budget exceeded!"

### 3. 使用温和的橙色替代红色
```tsx
// ❌ 错误
className="text-red-600 bg-red-50"

// ✅ 正确
className="text-attention-400 bg-orange-50"
```

### 4. 响应式优先
所有组件必须支持移动端、平板、桌面

### 5. 类型安全
充分利用 TypeScript 类型系统

---

## 📚 参考资源

### 设计文档
- [WIREFRAME_SUMMARY.md](./WIREFRAME_SUMMARY.md)
- [wireframes/](./wireframes/)
- [ENGLISH-COPY-REFERENCE.md](./wireframes/ENGLISH-COPY-REFERENCE.md)

### 技术文档
- [Next.js 文档](https://nextjs.org/docs)
- [Shadcn/ui 文档](https://ui.shadcn.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [TanStack Query 文档](https://tanstack.com/query)

### API 文档
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- [BACKEND_SETUP.md](./BACKEND_SETUP.md)

---

**文档版本**: v1.0
**创建日期**: 2025-10-27
**状态**: ✅ 完整路线图
**预计完成**: 10 周

**准备好开始前端开发了吗？** 🚀
