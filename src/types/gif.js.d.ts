declare module 'gif.js' {
  interface GIFOptions {
    workers?: number
    quality?: number
    width?: number
    height?: number
    workerScript?: string
    repeat?: number
    background?: string
    transparent?: number | null
    dither?: boolean | string
    debug?: boolean
  }
  interface FrameOptions {
    delay?: number
    copy?: boolean
    dispose?: number
  }
  class GIF {
    constructor(options: GIFOptions)
    addFrame(image: HTMLCanvasElement | CanvasRenderingContext2D | ImageData, options?: FrameOptions): void
    render(): void
    on(event: 'start' | 'abort' | 'finished', callback: (blob: Blob) => void): void
    on(event: 'progress', callback: (progress: number) => void): void
    on(event: 'error', callback: (error: Error) => void): void
    abort(): void
  }
  export default GIF
}
