<template>
	<div class="laya-win">
		<!-- <div id="layaContainer"></div> -->
		<el-select class="camera-select" size="mini" v-model="activeCamera" placeholder="请选择">
			<el-option v-for="item in cameraSelect" :label="item" :value="item"></el-option>
		</el-select>
	</div>
</template>

<script>
	import Bus from '../Common/Bus.js'

	export default {
		name: "laya-win",
		data() {
			return {
				activeCamera: '',
				cameraSelect: [],
				ray: new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0)),
				point: new Laya.Vector2(),
				outHitResult: new Laya.HitResult()
			}
		},
		components: {

		},
		props: {

		},
		mounted() {
			Laya3D.init(0, 0)
			Laya.stage.scaleMode = Laya.Stage.SCALE_FULL
			Laya.stage.screenMode = Laya.Stage.SCREEN_NONE

			// 			Laya.Render._mainCanvas.source.style.width = "800px"
			// 			Laya.Render._mainCanvas.source.style.height = "400px"
			Laya.Render._mainCanvas.source.style.top = "30px"
			Laya.Render._mainCanvas.source.style.left = "0px"
			// 			Laya.Render._mainCanvas.source.style.right = "300px"
			// 			Laya.Render._mainCanvas.source.style.bottom = "0px"

			// console.log(Laya.Render._mainCanvas.source.style)

			Laya.Stat.show()
			this.PreloadingRes()
		},
		methods: {
			PreloadingRes() {
				var resource = ["/static/LayaRes/scene/LayaScene/Conventional/LayaScene.ls",
					"/static/LayaRes/ground/ground1/Conventional/New Scene.lh",
					"/static/LayaRes/ground/ground2/Conventional/New Scene.lh"
				]
				Laya.loader.create(resource, Laya.Handler.create(this, this.onPreLoadFinish))
			},
			onPreLoadFinish() {
				//加载场景
				this.scene = Laya.stage.addChild(Laya.Loader.getRes("/static/LayaRes/scene/LayaScene/Conventional/LayaScene.ls"))
				//初始化主摄像机
				this.camera = this.scene.getChildByName('Main Camera')
				this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY
				this.scene.addChild(this.camera)
				this.cameraSelect.push('Main Camera')
				//添加自由摄像机
				this.camera1 = new Laya.Camera()
				this.camera.cloneTo(this.camera1)
				this.camera1.name = 'Free Camera'
				this.camera1.addComponent(CameraMoveScript)

				this.scene.addChild(this.camera1)
				this.cameraSelect.push('Free Camera')
				this.activeCamera = 'Free Camera'
				//默认关闭主摄像机
				this.camera.enableRender = false
				console.log(this.camera1)

				var g1 = Laya.Loader.getRes("/static/LayaRes/ground/ground1/Conventional/New Scene.lh")
				var ground1 = this.scene.addChild(g1)
				ground1.transform.localScale = new Laya.Vector3(1, 1, 1);
				ground1.transform.translate(new Laya.Vector3(1, 0, 1));
				ground1.name = 'ground1'

				var g2 = Laya.Loader.getRes("/static/LayaRes/ground/ground2/Conventional/New Scene.lh")
				var ground2 = this.scene.addChild(g2)
				ground2.transform.localScale = new Laya.Vector3(1, 1, 1)
				ground2.transform.translate(new Laya.Vector3(2, 0, 1))
				ground2.name = 'ground2'
				Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.checkHit)

			},
			toggleCamera() {
				for (let i = 0; i < this.cameraSelect.length; i++) {
					this.scene.getChildByName(this.cameraSelect[i]).enableRender = false
				}
				this.scene.getChildByName(this.activeCamera).enableRender = true
			},
			checkHit() {
				console.log(Laya.MouseManager.instance.mouseX, Laya.MouseManager.instance.mouseY)

				this.point.x = Laya.MouseManager.instance.mouseX
				this.point.y = Laya.MouseManager.instance.mouseY
				//产生射线
				this.camera1.viewportPointToRay(this.point, this.ray)
				// console.log(this.camera1)
				//拿到射线碰撞的物体
				this.scene.physicsSimulation.rayCast(this.ray, this.outHitResult)
				//如果碰撞到物体
				if (this.outHitResult.succeeded) {
					//删除碰撞到的物体
					// this.text.text = "点击到了" + this.outHitResult.collider.owner.name;
					console.log("碰撞到物体！！", this.outHitResult.collider.owner.name)
				}

				//划线
				//摄像机位置
				phasorSprite3D = new Laya.PhasorSpriter3D()
				var position = new Laya.Vector3(this.camera1.transform.position.x, 0, this.camera1.transform.position.z);
				//开始绘制矢量3D精灵，类型为线型
				phasorSprite3D.begin(WebGLContext.LINES, this.camera1);
				//根据射线的原点绘制参考直线（为了观察方便而绘制，但矢量线并不是射线真正的路径）
				phasorSprite3D.line(this.ray.origin, new Laya.Vector4(1, 0, 0, 1), position, new Laya.Vector4(1, 0, 0, 1));
				//结束绘制
				phasorSprite3D.end();

			}
		},
		watch: {
			// 			editData: {
			// 				handler(nv) {
			// 					if (this.firstOpen == true) {
			// 						this.saved = true
			// 						this.firstOpen = false
			// 					} else {
			// 						this.saved = false
			// 					}
			// 				},
			// 				deep: true
			// 			},
			activeCamera: {
				handler(nv) {
					this.toggleCamera()
				}
			}
		}
	}
</script>

<style>
	/* #layaContainer{
		width: -webkit-calc(100% - 300px);
		height: -webkit-calc(100% - 30px);
	} */

	#layaContainer {
		/* width: -webkit-calc(100% - 300px);
		height: -webkit-calc(100% - 30px);
		top: 30px;
		left: 0px; */
		z-index: 1;
	}

	.laya-win {
		position: absolute;
		width: -webkit-calc(100% - 300px);
		height: 40px;
		line-height: 40px;
		top: 30px;
		left: 0px;
		z-index: 110;
		/* background-color: #55A532; */
		pointer-events: none;
	}

	.laya-win>div {
		float: right;
	}

	.camera-select {
		margin-right: 20px;
		pointer-events: auto;
	}
</style>
