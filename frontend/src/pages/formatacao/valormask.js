export const valorMask = value => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    /*.replace(/([0-9]{2})$/g, ",$1")
    .replace(/([0-9]{3}),([0-9]{2}$)/g, "$1,$2")
    .replace(/([0-9]{2}),([0-9]{3}),([0-9]{2}$)/g, "$1,$2")/*/
    .replace(/(\d{1})(\d{5})$/,"$1.$2") // coloca ponto antes dos ultimos 5 digitos 
    .replace(/(\d{1})(\d{1,2})$/,"$1,$2")
    //.replace(/([0-9]{1}),([0-9]{3}),([0-9]{2}$)/g, ".$1,$2") 
  
}

