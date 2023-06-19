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
                var getuser= db.AdminLogs.Where(s => s.Mail == kullanici.Mail && s.Password == kullanici.Password).FirstOrDefault();
             
                if (getuser != null) return null;
                return getuser;

            }
        }

    }
}