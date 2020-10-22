export const cartaoAmericanMask = value => {
    return value      
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada    
      .replace(/^(\d{4})(\d)/g,"$1 $2")
      .replace(/^(\d{4})\s(\d{6})(\5)/g,"$1 $2 $3")
 //     .match(/\d{1,3}/g).join('.')       
}
  
  

