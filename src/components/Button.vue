<template>
  <button class="button">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style scoped>
.button {
  padding: 10px 12px;
  background: white;
  border: 2px solid #3ef;
  border-radius: 6px;
  transition: 0.3s;
  cursor:pointer;
}
.button:hover {
  background: #ecf6ff;
}
.button:focus,
.button__content:focus {
    outline: none;
}
</style>
