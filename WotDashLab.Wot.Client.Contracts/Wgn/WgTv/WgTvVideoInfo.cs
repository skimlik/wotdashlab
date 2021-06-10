using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.Wgn.WgTv
{
    public class VideoThumbnail
    {
        [JsonPropertyName("height")]
        public int Height { get; set; }

        [JsonPropertyName("width")]
        public int Width { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }
    }

    public class VideoThumbnails
    {
        [JsonPropertyName("default")]
        public VideoThumbnail Default { get; set; }

        [JsonPropertyName("high")]
        public VideoThumbnail High { get; set; }
        
        [JsonPropertyName("medium")]
        public VideoThumbnail Medium { get; set; }
        
        [JsonPropertyName("maxres")]
        public VideoThumbnail MaxResolution { get; set; }
        
        [JsonPropertyName("standard")]
        public VideoThumbnail Standard { get; set; }
        
    }
    
    public class WgTvVideoInfo
    {
        [JsonPropertyName("category_id")]
        public int[] CategoryIds { get; set; }
        
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("important")]
        public bool Important { get; set; }

        [JsonPropertyName("video_url")]
        public string VideoUrl { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("ext_title")]
        public string ExtTitle { get; set; }

        [JsonPropertyName("duration")]
        public int? Duration { get; set; }

        [JsonPropertyName("video_id")]
        public string VideoId { get; set; }

        [JsonPropertyName("program_id")]
        public int? ProgramId { get; set; }

        [JsonPropertyName("project_id")]
        public int[] ProjectIds { get; set; }

        [JsonPropertyName("published_at")]
        public int PublishedAt { get; set; }

        [JsonPropertyName("vehicles")]
        public int[] Vehicles { get; set; }

        [JsonPropertyName("thumbnails")]
        public VideoThumbnails Thumbnails { get; set; }
    }
}