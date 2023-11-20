using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using OfficeOpenXml;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApkioskContext _context;

        public TasksController(ApkioskContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTask()
        {
            if (_context.Task == null)
            {
                return NotFound();
            }
            return await _context.Task.Include(x => x.User).ToListAsync();
        }

        // Excel
        [HttpGet("Excel")]
        public async Task<ActionResult> ExcelTask(string? search, byte? status, int? userId)
        {
            // Get tasks
            List<Models.Task> tasks = await _context.Task
                .Include(x => x.User)
                .Where(t => (search == null || t.Label.Contains(search)) &&
                            (status == null || t.Status == status) &&
                            (userId == null || t.UserId == userId))
                .OrderBy(t => t.Label)
                .ToListAsync();


            // Create excel file
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage();

            // Sheet
            ExcelWorksheet sheet = package.Workbook.Worksheets.Add("tasks");

            // Headers
            sheet.Cells[1, 1].Value = "Libellé de la tâche";
            sheet.Cells[1, 2].Value = "Attribution";
            sheet.Cells[1, 3].Value = "Status";

            // Complete sheet
            int recordIndex = 2;
            foreach (Models.Task task in tasks)
            {
                sheet.Cells[recordIndex, 1].Value = task.Label;
                sheet.Cells[recordIndex, 2].Value = task.User == null ? $"{task.User?.Lastname} {task.User?.Firstname}" : "null";
                sheet.Cells[recordIndex, 3].Value = GetStatusText(task.Status);
                recordIndex++;
            }

            // Autofit
            sheet.Column(1).AutoFit();
            sheet.Column(2).AutoFit();
            sheet.Column(3).AutoFit();

            package.SaveAs("Exports/tasks.xlsx");
            string filePath = package.File.FullName;
            string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            return PhysicalFile(filePath, contentType, package.File.Name);
        }

        private static string GetStatusText(byte status) => status switch
        {
            0 => "En cours",
            1 => "Bloqué",
            _ => "Terminé"
        };

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Models.Task>> PutTask(int id, Models.TaskEdit taskEdit)
        {
            if (id != taskEdit.Id)
            {
                return BadRequest();
            }

            if (_context.User == null)
            {
                return Problem("Entity set 'ApkioskContext.User'  is null.");
            }


            // Get user from taskEdit.UserId
            User? user = await _context.User.FindAsync(taskEdit.UserId);

            // Set default values
            taskEdit.Label = taskEdit.Label == null || taskEdit.Label.Equals(string.Empty) ? "0" : taskEdit.Label;
            taskEdit.Status ??= 0;

            // Create the task
            Models.Task task = new()
            {
                Id = taskEdit.Id,
                Label = taskEdit.Label,
                Status = (byte)taskEdit.Status,
                CompletedDate = taskEdit.Status == 2 ? DateTime.Today : null,
                UserId = user?.Id,
                User = user,
            };


            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Created("GetTask", task);
        }

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Models.Task>> PostTask(Models.TaskEdit taskEdit)
        {
            if (_context.Task == null)
            {
                return Problem("Entity set 'ApkioskContext.Task'  is null.");
            }

            if (_context.User == null)
            {
                return Problem("Entity set 'ApkioskContext.User'  is null.");
            }

            // Get user from taskEdit.UserId
            User? user = await _context.User.FindAsync(taskEdit.UserId);

            // Set default values
            taskEdit.Label = taskEdit.Label == null || taskEdit.Label.Equals(string.Empty) ? "0" : taskEdit.Label;
            taskEdit.Status ??= 0;

            // Create the task
            Models.Task task = new()
            {
                Id = taskEdit.Id,
                Label = taskEdit.Label,
                Status = (byte)taskEdit.Status,
                CompletedDate = taskEdit.Status == 2 ? DateTime.Today : null,
                UserId = user?.Id,
                User = user,
            };

            _context.Task.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }


        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            if (_context.Task == null)
            {
                return NotFound();
            }
            var task = await _context.Task.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Task.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return (_context.Task?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
