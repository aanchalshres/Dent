import fs from "fs";
import path from "path";
import { ProductSchema } from "./models/product.model.js";
import { UserSchema } from "./models/user.model.js";
import { ReviewSchema } from "./models/review.model.js";

const seedProducts = async () => {
  try {
    // Check if products collection already has data
    const existingProducts = await ProductSchema.countDocuments();
    if (existingProducts > 0) {
      console.log("✅ Products already exist. Skipping seeding.");
      return;
    }

    // Read JSON file
    const filePath = path.join(process.cwd(), "data", "products.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(data);

    // Insert data into MongoDB
    await ProductSchema.insertMany(products);
    console.log("✅ Data Seeded Successfully!");
  } catch (error) {
    console.error("❌ Error Seeding Data:", error);
    process.exit(1);
  }
};

async function seedAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await UserSchema.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
      console.log("✅ Admin user already exists. Skipping seeding");
      return;
    }

    // Create admin user
    const admin = await UserSchema.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "Admin@123", // 🔒 Make sure to hash passwords in production!
      role: "admin"
    });

    console.log("✅ Admin user created successfully:", admin.email);
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
  }
}

async function seedReviews() {
  try {
    const existingReviews = await ReviewSchema.find({});

    if(existingReviews.length > 0) {
      console.log("✅ Reviews already exists. Skipping seeding");
      return
    }

    const filePath = path.join(process.cwd(), "data", "reviews.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const reviews = JSON.parse(data);

    // Insert data into MongoDB
    await ReviewSchema.insertMany(reviews);
    console.log("✅ Reviews Seeded Successfully!");
  
  }catch(err){
    console.error("❌ Error seeding users reviews:", error);
    
  }
}

seedProducts();
seedAdmin();
seedReviews();
