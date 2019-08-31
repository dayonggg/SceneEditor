<template>
	<div class="scene-page">
		<el-card class="object-list-view">
			<el-tree :data="sceneData" :props="defaultProps" :default-expand-all="true" :expand-on-click-node="false"></el-tree>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: "scene-page",
		data() {
			return {
				sceneData: [{
					label: 'Camera'
				},{
					label: 'light'
				},{
					label: 'Scene',
					children:[{
						label:'ground'
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		components: {

		},
		props: {

		},
		mounted() {

		},
		methods: {

		},
		watch: {

		}
	}
</script>

<style>
	.scene-page .el-card__body {
		padding: 6px 6px 6px 0px;
		height: 220px;
		overflow: auto;
	}
	
	.scene-page .el-tree-node__content{
		height: 22px;
	}
	
	.scene-page .el-tree-node__content>.el-tree-node__expand-icon{
		padding: 4px;
	}
	
	.scene-page .el-tree-node__label{
		font-size: 13px;
	}
</style>
