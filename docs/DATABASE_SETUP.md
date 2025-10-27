# Savvly 数据库设置指南

## 📋 策略总览

### 开发环境（本地）
- **使用**: Docker Compose + PostgreSQL
- **优点**: 快速、免费、与生产一致
- **数据**: 本地volume持久化

### 生产环境（部署）
- **选项1**: Docker部署（推荐）
- **选项2**: 云托管PostgreSQL（如Railway、Neon）

---

## 🚀 本地开发设置（Docker Compose）

### 前提条件

1. 安装 Docker Desktop
   - Windows: https://docs.docker.com/desktop/install/windows-install/
   - Mac: https://docs.docker.com/desktop/install/mac-install/

2. 验证安装:
```bash
docker --version
docker-compose --version
```

### 步骤1: 启动PostgreSQL

```bash
# 启动数据库（首次会下载镜像）
docker-compose up -d

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs postgres
```

**输出应该显示:**
```
✅ Container savvly-postgres  Started
```

### 步骤2: 验证连接

```bash
# 进入PostgreSQL容器
docker exec -it savvly-postgres psql -U savvly_user -d savvly_db

# 在psql中测试
\dt  # 列出表（初始为空）
\q   # 退出
```

### 步骤3: 设置环境变量

已为你创建 `.env.local`:
```env
DATABASE_URL="postgresql://savvly_user:savvly_dev_password@localhost:5432/savvly_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="dev-secret-change-in-production-use-openssl-rand-base64-32"
```

### 步骤4: 运行Prisma迁移

```bash
# 推送schema到数据库
npx prisma db push

# 生成Prisma客户端
npx prisma generate

# (可选) 打开Prisma Studio查看数据
npx prisma studio
```

### 步骤5: 启动开发服务器

```bash
npm run dev
```

访问: `http://localhost:3000`

---

## 🛠️ 常用Docker命令

### 管理数据库

```bash
# 启动数据库
docker-compose up -d

# 停止数据库
docker-compose down

# 停止并删除数据（⚠️ 危险）
docker-compose down -v

# 重启数据库
docker-compose restart

# 查看日志
docker-compose logs -f postgres
```

### 数据库操作

```bash
# 进入psql
docker exec -it savvly-postgres psql -U savvly_user -d savvly_db

# 备份数据库
docker exec savvly-postgres pg_dump -U savvly_user savvly_db > backup.sql

# 恢复数据库
cat backup.sql | docker exec -i savvly-postgres psql -U savvly_user -d savvly_db
```

### 重置开发数据

```bash
# 方法1: Prisma重置
npx prisma db push --force-reset

# 方法2: Docker完全重置
docker-compose down -v
docker-compose up -d
npx prisma db push
```

---

## 🐳 生产部署策略

### 选项1: 全Docker部署（推荐用于VPS）

#### 创建生产 docker-compose.yml

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_prod:/var/lib/postgresql/data
    networks:
      - savvly-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build:
      context: .
      dockerfile: Dockerfile
    restart: always
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
      NEXTAUTH_URL: ${NEXTAUTH_URL}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - savvly-network

volumes:
  postgres_prod:

networks:
  savvly-network:
    driver: bridge
```

#### 创建 Dockerfile

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### 部署步骤

```bash
# 1. 设置环境变量 (.env.production)
DB_USER=savvly_prod
DB_PASSWORD=strong_password_here
DB_NAME=savvly_prod
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate_with_openssl

# 2. 构建并启动
docker-compose -f docker-compose.prod.yml up -d --build

# 3. 运行数据库迁移
docker-compose -f docker-compose.prod.yml exec app npx prisma db push
```

---

### 选项2: 托管PostgreSQL + Vercel/Railway部署

#### 推荐云数据库服务

**1. Neon (推荐) - 免费tier**
- 🌐 https://neon.tech/
- ✅ 免费0.5GB存储
- ✅ 自动扩展
- ✅ Serverless PostgreSQL
- ✅ 分支功能（开发/生产隔离）

```bash
# 连接字符串示例
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/savvly?sslmode=require"
```

**2. Supabase - 免费tier**
- 🌐 https://supabase.com/
- ✅ 免费500MB数据库
- ✅ 内置认证（可选替代NextAuth）
- ✅ 实时订阅
- ✅ 免费API

```bash
# 连接字符串示例
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
```

**3. Railway - 免费$5/月额度**
- 🌐 https://railway.app/
- ✅ 一键部署
- ✅ 自动CI/CD
- ✅ 包含PostgreSQL

#### 使用托管数据库的步骤

```bash
# 1. 创建账户并获取连接字符串

# 2. 更新 .env.production
DATABASE_URL="你的托管数据库连接字符串"

# 3. 运行迁移（本地测试）
npx prisma db push

# 4. 部署到Vercel
vercel --prod

# 或部署到Railway
railway up
```

---

## 🔒 安全最佳实践

### 开发环境

```bash
# .env.local (本地开发)
✅ 使用弱密码（savvly_dev_password）
✅ 提交到 .gitignore
✅ 定期重置测试数据
```

### 生产环境

```bash
# .env.production (生产)
❌ 永不使用默认密码
✅ 使用强密码（至少32字符）
✅ 使用环境变量（不要硬编码）
✅ 启用SSL连接（sslmode=require）
✅ 定期备份

# 生成强密码
openssl rand -base64 32
```

### .gitignore 必须包含

```gitignore
# 环境变量
.env
.env.local
.env.production
.env.*.local

# Docker volumes
postgres_data/

# Prisma
prisma/*.db
prisma/*.db-journal
```

---

## 📊 数据库性能优化

### 开发环境

```yaml
# docker-compose.yml
services:
  postgres:
    environment:
      # 开发环境：降低内存使用
      POSTGRES_SHARED_BUFFERS: 128MB
      POSTGRES_WORK_MEM: 4MB
```

### 生产环境

```yaml
# docker-compose.prod.yml
services:
  postgres:
    environment:
      # 生产环境：优化性能
      POSTGRES_SHARED_BUFFERS: 256MB
      POSTGRES_WORK_MEM: 16MB
      POSTGRES_MAINTENANCE_WORK_MEM: 64MB
      POSTGRES_EFFECTIVE_CACHE_SIZE: 512MB
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
```

---

## 🧪 测试数据管理

### 创建测试种子数据

```bash
# 创建 prisma/seed.ts
```

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 创建测试用户
  const passwordHash = await bcrypt.hash('password123', 12);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash,
      name: '测试用户',
    },
  });

  // 创建测试设置
  await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      budgetMode: 'IRREGULAR_INCOME',
      taxRate: 0.28,
      currentSavings: 5000,
      monthlyExpenses: 2000,
    },
  });

  // 创建测试预算
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  await prisma.budget.create({
    data: {
      userId: user.id,
      category: '食品',
      amount: 400,
      spent: 250,
      month: currentMonth,
      year: currentYear,
      rolloverStrategy: 'FULL',
    },
  });

  console.log('✅ 测试数据创建成功');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

```bash
# package.json 添加
"scripts": {
  "db:seed": "tsx prisma/seed.ts"
}

# 运行种子
npm run db:seed
```

---

## 🚨 常见问题

### Q: Docker容器启动失败？

```bash
# 检查端口是否被占用
netstat -ano | findstr :5432

# 如果被占用，修改 docker-compose.yml
ports:
  - "5433:5432"  # 改用5433

# 同时更新 .env.local
DATABASE_URL="postgresql://savvly_user:savvly_dev_password@localhost:5433/savvly_db"
```

### Q: Prisma连接超时？

```bash
# 1. 检查Docker是否运行
docker-compose ps

# 2. 检查连接字符串是否正确
echo $DATABASE_URL

# 3. 测试连接
docker exec -it savvly-postgres psql -U savvly_user -d savvly_db
```

### Q: 生产环境迁移失败？

```bash
# 使用 Prisma Migrate（而非db push）
npx prisma migrate dev --name init
npx prisma migrate deploy  # 生产环境
```

---

## 📈 监控与日志

### 本地开发

```bash
# 实时查看数据库日志
docker-compose logs -f postgres

# 查看连接数
docker exec savvly-postgres psql -U savvly_user -d savvly_db -c "SELECT count(*) FROM pg_stat_activity;"
```

### 生产环境

推荐工具:
- **pgAdmin**: Web界面管理
- **DataDog**: 性能监控
- **Sentry**: 错误追踪

---

## 🎯 总结

### 开发流程

```bash
# 1. 启动数据库
docker-compose up -d

# 2. 推送schema
npx prisma db push

# 3. (可选) 添加测试数据
npm run db:seed

# 4. 启动开发服务器
npm run dev

# 5. 停止数据库（工作完成后）
docker-compose down
```

### 生产部署

```bash
# 选项A: Docker全栈
docker-compose -f docker-compose.prod.yml up -d --build

# 选项B: 托管数据库 + Vercel
# 1. 设置Neon/Supabase数据库
# 2. 配置环境变量
# 3. vercel --prod
```

---

**推荐方案**:
- 开发: Docker Compose (本地)
- 生产: Neon免费tier + Vercel/Railway

这样你可以:
- ✅ 本地快速测试
- ✅ 生产零运维
- ✅ 完全免费（初期）
- ✅ 轻松扩展

需要帮助设置吗？
