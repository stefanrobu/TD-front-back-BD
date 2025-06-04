using CasinoAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ✅ Adăugăm serviciile
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Connection string din appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ JWT Authentication config
var key = Encoding.ASCII.GetBytes(builder.Configuration["Token"]);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// ✅ CORS policy — acceptă orice localhost:* port
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllLocalhost",
        policy =>
        {
            policy
                .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

var app = builder.Build();

// ✅ Middleware pipeline
app.UseSwagger();
app.UseSwaggerUI();

// ✅ CORS — înainte de autentificare
app.UseCors("AllowAllLocalhost");

// ✅ Autentificare & autorizare
app.UseAuthentication();
app.UseAuthorization();

// ✅ Mapare controllere
app.MapControllers();

// ✅ Rulează aplicația
app.Run();
