/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
        // minimumCacheTTL: 0,
        domains: ["img.nextpax.com", "assets.guesty.com", "dwe6atvmvow8k.cloudfront.net", "golf-home.s3.us-east-1.amazonaws.com"],
        minimumCacheTTL: 0,
    },
}

module.exports = nextConfig
