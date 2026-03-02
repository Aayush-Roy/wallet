import { Redis } from '@upstash/redis'
import {Ratelimit} from "@upstash/ratelimit"
import "dotenv/config"
const ratelimit = new Ratelimit({
//   url: 'https://deep-guinea-56241.upstash.io',
//   token: 'AduxAAIncDI5N2EwNDVjZjViMDM0NmNmYmNkNjk5MDZiZGY4MWE1MXAyNTYyNDE',
     redis:Redis.fromEnv(),
     limiter:Ratelimit.slidingWindow(100,"60 s")
})
export default ratelimit;