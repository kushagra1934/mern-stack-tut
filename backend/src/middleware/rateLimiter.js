import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

  //rate limiting can be done per user, but here as we dont have auth we dont use it, instead use my-limit-key
  try {
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many request, please try again later." });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
