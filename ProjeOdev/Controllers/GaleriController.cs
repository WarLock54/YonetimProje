using PagedList;
using ProjeOdev.Models;
using ProjeOdev.Yonetim;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjeOdev.Controllers
{
    public class GaleriController : Controller
    {
        // GET: Galeri
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult getGaleriFoto()
        {
            var list = GaleriManager.getGaleriFoto();
            return View(list);
        }
        public ActionResult getGaleriVideo()
        {
            var list = GaleriManager.getGaleriVideo();
            return View(list);
        }
        public ActionResult VideoOlustur()
        {
            ViewBag.turs = new SelectList(GaleriManager.GetGaleriTurs().ToList(), "Id", "Ad");
            ViewBag.isNew = true;
            return View();
        }
        //tekrardan kontrol et

        [HttpPost]
        public ActionResult VideoOlustur(Galeri galeri, List<HttpPostedFileBase> file)
        {
            var galeriId = GaleriManager.AddUpdate(galeri);
            if (file != null)
            {
          //      GaleriManager.AddUpdateFoto(file, galeriId);
            }
            return RedirectToAction("VideoList");
        }
        
        public ActionResult FotoOlustur()
        {
            ViewBag.turs = new SelectList(GaleriManager.GetGaleriTurs().ToList(), "Id", "Ad");
          ViewBag.isNew = true;
            return View();
        }
        [HttpPost]
        public ActionResult FotoOlustur(Galeri galeri, List<HttpPostedFileBase> file)
        {
            var galeriId = GaleriManager.AddUpdate(galeri);
            if (file != null)
            {
           //     GaleriManager.AddUpdateFoto(file, galeriId);
            }
            return RedirectToAction("FotoList");
        }
       
        //edit foto
        public ActionResult Guncelle(int id)
        {
            var galeri = GaleriManager.GetGaleriById(id);
            ViewBag.turs = new SelectList(GaleriManager.GetGaleriTurs().ToList(), "Id", "Ad");
            ViewBag.isNew = false;
            return View("FotoOlustur", galeri);
        }
        //edit video
        public ActionResult Edit(int id)
        {
            var galeri = GaleriManager.GetGaleriById(id);
            ViewBag.turs = new SelectList(GaleriManager.GetGaleriTurs().ToList(), "Id", "Ad");
            ViewBag.isNew = false;
            return View("VideoOlustur", galeri);
        }
        //delete resim
        public ActionResult ResimDelete(int? id)
        {
            GaleriManager.DeleteGaleri(id);
            return RedirectToAction("FotoList");
        }
        //delete video
        public ActionResult Delete(int? id)
        {
            GaleriManager.DeleteGaleri(id);
            return RedirectToAction("VideoList");
        }
        public ActionResult FotoGaleri (int? page)
        {
            using(var db=new Entities())
            {
                var images = db.Galeris.Where(s => s.Sil != true&& s.GaleriTur == 1).GroupBy(s => s.Id).ToList().Select(s => new GaleriDto
                {
                    Id = s.FirstOrDefault().Id,
                    PicUrl = s.FirstOrDefault().PicUrl,

                }).ToList().ToPagedList(page ?? 1, 6);
                var model = new GeleriGenelFotoViewModels
                {
                    AvailableFotoesPages = Convert.ToInt32(Math.Ceiling(Convert.ToDecimal(images.Count / 6))),
                    GenelImagesList = images
                };
                ViewBag.FotoIndexleri = 1;
                return View(model);
                
            }
        }
        public ActionResult VideoGaleri(int? page)
        {
            using (var db = new Entities())
            {
                var images = db.Galeris.Where(s => s.Sil != true && s.GaleriTur == 2).GroupBy(s => s.Id).ToList().Select(s => new GaleriDto
                {
                    Id = s.FirstOrDefault().Id,
                    Link = s.FirstOrDefault().Link,

                }).ToList().ToPagedList(page ?? 1, 6);
                var model = new GeleriGenelFotoViewModels
                {
                    AvailableFotoesPages = Convert.ToInt32(Math.Ceiling(Convert.ToDecimal(images.Count / 6))),
                    GenelImagesList = images
                };
                ViewBag.FotoIndexleri = 1;
                return View(model);

            }
        }
        public ActionResult GenelLoadImagesBy(string name,int? page)
        {
            using (var db = new Entities())
            {
                var images = db.Galeris.Where(s => s.Sil != true&& s.GaleriTur==1).GroupBy(s => s.Id).Select(s => new GaleriDto
                {
                    Id = s.FirstOrDefault().Id,
                    PicUrl = s.FirstOrDefault().PicUrl,

                }).ToPagedList(page ?? 1, 6);
                //bağlantı yoluna tekrardan kontrol et.
                return PartialView("_GenelImagesPartial", images);
            }
        }
        public ActionResult GenelLoadVideoBy(string name, int? page)
        {
            using (var db = new Entities())
            {
                var videos = db.Galeris.Where(s => s.Sil != true&& s.GaleriTur==2).GroupBy(s => s.Id).Select(s => new GaleriDto
                {
                    Id = s.FirstOrDefault().Id,
                    Link = s.FirstOrDefault().Link,
                }).ToPagedList(page ?? 1, 6);
                //bağlantı yoluna tekrardan kontrol et.
                return PartialView("_GenelVideosPartial", videos);
            }
        }

        [HttpPost]
        public ActionResult GetImagesByGenelId(int Id)
        {
            using (var db = new Entities())
            {
                var images = db.Galeris.Where(s => s.Id == Id && s.Sil != true&&s.GaleriTur==1).Select(b => new
                {
                    src = b.PicUrl,
                    w = 500,
                    h = 400
                }).ToArray();
                return Json(images, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult GetVideosByGenelId(int Id)
        {
            using (var db = new Entities())
            {
                var images = db.Galeris.Where(s => s.Id == Id && s.Sil != true && s.GaleriTur == 2).Select(b => new
                {
                    src = b.Link,
                    w = 500,
                    h = 400
                }).ToArray();
                return Json(images, JsonRequestBehavior.AllowGet);
            }
        }
    }
}