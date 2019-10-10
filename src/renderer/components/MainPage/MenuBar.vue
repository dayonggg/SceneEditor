<template>
	<div class="menu-bar">
		<el-menu mode="horizontal" menu-trigger="hover">
			<el-submenu index="1">
				<template slot="title">File</template>
				<el-menu-item index="1-1">New</el-menu-item>
				<el-submenu index="1-2">
					<template slot="title">Import</template>
					<el-menu-item index="1-2-1">Import Scene</el-menu-item>
					<el-menu-item index="1-2-2">Import Object</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">Edit</template>
				<el-menu-item index="2-1">Undo</el-menu-item>
				<el-menu-item index="2-2">Redo</el-menu-item>
				<hr>
				<el-menu-item index="2-3">Save</el-menu-item>
				<el-menu-item index="2-4">Clone</el-menu-item>
				<el-menu-item index="2-5">Delete</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">View</template>
				<el-menu-item index="3-1">关卡列表</el-menu-item>
				<el-menu-item index="3-2">场景列表</el-menu-item>
				<el-menu-item index="3-3">模型列表</el-menu-item>
				<el-submenu index="3-4">
					<template slot="title">Theme</template>
					<el-menu-item index="3-4-1">Light</el-menu-item>
					<el-menu-item index="3-4-2">Dark</el-menu-item>
				</el-submenu>
				<el-menu-item index="3-5">DevTool</el-menu-item>
			</el-submenu>
			<el-menu-item index="4">预留</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name: "menu-bar",
		data() {
			return {}
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
	.menu-bar{
		width: 100%;
		height: 30px;
		line-height: 30px;
	}
</style>
