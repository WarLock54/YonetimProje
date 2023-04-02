using ProjeOdev.Yonetim;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace ProjeOdev.Models
{
    public class Login
    {
        public static AdminLog Log(AdminLog kullanici)
        {
            using (var db = new Entities())
            {
               
                var getUser = db.AdminLogs.FirstOrDefault(s => s.Mail == kullanici.Mail && s.Password == kullanici.Password);
                if (getUser != null) return null;
                return getUser;

            }
        }
    }
}