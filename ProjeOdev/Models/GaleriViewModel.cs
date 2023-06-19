using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjeOdev.Models
{
    public class GeleriGenelVideoViewModels
    {
        public int AvailableVideosPages { get; set; }
        public IPagedList<GaleriDto> GenelVideosList { get; set; }
    }
    public class GeleriGenelFotoViewModels
    {
        public int AvailableFotoesPages { get; set; }
        public IPagedList<GaleriDto> GenelImagesList { get; set; }
    }
}