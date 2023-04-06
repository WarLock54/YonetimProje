using DataTables.Mvc;
using ProjeOdev.Models;
using ProjeOdev.Yonetim;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjeOdev.Controllers
{
    public class AdminSoruPaneliController : Controller
    {
        // GET: AdminSoruPaneli
        Entities db = new Entities();
        public ActionResult Index()
        {
            var val = db.AdminLogs.ToList();
            return View(val);
        }
        public ActionResult GetirList()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Guncelle(int? id)
        {
            var val = db.Sorulars.Find(id);
            return View(val);
        }
        [HttpPost]
        public ActionResult Guncelle(Sorular soru)
        {
            var val = db.Sorulars.Find(soru.Id);
            val.SoruAciklamasi = soru.SoruAciklamasi;
            val.A = soru.A;
            val.B = soru.B;
            val.C= soru.C;
            val.D = soru.D;
            db.SaveChanges();
            return View();
        }
        public ActionResult SoruSil(int? id)
        {
            SoruManager.DeleteSoru(id);
            return RedirectToAction("Index");
        }
        [HttpPost]
        public ActionResult SoruEkle(FormCollection data)
        {
            string SoruAciklamasi = data["SoruAciklamasi"].ToString();
            string A = data["A"].ToString();
            string B = data["B"].ToString();
            string C = data["C"].ToString();
            string D = data["D"].ToString();
            bool Sil = false;
            Sil = Convert.ToBoolean(data["Sil"]);
            //buraya fotoğraf mp4 video özellikleri eklenecek...
            var val = SoruManager.SoruEkle(SoruAciklamasi, A, B, C, D, Sil);
                 if(!ModelState.IsValid){
                ViewBag.Err = "Bilgilerinizi doğru giriniz..";
                return View("SoruEkle");
        }
            SoruManager.Ekle(val);
            return RedirectToAction("Index");
        }
        public ActionResult GetSoru([ModelBinder(typeof(DataTablesBinder))] IDataTablesRequest requestModel)
        {
            
           
            var originalData = SoruManager.GetSoru(requestModel, out var totalCount, out var filteredCount);
           
            var data2 = originalData.Select(asset => new
            {
               Id=asset.Id,
               SoruAciklamasi=asset.SoruAciklamasi
            }).ToList();

            return Json(new DataTablesResponse(requestModel.Draw, data2, filteredCount, totalCount), JsonRequestBehavior.AllowGet);
        }
    }
}


