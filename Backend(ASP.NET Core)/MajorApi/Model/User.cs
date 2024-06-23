using System;
using System.Collections.Generic;

namespace MajorApi.Model;

public partial class User
{
    public int UserId { get; set; }

    public string Uid { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;
}
