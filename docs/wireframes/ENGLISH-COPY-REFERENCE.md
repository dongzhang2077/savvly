# Savvly UI Copy Reference - English Text Guide

## 📝 重要说明

**所有 UI 文本必须使用英文！**

本文档提供线框图中所有中文示例的英文版本，确保实现时使用正确的英文文案。

---

## 🏠 Dashboard (仪表板)

### Main Income Card
```tsx
// 标题
"Available This Month" // 本月可用收入
"$1,800" // 金额保持不变

// 说明文字
"Tax reserve deducted: $700" // 已扣除税务预留 $700
"Tax reserve: $700 (28%)" // 税务预留 $700 (28%)
```

### Budget Health Card
```tsx
"Your Budget Health" // 你的预算健康
"72%" // 百分比保持不变
"4/6 categories on track ✓" // 4/6 类别在预算内 ✓

// 详细说明
"Food, Transport, Entertainment, Subscriptions looking good"
// 食品、交通、娱乐、订阅 表现良好

"Dining, Rent need attention"
// 餐饮、房租 需要关注
```

### Navigation
```tsx
"Dashboard" // 仪表板
"Budgets" // 预算
"Transactions" // 交易
"Goals" // 目标
"Settings" // 设置
```

---

## 💰 Budget Cards (预算卡片)

### Standard Budget Card (正常状态)
```tsx
// 类别 (保持 Emoji)
"🍔 Food" // 食品
"🚗 Transport" // 交通
"🎬 Entertainment" // 娱乐
"🏠 Rent" // 房租
"💡 Utilities" // 公用事业
"📱 Subscriptions" // 订阅

// 金额标签
"Spent" // 已用
"Budget" // 预算
"$280 / $400" // 金额保持不变

// 状态信息
"$120 remaining ✓" // 剩余 $120 可用
"On track" // 进展顺利
"Looking good!" // 表现不错
```

### Near Limit (接近限额)
```tsx
"$22 left 💪" // 还剩 $22
"Almost there" // 快到了
"You got this!" // 你可以的
```

### Over Budget (超支)
```tsx
"Food is a bit high this month (+$15)"
// 食品有点高这个月 (+$15)

"Adjust next month's budget?"
// 要调整下月预算吗？

"Let's review together"
// 让我们一起看看

[Adjust Budget] [View Details]
// [调整预算] [查看详情]
```

### Tax Reserve (税务预留)
```tsx
"💰 Tax Reserve" // 税务预留
"🔒 Automatic" // 自动

"Reserved" // 已预留
"Target" // 目标
"$700 (28% rate)" // $700 (28% 税率)

"✓ You're covered for this month's taxes"
// 你已覆盖本月税款

[Adjust Rate] // [调整税率]
```

---

## 📅 Upcoming Bills (即将账单)

```tsx
"Upcoming Bills" // 即将到来的账单
"Manage Bills →" // 管理账单 →

// 账单项
"🏠 Rent" // 房租
"$1,200" // 金额
"💳 Due in 3 days (Oct 30)" // 3天后到期 (10月30日)
"⚠️ Due soon" // 即将到期

"💡 Electric" // 电费
"💳 Due in 12 days (Nov 8)" // 12天后到期 (11月8日)
"✓ Ready" // 已准备好

"📱 Netflix" // Netflix订阅
"🔄 Renews in 25 days (Nov 21)" // 25天后续订 (11月21日)
"✓ Auto-pay" // 自动扣款
```

---

## 💳 Recent Transactions (最近交易)

```tsx
"Recent Transactions" // 最近交易
"View All (28) →" // 查看全部 (28) →

// 交易项
"🍔 Whole Foods" // 商户名
"-$45.80" // 金额（支出为负）
"Oct 27 12:30pm" // 日期时间
"[Food]" // 类别标签

"☕ Starbucks"
"-$5.50"
"Oct 27 8:15am"
"[Food]"

"💰 Acme Corp - Project Payment" // 客户付款
"+$2,500 ✓" // 收入为正，带勾
"Oct 26"
"[Income]" // 收入类别

[+ Add Transaction] // [+ 添加交易]
```

---

## 📊 Budget Management (预算管理)

### Budget List Page
```tsx
"Budget Management" // 预算管理
"[+ Create Budget]" // [+ 创建预算]

// 月度总览
"Monthly Overview (Oct 2025)" // 本月总览 (10月 2025)
"Total Budget: $2,200" // 总预算
"Spent: $935" // 已用
"Remaining: $1,265" // 剩余
"Progress: 42%" // 进度

// 筛选和排序
"Filter: [This Month ▼] [All Categories ▼]"
// 筛选: [本月 ▼] [所有类别 ▼]

"Sort: [Amount ▼]"
// 排序: [金额 ▼]

// 视图切换
"[View Toggle]"
"☰ List  □ Grid"
// 列表  网格

// 表头
"Category" // 类别
"Spent / Budget" // 已用 / 预算
"Progress" // 进度
"Actions" // 操作

// 操作按钮
[Edit] [Details] // [编辑] [详情]
```

### Create Budget Page
```tsx
"📊 Create New Budget" // 创建新预算

"Let's set a budget for your spending"
// 让我们为你的支出设置一个预算

// 表单字段
"Budget Category *" // 预算类别 *
"Common categories:" // 常用类别:

[🍔 Food] [🚗 Transport] [🎬 Entertainment]
[🏠 Rent] [💡 Utilities] [📱 Subscriptions]
[🏥 Healthcare] [📚 Education] [➕ Custom]

"Budget Amount *" // 预算金额 *
"$ 400.00"

"💡 You spent $310 on food last month"
// 上个月你在食品上花了 $310

"Month" // 月份
"October 2025"

// 回滚策略
"🔄 Budget Rollover Strategy" // 预算回滚策略

"○ Full Rollover (Recommended)" // 完全回滚 (推荐)
"   100% of unused budget rolls to next month"
// 未用预算100%转入下月

"   💡 Best for: Fixed expenses (rent, subscriptions)"
// 最适合：固定开支(房租、订阅)

"● Partial Rollover" // 部分回滚
"   50% of unused budget rolls to next month"
// 未用预算50%转入下月

"   💡 Best for: Flexible spending (entertainment, shopping)"
// 最适合：灵活开支(娱乐、购物)

"   Rollover percentage: [========○==] 50%"
// 回滚百分比

"○ No Rollover" // 不回滚
"   Budget resets each month"
// 每月重置预算

"   💡 Best for: Strictly controlled categories"
// 最适合：严格控制的类别

"○ Goal-Based" // 目标导向
"   Accumulate until target amount"
// 累积到目标金额

"   💡 Best for: Savings goals"
// 最适合：储蓄目标

// 高级选项
"Advanced Options (Optional) [Expand ▼]"
// 高级选项 (可选) [展开 ▼]

"☐ This is a fixed budget"
// 这是固定预算

"   (Same amount each month, like rent or subscriptions)"
// (每月金额相同，如房租、订阅)

"☐ This is a tax reserve"
// 这是税务预留

"   (Automatically deducted from income)"
// (自动从收入扣除)

"Notes (Optional)" // 备注 (可选)
"Includes groceries, dining out..."
// 包括杂货、外出就餐...

// 按钮
[Cancel] [Create Budget →]
// [取消] [创建预算 →]
```

### Edit Budget Page
```tsx
"✏️ Edit Budget - 🍔 Food" // 编辑预算 - 食品

"Budget Amount *"
"$ 400.00"

"Current usage: $280 (70%)"
// 当前使用: $280 (70%)

"🔄 Rollover Strategy"
"● Partial Rollover (50%)"

"⚠️ Changes will take effect next month"
// 更改将从下月生效

"This month's budget remains $400"
// 本月预算保持 $400

[Delete Budget] [Cancel] [Save Changes →]
// [删除预算] [取消] [保存更改 →]
```

### Budget Detail Page
```tsx
"🍔 Food Budget Details" // 食品预算详情
[Edit] [Delete]

// 本月总览
"October 2025"

"Spent" // 已用
"$280"
"70%"

"Remaining" // 剩余
"$120"
"30%"

"Budget" // 预算
"$400"

"💡 You're doing great! $120 remaining"
// 你做得很好！还剩 $120 可用

// 趋势
"📊 Trends" // 趋势
"[Simple bar chart: Past 6 months food spending]"
// [简单柱状图：过去6个月的食品支出]

"Average: $297/month" // 平均

// 回滚设置
"🔄 Rollover Settings" // 回滚设置

"Strategy: Partial Rollover (50%)"
// 策略: 部分回滚 (50%)

"Will rollover next month: $60 (if you stop now)"
// 下月将回滚: $60 (如果现在结束)

"💡 Half of your unused budget carries forward,"
"   helping you balance flexibility and discipline."
// 未用预算的一半将转入下月，
// 帮你在灵活性和节制之间找到平衡。

"Change rollover strategy →"
// 更改回滚策略 →

// 相关交易
"💳 Related Transactions (12)" // 相关交易 (12 笔)
"View All →" // 查看全部 →

[+ Add Transaction to This Budget]
// [+ 添加交易到此预算]
```

---

## 🗑️ Modals & Dialogs (模态框)

### Delete Confirmation
```tsx
"⚠️ Confirm Delete Budget" // 确认删除预算

"Are you sure you want to delete the '🍔 Food' budget?"
// 你确定要删除 "🍔 食品" 预算吗？

"This will:" // 这将会:
"• Delete all historical budget records"
// 删除所有历史预算记录

"• Related transactions will become uncategorized"
// 相关交易将变为未分类

"• This action cannot be undone"
// 此操作无法撤销

[Cancel] [Confirm Delete]
// [取消] [确认删除]
```

### Rollover Strategy Explainer
```tsx
"🔄 Budget Rollover Strategy" // 预算回滚策略
[×]

"What is Budget Rollover?" // 什么是预算回滚？

"Traditional budget apps reset budgets monthly, punishing your savings behavior."
// 传统预算 App 每月重置预算，惩罚你的节省行为。

"Savvly's rollover feature rewards your savings,"
"letting unused budgets retain their value."
// Savvly 的回滚功能奖励你的节省，让未用预算延续价值。

"━━━━━━━━━━━━━━━━━━━━━"

"Four Strategies:" // 四种策略:

"1️⃣ Full Rollover (100%)"
"   ✓ All unused budget carries to next month"
"   ✓ Best for: Fixed expenses (rent, subscriptions)"
"   ✓ Example: $50 left → Next month has $450"

"2️⃣ Partial Rollover (Custom 10-90%)"
"   ✓ Part of unused budget carries forward"
"   ✓ Best for: Flexible spending (food, entertainment)"
"   ✓ Example: $50 left, 50% rollover → Next month has $425"

"3️⃣ No Rollover (0%)"
"   ✓ Budget resets completely each month"
"   ✓ Best for: Strictly controlled categories"
"   ✓ Example: $50 left → Next month starts fresh at $400"

"4️⃣ Goal-Based"
"   ✓ Accumulates until target amount"
"   ✓ Best for: Savings, large purchases"
"   ✓ Example: Target $2000, monthly leftover accumulates"

"━━━━━━━━━━━━━━━━━━━━━"

"💡 Tip: You can change strategies anytime,"
"   new strategy takes effect next month"
// 你可以随时更改策略，新策略从下月生效

[Got it] // [知道了]
```

---

## 🔐 Authentication (认证)

### Welcome Page
```tsx
"💰 Savvly" // Logo

"👋 Welcome to Savvly" // 欢迎来到 Savvly

"Smart budgeting designed for freelancers"
// 专为自由职业者设计的智能预算工具

"✓ Irregular income friendly"
// 不规则收入友好

"✓ Smart budget rollover"
// 智能预算回滚

"✓ Canadian tax reserves"
// 加拿大税务预留

[Get Started →] // [开始使用 →]

"Already have an account? <a>Sign in</a>"
// 已有账户？登录
```

### Sign Up Page
```tsx
"🎉 Create Your Savvly Account"
// 创建你的 Savvly 账户

"Let's make every dollar work for you"
// 让我们确保每一块钱都为你工作

[Continue with Google] // [继续使用 Google]

"──────── or ────────"

"Email address" // 邮箱地址
"your@email.com"

"Password" // 密码
"••••••••"
"At least 8 characters" // 至少 8 个字符

"Name (Optional)" // 姓名 (可选)
"John Doe"

[Create Account →] // [创建账户 →]

"By creating an account, you agree to our"
"<a>Terms of Service</a> and <a>Privacy Policy</a>"
// 创建账户即表示你同意我们的服务条款和隐私政策

"Already have an account? <a>Sign in</a>"
// 已有账户？登录

"🔒 Your data is securely encrypted"
// 你的数据安全加密
```

### Sign In Page
```tsx
"👋 Welcome Back" // 欢迎回来

[Sign in with Google] // [使用 Google 登录]

"──────── or ────────"

"Email address"
"your@email.com"

"Password"
"••••••••"

"<a>Forgot password?</a>" // 忘记密码？

[Sign In →] // [登录 →]

"Don't have an account? <a>Sign up</a>"
// 还没有账户？注册

"🔒 Your data is securely encrypted"
```

### Forgot Password
```tsx
"🔑 Reset Password" // 重置密码

"No worries, it happens." // 别担心，这种事常有。
"Enter your email and we'll send you a reset link."
// 输入你的邮箱，我们会发送重置链接。

"Email address"

[Send Reset Link →] // [发送重置链接 →]

"Remember your password? <a>Back to sign in</a>"
// 想起来了？返回登录
```

### Email Sent
```tsx
"✉️ Email Sent" // 邮件已发送

"We've sent a reset link to"
"<b>user@example.com</b>"
// 我们已向 user@example.com 发送了重置链接。

"Please check your inbox"
"(and your spam folder too)"
// 请检查你的收件箱（也看看垃圾邮件文件夹）

[Back to Sign In] // [返回登录]

"Didn't receive the email?" // 没收到邮件？
"<a>Resend</a>" // 重新发送
```

---

## 🔔 Toast Notifications (提示通知)

### Success
```tsx
"✓ Budget saved!" // 预算已保存！
"Food budget updated to $400" // 食品预算更新为 $400

"✓ Transaction added!" // 交易已添加！
"$45.80 added to Food budget" // $45.80 添加到食品预算

"✓ Account created!" // 账户已创建！
"Welcome to Savvly!" // 欢迎来到 Savvly！
```

### Info / Reminders
```tsx
"💡 Friendly reminder" // 友情提醒
"Food budget approaching limit (85% used)"
// 食品预算接近限额（85% 已用）

"💡 Tip: Tax Reserve" // 提示：税务预留
"$700 set aside for taxes - you're covered!"
// $700 已为税款预留 - 你已覆盖！
```

### Gentle Warnings
```tsx
"🤔 Hmm..." // 哎呀...
"Email or password doesn't match. Try again?"
// 邮箱或密码不对。再试一次？

"😅 Oops" // 哎呀
"Something went wrong. Let's try that again?"
// 出了点问题。再试一次？
```

---

## 🎯 Empty States (空状态)

### No Budgets
```tsx
"📊" // Icon

"No budgets yet" // 还没有预算设置

"Let's create your first budget"
"and take control of your finances!"
// 让我们创建第一个预算，开始掌控你的财务！

[+ Create First Budget] // [+ 创建第一个预算]

"or <a>See example budgets</a>"
// 或者 查看示例预算
```

### No Transactions
```tsx
"💳"

"No transactions yet" // 还没有交易记录

"Add your first transaction and"
"watch your budget update automatically!"
// 添加你的第一笔交易，看看预算如何自动更新！

[+ Add Transaction] // [+ 添加交易]
```

### No Search Results
```tsx
"🔍"

"No results found" // 未找到结果

"Try adjusting your filters or search terms"
// 尝试调整筛选条件或搜索词

[Clear Filters] // [清除筛选]
```

---

## ⚙️ Settings (设置)

```tsx
"Settings" // 设置

// 个人信息
"Personal Information" // 个人信息
"Name" // 姓名
"Email" // 邮箱
"Change Password" // 更改密码

// 预算设置
"Budget Settings" // 预算设置
"Budget Mode" // 预算模式
"Irregular Income" // 不规则收入
"Savings Runway" // 储蓄跑道

// 税务设置
"Tax Settings" // 税务设置
"Province" // 省份
"British Columbia (BC)" // 不列颠哥伦比亚省 (BC)
"Tax Rate" // 税率
"28%" // 保持不变
"Auto Tax Reserve" // 自动税务预留
"[Toggle Switch]"

// 账户安全
"Account Security" // 账户安全
"Two-Factor Authentication" // 双因素认证
"Enabled ✓" // 已启用 ✓
"Connected Accounts" // 已连接账户

// 通知
"Notifications" // 通知
"Email Notifications" // 邮件通知
"Push Notifications" // 推送通知
"Bill Reminders" // 账单提醒

// 危险区域
"Danger Zone" // 危险区域
"Delete Account" // 删除账户
"This action cannot be undone"
// 此操作无法撤销

[Save Changes] // [保存更改]
```

---

## 📈 Status Messages (状态消息)

### Budget Status
```tsx
// 良好状态
"On track ✓" // 进展顺利
"Looking good!" // 表现不错！
"You're doing great!" // 你做得很好！
"Well done! 💪" // 做得好！

// 接近限额
"Almost at limit" // 快到限额了
"Getting close" // 快到了
"You got this!" // 你可以的！

// 超支
"A bit over this month" // 本月有点超了
"Let's review together" // 让我们一起看看
"Time to adjust?" // 该调整了？
```

### Savings Runway
```tsx
"🛫 Your Savings Runway" // 你的储蓄跑道

"12.5 months" // 12.5 个月
"At current burn rate" // 按当前消耗速度

"Target: 15 months until graduation (June 2026)"
// 目标：毕业前 15 个月（2026年6月）

"💪 Great position! You have a +2.5 month buffer"
// 你有足够的缓冲！安全余量：+2.5 个月
```

---

## 🎨 General UI Elements (通用元素)

### Buttons
```tsx
// Primary actions
"Save" // 保存
"Save Changes" // 保存更改
"Create" // 创建
"Add" // 添加
"Continue" // 继续
"Next" // 下一步
"Confirm" // 确认
"Submit" // 提交

// Secondary actions
"Cancel" // 取消
"Back" // 返回
"Close" // 关闭
"Skip" // 跳过

// View actions
"View Details" // 查看详情
"View All" // 查看全部
"Show More" // 显示更多
"Expand" // 展开
"Collapse" // 收起

// Edit/Delete
"Edit" // 编辑
"Delete" // 删除
"Remove" // 移除
"Adjust" // 调整
```

### Time Expressions
```tsx
"Just now" // 刚刚
"5 minutes ago" // 5分钟前
"Today" // 今天
"Yesterday" // 昨天
"This week" // 本周
"This month" // 本月
"Last month" // 上月

"Due in 3 days" // 3天后到期
"Due today" // 今天到期
"Overdue" // 已逾期
```

### Loading States
```tsx
"Loading..." // 加载中...
"Saving..." // 保存中...
"Processing..." // 处理中...
"Updating..." // 更新中...
"Deleting..." // 删除中...
```

---

## ✅ Validation Messages (验证消息)

### Field Validation
```tsx
// Email
"Please enter a valid email"
// 请输入有效的邮箱地址

"Email is required"
// 邮箱为必填项

// Password
"Password must be at least 8 characters"
// 密码至少需要 8 个字符

"Password is required"
// 密码为必填项

// Amount
"Amount must be greater than 0"
// 金额必须大于 0

"Please enter a valid amount"
// 请输入有效的金额

// General
"This field is required"
// 此字段为必填项

"✓ Looks good"
// 看起来不错
```

---

## 💡 Help Text & Tips (帮助文本)

```tsx
// Budget tips
"💡 You spent $310 on food last month"
// 上个月你在食品上花了 $310

"💡 Based on your 3-month average: $297/month"
// 基于你过去3个月的平均: $297/月

// Rollover tips
"💡 Half of your unused budget carries forward,"
"   helping you balance flexibility and discipline."
// 未用预算的一半将转入下月，帮你在灵活性和节制之间找到平衡。

// Tax tips
"💡 We recommend reserving 28% based on BC tax rates"
// 我们建议基于BC省税率预留28%

"💡 This helps you avoid tax season stress"
// 这将帮你避免报税季压力
```

---

## 🎉 Celebration Messages (庆祝消息)

```tsx
"🎉 Awesome! You've reached your goal!"
// 太棒了！你已达成目标！

"🎉 Great job! 2-month emergency fund built!"
// 做得好！已建立 2 个月应急基金！

"🌟 You saved your first $50! Every step counts!"
// 你存下了第一笔 $50！每一步都很重要！

"🔥 3 months streak! That's 15% toward your goal →"
// 连续 3 个月！那是你目标的 15% →

"💪 Nice! That's 5% toward your goal →"
// 漂亮！那是你目标的 5% →
```

---

## 📝 实现检查清单

开始编码前，确保：
- [ ] 所有按钮文字使用英文
- [ ] 所有标签和占位符使用英文
- [ ] 所有提示消息使用英文
- [ ] 所有错误消息使用英文
- [ ] 保持温和、赋权的语调
- [ ] 避免评判性语言
- [ ] 使用积极框架

---

**文档版本**: v1.0
**创建日期**: 2025-10-27
**状态**: ✅ 完整英文文案参考
