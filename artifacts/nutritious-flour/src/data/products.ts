export type Category = "Baby Uji" | "Adult Uji" | "Cereals & Legumes" | "Other Commodities" | "Milling";

export interface Product {
  id: string;
  name: string;
  category: Category;
  priceNum: number | null;
  priceLabel: string;
  unit: string;
  description: string;
  badge?: string;
  isLegume?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "baby-uji",
    name: "Baby Uji Flour",
    category: "Baby Uji",
    priceNum: 200,
    priceLabel: "KSh 200",
    unit: "kg",
    description: "For children from 6 months+. Blended with sorghum, moringa, pumpkin & green bananas.",
    badge: "Best for babies",
  },
  {
    id: "adult-uji",
    name: "Adult Uji Unga",
    category: "Adult Uji",
    priceNum: 200,
    priceLabel: "KSh 200",
    unit: "kg",
    description: "Nutritious homemade uji flour. Packed with vitamins, minerals, and natural goodness.",
    badge: "Popular",
  },
  {
    id: "kamande",
    name: "Kamande",
    category: "Cereals & Legumes",
    priceNum: null,
    priceLabel: "Contact for price consultation",
    unit: "portion",
    description: "Quality kamande, freshly sourced and carefully sorted for your family.",
    isLegume: true,
  },
  {
    id: "njahi",
    name: "Njahi",
    category: "Cereals & Legumes",
    priceNum: null,
    priceLabel: "Contact for price consultation",
    unit: "portion",
    description: "Fresh njahi beans — a nutritious Kenyan staple, rich in protein and fibre.",
    isLegume: true,
  },
  {
    id: "ndengu",
    name: "Ndengu (nylon)",
    category: "Cereals & Legumes",
    priceNum: null,
    priceLabel: "Contact for price consultation",
    unit: "portion",
    description: "Clean, quality ndengu. Perfect for a quick and healthy family meal.",
    isLegume: true,
  },
  {
    id: "special-ndengu",
    name: "Special Ndengu",
    category: "Cereals & Legumes",
    priceNum: null,
    priceLabel: "Contact for price consultation",
    unit: "portion",
    description: "Premium special ndengu — carefully selected for superior quality.",
    isLegume: true,
  },
  {
    id: "army-beans",
    name: "Army Beans",
    category: "Cereals & Legumes",
    priceNum: null,
    priceLabel: "Contact for price consultation",
    unit: "portion",
    description: "Quality army beans. Availability confirmed on WhatsApp.",
    isLegume: true,
  },
  {
    id: "pishori",
    name: "Pure Pishori Rice",
    category: "Cereals & Legumes",
    priceNum: null,
    priceLabel: "KSh 160–180",
    unit: "kg",
    description: "The finest Pishori rice from Mwea — aromatic, clean, and premium quality.",
    badge: "Premium",
  },
  {
    id: "kwamboka",
    name: "Kwamboka Rice",
    category: "Cereals & Legumes",
    priceNum: null,
    priceLabel: "Contact for price",
    unit: "kg",
    description: "Quality Kwamboka rice. Ask us for current price and availability.",
  },
  {
    id: "honey",
    name: "Honey",
    category: "Other Commodities",
    priceNum: null,
    priceLabel: "Depends on size",
    unit: "jar",
    description: "Pure natural honey. Price depends on jar size — ask us for options.",
  },
  {
    id: "eggs",
    name: "Kienyeji Eggs",
    category: "Other Commodities",
    priceNum: null,
    priceLabel: "Contact for price",
    unit: "tray",
    description: "Fresh free-range kienyeji eggs. Contact us for current price.",
  },
  {
    id: "maize-milling",
    name: "Maize Milling",
    category: "Milling",
    priceNum: null,
    priceLabel: "Contact for price",
    unit: "service",
    description: "Bring your maize — we mill it fresh into fine unga. Clean equipment, fast service.",
  },
  {
    id: "rice-dehusking",
    name: "Rice Dehusking",
    category: "Milling",
    priceNum: null,
    priceLabel: "Contact for price",
    unit: "service",
    description: "Clean and efficient rice dehusking. Grain quality preserved throughout.",
  },
  {
    id: "uji-blending",
    name: "Custom Uji Blending",
    category: "Milling",
    priceNum: null,
    priceLabel: "Contact for price",
    unit: "service",
    description: "We blend uji to your specification — sorghum, millet, moringa and more.",
  },
];

export const BABY_UJI = PRODUCTS.filter(p => p.category === "Baby Uji");
export const ADULT_UJI = PRODUCTS.filter(p => p.category === "Adult Uji");
export const LEGUMES = PRODUCTS.filter(p => p.isLegume);
export const CEREALS_RICE = PRODUCTS.filter(p => p.category === "Cereals & Legumes" && !p.isLegume);
export const CEREALS_AND_LEGUMES = PRODUCTS.filter(p => p.category === "Cereals & Legumes");
export const OTHER_COMMODITIES = PRODUCTS.filter(p => p.category === "Other Commodities");
export const MILLING = PRODUCTS.filter(p => p.category === "Milling");
