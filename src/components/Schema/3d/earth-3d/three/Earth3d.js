import * as THREE from 'three'
import earthImg from '../assets/earth.jpg'
import dotImg from '../assets/dot.png'

export default class Earth3d {
  constructor(el, cfg) {
    if (!el) return
    this.domEl = el
    //  宽高和配置项内容
    this.options = {
      width: this.domEl?.clientWidth,
      height: this.domEl?.clientHeight, //窗口高度
      blintSpeed: cfg.blintSpeed ?? 5,
      rotateSpeed: cfg.rotateSpeed ?? 5,
      radius: cfg.radius ?? 100,
      pointColor: cfg.dotColor ?? '#079cd1',
    }

    this.init()
    this.animate()
  }
  init() {
    const { width, height } = this.options
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000)
    this.camera.position.set(0, 0, 350)
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0xeeeeee, 0.0)
    // this.scene.add(new THREE.AxesHelper(100))
    this.initParticles()
    this.domEl?.appendChild(this.renderer.domElement) //body元素中插入canvas对象
  }

  initParticles() {
    this.earthParticles = new THREE.Object3D()
    // 解析目标图片
    const img = document.createElement('img')
    img.src = earthImg
    img.onload = () => {
      // 解析图片数据
      const cvs = document.createElement('canvas')
      const ctx = cvs.getContext('2d')
      cvs.width = img.width
      cvs.height = img.height
      ctx.drawImage(img, 0, 0, cvs.width, cvs.height)
      const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height)

      this.createEarthParticles(img, imgData)
    }
  }

  isLandByUV(img, imgData, c, f) {
    if (!imgData) {
      console.error('data error!') // 底图数据
    }
    let n = parseInt(img.width * c) // 根据横纵百分比计算图象坐标系中的坐标
    let o = parseInt(img.height * f) // 根据横纵百分比计算图象坐标系中的坐标
    return imgData.data[4 * (o * imgData.width + n)] === 0 // 查找底图中对应像素点的rgba值并判断
  }

  createEarthParticles(img, imgData) {
    const positions = []
    const materials = []
    const sizes = []
    const dotTexture = new THREE.TextureLoader().load(dotImg)
    for (let i = 0; i < 2; i++) {
      positions[i] = {
        positions: [],
      }
      sizes[i] = {
        sizes: [],
      }
      let mat = new THREE.PointsMaterial({
        size: 5,
        color: new THREE.Color(this.options.pointColor),
        depthWrite: false,
        transparent: true,
        opacity: 0,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        map: dotTexture,
        alphaMap: dotTexture,
      })

      // 追加记录参数
      let n = i / 2
      mat._t = n * Math.PI * 2
      mat._speed = this.options.blintSpeed * 0.01
      mat._min = 0.2 * Math.random() + 0.5
      mat._delta = 0.1 * Math.random() + 0.1
      mat._opacity = 1
      materials.push(mat)
    }

    // 创建点球体
    const spherical = new THREE.Spherical(this.options.radius)
    const step = 250
    for (let i = 0; i < step; i++) {
      let vec = new THREE.Vector3()
      let radians = (step * (1 - Math.sin((i / step) * Math.PI))) / step + 0.5
      for (let j = 0; j < step; j += radians) {
        let c = j / step
        let f = i / step
        let index = Math.floor(2 * Math.random())
        let pos = positions[index]
        let size = sizes[index]
        if (this.isLandByUV(img, imgData, c, f)) {
          // 根据横纵百分比判断在底图中的像素值
          spherical.theta = c * Math.PI * 2 - Math.PI / 2 // 横纵百分比转换为theta和phi夹角
          spherical.phi = f * Math.PI // 横纵百分比转换为theta和phi夹角
          vec.setFromSpherical(spherical) // 夹角转换为世界坐标
          pos.positions.push(vec.x)
          pos.positions.push(vec.y)
          pos.positions.push(vec.z)
          if (j % 3 === 0) {
            size.sizes.push(6.0)
          }
        }
      }
    }
    for (let i = 0; i < positions.length; i++) {
      let pos = positions[i]
      let size = sizes[i]
      let bufferGeom = new THREE.BufferGeometry()
      let typedArr1 = new Float32Array(pos.positions.length)
      let typedArr2 = new Float32Array(size.sizes.length)
      for (let j = 0; j < pos.positions.length; j++) {
        typedArr1[j] = pos.positions[j]
      }
      for (let j = 0; j < size.sizes.length; j++) {
        typedArr2[j] = size.sizes[j]
      }
      bufferGeom.setAttribute('position', new THREE.BufferAttribute(typedArr1, 3))
      bufferGeom.setAttribute('size', new THREE.BufferAttribute(typedArr2, 1))
      bufferGeom.computeBoundingSphere()
      let particle = new THREE.Points(bufferGeom, materials[i])
      this.earthParticles.add(particle)
    }

    this.scene.add(this.earthParticles)
  }

  animate() {
    requestAnimationFrame(() => this.animate()) //请求再次执行渲染函数render
    const objects = this.earthParticles.children
    objects.forEach(item => {
      const material = item.material
      item.material._t += item.material._speed
      material.opacity =
        (Math.sin(material._t) * material._delta + material._min) * material._opacity
      material.needsUpdate = true
    })

    this.earthParticles.rotation.y += 0.001 * this.options.rotateSpeed

    this.renderer.render(this.scene, this.camera) //执行渲染操作
  }
  remove() {
    this.renderer = null
    this.earthParticles.remove()
    this.earthParticles.removeFromParent()
    this.domEl.removeChild(this.domEl.children[0])
  }
}
