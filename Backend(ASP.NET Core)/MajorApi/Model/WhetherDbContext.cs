using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MajorApi.Model;

public partial class WhetherDbContext : DbContext
{
    public WhetherDbContext()
    {
    }

    public WhetherDbContext(DbContextOptions<WhetherDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WeatherDataAnalysisView> WeatherDataAnalysisViews { get; set; }

    public virtual DbSet<WeatherDatum> WeatherData { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source= ARPITAS-PC\\SQLEXPRESS; Initial Catalog=WhetherDb; Integrated Security=True; TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Admin__3214EC0729FCD6F4");

            entity.ToTable("Admin");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Feedback__3213E83FE92404BA");

            entity.ToTable("Feedback");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Feedback1)
                .HasColumnType("text")
                .HasColumnName("feedback");
            entity.Property(e => e.Rating).HasColumnName("rating");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C301925C0");

            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Uid)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<WeatherDataAnalysisView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("WeatherDataAnalysisView");

            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Location).HasMaxLength(255);
            entity.Property(e => e.RecordedAt).HasColumnType("datetime");
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SunriseTime).HasColumnType("datetime");
            entity.Property(e => e.SunsetTime).HasColumnType("datetime");
        });

        modelBuilder.Entity<WeatherDatum>(entity =>
        {
            entity.HasKey(e => e.WeatherId).HasName("PK__WeatherD__0BF97BF5606E5481");

            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Humidity).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Temperature).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.WindSpeed).HasColumnType("decimal(5, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
