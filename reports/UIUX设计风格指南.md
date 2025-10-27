# Savvly UI/UX 设计风格指南

## 设计哲学

### 核心价值观
```
Savvly 的设计不仅是视觉美学，更是心理学工具：
├─ 赋权而非限制（Empowerment over Restriction）
├─ 希望而非恐惧（Hope over Fear）
├─ 平静而非警报（Calm over Alarm）
├─ 清晰而非复杂（Clarity over Complexity）
└─ 同理心而非评判（Empathy over Judgment）
```

### 设计目标

**为什么用户需要 Savvly？**
> "我的收入不规则，现有预算 App 让我感到失败和焦虑。我需要一个理解我的工具，帮我掌控而非评判我。"

**Savvly 的设计承诺**：
1. **降低焦虑**：温和色彩、积极语言、非评判反馈
2. **提供希望**：可视化进展、未来预测、庆祝小胜利
3. **赋予掌控**：灵活调整、透明逻辑、用户决策权
4. **简化复杂**：一目了然、渐进披露、最小认知负担

---

## 五大核心设计原则

### 原则 1：赋权而非限制（Empowerment）

#### 语言设计

**✓ 赋权语言（使用）**：
```
积极框架：
├─ "你本周有 $287 可用"（而非"你只剩 $287"）
├─ "你已达到目标的 75%！"（而非"还差 25%"）
├─ "小步骤累积起来"（而非"你进展太慢"）
├─ "让我们调整一下"（而非"你超支了"）
└─ "你正在建设更好的未来"（希望导向）

人性化、友好语调：
├─ "嘿，你做得很好"（温暖）
├─ "我们在这里帮助你掌控"（伙伴关系）
├─ "我们知道金钱可能有压力"（同理心）
└─ "漂亮！那是你目标的 5% →"（庆祝）
```

**✗ 限制语言（避免）**：
```
基于恐惧：
├─ "警告：你正在超支！"
├─ "余额低！"
├─ "危险：预算不足"
└─ "你未能达到预算"

评判性：
├─ "你失败了"
├─ "你的财务很糟糕"
├─ "你需要停止花钱"
└─ 羞耻或内疚策略

限制性：
├─ "你不能再花钱了"
├─ "预算已用完"
└─ 暗示失去控制的语言
```

#### 实际应用示例

| 情况 | ❌ 避免 | ✓ 使用 |
|------|---------|--------|
| **超支** | "警告：超出预算！" | "食品有点高——要调整下月吗？" |
| **达成目标** | "目标完成" | "太棒了！你已建立 2 个月应急基金 🎉" |
| **低余额** | "余额低！" | "友情提醒：周五账单到期" |
| **储蓄** | "已存入 $50" | "漂亮！那是你目标的 5% →" |
| **入职** | "设置你的预算" | "让我们确保每一块钱都为你工作" |
| **负现金流** | "警告：负储蓄率！" | "本月从储蓄提取 $1,200（计划内）" |

---

### 原则 2：希望与平静的视觉设计（Hope & Calm）

#### 色彩心理学

**主色调：平静的蓝绿（Trust & Growth）**

```
主要蓝色（Primary Blue）：
├─ Hex: #3B82F6 (Tailwind blue-500)
├─ 用途：主要 CTA、链接、强调
├─ 心理：信任、稳定、专业
└─ 示例：按钮、导航、重要信息

辅助绿色（Secondary Green）：
├─ Hex: #10B981 (Tailwind emerald-500)
├─ 用途：储蓄进展、正面反馈、成功状态
├─ 心理：成长、希望、积极
└─ 示例：进度条、目标达成、收入

中性灰色（Neutral Gray）：
├─ Hex: #6B7280 (Tailwind gray-500)
├─ 用途：次要文本、边框、背景
├─ 心理：平静、中立、专业
└─ 示例：说明文字、分隔线、卡片背景
```

**强调色：温暖的橙金（Hope & Optimism）**

```
橙色（Accent Orange）：
├─ Hex: #F59E0B (Tailwind amber-500)
├─ 用途：提醒（非警告）、高亮、奖励
├─ 心理：乐观、温暖、活力
└─ 示例：即将到来的账单、里程碑徽章

金色（Gold）：
├─ Hex: #FBBF24 (Tailwind yellow-400)
├─ 用途：庆祝、成就、特殊时刻
├─ 心理：成功、价值、喜悦
└─ 示例：目标达成动画、连续签到
```

**❌ 避免刺眼红色警报**

```
传统警告红：
✗ Hex: #EF4444 (Tailwind red-500)
✗ 用途：错误、警告、超支
✗ 问题：触发焦虑、增加压力

Savvly 替代：柔和珊瑚（Soft Coral）
✓ Hex: #FB923C (Tailwind orange-400)
✓ 用途：需要注意的情况（非紧急）
✓ 优势：温和提醒，不触发恐慌
✓ 示例："食品预算接近限额"
```

#### 完整色彩系统

```css
/* Savvly 色彩变量（Tailwind 配置） */

:root {
  /* Primary - 平静蓝 */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #3b82f6;  /* 主色 */
  --primary-600: #2563eb;
  --primary-900: #1e3a8a;

  /* Secondary - 成长绿 */
  --secondary-50: #ecfdf5;
  --secondary-100: #d1fae5;
  --secondary-500: #10b981;  /* 辅助色 */
  --secondary-600: #059669;

  /* Accent - 希望橙 */
  --accent-50: #fffbeb;
  --accent-400: #fbbf24;
  --accent-500: #f59e0b;  /* 强调色 */
  --accent-600: #d97706;

  /* Attention - 柔和珊瑚 */
  --attention-400: #fb923c;
  --attention-500: #f97316;

  /* Neutral - 平静灰 */
  --neutral-50: #f9fafb;
  --neutral-100: #f3f4f6;
  --neutral-500: #6b7280;
  --neutral-700: #374151;
  --neutral-900: #111827;

  /* Success - 成功绿 */
  --success: #10b981;

  /* Warning - 温和橙（替代红色）*/
  --warning: #fb923c;
}
```

---

#### 清晰信息层次

**一目了然原则**：

```
信息优先级（从上到下）：

1. 即时可见（Above the Fold）：
   ├─ 可用收入（最大字号，突出）
   ├─ 储蓄跑道（如果是跑道模式）
   └─ 预算健康状态（进度条）

2. 快速扫描（Second Screen）：
   ├─ 预算摘要（卡片网格）
   ├─ 即将到来的账单
   └─ 最近交易（最新 5 笔）

3. 详细信息（点击展开）：
   ├─ 历史趋势图
   ├─ 分类详情
   └─ 交易列表

设计策略：
✓ 大字号显示关键数字（可用收入）
✓ 进度条和图表优于密集文本
✓ 卡片式模块化布局
✓ 颜色编码传达状态（绿 = 好，橙 = 注意）
```

**视觉层次示例**：

```
仪表板布局：
┌─────────────────────────────────────────┐
│ 顶部栏：Logo + 导航 + 用户头像         │
├─────────────────────────────────────────┤
│                                         │
│  💰 本月可用收入                        │
│     $1,800                              │  ← 最大字号（4xl）
│     （已扣除税务预留 $700）              │  ← 小说明
│                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━       │
│                                         │
│  📊 你的预算健康                        │
│  ████████░░ 72%                         │  ← 进度条
│  4/6 类别在预算内 ✓                     │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │🍔 食品   │ │🚗 交通   │ │🎬 娱乐   ││  ← 卡片网格
│  │$280/$400 │ │$95/$200  │ │$60/$150  ││
│  │█████░░░  │ │███░░░░░  │ │███░░░░░  ││
│  └──────────┘ └──────────┘ └──────────┘│
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  📅 即将到来的账单                      │
│  ├─ 房租：$1,200（3 天后）              │
│  └─ 电费：$85（12 天后）                │
│                                         │
└─────────────────────────────────────────┘

字号规范：
├─ 关键数字：text-4xl (36px)
├─ 卡片标题：text-lg (18px)
├─ 正文：text-base (16px)
└─ 说明：text-sm (14px)
```

---

#### 极简主义

**避免信息过载（主要压力源）**：

```
设计规则：
1. 每屏一个主要 CTA
   ❌ 错误：同一屏 5 个按钮
   ✓ 正确：1 个主按钮 + 2 个次要链接

2. 易消化的模块化布局
   ❌ 错误：长列表密集信息
   ✓ 正确：卡片式分组，最多 3-4 个/行

3. 留白创造平静
   ❌ 错误：元素拥挤，间距不足
   ✓ 正确：充足 padding/margin（至少 16px）

4. 渐进披露（Progressive Disclosure）
   ❌ 错误：一次性展示所有功能
   ✓ 正确：默认简化视图 + "查看更多"
```

**实际应用**：

```tsx
// ❌ 错误：信息过载
<Card>
  <h3>食品预算</h3>
  <p>本月已用：$280</p>
  <p>预算：$400</p>
  <p>剩余：$120</p>
  <p>百分比：70%</p>
  <p>上月：$310</p>
  <p>平均：$295</p>
  <button>编辑</button>
  <button>查看详情</button>
  <button>查看交易</button>
</Card>

// ✓ 正确：简化 + 渐进
<Card>
  <div className="flex items-center gap-2">
    <span className="text-2xl">🍔</span>
    <h3 className="text-lg font-semibold">食品</h3>
  </div>

  <div className="mt-4">
    <div className="flex justify-between text-sm text-gray-600">
      <span>已用</span>
      <span className="font-semibold">$280</span>
    </div>

    <ProgressBar value={70} className="my-2" />

    <div className="flex justify-between text-sm text-gray-600">
      <span>预算</span>
      <span className="font-semibold">$400</span>
    </div>
  </div>

  <Button variant="ghost" size="sm" className="mt-4">
    查看详情 →
  </Button>
</Card>
```

---

### 原则 3：透明度与信任（Transparency）

#### 安全沟通

**后台安全，前台安心**：

```
安全措施主要在后台：
├─ HTTPS 加密（自动）
├─ JWT 认证（无感知）
├─ Prisma 防 SQL 注入（内置）
└─ NextAuth Session 管理（透明）

用户看到的：
├─ 简短令人安心的消息："验证你的身份..."
├─ 清楚解释为何需要信息："帮助我们保护你的账户"
├─ 生物识别认证（最快、最简单）
└─ 无冗长的安全警告
```

**登录流程示例**：

```
❌ 传统方式（冗长、焦虑）：
┌──────────────────────────────────┐
│ ⚠️ 安全警告                      │
│ 为了保护你的账户安全，我们需要   │
│ 验证你的身份。请输入密码。未经   │
│ 授权的访问将被记录...            │
│ [输入密码]                       │
└──────────────────────────────────┘

✓ Savvly 方式（简洁、安心）：
┌──────────────────────────────────┐
│ 👋 欢迎回来                      │
│                                  │
│ [使用 Face ID 登录]              │
│ 或                               │
│ [输入密码]                       │
│                                  │
│ 你的数据安全加密 🔒              │
└──────────────────────────────────┘
```

---

#### 明确同意

**永不隐藏，永不欺骗**：

```
设计原则：
1. 直接调整偏好的选项
   ✓ 设置页面清晰易找
   ✓ 一键关闭通知
   ✓ 清晰的"删除账户"按钮

2. 完全披露费用、条款
   ✓ 定价页面无隐藏费用
   ✓ 学生免费条款清晰
   ✓ 升级提示说明新增功能

3. 建立信任，不利用注意力
   ✓ 无暗模式（Dark Patterns）
   ✓ 无误导性按钮（"取消"和"确认"同等大小）
   ✓ 无预选勾选框
```

**定价透明示例**：

```
✓ Savvly 方式：
┌──────────────────────────────────┐
│ 💰 定价                          │
│                                  │
│ 免费层                           │
│ ✓ 2 个银行账户                  │
│ ✓ 基本预算功能                  │
│ ✓ 手动 + AI 分类                │
│ ✓ 无限历史记录                  │
│                                  │
│ 学生免费（.edu 验证）            │
│ ✓ 所有高级功能 1 年免费          │
│                                  │
│ 高级 $7/月                       │
│ ✓ 无限银行账户                  │
│ ✓ 税务预留工具                  │
│ ✓ 储蓄跑道模式                  │
│ ✓ 高级报告                      │
│                                  │
│ 无隐藏费用，随时取消 ✓           │
└──────────────────────────────────┘
```

---

### 原则 4：渐进披露（Progressive Disclosure）

#### 入职流程（Onboarding）

**几乎即时设置**：

```
目标：5 分钟内完成入职，立即看到价值

步骤设计：
1. 注册（30 秒）
   ├─ 邮箱 + 密码
   └─ 或：Google OAuth

2. 基本信息（1 分钟）
   ├─ 地区（加拿大/美国）
   ├─ 省份/州（用于税率）
   └─ 预计年收入（自动推荐税率）

3. 连接账户（2 分钟）
   ├─ 选项 A：手动添加首笔交易
   └─ 选项 B：连接银行（Plaid）

4. 智能预算建议（1 分钟）
   ├─ AI 分析支出历史
   ├─ 生成个性化预算
   └─ 一键应用或自定义

5. 完成！进入仪表板
   ├─ 已有数据可视化
   └─ 弹出式教程（可跳过）

设计要点：
✓ 进度条显示（"第 2/5 步"）
✓ 每步聚焦单一任务
✓ 允许跳过非必需步骤
✓ 强调好处，非功能（"帮你省税"vs"设置税率"）
```

**入职界面示例**：

```
第 2 步：税务设置
┌──────────────────────────────────┐
│ 📍 你的主要工作地点？            │
│                                  │
│ ● 加拿大                         │
│   ├─ BC 省（温哥华）✓            │
│   ├─ 安大略省（多伦多）          │
│   └─ 其他省份...                 │
│                                  │
│ ○ 美国                           │
│                                  │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                  │
│ 💰 你的预计年收入？              │
│ $ 45,000                         │
│                                  │
│ ┌────────────────────────────┐  │
│ │ 💡 智能建议                 │  │
│ │                            │  │
│ │ 根据 BC 省税率和你的收入， │  │
│ │ 我们建议预留 28% 作为税款  │  │
│ │                            │  │
│ │ 这将帮你避免报税季压力 ✓   │  │
│ └────────────────────────────┘  │
│                                  │
│ ━━━ 第 2/5 步 ━━━━━━━━━━━━━━   │
│ [← 返回]          [继续 →]      │
└──────────────────────────────────┘
```

---

#### 功能介绍（Feature Introduction）

**"及时"教育（Just-in-Time）**：

```
❌ 传统方式：前置培训
- 入职时播放 10 分钟教程视频
- 强制查看所有功能介绍
- 用户记不住，感觉压倒

✓ Savvly 方式：及时提示
- 用户首次访问功能时，弹出简短提示
- 用户操作时，显示上下文帮助
- 用户可以随时关闭（"不再显示"）
```

**及时提示示例**：

```tsx
// 用户首次访问"预算"页面
<Tooltip position="top-right">
  <h4>💡 预算回滚</h4>
  <p>未用预算可以结转下月，奖励你的节省行为！</p>
  <p className="text-sm text-gray-600 mt-2">
    点击类别设置 ⚙️ 可以调整回滚策略
  </p>
  <Button size="sm" variant="ghost">
    知道了
  </Button>
</Tooltip>
```

---

### 原则 5：同理心与非评判（Empathy）

#### 品牌声音："赋权教练"

**特征**：
```
1. 温暖而非企业
   ❌ "账户已更新"
   ✓ "嘿，你做得很好"

2. 希望导向
   ❌ "你欠债 $5,000"
   ✓ "你正在建设更好的未来"

3. 非评判
   ❌ "你失败了"
   ✓ "让我们调整一下"

4. 清晰而非行话
   ❌ "可自由支配缓冲分配"
   ✓ "安全可支出"

5. 庆祝优先
   ❌ 只显示问题
   ✓ 强调胜利，温和指导调整
```

---

#### 语调一致性矩阵

| 场景 | 传统 App（评判） | Savvly（同理心） |
|------|------------------|------------------|
| **超支 10%** | "⚠️ 警告：你超出食品预算 $40！" | "🍔 食品有点高这个月（+$40）。要从娱乐转移一些吗？" |
| **超支 50%** | "❌ 严重超支！立即削减支出！" | "🤔 食品支出比平常高很多。发生了什么特殊情况吗？让我们一起看看。" |
| **达成目标** | "目标完成 ✓" | "🎉 太棒了！你已建立 2 个月应急基金！这是巨大的成就 💪" |
| **接近目标** | "还差 $500 达成目标" | "💪 再存 $500 就达成 3 个月应急基金了！你快到了！" |
| **低余额** | "⚠️ 余额低！请充值" | "💡 友情提醒：周五有 $1,200 房租账单。你的余额够用 ✓" |
| **首次储蓄** | "已存入 $50" | "🌟 你存下了第一笔 $50！每一步都很重要，继续保持！" |
| **连续储蓄** | "本月存入 $200" | "🔥 连续 3 个月储蓄！那是你目标的 15% →" |
| **负现金流** | "❌ 警告：负储蓄率 -$1,200！" | "📊 本月从储蓄提取 $1,200（计划内）。按此速度，你的跑道还有 12 个月 ✓" |
| **首次登录** | "设置你的预算" | "👋 欢迎！让我们确保每一块钱都为你工作" |
| **长时间未登录** | "你有 25 笔未分类交易" | "👀 好久不见！我帮你整理了最近的 25 笔交易，快速确认一下？" |

---

#### 吉祥物/向导方法（可选）

**考虑引入友好角色**：

```
设计考虑：
- 名字："Savvy"（聪明的、精明的）
- 形象：友好的猫头鹰 🦉（智慧象征）
- 作用：
  ├─ 入职时引导
  ├─ 提供个性化建议
  ├─ 庆祝里程碑
  └─ 温和提醒

优势：
✓ 使财务管理更亲切
✓ 降低严肃感和焦虑
✓ 品牌识别度

劣势：
⚠️ 可能显得不够专业
⚠️ 需要额外设计资源
⚠️ 有些用户可能觉得幼稚

建议：
MVP 阶段不引入吉祥物，专注核心功能
未来 V2 可以考虑，作为可选"趣味模式"
```

---

## 视觉身份系统

### 字体（Typography）

**主字体：Inter（推荐）**

```
为什么选择 Inter？
├─ 专为屏幕阅读优化
├─ 清晰的数字（tabular numbers）
├─ 支持多种字重（100-900）
├─ 开源免费
└─ 与 Tailwind 完美集成

字重使用：
├─ 标题：font-semibold (600) 或 font-bold (700)
├─ 正文：font-normal (400)
├─ 强调：font-medium (500)
└─ 说明：font-light (300)
```

**备选方案**：

```
1. System Font Stack（最快）
   font-family: -apple-system, BlinkMacSystemFont,
                'Segoe UI', 'Roboto', sans-serif;

2. Poppins（更圆润、友好）
   适合品牌标题，但正文不如 Inter 清晰

3. DM Sans（类似 Inter）
   备选方案，风格稍微更现代
```

**字号规范**：

```css
/* Tailwind 字号映射 */

/* 特大：关键数字 */
.text-4xl { font-size: 2.25rem; /* 36px */ }  // 可用收入
.text-3xl { font-size: 1.875rem; /* 30px */ } // 储蓄跑道

/* 大：卡片标题 */
.text-2xl { font-size: 1.5rem; /* 24px */ }   // 页面标题
.text-xl  { font-size: 1.25rem; /* 20px */ }  // 卡片大标题
.text-lg  { font-size: 1.125rem; /* 18px */ } // 卡片标题

/* 标准：正文 */
.text-base { font-size: 1rem; /* 16px */ }    // 正文（默认）

/* 小：说明 */
.text-sm { font-size: 0.875rem; /* 14px */ }  // 说明文字
.text-xs { font-size: 0.75rem; /* 12px */ }   // 次要信息
```

**行高规范**：

```css
/* Tailwind 行高 */

/* 紧凑：数字 */
.leading-none { line-height: 1; }      // 大数字（如 $1,800）

/* 标题：舒适 */
.leading-tight { line-height: 1.25; }  // 标题

/* 正文：阅读优化 */
.leading-normal { line-height: 1.5; }  // 正文（推荐）
.leading-relaxed { line-height: 1.625; } // 长文本
```

---

### 图标系统

**主要图标库：Lucide React（推荐）**

```bash
npm install lucide-react
```

**为什么选择 Lucide？**
```
✓ 现代、一致的设计风格
✓ 专为 React 优化（tree-shakeable）
✓ 1000+ 图标，持续更新
✓ 开源免费
✓ 支持 strokeWidth 自定义
✓ 与 Tailwind 完美集成
```

**图标使用规范**：

```tsx
import { Wallet, TrendingUp, Target, Bell } from 'lucide-react';

// 标准尺寸
<Wallet className="h-5 w-5" />         // 小图标（20px）
<TrendingUp className="h-6 w-6" />    // 中图标（24px，默认）
<Target className="h-8 w-8" />        // 大图标（32px）

// 颜色（Tailwind）
<Bell className="h-6 w-6 text-blue-500" />       // 主色
<Wallet className="h-6 w-6 text-gray-600" />    // 中性
<TrendingUp className="h-6 w-6 text-green-500" /> // 成功

// 描边粗细
<Wallet strokeWidth={1.5} />  // 更细（优雅）
<Wallet strokeWidth={2} />    // 标准
<Wallet strokeWidth={2.5} />  // 更粗（强调）
```

**Emoji 作为类别图标**：

```
为什么也用 Emoji？
✓ 视觉识别度高
✓ 个性化（用户可选择）
✓ 跨平台一致
✓ 无需设计资源

预设 Emoji：
├─ 🍔 食品
├─ 🍽️ 餐饮
├─ 🚗 交通
├─ 🏠 房租
├─ 💡 公用事业
├─ 🎬 娱乐
├─ 📱 订阅
├─ 📚 教育
├─ 🏥 医疗
├─ 💰 储蓄
└─ ❓ 其他

使用方式：
- 用户创建预算类别时可选择 Emoji
- 或使用 Lucide 图标
- 或组合使用（Emoji + 文字）
```

---

### 圆角与阴影

**圆角规范（Rounded Corners）**：

```css
/* Tailwind 圆角 */

.rounded-none { border-radius: 0; }        // 直角（不推荐）
.rounded-sm { border-radius: 0.125rem; }   // 2px（按钮内小元素）
.rounded { border-radius: 0.25rem; }       // 4px（输入框）
.rounded-md { border-radius: 0.375rem; }   // 6px（按钮，默认）
.rounded-lg { border-radius: 0.5rem; }     // 8px（卡片，推荐）
.rounded-xl { border-radius: 0.75rem; }    // 12px（大卡片）
.rounded-2xl { border-radius: 1rem; }      // 16px（模态框）
.rounded-full { border-radius: 9999px; }   // 完全圆（头像、徽章）

Savvly 推荐：
├─ 卡片：rounded-lg (8px)
├─ 按钮：rounded-md (6px)
├─ 输入框：rounded-md (6px)
├─ 徽章：rounded-full
└─ 模态框：rounded-xl (12px)
```

**阴影规范（Shadows）**：

```css
/* Tailwind 阴影 */

/* 微妙阴影（悬浮卡片）*/
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

/* 标准阴影（卡片，推荐）*/
.shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
              0 1px 2px -1px rgb(0 0 0 / 0.1);
}

/* 中等阴影（悬浮时）*/
.shadow-md {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
              0 2px 4px -2px rgb(0 0 0 / 0.1);
}

/* 大阴影（模态框）*/
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
}

Savvly 推荐：
├─ 卡片静止：shadow
├─ 卡片悬浮：shadow-md（hover 时）
├─ 模态框：shadow-lg
└─ 下拉菜单：shadow-md
```

---

### 动画与过渡

**动画原则**：

```
微妙而有意义：
✓ 动画应提供反馈，而非装饰
✓ 持续时间：150-300ms（快速但可感知）
✓ 缓动函数：ease-in-out（自然）
✓ 避免过度动画（触发焦虑）
```

**常用动画**：

```css
/* Tailwind 过渡 */

/* 标准过渡（推荐）*/
.transition {
  transition-property: all;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 颜色过渡 */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-duration: 150ms;
}

/* 变换过渡 */
.transition-transform {
  transition-property: transform;
  transition-duration: 150ms;
}

使用示例：
<Button className="transition-colors hover:bg-blue-600">
  保存
</Button>

<Card className="transition-shadow hover:shadow-md">
  预算卡片
</Card>
```

**庆祝动画**：

```tsx
// 目标达成时的动画
import confetti from 'canvas-confetti';

function celebrateGoal() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// 进度条填充动画
<div
  className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
  style={{ width: `${progress}%` }}
/>

// 数字计数动画
import { useCountUp } from 'react-countup';

<CountUp
  end={1800}
  duration={1}
  prefix="$"
  separator=","
/>
```

---

## 组件设计规范

### 按钮（Buttons）

**层级系统**：

```tsx
// 主要按钮（Primary）- 关键操作
<Button variant="primary" size="md">
  保存预算
</Button>
// 样式：bg-blue-500 text-white hover:bg-blue-600

// 次要按钮（Secondary）- 次要操作
<Button variant="secondary" size="md">
  取消
</Button>
// 样式：bg-gray-200 text-gray-700 hover:bg-gray-300

// 幽灵按钮（Ghost）- 低优先级
<Button variant="ghost" size="md">
  查看详情
</Button>
// 样式：bg-transparent text-blue-500 hover:bg-blue-50

// 危险按钮（Danger）- 删除操作（慎用）
<Button variant="danger" size="md">
  删除预算
</Button>
// 样式：bg-red-500 text-white（用柔和红，非刺眼）
```

**尺寸规范**：

```tsx
<Button size="sm">小按钮</Button>    // h-8 px-3 text-sm
<Button size="md">标准按钮</Button>  // h-10 px-4 text-base（默认）
<Button size="lg">大按钮</Button>    // h-12 px-6 text-lg
```

**状态设计**：

```tsx
// 加载状态
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  保存中...
</Button>

// 禁用状态
<Button disabled>
  保存
</Button>
// 样式：opacity-50 cursor-not-allowed
```

---

### 卡片（Cards）

**标准卡片**：

```tsx
<Card className="p-6 rounded-lg shadow hover:shadow-md transition-shadow">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <span className="text-2xl">🍔</span>
      食品
    </CardTitle>
  </CardHeader>

  <CardContent>
    {/* 卡片内容 */}
  </CardContent>

  <CardFooter>
    <Button variant="ghost" size="sm">
      查看详情 →
    </Button>
  </CardFooter>
</Card>
```

**交互式卡片**：

```tsx
<Card className="cursor-pointer hover:border-blue-500 transition-colors">
  {/* 可点击的卡片 */}
</Card>
```

---

### 输入框（Input Fields）

**标准输入**：

```tsx
<div className="space-y-2">
  <Label htmlFor="amount">金额</Label>
  <Input
    id="amount"
    type="number"
    placeholder="0.00"
    className="text-right"  // 金额右对齐
  />
  <p className="text-sm text-gray-600">
    输入交易金额
  </p>
</div>
```

**输入验证**：

```tsx
// 错误状态
<Input
  error
  className="border-red-300 focus:border-red-500"
/>
<p className="text-sm text-red-600 mt-1">
  金额必须大于 0
</p>

// 成功状态
<Input
  success
  className="border-green-300 focus:border-green-500"
/>
<p className="text-sm text-green-600 mt-1">
  ✓ 看起来不错
</p>
```

---

### 进度条（Progress Bars）

**标准进度条**：

```tsx
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-gray-600">已用</span>
    <span className="font-semibold">{spent}%</span>
  </div>

  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className={`h-2 rounded-full transition-all duration-500 ${
        spent > 90 ? 'bg-orange-500' :
        spent > 70 ? 'bg-yellow-500' :
        'bg-green-500'
      }`}
      style={{ width: `${spent}%` }}
    />
  </div>

  <div className="flex justify-between text-sm">
    <span className="text-gray-600">预算</span>
    <span className="font-semibold">${amount}</span>
  </div>
</div>
```

**储蓄跑道进度**：

```tsx
<Card>
  <CardHeader>
    <CardTitle>💰 储蓄跑道</CardTitle>
  </CardHeader>

  <CardContent>
    <div className="text-center mb-4">
      <p className="text-4xl font-bold">{runway} 个月</p>
      <p className="text-sm text-gray-600 mt-1">
        按当前消耗速度
      </p>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
        style={{ width: `${(runway / target) * 100}%` }}
      />
    </div>

    <div className="mt-4 p-3 bg-blue-50 rounded-md">
      <p className="text-sm text-blue-700">
        ✓ 你的目标：{target} 个月后毕业
      </p>
      <p className="text-sm text-blue-700 font-semibold">
        安全缓冲：+{runway - target} 个月
      </p>
    </div>
  </CardContent>
</Card>
```

---

### 通知/Toast

**成功通知**：

```tsx
<Toast variant="success">
  <CheckCircle className="h-5 w-5 text-green-500" />
  <div>
    <p className="font-semibold">预算已保存！</p>
    <p className="text-sm text-gray-600">食品预算更新为 $400</p>
  </div>
</Toast>
```

**温和提醒（替代警告）**：

```tsx
<Toast variant="info">
  <Info className="h-5 w-5 text-blue-500" />
  <div>
    <p className="font-semibold">友情提醒</p>
    <p className="text-sm text-gray-600">
      食品预算接近限额（85% 已用）
    </p>
  </div>
</Toast>
```

---

## 响应式设计

### 断点（Breakpoints）

```css
/* Tailwind 默认断点 */

/* 移动端（默认）*/
/* < 640px */

/* 平板 */
sm: 640px  /* @media (min-width: 640px) */
md: 768px  /* @media (min-width: 768px) */

/* 桌面 */
lg: 1024px  /* @media (min-width: 1024px) */
xl: 1280px  /* @media (min-width: 1280px) */
2xl: 1536px /* @media (min-width: 1536px) */
```

### 移动优先设计

**布局适配**：

```tsx
// 仪表板网格
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <BudgetCard />  {/* 移动：1 列，平板：2 列，桌面：3 列 */}
  <BudgetCard />
  <BudgetCard />
</div>

// 字号适配
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  可用收入
</h1>

// 间距适配
<div className="p-4 md:p-6 lg:p-8">
  卡片内容
</div>

// 显示/隐藏
<div className="hidden md:block">
  仅桌面显示
</div>

<div className="block md:hidden">
  仅移动端显示
</div>
```

---

## 暗色模式（Dark Mode）- 可选

**实现策略**：

```
MVP 阶段：不实现（专注核心功能）
V2 阶段：考虑添加

技术实现：
├─ Tailwind 内置支持（dark: 前缀）
├─ Next.js + next-themes
└─ 用户偏好存储在数据库

色彩适配：
├─ 背景：white → gray-900
├─ 文字：gray-900 → white
├─ 卡片：white → gray-800
└─ 边框：gray-200 → gray-700
```

---

## 无障碍（Accessibility）

### 关键原则

```
1. 颜色对比度
   ✓ 文字与背景至少 4.5:1（WCAG AA）
   ✓ 大文字（18px+）至少 3:1

2. 键盘导航
   ✓ 所有交互元素可 Tab 访问
   ✓ Focus 状态清晰可见
   ✓ Escape 关闭模态框

3. 语义化 HTML
   ✓ <button> for buttons（不用 <div onClick>）
   ✓ <label> for inputs
   ✓ <nav>, <main>, <aside> 等语义标签

4. ARIA 标签
   ✓ aria-label 描述图标按钮
   ✓ aria-describedby 关联帮助文本
   ✓ role 属性适当使用

5. 屏幕阅读器友好
   ✓ 隐藏装饰性图片（aria-hidden="true"）
   ✓ 提供替代文本
   ✓ 表单错误清晰播报
```

### 实际应用

```tsx
// 图标按钮（屏幕阅读器友好）
<button
  aria-label="删除预算"
  className="p-2 hover:bg-gray-100 rounded"
>
  <Trash2 className="h-5 w-5" aria-hidden="true" />
</button>

// 输入框（关联标签）
<label htmlFor="amount" className="block text-sm font-medium">
  金额
</label>
<input
  id="amount"
  type="number"
  aria-describedby="amount-help"
/>
<p id="amount-help" className="text-sm text-gray-600">
  输入交易金额（加币）
</p>

// Focus 状态
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  保存
</button>
```

---

## 性能优化

### 图片优化

```tsx
// 使用 Next.js Image 组件
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Savvly Logo"
  width={120}
  height={40}
  priority  // 首屏图片
/>

优势：
✓ 自动格式优化（WebP/AVIF）
✓ 响应式尺寸
✓ 懒加载（默认）
✓ 防止布局偏移
```

### 代码分割

```tsx
// 动态导入大组件
import dynamic from 'next/dynamic';

const ChartComponent = dynamic(() => import('./Chart'), {
  loading: () => <Skeleton />,
  ssr: false  // 仅客户端渲染
});
```

### 字体优化

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // 避免 FOIT
  variable: '--font-inter'
});

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 下一步行动

### 立即可做

```
1. ✅ 阅读此设计指南
2. ⏭️ 安装 Shadcn/ui 组件
3. ⏭️ 配置 Tailwind 色彩变量
4. ⏭️ 创建基础组件（Button、Card、Input）
5. ⏭️ 实现首个页面（仪表板）
```

### 设计资源

```
色彩工具：
├─ Coolors.co（调色板生成）
├─ Contrast Checker（对比度检查）
└─ Tailwind Color Generator

图标库：
├─ Lucide Icons（主要）
├─ Heroicons（备选）
└─ Emoji（类别）

设计灵感：
├─ Dribbble（搜索 "fintech dashboard"）
├─ Behance（搜索 "budget app"）
└─ Mobbin（移动端设计）

组件参考：
├─ Shadcn/ui Examples
├─ Tailwind UI（付费但值得）
└─ Radix UI（无样式组件）
```

---

**文档版本**：v1.0
**创建日期**：2025 年
**最后更新**：基于市场分析报告生成
**状态**：✅ 已完成，准备实施

**下一步**：开始实现第一个组件和页面！
