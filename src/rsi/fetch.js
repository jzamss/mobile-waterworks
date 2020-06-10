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
           reject(json.message);
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

export const getSettingService = ({ipaddress, port}) => {
  return `http://${ipaddress}:${port}/osiris3/json/enterprise/WaterworksMobileSettingService`;
}

export const getSupportService = ({ipaddress, port}) => {
  return `http://${ipaddress}:${port}/osiris3/json/enterprise/WaterworksMobileSupportService`;
}
