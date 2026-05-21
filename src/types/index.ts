export type Category =
  | 'wedding'
  | 'birthday'
  | 'baby'
  | 'party'
  | 'greeting'
  | 'holiday'
  | 'anniversary'
  | 'graduation'

export type Orientation = 'portrait' | 'landscape' | 'square'

export interface Template {
  id: string
  title: string
  category: Category
  subcategory?: string
  thumbnail_url: string
  canvas_data: CanvasData
  tags: string[]
  orientation: Orientation
  is_premium: boolean
  is_animated: boolean
  has_photo: boolean
  color_palette: string[]
  downloads: number
  created_at: string
}

export interface TextElement {
  id: string
  type: 'text'
  text: string
  x: number
  y: number
  width: number
  fontSize: number
  fontFamily: string
  fill: string
  align: 'left' | 'center' | 'right'
  fontStyle?: string
  rotation?: number
}

export interface ImageElement {
  id: string
  type: 'image'
  src: string
  x: number
  y: number
  width: number
  height: number
  rotation?: number
}

export interface ShapeElement {
  id: string
  type: 'rect' | 'circle'
  x: number
  y: number
  width: number
  height: number
  fill: string
  stroke?: string
  strokeWidth?: number
  rotation?: number
  cornerRadius?: number
}

export type CanvasElement = TextElement | ImageElement | ShapeElement

export type AnimationType = 'snowfall' | 'confetti' | 'hearts' | 'sparkles' | 'bubbles' | 'fireworks'

export interface AnimationLayer {
  type: AnimationType
  colors?: string[]
  density?: number
  speed?: number
}

export interface CanvasData {
  width: number
  height: number
  background: string
  elements: CanvasElement[]
  animation?: AnimationLayer
}

export interface Design {
  id: string
  user_id?: string
  template_id?: string
  title: string
  canvas_data: CanvasData
  created_at: string
  updated_at: string
}

export interface RsvpEvent {
  id: string
  design_id?: string
  slug: string
  title: string
  event_date: string
  event_time?: string
  location?: string
  description?: string
  host_name: string
  host_email: string
  max_guests?: number
  deadline?: string
  created_at: string
}

export interface RsvpResponse {
  id: string
  event_id: string
  guest_name: string
  guest_email?: string
  guest_count: number
  status: 'attending' | 'not_attending' | 'maybe'
  message?: string
  created_at: string
}

export interface FilterState {
  category?: Category
  subcategory?: string
  orientation?: Orientation
  color?: string
  tags?: string[]
  isPremium?: boolean
  hasPhoto?: boolean
  isAnimated?: boolean
  sort: 'popular' | 'newest'
}
