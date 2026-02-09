# E-Citizen Health Cabin

> 🏥 Cabin Y tế Thông minh - Giải pháp y tế công cộng cho công dân số

## 📁 Cấu trúc dự án

```
e-citizen-health-cabin/
├── docs/                    # Tài liệu dự án
│   └── brd.md              # Business Requirements
├── ecab-backend/           # Backend .NET 8 Clean Architecture
│   ├── ECab.Domain/        # Entities, Value Objects
│   ├── ECab.Application/   # Use Cases, Interfaces
│   ├── ECab.Infrastructure/# Data Access, External Services
│   └── ECab.API/           # REST API Controllers
├── ecab-frontend/          # Frontend Next.js
│   └── src/
│       ├── app/            # App Router
│       ├── components/     # React Components
│       │   ├── ui/         # UI primitives
│       │   ├── layout/     # Layout components
│       │   └── cabin/      # Cabin-specific components
│       └── types/          # TypeScript types
└── deploy/                 # Deployment configs
```

## 🚀 Quick Start

### Frontend
```bash
cd ecab-frontend
npm install
npm run dev
```

### Backend
```bash
cd ecab-backend
dotnet restore
dotnet run --project ECab.API
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Backend | .NET 8, Clean Architecture |
| Database | PostgreSQL (planned) |

## 📄 License

Proprietary - GoTRUST
