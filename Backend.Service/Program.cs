using System.Net.Mime;
using System.Reflection;
using Backend.Service.Consts;
using Backend.Service.Entities;
using Backend.Service.Examples;
using Backend.Service.Extensions;
using Backend.Service.Helper.Authentication;
using Backend.Service.Helper.GlobalErrorHanding;
using Backend.Service.Models.Email;
using Backend.Service.Models.Validation;
using Backend.Service.Repositories;
using Backend.Service.Repositories.IRepositories;
using Backend.Service.Services;
using Firebase.Auth;
using FirebaseAdmin;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add CORS
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("*")
                                .AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader()
                                .WithExposedHeaders("X-Pagination");
                      });
});

// Add swagger example filter
builder.Services.AddSwaggerExamplesFromAssemblyOf<ProductExample>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<UpdateProductExample>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CreateBannerExample>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<CreateAccountExample>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<LoginExample>();
builder.Services.AddSwaggerExamplesFromAssemblyOf<UpdateCategoryExample>();

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
            Name = "Huy Ph�ng",
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

    // Add swagger authentication
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
        }
    });
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
    opt.EnableSensitiveDataLogging();
});

//--------------------------------------------------------------
builder.Services.AddEndpointsApiExplorer();

// Add repositories
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
builder.Services.AddTransient<IProductRepository, ProductRepository>();
builder.Services.AddTransient<IBannerRepository, BannerRepository>();
builder.Services.AddTransient<IOrderRepository, OrderRepository>();
builder.Services.AddTransient<ICartRepository, CartRepository>();
builder.Services.AddTransient<ICartItemRepository, CartItemRepository>();
builder.Services.AddTransient<IShippingAddressRepository, ShippingAddressRepository>();
builder.Services.AddTransient<IPaymentRepository, PaymentRepository>();
builder.Services.AddTransient<IFeedbackRepository, FeedbackRepository>();

// Add services
builder.Services.AddTransient<UserService, UserService>();
builder.Services.AddTransient<AuthService, AuthService>();
builder.Services.AddTransient<CategoryService, CategoryService>();
builder.Services.AddTransient<ProductService, ProductService>();
builder.Services.AddTransient<BannerService, BannerService>();
builder.Services.AddTransient<OrderService, OrderService>();
builder.Services.AddTransient<CartService, CartService>();
builder.Services.AddTransient<BirdStoreConst, BirdStoreConst>();
builder.Services.AddTransient<VNPayConst, VNPayConst>();
builder.Services.AddTransient<PaymentService, PaymentService>();
builder.Services.AddScoped<PasswordHasher, PasswordHasher>();
builder.Services.AddTransient<FeedbackService, FeedbackService>();
builder.Services.AddTransient<StatisticService, StatisticService>();
builder.Services.AddTransient<EmailService, EmailService>();


// Add Exception handler
builder.Services.AddTransient<ExceptionHandler, ExceptionHandler>();

// Add Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Add authentication schema
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddScheme<AuthenticationSchemeOptions, AppAuthenticationHandler>(JwtBearerDefaults.AuthenticationScheme, (opt) => { });

var app = builder.Build();
// Add Cors
app.UseCors(MyAllowSpecificOrigins);

// Add Global exception handler
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
