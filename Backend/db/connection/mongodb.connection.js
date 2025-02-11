import mongoose from "mongoose";

export default async function () {
  await mongoose
    .connect(process.env.URL)
    .then(() => console.log(`Database connected ams_software`))
    .catch((err) => console.log(`Database connection error ${err.message}`));
}
