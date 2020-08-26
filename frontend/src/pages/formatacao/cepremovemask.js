export const cepremoveMask = value => {
    return value      
      //replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4")
      .replace(".", "")    
      //Coloca ponto entre o quinto e o sexto dígitos
    //  .replace("-", "")
      //Coloca uma barra entre o oitavo e o nono dígitos     
    //  .replace(".", "")
  }

  
