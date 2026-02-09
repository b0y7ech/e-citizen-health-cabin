# E-Citizen Health Cabin Scaffolding Script
# Run this in PowerShell to set up the project structure.

# 1. Create Root Directories
Write-Host "Creating root directories..."
New-Item -ItemType Directory -Force -Path "docs"
New-Item -ItemType Directory -Force -Path "ecab-backend"
New-Item -ItemType Directory -Force -Path "ecab-frontend"
New-Item -ItemType Directory -Force -Path "deploy"

# 2. Setup Backend (.NET 8 Clean Architecture)
Push-Location "ecab-backend"
Write-Host "Setting up Backend Solution..."

# Create Solution
dotnet new sln -n ECab

# Create Projects
Write-Host "Creating projects..."
dotnet new classlib -n ECab.Domain
dotnet new classlib -n ECab.Application
dotnet new classlib -n ECab.Infrastructure
dotnet new webapi -n ECab.API -o ECab.API

# Add References
Write-Host "Adding references..."
# Application depends on Domain
dotnet add ECab.Application/ECab.Application.csproj reference ECab.Domain/ECab.Domain.csproj

# Infrastructure depends on Application (and implicitly Domain)
dotnet add ECab.Infrastructure/ECab.Infrastructure.csproj reference ECab.Application/ECab.Application.csproj

# API depends on Application and Infrastructure
dotnet add ECab.API/ECab.API.csproj reference ECab.Application/ECab.Application.csproj
dotnet add ECab.API/ECab.API.csproj reference ECab.Infrastructure/ECab.Infrastructure.csproj

# Add to Solution
Write-Host "Adding projects to solution..."
dotnet sln add ECab.Domain/ECab.Domain.csproj
dotnet sln add ECab.Application/ECab.Application.csproj
dotnet sln add ECab.Infrastructure/ECab.Infrastructure.csproj
dotnet sln add ECab.API/ECab.API.csproj

Pop-Location

# 3. Create Placeholder Files
New-Item -ItemType File -Force -Path "docs/brd.md" -Value "# E-Citizen Health Cabin BRD"

Write-Host "Backend Scaffolding Complete!"
