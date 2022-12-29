import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import mapImg from '../assets/map.jpg'
import earthImg from '../assets/earth.jpg'
import innerGlowImg from '../assets/innerGlow.png'
import lightColImg from '../assets/light_column.png'
import labelImg from '../assets/label.png'
import gsap from 'gsap'

export default class Earth3d {
  constructor(el, cfg) {
    if (!el) return
    this.domEl = el

    //  宽高和配置项内容
    this.options = {
      width: this.domEl?.clientWidth,
      height: this.domEl?.clientHeight, //窗口高度

      rotateSpeed: cfg.rotateSpeed ?? 2,
      radius: cfg.radius ?? 100,
      control: cfg.control ?? true,

      showLightEarth: cfg.showLightEarth ?? true,
      lightOffset: cfg.lightOffset ?? 2,

      lightLine: cfg.lightLine ?? true,
      lightSize: cfg.lightSize ?? 30,

      showGlow: cfg.showGlow ?? true,
      innerGlowRatio: cfg.innerGlowRatio ?? 2.65,
    }

    this.init()
    this.createEarth()
    if (this.options.showLightEarth) {
      this.createLightEarth()
    }

    if (this.options.showGlow) {
      this.createInnerGlow()
    }

    if (this.options.lightLine) {
      this.createLightLine()
    }
    this.animate()
  }
  init() {
    const { width, height, rotateSpeed } = this.options
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
    this.camera.position.set(0, 50, 300)
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0xeeeeee, 0.0)

    // this.scene.add(new THREE.AxesHelper(100))

    // 创建控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = rotateSpeed
    this.controls.enabled = this.options.control

    this.domEl?.appendChild(this.renderer.domElement) //body元素中插入canvas对象
  }

  createEarth() {
    let earthGeometry = new THREE.SphereGeometry(this.options.radius, 32, 32)
    let earthTexture = new THREE.TextureLoader().load(mapImg)

    let earthMaterial = new THREE.MeshBasicMaterial({
      map: earthTexture,
    })
    let earth = new THREE.Mesh(earthGeometry, earthMaterial)
    this.scene.add(earth)
  }

  createLightEarth() {
    let lightEarthGeometry = new THREE.SphereGeometry(
      this.options.radius + this.options.lightOffset,
      32,
      32,
    )
    let lightTexture = new THREE.TextureLoader().load(earthImg)
    let lightEarthMaterial = new THREE.MeshBasicMaterial({
      map: lightTexture,
      alphaMap: lightTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
    let lightEarth = new THREE.Mesh(lightEarthGeometry, lightEarthMaterial)
    this.scene.add(lightEarth)
  }

  createInnerGlow() {
    // 内发光
    let spriteTexture = new THREE.TextureLoader().load(innerGlowImg)
    let spriteMaterial = new THREE.SpriteMaterial({
      map: spriteTexture,
      color: 0x4d76cf,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    })
    let sprite = new THREE.Sprite(spriteMaterial)
    const ratio = this.options.radius * this.options.innerGlowRatio
    sprite.scale.set(ratio, ratio, 0)
    this.scene.add(sprite)
  }

  createLightLine() {
    for (let i = 0; i < this.options.lightSize; i++) {
      // 实现光柱
      let lightPillarTexture = new THREE.TextureLoader().load(lightColImg)
      let lightPillarGeometry = new THREE.PlaneGeometry(3, 20)
      let lightPillarMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: lightPillarTexture,
        alphaMap: lightPillarTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
      let lightPillar = new THREE.Mesh(lightPillarGeometry, lightPillarMaterial)
      lightPillar.add(lightPillar.clone().rotateY(Math.PI / 2))

      // 创建波纹扩散效果
      let circlePlane = new THREE.PlaneGeometry(6, 6)
      let circleTexture = new THREE.TextureLoader().load(labelImg)
      let circleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: circleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      let circleMesh = new THREE.Mesh(circlePlane, circleMaterial)
      circleMesh.rotation.x = -Math.PI / 2
      circleMesh.position.set(0, -7, 0)

      lightPillar.add(circleMesh)

      gsap.to(circleMesh.scale, {
        duration: 1 + Math.random() * 0.5,
        x: 2,
        y: 2,
        z: 2,
        repeat: -1,
        delay: Math.random() * 0.5,
        yoyo: true,
        ease: 'power2.inOut',
      })

      let lat = Math.random() * 180 - 90
      let lon = Math.random() * 360 - 180
      let position = this.lon2xyz(this.options.radius + this.options.lightOffset + 8, lon, lat)
      lightPillar.position.set(position.x, position.y, position.z)

      lightPillar.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        position.clone().normalize(),
      )
      this.scene.add(lightPillar)
    }
  }

  // 返回球面坐标
  lon2xyz(R, longitude, latitude) {
    let lon = (longitude * Math.PI) / 180 // 转弧度值
    const lat = (latitude * Math.PI) / 180 // 转弧度值
    lon = -lon // js坐标系z坐标轴对应经度-90度，而不是90度

    // 经纬度坐标转球面坐标计算公式
    const x = R * Math.cos(lat) * Math.cos(lon)
    const y = R * Math.sin(lat)
    const z = R * Math.cos(lat) * Math.sin(lon)
    // 返回球面坐标
    return new THREE.Vector3(x, y, z)
  }

  animate() {
    this.controls?.update()
    this.renderer?.render(this.scene, this.camera) //执行渲染操作
    requestAnimationFrame(() => this.animate()) //请求再次执行渲染函数render
  }
  remove() {
    this.renderer = null
    this.domEl.removeChild(this.domEl.children[0])
  }
}
