import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { CustomEase } from 'gsap/CustomEase';

let registered = false;

export function ensureGsapPlugins() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);
    CustomEase.create('cinematic', '0.16, 1, 0.3, 1');
    CustomEase.create('dramatic',  '0.87, 0, 0.13, 1');
    CustomEase.create('elastic',   '0.34, 1.56, 0.64, 1');
    registered = true;
  }
}

export { gsap, ScrollTrigger };
