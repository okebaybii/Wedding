import * as THREE from 'three'
import type { CoupleInfo, GalleryPhoto, WeddingEvent } from '../../types/wedding.ts'
import type { WeddingJourneySnapshot } from '../../hooks/useWeddingJourney.ts'

export type JourneyQuality = 'high' | 'balanced' | 'lite'

export interface JourneyContent {
  couple: CoupleInfo
  events: WeddingEvent[]
  gallery: GalleryPhoto[]
  heroImage?: string
}

export interface WeddingJourneyRuntimeOptions {
  canvas: HTMLCanvasElement
  container: HTMLElement
  content: JourneyContent
  getSnapshot: () => WeddingJourneySnapshot
  getTilt: () => { x: number; y: number }
  reducedMotion: boolean
  paused?: boolean
  forceQuality?: JourneyQuality
  onReady?: () => void
  onFailure?: () => void
}

export interface WeddingJourneyRuntime {
  start: () => void
  setPaused: (paused: boolean) => void
  updateContent: (content: JourneyContent) => void
  dispose: () => void
}

type ChapterGroup = {
  group: THREE.Group
}

type MaterialWithMap = THREE.Material & {
  map?: THREE.Texture | null
}

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

const CHAPTER_COUNT = 8
const TAU = Math.PI * 2

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smoothstep = (value: number) => value * value * (3 - 2 * value)

function detectQuality(forceQuality?: JourneyQuality): JourneyQuality {
  if (forceQuality) return forceQuality
  const nav = navigator as NavigatorWithMemory
  const narrow = window.innerWidth < 720
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4
  const lowCpu = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4

  if (nav.connection?.saveData || (narrow && (lowMemory || lowCpu))) return 'lite'
  if (narrow || lowMemory || lowCpu) return 'balanced'
  return 'high'
}

function addBox(
  parent: THREE.Object3D,
  size: [number, number, number],
  position: [number, number, number],
  material: THREE.Material,
  rotation?: [number, number, number],
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material)
  mesh.position.set(...position)
  if (rotation) mesh.rotation.set(...rotation)
  mesh.castShadow = true
  mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}

function addSphere(
  parent: THREE.Object3D,
  radius: number,
  position: [number, number, number],
  material: THREE.Material,
  scale: [number, number, number] = [1, 1, 1],
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 14, 10), material)
  mesh.position.set(...position)
  mesh.scale.set(...scale)
  mesh.castShadow = true
  parent.add(mesh)
  return mesh
}

function createFrame(
  parent: THREE.Object3D,
  position: [number, number, number],
  size: [number, number],
  materials: { gold: THREE.Material; paper: THREE.Material },
  rotationY = 0,
): THREE.Group {
  const frame = new THREE.Group()
  frame.position.set(...position)
  frame.rotation.y = rotationY
  const [width, height] = size
  const rail = 0.11

  addBox(frame, [width + rail * 2, rail, 0.11], [0, height / 2, 0], materials.gold)
  addBox(frame, [width + rail * 2, rail, 0.11], [0, -height / 2, 0], materials.gold)
  addBox(frame, [rail, height, 0.11], [-width / 2, 0, 0], materials.gold)
  addBox(frame, [rail, height, 0.11], [width / 2, 0, 0], materials.gold)
  addBox(frame, [width, height, 0.055], [0, 0, -0.06], materials.paper)
  parent.add(frame)
  return frame
}

function createFloralCluster(
  parent: THREE.Object3D,
  position: THREE.Vector3,
  flowerMaterial: THREE.Material,
  leafMaterial: THREE.Material,
  count: number,
  spread: number,
): THREE.Group {
  const cluster = new THREE.Group()
  cluster.position.copy(position)

  for (let index = 0; index < count; index += 1) {
    const angle = index * 2.399
    const radius = spread * Math.sqrt((index + 0.5) / count)
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius * 0.72
    const z = Math.sin(index * 1.7) * 0.15
    addSphere(cluster, 0.12 + (index % 3) * 0.025, [x, y, z], flowerMaterial, [1, 0.76, 1])

    if (index % 4 === 0) {
      const leaf = addSphere(cluster, 0.1, [x * 1.08, y - 0.04, z - 0.06], leafMaterial, [0.5, 1.45, 0.28])
      leaf.rotation.z = angle
    }
  }

  parent.add(cluster)
  return cluster
}

function createArch(
  parent: THREE.Object3D,
  materials: { gold: THREE.Material; flower: THREE.Material; leaf: THREE.Material },
  quality: JourneyQuality,
): THREE.Group {
  const arch = new THREE.Group()
  const flowerCount = quality === 'high' ? 15 : quality === 'balanced' ? 11 : 7
  addBox(arch, [0.14, 4.15, 0.14], [-2.35, 0.15, 0], materials.gold)
  addBox(arch, [0.14, 4.15, 0.14], [2.35, 0.15, 0], materials.gold)

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.35, 2.2, 0),
    new THREE.Vector3(-1.5, 3.18, 0),
    new THREE.Vector3(0, 3.62, 0),
    new THREE.Vector3(1.5, 3.18, 0),
    new THREE.Vector3(2.35, 2.2, 0),
  ])
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 44, 0.075, 8, false), materials.gold)
  tube.castShadow = true
  arch.add(tube)

  const clusters = [
    new THREE.Vector3(-2.35, 2.15, 0),
    new THREE.Vector3(-1.5, 3.16, 0),
    new THREE.Vector3(0, 3.52, 0),
    new THREE.Vector3(1.5, 3.16, 0),
    new THREE.Vector3(2.35, 2.15, 0),
  ]
  clusters.forEach((position, index) => {
    createFloralCluster(arch, position, materials.flower, materials.leaf, flowerCount - (index % 2) * 2, 0.52)
  })

  parent.add(arch)
  return arch
}

function createCurtain(
  parent: THREE.Object3D,
  side: -1 | 1,
  material: THREE.MeshPhysicalMaterial,
): THREE.Mesh {
  const segments = 34
  const geometry = new THREE.PlaneGeometry(2.25, 7.6, segments, 4)
  const positions = geometry.attributes.position as THREE.BufferAttribute

  for (let index = 0; index < positions.count; index += 1) {
    const x = positions.getX(index)
    const y = positions.getY(index)
    const edgePull = Math.pow(Math.abs(y) / 3.8, 1.4)
    positions.setZ(index, Math.sin((x + 1.1) * 8.5) * 0.11 + edgePull * 0.1)
    positions.setX(index, x + side * edgePull * 0.18)
  }
  positions.needsUpdate = true
  geometry.computeVertexNormals()

  const curtain = new THREE.Mesh(geometry, material)
  curtain.position.set(side * 4.22, 1.35, -0.25)
  curtain.rotation.y = side * -0.17
  curtain.castShadow = true
  parent.add(curtain)
  return curtain
}

function makeTextTexture(
  title: string,
  subtitle: string,
  palette: { background: string; ink: string; accent: string },
  details?: { venue?: string; hall?: string; date?: string; address?: string; time?: string; monogram?: string },
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1440
  const context = canvas.getContext('2d')
  if (!context) return new THREE.CanvasTexture(canvas)

  const gradient = context.createLinearGradient(0, 0, 1024, 1440)
  gradient.addColorStop(0, '#ffffff')
  gradient.addColorStop(0.4, '#f8fbfd')
  gradient.addColorStop(1, '#eaf2f8')
  context.fillStyle = gradient
  context.fillRect(0, 0, 1024, 1440)

  // Ornate French double gilded border
  context.strokeStyle = palette.accent
  context.lineWidth = 10
  context.strokeRect(48, 48, 928, 1344)
  context.lineWidth = 3
  context.strokeRect(68, 68, 888, 1304)

  // Filigree corner brackets
  const drawCorner = (x: number, y: number, scaleX: number, scaleY: number) => {
    context.save()
    context.translate(x, y)
    context.scale(scaleX, scaleY)
    context.beginPath()
    context.moveTo(0, 36)
    context.lineTo(0, 0)
    context.lineTo(36, 0)
    context.strokeStyle = palette.accent
    context.lineWidth = 5
    context.stroke()
    context.restore()
  }
  drawCorner(80, 80, 1, 1)
  drawCorner(944, 80, -1, 1)
  drawCorner(80, 1360, 1, -1)
  drawCorner(944, 1360, -1, -1)

  context.textAlign = 'center'

  // Header
  context.fillStyle = palette.accent
  context.font = '700 30px "Playfair Display", "Times New Roman", serif'
  context.fillText('LỄ THÀNH HÔN', 512, 175)
  context.font = 'italic 24px "Cormorant Garamond", "Playfair Display", serif'
  context.fillStyle = '#6b8eac'
  context.fillText('— SERENITY CHÂTEAU —', 512, 225)

  // Subtitle / Greeting
  context.fillStyle = palette.ink
  context.font = 'italic 34px "Cormorant Garamond", "Playfair Display", serif'
  context.fillText(subtitle, 512, 335)

  // Couple names
  const titleLines = title.split('&').map((line) => line.trim())
  context.fillStyle = palette.ink
  context.font = '600 68px "Playfair Display", "Times New Roman", serif'
  context.fillText(titleLines[0] ?? title, 512, 455)

  if (titleLines.length > 1) {
    context.fillStyle = palette.accent
    context.font = 'italic 76px "Playfair Display", "Times New Roman", serif'
    context.fillText('&', 512, 550)
    context.fillStyle = palette.ink
    context.font = '600 68px "Playfair Display", "Times New Roman", serif'
    context.fillText(titleLines[1], 512, 645)
  }

  // Divider line with gold diamond
  context.strokeStyle = palette.accent
  context.lineWidth = 2
  context.beginPath()
  context.moveTo(280, 730)
  context.lineTo(744, 730)
  context.stroke()

  context.fillStyle = palette.accent
  context.beginPath()
  context.arc(512, 730, 7, 0, Math.PI * 2)
  context.fill()

  // Date & Time
  context.fillStyle = palette.accent
  context.font = '700 40px "Playfair Display", "Times New Roman", serif'
  context.fillText(details?.date || 'THỨ SÁU · 20.11.2026', 512, 830)
  context.font = '600 28px "Plus Jakarta Sans", sans-serif'
  context.fillStyle = palette.ink
  context.fillText(details?.time || '17:30 (ĐÓN KHÁCH) — 18:30 (KHAI TIỆC)', 512, 895)

  // Divider
  context.beginPath()
  context.moveTo(340, 960)
  context.lineTo(684, 960)
  context.stroke()

  // Venue & Hall
  context.font = '700 38px "Playfair Display", "Times New Roman", serif'
  context.fillStyle = palette.ink
  context.fillText(details?.venue || 'RIVERSIDE PALACE', 512, 1050)
  context.font = 'italic 28px "Cormorant Garamond", "Playfair Display", serif'
  context.fillStyle = palette.accent
  context.fillText(details?.hall || 'Sảnh Grand Ballroom · Tầng 2', 512, 1105)

  // Address
  context.font = '500 24px "Plus Jakarta Sans", sans-serif'
  context.fillStyle = '#4a6572'
  context.fillText(details?.address || '360D Bến Vân Đồn, Phường 1, Quận 4, TP. HCM', 512, 1165)

  // Wax seal imitation emblem at bottom
  context.beginPath()
  context.arc(512, 1265, 34, 0, Math.PI * 2)
  context.fillStyle = '#8e2329'
  context.fill()
  context.strokeStyle = '#cca968'
  context.lineWidth = 3
  context.stroke()

  context.fillStyle = '#f8f4eb'
  context.font = 'bold 24px "Cinzel", "Playfair Display", serif'
  context.fillText(details?.monogram || 'Q & M', 512, 1273)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function loadTexture(
  url: string,
  renderer: THREE.WebGLRenderer,
  onLoad: (texture: THREE.Texture) => void,
): void {
  if (!url) return
  const loader = new THREE.TextureLoader()
  loader.setCrossOrigin('anonymous')
  loader.load(
    url,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      onLoad(texture)
    },
    undefined,
    () => undefined,
  )
}

function createChandelier(
  parent: THREE.Object3D,
  position: [number, number, number],
  materials: { gold: THREE.Material; light: THREE.Material },
  quality: JourneyQuality,
): THREE.Group {
  const chandelier = new THREE.Group()
  chandelier.position.set(...position)
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.25, 8), materials.gold)
  stem.position.y = 0.65
  chandelier.add(stem)

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.025, 8, 30), materials.gold)
  ring.rotation.x = Math.PI / 2
  chandelier.add(ring)

  const candleCount = quality === 'lite' ? 6 : 10
  for (let index = 0; index < candleCount; index += 1) {
    const angle = (index / candleCount) * TAU
    const x = Math.cos(angle) * 0.62
    const z = Math.sin(angle) * 0.62
    addBox(chandelier, [0.035, 0.25, 0.035], [x, 0.14, z], materials.gold)
    addSphere(chandelier, 0.055, [x, 0.31, z], materials.light, [0.72, 1.35, 0.72])
  }
  parent.add(chandelier)
  return chandelier
}

function createPedestal(
  parent: THREE.Object3D,
  x: number,
  z: number,
  materials: { marble: THREE.Material; gold: THREE.Material; light: THREE.Material },
): THREE.Group {
  const pedestal = new THREE.Group()
  pedestal.position.set(x, -2.05, z)
  addBox(pedestal, [1.24, 0.22, 1.1], [0, 0, 0], materials.marble)
  addBox(pedestal, [0.86, 1.25, 0.75], [0, 0.72, 0], materials.marble)
  addBox(pedestal, [1.1, 0.14, 0.95], [0, 1.4, 0], materials.gold)
  addSphere(pedestal, 0.16, [0, 1.72, 0], materials.light, [0.8, 1.25, 0.8])
  parent.add(pedestal)
  return pedestal
}

function createBook(
  parent: THREE.Object3D,
  position: [number, number, number],
  materials: { paper: THREE.Material; gold: THREE.Material },
): THREE.Group {
  const book = new THREE.Group()
  book.position.set(...position)
  book.rotation.x = -0.1
  book.rotation.y = 0.05
  addBox(book, [1.72, 0.08, 1.16], [-0.87, 0, 0], materials.paper, [0, 0, -0.08])
  addBox(book, [1.72, 0.08, 1.16], [0.87, 0, 0], materials.paper, [0, 0, 0.08])
  addBox(book, [0.08, 0.11, 1.2], [0, -0.03, 0], materials.gold)
  parent.add(book)
  return book
}

function createPetals(
  parent: THREE.Object3D,
  count: number,
  material: THREE.Material,
): THREE.InstancedMesh {
  const geometry = new THREE.PlaneGeometry(0.09, 0.15)
  const petals = new THREE.InstancedMesh(geometry, material, count)
  const dummy = new THREE.Object3D()

  for (let index = 0; index < count; index += 1) {
    const seed = index * 12.9898
    dummy.position.set(
      Math.sin(seed) * 5.5,
      ((index * 1.7) % 8) - 2.5,
      -((index * 3.1) % 18),
    )
    dummy.rotation.set(seed % Math.PI, (seed * 0.7) % Math.PI, (seed * 1.3) % TAU)
    dummy.scale.setScalar(0.7 + (index % 5) * 0.1)
    dummy.updateMatrix()
    petals.setMatrixAt(index, dummy.matrix)
  }
  petals.instanceMatrix.needsUpdate = true
  petals.frustumCulled = false
  parent.add(petals)
  return petals
}

export function createWeddingJourneyRuntime(
  options: WeddingJourneyRuntimeOptions,
): WeddingJourneyRuntime {
  const {
    canvas,
    container,
    getSnapshot,
    getTilt,
    reducedMotion,
    onReady,
    onFailure,
  } = options

  let content = options.content
  let paused = options.paused ?? false
  let disposed = false
  let started = false
  let rafId = 0
  let lastFrame = performance.now()
  let slowFrames = 0
  let readyEmitted = false
  let quality = detectQuality(options.forceQuality)
  let runtimeDprCap = quality === 'high' ? 2 : quality === 'balanced' ? 1.5 : 1

  const disposableTextures = new Set<THREE.Texture>()
  const ownedMaterials = new Set<THREE.Material>()

  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: quality !== 'lite',
      alpha: true,
      powerPreference: 'high-performance',
    })
  } catch {
    onFailure?.()
    return {
      start: () => undefined,
      setPaused: () => undefined,
      updateContent: () => undefined,
      dispose: () => undefined,
    }
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace
  canvas.dataset.journeyQuality = quality
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.04
  renderer.shadowMap.enabled = quality !== 'lite'
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setClearColor(0x0d1b2b, 0)

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x132a42, quality === 'lite' ? 0.026 : 0.019)

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120)
  camera.position.set(0, 0.15, 7.4)

  const palette = {
    midnight: new THREE.MeshStandardMaterial({ color: 0x102236, roughness: 0.66, metalness: 0.08 }),
    slate: new THREE.MeshPhysicalMaterial({ color: 0x31597f, roughness: 0.7, metalness: 0.03, sheen: 0.6, sheenColor: 0xa9c8e2 }),
    curtain: new THREE.MeshPhysicalMaterial({
      color: 0x315b82,
      roughness: 0.56,
      metalness: 0.04,
      sheen: 1,
      sheenColor: 0xbad4ea,
      side: THREE.DoubleSide,
    }),
    porcelain: new THREE.MeshPhysicalMaterial({ color: 0xf7fbff, roughness: 0.32, metalness: 0.02, clearcoat: 0.28 }),
    paper: new THREE.MeshStandardMaterial({ color: 0xf2f6fa, roughness: 0.86, metalness: 0 }),
    marble: new THREE.MeshPhysicalMaterial({ color: 0xe7eef5, roughness: 0.28, metalness: 0.08, clearcoat: 0.46 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xcca968, roughness: 0.27, metalness: 0.82 }),
    leaf: new THREE.MeshStandardMaterial({ color: 0x355e68, roughness: 0.76, metalness: 0.02 }),
    flower: new THREE.MeshPhysicalMaterial({ color: 0xfafcff, roughness: 0.56, metalness: 0, transmission: 0.05 }),
    light: new THREE.MeshBasicMaterial({ color: 0xffe9b0, toneMapped: false }),
    petal: new THREE.MeshBasicMaterial({ color: 0xf5fbff, side: THREE.DoubleSide, transparent: true, opacity: 0.7, depthWrite: false }),
  }
  Object.values(palette).forEach((material) => ownedMaterials.add(material))

  const ambient = new THREE.HemisphereLight(0xd7eaff, 0x172438, 1.35)
  scene.add(ambient)

  const keyLight = new THREE.DirectionalLight(0xfff0d4, quality === 'lite' ? 2.2 : 3.4)
  keyLight.position.set(-4, 7, 6)
  keyLight.castShadow = quality !== 'lite'
  keyLight.shadow.mapSize.set(quality === 'high' ? 2048 : 1024, quality === 'high' ? 2048 : 1024)
  keyLight.shadow.camera.near = 0.5
  keyLight.shadow.camera.far = 45
  keyLight.shadow.camera.left = -10
  keyLight.shadow.camera.right = 10
  keyLight.shadow.camera.top = 10
  keyLight.shadow.camera.bottom = -10
  scene.add(keyLight)

  const blueFill = new THREE.PointLight(0x8fc8ff, 24, 20, 2)
  blueFill.position.set(4.5, 2, 2)
  scene.add(blueFill)

  const goldRim = new THREE.PointLight(0xffcf7a, 15, 18, 2)
  goldRim.position.set(-4, 0.5, -5)
  scene.add(goldRim)

  const world = new THREE.Group()
  scene.add(world)

  const floor = addBox(world, [16, 0.22, 58], [0, -2.72, -18], palette.marble)
  floor.receiveShadow = true

  for (let index = 0; index < 16; index += 1) {
    const z = 3 - index * 3.2
    addBox(world, [0.04, 0.012, 2.6], [-1.34, -2.58, z], palette.gold)
    addBox(world, [0.04, 0.012, 2.6], [1.34, -2.58, z], palette.gold)
  }

  for (const side of [-1, 1] as const) {
    for (let index = 0; index < 8; index += 1) {
      const columnZ = 2 - index * 6.2
      const column = new THREE.Group()
      column.position.set(side * 5.15, -0.6, columnZ)
      addBox(column, [0.86, 0.24, 0.86], [0, -2.02, 0], palette.marble)
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.4, 3.75, 18), palette.porcelain)
      shaft.position.y = 0
      shaft.castShadow = true
      column.add(shaft)
      addBox(column, [0.82, 0.18, 0.82], [0, 1.95, 0], palette.gold)
      world.add(column)
    }
  }

  const chapterGroups: ChapterGroup[] = []
  for (let index = 0; index < CHAPTER_COUNT; index += 1) {
    const home = new THREE.Vector3(0, 0, -index * 6.3)
    const group = new THREE.Group()
    group.position.copy(home)
    world.add(group)
    chapterGroups.push({ group })
  }

  // Hero: arch, silk and central portrait.
  const heroGroup = chapterGroups[0].group
  createCurtain(heroGroup, -1, palette.curtain)
  createCurtain(heroGroup, 1, palette.curtain)
  const heroArch = createArch(heroGroup, { gold: palette.gold, flower: palette.flower, leaf: palette.leaf }, quality)
  heroArch.position.z = -0.45
  const heroPortraitMaterial = new THREE.MeshBasicMaterial({ color: 0xd9e6ef, toneMapped: true })
  ownedMaterials.add(heroPortraitMaterial)
  const heroPortrait = new THREE.Mesh(new THREE.PlaneGeometry(2.78, 3.55), heroPortraitMaterial)
  heroPortrait.position.set(0, 0.15, -0.58)
  heroGroup.add(heroPortrait)
  createFrame(heroGroup, [0, 0.15, -0.5], [2.92, 3.68], { gold: palette.gold, paper: palette.paper })
  createFloralCluster(heroGroup, new THREE.Vector3(-3.55, -1.9, 0.1), palette.flower, palette.leaf, quality === 'high' ? 26 : 15, 1.12)
  createFloralCluster(heroGroup, new THREE.Vector3(3.55, -1.9, 0.1), palette.flower, palette.leaf, quality === 'high' ? 26 : 15, 1.12)

  // Invitation: console table, upright invitation easel, wax seal and calendar.
  const invitationGroup = chapterGroups[1].group
  addBox(invitationGroup, [6.8, 0.24, 2.25], [0, -1.55, -0.25], palette.midnight)
  addBox(invitationGroup, [0.27, 1.65, 0.27], [-2.75, -2.25, -0.25], palette.gold)
  addBox(invitationGroup, [0.27, 1.65, 0.27], [2.75, -2.25, -0.25], palette.gold)
  // Gilded console table front molding
  addBox(invitationGroup, [6.85, 0.08, 0.08], [0, -1.45, 0.88], palette.gold)

  const receptionEvent = content.events.find((e) => e.type === 'reception') || content.events[2]
  const invitationTexture = makeTextTexture(
    `${content.couple.groom.shortName} & ${content.couple.bride.shortName}`,
    'Trân trọng kính mời quý khách',
    { background: '#f8fbfd', ink: '#254465', accent: '#cca968' },
    {
      venue: receptionEvent?.locationName || 'RIVERSIDE PALACE',
      hall: 'Sảnh Grand Ballroom · Tầng 2',
      date: 'THỨ SÁU · 20.11.2026',
      address: receptionEvent?.address || '360D Bến Vân Đồn, Phường 1, Quận 4, TP. HCM',
      time: '17:30 (ĐÓN KHÁCH) — 18:30 (KHAI TIỆC)',
      monogram: content.couple.monogram || 'Q & M',
    },
  )
  disposableTextures.add(invitationTexture)
  const invitationMaterial = new THREE.MeshBasicMaterial({ map: invitationTexture, toneMapped: true })
  ownedMaterials.add(invitationMaterial)
  const invitationCard = new THREE.Mesh(new THREE.PlaneGeometry(2.15, 2.86), invitationMaterial)
  invitationCard.position.set(-1.35, 0.02, 0)
  invitationCard.rotation.y = 0.12
  invitationGroup.add(invitationCard)
  createFrame(invitationGroup, [-1.35, 0.02, -0.06], [2.25, 2.98], { gold: palette.gold, paper: palette.paper }, 0.12)

  // 3D Easel stand behind the invitation card
  addBox(invitationGroup, [0.1, 2.9, 0.1], [-1.35, 0.02, -0.3], palette.gold)
  addBox(invitationGroup, [2.3, 0.12, 0.35], [-1.35, -1.38, 0.02], palette.gold)

  // 3D Royal Wax Seal medallion at the bottom of the invitation
  const sealGeometry = new THREE.CylinderGeometry(0.16, 0.16, 0.04, 16)
  const sealMaterial = new THREE.MeshBasicMaterial({ color: 0x8e2329 })
  ownedMaterials.add(sealMaterial)
  const sealMesh = new THREE.Mesh(sealGeometry, sealMaterial)
  sealMesh.rotation.x = Math.PI / 2
  sealMesh.position.set(-1.35, -1.24, 0.06)
  invitationGroup.add(sealMesh)

  // Decorative floral cluster and candle lantern on table
  createFloralCluster(invitationGroup, new THREE.Vector3(-3.05, -1.05, 0.15), palette.flower, palette.leaf, 14, 0.72)
  // Candle lantern right side
  addBox(invitationGroup, [0.35, 0.7, 0.35], [3.1, -1.15, 0], palette.gold)
  addBox(invitationGroup, [0.22, 0.45, 0.22], [3.1, -1.15, 0], palette.light)

  const calendar = new THREE.Group()
  calendar.position.set(1.62, -0.2, 0.05)
  calendar.rotation.y = -0.12
  addBox(calendar, [2.15, 2.25, 0.11], [0, 0, 0], palette.paper)
  addBox(calendar, [2.2, 0.36, 0.14], [0, 0.96, 0.04], palette.slate)
  // Calendar stand shelf
  addBox(calendar, [2.2, 0.1, 0.28], [0, -1.15, 0.08], palette.gold)
  for (let row = 0; row < 5; row += 1) {
    for (let column = 0; column < 7; column += 1) {
      const isWedding = row === 3 && column === 4
      addBox(
        calendar,
        [0.19, 0.19, isWedding ? 0.09 : 0.035],
        [-0.78 + column * 0.26, 0.52 - row * 0.32, 0.075],
        isWedding ? palette.gold : palette.porcelain,
      )
    }
  }
  invitationGroup.add(calendar)

  // Couple hall: three portrait frames with the joint portrait dominant.
  const coupleGroup = chapterGroups[2].group
  const jointMaterial = new THREE.MeshBasicMaterial({ color: 0xddeaf3, toneMapped: true })
  const groomMaterial = new THREE.MeshBasicMaterial({ color: 0xddeaf3, toneMapped: true })
  const brideMaterial = new THREE.MeshBasicMaterial({ color: 0xddeaf3, toneMapped: true })
  ownedMaterials.add(jointMaterial)
  ownedMaterials.add(groomMaterial)
  ownedMaterials.add(brideMaterial)

  const portraits = [
    { x: -3.18, y: -0.2, z: -0.6, width: 1.68, height: 2.42, rotation: 0.22, material: groomMaterial },
    { x: 0, y: 0.18, z: 0.28, width: 2.52, height: 3.55, rotation: 0, material: jointMaterial },
    { x: 3.18, y: -0.2, z: -0.6, width: 1.68, height: 2.42, rotation: -0.22, material: brideMaterial },
  ]
  portraits.forEach((portrait) => {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(portrait.width, portrait.height), portrait.material)
    plane.position.set(portrait.x, portrait.y, portrait.z)
    plane.rotation.y = portrait.rotation
    coupleGroup.add(plane)
    createFrame(
      coupleGroup,
      [portrait.x, portrait.y, portrait.z - 0.05],
      [portrait.width + 0.12, portrait.height + 0.12],
      { gold: palette.gold, paper: palette.paper },
      portrait.rotation,
    )
  })
  createChandelier(coupleGroup, [0, 3.5, -0.2], { gold: palette.gold, light: palette.light }, quality)

  // Event aisle: three illuminated ceremonial pedestals.
  const eventsGroup = chapterGroups[3].group
  const eventPedestalCount = Math.min(3, Math.max(1, content.events.length))
  const eventPositions = eventPedestalCount === 1 ? [0] : eventPedestalCount === 2 ? [-1.6, 1.6] : [-2.45, 0, 2.45]
  eventPositions.forEach((x, index) => {
    createPedestal(eventsGroup, x, index === 1 ? 0.65 : 0, {
      marble: palette.marble,
      gold: palette.gold,
      light: palette.light,
    })
  })
  createArch(eventsGroup, { gold: palette.gold, flower: palette.flower, leaf: palette.leaf }, quality).position.z = -1.3

  // Gallery corridor: alternating curved frames.
  const galleryGroup = chapterGroups[4].group
  const galleryMaterials: THREE.MeshBasicMaterial[] = []
  const galleryLimit = quality === 'lite' ? 6 : 10
  for (let index = 0; index < galleryLimit; index += 1) {
    const side = index % 2 === 0 ? -1 : 1
    const depth = Math.floor(index / 2) * -1.05
    const x = side * (2.05 + Math.floor(index / 2) * 0.22)
    const rotationY = side * -0.36
    const material = new THREE.MeshBasicMaterial({ color: index % 2 === 0 ? 0xc9dae8 : 0xe8eef4, toneMapped: true })
    ownedMaterials.add(material)
    galleryMaterials.push(material)
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 2.05), material)
    plane.position.set(x, -0.02 + (index % 3) * 0.15, depth)
    plane.rotation.y = rotationY
    galleryGroup.add(plane)
    createFrame(galleryGroup, [x, plane.position.y, depth - 0.05], [1.67, 2.17], { gold: palette.gold, paper: palette.paper }, rotationY)
  }

  // RSVP writing desk.
  const rsvpGroup = chapterGroups[5].group
  addBox(rsvpGroup, [6.5, 0.3, 2.5], [0, -1.5, -0.15], palette.midnight)
  addBox(rsvpGroup, [0.34, 1.75, 0.34], [-2.55, -2.28, -0.15], palette.gold)
  addBox(rsvpGroup, [0.34, 1.75, 0.34], [2.55, -2.28, -0.15], palette.gold)
  createBook(rsvpGroup, [0, -1.22, 0.28], { paper: palette.paper, gold: palette.gold })
  const pen = addBox(rsvpGroup, [0.06, 0.06, 1.42], [2.05, -1.12, 0.26], palette.gold)
  pen.rotation.y = -0.4
  addSphere(rsvpGroup, 0.12, [-2.12, -0.98, 0.15], palette.light, [0.75, 1.4, 0.75])

  // Guestbook notes and final ceremony arch.
  const guestbookGroup = chapterGroups[6].group
  for (let index = 0; index < 12; index += 1) {
    const note = addBox(
      guestbookGroup,
      [0.78, 0.95, 0.035],
      [Math.sin(index * 2.1) * 3.2, -1.55 + (index % 4) * 0.95, Math.cos(index * 1.4) * 0.7],
      palette.paper,
    )
    note.rotation.z = Math.sin(index * 0.9) * 0.2
    note.rotation.y = Math.cos(index * 1.3) * 0.28
  }
  createBook(guestbookGroup, [0, -1.55, 0.4], { paper: palette.paper, gold: palette.gold })

  const finaleGroup = chapterGroups[7].group
  createCurtain(finaleGroup, -1, palette.curtain)
  createCurtain(finaleGroup, 1, palette.curtain)
  createArch(finaleGroup, { gold: palette.gold, flower: palette.flower, leaf: palette.leaf }, quality)
  const ringGeometry = new THREE.TorusGeometry(0.72, 0.07, 12, 56)
  const leftRing = new THREE.Mesh(ringGeometry, palette.gold)
  const rightRing = new THREE.Mesh(ringGeometry, palette.gold)
  leftRing.position.set(-0.38, 0.2, 0.2)
  rightRing.position.set(0.38, 0.2, 0.1)
  leftRing.rotation.y = 0.25
  rightRing.rotation.y = -0.25
  finaleGroup.add(leftRing, rightRing)
  createChandelier(finaleGroup, [0, 3.42, -0.25], { gold: palette.gold, light: palette.light }, quality)

  const petals = createPetals(world, quality === 'high' ? 80 : quality === 'balanced' ? 42 : 18, palette.petal)

  const textureAssignments = new Map<THREE.MeshBasicMaterial, string>()
  const textureLoadGeneration = new Map<THREE.MeshBasicMaterial, number>()

  const assignTexture = (material: THREE.MeshBasicMaterial, url: string) => {
    const previousUrl = textureAssignments.get(material)
    if (!url || previousUrl === url) return
    textureAssignments.set(material, url)
    const generation = (textureLoadGeneration.get(material) ?? 0) + 1
    textureLoadGeneration.set(material, generation)
    loadTexture(url, renderer, (texture) => {
      if (
        disposed ||
        textureAssignments.get(material) !== url ||
        textureLoadGeneration.get(material) !== generation
      ) {
        texture.dispose()
        return
      }
      if (material.map && disposableTextures.has(material.map)) {
        material.map.dispose()
        disposableTextures.delete(material.map)
      }
      material.map = texture
      material.color.set(0xffffff)
      material.needsUpdate = true
      disposableTextures.add(texture)
    })
  }

  const updateTextures = () => {
    assignTexture(
      heroPortraitMaterial,
      content.heroImage || content.couple.heroBanners?.[0] || content.couple.jointImage,
    )
    assignTexture(jointMaterial, content.couple.jointImage)
    assignTexture(groomMaterial, content.couple.groom.image)
    assignTexture(brideMaterial, content.couple.bride.image)
    galleryMaterials.forEach((material, index) => {
      const photo = content.gallery[index % Math.max(1, content.gallery.length)]
      if (photo) assignTexture(material, photo.url)
    })

    const reception = content.events.find((e) => e.type === 'reception') || content.events[2]
    const updatedInvitationTexture = makeTextTexture(
      `${content.couple.groom.shortName} & ${content.couple.bride.shortName}`,
      'Trân trọng kính mời quý khách',
      { background: '#f8fbfd', ink: '#254465', accent: '#cca968' },
      {
        venue: reception?.locationName || 'RIVERSIDE PALACE',
        hall: 'Sảnh Grand Ballroom · Tầng 2',
        date: 'THỨ SÁU · 20.11.2026',
        address: reception?.address || '360D Bến Vân Đồn, Phường 1, Quận 4, TP. HCM',
        time: '17:30 (ĐÓN KHÁCH) — 18:30 (KHAI TIỆC)',
        monogram: content.couple.monogram || 'Q & M',
      },
    )
    if (invitationMaterial.map) {
      invitationMaterial.map.dispose()
      disposableTextures.delete(invitationMaterial.map)
    }
    invitationMaterial.map = updatedInvitationTexture
    invitationMaterial.needsUpdate = true
    disposableTextures.add(updatedInvitationTexture)
  }
  updateTextures()

  const resize = () => {
    const rect = container.getBoundingClientRect()
    const width = Math.max(1, rect.width)
    const height = Math.max(1, rect.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, runtimeDprCap))
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.fov = width < 720 ? 52 : 42
    camera.updateProjectionMatrix()
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)
  resize()

  const cameraPosition = new THREE.Vector3(0, 0.1, 7.45)
  const cameraTargetPosition = new THREE.Vector3()
  const lookTarget = new THREE.Vector3()

  const render = (now: number) => {
    if (disposed) return
    rafId = window.requestAnimationFrame(render)
    if (paused || document.hidden) {
      lastFrame = now
      return
    }

    const delta = Math.min(0.05, Math.max(0.001, (now - lastFrame) / 1000))
    lastFrame = now

    if (quality !== 'lite' && delta > 0.028) {
      slowFrames += 1
      if (slowFrames > 120) {
        quality = quality === 'high' ? 'balanced' : 'lite'
        canvas.dataset.journeyQuality = quality
        runtimeDprCap = quality === 'balanced' ? 1.5 : 1
        renderer.shadowMap.enabled = quality !== 'lite'
        resize()
        slowFrames = 0
      }
    } else {
      slowFrames = Math.max(0, slowFrames - 1)
    }

    const snapshot = getSnapshot()
    const tilt = reducedMotion ? { x: 0, y: 0 } : getTilt()
    const totalProgress = reducedMotion
      ? snapshot.chapterIndex / Math.max(1, CHAPTER_COUNT - 1)
      : snapshot.overallProgress
    const travelZ = -totalProgress * (CHAPTER_COUNT - 1) * 6.3
    const chapterEase = reducedMotion ? 0 : smoothstep(snapshot.localProgress)
    const lateral = reducedMotion ? 0 : Math.sin(snapshot.chapterIndex * 1.37 + chapterEase * Math.PI) * 0.42
    const vertical = reducedMotion ? 0 : Math.sin(totalProgress * TAU * 1.2) * 0.11

    cameraTargetPosition.set(lateral + tilt.x * 0.2, 0.12 + vertical - tilt.y * 0.1, travelZ + 7.35)
    const follow = reducedMotion ? 1 : 1 - Math.pow(0.0001, delta)
    cameraPosition.lerp(cameraTargetPosition, follow * 0.42)
    camera.position.copy(cameraPosition)
    lookTarget.set(lateral * 0.28, -0.04, travelZ - 0.55)
    camera.lookAt(lookTarget)

    const currentProgress = snapshot.chapterIndex + snapshot.localProgress
    chapterGroups.forEach(({ group }, index) => {
      // Precise chapter culling: each chapter is only visible as the camera approaches it,
      // and is immediately culled once the camera moves past it to avoid overlapping subsequent chapters.
      const isLast = index === CHAPTER_COUNT - 1
      const isVisible = isLast
        ? currentProgress >= index - 0.75
        : currentProgress >= index - 0.75 && currentProgress <= index + 0.42
      group.visible = isVisible
      if (isVisible) {
        const distance = Math.abs(currentProgress - index)
        const visibility = clamp01(1 - distance * 1.1)
        group.scale.setScalar(0.95 + visibility * 0.05)
        group.rotation.y = reducedMotion ? 0 : Math.sin(now * 0.00018 + index) * 0.012 * visibility
      }
    })

    if (!reducedMotion) {
      if (chapterGroups[0].group.visible) {
        heroArch.rotation.z = Math.sin(now * 0.00032) * 0.006
      }
      if (chapterGroups[1].group.visible) {
        invitationCard.rotation.z = Math.sin(now * 0.0004) * 0.008
        calendar.rotation.z = Math.sin(now * 0.00035 + 1) * 0.006
      }
      if (chapterGroups[7].group.visible) {
        leftRing.rotation.z = now * 0.00008
        rightRing.rotation.z = -now * 0.00007
      }
      petals.rotation.y = now * 0.000025
      petals.position.y = Math.sin(now * 0.00018) * 0.22
    }

    renderer.render(scene, camera)
    if (!readyEmitted) {
      readyEmitted = true
      onReady?.()
    }
  }

  const handleContextLost = (event: Event) => {
    event.preventDefault()
    paused = true
    onFailure?.()
  }
  canvas.addEventListener('webglcontextlost', handleContextLost)

  const start = () => {
    if (started || disposed) return
    started = true
    lastFrame = performance.now()
    rafId = window.requestAnimationFrame(render)
  }

  const dispose = () => {
    if (disposed) return
    disposed = true
    window.cancelAnimationFrame(rafId)
    resizeObserver.disconnect()
    canvas.removeEventListener('webglcontextlost', handleContextLost)

    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return
      object.geometry.dispose()
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      materials.forEach((material) => ownedMaterials.add(material))
    })
    ownedMaterials.forEach((material) => {
      const texture = (material as MaterialWithMap).map
      if (texture) disposableTextures.add(texture)
      material.dispose()
    })
    disposableTextures.forEach((texture) => texture.dispose())
    delete canvas.dataset.journeyQuality
    renderer.dispose()
  }

  return {
    start,
    setPaused: (nextPaused) => {
      paused = nextPaused
      lastFrame = performance.now()
    },
    updateContent: (nextContent) => {
      content = nextContent
      updateTextures()
    },
    dispose,
  }
}
