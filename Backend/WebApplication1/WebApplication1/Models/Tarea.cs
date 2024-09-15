using System.ComponentModel.DataAnnotations;

namespace GestionTareasAPI.Models
{

    public class Tarea
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El título es obligatorio.")]
        [MaxLength(100, ErrorMessage = "El título no puede tener más de 100 caracteres.")]
        public required string Titulo { get; set; }

        [MaxLength(500, ErrorMessage = "La descripción no puede tener más de 500 caracteres.")]
        public required string Descripcion { get; set; }

        [Required(ErrorMessage = "El estado es obligatorio.")]
        [StringLength(20, ErrorMessage = "El estado no puede tener más de 20 caracteres.")]
        public required string Estado { get; set; }
    }
}