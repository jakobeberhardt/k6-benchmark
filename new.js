import http from 'k6/http';
import { check } from "k6";
import { Rate } from "k6/metrics";

const server="188.184.97.184";

// Maximum amount of virtual users
const max=10;

// File name range
const first=0;
const last=600;

export const options = {
  scenarios: {
    tiny: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      gracefulRampDown: '0s',
      exec: 'std', // the function this scenario will execute
    },
    small: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      gracefulRampDown: '0s',
      exec: 'std', // the function this scenario will execute
    },
    medium: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      gracefulRampDown: '0s',
      exec: 'std', // the function this scenario will execute
    },
    large: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      gracefulRampDown: '0s',
      exec: 'std', // the function this scenario will execute
    },
    
  },
  discardResponseBodies: true,
};

export function std() {
  const num = Math.floor(Math.random() * (last - first) ) + first;
  let res = http.get("http://"+server+"/tiny/"+num);  
  console.log("GET"+" /"+num+" ("+res.status+")")
  let success = check(res, {"is status 200": (r) => r.status === 200});
  if (!success) {
   errorRate.add(1)
  }
};


