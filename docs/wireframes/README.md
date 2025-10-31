# Savvly 线框图设计文档

## 📚 快速导航

### ⚠️ 重要提醒
**所有 UI 文本必须使用英文！** 请参考 [ENGLISH-COPY-REFERENCE.md](./ENGLISH-COPY-REFERENCE.md) 获取完整的英文文案。

---

## 📖 文档列表

### 1. [00-WIREFRAME-OVERVIEW.md](./00-WIREFRAME-OVERVIEW.md)
**设计总览与指南**
- 设计原则回顾
- 用户流程图
- 页面架构
- 响应式断点
- 实现优先级

### 2. [01-AUTH-WIREFRAMES.md](./01-AUTH-WIREFRAMES.md)
**认证界面设计**
- 欢迎页面
- 注册页面
- 登录页面
- 忘记密码流程
- OAuth 登录
- 表单验证状态

### 3. [03-DASHBOARD-WIREFRAMES.md](./03-DASHBOARD-WIREFRAMES.md)
**主仪表板设计**
- 桌面端布局（三列网格）
- 移动端布局（单列 + 底部导航）
- 可用收入卡片
- 预算健康状态
- 预算卡片（多种状态）
- 即将到来的账单
- 最近交易列表
- 储蓄跑道模式
- 空状态设计

### 4. [04-BUDGET-WIREFRAMES.md](./04-BUDGET-WIREFRAMES.md)
**预算管理界面**
- 预算列表页（表格 + 网格视图）
- 创建预算表单
- 编辑预算页面
- 预算详情页面
- **预算回滚策略**（完全/部分/不回滚/目标导向）
- 批量操作界面
- AI 智能建议
- 删除确认模态框

### 5. [07-COMPONENTS-SPEC.md](./07-COMPONENTS-SPEC.md)
**组件规范文档**
- 基础组件（Button, Input, Card 等）
- 复合组件（BudgetCard, TransactionRow 等）
- 布局组件（Layout, Header, Sidebar 等）
- 表单组件（FormField, RadioGroup, Slider）
- Shadcn/ui 安装指南
- 设计令牌系统

### 6. [ENGLISH-COPY-REFERENCE.md](./ENGLISH-COPY-REFERENCE.md) ⭐
**英文文案完整参考**
- Dashboard 英文文案
- Budget Cards 英文文案
- Authentication 英文文案
- Notifications 英文文案
- Empty States 英文文案
- Settings 英文文案
- 所有 UI 元素的英文对照

---

## 🎨 核心设计原则

### 色彩系统
```
• 平静蓝 #3B82F6 - Primary (信任、稳定)
• 成长绿 #10B981 - Secondary (希望、积极)
• 希望橙 #F59E0B - Accent (乐观、温暖)
• 柔和珊瑚 #FB923C - Attention (温和提醒，替代红色)
```

### 语言风格
**⚠️ 所有 UI 文本必须使用英文**

**✅ 推荐的英文表达：**
- "You're doing great!" (而非 "Performance adequate")
- "Let's adjust together" (而非 "Budget exceeded")
- "$120 remaining ✓" (而非 "Only $120 left")
- "Food is a bit high this month" (而非 "Warning: Overspent!")

**❌ 避免的英文表达：**
- "Warning: Budget exceeded!"
- "Error: Insufficient funds"
- "Failed to save"
- "You can't spend more"

### 情感导向
- ✅ 赋权而非限制
- ✅ 希望而非恐惧
- ✅ 平静而非警报
- ✅ 清晰而非复杂
- ✅ 同理心而非评判

---

## 🚀 快速开始

### 第一步：理解设计
1. 阅读 [00-WIREFRAME-OVERVIEW.md](./00-WIREFRAME-OVERVIEW.md)
2. 了解核心设计原则
3. 查看用户流程图

### 第二步：准备实现
1. 阅读 [ENGLISH-COPY-REFERENCE.md](./ENGLISH-COPY-REFERENCE.md)
2. 确保理解所有 UI 文本必须用英文
3. 安装必要的组件库

```bash
# 安装 Shadcn/ui
npx shadcn@latest init

# 安装基础组件
npx shadcn@latest add button input label card dialog toast
```

### 第三步：开始开发
1. 从简单页面开始（认证页面）
2. 实现基础组件库
3. 逐步构建复杂功能

---

## 📊 设计统计

| 项目 | 数量 |
|------|------|
| 文档总数 | 7 个 |
| 核心页面 | 10+ 个 |
| 组件规范 | 30+ 个 |
| 英文文案 | 200+ 条 |

---

## 🎯 实现优先级

### MVP 阶段（必须）
1. ✅ 认证流程（登录/注册）
2. ✅ 主仪表板
3. ✅ 预算管理（CRUD）
4. ✅ 交易管理（CRUD）
5. ✅ 基础设置

### V2 阶段（增强）
- 目标管理
- 高级报表
- AI 分类
- 银行连接
- 暗色模式

---

## 📝 实现检查清单

开始编码前，确认：
- [ ] 已阅读所有线框图文档
- [ ] 理解所有 UI 文本必须使用英文
- [ ] 查看了 [ENGLISH-COPY-REFERENCE.md](./ENGLISH-COPY-REFERENCE.md)
- [ ] 了解保持温和、赋权语调的重要性
- [ ] 安装了 Shadcn/ui 和必要组件
- [ ] 配置了 Tailwind 色彩变量

---

## 🔗 相关资源

### 设计工具
- [Shadcn/ui](https://ui.shadcn.com/) - 主要组件库
- [Lucide Icons](https://lucide.dev/) - 图标库
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架

### 参考文档
- [../WIREFRAME_SUMMARY.md](../WIREFRAME_SUMMARY.md) - 总体概览
- [../../reports/UIUX设计风格指南.md](../../reports/UIUX设计风格指南.md) - 原始设计指南
- [../../CLAUDE.md](../../CLAUDE.md) - 项目架构文档

---

## ❓ 常见问题

### Q: 为什么 UI 文本必须用英文？
**A:**
- ✅ 国际化标准 - 便于未来多语言扩展
- ✅ 代码可维护性 - 统一的开发标准
- ✅ 用户群体 - 主要面向北美用户

### Q: 线框图中的中文怎么办？
**A:** 线框图中的中文**仅用于说明设计概念**，实现时必须转换为英文。参考 [ENGLISH-COPY-REFERENCE.md](./ENGLISH-COPY-REFERENCE.md) 获取所有英文文案。

### Q: 如何保持赋权、希望导向的语调？
**A:**
- 使用积极框架："$120 remaining" 而非 "Only $120 left"
- 避免评判："Let's adjust" 而非 "You failed"
- 温和提醒：橙色 而非 红色警告

### Q: 从哪个页面开始实现？
**A:** 推荐顺序：
1. 认证页面（最简单）
2. 主仪表板（核心功能）
3. 预算管理（主要功能）
4. 交易管理（辅助功能）

---

## 📞 需要帮助？

- 查看 [00-WIREFRAME-OVERVIEW.md](./00-WIREFRAME-OVERVIEW.md) 了解整体架构
- 参考 [ENGLISH-COPY-REFERENCE.md](./ENGLISH-COPY-REFERENCE.md) 获取英文文案
- 查看 [07-COMPONENTS-SPEC.md](./07-COMPONENTS-SPEC.md) 了解组件规范

---

**文档版本**: v1.0
**最后更新**: 2025-10-27
**状态**: ✅ 完整设计，可开始实现

**准备好开始了吗？** 🚀
