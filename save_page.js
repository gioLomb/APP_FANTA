 function ripristinaPagina() {
      const htmlSalvata = localStorage.getItem('paginaSalvata');
      if (htmlSalvata) {
        document.getElementById("contenitoreSquadre").innerHTML = htmlSalvata;
      }
    }

    function salvaPagina() {
      document.querySelectorAll("select").forEach(select => {
        const value = select.value;
        Array.from(select.options).forEach(opt => {
          opt.removeAttribute("selected");
          if (opt.value === value) {
            opt.setAttribute("selected", "selected");
          }
        });
      });

      document.querySelectorAll("input").forEach(input => {
        input.setAttribute("value", input.value);
      });

      const contenutoSquadre = document.getElementById("contenitoreSquadre").innerHTML;
      localStorage.setItem('paginaSalvata', contenutoSquadre);
    }