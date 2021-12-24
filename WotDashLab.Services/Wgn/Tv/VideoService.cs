using System;
using System.Threading;
using System.Threading.Tasks;
using WotDashLab.Wot.Client.Contracts;
using WotDashLab.Wot.Client.Contracts.Wgn.WgTv;

namespace WotDashLab.Services.Wgn.Tv
{
    internal class VideoService : IVideoService
    {
        private readonly IWgRequestBuilderFactory _wgRequestBuilderFactory;
        private readonly IWgClientBase _wgClient;
        private const ApiType ApiType = Wot.Client.Contracts.ApiType.Wgn;

        public VideoService(IWgRequestBuilderFactory wgRequestBuilderFactory, IWgClientBase wgClient)
        {
            _wgRequestBuilderFactory = wgRequestBuilderFactory;
            _wgClient = wgClient;
        }

        public async Task<WotResponseBase<WgTvVideoInfo[], WotResponsePagedMetadata>> Search(VideoSearchRequest model, string region, CancellationToken token)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            var requestBuilder = _wgRequestBuilderFactory.CreateRequestBuilder();
            requestBuilder.Fields = string.Join(",", model.Fields ?? Array.Empty<string>());
            requestBuilder.Language = model.Language;

            if (model.Important.HasValue)
            {
                requestBuilder.Add("important", model.Important.Value ? "1" : "0");
            }

            if (model.Limit.HasValue)
            {
                requestBuilder.Add(WellKnownFieldNames.Limit, model.Limit.Value.ToString());
            }

            if (model.PageNo.HasValue)
            {
                requestBuilder.Add("page_no", model.PageNo.Value.ToString());
            }

            if (!string.IsNullOrWhiteSpace(model.Query))
            {
                requestBuilder.Add("q", model.Query);
            }

            if (model.ProjectIds is not null && model.ProjectIds.Length > 0)
            {
                requestBuilder.Add("project_id", model.ProjectIds.ToCommaSeparatedList());
            }

            if (model.ProgramIds is not null && model.ProgramIds.Length > 0)
            {
                requestBuilder.Add("program_id", model.ProgramIds.ToCommaSeparatedList());
            }

            if (model.VehicleIds is not null && model.VehicleIds.Length > 0)
            {
                requestBuilder.Add("vehicle_id", model.VehicleIds.ToCommaSeparatedList());
            }

            if (model.VideoIds is not null && model.VideoIds.Length > 0)
            {
                requestBuilder.Add("video_id", model.VideoIds.ToCommaSeparatedList());
            }

            if (model.DateFrom.HasValue)
            {
                requestBuilder.Add("date_from", model.DateFrom.ToString());
            }

            var payload = requestBuilder.Build();
            const string url = "wgtv/videos";

            var result = await _wgClient.FetchData<WgTvVideoInfo[], WotResponsePagedMetadata>(ApiType, region, url, payload, token);
            return result;
        }
    }
}