using Backend.Service.Entities;
using Backend.Service.Repositories;
using FirebaseAdmin;
using LOSMST.Business.Service;
using LOSMST.DataAccess.Repository.DatabaseRepository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// Add datasource sqlserver
builder.Services.AddDbContext<BirdStoreContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("DataSource")
 ));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton(FirebaseApp.Create());

builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<UserService, UserService>();
builder.Services.AddTransient<AuthService, AuthService>();

var app = builder.Build();

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
