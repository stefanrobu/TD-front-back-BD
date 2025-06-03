﻿using System.ComponentModel.DataAnnotations;

namespace CasinoAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public decimal Sold { get; set; }
    }
}
