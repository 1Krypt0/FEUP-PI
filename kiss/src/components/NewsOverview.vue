<template>
  <div class="flex flex-col items-center">
    <router-link :to="{ name: 'new', params: { id: props.id } }">
      <h4 class="font-bold py-3 text-lg">{{ props.title }}</h4>
    </router-link>
    <router-link :to="{ name: 'new', params: { id: props.id } }">
      <img v-if="thumbnail && isFromDrive" :src="imageURL" class="lg:h-[200px] md:h-[150px] md:w-[117px] lg:w-[156px]"
        alt="News Picture">
      <img v-else-if="thumbnail && !isFromDrive" :src="thumbnail"
        class="lg:h-[200px] md:h-[150px] md:w-[117px] lg:w-[156px]" alt="News Picture">
      <img v-else src="../assets/newspaper.png" class="lg:h-[200px] md:h-[150px] md:w-[117px] lg:w-[156px]"
        alt="News Picture">
    </router-link>
    <Markdown class="accent-fg px-5 text-center line-clamp-5 w-full prose" :source="props?.shortText" />
  </div>
</template>

<script setup lang="ts">
import { getImageLink } from '@/lib/gdrive'
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import Markdown from 'vue3-markdown-it'

// Defines the field a News article page will have.
interface NewsOverview {
  id: number | string,
  title: string,
  shortText: string,
  thumbnail: string
}

const props = defineProps<NewsOverview>()

// Used to check if the image comes from drive. Currently works
// beacuse of the way getImageLink functions. In the future, a
// rework of the method is needed so it doesn't become a problem
const isFromDrive = computed(() => {
  return !(getImageLink(props.thumbnail) === 'https://drive.google.com/uc?export=view&id=https:')
})

const imageURL = ref<string>()
if (isFromDrive) {
  if (props.thumbnail) {
    imageURL.value = getImageLink(props.thumbnail)
  }
}

</script>
