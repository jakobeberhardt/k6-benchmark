import http from 'k6/http';
import { check } from "k6";
import { Rate } from "k6/metrics";

// IP of HTTP server to be benchmarked
const server="X.X.X.X";


export const options = {
  // One scenario for each file size
  // Starting from 0 VUs, ramping up to 1000 over the term of 30s
  // Stay at 1000 VUs for 10s, then ramp down to 0 in 30s
  // Grant 30s of gracefulStop time
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
  // This option allows for more VUs at low memory
  discardResponseBodies: true,
  // Sets HTTP timeout to 60s
  noThresholds: true,
};

export let errorRate = new Rate("errors");

// Picks a random file from the tiny directory and GETs it
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