import fetch from "node-fetch";

export const get = (url, options = {checkStatus: true}) => {
 return new Promise((resolve, reject) => {
   fetch(url)
     .then((res) => res.json())
     .then((json) => {
       if (options.checkStatus) {
         if (/ok/i.test(json.status)) {
           resolve(json.data);
         } else {
           reject(json.status);
         }
       } else {
         resolve(json);
       }
     })
     .catch(err => {
       reject(err)
     })
 });
};