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
            soru.galeri.Sil = false;

            GaleriManager.GaleriEkle(soru.galeri);
            
            Session["deneme"] = soru.sorular.Id;


            return RedirectToAction("DogruCevapEkle", "AdminSoruPaneli");
        }
       [HttpGet]
        public ActionResult DogruCevapEkle()
        {
        //  var Id = Convert.ToInt32(Session["deneme"]);

          var val = SoruManager.GetSoruById(1002);
           
            return View(val);
        }

        [HttpPost]
        public ActionResult DogruCevapEkle(int Id,string A, string B, string C, string D, IEnumerable<HttpPostedFileBase> medya)
        {
            try { 
            var galeri = GaleriManager.GetGaleriById(Id);

            var soru = SoruManager.SoruEkle(Id, A, B, C, D);
           
          
foreach(var file in medya)
                {

              
         
            if (file != null && file.ContentLength > 0)
            {
                if (file.FileName.EndsWith("jpeg") || file.FileName.EndsWith("png"))
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/app_assets/Upload/Fotograf"), fileName);
                            file.SaveAs(path);
                    galeri.PicUrl = path;
                }
                else
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var path = Path.Combine(Server.MapPath("~/app_assets/Upload/Video"), fileName);
                            file.SaveAs(path);
                    galeri.PicUrl = path;
                }
            }
                  }
                SoruViewModel soruView= new SoruViewModel();
            soruView.sorular = soru;
            soruView.galeri = galeri;
            SoruManager.SoruResimliEkle(soruView);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return View();
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
        public ActionResult SoruGuncelle(SoruViewModel form,HttpPostedFileBase file)
        {
            SoruManager.SoruGuncelle(form.sorular);
            SoruManager.AddUpdate(form.sorular);
            GaleriManager.GaleriGüncelle(form.galeri);
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


