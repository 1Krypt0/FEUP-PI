<template>
  <div class="flex flex-col items-center">
    <router-link :to="{ name: 'project', params: { id: props.id } }">
      <img v-if="imageShareLink" :src="imageShowUrl" class="lg:h-[200px] md:h-[150px] md:w-[117px] lg:w-[156px]"
        alt="Project Picture">
      <img v-else src="../assets/FourEyesPhoto.png" class="lg:h-[200px] md:h-[150px] md:w-[117px] lg:w-[156px]"
        alt="Project Picture">
    </router-link>
    <router-link :to="{ name: 'project', params: { id: props.id } }">
      <h4 class="font-bold py-3 text-lg">{{ props.name }}</h4>
    </router-link>
    <p class="accent-fg px-5 text-center line-clamp-5 ">{{ props.shortDescription }}</p>
  </div>
</template>

<script setup lang="ts">
import { getImageLink } from '@/lib/gdrive'

interface ProjectOverview {
  id: number | string,
  name: string,
  shortDescription?: string,
  imageShareLink?: string
}

const props = defineProps<ProjectOverview>()

let imageShowUrl = ''
if (props.imageShareLink) {
  imageShowUrl = getImageLink(props.imageShareLink)
}
</script>
