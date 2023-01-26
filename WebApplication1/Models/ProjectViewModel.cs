using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    
    public class UrlViewModel
    {
        [JsonProperty("en")]
        public List<UrlSubViewModel> en { get; set; }
        [JsonProperty("fr")]
        public List<UrlSubViewModel> fr { get; set; }
    }

    public class UrlSubViewModel
    {
        [JsonProperty("link")]
        public string Link { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }
    }

    public class ImageViewModel
    {
        [JsonProperty("en")]
        public List<ImageSubViewModel> en { get; set; }
        [JsonProperty("fr")]
        public List<ImageSubViewModel> fr { get; set; }
    }

    public class ImageSubViewModel
    {
        [JsonProperty("order")]
        public int Order { get; set; }
        [JsonProperty("s")]
        public string S { get; set; }

        [JsonProperty("m")]
        public string M { get; set; }

        [JsonProperty("l")]
        public string L { get; set; }

        [JsonProperty("xl")]
        public string Xl { get; set; }
    }

    public class ProjectTypes
    {
        [JsonProperty("type")]
        public string type { get; set; }
        [JsonProperty("en")]
        public string en { get; set; }
        [JsonProperty("fr")]
        public string fr { get; set; }

    }

    public class ContentSubType:UrlSubViewModel
    {
        [JsonProperty("cssClass")]
        public string cssClass { get; set; }
    }

    public class ContentTypes
    {
        [JsonProperty("en")]
        public List<ContentSubType> en { get; set; }
        [JsonProperty("fr")]
        public List<ContentSubType> fr { get; set; }
    }


    public class BaseLanguageType
    {
        [JsonProperty("en")]
        public string en { get; set; }
        [JsonProperty("fr")]
        public string fr { get; set; }
    }

    public class BaseLanguageArrayType
    {
        [JsonProperty("en")]
        public string[] en { get; set; }
        [JsonProperty("fr")]
        public string[] fr { get; set; }
    }

    public class SpriteTypes
    {
        [JsonProperty("yCoor")]
        public float[] yCoor { get; set; }
        [JsonProperty("xCoor")]
        public List<float[]> xCoor { get; set; }
        [JsonProperty("parent_element")]
        public string parent_element { get; set; }
        [JsonProperty("dimensions")]
        public int[] dimensions { get; set; }
        [JsonProperty("position")]
        public int[] position { get; set; }
        [JsonProperty("sprite_type")]
        public string sprite_type { get; set; }
        [JsonProperty("restart")]
        public Boolean restart { get; set; }
        [JsonProperty("walk_speed")]
        public string walk_speed { get; set; }
        [JsonProperty("sprite_id")]
        public string sprite_id { get; set; }
    }

    public class AllProjectsModel
    {
        
        [JsonProperty("types")]
        public List<ProjectTypes> Types { get; set; }
        
        [JsonProperty("contents")]
        public ContentTypes Contents { get; set; }
        [JsonProperty("labels")]
        public Dictionary<string,BaseLanguageType> Labels { get; set; }
        [JsonProperty("sprites")]
        public List<SpriteTypes> Sprites { get; set; }
        [JsonProperty("projects")]
        public List<ProjectViewModel> Projects { get; set; }
        
    }

    public class WebResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }
}

    public class ProjectViewModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        public BaseLanguageType Name { get; set; }
        [JsonProperty("description")]
        public BaseLanguageType Description { get; set; }
        [JsonProperty("role")]
        public BaseLanguageType Role { get; set; }
        [JsonProperty("tech")]
        public BaseLanguageArrayType Tech { get; set; }
        [JsonProperty("image")]
        public ImageViewModel Image { get; set; }
        [JsonProperty("url")]
        public UrlViewModel Url { get; set; }
        [JsonProperty("projid")]
        public string Projid { get; set; }
        [JsonProperty("type")]
        public List<string> Type { get; set; }
    }

    public class DeleteImage{
        public string ImageName { get; set; }
    }
}