# Savvly 应用线框图设计 - 完整总结

## 🎉 设计文档已完成

根据 [UIUX设计风格指南](../reports/UIUX设计风格指南.md)，我们已经创建了 Savvly 应用的完整线框图设计文档。

---

## 📚 文档清单

### 核心设计文档

1. **[00-WIREFRAME-OVERVIEW.md](./wireframes/00-WIREFRAME-OVERVIEW.md)**
   - 设计原则回顾
   - 用户流程图
   - 页面架构
   - 响应式断点
   - 实现优先级

2. **[01-AUTH-WIREFRAMES.md](./wireframes/01-AUTH-WIREFRAMES.md)**
   - 欢迎页面
   - 注册页面
   - 登录页面
   - 忘记密码流程
   - OAuth 登录

3. **[03-DASHBOARD-WIREFRAMES.md](./wireframes/03-DASHBOARD-WIREFRAMES.md)**
   - 主仪表板布局（桌面 + 移动）
   - 可用收入卡片
   - 预算健康状态
   - 预算卡片（多种状态）
   - 即将到来的账单
   - 最近交易列表
   - 储蓄跑道模式
   - 空状态设计

4. **[04-BUDGET-WIREFRAMES.md](./wireframes/04-BUDGET-WIREFRAMES.md)**
   - 预算列表页面（表格 + 网格视图）
   - 创建预算表单
   - 编辑预算页面
   - 预算详情页面
   - 回滚策略设置
   - 批量操作界面
   - AI 智能建议

5. **[07-COMPONENTS-SPEC.md](./wireframes/07-COMPONENTS-SPEC.md)**
   - 基础组件规范（Button, Input, Card 等）
   - 复合组件规范（BudgetCard, TransactionRow 等）
   - 布局组件规范（Layout, Header, Sidebar 等）
   - Shadcn/ui 安装指南
   - 设计令牌系统

---

## 🎨 设计原则精华

### 色彩系统
```
主色调：
• 平静蓝 #3B82F6 - 信任、稳定
• 成长绿 #10B981 - 希望、积极
• 希望橙 #F59E0B - 乐观、温暖
• 柔和珊瑚 #FB923C - 温和提醒（替代红色）
```

### 语言风格

**⚠️ 重要：UI 提示语语言规范**
```
所有 UI 提示语、按钮文字、表单标签等必须使用英文作为默认语言。

理由：
✓ 国际化标准 - 英文作为通用语言
✓ 代码可维护性 - 便于未来多语言扩展
✓ 团队协作 - 统一的开发标准
✓ 用户群体 - 主要面向北美用户
```

**正确示例（英文）：**
```
✓ "Available This Month: $1,800" (而非 "本月可用收入 $1,800")
✓ "$120 remaining ✓" (而非 "还剩 $120 可用")
✓ "Food is a bit high this month" (而非 "食品有点高这个月")
✓ "Let's adjust together" (而非 "让我们一起调整")
✓ "You're doing great!" (而非 "你做得很好！")
```

**语调原则（保持不变）：**
```
✓ 使用赋权语言 (Empowering)
✓ 希望导向框架 (Hope-oriented)
✓ 温暖友好语调 (Warm & Friendly)
✓ 非评判性表达 (Non-judgmental)

✗ 避免：
- 刺眼的红色警告
- 评判性语言（"Failed", "Error"）
- 限制性表达（"You can't spend more"）
- 制造焦虑的词汇（"Warning!", "Danger!")
```

### 视觉层次
```
1. 即时可见：可用收入、储蓄跑道
2. 快速扫描：预算摘要卡片、即将账单
3. 详细信息：历史趋势、完整交易列表
```

---

## 📊 核心界面统计

### 页面总数
- **4 个核心页面流程**:
  1. 认证流程（登录/注册/忘记密码）
  2. 主仪表板
  3. 预算管理（列表/创建/编辑/详情）
  4. 交易管理（待扩展）

### 组件总数
- **30+ UI 组件**:
  - 10 个基础组件（Button, Input, Card 等）
  - 6 个复合组件（BudgetCard, TransactionRow 等）
  - 4 个布局组件（Layout, Header, Sidebar 等）
  - 3 个表单组件（FormField, RadioGroup, Slider）
  - 其他辅助组件

### 状态设计
- **6 种主要状态**:
  1. 加载中（Skeleton + Spinner）
  2. 空状态（EmptyState）
  3. 成功（绿色提示）
  4. 警告（橙色提示，非红色）
  5. 正常（默认状态）
  6. 禁用（灰色半透明）

---

## 🚀 实现路线图

### 第一阶段：基础设施（2周）
```
Week 1:
✓ 项目结构搭建
✓ Tailwind CSS 配置
✓ Shadcn/ui 安装
□ 基础组件开发（Button, Input, Card）
□ 布局组件（Layout, Header, Sidebar）

Week 2:
□ 认证页面（登录/注册）
□ NextAuth 集成
□ 表单验证
```

### 第二阶段：核心功能（3周）
```
Week 3-4:
□ 主仪表板实现
□ 预算卡片组件
□ 统计数据展示
□ API 集成

Week 5:
□ 预算管理流程
□ 创建/编辑预算
□ 回滚策略设置
```

### 第三阶段：完善优化（3周）
```
Week 6-7:
□ 交易管理
□ 预算详情页
□ 数据可视化

Week 8:
□ 响应式优化
□ 性能优化
□ 用户测试
```

### 第四阶段：上线准备（2周）
```
Week 9:
□ Bug 修复
□ 无障碍测试
□ 跨浏览器测试

Week 10:
□ 生产环境部署
□ 监控配置
□ 文档完善
```

---

## 💻 技术栈

### 前端框架
- **Next.js 16** - App Router
- **React 19** - UI 库
- **TypeScript 5** - 类型安全

### 样式系统
- **Tailwind CSS 4** - 工具类样式
- **Shadcn/ui** - 组件库
- **Lucide React** - 图标库

### 状态管理
- **React Hooks** - 本地状态
- **NextAuth** - 认证状态
- **SWR / TanStack Query** - 服务器状态（可选）

### 表单处理
- **React Hook Form** - 表单管理
- **Zod** - 模式验证

---

## 📐 设计规格快速参考

### 间距系统
```css
4px  = space-1  (最小间距)
8px  = space-2  (紧凑间距)
16px = space-4  (标准间距)
24px = space-6  (宽松间距)
32px = space-8  (段落间距)
```

### 字号系统
```css
12px = text-xs   (次要信息)
14px = text-sm   (说明文字)
16px = text-base (正文，默认)
18px = text-lg   (卡片标题)
24px = text-2xl  (页面标题)
36px = text-4xl  (关键数字)
```

### 圆角系统
```css
6px  = rounded-md   (按钮、输入框)
8px  = rounded-lg   (卡片)
12px = rounded-xl   (模态框)
9999px = rounded-full (徽章、头像)
```

### 断点系统
```css
< 640px  = 移动端（默认）
640px+   = sm (平板竖屏)
768px+   = md (平板横屏)
1024px+  = lg (桌面)
1280px+  = xl (大屏桌面)
```

---

## ✅ 设计交付物

### 文档
- [x] 设计总览文档
- [x] 认证流程线框图
- [x] 仪表板线框图
- [x] 预算管理线框图
- [x] 组件规范文档
- [x] 实现指南

### 资源
- [x] 色彩系统定义
- [x] 字体规范
- [x] 图标使用指南
- [x] 组件清单
- [x] API 集成列表

---

## 🎯 关键设计决策

### 1. 情感导向设计
- **避免焦虑触发**: 使用橙色替代红色警告
- **积极语言框架**: "剩余 $120 可用"而非"只剩 $120"
- **庆祝进展**: 里程碑徽章、进度庆祝

### 2. 预算回滚机制
- **4 种回滚策略**: 完全、部分、不回滚、目标导向
- **灵活性**: 每个类别独立设置
- **教育型UI**: 内置解释和建议

### 3. 移动优先
- **单列布局**: 移动端简化信息层级
- **底部导航**: 拇指友好的触控区域
- **渐进披露**: 默认显示核心信息

### 4. 无障碍优先
- **键盘导航**: 所有操作可 Tab 访问
- **色彩对比**: WCAG AA 标准（4.5:1）
- **屏幕阅读器**: 完整 ARIA 标签

---

## 📱 设备适配

### 移动端 (<640px)
- 单列布局
- 底部导航栏
- 全屏卡片
- 简化信息

### 平板 (640-1024px)
- 双列网格
- 侧边导航栏
- 适度信息展示

### 桌面 (>1024px)
- 三列网格
- 固定侧边栏
- 完整信息展示
- 悬停交互

---

## 🔗 相关资源

### 设计工具
- **Figma** - 高保真原型（可选）
- **Excalidraw** - 快速线框图
- **Tailwind Playground** - 样式实验

### 组件库
- **[Shadcn/ui](https://ui.shadcn.com/)** - 主要组件库
- **[Lucide Icons](https://lucide.dev/)** - 图标库
- **[Radix UI](https://www.radix-ui.com/)** - 无样式基础组件

### 灵感来源
- **YNAB** - 预算方法论
- **Monarch Money** - 现代 UI 设计
- **Copilot Money** - 简洁交互

---

## 📞 下一步行动

### ⚠️ 开始前必读
**重要：所有 UI 文本必须使用英文**
- 按钮文字、表单标签、提示信息等必须用英文
- 参考上方"语言风格"章节的正确示例
- 线框图中的中文示例仅用于说明概念，实现时需转换为英文

### 立即开始
1. 阅读所有线框图文档
2. 安装 Shadcn/ui: `npx shadcn@latest init`
3. 配置 Tailwind 色彩变量
4. 创建基础组件（Button, Input, Card）
5. **确保所有组件文本使用英文**

### 本周目标
1. 完成基础组件库
2. 实现认证页面
3. 搭建仪表板布局
4. 集成 NextAuth

### 本月目标
1. 完成主仪表板
2. 实现预算管理流程
3. 添加交易记录功能
4. 完成响应式适配

---

## 📈 成功指标

### 设计质量
- [ ] 遵循设计系统（色彩、字体、间距）
- [ ] 响应式设计在所有设备正常
- [ ] 无障碍测试通过
- [ ] 性能优化（LCP < 2.5s）

### 用户体验
- [ ] 用户完成首次预算创建时间 < 2 分钟
- [ ] 零焦虑触发反馈
- [ ] 正面语言框架一致性
- [ ] 用户满意度 > 4.5/5

### 技术质量
- [ ] TypeScript 类型覆盖率 100%
- [ ] 组件单元测试覆盖率 > 80%
- [ ] 无控制台错误
- [ ] Lighthouse 分数 > 90

---

## 🙏 设计致谢

本设计方案基于：
- **UIUX设计风格指南** - 情感导向设计原则
- **市场分析报告** - 竞品研究和用户需求
- **用户群体细分分析** - 目标用户画像
- **产品战略文档** - 创始人愿景和价值主张

---

**文档版本**: v1.0
**创建日期**: 2025-10-27
**作者**: Claude (基于 UIUX 设计风格指南)
**状态**: ✅ 设计完成，已交付

---

## ⚠️ 实现注意事项

### 1. UI 文本语言规范（重要！）

**所有 UI 提示语、按钮文字、表单标签等必须使用英文作为默认语言。**

#### 为什么使用英文？
- ✅ 国际化标准 - 英文作为通用语言
- ✅ 代码可维护性 - 便于未来多语言扩展（i18n）
- ✅ 团队协作 - 统一的开发标准
- ✅ 用户群体 - 主要面向北美用户

#### 关于线框图中的中文
线框图文档中使用的中文示例**仅用于说明设计概念和交互流程**，在实际代码实现时：
- ❌ 不要直接复制中文文本到代码中
- ✅ 所有文本必须转换为英文
- ✅ 保持相同的语调和情感表达

#### 英文文案参考示例

**仪表板:**
```tsx
// ❌ 错误
<h1>本月可用收入</h1>
<p>已扣除税务预留 $700</p>

// ✅ 正确
<h1>Available This Month</h1>
<p>Tax reserve deducted: $700</p>
```

**预算卡片:**
```tsx
// ❌ 错误
<Button>查看详情</Button>
<p>剩余 $120 可用 ✓</p>

// ✅ 正确
<Button>View Details</Button>
<p>$120 remaining ✓</p>
```

**温和提醒（超支情况）:**
```tsx
// ❌ 错误
<p>食品有点高这个月 (+$15)</p>
<p>要调整下月预算吗？</p>

// ✅ 正确
<p>Food is a bit high this month (+$15)</p>
<p>Adjust next month's budget?</p>
```

**成功消息:**
```tsx
// ❌ 错误
toast.success("预算已保存！")

// ✅ 正确
toast.success("Budget saved!")
```

**空状态:**
```tsx
// ❌ 错误
<EmptyState
  title="还没有预算设置"
  description="让我们创建第一个预算，开始掌控你的财务！"
/>

// ✅ 正确
<EmptyState
  title="No budgets yet"
  description="Let's create your first budget and take control of your finances!"
/>
```

### 2. 保持设计语调

即使使用英文，也要保持设计指南中的**赋权、希望导向、非评判**语调：

**✅ 推荐的英文表达：**
```
• "You're doing great!" (而非 "Performance adequate")
• "Let's adjust together" (而非 "Budget exceeded")
• "Nice! That's 5% toward your goal →" (而非 "5% progress")
• "$120 remaining ✓" (而非 "Only $120 left")
• "Food is a bit high this month" (而非 "Warning: Overspent!")
```

**❌ 避免的英文表达：**
```
• "Warning: Budget exceeded!"
• "Error: Insufficient funds"
• "Failed to save"
• "You can't spend more"
• "Critical: Low balance"
```

### 3. 实现清单

开始编码前，请确认：
- [ ] 已阅读完整的 WIREFRAME_SUMMARY.md
- [ ] 理解所有 UI 文本必须使用英文
- [ ] 了解保持温和、赋权语调的重要性
- [ ] 查看了上方的英文文案示例
- [ ] 准备好将线框图中的中文概念转换为英文实现

---

**准备好开始实现了吗？** 🚀

查看 [00-WIREFRAME-OVERVIEW.md](./wireframes/00-WIREFRAME-OVERVIEW.md) 开始你的旅程！

**记住：用英文编写所有 UI 文本！** 🌍
