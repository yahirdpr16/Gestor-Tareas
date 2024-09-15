using Microsoft.EntityFrameworkCore;
using GestionTareasAPI.Models;

namespace GestionTareasAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Tarea> Tareas { get; set; }
    }
}
