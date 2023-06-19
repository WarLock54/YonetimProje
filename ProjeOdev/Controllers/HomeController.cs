using ProjeOdev.Models;
using ProjeOdev.Yonetim;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace ProjeOdev.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Oturum()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Oturum(AdminLog kullanici)
        {
            
            var db = new Entities();
            if (!ModelState.IsValid)
            {
                return View("Oturum");
            }
            db.AdminLogs.Add(kullanici);
            db.SaveChanges();

            return RedirectToAction("Index","Home");
        }
        [HttpPost]
        [AllowAnonymous]
        public ActionResult Index(AdminLog admin)
        {
            var db = new Entities();
         /*   var response = Login.Log(admin);
            if(response != null)
            {
                return RedirectToAction("SorularıListele");
            }*/
            var val = db.AdminLogs.FirstOrDefault(nesne => nesne.Mail == admin.Mail && nesne.Password == admin.Password);
                if(val.Mail == "admin@mail.com" && val.Password == "123456")
                return RedirectToAction("Index", "AdminSoruPaneli");

                       FormsAuthentication.SetAuthCookie(val.Mail, false);
            TempData["Mail"] = val.Mail.ToString();
            TempData["Password"] = val.Password.ToString();

            return RedirectToAction("SorularıListele", "Home");
        }
        public ActionResult SorularıListele(int page=1)
        {
            var db = new Entities();
            var itemCount = db.Sorulars.Count();
            ViewBag.Count = itemCount;
            int pageSize = 10;
            int pageNumber = (int)Math.Ceiling((double)itemCount / pageSize); // kaç sayfa olacağı
            int currentPage = page;
            var random = new Random();
            var allItems = db.Sorulars.ToList();
            var randomItems = allItems.OrderBy(x => random.Next()).Take(pageSize).ToList();
            var slicedItems = randomItems.Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();
            ViewBag.SilicedItems = slicedItems;
           
            return View();
        }
        [HttpPost]
        public ActionResult KontrolEt(int data)
        {


            return Json(data,JsonRequestBehavior.AllowGet);
        }
        

    }
}