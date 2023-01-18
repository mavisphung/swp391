using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Helper.GlobalErrorHanding;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;
using Backend.Service.Services;
using FirebaseAdmin;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// Add datasource sqlserver
builder.Services.AddDbContext<birdstoredatabaseContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("DataSource")
 ));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton(FirebaseApp.Create());

builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<UserService, UserService>();
builder.Services.AddTransient<AuthService, AuthService>();
builder.Services.AddTransient<BirdStoreConst, BirdStoreConst>();

var app = builder.Build();
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
