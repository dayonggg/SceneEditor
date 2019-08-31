<template>
	<el-tabs class="prop-page" type="border-card">
		<el-tab-pane label="SCENE">
			<scene-page></scene-page>
		</el-tab-pane>
		<el-tab-pane label="BLOCK">BLOCK</el-tab-pane>
		<el-tab-pane label="SETTING">SETTING</el-tab-pane>
	</el-tabs>
</template>

<script>
	import ScenePage from '../PropPage/ScenePage'
	
	export default {
		name: "prop-page",
		data() {
			return {

			}
		},
		components: {
			ScenePage
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
	.prop-page {
		float: right;
		width: 300px;
		height: -webkit-calc(100% - 30px);
	}
	
	.prop-page .el-tabs__nav{
		margin-left: 2px;
	}
	
	.prop-page .el-tabs__item{
		font-weight: 600;
		font-size: 15px;
	}
	
	.prop-page.el-tabs--border-card>.el-tabs__content{
		padding: 10px;
	}
</style>
