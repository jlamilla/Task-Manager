# Usar la imagen oficial de .NET SDK para compilar y ejecutar la aplicación
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["TaskManagementAPI/TaskManagementAPI.csproj", "./"]
RUN dotnet restore "./TaskManagementAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "TaskManagementAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TaskManagementAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaskManagementAPI.dll"]
