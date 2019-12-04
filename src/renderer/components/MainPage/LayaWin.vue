<template>
	<div class="laya-win">
		<div class="top-bar">
			<el-button size="mini">ttt</el-button>
			<el-select class="camera-select" size="mini" v-model="activeCamera" placeholder="请选择">
				<el-option v-for="item in cameraSelect" :label="item" :value="item"></el-option>
			</el-select>
		</div>
	</div>
</template>

<script>
	import Bus from '../Common/Bus.js'
	import $ from 'Jquery'
	import CameraMoveScript from '../LayaPage/ComponentScript/CameraMoveScript.js'
	import Tool from '../LayaPage/ComponentScript/Tool.js'
	import D from '../Common/Data.js'

	export default {
		name: "laya-win",
		data() {
			return {
				activeCamera: '',
				cameraSelect: [],
				ray: new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0)),
				point: new Laya.Vector2(),
				outHitResult: new Laya.HitResult(),
				// activeModel:{}
			}
		},
		components: {},
		props: {

		},
		mounted() {
			console.log(D.dpr)
			let winWidth = $(window).width() * D.dpr
			let winHeight = $(window).height() * D.dpr
			Laya3D.init(winWidth - 300, winHeight - 30)
			Laya.Stat.show()
			window.onresize = () => {
				this.resetStageSize()
			}
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
				Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.checkHit)

				this.scene.addChild(this.camera1)
				this.cameraSelect.push('Free Camera')
				this.activeCamera = 'Free Camera'
				//默认关闭主摄像机
				this.camera.enableRender = false

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
				console.log(ground1, ground2)
			},
			toggleCamera() {
				for (let i = 0; i < this.cameraSelect.length; i++) {
					this.scene.getChildByName(this.cameraSelect[i]).enableRender = false
				}
				this.scene.getChildByName(this.activeCamera).enableRender = true
			},
			checkHit() {
				this.point.x = Laya.MouseManager.instance.mouseX
				this.point.y = Laya.MouseManager.instance.mouseY
				// console.log(Laya.Event)
				//产生射线
				this.camera1.viewportPointToRay(this.point, this.ray)
				//拿到射线碰撞的物体
				this.scene.physicsSimulation.rayCast(this.ray, this.outHitResult)
				//如果碰撞到物体
				if (this.outHitResult.succeeded && this.outHitResult.collider.owner.name) {
					console.log("碰撞到物体！！", this.outHitResult.collider.owner)
					//像素线精灵
					let lineSprite3D = this.scene.addChild(new Laya.Sprite3D())
					this.ownerLineSprite3D = lineSprite3D.addChild(new Laya.PixelLineSprite3D(5000));
					// console.log(this.outHitResult.collider.owner.meshRenderer.boundingBox)
					lineSprite3D.active = true

					let boundingBox = this.outHitResult.collider.owner.meshRenderer.boundingBox
					let tt3D = this.scene.addChild(new Laya.Sprite3D())
					let ttLineSprite3D = tt3D.addChild(new Laya.PixelLineSprite3D(2))
					let lineStartPoint = new Laya.Vector3()
					let lineStartFinish = new Laya.Vector3()
					lineStartFinish.x = lineStartPoint.x = (boundingBox.max.x + boundingBox.min.x) / 2
					lineStartFinish.z = lineStartPoint.z = (boundingBox.max.z + boundingBox.min.z) / 2
					lineStartPoint.y = boundingBox.max.y
					lineStartFinish.y = lineStartPoint.y + 3
					ttLineSprite3D.addLine(lineStartPoint, lineStartFinish, Laya.Color.GREEN, Laya.Color.GREEN)
					this.activeModel.destroy()
					this.activeModel = tt3D
					console.log(tt3D)
					// this.activeModel.destroy()

				}
			},
			//窗口尺寸重置
			resetStageSize() {
				let winWidth = $(window).width() * D.dpr
				let winHeight = $(window).height() * D.dpr
				Laya.stage.width = winWidth - 300
				Laya.stage.height = winHeight - 30
			}
		},
		watch: {
			activeCamera: {
				handler(nv) {
					this.toggleCamera()
				}
			}
		}
	}
</script>

<style>
	#layaCanvas {
		/* position: absolute; */
		width: -webkit-calc(100% - 300px);
		height: -webkit-calc(100% - 30px);
		top: 30px;
		left: 0px;
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

	.top-bar {
		float: right;
	}

	.camera-select {
		margin-right: 8px;
		pointer-events: auto;
		width: 135px;
	}
</style>
