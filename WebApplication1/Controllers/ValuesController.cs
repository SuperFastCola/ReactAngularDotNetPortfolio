
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Text.Json;
using System.Web.Http.Cors;
using WebApplication1.Features.Projects;
using WebApplication1.Models;
using WebResponse = WebApplication1.Models.WebResponse;
using System.Net.NetworkInformation;

namespace WebApplication1.Controllers
{
    //[Authorize]
    //[EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController 
    {
        Projects projects = new Projects();

        // GET api/values
        [Route("api/values")]
        public AllProjectsModel Get()
        {
            return projects.GetAll();
        }

        // GET api/values/5
        public ProjectViewModel Get(int id)
        {
            return projects.GetProject(id);
        }

        [HttpPut]
        public ProjectViewModel Put(int id, ProjectViewModel projectToUpdate)
        {
            return projects.UpdateProject(projectToUpdate);
        }

        [HttpDelete]
        [Route("api/deleteproject/{id}")]
        public async Task<HttpResponseMessage> DeleteProject(int id)
        {
            bool deleted = projects.DeleteProject(id);

            if (deleted)
            {
                var responseObject = new WebResponse { Message = $"Project {id} has been deleted", Status = "200" };
                return await Task.FromResult(Request.CreateResponse(HttpStatusCode.OK, responseObject));
            }
            return await Task.FromResult(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, new Exception("No project found at: " + id)));

        }

        [HttpDelete]
        [Route("api/imagedelete")]
        public async Task<HttpResponseMessage> DeleteImage(DeleteImage Image)
        {

            try
            {
               string rawName = Image.ImageName;
               var cleanedFileName = rawName.Trim('\"');
               string localFileName = Path.Combine(HttpContext.Current.Server.MapPath("~/App_Data/"), cleanedFileName);
               string fileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"React-Frontend\public\images\", cleanedFileName);
               string pubicFileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"React-Frontend\public\images\", cleanedFileName);

                if (File.Exists(fileName))
                {
                    File.Delete(fileName);

                    if (File.Exists(pubicFileName)){
                        File.Delete(pubicFileName);
                    }

                    var responseObject = new WebResponse{Message=$"{cleanedFileName} has been deleted",Status="200"};
                    return await Task.FromResult(Request.CreateResponse(HttpStatusCode.OK,responseObject));
                }
                return await Task.FromResult(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, new Exception("No file at: " + cleanedFileName)));
            }
            catch (System.Exception e)
            {
                return await Task.FromResult(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e));
            }

        }
        
        [HttpPost]
        [Route("api/upload")]
        public async Task<HttpResponseMessage> PostFormData()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                //throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, new Exception("File data is not multipart"));
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);

            try
            {
                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);

                var renamedFile = provider.FileData.First();
                var cleanedFileName = renamedFile.Headers.ContentDisposition.FileName.Trim('\"');
                string directoryPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"React-Frontend\public\images\");
                string publicDirectoryPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"dld_react\public\images\");

                //create editing file for private use
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                string fileNameWithPath = Path.Combine(directoryPath, cleanedFileName);

                if (File.Exists(fileNameWithPath)){
                    File.Delete(fileNameWithPath); // Delete the existing file if exists
                }
                File.Copy(renamedFile.LocalFileName, fileNameWithPath);

                //create public file
                if (!Directory.Exists(publicDirectoryPath))
                {
                    Directory.CreateDirectory(publicDirectoryPath);
                }

                string publicFileNameWithPath = Path.Combine(publicDirectoryPath, cleanedFileName);
                if (File.Exists(publicFileNameWithPath))
                {
                    File.Delete(publicFileNameWithPath); // Delete the existing file if exists
                }
                File.Move(renamedFile.LocalFileName, publicFileNameWithPath);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e.ToString());
            }
        }


    }
}
