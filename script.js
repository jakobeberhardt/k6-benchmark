import http from "k6/http";

const server="188.184.97.184";

// Maximum amount of virtual users
const max=100;

// File name range
const first=0
const last=44

export const options = {
    stages: [
      { duration: '30s', target: max },
      { duration: '1m30s', target: max },
      { duration: '20s', target: 0 },
    ],
  };

// Picks a random file and gets it
export default function() {
     const num = Math.floor(Math.random() * (last - first) ) + first;
     let response = http.get("http://"+server+"/"+num);  
     console.log("GET"+" /"+num+" ("+response.status+")")
};
