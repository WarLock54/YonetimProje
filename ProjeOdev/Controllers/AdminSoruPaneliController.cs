using DataTables.Mvc;
using ProjeOdev.Managers;
using ProjeOdev.Models;
using ProjeOdev.Yonetim;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjeOdev.Controllers
{
    public class AdminSoruPaneliController : Controller
    {
        // GET: AdminSoruPaneli
        
        public ActionResult Index()
        {
            
            return View();
        }
       
        [HttpGet]
        public ActionResult GetSoruById(int id)
        {
            var val = SoruManager.GetSoruById(id);
            return View(val);
        }
        [HttpGet]
        public ActionResult SoruEkle()
        {
            var val = new SoruViewModel();
            ViewBag.Tur = new SelectList(GaleriManager.GetGaleriTurs().ToList(), "Id", "Ad");
            return View(val);
        }
        [HttpPost]
        public ActionResult SoruEkle(SoruViewModel soru)
        {
           
            SoruManager.SoruEkle(soru.sorular);
            SoruManager.AddUpdate(soru.sorular);
            
            soru.galeri.Id = soru.sorular.Id;
            soru.sorular.Galeri = soru.galeri.Id;
            soru.galeri.Sil = false;

            GaleriManager.GaleriEkle(soru.galeri);
            
            Session["deneme"] = soru.sorular.Id;


            return RedirectToAction("DogruCevapEkle", "AdminSoruPaneli");
        }
       
        public ActionResult DogruCevapEkle()
        {
             var Id = Convert.ToInt32(Session["deneme"]);

         
            var val = SoruManager.GetSoruById(Id);
           
            return View(val);
        }

        [HttpPost]
        public ActionResult DogruCevapEkle(Sorular soru)
        {

       var val=     SoruManager.SoruGuncelle(soru);

            var galeriId = SoruManager.GetSoruById(val.Id);
            var galeri = GaleriManager.GetGaleriById(galeriId.Galeri);
            Session["denemem"] = galeri.Id;

            return RedirectToAction("ResimEkle", "AdminSoruPaneli");
        }
     /*   [HttpPost]
        public ActionResult DogruCevapEkle( int Idx,string A, string B, string C, string D)
        {
           
            
                var galeriId = SoruManager.GetSoruById(Idx);
            var galeri = GaleriManager.GetGaleriById(galeriId.Galeri);

            var soru = SoruManager.SoruEkle(Idx, A, B, C, D);
                Session["denemem"] = galeriId.Galeri;
                return RedirectToAction("ResimEkle", "AdminSoruPaneli");
                }*/
        public ActionResult ResimEkle()
        {
           var Id=Convert.ToInt32(Session["denemem"]);
            var val = GaleriManager.GetGaleriById(Id);
            return View(val);
        }
        [HttpPost]
        public ActionResult ResimEkle(Galeri galeri)
        {
        
            var file = Request.Files["PicUrl"];
            var x = GaleriManager.GaleriEkle(galeri);
            string folderPath;
            if (x.PicUrl.EndsWith("") || x.PicUrl.EndsWith("")) {
                folderPath = Server.MapPath("~/app-assets/Upload/Fotograf");
            }
            folderPath = Server.MapPath("~/app-assets/Upload/Video");

            // Dosyanın hedef klasöre kaydedilmesi
            string fileName = Path.GetFileName(file.FileName);
            string filePath = Path.Combine(folderPath, fileName);
            file.SaveAs(filePath);
        
        /* var Id = Convert.ToInt32(Session["denemem"]);
         var val = GaleriManager.GetGaleriById(Id);
         val.PicUrl = filePath;*/

        
            return RedirectToAction("Index", "AdminSoruPaneli");
        }
        public ActionResult SoruSil(int? id)
        {
            SoruManager.DeleteSoru(id);
            return RedirectToAction("Index");
        }
        public ActionResult SoruGuncelle(Sorular sorular)

        {
            var val = SoruManager.GetSoruById(sorular.Id);
            return View(val);
        }
       [HttpPost]
        public ActionResult SoruyuGuncelle(Sorular  form)
        {
            SoruManager.SoruGuncelle(form);
            SoruManager.AddUpdate(form);

            return RedirectToAction("Index");

        }
        public ActionResult FeedBackList()
        {
            return View();
        }
        
        public ActionResult FeedBackGoruntule(FeedBack feed)
        {
            var val = SoruManager.GetFeedBackById(feed.Id);
        
            return View(val);
        }
        

        public ActionResult GetSoru([ModelBinder(typeof(DataTablesBinder))] IDataTablesRequest requestModel)
        {
            var originalData = SoruManager.GetSoru(requestModel, out var totalCount, out var filteredCount);
            var data2 = originalData.Select(asset => new
            {
                Id = asset.Id,
                SoruAciklamasi = asset.SoruAciklamasi,
                A = asset.A,
            }).ToList();

            return Json(new DataTablesResponse(requestModel.Draw, data2, filteredCount, totalCount), JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetFeedBack([ModelBinder(typeof(DataTablesBinder))] IDataTablesRequest requestModel)
        {
            var originalData = SoruManager.GetFeedBack(requestModel, out var totalCount, out var filteredCount);
            var data2 = originalData.Select(asset => new
            {

                 Id= asset.Id,
                 Yorum=asset.Yorum,
                    
            }).ToList();

            return Json(new DataTablesResponse(requestModel.Draw, data2, filteredCount, totalCount), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult UploadFile()
        {
            return View();
        }
        [HttpPost]
        public ActionResult UploadFile(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {

                if (file.FileName.EndsWith("jpeg") || file.FileName.EndsWith("png"))
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/app_assets/Upload/Fotograf"), fileName);
                    file.SaveAs(path);
                }
                else if (file.FileName.EndsWith("/video/mp4"))
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/app_assets/Upload/Video"), fileName);
                    file.SaveAs(path);
                }
              
            }

            return RedirectToAction("Index");
        }

    }
}


