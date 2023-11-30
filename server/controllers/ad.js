import slugify from "slugify";
import Ad from "../models/ad.js";
import User from "../models/user.js";
import { nanoid } from "nanoid";
import axios from "axios";

export const create = async (req, res) => {
  try {
    // console.log(req.body);
    const {
      photos,
      description,
      title,
      address,
      price,
      type,
      landsize,
      city,
      country,
    } = req.body;
    const search = address + " " + city + " " + country;
    const { data } = await axios.get("https://geocode.maps.co/search", {
      params: { q: search},
    });
    console.log({ lat: data[0]?.lat, lon: data[0]?.lon });

    if (!photos.length) {
      return res.json({ error: "Photos are required" });
    }
    if (!price) {
      return res.json({ error: "Price is required" });
    }
    if (!type) {
      return res.json({ error: "Is property house or land?" });
    }
    if (!address) {
      return res.json({ error: "Address is required" });
    }
    if (!city) {
      return res.json({ error: "City is required" });
    }
    if (!country) {
      return res.json({ error: "Country is required" });
    }
    if (!description) {
      return res.json({ error: "Description is  required" });
    }
    if (!title) {
      return res.json({ error: "Title is  required" });
    }
    const ad = await new Ad({
      ...req.body,
      postedBy: req.user._id,
      slug: slugify(`${type}-${address}-${price}-${nanoid(6)}`),
      lat: data ? data[0]?.lat : "",
      lng: data ? data[0]?.lon : "",
      search,
    }).save();

    //make user role seller
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { role: "Seller" },
      },
      { new: true }
    );

    user.password = undefined;
    user.resetCode = undefined;

    res.json({
      ad,
      user,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong." });
  }
};

export const ads = async (req, res) => {
  try {
    const adsForSell = await Ad.find({ action: "Sell" })
      .select("-photos.key")
      .sort({ createdAt: -1 })
      .limit(12);

    const adsForRent = await Ad.find({ action: "Rent" })
      .select("-photos.key")
      .sort({ createdAt: -1 })
      .limit(12);

    res.json({ adsForSell, adsForRent });
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const ad = await Ad.findOne({ slug: req.params.slug }).populate(
      "postedBy",
      "name username email phone company photo.Location"
    );
    // console.log(ad);

    // related
    const related = await Ad.find({
      _id: { $ne: ad._id },
      action: ad.action,
      type: ad.type,
      city: ad.city,
    })
      .limit(3)
      .select("-photos.key");

    res.json({ ad, related });
  } catch (err) {
    console.log(err);
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { wishlist: req.body.adId },
      },
      { new: true }
    );
    const { password, resetCode, ...rest } = user._doc;
    res.json(rest);
  } catch (err) {
    console.log(err);
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { wishlist: req.params.adId },
      },
      { new: true }
    );
    const { password, resetCode, ...rest } = user._doc;
    res.json(rest);
  } catch (err) {
    console.log(err);
  }
};

export const userAds = async (req, res) => {
  try {
    const perPage = 5; // change as required
    const page = req.params.page ? req.params.page : 1;

    const total = await Ad.find({
      postedBy: req.user._id,
    });

    const ads = await Ad.find({ postedBy: req.user._id })
      .populate("postedBy", "name username email phone company")
      .skip((page - 1) * perPage)
      .sort({ createdAt: -1 })
      .limit(perPage);
    res.json({ ads, total: total?.length });
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    // console.log("req.body update => ", req.body);
    const { photos, price, type, address, description, city, country, } = req.body;

    const ad = await Ad.findById(req.params._id);
    const owner = req.user._id == ad?.postedBy;
    if (!owner) {
      return res.json({ error: "Permission denied" });
    } else {
      //validation
      if (!photos?.length) {
        return res.json({ error: "Photos are required" });
      }
      if (!price) {
        return res.json({ error: "Price is required" });
      }
      if (!type) {
        return res.json({ error: "Is property house or land?" });
      }
      if (!address) {
        return res.json({ error: "Address is required" });
      }
      if (!city) {
        return res.json({ error: "City is required" });
      }
      if (!country) {
        return res.json({ error: "Country is required" });
      }
      if (!description) {
        return res.json({ error: "Description is required" });
      }

      const { data } = await axios.get("https://geocode.maps.co/search", {
      params: { q: address + ", " + city + ", " + country },
      });

        // Use findOneAndUpdate to update the document
        await Ad.findOneAndUpdate(
          { _id: req.params._id },
          {
            ...req.body,
            postedBy: req.user._id,
            slug: ad.slug,
            lat: data[0]?.lat || "",
            lng: data[0]?.lon || "",
            search: ad.search,
          }
        );

        res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
  }
};

export const wishlist = async (req,res) => {
  try{
    const user = await User.findById(req.user._id);
    const ads = await Ad.find({_id: user.wishlist}).sort({createdAt:-1,});
    res.json(ads);
  }catch(err){
    console.log(err);
  }
};

export const remove = async (req,res) => {
  try{
    const ad = await Ad.findById(req.params._id);
    const owner = req.user._id == ad?.postedBy;

    if(!owner) {
      return res.json({error: "permission denied"});
    }else{
      await Ad.findByIdAndDelete(ad._id);
      res.json({ok:true});
    }
  }catch(err){
    console.log(err);
  }
};

export const adsForSell = async (req, res) => {
  try {
    const perPage = 5; // change as required
    const page = req.params.page ? req.params.page : 1;

    const total = await Ad.find({action: "Sell"});

    const ads = await Ad.find({action: "Sell"})
      .select("-photos.key")
      .skip((page - 1) * perPage)
      .sort({ createdAt: -1 })
      .limit(perPage);
    res.json({ ads, total: total?.length });
  } catch (err) {
    console.log(err);
  }
};

export const adsForRent = async (req, res) => {
  try {
    const perPage = 5; // change as required
    const page = req.params.page ? req.params.page : 1;

    const total = await Ad.find({action: "Rent"});

    const ads = await Ad.find({action: "Rent"})
      .select("-photos.key")
      .skip((page - 1) * perPage)
      .sort({ createdAt: -1 })
      .limit(perPage);
    res.json({ ads, total: total?.length });
  } catch (err) {
    console.log(err);
  }
};

export const search = async (req,res) => {
  try{
    // console.log(req.query);
    const {action, address, type, priceRange} = req.query;

    const ads = await Ad.find({
      action: action === "Buy" ? "Sell" : "Rent",
      type,
      price: {
        $gte: parseInt(priceRange[0]),
        $lte: parseInt(priceRange[1]),
      },
      search: { $regex: address, $options: "i"},
    }).limit(24)
    .sort({createdAt: -1})
    .select("-photos.key");

    res.json(ads);
  }catch(err){
    console.log(err);
  }
}
