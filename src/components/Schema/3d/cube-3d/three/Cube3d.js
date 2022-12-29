import * as THREE from 'three'
import cubeImg from '../assets/cube_bg.png'
import pointImg from '../assets/light-point.png'

export default class Cube3d {
  constructor(el, cfg) {
    if (!el) return
    this.domEl = el
    //  宽高和配置项内容
    this.options = {
      width: this.domEl?.clientWidth,
      height: this.domEl?.clientHeight, //窗口高度
      rotateSpeed: cfg.rotateSpeed ?? 5,
      color: cfg.color ?? '#079cd1',
    }

    this.init()
    this.animate()
  }

  init() {
    const { width, height } = this.options
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(750, width / height, 0.1, 1000)
    this.camera.position.set(0, 0, 120)
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0xeeeeee, 0.0)

    // this.scene.add(new THREE.AxesHelper(100))

    this.renderCube()

    this.domEl?.appendChild(this.renderer.domElement) //body元素中插入canvas对象
  }

  renderCube() {
    let loader = new THREE.TextureLoader()
    let texture = loader.load(cubeImg)

    this.geometry = new THREE.BoxGeometry(40, 40, 40)
    this.material = new THREE.MeshBasicMaterial({
      color: this.options.color,
      map: texture,
      alphaMap: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      opacity: 0.3,
    })
    this.group = new THREE.Group()
    const cube = new THREE.Mesh(this.geometry, this.material)

    // 边界线

    let points = []
    points.push(new THREE.Vector3(-20, -20, 0))
    points.push(new THREE.Vector3(20, -20, 0))
    points.push(new THREE.Vector3(20, -15, 0))

    let outLine = this.reLineGeo([
      [-20, 20, 20],
      [20, 20, 20],
      [20, 20, -20],
      [-20, 20, -20],
      [-20, -20, -20],
      [20, -20, -20],
      [20, -20, 20],
      [-20, -20, 20],
      [-20, -20, -20],
      [-20, -20, 20],
      [-20, 20, 20],
      [-20, 20, 20],
      [20, 20, 20],
      [20, -20, 20],
      [20, -20, -20],
      [20, 20, -20],
      [-20, 20, -20],
      [-20, 20, 20],
    ])

    let line1 = this.reLineGeo([
      [0, -10, 0],
      [20, -10, 0],
      [20, 15, 0],
      [20, 15, 5],
      [20, 0, 5],
      [-20, 0, 5],
      [-20, 15, 5],
      [-10, 15, 5],
      [-10, 15, 15],
    ])
    let line2 = this.reLineGeo([
      [-10, -20, 0],
      [20, -20, 0],
      [20, -15, 0],
    ])

    let pointTexture = loader.load(pointImg)
    let pointMaterial = new THREE.PointsMaterial({
      size: 4,
      color: 0xffffff,
      map: pointTexture,
      transparent: true,
      depthWrite: false,
    })

    let cloud1 = new THREE.Points(line1.geometry, pointMaterial)
    let cloud2 = new THREE.Points(line2.geometry, pointMaterial)

    this.group.add(cube)
    this.group.add(outLine)
    this.group.add(line1)
    this.group.add(line2)
    this.group.add(cloud1)
    this.group.add(cloud2)
    this.group.rotation.y = -15

    this.scene.add(this.group)
  }

  reLineGeo(arr) {
    let points = []
    arr.forEach(item => {
      points.push(new THREE.Vector3(item[0], item[1], item[2]))
    })
    let lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    let lineMaterial = new THREE.LineBasicMaterial({ color: this.options.color })
    return new THREE.Line(lineGeometry, lineMaterial)
  }

  remove() {
    this.renderer = null
    this.group.remove()
    this.group.removeFromParent()
    this.geometry.dispose()
    this.material.dispose()
    this.domEl.removeChild(this.domEl.children[0])
  }

  animate() {
    requestAnimationFrame(() => this.animate()) //请求再次执行渲染函数render
    this.group.rotation.y += 0.001 * this.options.rotateSpeed
    this.renderer.render(this.scene, this.camera) //执行渲染操作
  }
}
