import express  from "express";
import * as ad from "../controllers/ad.js";
import { requireSignin } from "../middlewares/auth.js";


const router = express.Router();

router.post("/create", requireSignin, ad.create);
router.get("/ads", ad.ads);
router.get("/ad/:slug", ad.read);

router.get("/wishlist", requireSignin, ad.wishlist);
router.post("/wishlist", requireSignin, ad.addToWishlist);
router.delete("/wishlist/:adId", requireSignin, ad.removeFromWishlist);

router.get("/user-ads/:page", requireSignin, ad.userAds);
router.put("/adupdate/:_id", requireSignin, ad.update);
router.delete("/ad/:_id", requireSignin, ad.remove);

router.get("/ads-for-sell/:page",ad.adsForSell);
router.get("/ads-for-rent/:page",ad.adsForRent);
router.get("/search", ad.search);



export default router;
