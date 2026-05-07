/**
 * Seeds MongoDB with initial data
 * Run with: npx tsx server/seed-mongodb.ts
 * 
 * Automatically loads MONGODB_URI from .env file
 */

import { MongoClient } from "mongodb";
import { config } from "dotenv";

// Load environment variables from .env file
config();

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 100_000 },
    key,
    256,
  );
  const hashHex = Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${saltHex}:${hashHex}`;
}

async function seedDatabase() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const email = process.argv[2] ?? "admin@sjtcoaches.co.uk";
  const password = process.argv[3] ?? "ChangeMe123!";

  console.log(`\nConnecting to MongoDB at: ${mongoUri}`);
  
  const client = new MongoClient(mongoUri);
  
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    
    const db = client.db("albion_coach");
    
    // Seed admin credentials
    const hash = await hashPassword(password);
    await db.collection("admin_credentials").deleteMany({});
    await db.collection("admin_credentials").insertOne({
      email,
      password_hash: hash,
    });
    
    console.log(`\n✓ Admin credentials seeded`);
    console.log(`  Email:    ${email}`);
    console.log(`  Password: ${password}`);
    
    // Seed fleet data
    const fleetSeedData = [
      { id: "royal-suite", img: "/src/assets/fleet-executive.jpg", range: "From £640 / day" },
      { id: "v-class-prive", img: "/src/assets/fleet-minibus.jpg", range: "From £280 / day" },
      { id: "setra-touring", img: "/src/assets/fleet-coach.jpg", range: "From £960 / day" },
      { id: "phantom-saloon", img: "/src/assets/fleet-phantom.jpg", range: "From £1,200 / day" },
      { id: "bentayga-suv", img: "/src/assets/fleet-bentayga.jpg", range: "From £780 / day" },
      { id: "tourismo-midi", img: "/src/assets/fleet-tourismo.jpg", range: "From £720 / day" },
      { id: "double-decker-thames", img: "/src/assets/fleet-double-decker.jpg", range: "From £1,450 / day" },
      { id: "lumiere-electric", img: "/src/assets/fleet-electric.jpg", range: "From £880 / day" },
      { id: "concorde-shuttle", img: "/src/assets/fleet-shuttle.jpg", range: "From £360 / day" },
      { id: "claridge-heritage", img: "/src/assets/fleet-heritage.jpg", range: "From £1,100 / day" },
      { id: "highland-sleeper", img: "/src/assets/fleet-sleeper.jpg", range: "From £1,380 / day" },
    ];
    
    await db.collection("fleet").deleteMany({});
    await db.collection("fleet").insertMany(fleetSeedData);
    
    console.log(`\n✓ Fleet data seeded (${fleetSeedData.length} vehicles)`);
    
    // Seed blog posts
    const blogSeedData = [
      {
        title: "The Art of Luxury Coach Travel",
        slug: "art-of-luxury-coach-travel",
        excerpt: "Discover what makes luxury coach travel truly exceptional and why discerning clients choose SJT Coaches for their journeys across the UK.",
        content: "Luxury coach travel represents the pinnacle of group transportation, combining comfort, style, and practicality in ways that few other modes of transport can match. At SJT Coaches, we've spent years perfecting the art of luxury travel, ensuring every journey is an experience to remember.\n\nOur fleet features state-of-the-art vehicles equipped with premium amenities including leather seating, climate control, entertainment systems, and complimentary refreshments. Each coach is meticulously maintained and presented to the highest standards.\n\nWhether you're planning a corporate event, wedding transportation, or a touring holiday, our experienced team works closely with you to create a bespoke travel experience that exceeds expectations.",
        featured_image: "/src/assets/journal-interiors.jpg",
        author: "SJT Coaches",
        published: true,
        created_at: new Date("2026-04-15"),
        updated_at: new Date("2026-04-15"),
      },
      {
        title: "Scottish Highlands: A Touring Guide",
        slug: "scottish-highlands-touring-guide",
        excerpt: "Explore the breathtaking landscapes of the Scottish Highlands with our comprehensive touring guide for luxury coach travel.",
        content: "The Scottish Highlands offer some of the most spectacular scenery in the United Kingdom, making it an ideal destination for luxury coach tours. From the dramatic peaks of Ben Nevis to the serene waters of Loch Ness, every mile reveals new wonders.\n\nOur recommended Highland tour includes stops at historic castles, traditional distilleries, and charming villages. The journey takes you through Glen Coe, along the shores of Loch Lomond, and into the heart of the Cairngorms National Park.\n\nTraveling by luxury coach allows your group to relax and enjoy the scenery without the stress of navigation or parking. Our experienced drivers know the best routes and hidden gems, ensuring you experience the Highlands at their finest.",
        featured_image: "/src/assets/journal-highlands.jpg",
        author: "SJT Coaches",
        published: true,
        created_at: new Date("2026-04-10"),
        updated_at: new Date("2026-04-10"),
      },
      {
        title: "Wedding Transportation: Planning Guide",
        slug: "wedding-transportation-planning",
        excerpt: "Everything you need to know about planning luxury coach transportation for your wedding day, from guest shuttles to bridal party travel.",
        content: "Your wedding day deserves transportation that matches the elegance and importance of the occasion. Luxury coach hire offers a practical and stylish solution for moving guests between venues, ensuring everyone arrives on time and in comfort.\n\nKey considerations include timing your shuttle service, coordinating with your venue, and selecting the right vehicle size for your guest list. Our wedding specialists work with you to create a seamless transportation plan that complements your day.\n\nMany couples choose to provide coach transportation as a thoughtful gesture for their guests, eliminating parking concerns and allowing everyone to enjoy the celebration fully. Our pristine vehicles and professional chauffeurs ensure your wedding transportation is as memorable as the day itself.",
        featured_image: "/src/assets/journal-wedding.jpg",
        author: "SJT Coaches",
        published: false,
        created_at: new Date("2026-04-05"),
        updated_at: new Date("2026-04-05"),
      },
      {
        title: "Corporate Travel: Executive Coach Services",
        slug: "corporate-executive-coach-services",
        excerpt: "How luxury coach services enhance corporate events, conferences, and business travel with professional, reliable transportation.",
        content: "Corporate events demand transportation that reflects your company's professionalism and attention to detail. Executive coach services provide a sophisticated solution for conferences, team building events, and client entertainment.\n\nOur corporate clients appreciate the reliability, comfort, and image that luxury coach travel provides. Features like WiFi connectivity, power outlets, and conference-style seating allow productive travel time, while our punctual service ensures your schedule runs smoothly.\n\nFrom airport transfers to multi-day conferences, we understand the unique requirements of corporate travel. Our account management team provides dedicated support, ensuring every detail is handled with precision and professionalism.",
        featured_image: "/src/assets/service-corporate.jpg",
        author: "SJT Coaches",
        published: true,
        created_at: new Date("2026-03-28"),
        updated_at: new Date("2026-03-28"),
      },
    ];
    
    await db.collection("blog_posts").deleteMany({});
    await db.collection("blog_posts").insertMany(blogSeedData);
    
    console.log(`\n✓ Blog posts seeded (${blogSeedData.length} articles)`);
    
    // Create indexes for better performance
    await db.collection("contact_messages").createIndex({ created_at: -1 });
    await db.collection("bookings").createIndex({ created_at: -1 });
    await db.collection("bookings").createIndex({ status: 1 });
    await db.collection("fleet").createIndex({ id: 1 }, { unique: true });
    await db.collection("blog_posts").createIndex({ created_at: -1 });
    await db.collection("blog_posts").createIndex({ slug: 1 }, { unique: true });
    await db.collection("blog_posts").createIndex({ published: 1 });
    
    console.log(`\n✓ Indexes created`);
    console.log(`\nDatabase seeding completed successfully!\n`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase();
