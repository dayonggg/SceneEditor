<template>
	<div class="main-page">
		<menu-bar></menu-bar>
		<laya-win></laya-win>
		<prop-page></prop-page>
	</div>
</template>

<script>
	import MenuBar from './MainPage/MenuBar'
	import LayaWin from './MainPage/LayaWin'
	import PropPage from './MainPage/PropPage'

	export default {
		name: "main-page",
		data() {
			return {

			}
		},
		components: {
			MenuBar,
			LayaWin,
			PropPage
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
	.main-page{
		width: 100%;
		height: 100%;
	}
</style>
