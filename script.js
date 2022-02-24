import http from "k6/http";
import { Counter } from 'k6/metrics';
import { check } from "k6";
import { Rate } from "k6/metrics";


const server="188.184.97.184";

// Maximum amount of virtual users
const max=10;

// File name range
const first=0;
const last=600;

// Ramping
export const options = {
    stages: [
      { duration: '10s', target: max },
      { duration: '30s', target: max },
      { duration: '10s', target: 0 },
    ],
  };

export let errorRate = new Rate("errors");

// Picks a random file and gets it
export default function() {
     const num = Math.floor(Math.random() * (last - first) ) + first;
     let res = http.get("http://"+server+"/"+num);  
     console.log("GET"+" /"+num+" ("+res.status+")")
     let success = check(res, {"is status 200": (r) => r.status === 200});
     if (!success) {
      errorRate.add(1)
     }
};
