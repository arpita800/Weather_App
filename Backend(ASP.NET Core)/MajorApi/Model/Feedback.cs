using System;
using System.Collections.Generic;

namespace MajorApi.Model;

public partial class Feedback
{
    public int Id { get; set; }

    public string? Feedback1 { get; set; }

    public int? Rating { get; set; }

    public string? Email { get; set; }
}
