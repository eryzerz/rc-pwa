import '../components/start.js'
import '../components/dsdf.js'
import '../components/artr.js'
import '../components/ncs.js'
import '../components/klsi.js'

const nav = () => {
  let state = {
    content: ''
  }
  // const loadContent = page => home_elm.loadContent(page)

  const loadNav = async () => {
    try {
      const res = await fetch("nav.html");

      if (res.status === 200) {
        const nav = await res.text();

        document.querySelectorAll(".topnav, .sidenav").forEach((elem) => {
          console.log('elem', elem)
          elem.innerHTML = nav;
        });

        document.querySelectorAll(".topnav a, .sidenav a").forEach((elem) => {
          elem.addEventListener("click", () => {
            const page = elem.getAttribute("href") ? elem.getAttribute("href").slice(1) : "start"

            history.replaceState(state, null, `index.html#${page}`)
            loadContent(page);

            const sidebar = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidebar).close();
          });
        });
      } else {
        console.error("Something went wrong on load navigation!");
      }
    } catch (err) {
      console.error(`Something went wrong on load navigation!\n${err}`);
    }
  };


  const loadContent = async (page) => {
    try {

      const res = await fetch(`/pages/${page}.html`);


      if (res.status === 200) {
        state.content = await res.text();
        const body = document.querySelector("#body-content")
        history.pushState(state, null, `index.html#${page}`)

        console.log('STATE', state)

        window.onpopstate = e => {
          if (e.state) {
            state = e.state
            body.innerHTML = state.content
          }
        }

        body.innerHTML = state.content

      } else {
        console.error("Something went wrong on load content!");
      }
    } catch (err) {
      console.error(`Something went wrong on load content! ${err}`);
    }
  };

  const sidebar = document.querySelector(".sidenav");
  let page = window.location.hash.slice(1);
  M.Sidenav.init(sidebar);

  loadNav();

  if (page === "") page = "start";

  loadContent(page);

}

export default nav