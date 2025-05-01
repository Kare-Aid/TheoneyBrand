import { TbCircuitResistor } from "react-icons/tb"
import { GrDiamond } from "react-icons/gr"
import { FiPenTool } from "react-icons/fi"
import { IconType } from "react-icons"

type Product = { id?: number; imageUrl: string; name: string; price: number }

export const products: Product[] = [
  {
    id: 4593,
    imageUrl: "/images/home/glasses/antiglare-1.jpg",
    name: "Simple antiglare",
    price: 7000,
  },
  {
    id: 23435,
    imageUrl: "/images/home/glasses/antiglare-2.jpg",
    name: "Simple antiglare",
    price: 7000,
  },
  {
    id: 26934,
    imageUrl: "/images/home/glasses/antiglare-3.jpg",
    name: "Simple antiglare",
    price: 7000,
  },
]

type Reason = { Icon: IconType; title: string; description: string }

export const reasonsForChoosingUs: Reason[] = [
  {
    Icon: TbCircuitResistor,
    title: "Scratch & Impact Resistant",
    description: "Built to last, from your sunglasses to your phone case.",
  },
  {
    Icon: GrDiamond,
    title: "Premium Materials",
    description: "Lightweight, durable, and made for comfort",
  },
  {
    Icon: FiPenTool,
    title: "Fashion-Forward Designs",
    description: "Stay ahead of the trends with sleek, modern styles.",
  },
  {
    Icon: GrDiamond,
    title: "AR Try-On",
    description: "See how it looks before you buy, with our interactive try-on feature.",
  },
]

export const featured = [
  "/images/home/featured/featured-client-1.png",
  "/images/home/featured/featured-client-2.png",
  "/images/home/featured/featured-client-3.png",
  "/images/home/featured/featured-client-4.png",
  "/images/home/featured/featured-client-5.png",
]

export const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

export const reviews = [
  {
    name: "Chi E",
    quote:
      "These glasses are perfect for me. I used them for my medicated glasses, and they help to block the sun rays.",
  },
  {
    name: "Amaka O",
    quote:
      "I love how these sunglasses fit over my prescription lenses. They provide excellent UV protection, making my outdoor walks much more comfortable.",
  },
  {
    name: "Tunde A",
    quote:
      "These shades are a game-changer! They reduce glare effectively and fit snugly over my regular glasses, offering both comfort and protection.",
  },
  {
    name: "Ngozi M",
    quote:
      "Stylish and functional! These sunglasses not only look great but also shield my eyes from harsh sunlight, even with my medicated lenses underneath.",
  },
  {
    name: "Emeka K",
    quote:
      "I've tried several over-the-glasses sunglasses, and these are by far the best. They block out the sun brilliantly and are comfortable for all-day wear.",
  },
]
