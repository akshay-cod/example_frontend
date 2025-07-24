export const sitemap = {
  pages: [
    {
      url: "/",
      title: "Homepage",
      description: "Main landing page with hero, categories, featured cards, and benefits",
      priority: 1.0,
      changeFreq: "daily"
    },
    {
      url: "/explore",
      title: "Explore Gift Cards",
      description: "Browse all available gift cards with filters for country, category, and brand",
      priority: 0.9,
      changeFreq: "hourly"
    },
    {
      url: "/categories",
      title: "Categories",
      description: "View gift cards organized by categories like Gaming, Streaming, Retail, etc.",
      priority: 0.8,
      changeFreq: "weekly"
    },
    {
      url: "/countries",
      title: "Countries",
      description: "Browse gift cards by country with local currency pricing",
      priority: 0.8,
      changeFreq: "weekly"
    },
    {
      url: "/about",
      title: "About Us",
      description: "Learn about our mission to provide transparent gift card pricing",
      priority: 0.6,
      changeFreq: "monthly"
    },
    {
      url: "/faq",
      title: "FAQ",
      description: "Frequently asked questions about gift cards, pricing, and support",
      priority: 0.7,
      changeFreq: "weekly"
    },
    {
      url: "/contact",
      title: "Contact Support",
      description: "Get help from our 24/7 customer support team",
      priority: 0.6,
      changeFreq: "monthly"
    },
    {
      url: "/privacy",
      title: "Privacy Policy",
      description: "How we protect and handle your personal information",
      priority: 0.4,
      changeFreq: "yearly"
    },
    {
      url: "/terms",
      title: "Terms of Service",
      description: "Terms and conditions for using our gift card platform",
      priority: 0.4,
      changeFreq: "yearly"
    }
  ],
  dynamicPages: [
    {
      pattern: "/card/[brand]-[country]",
      title: "Gift Card Details",
      description: "Detailed page for each gift card with pricing and purchase options",
      priority: 0.8,
      changeFreq: "daily"
    },
    {
      pattern: "/category/[categoryName]",
      title: "Category Page",
      description: "Gift cards filtered by specific category",
      priority: 0.7,
      changeFreq: "daily"
    },
    {
      pattern: "/country/[countryName]",
      title: "Country Page", 
      description: "Gift cards available for specific country",
      priority: 0.7,
      changeFreq: "daily"
    }
  ]
};

export const navigationStructure = {
  header: [
    { label: "Home", href: "/", icon: "Home" },
    { label: "Explore", href: "/explore", icon: "Search" },
    { label: "About", href: "/about", icon: "Info" },
    { label: "Support", href: "/support", icon: "HelpCircle" }
  ],
  footer: {
    quickLinks: [
      { label: "Browse Cards", href: "/explore" },
      { label: "Categories", href: "/categories" },
      { label: "Countries", href: "/countries" },
      { label: "New Arrivals", href: "/new" },
      { label: "Popular Cards", href: "/popular" }
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Refund Policy", href: "/refunds" },
      { label: "Terms of Service", href: "/terms" }
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" }
    ]
  }
};