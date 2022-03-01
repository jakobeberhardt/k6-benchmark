import http from 'k6/http';
import { check } from "k6";
import { Rate } from "k6/metrics";

const server="188.184.97.184";


export const options = {
  scenarios: {
    tiny: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 1000 },
        { duration: '10s', target: 1000 },
        { duration: '30s', target: 0 },
      ],
      gracefulStop: '30s',
      exec: 'tiny', 
    },
    small: {
      executor: 'ramping-vus',
      startVUs: 0,
      startTime: '100s',
      stages: [
        { duration: '30s', target: 1000 },
        { duration: '10s', target: 1000 },
        { duration: '30s', target: 0 },
      ],
      gracefulStop: '30s',
      exec: 'small', 
    },
    medium: {
      executor: 'ramping-vus',
      startVUs: 0,
      startTime: '200s',
      stages: [
        { duration: '30s', target: 1000 },
        { duration: '10s', target: 1000 },
        { duration: '30s', target: 0 },
      ],
      gracefulStop: '30s',
      exec: 'medium', 
    },
    large: {
      executor: 'ramping-vus',
      startVUs: 0,
      startTime: '300s',
      stages: [
        { duration: '30s', target: 1000 },
        { duration: '10s', target: 1000 },
        { duration: '30s', target: 0 },
      ],
      gracefulStop: '30s',
      exec: 'large', 
    },
    extra: {
      executor: 'ramping-vus',
      startVUs: 0,
      startTime: '400s',
      stages: [
        { duration: '30s', target: 100 },
        { duration: '10s', target: 100 },
        { duration: '30s', target: 0 },
      ],
      gracefulStop: '30s',
      exec: 'extra', 
    },
    
    
  },
  discardResponseBodies: true,
  noThresholds: true,
};

export let errorRate = new Rate("errors");

export function tiny() {
  const num = Math.floor(Math.random() * (99999 - 0) ) + 0;
  let res = http.get("http://"+server+"/tiny/"+num);  
  console.log("GET"+" /tiny/"+num+" ("+res.status+")")
  let success = check(res, {"is status 200": (r) => r.status === 200});
  if (!success) {
   errorRate.add(1)
  }
};

export function small() {
  const num = Math.floor(Math.random() * (9999 - 0) ) + 0;
  let res = http.get("http://"+server+"/small/"+num);  
  console.log("GET"+" /small/"+num+" ("+res.status+")")
  let success = check(res, {"is status 200": (r) => r.status === 200});
  if (!success) {
   errorRate.add(1)
  }
};

export function medium() {
  const num = Math.floor(Math.random() * (999 - 0) ) + 0;
  let res = http.get("http://"+server+"/medium/"+num);  
  console.log("GET"+" /medium/"+num+" ("+res.status+")")
  let success = check(res, {"is status 200": (r) => r.status === 200});
  if (!success) {
   errorRate.add(1)
  }
};

export function large() {
  const num = Math.floor(Math.random() * (99 - 0) ) + 0;
  let res = http.get("http://"+server+"/large/"+num);  
  console.log("GET"+" /large/"+num+" ("+res.status+")")
  let success = check(res, {"is status 200": (r) => r.status === 200});
  if (!success) {
   errorRate.add(1)
  }
};

export function extra() {
  const num = Math.floor(Math.random() * (3 - 0) ) + 0;
  let res = http.get("http://"+server+"/extra/"+num);  
  console.log("GET"+" /extra/"+num+" ("+res.status+")")
  let success = check(res, {"is status 200": (r) => r.status === 200});
  if (!success) {
   errorRate.add(1)
  }
};