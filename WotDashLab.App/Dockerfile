#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["WotDashLab.App/WotDashLab.App.csproj", "WotDashLab.App/"]
COPY ["WotDashLab.Wot.Client.Contracts/WotDashLab.Wot.Client.Contracts.csproj", "WotDashLab.Wot.Client.Contracts/"]
COPY ["WotDashLab.Wot.Client/WotDashLab.Wot.Client.csproj", "WotDashLab.Wot.Client/"]
COPY ["WotDashLab.WebApi.Contracts/WotDashLab.WebApi.Contracts.csproj", "WotDashLab.WebApi.Contracts/"]
COPY ["WotDashLab.Services/WotDashLab.Services.csproj", "WotDashLab.Services/"]
COPY ["WotDashLab.Abstractions/WotDashLab.Abstractions.csproj", "WotDashLab.Abstractions/"]
RUN dotnet restore "WotDashLab.App/WotDashLab.App.csproj"
COPY . .
WORKDIR "/src/WotDashLab.App"
RUN dotnet build "WotDashLab.App.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WotDashLab.App.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "WotDashLab.App.dll"]