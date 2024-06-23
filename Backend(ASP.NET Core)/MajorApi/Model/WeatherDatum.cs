using System;
using System.Collections.Generic;

namespace MajorApi.Model;

public partial class WeatherDatum
{
    public int WeatherId { get; set; }

    public string? Email { get; set; }

    public string? Location { get; set; }

    public decimal? Temperature { get; set; }

    public decimal? Humidity { get; set; }

    public decimal? WindSpeed { get; set; }
}
