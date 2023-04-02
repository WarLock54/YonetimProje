using DataTables.Mvc;
using ProjeOdev.Yonetim;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
        public static bool DeleteSoru(int? id)
        {
            using(var db=new Entities())
            {
                var getsoru = db.Sorulars.FirstOrDefault(x => x.Id == id);
                if (getsoru == null) return false;
                getsoru.Sil = true;
                db.SaveChanges();
                return true;
            }
        }

        public  static Sorular SoruEkle(string SoruAciklamasi,string A, string B, string C, string D,bool Sil)
        {
            Sorular sorular = new Sorular
            {
                 SoruAciklamasi=SoruAciklamasi,
                 A=A,
                 B=B,
                 C=C,
                 D=D,
                 Sil=Sil
            };
            // resimler mp4 ve video eklenicek...
            return sorular;
        }
        public static Sorular Ekle(Sorular soru)
        {
            var db = new Entities();
            db.Sorulars.Add(soru);
            db.SaveChanges();
            return soru;
        }

    }
}