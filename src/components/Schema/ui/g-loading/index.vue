<template>
  <div class="g-nested-loading">
    <div
      v-if="spinning"
      class="g-loading-mask"
      :class="spinContentClass"
      :style="spinning ? spinContentStyle : {}"
    >
      <div class="g-loading">
        <div v-if="type === 'dna'" class="dna-loading">
          <div v-for="i in 60" :key="i" class="dna-ele">
            <div class="dna-dot"></div>
          </div>
        </div>
        <div v-else-if="type === 'square'" class="square-loading">
          <i class="loading-icon validating"></i>
          <i class="loading-icon validating"></i>
          <i class="loading-icon validating"></i>
        </div>
        <div v-else>
          {{ type }}
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'GLoading',
  props: {
    type: {
      type: String,
      validator: (val) => ['dna', 'square'].includes(val),
      default: 'dna',
    },
    spinning: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'dark',
    },
    wrapClass: {
      type: String,
    },
    wrapStyle: {
      type: {},
    },
  },
  setup(props) {
    const spinContentClass = ref('')
    if (props.spinning) {
      if (props.wrapClass) {
        spinContentClass.value += ` ${props.wrapClass}`
      }
    } else {
      spinContentClass.value = ''
    }

    const wrapStyle = props.wrapStyle || {}
    const spinContentStyle = ref({
      ...wrapStyle,
    })

    return {
      spinContentClass,
      spinContentStyle,
    }
  },
})
</script>

<style scoped lang="stylus">
.g-nested-loading {
  position: relative;
  height: 100%;
  width: 100%;
}

.g-loading-mask {
  position: absolute;
  z-index: 2000;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
}

.g-loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2001;
  display: block;
  width: 100%;
  height: 120px;
}

.square-loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;

  .loading-icon {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 1px;
    margin-right: 4px;
    background: #1996df;
    transition: 0.2s;
    vertical-align: middle;
    &.validating {
      animation: loading-validating 1s infinite ease-in-out;
      &:nth-child(1) {
        animation-delay: 0.25s;
      }

      &:nth-child(2) {
        animation-delay: 0.5s;
      }
    }
  }
}

.dna-loading {
  position: relative;
  width: 120px;
  margin: 0 auto;
  perspective: 1000px;
  transform-style: preserve-3d;
  letter-spacing: -5px;
  top: 50%;
  transform: translateY(-50%);

  &::after {
    content: 'loading...';
    display: block;
    padding-top: 25px;
    font-size: 12px;
    color: #aaa;
    text-align: center;
    letter-spacing: 5px;
  }
}

.dna-dot {
  width: inherit;
  height: inherit;
  transform: translateZ(-8px);
  transform-style: preserve-3d;

  &::before {
    content: '';
    width: inherit;
    height: inherit;
    display: block;
    background: #aaa;
    border-radius: 50%;
    animation: dna-rotate 5s linear infinite reverse;
    transform: rotateX(-360deg) translateZ(0);
  }
}

.dna-ele {
  width: 2px;
  height: 2px;
  display: inline-block;
  animation: dna-rotate 5s linear infinite;
  transform: rotateX(-360deg) translateZ(0);
  transform-style: preserve-3d;
  margin-left: 0;

  &:nth-of-type(2n) .dna-dot:before {
    background: deepskyblue;
  }
}


for $i in (1..60) {
  .dna-ele:nth-of-type({$i}),
  .dna-ele:nth-of-type({$i}) .dna-dot:before {
    animation-delay: -0.16 * $i s;
  }
  .dna-ele:nth-of-type({$i}):nth-of-type(odd) {
    animation-delay: -0.16 * $i + 2s;
  }
}

@keyframes dna-rotate {
  100% {
    transform: none;
  }
}

@keyframes loading-validating {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.g-async-loading {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
