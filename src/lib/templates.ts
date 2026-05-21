import { Template, FilterState, Category } from '@/types'

export const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: 'birthday', label: 'Birthday', icon: '🎂' },
  { value: 'wedding', label: 'Wedding', icon: '💍' },
  { value: 'baby', label: 'Baby & Kids', icon: '👶' },
  { value: 'party', label: 'Party', icon: '🎉' },
  { value: 'greeting', label: 'Greeting Cards', icon: '💌' },
  { value: 'holiday', label: 'Holiday', icon: '🎄' },
  { value: 'anniversary', label: 'Anniversary', icon: '❤️' },
  { value: 'graduation', label: 'Graduation', icon: '🎓' },
]

export const SUBCATEGORIES: Record<Category, string[]> = {
  birthday: ['Kids', '1st Birthday', '16th', '18th', '21st', '30th', '40th', '50th', '60th', 'Milestone'],
  wedding: ['Save the Date', 'Ceremony', 'Reception', 'Engagement', 'Bridal Shower', 'RSVP Card'],
  baby: ['Baby Shower', 'Gender Reveal', 'Baptism', 'First Communion', 'Birth Announcement'],
  party: ['Graduation', 'Housewarming', 'Pool Party', 'BBQ', 'Retirement', 'Farewell'],
  greeting: ['Thank You', 'Sympathy', 'Get Well', 'Congratulations', 'Just Because'],
  holiday: ['Christmas', 'New Year', 'Easter', 'Halloween', 'Thanksgiving', 'Valentines'],
  anniversary: ['1st Year', '5th Year', '10th Year', '25th Year', '50th Year'],
  graduation: ['High School', 'College', 'Masters', 'PhD'],
}

export const COLORS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Purple', value: '#a855f7' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Brown', value: '#92400e' },
  { name: 'Black', value: '#171717' },
  { name: 'White', value: '#fafafa' },
  { name: 'Gold', value: '#ca8a04' },
]

export const SAMPLE_TEMPLATES: Template[] = [
  {
    id: '1',
    title: 'Rose Gold Birthday',
    category: 'birthday',
    subcategory: '30th',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 700,
      background: '#1a0a0e',
      elements: [
        // Deep dark bg
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 700, fill: '#1a0a0e' },
        // Top rose gold band
        { id: 'top-band', type: 'rect', x: 0, y: 0, width: 500, height: 8, fill: '#c9846a' },
        // Bottom rose gold band
        { id: 'bot-band', type: 'rect', x: 0, y: 692, width: 500, height: 8, fill: '#c9846a' },
        // Outer border
        { id: 'border-outer', type: 'rect', x: 18, y: 18, width: 464, height: 664, fill: 'transparent', stroke: '#c9846a', strokeWidth: 1.5 },
        // Inner border
        { id: 'border-inner', type: 'rect', x: 28, y: 28, width: 444, height: 644, fill: 'transparent', stroke: '#c9846a', strokeWidth: 0.5 },
        // Top decorative circles
        { id: 'circ-tl', type: 'circle', x: -40, y: -40, width: 140, height: 140, fill: '#3d1a22' },
        { id: 'circ-tr', type: 'circle', x: 400, y: -40, width: 140, height: 140, fill: '#3d1a22' },
        // Bottom decorative circles
        { id: 'circ-bl', type: 'circle', x: -40, y: 600, width: 140, height: 140, fill: '#3d1a22' },
        { id: 'circ-br', type: 'circle', x: 400, y: 600, width: 140, height: 140, fill: '#3d1a22' },
        // Diamond accent top
        { id: 'diamond-top', type: 'text', text: '◆', x: 50, y: 50, width: 400, fontSize: 14, fontFamily: 'Arial', fill: '#c9846a', align: 'center' },
        // Tagline
        { id: 'tagline', type: 'text', text: 'YOU ARE INVITED', x: 50, y: 90, width: 400, fontSize: 12, fontFamily: 'Arial', fill: '#c9846a', align: 'center', fontStyle: 'bold' },
        // Decorative line top
        { id: 'line-t1', type: 'rect', x: 80, y: 118, width: 140, height: 1, fill: '#c9846a' },
        { id: 'line-t2', type: 'rect', x: 280, y: 118, width: 140, height: 1, fill: '#c9846a' },
        { id: 'dot-t', type: 'circle', x: 243, y: 113, width: 12, height: 12, fill: '#c9846a' },
        // Main title
        { id: 'title', type: 'text', text: "Sarah's", x: 50, y: 148, width: 400, fontSize: 52, fontFamily: 'Georgia', fill: '#f5e6df', align: 'center', fontStyle: 'italic' },
        { id: 'age', type: 'text', text: '30th', x: 50, y: 215, width: 400, fontSize: 88, fontFamily: 'Georgia', fill: '#c9846a', align: 'center', fontStyle: 'bold' },
        { id: 'birthday', type: 'text', text: 'BIRTHDAY', x: 50, y: 318, width: 400, fontSize: 28, fontFamily: 'Arial', fill: '#f5e6df', align: 'center', fontStyle: 'bold' },
        // Center divider
        { id: 'div-l', type: 'rect', x: 60, y: 368, width: 160, height: 1, fill: '#c9846a' },
        { id: 'div-r', type: 'rect', x: 280, y: 368, width: 160, height: 1, fill: '#c9846a' },
        { id: 'div-dia', type: 'text', text: '◆', x: 50, y: 352, width: 400, fontSize: 18, fontFamily: 'Arial', fill: '#c9846a', align: 'center' },
        // Event details block
        { id: 'det-bg', type: 'rect', x: 60, y: 395, width: 380, height: 170, fill: '#2d0f18', cornerRadius: 4 },
        { id: 'date', type: 'text', text: 'Saturday, June 15, 2025', x: 70, y: 415, width: 360, fontSize: 17, fontFamily: 'Georgia', fill: '#c9846a', align: 'center' },
        { id: 'time', type: 'text', text: '7:00 PM', x: 70, y: 450, width: 360, fontSize: 15, fontFamily: 'Arial', fill: '#f5e6df', align: 'center' },
        { id: 'sep', type: 'rect', x: 180, y: 478, width: 140, height: 1, fill: '#c9846a' },
        { id: 'location', type: 'text', text: 'The Grand Terrace', x: 70, y: 492, width: 360, fontSize: 16, fontFamily: 'Georgia', fill: '#f5e6df', align: 'center' },
        { id: 'address', type: 'text', text: '123 Garden Lane, Amsterdam', x: 70, y: 520, width: 360, fontSize: 13, fontFamily: 'Arial', fill: '#9d7060', align: 'center' },
        // RSVP
        { id: 'rsvp', type: 'text', text: 'RSVP by June 1  ·  sarah@email.com', x: 50, y: 600, width: 400, fontSize: 12, fontFamily: 'Arial', fill: '#9d7060', align: 'center' },
        // Diamond bottom
        { id: 'diamond-bot', type: 'text', text: '◆', x: 50, y: 638, width: 400, fontSize: 14, fontFamily: 'Arial', fill: '#c9846a', align: 'center' },
      ],
    },
    tags: ['luxury', 'dark', 'rose gold', 'elegant', 'adult'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#1a0a0e', '#c9846a', '#f5e6df'],
    downloads: 2840,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Botanical Wedding',
    category: 'wedding',
    subcategory: 'Ceremony',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 700,
      background: '#f7f3ee',
      elements: [
        // Warm ivory bg
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 700, fill: '#f7f3ee' },
        // Sage green top bar
        { id: 'bar-top', type: 'rect', x: 0, y: 0, width: 500, height: 140, fill: '#4a5e45' },
        // Cream inner top
        { id: 'inner-top', type: 'rect', x: 30, y: 16, width: 440, height: 108, fill: '#f7f3ee' },
        // Leaf decorations (circles as blobs)
        { id: 'leaf-tl1', type: 'circle', x: -20, y: -20, width: 100, height: 100, fill: '#3d5239' },
        { id: 'leaf-tl2', type: 'circle', x: 10, y: 5, width: 70, height: 70, fill: '#5a7355' },
        { id: 'leaf-tr1', type: 'circle', x: 420, y: -20, width: 100, height: 100, fill: '#3d5239' },
        { id: 'leaf-tr2', type: 'circle', x: 420, y: 10, width: 70, height: 70, fill: '#5a7355' },
        // Couple names in top frame
        { id: 'names', type: 'text', text: 'Emma & Thomas', x: 40, y: 30, width: 420, fontSize: 42, fontFamily: 'Georgia', fill: '#4a5e45', align: 'center', fontStyle: 'italic' },
        { id: 'married', type: 'text', text: 'are getting married', x: 40, y: 86, width: 420, fontSize: 15, fontFamily: 'Georgia', fill: '#7a9175', align: 'center', fontStyle: 'italic' },
        // Bottom half leaf clusters
        { id: 'leaf-bl1', type: 'circle', x: -30, y: 590, width: 120, height: 120, fill: '#4a5e45' },
        { id: 'leaf-bl2', type: 'circle', x: 5, y: 620, width: 90, height: 90, fill: '#5a7355' },
        { id: 'leaf-br1', type: 'circle', x: 410, y: 590, width: 120, height: 120, fill: '#4a5e45' },
        { id: 'leaf-br2', type: 'circle', x: 405, y: 625, width: 90, height: 90, fill: '#5a7355' },
        // Together line
        { id: 'together', type: 'text', text: 'Together with their families', x: 50, y: 175, width: 400, fontSize: 15, fontFamily: 'Georgia', fill: '#8a7e72', align: 'center', fontStyle: 'italic' },
        // Main request
        { id: 'request', type: 'text', text: 'joyfully request the honour\nof your presence', x: 50, y: 210, width: 400, fontSize: 18, fontFamily: 'Georgia', fill: '#4a3f36', align: 'center', fontStyle: 'italic' },
        // Divider
        { id: 'div-l', type: 'rect', x: 70, y: 288, width: 130, height: 1, fill: '#c4b49a' },
        { id: 'div-r', type: 'rect', x: 300, y: 288, width: 130, height: 1, fill: '#c4b49a' },
        { id: 'div-leaf', type: 'text', text: '✿', x: 50, y: 270, width: 400, fontSize: 20, fontFamily: 'Arial', fill: '#7a9175', align: 'center' },
        // Date block
        { id: 'date-label', type: 'text', text: 'CEREMONY', x: 50, y: 316, width: 400, fontSize: 11, fontFamily: 'Arial', fill: '#9a8e83', align: 'center', fontStyle: 'bold' },
        { id: 'date', type: 'text', text: 'Saturday, September 20', x: 50, y: 342, width: 400, fontSize: 26, fontFamily: 'Georgia', fill: '#2c2520', align: 'center' },
        { id: 'year', type: 'text', text: '2025', x: 50, y: 382, width: 400, fontSize: 22, fontFamily: 'Georgia', fill: '#7a9175', align: 'center' },
        // Time
        { id: 'at', type: 'text', text: 'at', x: 50, y: 416, width: 400, fontSize: 15, fontFamily: 'Georgia', fill: '#9a8e83', align: 'center', fontStyle: 'italic' },
        { id: 'time', type: 'text', text: 'Two O\'clock in the afternoon', x: 50, y: 442, width: 400, fontSize: 17, fontFamily: 'Georgia', fill: '#2c2520', align: 'center', fontStyle: 'italic' },
        // Venue block
        { id: 'venue-bg', type: 'rect', x: 80, y: 478, width: 340, height: 80, fill: '#4a5e45', cornerRadius: 4 },
        { id: 'venue', type: 'text', text: 'The Grand Ballroom', x: 90, y: 494, width: 320, fontSize: 18, fontFamily: 'Georgia', fill: '#f7f3ee', align: 'center' },
        { id: 'venue-city', type: 'text', text: 'Prinsengracht 123 · Amsterdam', x: 90, y: 526, width: 320, fontSize: 13, fontFamily: 'Arial', fill: '#b8cfb5', align: 'center' },
        // RSVP footer
        { id: 'rsvp', type: 'text', text: 'Kindly respond by September 1', x: 50, y: 594, width: 400, fontSize: 13, fontFamily: 'Georgia', fill: '#9a8e83', align: 'center', fontStyle: 'italic' },
      ],
    },
    tags: ['botanical', 'green', 'elegant', 'nature', 'wedding'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#f7f3ee', '#4a5e45', '#c4b49a'],
    downloads: 3640,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Confetti Kids Party',
    category: 'birthday',
    subcategory: 'Kids',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 600,
      background: '#ffffff',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 600, fill: '#ffffff' },
        // Colorful confetti blobs
        { id: 'c1', type: 'circle', x: 20, y: 20, width: 60, height: 60, fill: '#fbbf24' },
        { id: 'c2', type: 'circle', x: 420, y: 10, width: 80, height: 80, fill: '#f472b6' },
        { id: 'c3', type: 'circle', x: -10, y: 200, width: 70, height: 70, fill: '#34d399' },
        { id: 'c4', type: 'circle', x: 430, y: 250, width: 60, height: 60, fill: '#60a5fa' },
        { id: 'c5', type: 'circle', x: 30, y: 490, width: 90, height: 90, fill: '#a78bfa' },
        { id: 'c6', type: 'circle', x: 410, y: 480, width: 70, height: 70, fill: '#fb923c' },
        { id: 'c7', type: 'circle', x: 180, y: -10, width: 50, height: 50, fill: '#f87171' },
        { id: 'c8', type: 'circle', x: 310, y: 540, width: 55, height: 55, fill: '#4ade80' },
        // Small dots
        { id: 'd1', type: 'circle', x: 100, y: 30, width: 20, height: 20, fill: '#f472b6' },
        { id: 'd2', type: 'circle', x: 370, y: 50, width: 15, height: 15, fill: '#fbbf24' },
        { id: 'd3', type: 'circle', x: 460, y: 180, width: 18, height: 18, fill: '#34d399' },
        { id: 'd4', type: 'circle', x: 10, y: 380, width: 16, height: 16, fill: '#60a5fa' },
        // White card area
        { id: 'card', type: 'rect', x: 50, y: 80, width: 400, height: 440, fill: '#ffffff', cornerRadius: 20, stroke: '#f3f4f6', strokeWidth: 1 },
        // Party hat emoji row
        { id: 'hats', type: 'text', text: '🎈  🎉  🎈', x: 60, y: 100, width: 380, fontSize: 32, fontFamily: 'Arial', fill: '#000000', align: 'center' },
        // Main headline
        { id: 'headline', type: 'text', text: "It's a", x: 60, y: 164, width: 380, fontSize: 28, fontFamily: 'Georgia', fill: '#6b7280', align: 'center', fontStyle: 'italic' },
        { id: 'party', type: 'text', text: 'BIRTHDAY', x: 60, y: 200, width: 380, fontSize: 54, fontFamily: 'Arial', fill: '#1f2937', align: 'center', fontStyle: 'bold' },
        { id: 'party2', type: 'text', text: 'PARTY!', x: 60, y: 264, width: 380, fontSize: 54, fontFamily: 'Arial', fill: '#f472b6', align: 'center', fontStyle: 'bold' },
        // Name chip
        { id: 'name-bg', type: 'rect', x: 120, y: 332, width: 260, height: 46, fill: '#fbbf24', cornerRadius: 23 },
        { id: 'name', type: 'text', text: "Liam is turning 5!", x: 130, y: 342, width: 240, fontSize: 17, fontFamily: 'Arial', fill: '#1c1917', align: 'center', fontStyle: 'bold' },
        // Divider dots
        { id: 'dots', type: 'text', text: '· · · · · · ·', x: 60, y: 396, width: 380, fontSize: 16, fontFamily: 'Arial', fill: '#d1d5db', align: 'center' },
        // Details
        { id: 'date', type: 'text', text: 'Saturday, May 10 · 3 – 6 PM', x: 60, y: 424, width: 380, fontSize: 16, fontFamily: 'Arial', fill: '#374151', align: 'center' },
        { id: 'venue', type: 'text', text: '12 Sunshine Street, Amsterdam', x: 60, y: 454, width: 380, fontSize: 14, fontFamily: 'Arial', fill: '#6b7280', align: 'center' },
        { id: 'rsvp', type: 'text', text: 'RSVP by May 1 · mama@email.com', x: 60, y: 486, width: 380, fontSize: 12, fontFamily: 'Arial', fill: '#9ca3af', align: 'center' },
      ],
    },
    tags: ['colorful', 'kids', 'fun', 'confetti', 'bright'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#ffffff', '#f472b6', '#fbbf24'],
    downloads: 1920,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Dusty Rose Baby Shower',
    category: 'baby',
    subcategory: 'Baby Shower',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 700,
      background: '#f9ede8',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 700, fill: '#f9ede8' },
        // Large soft circles – watercolor look
        { id: 'blob1', type: 'circle', x: -60, y: -60, width: 280, height: 280, fill: '#f2d5cc' },
        { id: 'blob2', type: 'circle', x: 300, y: -80, width: 240, height: 240, fill: '#edd5cc' },
        { id: 'blob3', type: 'circle', x: -40, y: 540, width: 200, height: 200, fill: '#f0d0c8' },
        { id: 'blob4', type: 'circle', x: 360, y: 560, width: 180, height: 180, fill: '#edcfc8' },
        // Thin outer frame
        { id: 'frame', type: 'rect', x: 30, y: 30, width: 440, height: 640, fill: 'transparent', stroke: '#d4938a', strokeWidth: 1 },
        // Arch top decoration
        { id: 'arch', type: 'circle', x: 125, y: 30, width: 250, height: 200, fill: '#f0ccc4' },
        // Stars / sparkles
        { id: 'sp1', type: 'text', text: '✦', x: 60, y: 55, width: 40, fontSize: 16, fontFamily: 'Arial', fill: '#d4938a', align: 'center' },
        { id: 'sp2', type: 'text', text: '✦', x: 390, y: 55, width: 40, fontSize: 16, fontFamily: 'Arial', fill: '#d4938a', align: 'center' },
        { id: 'sp3', type: 'text', text: '✦', x: 50, y: 630, width: 40, fontSize: 12, fontFamily: 'Arial', fill: '#d4938a', align: 'center' },
        { id: 'sp4', type: 'text', text: '✦', x: 400, y: 630, width: 40, fontSize: 12, fontFamily: 'Arial', fill: '#d4938a', align: 'center' },
        // Baby icon
        { id: 'icon', type: 'text', text: '☁ ☁', x: 50, y: 72, width: 400, fontSize: 22, fontFamily: 'Arial', fill: '#c9857a', align: 'center' },
        // Headline
        { id: 'baby', type: 'text', text: 'Baby', x: 50, y: 110, width: 400, fontSize: 22, fontFamily: 'Georgia', fill: '#8a5e58', align: 'center', fontStyle: 'italic' },
        { id: 'shower', type: 'text', text: 'Shower', x: 50, y: 148, width: 400, fontSize: 58, fontFamily: 'Georgia', fill: '#5c2e28', align: 'center' },
        // Wavy divider
        { id: 'wave', type: 'text', text: '〜〜〜〜〜', x: 50, y: 220, width: 400, fontSize: 18, fontFamily: 'Arial', fill: '#d4938a', align: 'center' },
        // Honor text
        { id: 'honor', type: 'text', text: 'in honor of', x: 50, y: 256, width: 400, fontSize: 16, fontFamily: 'Georgia', fill: '#9a7570', align: 'center', fontStyle: 'italic' },
        // Parents names
        { id: 'names', type: 'text', text: 'Sophie & Marcus', x: 50, y: 288, width: 400, fontSize: 34, fontFamily: 'Georgia', fill: '#5c2e28', align: 'center', fontStyle: 'bold' },
        // Due date circle
        { id: 'due-bg', type: 'circle', x: 170, y: 350, width: 160, height: 160, fill: '#d4938a' },
        { id: 'due-inner', type: 'circle', x: 178, y: 358, width: 144, height: 144, fill: '#f9ede8' },
        { id: 'due-label', type: 'text', text: 'DUE', x: 50, y: 378, width: 400, fontSize: 11, fontFamily: 'Arial', fill: '#9a7570', align: 'center', fontStyle: 'bold' },
        { id: 'due-month', type: 'text', text: 'August', x: 50, y: 400, width: 400, fontSize: 22, fontFamily: 'Georgia', fill: '#5c2e28', align: 'center' },
        { id: 'due-year', type: 'text', text: '2025', x: 50, y: 436, width: 400, fontSize: 18, fontFamily: 'Georgia', fill: '#d4938a', align: 'center' },
        // Details
        { id: 'join', type: 'text', text: 'Please join us for a shower', x: 50, y: 538, width: 400, fontSize: 15, fontFamily: 'Georgia', fill: '#8a5e58', align: 'center', fontStyle: 'italic' },
        { id: 'date', type: 'text', text: 'Sunday, July 6  ·  2:00 PM', x: 50, y: 568, width: 400, fontSize: 17, fontFamily: 'Georgia', fill: '#5c2e28', align: 'center' },
        { id: 'venue', type: 'text', text: 'The Garden Room, Amsterdam', x: 50, y: 600, width: 400, fontSize: 14, fontFamily: 'Arial', fill: '#9a7570', align: 'center' },
        { id: 'rsvp', type: 'text', text: 'RSVP by June 20  ·  sophie@email.com', x: 50, y: 636, width: 400, fontSize: 12, fontFamily: 'Arial', fill: '#b09590', align: 'center' },
      ],
    },
    tags: ['pink', 'dusty rose', 'soft', 'elegant', 'baby'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#f9ede8', '#d4938a', '#5c2e28'],
    downloads: 1580,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Neon Graduation',
    category: 'graduation',
    subcategory: 'College',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 700,
      background: '#0a0a0a',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 700, fill: '#0a0a0a' },
        // Neon accent top stripe
        { id: 'stripe-top', type: 'rect', x: 0, y: 0, width: 500, height: 6, fill: '#22d3ee' },
        // Neon accent bottom stripe
        { id: 'stripe-bot', type: 'rect', x: 0, y: 694, width: 500, height: 6, fill: '#22d3ee' },
        // Background glow circles
        { id: 'glow1', type: 'circle', x: -100, y: -100, width: 400, height: 400, fill: '#0e1f2a' },
        { id: 'glow2', type: 'circle', x: 200, y: 400, width: 350, height: 350, fill: '#0a1a14' },
        // Grid lines for tech feel
        { id: 'grid1', type: 'rect', x: 0, y: 120, width: 500, height: 1, fill: '#1a2a2a' },
        { id: 'grid2', type: 'rect', x: 0, y: 240, width: 500, height: 1, fill: '#1a2a2a' },
        { id: 'grid3', type: 'rect', x: 0, y: 480, width: 500, height: 1, fill: '#1a2a2a' },
        { id: 'grid-v1', type: 'rect', x: 120, y: 0, width: 1, height: 700, fill: '#1a2a2a' },
        { id: 'grid-v2', type: 'rect', x: 380, y: 0, width: 1, height: 700, fill: '#1a2a2a' },
        // Cap icon area
        { id: 'icon-bg', type: 'circle', x: 190, y: 40, width: 120, height: 120, fill: '#0f2020' },
        { id: 'icon-ring', type: 'circle', x: 185, y: 35, width: 130, height: 130, fill: 'transparent', stroke: '#22d3ee', strokeWidth: 2 },
        { id: 'cap', type: 'text', text: '🎓', x: 50, y: 64, width: 400, fontSize: 52, fontFamily: 'Arial', fill: '#ffffff', align: 'center' },
        // Congrats label
        { id: 'label', type: 'text', text: '— CONGRATULATIONS —', x: 50, y: 196, width: 400, fontSize: 11, fontFamily: 'Arial', fill: '#22d3ee', align: 'center', fontStyle: 'bold' },
        // Main text
        { id: 'class', type: 'text', text: 'Class of', x: 50, y: 228, width: 400, fontSize: 28, fontFamily: 'Georgia', fill: '#94a3b8', align: 'center', fontStyle: 'italic' },
        { id: 'year', type: 'text', text: '2025', x: 50, y: 268, width: 400, fontSize: 96, fontFamily: 'Arial', fill: '#22d3ee', align: 'center', fontStyle: 'bold' },
        // Horizontal neon bar
        { id: 'bar', type: 'rect', x: 50, y: 374, width: 400, height: 3, fill: '#22d3ee' },
        // Name
        { id: 'name', type: 'text', text: 'Alex Johnson', x: 50, y: 394, width: 400, fontSize: 38, fontFamily: 'Georgia', fill: '#f8fafc', align: 'center' },
        // School
        { id: 'school', type: 'text', text: 'University of Amsterdam', x: 50, y: 446, width: 400, fontSize: 16, fontFamily: 'Arial', fill: '#64748b', align: 'center', fontStyle: 'bold' },
        { id: 'degree', type: 'text', text: 'Bachelor of Science · Magna Cum Laude', x: 50, y: 476, width: 400, fontSize: 13, fontFamily: 'Arial', fill: '#22d3ee', align: 'center' },
        // Party details block
        { id: 'party-bg', type: 'rect', x: 40, y: 514, width: 420, height: 110, fill: '#0f1a1a', cornerRadius: 8, stroke: '#22d3ee', strokeWidth: 1 },
        { id: 'party-label', type: 'text', text: 'CELEBRATION', x: 50, y: 530, width: 400, fontSize: 10, fontFamily: 'Arial', fill: '#22d3ee', align: 'center', fontStyle: 'bold' },
        { id: 'party-date', type: 'text', text: 'Saturday, June 28, 2025', x: 50, y: 554, width: 400, fontSize: 18, fontFamily: 'Georgia', fill: '#f1f5f9', align: 'center' },
        { id: 'party-time', type: 'text', text: '5:00 PM onwards', x: 50, y: 584, width: 400, fontSize: 14, fontFamily: 'Arial', fill: '#94a3b8', align: 'center' },
        { id: 'party-loc', type: 'text', text: '45 Canal St, Amsterdam', x: 50, y: 608, width: 400, fontSize: 13, fontFamily: 'Arial', fill: '#64748b', align: 'center' },
      ],
    },
    tags: ['dark', 'neon', 'modern', 'graduation', 'blue'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#0a0a0a', '#22d3ee', '#f8fafc'],
    downloads: 1240,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Midnight Christmas',
    category: 'holiday',
    subcategory: 'Christmas',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 600,
      background: '#0c1445',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 600, fill: '#0c1445' },
        // Stars scattered
        { id: 's1', type: 'circle', x: 40, y: 30, width: 6, height: 6, fill: '#fbbf24' },
        { id: 's2', type: 'circle', x: 120, y: 15, width: 4, height: 4, fill: '#e2e8f0' },
        { id: 's3', type: 'circle', x: 220, y: 25, width: 5, height: 5, fill: '#fbbf24' },
        { id: 's4', type: 'circle', x: 350, y: 10, width: 4, height: 4, fill: '#e2e8f0' },
        { id: 's5', type: 'circle', x: 450, y: 35, width: 6, height: 6, fill: '#fbbf24' },
        { id: 's6', type: 'circle', x: 80, y: 80, width: 3, height: 3, fill: '#e2e8f0' },
        { id: 's7', type: 'circle', x: 400, y: 70, width: 3, height: 3, fill: '#fbbf24' },
        { id: 's8', type: 'circle', x: 170, y: 55, width: 4, height: 4, fill: '#e2e8f0' },
        // Snow hills bottom
        { id: 'hill1', type: 'circle', x: -60, y: 460, width: 320, height: 280, fill: '#e8f4f8' },
        { id: 'hill2', type: 'circle', x: 200, y: 490, width: 380, height: 280, fill: '#f0f8ff' },
        { id: 'hill3', type: 'circle', x: 100, y: 510, width: 250, height: 200, fill: '#ffffff' },
        // Gold ornament circles top
        { id: 'orn1', type: 'circle', x: 50, y: 60, width: 40, height: 40, fill: '#d97706' },
        { id: 'orn2', type: 'circle', x: 410, y: 50, width: 50, height: 50, fill: '#b91c1c' },
        { id: 'orn3', type: 'circle', x: 10, y: 140, width: 30, height: 30, fill: '#059669' },
        { id: 'orn4', type: 'circle', x: 460, y: 160, width: 35, height: 35, fill: '#7c3aed' },
        // Candle glow
        { id: 'glow', type: 'circle', x: 180, y: 90, width: 140, height: 140, fill: '#1a2060' },
        // Candle flame
        { id: 'flame', type: 'text', text: '🕯️', x: 50, y: 88, width: 400, fontSize: 40, fontFamily: 'Arial', fill: '#fbbf24', align: 'center' },
        // Main text
        { id: 'wish', type: 'text', text: 'Season\'s Greetings', x: 50, y: 170, width: 400, fontSize: 14, fontFamily: 'Georgia', fill: '#93c5fd', align: 'center', fontStyle: 'italic' },
        { id: 'merry', type: 'text', text: 'Merry', x: 50, y: 200, width: 400, fontSize: 52, fontFamily: 'Georgia', fill: '#fbbf24', align: 'center', fontStyle: 'italic' },
        { id: 'christmas', type: 'text', text: 'Christmas', x: 50, y: 260, width: 400, fontSize: 44, fontFamily: 'Georgia', fill: '#f8fafc', align: 'center', fontStyle: 'bold' },
        // Horizontal stars
        { id: 'starrow', type: 'text', text: '★  ★  ★', x: 50, y: 320, width: 400, fontSize: 20, fontFamily: 'Arial', fill: '#fbbf24', align: 'center' },
        { id: 'and', type: 'text', text: '& a Happy New Year', x: 50, y: 358, width: 400, fontSize: 22, fontFamily: 'Georgia', fill: '#bfdbfe', align: 'center', fontStyle: 'italic' },
        // Tree on snow
        { id: 'tree', type: 'text', text: '🎄', x: 50, y: 410, width: 400, fontSize: 60, fontFamily: 'Arial', fill: '#ffffff', align: 'center' },
        // From line (on snow)
        { id: 'from', type: 'text', text: 'With love from the Johnson Family', x: 50, y: 510, width: 400, fontSize: 15, fontFamily: 'Georgia', fill: '#1e3a5f', align: 'center', fontStyle: 'italic' },
      ],
    },
    tags: ['christmas', 'navy', 'gold', 'festive', 'night'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#0c1445', '#fbbf24', '#f0f8ff'],
    downloads: 4100,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    title: 'Art Deco Anniversary',
    category: 'anniversary',
    subcategory: '25th Year',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 700,
      background: '#0e0c08',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 700, fill: '#0e0c08' },
        // Gold gradient layers (simulated with rects)
        { id: 'top-gold', type: 'rect', x: 0, y: 0, width: 500, height: 120, fill: '#1a1408' },
        { id: 'bot-gold', type: 'rect', x: 0, y: 580, width: 500, height: 120, fill: '#1a1408' },
        // Art deco fan shapes (semicircles)
        { id: 'fan-tl', type: 'circle', x: -80, y: -80, width: 240, height: 240, fill: 'transparent', stroke: '#b8960a', strokeWidth: 2 },
        { id: 'fan-tl2', type: 'circle', x: -60, y: -60, width: 200, height: 200, fill: 'transparent', stroke: '#b8960a', strokeWidth: 1 },
        { id: 'fan-tl3', type: 'circle', x: -40, y: -40, width: 160, height: 160, fill: 'transparent', stroke: '#b8960a', strokeWidth: 1 },
        { id: 'fan-tr', type: 'circle', x: 340, y: -80, width: 240, height: 240, fill: 'transparent', stroke: '#b8960a', strokeWidth: 2 },
        { id: 'fan-tr2', type: 'circle', x: 360, y: -60, width: 200, height: 200, fill: 'transparent', stroke: '#b8960a', strokeWidth: 1 },
        { id: 'fan-tr3', type: 'circle', x: 380, y: -40, width: 160, height: 160, fill: 'transparent', stroke: '#b8960a', strokeWidth: 1 },
        { id: 'fan-bl', type: 'circle', x: -80, y: 540, width: 240, height: 240, fill: 'transparent', stroke: '#b8960a', strokeWidth: 2 },
        { id: 'fan-bl2', type: 'circle', x: -60, y: 560, width: 200, height: 200, fill: 'transparent', stroke: '#b8960a', strokeWidth: 1 },
        { id: 'fan-br', type: 'circle', x: 340, y: 540, width: 240, height: 240, fill: 'transparent', stroke: '#b8960a', strokeWidth: 2 },
        { id: 'fan-br2', type: 'circle', x: 360, y: 560, width: 200, height: 200, fill: 'transparent', stroke: '#b8960a', strokeWidth: 1 },
        // Double border frame
        { id: 'frame-out', type: 'rect', x: 20, y: 20, width: 460, height: 660, fill: 'transparent', stroke: '#b8960a', strokeWidth: 2 },
        { id: 'frame-in', type: 'rect', x: 32, y: 32, width: 436, height: 636, fill: 'transparent', stroke: '#b8960a', strokeWidth: 0.5 },
        // Top diamond row
        { id: 'dia-row', type: 'text', text: '◆  ◆  ◆  ◆  ◆', x: 50, y: 52, width: 400, fontSize: 10, fontFamily: 'Arial', fill: '#b8960a', align: 'center' },
        // Top label
        { id: 'cel-label', type: 'text', text: 'CELEBRATING', x: 50, y: 80, width: 400, fontSize: 11, fontFamily: 'Arial', fill: '#b8960a', align: 'center', fontStyle: 'bold' },
        // Large year number
        { id: 'num', type: 'text', text: '25', x: 50, y: 110, width: 400, fontSize: 120, fontFamily: 'Georgia', fill: '#b8960a', align: 'center' },
        // Years together text
        { id: 'years', type: 'text', text: 'YEARS  TOGETHER', x: 50, y: 248, width: 400, fontSize: 16, fontFamily: 'Arial', fill: '#c9b07a', align: 'center', fontStyle: 'bold' },
        // Center horizontal rule
        { id: 'rule-l', type: 'rect', x: 50, y: 280, width: 160, height: 1, fill: '#b8960a' },
        { id: 'rule-r', type: 'rect', x: 290, y: 280, width: 160, height: 1, fill: '#b8960a' },
        { id: 'rule-dia', type: 'text', text: '◆', x: 50, y: 264, width: 400, fontSize: 20, fontFamily: 'Arial', fill: '#b8960a', align: 'center' },
        // Names
        { id: 'names', type: 'text', text: 'Michael & Jennifer', x: 50, y: 310, width: 400, fontSize: 36, fontFamily: 'Georgia', fill: '#f5e6c0', align: 'center' },
        // Year span
        { id: 'years-span', type: 'text', text: '— 1999  to  2024 —', x: 50, y: 362, width: 400, fontSize: 17, fontFamily: 'Georgia', fill: '#b8960a', align: 'center', fontStyle: 'italic' },
        // Center ornament
        { id: 'orn-l', type: 'rect', x: 50, y: 400, width: 175, height: 1, fill: '#b8960a' },
        { id: 'orn-r', type: 'rect', x: 275, y: 400, width: 175, height: 1, fill: '#b8960a' },
        { id: 'orn-c', type: 'circle', x: 243, y: 394, width: 14, height: 14, fill: '#b8960a' },
        // Event details
        { id: 'join', type: 'text', text: 'Please join us for an evening of', x: 50, y: 430, width: 400, fontSize: 15, fontFamily: 'Georgia', fill: '#8a7858', align: 'center', fontStyle: 'italic' },
        { id: 'join2', type: 'text', text: 'celebration & elegance', x: 50, y: 458, width: 400, fontSize: 20, fontFamily: 'Georgia', fill: '#c9b07a', align: 'center', fontStyle: 'italic' },
        // Details box
        { id: 'box', type: 'rect', x: 80, y: 494, width: 340, height: 110, fill: '#1a1408', stroke: '#b8960a', strokeWidth: 1 },
        { id: 'det-date', type: 'text', text: 'Saturday, October 18, 2025', x: 90, y: 514, width: 320, fontSize: 17, fontFamily: 'Georgia', fill: '#f5e6c0', align: 'center' },
        { id: 'det-time', type: 'text', text: '7:30 PM', x: 90, y: 546, width: 320, fontSize: 14, fontFamily: 'Arial', fill: '#b8960a', align: 'center' },
        { id: 'det-venue', type: 'text', text: 'The Grand Hotel Amsterdam', x: 90, y: 574, width: 320, fontSize: 14, fontFamily: 'Georgia', fill: '#8a7858', align: 'center' },
        // Bottom diamond row
        { id: 'bot-dia', type: 'text', text: '◆  ◆  ◆  ◆  ◆', x: 50, y: 636, width: 400, fontSize: 10, fontFamily: 'Arial', fill: '#b8960a', align: 'center' },
      ],
    },
    tags: ['art deco', 'gold', 'dark', 'luxury', 'anniversary'],
    orientation: 'portrait',
    is_premium: true,
    is_animated: false,
    has_photo: false,
    color_palette: ['#0e0c08', '#b8960a', '#f5e6c0'],
    downloads: 1380,
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    title: 'Tropical Summer Party',
    category: 'party',
    subcategory: 'Pool Party',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 600,
      background: '#fff7ed',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 600, fill: '#fff7ed' },
        // Bold coral header band
        { id: 'header-bg', type: 'rect', x: 0, y: 0, width: 500, height: 220, fill: '#ea580c' },
        // Sun circle
        { id: 'sun', type: 'circle', x: 310, y: -80, width: 280, height: 280, fill: '#f97316' },
        { id: 'sun2', type: 'circle', x: 340, y: -60, width: 240, height: 240, fill: '#fb923c' },
        // Wave at bottom of header
        { id: 'wave-bg', type: 'circle', x: -50, y: 150, width: 600, height: 200, fill: '#fff7ed' },
        // Palm leaf decorations
        { id: 'palm-l', type: 'circle', x: -60, y: 80, width: 180, height: 120, fill: '#15803d' },
        { id: 'palm-l2', type: 'circle', x: -40, y: 60, width: 130, height: 100, fill: '#16a34a' },
        { id: 'palm-r', type: 'circle', x: 380, y: 100, width: 160, height: 110, fill: '#15803d' },
        // Header text
        { id: 'summer', type: 'text', text: 'SUMMER', x: 30, y: 40, width: 280, fontSize: 52, fontFamily: 'Arial', fill: '#fff7ed', align: 'left', fontStyle: 'bold' },
        { id: 'party', type: 'text', text: 'PARTY', x: 30, y: 106, width: 280, fontSize: 52, fontFamily: 'Arial', fill: '#fbbf24', align: 'left', fontStyle: 'bold' },
        { id: 'vibes', type: 'text', text: '🌴 🍹 ☀️', x: 30, y: 168, width: 280, fontSize: 28, fontFamily: 'Arial', fill: '#ffffff', align: 'left' },
        // Content area
        { id: 'hosted', type: 'text', text: 'Hosted by', x: 50, y: 264, width: 400, fontSize: 15, fontFamily: 'Georgia', fill: '#9a3412', align: 'center', fontStyle: 'italic' },
        { id: 'name', type: 'text', text: 'The Williams Family', x: 50, y: 292, width: 400, fontSize: 30, fontFamily: 'Georgia', fill: '#1c1917', align: 'center', fontStyle: 'bold' },
        // Colorful pill badges
        { id: 'badge1-bg', type: 'rect', x: 50, y: 346, width: 185, height: 40, fill: '#fbbf24', cornerRadius: 20 },
        { id: 'badge1', type: 'text', text: '📅  Aug 9, 2025', x: 58, y: 356, width: 169, fontSize: 14, fontFamily: 'Arial', fill: '#1c1917', align: 'center', fontStyle: 'bold' },
        { id: 'badge2-bg', type: 'rect', x: 265, y: 346, width: 185, height: 40, fill: '#22d3ee', cornerRadius: 20 },
        { id: 'badge2', type: 'text', text: '🕓  4 PM onwards', x: 273, y: 356, width: 169, fontSize: 14, fontFamily: 'Arial', fill: '#1c1917', align: 'center', fontStyle: 'bold' },
        // Location
        { id: 'loc-bg', type: 'rect', x: 50, y: 410, width: 400, height: 52, fill: '#fef3c7', cornerRadius: 12, stroke: '#fbbf24', strokeWidth: 1 },
        { id: 'loc', type: 'text', text: '📍  78 Oak Avenue, Utrecht', x: 60, y: 428, width: 380, fontSize: 16, fontFamily: 'Arial', fill: '#92400e', align: 'center' },
        // Divider
        { id: 'div', type: 'rect', x: 150, y: 484, width: 200, height: 2, fill: '#fdba74' },
        // RSVP
        { id: 'rsvp-label', type: 'text', text: 'RSVP by August 1', x: 50, y: 508, width: 400, fontSize: 15, fontFamily: 'Arial', fill: '#ea580c', align: 'center', fontStyle: 'bold' },
        { id: 'rsvp-mail', type: 'text', text: 'party@williams.com', x: 50, y: 536, width: 400, fontSize: 14, fontFamily: 'Arial', fill: '#6b7280', align: 'center' },
        // Bottom wave
        { id: 'bot-wave', type: 'rect', x: 0, y: 578, width: 500, height: 22, fill: '#ea580c' },
      ],
    },
    tags: ['tropical', 'orange', 'summer', 'fun', 'outdoor'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#fff7ed', '#ea580c', '#fbbf24'],
    downloads: 980,
    created_at: new Date().toISOString(),
  },

  // ─── ANIMATED TEMPLATES ──────────────────────────────────────────

  {
    id: '9',
    title: '✨ Sparkling Birthday',
    category: 'birthday',
    subcategory: 'Milestone',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 700,
      background: '#0d0d1a',
      animation: { type: 'sparkles', colors: ['#fbbf24', '#f472b6', '#a78bfa', '#ffffff', '#34d399'], density: 55, speed: 1 },
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 700, fill: '#0d0d1a' },
        { id: 'glow1', type: 'circle', x: 100, y: 150, width: 300, height: 300, fill: '#1a0a2e' },
        { id: 'glow2', type: 'circle', x: 150, y: 350, width: 250, height: 250, fill: '#0a1a10' },
        { id: 'ring1', type: 'circle', x: 175, y: 50, width: 150, height: 150, fill: 'transparent', stroke: '#fbbf24', strokeWidth: 1 },
        { id: 'ring2', type: 'circle', x: 162, y: 37, width: 176, height: 176, fill: 'transparent', stroke: '#fbbf24', strokeWidth: 0.4 },
        { id: 'star-icon', type: 'text', text: '★', x: 50, y: 72, width: 400, fontSize: 80, fontFamily: 'Arial', fill: '#fbbf24', align: 'center' },
        { id: 'happy', type: 'text', text: 'Happy', x: 50, y: 228, width: 400, fontSize: 34, fontFamily: 'Georgia', fill: '#c4b5fd', align: 'center', fontStyle: 'italic' },
        { id: 'birthday', type: 'text', text: 'BIRTHDAY', x: 50, y: 272, width: 400, fontSize: 60, fontFamily: 'Arial', fill: '#fbbf24', align: 'center', fontStyle: 'bold' },
        { id: 'name', type: 'text', text: 'Emma', x: 50, y: 350, width: 400, fontSize: 44, fontFamily: 'Georgia', fill: '#ffffff', align: 'center' },
        { id: 'div-l', type: 'rect', x: 60, y: 412, width: 150, height: 1, fill: '#fbbf24' },
        { id: 'div-r', type: 'rect', x: 290, y: 412, width: 150, height: 1, fill: '#fbbf24' },
        { id: 'div-star', type: 'text', text: '✦', x: 50, y: 396, width: 400, fontSize: 18, fontFamily: 'Arial', fill: '#fbbf24', align: 'center' },
        { id: 'det-bg', type: 'rect', x: 60, y: 434, width: 380, height: 140, fill: '#130a22', cornerRadius: 12, stroke: '#fbbf24', strokeWidth: 1 },
        { id: 'date', type: 'text', text: 'Saturday, June 15, 2025', x: 70, y: 454, width: 360, fontSize: 17, fontFamily: 'Georgia', fill: '#fbbf24', align: 'center' },
        { id: 'time', type: 'text', text: '8:00 PM', x: 70, y: 488, width: 360, fontSize: 15, fontFamily: 'Arial', fill: '#c4b5fd', align: 'center' },
        { id: 'sep', type: 'rect', x: 180, y: 516, width: 140, height: 1, fill: '#fbbf24' },
        { id: 'venue', type: 'text', text: 'Skybar Rooftop, Amsterdam', x: 70, y: 530, width: 360, fontSize: 14, fontFamily: 'Georgia', fill: '#e2e8f0', align: 'center' },
        { id: 'dress', type: 'text', text: 'Dress code: Glam', x: 70, y: 556, width: 360, fontSize: 12, fontFamily: 'Arial', fill: '#a78bfa', align: 'center', fontStyle: 'italic' },
        { id: 'rsvp', type: 'text', text: 'RSVP: emma@party.com', x: 50, y: 612, width: 400, fontSize: 13, fontFamily: 'Arial', fill: '#6b7280', align: 'center' },
        { id: 'animated-badge', type: 'rect', x: 165, y: 644, width: 170, height: 28, fill: '#fbbf24', cornerRadius: 14 },
        { id: 'animated-label', type: 'text', text: '✨ ANIMATED CARD', x: 173, y: 650, width: 154, fontSize: 11, fontFamily: 'Arial', fill: '#0d0d1a', align: 'center', fontStyle: 'bold' },
      ],
    },
    tags: ['sparkles', 'dark', 'gold', 'purple', 'animated', 'glam'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: true,
    has_photo: false,
    color_palette: ['#0d0d1a', '#fbbf24', '#a78bfa'],
    downloads: 3200,
    created_at: new Date().toISOString(),
  },

  {
    id: '10',
    title: '❄️ Snow Christmas',
    category: 'holiday',
    subcategory: 'Christmas',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 600,
      background: '#0a1628',
      animation: { type: 'snowfall', colors: ['#ffffff', '#e0f0ff', '#c8e8ff'], density: 60 },
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 600, fill: '#0a1628' },
        // Sky gradient layers
        { id: 'sky1', type: 'circle', x: -100, y: -200, width: 700, height: 500, fill: '#0d1f3c' },
        { id: 'sky2', type: 'circle', x: 50, y: -100, width: 400, height: 300, fill: '#0f2a4a' },
        // Moon
        { id: 'moon', type: 'circle', x: 360, y: 20, width: 80, height: 80, fill: '#fef3c7' },
        { id: 'moon-shadow', type: 'circle', x: 378, y: 15, width: 72, height: 72, fill: '#0f2a4a' },
        // Stars
        { id: 'st1', type: 'circle', x: 40, y: 25, width: 5, height: 5, fill: '#ffffff' },
        { id: 'st2', type: 'circle', x: 110, y: 15, width: 4, height: 4, fill: '#e2e8f0' },
        { id: 'st3', type: 'circle', x: 200, y: 30, width: 3, height: 3, fill: '#ffffff' },
        { id: 'st4', type: 'circle', x: 300, y: 10, width: 5, height: 5, fill: '#fef3c7' },
        { id: 'st5', type: 'circle', x: 460, y: 55, width: 3, height: 3, fill: '#ffffff' },
        { id: 'st6', type: 'circle', x: 70, y: 70, width: 4, height: 4, fill: '#e2e8f0' },
        // Snow hills
        { id: 'hill-back', type: 'circle', x: -80, y: 430, width: 420, height: 280, fill: '#1e3a5f' },
        { id: 'hill-back2', type: 'circle', x: 200, y: 450, width: 400, height: 260, fill: '#1a3358' },
        { id: 'hill-mid', type: 'circle', x: -50, y: 470, width: 350, height: 250, fill: '#dbeafe' },
        { id: 'hill-mid2', type: 'circle', x: 240, y: 480, width: 340, height: 240, fill: '#e0f2fe' },
        { id: 'hill-front', type: 'circle', x: 50, y: 510, width: 420, height: 200, fill: '#f0f9ff' },
        { id: 'hill-f2', type: 'circle', x: -20, y: 530, width: 300, height: 180, fill: '#ffffff' },
        // Church / house silhouette
        { id: 'house', type: 'rect', x: 200, y: 420, width: 100, height: 80, fill: '#0c1a30' },
        { id: 'roof', type: 'text', text: '▲', x: 190, y: 390, width: 120, fontSize: 46, fontFamily: 'Arial', fill: '#0c1a30', align: 'center' },
        { id: 'window', type: 'rect', x: 232, y: 440, width: 36, height: 36, fill: '#fbbf24' },
        // Christmas tree
        { id: 'tree', type: 'text', text: '🎄', x: 50, y: 420, width: 100, fontSize: 60, fontFamily: 'Arial', fill: '#ffffff', align: 'center' },
        { id: 'tree2', type: 'text', text: '🎄', x: 360, y: 440, width: 80, fontSize: 44, fontFamily: 'Arial', fill: '#ffffff', align: 'center' },
        // Headline text
        { id: 'h1', type: 'text', text: 'Merry', x: 50, y: 104, width: 400, fontSize: 36, fontFamily: 'Georgia', fill: '#bfdbfe', align: 'center', fontStyle: 'italic' },
        { id: 'h2', type: 'text', text: 'Christmas', x: 50, y: 148, width: 400, fontSize: 66, fontFamily: 'Georgia', fill: '#ffffff', align: 'center', fontStyle: 'bold' },
        { id: 'h3', type: 'text', text: '& Happy New Year', x: 50, y: 236, width: 400, fontSize: 22, fontFamily: 'Georgia', fill: '#93c5fd', align: 'center', fontStyle: 'italic' },
        { id: 'stars', type: 'text', text: '⋆  ✦  ⋆', x: 50, y: 278, width: 400, fontSize: 18, fontFamily: 'Arial', fill: '#fbbf24', align: 'center' },
        // From text
        { id: 'from', type: 'text', text: 'Warmest wishes from', x: 50, y: 318, width: 400, fontSize: 15, fontFamily: 'Georgia', fill: '#93c5fd', align: 'center', fontStyle: 'italic' },
        { id: 'fam', type: 'text', text: 'The Johnson Family', x: 50, y: 350, width: 400, fontSize: 26, fontFamily: 'Georgia', fill: '#fef3c7', align: 'center' },
        { id: 'anim-badge', type: 'rect', x: 158, y: 388, width: 184, height: 26, fill: '#1e40af', cornerRadius: 13 },
        { id: 'anim-label', type: 'text', text: '❄️ ANIMATED CARD', x: 166, y: 394, width: 168, fontSize: 11, fontFamily: 'Arial', fill: '#bfdbfe', align: 'center', fontStyle: 'bold' },
      ],
    },
    tags: ['christmas', 'snow', 'animated', 'night', 'winter', 'blue'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: true,
    has_photo: false,
    color_palette: ['#0a1628', '#ffffff', '#fbbf24'],
    downloads: 5600,
    created_at: new Date().toISOString(),
  },

  {
    id: '11',
    title: '💕 Valentine Hearts',
    category: 'greeting',
    subcategory: 'Just Because',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 600,
      background: '#fdf2f4',
      animation: { type: 'hearts', colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#e11d48'], density: 28 },
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 600, fill: '#fdf2f4' },
        // Soft pink blobs
        { id: 'blob1', type: 'circle', x: -80, y: -80, width: 300, height: 300, fill: '#fce7f0' },
        { id: 'blob2', type: 'circle', x: 320, y: -60, width: 260, height: 260, fill: '#fde8f1' },
        { id: 'blob3', type: 'circle', x: -40, y: 400, width: 220, height: 220, fill: '#fce7f0' },
        { id: 'blob4', type: 'circle', x: 350, y: 420, width: 200, height: 200, fill: '#fde8f1' },
        // Red border frame
        { id: 'frame', type: 'rect', x: 24, y: 24, width: 452, height: 552, fill: 'transparent', stroke: '#f43f5e', strokeWidth: 2 },
        { id: 'frame2', type: 'rect', x: 32, y: 32, width: 436, height: 536, fill: 'transparent', stroke: '#fda4af', strokeWidth: 1 },
        // Corner hearts
        { id: 'ch1', type: 'text', text: '♥', x: 38, y: 50, width: 30, fontSize: 22, fontFamily: 'Arial', fill: '#f43f5e', align: 'center' },
        { id: 'ch2', type: 'text', text: '♥', x: 430, y: 50, width: 30, fontSize: 22, fontFamily: 'Arial', fill: '#f43f5e', align: 'center' },
        { id: 'ch3', type: 'text', text: '♥', x: 38, y: 548, width: 30, fontSize: 22, fontFamily: 'Arial', fill: '#f43f5e', align: 'center' },
        { id: 'ch4', type: 'text', text: '♥', x: 430, y: 548, width: 30, fontSize: 22, fontFamily: 'Arial', fill: '#f43f5e', align: 'center' },
        // Big heart icon
        { id: 'big-heart', type: 'text', text: '♥', x: 50, y: 66, width: 400, fontSize: 90, fontFamily: 'Arial', fill: '#f43f5e', align: 'center' },
        // Title
        { id: 'be-my', type: 'text', text: 'Be My', x: 50, y: 186, width: 400, fontSize: 32, fontFamily: 'Georgia', fill: '#9f1239', align: 'center', fontStyle: 'italic' },
        { id: 'valentine', type: 'text', text: 'Valentine', x: 50, y: 228, width: 400, fontSize: 60, fontFamily: 'Georgia', fill: '#e11d48', align: 'center', fontStyle: 'bold' },
        // Wavy divider
        { id: 'wave', type: 'text', text: '~ ~ ~ ~ ~ ~ ~', x: 50, y: 306, width: 400, fontSize: 18, fontFamily: 'Arial', fill: '#fda4af', align: 'center' },
        // Message
        { id: 'msg', type: 'text', text: 'You make every day\nmore beautiful', x: 50, y: 336, width: 400, fontSize: 20, fontFamily: 'Georgia', fill: '#881337', align: 'center', fontStyle: 'italic' },
        // Name
        { id: 'from-label', type: 'text', text: 'With all my love,', x: 50, y: 418, width: 400, fontSize: 15, fontFamily: 'Georgia', fill: '#9f1239', align: 'center', fontStyle: 'italic' },
        { id: 'from', type: 'text', text: 'Thomas', x: 50, y: 450, width: 400, fontSize: 38, fontFamily: 'Georgia', fill: '#e11d48', align: 'center' },
        // Date
        { id: 'date', type: 'text', text: 'February 14, 2025', x: 50, y: 502, width: 400, fontSize: 15, fontFamily: 'Arial', fill: '#be185d', align: 'center' },
        // Animated badge
        { id: 'anim-bg', type: 'rect', x: 153, y: 538, width: 194, height: 28, fill: '#fda4af', cornerRadius: 14 },
        { id: 'anim-txt', type: 'text', text: '💕 ANIMATED CARD', x: 161, y: 544, width: 178, fontSize: 11, fontFamily: 'Arial', fill: '#881337', align: 'center', fontStyle: 'bold' },
      ],
    },
    tags: ['valentine', 'hearts', 'animated', 'pink', 'red', 'love'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: true,
    has_photo: false,
    color_palette: ['#fdf2f4', '#f43f5e', '#fda4af'],
    downloads: 2900,
    created_at: new Date().toISOString(),
  },

  // ─── MORE STATIC TEMPLATES ───────────────────────────────────────

  {
    id: '12',
    title: 'New Year Countdown',
    category: 'holiday',
    subcategory: 'New Year',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 600,
      background: '#0f0a1e',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 600, fill: '#0f0a1e' },
        { id: 'glow', type: 'circle', x: 50, y: 100, width: 400, height: 400, fill: '#1a0f3a' },
        { id: 'ring1', type: 'circle', x: 100, y: 50, width: 300, height: 300, fill: 'transparent', stroke: '#7c3aed', strokeWidth: 1 },
        { id: 'ring2', type: 'circle', x: 130, y: 80, width: 240, height: 240, fill: 'transparent', stroke: '#7c3aed', strokeWidth: 0.5 },
        { id: 'firework1', type: 'text', text: '✦', x: 30, y: 50, width: 50, fontSize: 28, fontFamily: 'Arial', fill: '#fbbf24', align: 'center' },
        { id: 'firework2', type: 'text', text: '✦', x: 410, y: 30, width: 50, fontSize: 22, fontFamily: 'Arial', fill: '#f472b6', align: 'center' },
        { id: 'firework3', type: 'text', text: '✦', x: 20, y: 280, width: 40, fontSize: 18, fontFamily: 'Arial', fill: '#34d399', align: 'center' },
        { id: 'firework4', type: 'text', text: '✦', x: 440, y: 200, width: 40, fontSize: 24, fontFamily: 'Arial', fill: '#60a5fa', align: 'center' },
        { id: 'happy', type: 'text', text: 'Happy', x: 50, y: 110, width: 400, fontSize: 34, fontFamily: 'Georgia', fill: '#a78bfa', align: 'center', fontStyle: 'italic' },
        { id: 'new-year', type: 'text', text: 'New Year', x: 50, y: 150, width: 400, fontSize: 66, fontFamily: 'Georgia', fill: '#ffffff', align: 'center', fontStyle: 'bold' },
        { id: 'year', type: 'text', text: '2026', x: 50, y: 236, width: 400, fontSize: 88, fontFamily: 'Arial', fill: '#fbbf24', align: 'center', fontStyle: 'bold' },
        { id: 'bar', type: 'rect', x: 50, y: 342, width: 400, height: 2, fill: '#7c3aed' },
        { id: 'msg', type: 'text', text: 'Wishing you a year full of', x: 50, y: 360, width: 400, fontSize: 16, fontFamily: 'Georgia', fill: '#c4b5fd', align: 'center', fontStyle: 'italic' },
        { id: 'msg2', type: 'text', text: 'joy, love & adventure', x: 50, y: 390, width: 400, fontSize: 24, fontFamily: 'Georgia', fill: '#e2e8f0', align: 'center' },
        { id: 'from-bg', type: 'rect', x: 100, y: 436, width: 300, height: 60, fill: '#1a0f3a', cornerRadius: 10, stroke: '#7c3aed', strokeWidth: 1 },
        { id: 'from', type: 'text', text: 'From the Johnson Family', x: 110, y: 454, width: 280, fontSize: 16, fontFamily: 'Georgia', fill: '#e2e8f0', align: 'center' },
        { id: 'date', type: 'text', text: 'January 1, 2026', x: 110, y: 478, width: 280, fontSize: 13, fontFamily: 'Arial', fill: '#7c3aed', align: 'center' },
        { id: 'champers', type: 'text', text: '🥂  🎊  🥂', x: 50, y: 520, width: 400, fontSize: 26, fontFamily: 'Arial', fill: '#ffffff', align: 'center' },
      ],
    },
    tags: ['new year', 'dark', 'purple', 'gold', 'fireworks'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#0f0a1e', '#fbbf24', '#7c3aed'],
    downloads: 2200,
    created_at: new Date().toISOString(),
  },

  {
    id: '13',
    title: 'Spooky Halloween',
    category: 'holiday',
    subcategory: 'Halloween',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 600,
      background: '#0c0a06',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 600, fill: '#0c0a06' },
        { id: 'moon-glow', type: 'circle', x: 100, y: -100, width: 400, height: 400, fill: '#1a1000' },
        { id: 'moon', type: 'circle', x: 170, y: 10, width: 160, height: 160, fill: '#f97316' },
        { id: 'moon-crater', type: 'circle', x: 200, y: 30, width: 40, height: 40, fill: '#ea580c' },
        { id: 'moon-crater2', type: 'circle', x: 270, y: 80, width: 25, height: 25, fill: '#ea580c' },
        { id: 'moon-crater3', type: 'circle', x: 185, y: 110, width: 20, height: 20, fill: '#ea580c' },
        { id: 'hill-l', type: 'circle', x: -100, y: 440, width: 400, height: 300, fill: '#1a1000' },
        { id: 'hill-r', type: 'circle', x: 220, y: 460, width: 380, height: 280, fill: '#150e00' },
        { id: 'bat1', type: 'text', text: '🦇', x: 60, y: 80, width: 40, fontSize: 22, fontFamily: 'Arial', fill: '#000000', align: 'center' },
        { id: 'bat2', type: 'text', text: '🦇', x: 400, y: 110, width: 40, fontSize: 18, fontFamily: 'Arial', fill: '#000000', align: 'center' },
        { id: 'bat3', type: 'text', text: '🦇', x: 320, y: 60, width: 30, fontSize: 14, fontFamily: 'Arial', fill: '#000000', align: 'center' },
        { id: 'pumpkin', type: 'text', text: '🎃', x: 50, y: 190, width: 400, fontSize: 80, fontFamily: 'Arial', fill: '#ffffff', align: 'center' },
        { id: 'boo', type: 'text', text: 'BOO!', x: 50, y: 298, width: 400, fontSize: 80, fontFamily: 'Arial', fill: '#f97316', align: 'center', fontStyle: 'bold' },
        { id: 'spooky', type: 'text', text: "It's Halloween!", x: 50, y: 392, width: 400, fontSize: 26, fontFamily: 'Georgia', fill: '#e2e8f0', align: 'center', fontStyle: 'italic' },
        { id: 'bar', type: 'rect', x: 100, y: 434, width: 300, height: 1, fill: '#f97316' },
        { id: 'come-join', type: 'text', text: 'Come join the haunting at', x: 50, y: 452, width: 400, fontSize: 15, fontFamily: 'Georgia', fill: '#9ca3af', align: 'center', fontStyle: 'italic' },
        { id: 'event', type: 'text', text: 'The Dark Mansion', x: 50, y: 480, width: 400, fontSize: 28, fontFamily: 'Georgia', fill: '#f97316', align: 'center' },
        { id: 'det', type: 'text', text: 'October 31 · 9 PM · 13 Scary Street', x: 50, y: 522, width: 400, fontSize: 14, fontFamily: 'Arial', fill: '#6b7280', align: 'center' },
        { id: 'rsvp', type: 'text', text: 'If you dare… RSVP by Oct 28', x: 50, y: 554, width: 400, fontSize: 13, fontFamily: 'Georgia', fill: '#f97316', align: 'center', fontStyle: 'italic' },
      ],
    },
    tags: ['halloween', 'orange', 'dark', 'spooky', 'scary'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#0c0a06', '#f97316', '#e2e8f0'],
    downloads: 1760,
    created_at: new Date().toISOString(),
  },

  {
    id: '14',
    title: 'Elegant Thank You',
    category: 'greeting',
    subcategory: 'Thank You',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 500,
      background: '#faf8f5',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 500, fill: '#faf8f5' },
        { id: 'left-bar', type: 'rect', x: 0, y: 0, width: 8, height: 500, fill: '#2d4a3e' },
        { id: 'right-bar', type: 'rect', x: 492, y: 0, width: 8, height: 500, fill: '#2d4a3e' },
        { id: 'top-bar', type: 'rect', x: 0, y: 0, width: 500, height: 8, fill: '#2d4a3e' },
        { id: 'bot-bar', type: 'rect', x: 0, y: 492, width: 500, height: 8, fill: '#2d4a3e' },
        { id: 'inner-frame', type: 'rect', x: 20, y: 20, width: 460, height: 460, fill: 'transparent', stroke: '#c4b49a', strokeWidth: 1 },
        { id: 'leaf-tl', type: 'circle', x: -30, y: -30, width: 120, height: 120, fill: '#2d4a3e' },
        { id: 'leaf-tl2', type: 'circle', x: -10, y: -10, width: 80, height: 80, fill: '#3d6b57' },
        { id: 'leaf-br', type: 'circle', x: 410, y: 410, width: 120, height: 120, fill: '#2d4a3e' },
        { id: 'leaf-br2', type: 'circle', x: 430, y: 430, width: 80, height: 80, fill: '#3d6b57' },
        { id: 'flower1', type: 'text', text: '✿', x: 50, y: 68, width: 400, fontSize: 28, fontFamily: 'Arial', fill: '#c4b49a', align: 'center' },
        { id: 'thanks', type: 'text', text: 'Thank', x: 50, y: 116, width: 400, fontSize: 36, fontFamily: 'Georgia', fill: '#6b5e4e', align: 'center', fontStyle: 'italic' },
        { id: 'you', type: 'text', text: 'You', x: 50, y: 158, width: 400, fontSize: 80, fontFamily: 'Georgia', fill: '#2d4a3e', align: 'center' },
        { id: 'div-l', type: 'rect', x: 60, y: 252, width: 155, height: 1, fill: '#c4b49a' },
        { id: 'div-r', type: 'rect', x: 285, y: 252, width: 155, height: 1, fill: '#c4b49a' },
        { id: 'div-flower', type: 'text', text: '✿', x: 50, y: 236, width: 400, fontSize: 18, fontFamily: 'Arial', fill: '#c4b49a', align: 'center' },
        { id: 'msg', type: 'text', text: 'Your kindness means\nmore than words can say.', x: 50, y: 276, width: 400, fontSize: 18, fontFamily: 'Georgia', fill: '#6b5e4e', align: 'center', fontStyle: 'italic' },
        { id: 'from', type: 'text', text: 'With gratitude,', x: 50, y: 368, width: 400, fontSize: 14, fontFamily: 'Georgia', fill: '#9a8e83', align: 'center', fontStyle: 'italic' },
        { id: 'name', type: 'text', text: 'The Johnson Family', x: 50, y: 394, width: 400, fontSize: 24, fontFamily: 'Georgia', fill: '#2d4a3e', align: 'center' },
        { id: 'flower2', type: 'text', text: '✿', x: 50, y: 438, width: 400, fontSize: 20, fontFamily: 'Arial', fill: '#c4b49a', align: 'center' },
      ],
    },
    tags: ['thank you', 'green', 'elegant', 'botanical', 'grateful'],
    orientation: 'square',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#faf8f5', '#2d4a3e', '#c4b49a'],
    downloads: 1440,
    created_at: new Date().toISOString(),
  },

  {
    id: '15',
    title: 'Sweet 16 Invite',
    category: 'birthday',
    subcategory: '16th',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 700,
      background: '#fdf4ff',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 700, fill: '#fdf4ff' },
        { id: 'top-block', type: 'rect', x: 0, y: 0, width: 500, height: 280, fill: '#7c3aed' },
        { id: 'circle-dec1', type: 'circle', x: -60, y: -60, width: 200, height: 200, fill: '#6d28d9' },
        { id: 'circle-dec2', type: 'circle', x: 360, y: -80, width: 240, height: 240, fill: '#5b21b6' },
        { id: 'circle-dec3', type: 'circle', x: 350, y: 160, width: 180, height: 180, fill: '#6d28d9' },
        { id: 'dots1', type: 'circle', x: 60, y: 60, width: 12, height: 12, fill: '#ddd6fe' },
        { id: 'dots2', type: 'circle', x: 160, y: 30, width: 8, height: 8, fill: '#ddd6fe' },
        { id: 'dots3', type: 'circle', x: 400, y: 100, width: 10, height: 10, fill: '#ddd6fe' },
        { id: 'dots4', type: 'circle', x: 80, y: 200, width: 6, height: 6, fill: '#ddd6fe' },
        { id: 'sweet', type: 'text', text: 'Sweet', x: 50, y: 68, width: 400, fontSize: 32, fontFamily: 'Georgia', fill: '#e9d5ff', align: 'center', fontStyle: 'italic' },
        { id: 'num', type: 'text', text: '16', x: 50, y: 108, width: 400, fontSize: 130, fontFamily: 'Arial', fill: '#ffffff', align: 'center', fontStyle: 'bold' },
        // Diagonal wave cut
        { id: 'wave-cut', type: 'circle', x: -50, y: 220, width: 600, height: 200, fill: '#fdf4ff' },
        { id: 'name-label', type: 'text', text: "It's", x: 50, y: 310, width: 400, fontSize: 20, fontFamily: 'Georgia', fill: '#7c3aed', align: 'center', fontStyle: 'italic' },
        { id: 'name', type: 'text', text: "Sofia's", x: 50, y: 342, width: 400, fontSize: 52, fontFamily: 'Georgia', fill: '#1c1917', align: 'center' },
        { id: 'party', type: 'text', text: 'Birthday Party!', x: 50, y: 408, width: 400, fontSize: 30, fontFamily: 'Arial', fill: '#7c3aed', align: 'center', fontStyle: 'bold' },
        { id: 'emojis', type: 'text', text: '💜  🎉  💜', x: 50, y: 454, width: 400, fontSize: 26, fontFamily: 'Arial', fill: '#000000', align: 'center' },
        { id: 'det-bg', type: 'rect', x: 50, y: 494, width: 400, height: 130, fill: '#f3e8ff', cornerRadius: 16, stroke: '#c084fc', strokeWidth: 1 },
        { id: 'date', type: 'text', text: 'Saturday, March 22, 2025', x: 60, y: 514, width: 380, fontSize: 17, fontFamily: 'Georgia', fill: '#6d28d9', align: 'center' },
        { id: 'time', type: 'text', text: '7:00 PM – midnight', x: 60, y: 548, width: 380, fontSize: 15, fontFamily: 'Arial', fill: '#4c1d95', align: 'center' },
        { id: 'venue', type: 'text', text: 'Club Luxe · Amsterdam', x: 60, y: 576, width: 380, fontSize: 16, fontFamily: 'Georgia', fill: '#6d28d9', align: 'center' },
        { id: 'rsvp', type: 'text', text: 'RSVP by March 10 · sofia@sweet16.com', x: 60, y: 608, width: 380, fontSize: 12, fontFamily: 'Arial', fill: '#9ca3af', align: 'center' },
        { id: 'dress', type: 'text', text: 'Dress to impress 💜', x: 50, y: 654, width: 400, fontSize: 14, fontFamily: 'Georgia', fill: '#7c3aed', align: 'center', fontStyle: 'italic' },
      ],
    },
    tags: ['sweet 16', 'purple', 'teen', 'birthday', 'party'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#fdf4ff', '#7c3aed', '#e9d5ff'],
    downloads: 1100,
    created_at: new Date().toISOString(),
  },

  {
    id: '16',
    title: 'Housewarming',
    category: 'party',
    subcategory: 'Housewarming',
    thumbnail_url: '',
    canvas_data: {
      width: 500,
      height: 700,
      background: '#fffbf0',
      elements: [
        { id: 'bg', type: 'rect', x: 0, y: 0, width: 500, height: 700, fill: '#fffbf0' },
        { id: 'sky', type: 'rect', x: 0, y: 0, width: 500, height: 280, fill: '#fef3c7' },
        { id: 'sun', type: 'circle', x: 370, y: -40, width: 160, height: 160, fill: '#fbbf24' },
        { id: 'sun2', type: 'circle', x: 385, y: -25, width: 130, height: 130, fill: '#fcd34d' },
        { id: 'cloud1', type: 'circle', x: 40, y: 30, width: 120, height: 70, fill: '#ffffff' },
        { id: 'cloud1b', type: 'circle', x: 60, y: 15, width: 90, height: 70, fill: '#ffffff' },
        { id: 'cloud1c', type: 'circle', x: 120, y: 20, width: 80, height: 60, fill: '#ffffff' },
        { id: 'cloud2', type: 'circle', x: 220, y: 50, width: 100, height: 60, fill: '#ffffff' },
        { id: 'cloud2b', type: 'circle', x: 250, y: 35, width: 80, height: 60, fill: '#ffffff' },
        // House
        { id: 'house-body', type: 'rect', x: 130, y: 190, width: 240, height: 180, fill: '#d97706' },
        { id: 'roof-shadow', type: 'rect', x: 110, y: 185, width: 280, height: 20, fill: '#92400e' },
        { id: 'roof', type: 'text', text: '▲', x: 100, y: 118, width: 300, fontSize: 120, fontFamily: 'Arial', fill: '#92400e', align: 'center' },
        { id: 'chimney', type: 'rect', x: 332, y: 160, width: 28, height: 50, fill: '#78350f' },
        { id: 'smoke', type: 'text', text: '〰', x: 320, y: 125, width: 50, fontSize: 20, fontFamily: 'Arial', fill: '#d1d5db', align: 'center' },
        { id: 'door', type: 'rect', x: 215, y: 280, width: 70, height: 90, fill: '#92400e', cornerRadius: 2 },
        { id: 'door-knob', type: 'circle', x: 272, y: 326, width: 8, height: 8, fill: '#fbbf24' },
        { id: 'win-l', type: 'rect', x: 148, y: 220, width: 58, height: 52, fill: '#bfdbfe', cornerRadius: 2 },
        { id: 'win-l-cross-h', type: 'rect', x: 148, y: 246, width: 58, height: 2, fill: '#93c5fd' },
        { id: 'win-l-cross-v', type: 'rect', x: 177, y: 220, width: 2, height: 52, fill: '#93c5fd' },
        { id: 'win-r', type: 'rect', x: 294, y: 220, width: 58, height: 52, fill: '#bfdbfe', cornerRadius: 2 },
        { id: 'win-r-cross-h', type: 'rect', x: 294, y: 246, width: 58, height: 2, fill: '#93c5fd' },
        { id: 'win-r-cross-v', type: 'rect', x: 323, y: 220, width: 2, height: 52, fill: '#93c5fd' },
        // Ground
        { id: 'ground', type: 'rect', x: 0, y: 370, width: 500, height: 100, fill: '#84cc16' },
        { id: 'path', type: 'rect', x: 220, y: 370, width: 60, height: 100, fill: '#a8a29e' },
        { id: 'bush-l', type: 'circle', x: 100, y: 340, width: 80, height: 60, fill: '#15803d' },
        { id: 'bush-r', type: 'circle', x: 320, y: 345, width: 80, height: 60, fill: '#16a34a' },
        // Text area
        { id: 'tag-bg', type: 'rect', x: 40, y: 440, width: 420, height: 220, fill: '#fffbf0' },
        { id: 'new-home', type: 'text', text: 'NEW HOME!', x: 50, y: 462, width: 400, fontSize: 13, fontFamily: 'Arial', fill: '#d97706', align: 'center', fontStyle: 'bold' },
        { id: 'warmth', type: 'text', text: 'Housewarming', x: 50, y: 490, width: 400, fontSize: 46, fontFamily: 'Georgia', fill: '#1c1917', align: 'center' },
        { id: 'party', type: 'text', text: 'Party', x: 50, y: 548, width: 400, fontSize: 46, fontFamily: 'Georgia', fill: '#d97706', align: 'center', fontStyle: 'italic' },
        { id: 'det', type: 'text', text: 'Saturday, April 12  ·  3 PM  ·  14 Elm St', x: 50, y: 612, width: 400, fontSize: 15, fontFamily: 'Arial', fill: '#6b7280', align: 'center' },
        { id: 'rsvp', type: 'text', text: 'RSVP: home@newplace.com', x: 50, y: 644, width: 400, fontSize: 13, fontFamily: 'Arial', fill: '#9ca3af', align: 'center' },
      ],
    },
    tags: ['housewarming', 'yellow', 'home', 'warm', 'cozy'],
    orientation: 'portrait',
    is_premium: false,
    is_animated: false,
    has_photo: false,
    color_palette: ['#fffbf0', '#d97706', '#84cc16'],
    downloads: 760,
    created_at: new Date().toISOString(),
  },
]

export function filterTemplates(templates: Template[], filters: FilterState): Template[] {
  let result = [...templates]

  if (filters.category) {
    result = result.filter(t => t.category === filters.category)
  }
  if (filters.subcategory) {
    result = result.filter(t => t.subcategory === filters.subcategory)
  }
  if (filters.orientation) {
    result = result.filter(t => t.orientation === filters.orientation)
  }
  if (filters.isPremium !== undefined) {
    result = result.filter(t => t.is_premium === filters.isPremium)
  }
  if (filters.hasPhoto) {
    result = result.filter(t => t.has_photo)
  }
  if (filters.isAnimated) {
    result = result.filter(t => t.is_animated)
  }
  if (filters.tags && filters.tags.length > 0) {
    result = result.filter(t => filters.tags!.some(tag => t.tags.includes(tag)))
  }

  if (filters.sort === 'newest') {
    result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } else {
    result.sort((a, b) => b.downloads - a.downloads)
  }

  return result
}
