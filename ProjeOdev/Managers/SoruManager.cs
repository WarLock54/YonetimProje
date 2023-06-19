using DataTables.Mvc;
using ProjeOdev.Managers;
using ProjeOdev.Yonetim;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace ProjeOdev.Models
{
    public class SoruManager
    {

        public static IQueryable<Sorular> GetSoru([ModelBinder(typeof(DataTablesBinder))]
            IDataTablesRequest requestModel,
        out int totalCount,
        out int filteredCount)
        {
            var db = new Entities();
            var query = db.Sorulars.AsQueryable();
            totalCount = query.Count();

            #region Filtering 

            // Apply filters for searching 
            if (requestModel.Search.Value != string.Empty)
            {
                var value = requestModel.Search.Value.Trim();
                query = query.Where(p => p.SoruAciklamasi.ToString().Contains(value));


            }
            filteredCount = query.Count();

            #endregion Filtering 

            #region Sorting 

            query = query.OrderByDescending(x => x.SoruAciklamasi);

            #endregion Sorting 

            // Paging 
            query = query.Skip(requestModel.Start).Take(requestModel.Length);
            return query;
        }
        public static int AddUpdate(Sorular soru)
        {
            using (var db = new Entities())
            {
                db.Entry(soru).State = soru.Id > 0 ? EntityState.Modified : EntityState.Added;
                db.SaveChanges();
                return soru.Id;
            }
        }
        public static bool DeleteSoru(int? id)
        {
            using (var db = new Entities())
            {
                var getsoru = db.Sorulars.FirstOrDefault(x => x.Id == id);
                if (getsoru == null) return false;
                getsoru.Sil = true;
                db.SaveChanges();
                return true;
            }
        }
        public static Sorular GetSoruById(int id)
        {
            using (var db = new Entities())
            {
                var getsoru = db.Sorulars.FirstOrDefault(x => x.Id == id);
               
                return getsoru ?? new Sorular();
}
        }
        public static Sorular SoruEkle(Sorular form)
        {

            var db = new Entities();
            db.Sorulars.Add(form);
            db.SaveChanges();

            return form;
        }
        public static SoruViewModel SoruResimliEkle(SoruViewModel x)
        {
            var db = new Entities();
            var val = SoruManager.GetSoruById(x.sorular.Id);
            val.Sil = false;
            val.Galeri = x.galeri.Id;
            db.Galeris.Add(x.galeri);
            db.SaveChanges();
            return x;
        }
        public static Sorular SoruEkle(int Id, string A, string B, string C, string D)
        {
            var val = SoruManager.GetSoruById(Id);

            val.A = A;

            val.B = B;

            val.C = C;

            val.D = D;

            // resimler mp4 ve video eklenicek...
            return val;
        }
        public static Sorular SoruGuncelle(Sorular soru)
        {
            var db = new Entities();
            var val = SoruManager.GetSoruById(soru.Id);
            val.Id=soru.Id;
            val.SoruAciklamasi = soru.SoruAciklamasi;
            val.A = soru.A;
            val.B = soru.B;
            val.C= soru.C;
            val.D = soru.D;
            db.SaveChanges();

            return soru;
        }
        public static List<Galeri> getGaleriFoto()
        {
            using (var db = new Entities())
            {
                return db.Galeris.Include(x => x.GaleriTur1).Where(x => x.Sil != true && x.GaleriTur == 1).ToList();
            }
        }
       /* public static void FotoEkle(HttpPostedFileBase Kapaks, int Uid, int sira)
        {
            using (var db = new Entities())
            {
                var dosyad = sira + "-" + DateTime.Now.ToString("ddMMyyyyHHmmss") + "-" + Uid + Path.GetExtension(Kapaks.FileName);
                var url = $"/app-assets/Upload/Fotograf/{dosyad}";
                var yol = HttpContext.Current.Server.MapPath(url);
                Kapaks.SaveAs(yol);
                Galeri dbresim = new Galeri();
                dbresim.PicUrl = url;
                dbresim.Id= Uid;
                db.Entry(dbresim).State = EntityState.Added;
                db.SaveChanges();
            }
        }*/
    }
}