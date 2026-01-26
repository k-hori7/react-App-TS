/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bubmqrhqptqkgttcgpkk.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      { protocol: "https", hostname: "images.microcms-assets.io" }, // これを追加
    ],
  },
};
export default nextConfig;
