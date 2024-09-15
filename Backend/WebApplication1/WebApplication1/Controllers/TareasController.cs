using Microsoft.AspNetCore.Mvc;
using GestionTareasAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using GestionTareasAPI.Data;


namespace GestionTareasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        public TareasController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetTareas()
        {
            var tareas = _context.Tareas.ToList();
            return Ok(tareas);
        }

        [HttpGet("{id}")]
        public IActionResult GetTarea(int id)
        {
            var tarea = _context.Tareas.Find(id);
            if (tarea == null)
                return NotFound(new { Message = "Tarea no encontrada" });

            return Ok(tarea);
        }

        [HttpPost]
        public IActionResult CrearTarea([FromBody] Tarea nuevaTarea)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors);
                // Log the errors or return detailed information
                return BadRequest(errors);
            }

            try
            {
                _context.Tareas.Add(nuevaTarea);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetTarea), new { id = nuevaTarea.Id }, nuevaTarea);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut("{id}")]
        public IActionResult ActualizarTarea(int id, [FromBody] Tarea tareaActualizada)
        {
            var tareaExistente = _context.Tareas.Find(id);
            if (tareaExistente == null)
                return NotFound(new { Message = "Tarea no encontrada" });

            tareaExistente.Titulo = tareaActualizada.Titulo;
            tareaExistente.Descripcion = tareaActualizada.Descripcion;
            tareaExistente.Estado = tareaActualizada.Estado;

            _context.SaveChanges();

            return Ok(tareaActualizada);
        }

        [HttpDelete("{id}")]
        public IActionResult EliminarTarea(int id)
        {
            var tarea = _context.Tareas.Find(id);
            if (tarea == null)
                return NotFound(new { Message = "Tarea no encontrada" });

            _context.Tareas.Remove(tarea);
            _context.SaveChanges();

            return Ok(new { Message = "Tarea eliminada exitosamente." });
        }

        [HttpGet("connection-info")]
        public IActionResult GetConnectionInfo()
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            return Ok(new { ConnectionString = connectionString, Message = "La conexión se realizó correctamente." });
        }
    }
}
