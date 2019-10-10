<template>
	<div class="extend-page"></div>
</template>

<script>
	export default {
		name: "extend-page",
		data() {
			return {
				
			}
		},
		components: {
			
		},
		props:{
			type:String
		},
		mounted() {
			
		},
		methods: {
			
		},
		watch:{
			
		}
	}
</script>

<style>
	.extend-page{
		position: absolute;
		width: -webkit-calc(100% - 300px);
		height: -webkit-calc(100% - 30px);
		top:30px;
		left: 0px;
		background-color: rgba(0,0,0,0.5);
		z-index: 1500;
	}
</style>