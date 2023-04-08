import { v2 } from "cloudinary";
import { CLOUDINARY } from "./constants";
import * as config from "config"

const cloudinaryConfig = config.get("cloudinaryConfig")

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: ()  => {
    return v2.config({
      cloud_name:cloudinaryConfig.CLOUD_NAME,
      api_key: cloudinaryConfig.CLOUD_APIKEY,
      api_secret:cloudinaryConfig.CLOUD_APISECRET,
    });
  },
};
