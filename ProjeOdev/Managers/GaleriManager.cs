using ProjeOdev.Yonetim;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace ProjeOdev.Models
{
    public class GaleriManager
    {
       
        public static  Galeri GaleriEkle(Galeri galeri)
        {
            var db = new Entities();
            db.Galeris.Add(galeri);
            db.SaveChanges();
            return galeri;
        }
        public static Galeri GaleriGüncelle(Galeri galeri)
        {
            var db=new Entities();
            var val = GaleriManager.GetGaleriById(galeri.Id);
            val.PicUrl = galeri.PicUrl;
                val.GaleriTur = galeri.GaleriTur;
            db.SaveChanges();
            return galeri;
        }
        //ekleme galeri
        public static int AddUpdate(Galeri galeri)
        {
            using (var db = new Entities())
            {
                db.Entry(galeri).State = galeri.Id > 0 ? EntityState.Modified : EntityState.Added;
                db.SaveChanges();
                return galeri.Id;
            }
        }
        public static bool DeleteGaleri(int? id)
        {
            using (var db = new Entities())
            {
                var gelgaleri = db.Galeris.FirstOrDefault(x => x.Id == id);
                if (gelgaleri != null) return false;
                gelgaleri.Sil = true;
                db.SaveChanges();
                return true;
            }
        }
        public static Galeri GetGaleriById(int id)
        {
                using(var db = new Entities())
            {
                var gelgaleri = db.Galeris.Find(id);
                return gelgaleri ?? new Galeri();

            }
        }

        //GaleriTur lara tekrardan bak...
        public static List<Galeri> getGaleriFoto()
        {
            using(var db = new Entities())
            {
                return db.Galeris.Include(x => x.GaleriTur1).Where(x => x.Sil != true && x.GaleriTur == 1).ToList();
            }
        }
        public static List<Galeri> getGaleriVideo()
        {
            using(var db=new Entities())
            {
                return db.Galeris.Include(x => x.GaleriTur1).Where(x => x.Sil != true && x.GaleriTur == 2).ToList();
            }
        }
        public static List<GaleriTur> GetGaleriTurs()
        {
            using (var db=new Entities())
            {
                return db.GaleriTurs.ToList();
            }
        }

        public static string UploadImage(string url,string base64)
        {
            var imgbyte = Convert.FromBase64String(base64);
            using (var ms = new MemoryStream(imgbyte))
            {
                var img = Image.FromStream(ms);
                var imgName = Guid.NewGuid() + ".jpeg";
                var path = Path.Combine(HttpContext.Current.Server.MapPath(url), imgName);
                img.Save(path);
                return imgName;
            }
        }
        public static string UploadVideo(HttpPostedFile file, string url)
        {
            var filepath = Path.Combine(HttpContext.Current.Server.MapPath(url), Path.GetFileName(file.FileName) ?? throw new InvalidOperationException());
            file.SaveAs(filepath);
            return url + file.FileName;
        }
        public static string UploadFile(HttpPostedFileBase file, string Url)
        {
            var filePath =
                Path.Combine(HttpContext.Current.Server.MapPath(Url),
                    Path.GetFileName(file.FileName) ?? throw new InvalidOperationException());
            file.SaveAs(filePath);

            return Url + file.FileName;
        }
    }
}