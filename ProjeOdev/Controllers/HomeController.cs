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
        public ActionResult AdminOturum(AdminLog admin)
        {
            var db = new Entities();
            var response = Login.Log(admin);
            if(response != null)
            {
                return RedirectToAction("Index", "Oturum");
            }
            var val = db.AdminLogs.FirstOrDefault(nesne => nesne.Mail == admin.Mail && nesne.Password == admin.Password);
            if (val == null) return View();
            FormsAuthentication.SetAuthCookie(val.Mail, false);
            return RedirectToAction("Index", "AdminSoruPaneli");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}