export const cnpjMask = value => {
    return value
      .replace(/\D/g, '')     
      //replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4")
      .replace(/^(\d{2})(\d)/,"$1.$2")
    
      //Coloca ponto entre o quinto e o sexto dígitos
      .replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")

      //Coloca uma barra entre o oitavo e o nono dígitos
      .replace(/\.(\d{3})(\d)/,".$1/$2")

      //Coloca um hífen depois do bloco de quatro dígitos
      .replace(/(\d{4})(\d)/,"$1-$2")
      /*.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/^(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1 $2 $3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2") */
  }

  