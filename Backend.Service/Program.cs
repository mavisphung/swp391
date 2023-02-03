using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Extensions;
using Backend.Service.Helper.GlobalErrorHanding;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;
using Backend.Service.Services;
using FirebaseAdmin;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    //Add more serialization config
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.IncludeFields = true;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// Add datasource sqlserver
//builder.Services.AddDbContext<birdstoredatabaseContext>(options => options.UseSqlServer(
//    builder.Configuration.GetConnectionString("DataSource")
// ));

// Postgres Configuration
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DataSource"));
});

//--------------------------------------------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton(FirebaseApp.Create());

// Add repositories
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();

// Add services
builder.Services.AddTransient<UserService, UserService>();
builder.Services.AddTransient<AuthService, AuthService>();
builder.Services.AddTransient<CategoryService, CategoryService>();
builder.Services.AddTransient<BirdStoreConst, BirdStoreConst>();
builder.Services.AddScoped<PasswordHasher, PasswordHasher>();

// Add Exception handler
builder.Services.AddTransient<ExceptionHandler, ExceptionHandler>();

// Add Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

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
