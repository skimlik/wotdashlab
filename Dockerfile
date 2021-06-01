#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
RUN mkdir app
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY WotDashLab.App/WotDashLab.App.csproj /app/WotDashLab.App/
COPY WotDashLab.Wot.Client.Contracts/WotDashLab.Wot.Client.Contracts.csproj /app/WotDashLab.Wot.Client.Contracts/
COPY WotDashLab.Wot.Client/WotDashLab.Wot.Client.csproj /app/WotDashLab.Wot.Client/
COPY WotDashLab.WebApi.Contracts/WotDashLab.WebApi.Contracts.csproj /app/WotDashLab.WebApi.Contracts/
COPY WotDashLab.Services/WotDashLab.Services.csproj /app/WotDashLab.Services/
COPY WotDashLab.Abstractions/WotDashLab.Abstractions.csproj /app/WotDashLab.Abstractions/

RUN dotnet restore "/app/WotDashLab.App/WotDashLab.App.csproj"
COPY . .
WORKDIR /src/WotDashLab.App
RUN dotnet build "WotDashLab.App.csproj" -c Debug -o /app/build

FROM build AS publish
RUN dotnet publish "WotDashLab.App.csproj" -c Debug -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "WotDashLab.App.dll"]