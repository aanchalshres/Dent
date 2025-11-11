import fs from "fs";
import path from "path";
import { ProductSchema } from "./models/product.model.js";
import { connectDB } from "./lib/connection.js";
import { UserSchema } from "./models/user.model.js";


// Connect to DB
connectDB();

const seedProducts = async () => {
  try {
    // Check if products collection already has data
    const existingProducts = await ProductSchema.countDocuments();
    if (existingProducts > 0) {
      console.log("Products already exist. Skipping seeding.");
      process.exit();
    }

    // Read JSON file
    const filePath = path.join(process.cwd(), "data", "products.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(data);

    // Insert data into MongoDB
    await ProductSchema.insertMany(products);
    console.log("Data Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error Seeding Data:", error);
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

seedProducts();
seedAdmin()

