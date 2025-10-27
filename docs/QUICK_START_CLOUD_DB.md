# 快速开始 - 使用Neon云数据库（5分钟）

如果你想**立即开始开发**而不等待Docker安装，使用这个方案：

## 🌐 Neon PostgreSQL (免费，无需信用卡)

### 步骤1: 创建Neon账户（2分钟）

1. 访问 https://neon.tech/
2. 点击 "Sign Up"
3. 使用GitHub账户登录（或邮箱注册）

### 步骤2: 创建数据库（1分钟）

1. 进入Dashboard后，点击 "Create a project"
2. 项目名称: `savvly-dev`
3. 区域: 选择最近的（如 `US East (Ohio)`）
4. PostgreSQL版本: 保持默认（16）
5. 点击 "Create Project"

### 步骤3: 获取连接字符串（30秒）

创建完成后，你会看到连接字符串：

```
Connection string 示例:
postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**复制这个字符串！**

### 步骤4: 更新本地环境变量（30秒）

打开项目的 `.env.local` 文件，替换 DATABASE_URL:

```env
# 替换为你的Neon连接字符串
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-change-in-production"
```

### 步骤5: 推送数据库Schema（1分钟）

在项目目录运行:

```bash
npx prisma db push
```

你应该看到:
```
✓ Your database is now in sync with your Prisma schema.
```

### 步骤6: 启动开发服务器

```bash
npm run dev
```

访问: `http://localhost:3000`

---

## ✅ 完成！

现在你可以:
- ✅ 立即开始开发
- ✅ 测试所有API
- ✅ 数据永久保存（不会丢失）
- ✅ 随时在Neon Dashboard查看数据

**之后可以随时切换到本地Docker** - 只需修改 `.env.local` 中的 `DATABASE_URL`

---

## 🎁 Neon免费额度

- ✅ 0.5 GB 存储
- ✅ 无限查询
- ✅ 自动备份
- ✅ 分支功能（创建开发/测试分支）

对于开发完全够用！

---

## 📊 在Neon查看数据

1. 登录 https://console.neon.tech/
2. 选择你的项目 `savvly-dev`
3. 点击 "Tables" 查看所有表
4. 点击 "SQL Editor" 运行SQL查询

---

## 🔄 未来切换到本地Docker

当你安装Docker后，只需:

```bash
# 1. 启动本地数据库
docker-compose up -d

# 2. 修改 .env.local
DATABASE_URL="postgresql://savvly_user:savvly_dev_password@localhost:5432/savvly_db"

# 3. 推送schema
npx prisma db push
```

就这样！
