import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", port: "" }],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
