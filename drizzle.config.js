/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://metadb_owner:ZsygpJT52Ieb@ep-billowing-frost-a5xqfxwz.us-east-2.aws.neon.tech/metadb?sslmode=require',
    }
  };
  