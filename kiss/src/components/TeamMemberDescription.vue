<template>
  <div class="flex flex-col items-center">
    <router-link :to="{ name: 'team-member', params: { id: props.id } }">
      <img v-if="photo" :src="photoShowLink" class="h-[200px] w-[156px]" alt="Profile Picture">
      <img v-else src="../assets/profile.png" class="h-[200px] w-[156px]" alt="Profile Picture">
    </router-link>
    <router-link :to="{ name: 'team-member', params: { id: props.id } }">
      <h4 class="font-bold py-3 text-lg">{{ props.name }}</h4>
    </router-link>
    <p class="accent-fg px-5 text-center line-clamp-5 w-full">{{ props.shortBio }}</p>
  </div>
</template>

<script setup lang="ts">
import { getImageLink } from '@/lib/gdrive'

interface MemberOverview {
  id: number | string,
  name: string,
  shortBio?: string,
  photo?: string
}

const props = defineProps<MemberOverview>()

let photoShowLink = ''
if (props.photo) {
  photoShowLink = getImageLink(props.photo)
}
</script>
