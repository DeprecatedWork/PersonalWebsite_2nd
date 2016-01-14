using Microsoft.AspNet.Mvc;

namespace JWeb.Controller
{
    public class HomeController : Microsoft.AspNet.Mvc.Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}