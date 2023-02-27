using System.Net.Mime;
using System.Reflection;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Examples;
using Backend.Service.Extensions;
using Backend.Service.Helper.GlobalErrorHanding;
using Backend.Service.Models.Validation;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;
using Backend.Service.Services;
using FirebaseAdmin;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add swagger example filter
builder.Services.AddSwaggerExamplesFromAssemblyOf<ProductExample>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<UpdateProductExample>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CreateBannerExample>();
// Add services to the container.
// Must enable XML comment to generate exactly what we want
// Right click to the project (Not solution) -> Project Properties
// Choose Build tab
// Add "1591" to [Errors and Warnings subtab]/suppress specific warnings
// Check "Generate a file containing API documentation" and leave the path blank to use default path
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "ChyStore API",
        Description = "An ASP.NET Core Web API for product management and e-commerce",
        TermsOfService = new Uri("https://example.com/terms"),
        Contact = new OpenApiContact
        {
            Name = "Huy Phùng",
            Url = new Uri("https://example.com/contact")
        },
        License = new OpenApiLicense
        {
            Name = "MIT",
            Url = new Uri("https://example.com/license")
        }
    });
    // Configuration for xml documentation
    // Set the comments path for the Swagger JSON and UI.
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);

    // Add swagger example filter
    options.ExampleFilters();
});

builder.Services.AddControllers()
    //Add more serialization config
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.IncludeFields = true;
    })
    // Configure custome validation
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var result = new ValidationFailedResult(context.ModelState);

            // TODO: add `using System.Net.Mime;` to resolve MediaTypeNames  
            result.ContentTypes.Add(MediaTypeNames.Application.Json);

            return result;
        };
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
builder.Services.AddSingleton(FirebaseApp.Create());

// Add repositories
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
builder.Services.AddTransient<IProductRepository, ProductRepository>();
builder.Services.AddTransient<IBannerRepository, BannerRepository>();
builder.Services.AddTransient<IPaymentRepository, PaymentRepository>();

// Add services
builder.Services.AddTransient<UserService, UserService>();
builder.Services.AddTransient<AuthService, AuthService>();
builder.Services.AddTransient<CategoryService, CategoryService>();
builder.Services.AddTransient<ProductService, ProductService>();
builder.Services.AddTransient<BannerService, BannerService>();
builder.Services.AddTransient<BirdStoreConst, BirdStoreConst>();
builder.Services.AddTransient<VNPayConst, VNPayConst>();
builder.Services.AddTransient<PaymentService, PaymentService>();
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
