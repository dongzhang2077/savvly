# Savvly UI 组件规范文档

## 📦 组件库概览

本文档定义 Savvly 应用的所有 UI 组件规范，基于 shadcn/ui 和 Tailwind CSS 构建。

---

## 1. 基础组件 (Primitives)

### 1.1 Button (按钮)

**变体 (Variants)**:
```tsx
// Primary - 主要操作
<Button variant="primary">
  保存预算
</Button>
// 样式: bg-blue-500 text-white hover:bg-blue-600

// Secondary - 次要操作
<Button variant="secondary">
  取消
</Button>
// 样式: bg-gray-200 text-gray-700 hover:bg-gray-300

// Ghost - 低优先级
<Button variant="ghost">
  查看详情
</Button>
// 样式: bg-transparent text-blue-500 hover:bg-blue-50

// Danger - 危险操作
<Button variant="danger">
  删除预算
</Button>
// 样式: bg-red-50 text-red-600 hover:bg-red-100 (非红色背景!)
```

**尺寸 (Sizes)**:
```tsx
<Button size="sm">小按钮</Button>    // h-8 px-3 text-sm
<Button size="md">标准按钮</Button>  // h-10 px-4 text-base (默认)
<Button size="lg">大按钮</Button>    // h-12 px-6 text-lg
```

**状态 (States)**:
```tsx
// 加载中
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  保存中...
</Button>

// 禁用
<Button disabled>保存</Button>
// 样式: opacity-50 cursor-not-allowed
```

**实现路径**: `components/ui/button.tsx`

---

### 1.2 Input (输入框)

**类型 (Types)**:
```tsx
// 文本输入
<Input
  type="text"
  placeholder="输入类别名称"
/>

// 数字输入
<Input
  type="number"
  placeholder="0.00"
  className="text-right"  // 金额右对齐
/>

// 日期选择
<Input
  type="date"
/>

// 密码输入
<Input
  type="password"
  placeholder="••••••••"
/>
```

**状态变体**:
```tsx
// 正常状态
<Input className="border-gray-300 focus:border-blue-500" />

// 错误状态
<Input
  error
  className="border-orange-400 focus:border-orange-500"
/>
<p className="text-sm text-orange-600 mt-1">
  请输入有效的金额
</p>

// 成功状态
<Input
  success
  className="border-green-400 focus:border-green-500"
/>
<p className="text-sm text-green-600 mt-1">
  ✓ 看起来不错
</p>
```

**规格**:
- 高度: `h-12` (48px)
- 圆角: `rounded-md` (6px)
- 边框: `border` (1px)
- 焦点环: `focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`

**实现路径**: `components/ui/input.tsx`

---

### 1.3 Label (表单标签)

```tsx
<Label htmlFor="amount" className="block text-sm font-medium mb-2">
  金额
</Label>
<Input id="amount" type="number" />
```

**规格**:
- 字号: `text-sm` (14px)
- 字重: `font-medium` (500)
- 颜色: `text-gray-700`
- 必填标记: `<Label>金额 *</Label>`

**实现路径**: `components/ui/label.tsx`

---

### 1.4 Select (下拉选择)

```tsx
<Select>
  <SelectTrigger className="w-full h-12">
    <SelectValue placeholder="选择预算类别" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="food">🍔 食品</SelectItem>
    <SelectItem value="transport">🚗 交通</SelectItem>
    <SelectItem value="entertainment">🎬 娱乐</SelectItem>
  </SelectContent>
</Select>
```

**规格**:
- 触发器高度: `h-12` (48px)
- 下拉菜单: `shadow-md rounded-md`
- 选项高度: `h-10` (40px)
- 悬停: `hover:bg-gray-100`

**实现路径**: `components/ui/select.tsx`

---

### 1.5 Card (卡片)

```tsx
<Card className="p-6 rounded-lg shadow hover:shadow-md transition-shadow">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <span className="text-2xl">🍔</span>
      食品
    </CardTitle>
    <CardDescription>
      本月食品预算使用情况
    </CardDescription>
  </CardHeader>

  <CardContent>
    {/* 卡片主要内容 */}
  </CardContent>

  <CardFooter className="flex justify-between">
    <Button variant="ghost" size="sm">
      查看详情 →
    </Button>
  </CardFooter>
</Card>
```

**规格**:
- 圆角: `rounded-lg` (8px)
- 阴影: `shadow` → `shadow-md` (hover)
- 内边距: `p-6` (24px)
- 边框: `border border-gray-200`
- 背景: `bg-white`

**变体**:
```tsx
// 可点击卡片
<Card className="cursor-pointer hover:border-blue-500 transition-colors">
  ...
</Card>

// 高亮卡片（超支警告）
<Card className="bg-orange-50 border-orange-200">
  ...
</Card>
```

**实现路径**: `components/ui/card.tsx`

---

### 1.6 Badge (徽章)

```tsx
// 类别徽章
<Badge variant="secondary">食品</Badge>

// 状态徽章
<Badge variant="success">已完成 ✓</Badge>
<Badge variant="warning">即将到期</Badge>
<Badge variant="info">自动</Badge>
```

**变体**:
```tsx
// Default
<Badge>默认</Badge>
// 样式: bg-gray-100 text-gray-700

// Success
<Badge variant="success">成功</Badge>
// 样式: bg-green-100 text-green-700

// Warning
<Badge variant="warning">警告</Badge>
// 样式: bg-orange-100 text-orange-700

// Info
<Badge variant="info">信息</Badge>
// 样式: bg-blue-100 text-blue-700
```

**规格**:
- 高度: `h-6` (24px)
- 内边距: `px-2.5 py-0.5`
- 圆角: `rounded-full`
- 字号: `text-xs` (12px)
- 字重: `font-medium`

**实现路径**: `components/ui/badge.tsx`

---

### 1.7 Progress (进度条)

```tsx
<Progress value={70} className="h-2" />
```

**动态颜色**:
```tsx
<Progress
  value={spent}
  className={`h-2 ${
    spent > 90 ? 'bg-orange-500' :
    spent > 70 ? 'bg-yellow-500' :
    'bg-green-500'
  }`}
/>
```

**规格**:
- 高度: `h-2` (8px) 或 `h-3` (12px)
- 圆角: `rounded-full`
- 背景: `bg-gray-200`
- 填充动画: `transition-all duration-500 ease-out`

**实现路径**: `components/ui/progress.tsx`

---

### 1.8 Toast (通知提示)

```tsx
// 成功通知
toast({
  title: "预算已保存！",
  description: "食品预算更新为 $400",
  variant: "success",
})

// 错误通知
toast({
  title: "哎呀，出了点问题",
  description: "请稍后再试",
  variant: "error",
})

// 信息通知
toast({
  title: "💡 友情提醒",
  description: "食品预算接近限额（85% 已用）",
  variant: "info",
})
```

**变体**:
```css
/* Success */
bg-green-50 border-green-500 text-green-900

/* Error */
bg-orange-50 border-orange-400 text-orange-900

/* Info */
bg-blue-50 border-blue-500 text-blue-900
```

**规格**:
- 位置: 右上角 (top-right)
- 宽度: `max-w-md`
- 显示时间: 5000ms (5秒)
- 动画: slide-in-right

**实现路径**: `components/ui/toast.tsx`, `components/ui/toaster.tsx`

---

### 1.9 Modal / Dialog (模态框)

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>删除预算</Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>⚠️ 确认删除预算</DialogTitle>
      <DialogDescription>
        你确定要删除 "🍔 食品" 预算吗？此操作无法撤销。
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>
        取消
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        确认删除
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**规格**:
- 背景遮罩: `bg-black/50`
- 内容容器: `bg-white rounded-xl shadow-2xl`
- 最大宽度: `sm:max-w-md` (448px)
- 内边距: `p-6`
- 动画: `fade-in` + `scale-up`

**实现路径**: `components/ui/dialog.tsx`

---

### 1.10 Tooltip (工具提示)

```tsx
<Tooltip>
  <TooltipTrigger>
    <Info className="h-4 w-4 text-gray-400" />
  </TooltipTrigger>
  <TooltipContent>
    <p>未用预算将100%转入下月</p>
  </TooltipContent>
</Tooltip>
```

**规格**:
- 背景: `bg-gray-900`
- 文字: `text-white text-sm`
- 圆角: `rounded-md`
- 内边距: `px-3 py-2`
- 箭头: 8px 三角形
- 延迟: 200ms

**实现路径**: `components/ui/tooltip.tsx`

---

## 2. 复合组件 (Composite Components)

### 2.1 BudgetCard (预算卡片)

```tsx
<BudgetCard
  category="食品"
  emoji="🍔"
  spent={280}
  budget={400}
  rolloverType="PARTIAL"
  onEdit={() => {}}
  onViewDetails={() => {}}
/>
```

**显示内容**:
- Emoji + 类别名称
- 已用金额 / 预算金额
- 进度条（颜色根据百分比）
- 剩余金额（积极语言）
- 操作按钮

**状态变化**:
- 0-70%: 绿色进度条
- 70-90%: 黄色进度条
- 90%+: 橙色进度条 + 橙色背景

**实现路径**: `components/budget/budget-card.tsx`

---

### 2.2 TransactionRow (交易行)

```tsx
<TransactionRow
  id="tx123"
  merchant="Whole Foods"
  amount={-45.80}
  date={new Date()}
  category="食品"
  isIncome={false}
  onEdit={() => {}}
  onDelete={() => {}}
/>
```

**显示内容**:
- 商户名称 + Emoji/图标
- 金额（负数黑色，正数绿色）
- 日期/时间
- 类别徽章
- 操作菜单（编辑、删除）

**实现路径**: `components/transaction/transaction-row.tsx`

---

### 2.3 StatCard (统计卡片)

```tsx
<StatCard
  title="本月可用收入"
  value="$1,800"
  subtitle="已扣除税务预留 $700"
  icon={<DollarSign />}
  trend="+15%"
/>
```

**显示内容**:
- 标题
- 大字号数值
- 副标题说明
- 图标（可选）
- 趋势指示（可选）

**实现路径**: `components/dashboard/stat-card.tsx`

---

### 2.4 EmptyState (空状态)

```tsx
<EmptyState
  icon={<Inbox />}
  title="还没有预算设置"
  description="让我们创建第一个预算，开始掌控你的财务！"
  action={
    <Button onClick={onCreateBudget}>
      + 创建第一个预算
    </Button>
  }
/>
```

**规格**:
- 居中对齐
- 图标: `h-16 w-16 text-gray-300`
- 标题: `text-lg font-semibold`
- 描述: `text-sm text-gray-600`
- 间距: `space-y-4`

**实现路径**: `components/ui/empty-state.tsx`

---

### 2.5 LoadingSpinner (加载动画)

```tsx
<LoadingSpinner size="md" />
```

**尺寸**:
```tsx
size="sm"  // h-4 w-4
size="md"  // h-8 w-8 (默认)
size="lg"  // h-12 w-12
```

**实现**:
```tsx
<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
```

**实现路径**: `components/ui/loading-spinner.tsx`

---

### 2.6 SkeletonLoader (骨架屏)

```tsx
// 卡片骨架
<Card className="p-6">
  <Skeleton className="h-6 w-32 mb-4" />
  <Skeleton className="h-4 w-full mb-2" />
  <Skeleton className="h-4 w-3/4" />
</Card>
```

**规格**:
- 背景: `bg-gray-200`
- 动画: `animate-pulse`
- 圆角: 继承父元素

**实现路径**: `components/ui/skeleton.tsx`

---

## 3. 布局组件 (Layout Components)

### 3.1 DashboardLayout (仪表板布局)

```tsx
<DashboardLayout>
  <Sidebar />
  <MainContent>
    {children}
  </MainContent>
</DashboardLayout>
```

**结构**:
```
┌─────────────────────────────────────┐
│ Header (固定顶部)                   │
├─────────┬───────────────────────────┤
│ Sidebar │ Main Content              │
│ (固定)  │ (滚动)                    │
│         │                           │
│         │                           │
└─────────┴───────────────────────────┘
```

**响应式**:
- 桌面 (>1024px): 侧边栏固定
- 移动 (<1024px): 汉堡菜单 + 底部导航

**实现路径**: `components/layout/dashboard-layout.tsx`

---

### 3.2 Header (页面头部)

```tsx
<Header
  title="预算管理"
  breadcrumbs={[
    { label: "首页", href: "/" },
    { label: "预算", href: "/budgets" },
  ]}
  actions={
    <Button>+ 创建预算</Button>
  }
/>
```

**实现路径**: `components/layout/header.tsx`

---

### 3.3 Sidebar (侧边栏)

```tsx
<Sidebar>
  <SidebarItem icon={<Home />} label="仪表板" href="/" />
  <SidebarItem icon={<BarChart3 />} label="预算" href="/budgets" />
  <SidebarItem icon={<CreditCard />} label="交易" href="/transactions" />
  <SidebarItem icon={<Settings />} label="设置" href="/settings" />
</Sidebar>
```

**规格**:
- 宽度: `w-64` (256px)
- 背景: `bg-white border-r`
- 项目高度: `h-12`
- 活动状态: `bg-blue-50 text-blue-600 border-r-2 border-blue-600`

**实现路径**: `components/layout/sidebar.tsx`

---

### 3.4 BottomNavigation (底部导航 - 移动端)

```tsx
<BottomNavigation>
  <NavItem icon={<Home />} label="首页" href="/" active />
  <NavItem icon={<BarChart3 />} label="预算" href="/budgets" />
  <NavItem icon={<Plus />} label="添加" onClick={onAdd} />
  <NavItem icon={<CreditCard />} label="交易" href="/transactions" />
  <NavItem icon={<Settings />} label="设置" href="/settings" />
</BottomNavigation>
```

**规格**:
- 位置: `fixed bottom-0 left-0 right-0`
- 高度: `h-16`
- 背景: `bg-white border-t`
- 图标: `h-6 w-6`
- 字号: `text-xs`

**实现路径**: `components/layout/bottom-navigation.tsx`

---

## 4. 表单组件 (Form Components)

### 4.1 FormField (表单字段)

```tsx
<FormField>
  <FormLabel htmlFor="amount">金额 *</FormLabel>
  <FormInput
    id="amount"
    type="number"
    placeholder="0.00"
    error={errors.amount}
  />
  <FormDescription>
    输入你的预算金额（加币）
  </FormDescription>
  <FormError>{errors.amount}</FormError>
</FormField>
```

**实现路径**: `components/form/form-field.tsx`

---

### 4.2 RadioGroup (单选按钮组)

```tsx
<RadioGroup value={rolloverType} onValueChange={setRolloverType}>
  <RadioGroupItem value="FULL" id="full">
    <Label htmlFor="full">
      完全回滚 (100%)
      <p className="text-sm text-gray-600">
        未用预算100%转入下月
      </p>
    </Label>
  </RadioGroupItem>

  <RadioGroupItem value="PARTIAL" id="partial">
    <Label htmlFor="partial">
      部分回滚
    </Label>
  </RadioGroupItem>
</RadioGroup>
```

**实现路径**: `components/ui/radio-group.tsx`

---

### 4.3 Slider (滑块)

```tsx
<Slider
  value={[rolloverPercent]}
  onValueChange={([value]) => setRolloverPercent(value)}
  min={0}
  max={100}
  step={5}
  className="w-full"
/>
<p className="text-sm text-gray-600 mt-2">
  回滚百分比: {rolloverPercent}%
</p>
```

**规格**:
- 轨道高度: `h-2`
- 拇指大小: `h-5 w-5`
- 填充颜色: `bg-blue-500`

**实现路径**: `components/ui/slider.tsx`

---

## 5. 实现优先级

### 第一阶段（必须）
1. ✅ Button
2. ✅ Input
3. ✅ Label
4. ✅ Card
5. ✅ Toast
6. ✅ Modal/Dialog
7. ✅ DashboardLayout
8. ✅ Header
9. ✅ Sidebar

### 第二阶段（重要）
1. Select
2. Progress
3. Badge
4. BudgetCard
5. TransactionRow
6. StatCard
7. EmptyState
8. LoadingSpinner

### 第三阶段（增强）
1. Tooltip
2. RadioGroup
3. Slider
4. SkeletonLoader
5. BottomNavigation

---

## 6. Shadcn/ui 安装命令

```bash
# 初始化 shadcn/ui
npx shadcn@latest init

# 安装基础组件
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add select
npx shadcn@latest add dialog
npx shadcn@latest add toast
npx shadcn@latest add progress
npx shadcn@latest add badge
npx shadcn@latest add tooltip
npx shadcn@latest add radio-group
npx shadcn@latest add slider
npx shadcn@latest add skeleton
```

---

## 7. 设计令牌 (Design Tokens)

### 颜色变量

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
        secondary: {
          50: '#ecfdf5',
          500: '#10b981',
        },
        accent: {
          500: '#f59e0b',
        },
        attention: {
          400: '#fb923c',
        },
      },
    },
  },
}
```

### 间距系统

```css
/* 遵循 8px 基准 */
4px  = space-1 (p-1, m-1, gap-1)
8px  = space-2 (p-2, m-2, gap-2)
12px = space-3
16px = space-4
24px = space-6
32px = space-8
48px = space-12
```

### 字号系统

```css
12px = text-xs
14px = text-sm
16px = text-base (默认)
18px = text-lg
20px = text-xl
24px = text-2xl
30px = text-3xl
36px = text-4xl
```

---

## 8. 组件文档模板

```tsx
/**
 * BudgetCard - 预算卡片组件
 *
 * 显示单个预算的摘要信息，包括已用金额、进度条、剩余金额等。
 *
 * @example
 * <BudgetCard
 *   category="食品"
 *   emoji="🍔"
 *   spent={280}
 *   budget={400}
 *   onEdit={() => {}}
 * />
 *
 * @param {string} category - 预算类别名称
 * @param {string} emoji - 类别 Emoji
 * @param {number} spent - 已用金额
 * @param {number} budget - 预算总额
 * @param {() => void} onEdit - 编辑回调
 */
export function BudgetCard({ ... }) {
  // 实现
}
```

---

**文档版本**: v1.0
**组件总数**: 30+ 个
**状态**: ✅ 规范完成
**下一步**: 开始实现组件库
