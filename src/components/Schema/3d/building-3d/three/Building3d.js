import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// 导入后期效果合成器
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// three框架本身自带效果
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'

// 这里通过修改源代码的形式来修复背景透明问题
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { UnrealBloomPass } from './modify/UnrealBloomPass'
import modifyCityMaterial from './modify/modifyCityMaterial'
import FireSprite from './FireSprite'

export default class Building3d {
  constructor(el, cfg) {
    if (!el) return
    this.domEl = el

    //  宽高和配置项内容
    this.options = {
      width: this.domEl?.clientWidth,
      height: this.domEl?.clientHeight, //窗口高度
      rotateSpeed: cfg.rotateSpeed ?? 2,

      color: cfg.color ?? '#024144',
      scale: cfg.scale ?? 0.016,
      cameraPos: cfg.cameraPos ?? '0, 0.5, 4.5',

      threshold: cfg.threshold ?? 0.4,
      strength: cfg.strength ?? 0.5,
      radius: cfg.radius ?? 0.5,

      control: cfg.control ?? false,
    }

    this.updateMeshArr = []
    this.clock = new THREE.Clock()
    this.init()
    this.animate()
    this.addBuilding()
    this.initEffect()
    // this.addAxis()
    // this.addFireSprite()
  }
  init() {
    const { width, height, cameraPos } = this.options
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.000001, 10000)
    let pos = cameraPos.split(',').map(num => +num.trim())
    if (pos.length !== 3) pos = [0, 0, 0]
    this.camera.position.set(pos[0], pos[1], pos[2])

    this.renderer = new THREE.WebGLRenderer({
      logarithmicDepthBuffer: true,
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(width, height)
    this.renderer.shadowMap.enabled = true
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.physicallyCorrectLights = true
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1
    this.renderer.sortObjects = true

    this.control = new OrbitControls(this.camera, this.renderer.domElement)
    this.control.enabled = this.options.control

    this.domEl?.appendChild(this.renderer.domElement) //body元素中插入canvas对象
  }

  initEffect() {
    const { width, height, rotateSpeed, threshold, strength, radius } = this.options
    // 合成效果
    this.effectComposer = new EffectComposer(this.renderer)
    this.effectComposer.setSize(width, height)

    // 添加渲染通道
    const renderPass = new RenderPass(this.scene, this.camera)
    this.effectComposer.addPass(renderPass)

    // 点效果
    // const dotScreenPass = new DotScreenPass()
    // dotScreenPass.enabled = false
    // this.effectComposer.addPass(dotScreenPass)

    // 抗锯齿
    // const smaaPass = new SMAAPass()
    // this.effectComposer.addPass(smaaPass)

    // 发光效果
    this.unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(width, height))
    this.unrealBloomPass.renderToScreen = true
    this.unrealBloomPass.threshold = threshold
    this.unrealBloomPass.strength = strength
    this.unrealBloomPass.radius = radius

    this.control.autoRotate = true
    this.control.autoRotateSpeed = rotateSpeed

    this.effectComposer.addPass(this.unrealBloomPass)
  }

  addBuilding() {
    const { color } = this.options
    let buildingMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      wireframe: true,
    })

    modifyCityMaterial(buildingMaterial)

    const gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/gltf/')
    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.preload()
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load('./model/building-min.glb', gltf => {
      const { scale } = this.options
      gltf.scene.scale.set(scale, scale, scale)
      gltf.scene.position.set(0, -0.8, 0)
      gltf.scene.traverse(child => {
        if (child.isMesh) {
          child.material = buildingMaterial
        }
      })
      this.mesh = gltf.scene
      this.scene.add(gltf.scene)
    })
  }

  animate() {
    let deltaTime = this.clock.getDelta()
    this.control?.update()
    if (this.updateMeshArr.length > 0) {
      for (let i = 0; i < this.updateMeshArr.length; i++) {
        this.updateMeshArr[i].update(deltaTime)
      }
    }
    this.effectComposer?.render()
    requestAnimationFrame(() => this.animate())
  }

  remove() {
    this.updateMeshArr = []
    this.renderer = null
    this.effectComposer = null
    // this.mesh.remove()
    // this.mesh.removeFromParent()
    // this.mesh.geometry.dispose()
    // this.mesh.material.dispose()
    this.domEl.removeChild(this.domEl.children[0])
  }

  // 添加辅助坐标轴
  addAxis() {
    let axis = new THREE.AxesHelper(20)
    this.scene.add(axis)
  }

  addFireSprite(position, scale) {
    let fireSprite = new FireSprite(this.camera, position, scale)
    this.scene.add(fireSprite.mesh)
    this.updateMeshArr.push(fireSprite)
    return fireSprite
  }
}
