using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FUTPLAY_APIS_HOST.Models;
using System.Web.Http.Cors;
namespace FUTPLAY_APIS_HOST.Controllers
{
    public class CanchasController : ApiController
    {
        private FUTPLAY_DB_Entities db = new FUTPLAY_DB_Entities();




        // GET: api/Canchas   OBTENER TODAS  LAS CANCHAS

        [EnableCorsAttribute(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<Models.Canchas> Get()
        {
            using (Models.FUTPLAY_DB_Entities Entities = new Models.FUTPLAY_DB_Entities())

            {
                Entities.Configuration.ProxyCreationEnabled = false; /*desabilita ProxyCreationEnabled https://docs.microsoft.com/en-us/ef/ef6/fundamentals/proxies*/
                return Entities.Canchas.ToList();
            }
        }

      



        // GET: api/canchas/1  OBTENER CANCHA POR COD_CANCHA


        [EnableCorsAttribute(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<Models.Canchas> Get(int Id)
        {
            using (Models.FUTPLAY_DB_Entities Entities = new Models.FUTPLAY_DB_Entities())
            {
                Entities.Configuration.ProxyCreationEnabled = false; /*desabilita ProxyCreationEnabled https://docs.microsoft.com/en-us/ef/ef6/fundamentals/proxies*/
                return Entities.Canchas.Where(e => e.Cod_Cancha == Id).ToList();
            }
        }






        // GET: api/cancha-filtrar-ubicacion?Cod_Provincia=4&Cod_Distrito=1&Cod_Canton=1 POR COD_PROVINCIA +  COD_CANTON + COD_DISTRITO


        [ResponseType(typeof(Canchas))]
        [Route("api/cancha-filtrar-ubicacion")]
        [EnableCorsAttribute(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<Models.Canchas> Get(int Cod_Provincia, int Cod_Distrito, int Cod_Canton)
        {
            using (Models.FUTPLAY_DB_Entities entities = new Models.FUTPLAY_DB_Entities())
            {

                entities.Configuration.ProxyCreationEnabled = false; /*desabilita ProxyCreationEnabled https://docs.microsoft.com/en-us/ef/ef6/fundamentals/proxies*/
                return entities.Canchas.Where(e => e.Cod_Provincia == Cod_Provincia & e.Cod_Distrito == Cod_Distrito & e.Cod_Canton == Cod_Canton).ToList(); //AQUI FILTRA
               
            }
        }




        //POST API/CANCHAS CREAR CANCHAS


        [EnableCorsAttribute(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage  Post([FromBody] Models.Canchas cancha)
        {

            using (Models.FUTPLAY_DB_Entities entities = new Models.FUTPLAY_DB_Entities())
            {
                entities.Canchas.Add(cancha);
                entities.SaveChanges();
              
                return Request.CreateResponse(HttpStatusCode.Created, cancha);

            }
        }






        // PUT: api/canchas/?Cod_Cancha=8&Cod_Usuario=2   ACTUALIZAR CANHA

        [EnableCorsAttribute(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage Put(int Cod_Cancha, int Cod_Usuario, [FromBody] Models.Canchas cancha)
        {
            using (Models.FUTPLAY_DB_Entities entities = new Models.FUTPLAY_DB_Entities())
            {
                var tabla = entities.Canchas.FirstOrDefault(e => e.Cod_Cancha == Cod_Cancha & e.Cod_Usuario == Cod_Usuario); //AQUI FILTRA
                tabla.Cod_Provincia = cancha.Cod_Provincia;
                tabla.Cod_Canton = cancha.Cod_Canton;
                tabla.Cod_Distrito = cancha.Cod_Distrito;
                tabla.Cod_Categoria = cancha.Cod_Categoria;
                tabla.Foto = cancha.Foto;
                tabla.Nombre = cancha.Nombre;
                tabla.Numero_Cancha = cancha.Numero_Cancha;
                tabla.Telefono = cancha.Telefono;
                tabla.Precio_Hora = cancha.Precio_Hora;
                tabla.Luz = cancha.Luz;
                tabla.Precio_Luz = cancha.Precio_Luz;
                tabla.techo = cancha.techo;
                tabla.Latitud = cancha.Latitud;
                tabla.Longitud = cancha.Longitud;
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, cancha);
            }
        }



        // ACTUALIZA ESTADO DE LA CANCHA PARA QUE NO SE MUESTRE ACTIVA 

  
        [Route("api/actualizar-cancha-estado")]
        [EnableCorsAttribute(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage ActualizarCanchaEstado(int Cod_Cancha, int Cod_Usuario, [FromBody] Models.Canchas cancha)
        {
            using (Models.FUTPLAY_DB_Entities entities = new Models.FUTPLAY_DB_Entities())
            {

                entities.Configuration.ProxyCreationEnabled = false; /*desabilita ProxyCreationEnabled https://docs.microsoft.com/en-us/ef/ef6/fundamentals/proxies*/
                var tabla = entities.Canchas.FirstOrDefault(e => e.Cod_Cancha == Cod_Cancha & e.Cod_Usuario == Cod_Usuario); //AQUI FILTRA

                tabla.Estado = !tabla.Estado;

                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, tabla);
            }
        }



        // Delete: /api/canchas/?Cod_Cancha=22&Cod_Usuario=2  ELIMINAR CANCHA   POR COMPLETO


        [EnableCorsAttribute(origins: "*", headers: "*", methods: "*")]
        public HttpResponseMessage Delete(int Cod_Cancha, int Cod_Usuario, [FromBody] Models.Canchas cancha)
        {
            using (Models.FUTPLAY_DB_Entities entities = new Models.FUTPLAY_DB_Entities())
            {
                var tabla = entities.Canchas.FirstOrDefault(e => e.Cod_Cancha == Cod_Cancha & e.Cod_Usuario == Cod_Usuario); //AQUI FILTRA

                entities.Canchas.Remove(tabla);
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, tabla);
            }
        }




























    }
}