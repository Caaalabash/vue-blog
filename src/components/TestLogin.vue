<template>
  <main>
    <canvas id="canvas"></canvas>
    <div class="container">
      <img class="logo" src="https://images.91act.com/91act_logo.png" alt="">
      <span class="input input--kyo">
        <input class="input__field input__field--kyo" type="text" id="input-1" placeholder="用户名" @focus="handleFocus(0)"/>
      </span>
      <span class="input input--kyo">
        <input class="input__field input__field--kyo" type="text" id="input-2" placeholder="旧密码" @focus="handleFocus(1)"/>
      </span>
      <span class="input input--kyo">
        <input class="input__field input__field--kyo" type="text" id="input-3" placeholder="新密码" @focus="handleFocus(2)"/>
      </span>
      <span class="input input--kyo">
        <input class="input__field input__field--kyo" type="text" id="input-4" placeholder="重复新密码" @focus="handleFocus(3)"/>
      </span>
      <span class="input input--kyo">提交</span>
    </div>
  </main>
</template>

<script>
import Signalz from '../lib/canvas'

const gradientList = [
  { from: '#005AA7', to: '#fffde4', name: 'Evening Night' },
  { from: '#525252', to: '#3d72b4', name: 'Curiosity Blue' },
  { from: '#F0F2F0', to: '#000c40', name: 'What lies Beyond' },
  { from: '#4568dc', to: '#b06ab3', name: 'Can You Feel The Love Tonight' }
]

export default {
  name: 'TestLogin',
  data: () => ({
    canvas: null
  }),
  mounted() {
    this.canvas = new Signalz('#canvas')
  },
  methods: {
    handleFocus(index) {
      if (!this.canvas) return
      const { from, to } = gradientList[index]
      this.canvas.from = from
      this.canvas.to = to
    }
  },
}
</script>

<style>
  #app {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  /* 若浏览器支持 backdrop-filter，则透明度为 50%，并启用毛玻璃 */
  @supports (-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px)) {
    .container {
      background: rgba(0, 0, 0, 0.5);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }
  }

  /* 若浏览器器不支持，则使用 MaterialDesign 的风格 */
  @supports not ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
    .container {
      background: #fff;
      box-shadow: 0 10px 30px rgba(0, 0, 0, .18), 0 6px 10px rgba(0, 0, 0, .22);
    }
  }
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 450px;
    padding: 30px 0;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.1);
  }
  .logo {

  }
  #canvas {
    position: absolute;
  }
  .input {
    position: relative;
    z-index: 1;
    display: inline-block;
    margin: 16px 0;
    width: 300px;
    vertical-align: top;
  }
  .input__field {
    box-sizing: border-box;
    position: relative;
    display: block;
    float: right;
    padding: 0.8em;
    width: 60%;
    border: none;
    border-radius: 0;
    background: #f0f0f0;
    color: #aaa;
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-appearance: none; /* for box shadows to show on iOS */
  }
  .input__field:focus {
    outline: none;
  }
  .input__label {
    display: inline-block;
    float: right;
    padding: 0 1em;
    width: 40%;
    color: #6a7989;
    font-weight: bold;
    font-size: 70.25%;
    user-select: none;
  }
  .input__label-content {
    position: relative;
    display: block;
    padding: 1.6em 0;
    width: 100%;
  }
  .input--kyo {
    z-index: auto;
  }
  .input__field--kyo {
    padding: 0.85em 1.5em;
    width: 100%;
    border-radius: 2em;
    background: #fff;
    color: #535d92;
  }
  .input__label--kyo {
    z-index: 0;
    padding: 0 0 0 2em;
    width: 100%;
    text-align: left;
  }
  .input__label-content--kyo {
    padding: 0.5em 0;
  }
</style>