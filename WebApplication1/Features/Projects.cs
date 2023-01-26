using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using WebApplication1.Models;

namespace WebApplication1.Features.Projects
{
    public class Projects
    {

        private TextEncoderSettings EncoderSettings;
        private JsonSerializerOptions JSONOptions;
        private JsonSerializerOptions JSONOptionsPublic;
        private string JsonFileName = "projects.json";

        public Projects()
        {
            EncoderSettings = new TextEncoderSettings();
            EncoderSettings.AllowRange(UnicodeRanges.BasicLatin);

            JSONOptions = new JsonSerializerOptions
            {
                Encoder = JavaScriptEncoder.Create(EncoderSettings),
                PropertyNameCaseInsensitive = true,
                WriteIndented = true
            };

            JSONOptionsPublic = new JsonSerializerOptions
            {
                Encoder = JavaScriptEncoder.Create(EncoderSettings),
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                PropertyNameCaseInsensitive = true,
                WriteIndented = true
            };
        }

        public AllProjectsModel GetAll()
        {

            return GetData(JsonFileName);
        }

        public AllProjectsModel GetAll(string inputFileName)
        {
            return GetData(inputFileName);
        }

        public AllProjectsModel GetData(string inputFileName)
        {
            string jsonString = loadDataFromFile(inputFileName ?? JsonFileName);
            return JsonSerializer.Deserialize<AllProjectsModel>(jsonString, JSONOptions);
        }

        private string loadDataFromFile(String rootFileName)
        {
            string fileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Content\", rootFileName);
            bool fileExists = File.Exists(fileName);
            if (fileExists)
            {
                return File.ReadAllText(fileName);
            }
            return null;
        }

        private void writeDatatoFile(String dataToWrite)
        {
            string fileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Content\", JsonFileName);
            string publicFileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"dld_react\public\", JsonFileName);
            bool fileExists = File.Exists(fileName);
            bool publicFileExists = File.Exists(publicFileName);

            if (fileExists && publicFileExists)
            {
                File.WriteAllText(fileName, dataToWrite);
                File.WriteAllText(publicFileName, dataToWrite);
            }
            return;
        }

        private void writeDatatoAllFiles(AllProjectsModel all)
        {
            string fileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Content\", JsonFileName);
            string publicFileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"dld_react\public\", JsonFileName);
            bool fileExists = File.Exists(fileName);
            bool publicFileExists = File.Exists(publicFileName);

            if (fileExists && publicFileExists)
            {
                File.WriteAllText(fileName, JsonSerializer.Serialize(all, JSONOptions));
                File.WriteAllText(publicFileName, JsonSerializer.Serialize(all, JSONOptionsPublic));
            }
            return;
        }


        public ProjectViewModel GetProject(int ID)
        {
            AllProjectsModel projects = GetData(null);
            return projects.Projects.Where(p => p.Id == ID).FirstOrDefault() ?? null;
        }

        public ProjectViewModel UpdateProject(ProjectViewModel ProjectToUpdate)
        {
            AllProjectsModel all = GetData(null);
            ProjectViewModel project = all.Projects.Where(p => p.Id == ProjectToUpdate.Id).FirstOrDefault();

            //get all properties within the model
            PropertyInfo[] myPropertyInfo = ProjectToUpdate.GetType().GetProperties();

            if (project != null)
            {
                //iterate over properties
                for (int i = 0; i < myPropertyInfo.Length; i++)
                {
                    //get current key
                    string currentKey = myPropertyInfo[i].Name.ToString();

                    //get values from submitted object
                    var prop = ProjectToUpdate.GetType().GetProperty(currentKey).GetValue(ProjectToUpdate);

                    //if value is set
                    if (prop != null)
                    {
                        project.GetType().GetProperty(currentKey).SetValue(project, prop);
                    }
                }

                int index = all.Projects.FindIndex(p => p.Id == project.Id);
                if (index >= 0)
                {
                    all.Projects[index] = project;
                    writeDatatoAllFiles(all);
                    return project;
                }
            }
            else
            {
                all.Projects.Add(ProjectToUpdate);
                writeDatatoAllFiles(all);
                return ProjectToUpdate;
            }

            return null;
        }

        public Boolean DeleteProject(int id)
        {
            bool projectDeleted = false;
            AllProjectsModel all = GetData(null);
            ProjectViewModel project = all.Projects.Where(p => p.Id == id).FirstOrDefault();

            if (project != null)
            {
                projectDeleted = all.Projects.Remove(project);
                writeDatatoAllFiles(all);
            }

            return projectDeleted;
        }
    }
}