import http from 'k6/http';
import { check } from "k6";
import { Rate } from "k6/metrics";
import { sleep } from 'k6';

// IP of HTTP server to be benchmarked
const server="188.184.97.184";
// Timeout between requests in hours
const timeout="8";


export const options = {
  // One scenario for each file size
  // Starting from 0 VUs, ramping up to 1000 over the term of 30s
  // Stay at 1000 VUs for 10s, then ramp down to 0 in 30s
  // Grant 30s of gracefulStop time
  scenarios: {
    get: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '168h', target: 1 },
      ],
      gracefulStop: '30s',
      exec: 'get', 
    },
    
  },
  // This option allows for more VUs at low memory
  discardResponseBodies: true,
};

export let errorRate = new Rate("errors");

// Picks a random file after 
export function get() {  
  sleep(timeout * 60 * 60);
  const num = Math.floor(Math.random() * (29999 - 0) ) + 0;
  let res = http.get("http://"+server+"/files/"+num);  
  console.log("GET"+" /files/"+num+" ("+res.status+")")
  let success = check(res, {"is status 200": (r) => r.status === 200});
  if (!success) {
   errorRate.add(1)
  }
};
