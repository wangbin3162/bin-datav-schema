import * as THREE from 'three'

import vertexShader from './shader/FireSprite/vertex.glsl'
import fragmentShader from './shader/FireSprite/fragment.glsl'

export default class FireSprite {
  constructor(camera, position = new THREE.Vector3(-4.9, 1.8, 25.1), scale = 1) {
    this.camera = camera
    // 着色器创建精灵材质
    this.spriteMaterial = new THREE.ShaderMaterial({
      uniforms: {
        rotation: { value: 0 },
        center: {
          value: new THREE.Vector2(0.5, 0.5),
        },
        iTime: {
          value: 0,
        },
        iResolution: {
          value: new THREE.Vector2(1000, 1000),
        },
        iMouse: {
          value: new THREE.Vector2(0, 0),
        },
        uFrequency: {
          value: 0,
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    })

    // 创建精灵
    this.sprite = new THREE.Sprite(this.spriteMaterial)
    this.sprite.renderOrder = 1
    this.sprite.position.copy(position)
    // 设置精灵的大小
    this.sprite.scale.set(scale, scale, scale)
    this.mesh = this.sprite
  }
  update(deltaTime) {
    this.spriteMaterial.uniforms.iTime.value += deltaTime
  }
}
