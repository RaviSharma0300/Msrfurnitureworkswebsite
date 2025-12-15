export type CategoryStructure = {
  id: string;
  name: string;
  subcategories: {
    name: string;
    items: string[];
  }[];
};

export const categoryStructure: CategoryStructure[] = [
  {
    id: 'living-room',
    name: 'Living Room Furniture',
    subcategories: [
      {
        name: 'Seating',
        items: [
          'Sofas (1-seater)',
          'Sofas (2-seater)',
          'Sofas (3-seater)',
          'L-Shaped Sofas',
          'Sofa Beds',
          'Recliners',
          'Accent Chairs',
          'Ottomans',
          'Bean Bags',
        ],
      },
      {
        name: 'Tables',
        items: [
          'Coffee Tables',
          'Side Tables',
          'End Tables',
          'Console Tables',
          'Nesting Tables',
        ],
      },
      {
        name: 'Entertainment',
        items: [
          'TV Units',
          'Media Consoles',
          'Wall-Mounted TV Panels',
        ],
      },
      {
        name: 'Storage',
        items: [
          'Shoe Racks',
          'Bookcases',
          'Display Cabinets',
          'Wall Shelves',
        ],
      },
    ],
  },
  {
    id: 'bedroom',
    name: 'Bedroom Furniture',
    subcategories: [
      {
        name: 'Beds',
        items: [
          'King Beds',
          'Queen Beds',
          'Single Beds',
          'Bunk Beds',
          "Kids' Beds",
          'Hydraulic Storage Beds',
          'Upholstered Beds',
        ],
      },
      {
        name: 'Storage',
        items: [
          'Wardrobes (Sliding)',
          'Wardrobes (Hinged)',
          'Walk-in Closets',
          'Chest of Drawers',
          'Bedside Tables',
          'Dressing Tables',
        ],
      },
      {
        name: 'Accessories',
        items: [
          'Mattresses',
          'Pillows',
          'Bed Benches',
        ],
      },
    ],
  },
  {
    id: 'dining-kitchen',
    name: 'Dining & Kitchen Furniture',
    subcategories: [
      {
        name: 'Dining',
        items: [
          'Dining Tables (4-seater)',
          'Dining Tables (6-seater)',
          'Dining Tables (8-seater)',
          'Dining Chairs',
          'Benches',
          'Bar Stools',
          'Crockery Units',
        ],
      },
      {
        name: 'Kitchen',
        items: [
          'Modular Cabinets',
          'Kitchen Islands',
          'Trolleys',
          'Pantry Units',
          'Wall Cabinets',
        ],
      },
    ],
  },
  {
    id: 'office-study',
    name: 'Office & Study Furniture',
    subcategories: [
      {
        name: 'Desks',
        items: [
          'Executive Desks',
          'Computer Tables',
          'Study Tables',
          'Standing Desks',
          'Reception Desks',
        ],
      },
      {
        name: 'Seating',
        items: [
          'Ergonomic Chairs',
          'Gaming Chairs',
          'Visitor Chairs',
          'Conference Tables',
        ],
      },
      {
        name: 'Storage',
        items: [
          'Filing Cabinets',
          'Office Pedestals',
          'Bookcases',
        ],
      },
    ],
  },
  {
    id: 'outdoor-garden',
    name: 'Outdoor & Garden Furniture',
    subcategories: [
      {
        name: 'Seating',
        items: [
          'Garden Chairs',
          'Patio Sets',
          'Outdoor Sofas',
          'Swings (Jhula)',
          'Loungers',
        ],
      },
      {
        name: 'Tables',
        items: [
          'Garden Tables',
          'Folding Tables',
        ],
      },
    ],
  },
  {
    id: 'commercial',
    name: 'Commercial & Institutional',
    subcategories: [
      {
        name: 'Restaurant/Cafe',
        items: [
          'Cafe Chairs',
          'Restaurant Tables',
          'Booth Seating',
          'Bar Counters',
        ],
      },
      {
        name: 'Hotel',
        items: [
          'Hotel Beds',
          'Lobby Seating',
          'Reception Desks',
          'Luggage Racks',
        ],
      },
      {
        name: 'Educational',
        items: [
          'Classroom Desks',
          'Student Chairs',
          'Library Shelves',
          'Auditorium Seating',
        ],
      },
    ],
  },
  {
    id: 'interior-decor',
    name: 'Interior & Decor Products',
    subcategories: [
      {
        name: 'Decor',
        items: [
          'Mirrors',
          'Wall Art',
          'Floor Lighting',
          'Table Lamps',
          'Wall Sconces',
        ],
      },
      {
        name: 'Soft Furnishings',
        items: [
          'Curtains',
          'Cushions',
          'Rugs',
          'Carpets',
        ],
      },
      {
        name: 'Renovation',
        items: [
          'Wallpapers',
          'Flooring',
          'False Ceiling',
          'Wall Panels',
        ],
      },
    ],
  },
];
