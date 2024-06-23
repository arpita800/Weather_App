using System;
using System.Collections.Generic;

namespace MajorApi.Model;

public partial class WeatherDataAnalysisView
{
    public int WeatherId { get; set; }

    public string? Location { get; set; }

    public double? Temperature { get; set; }

    public double? Humidity { get; set; }

    public double? WindSpeed { get; set; }

    public DateTime? RecordedAt { get; set; }

    public DateTime? SunriseTime { get; set; }

    public DateTime? SunsetTime { get; set; }

    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string Role { get; set; } = null!;
}
