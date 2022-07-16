<template>
  <div class="h-5/6 w-3/4 m-auto px-10 py-10 lg:px-12">
    <div v-if="loading">
      <div class="flex justify-center items-center m-auto">
        <div class="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full" role="status"
          style="border-top-color: transparent;">
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="accent-fg text-5xl font-extrabold text-center">
        Meet the Team!
      </h1>
      <div class="flex flex-col gap-20 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-28 pt-28">
        <TeamMemberDescription v-for="member in data.data" :key="member.id" :id="member.id" :name="member.name"
          :short-bio="member.shortBio" :photo="member.photo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TeamMemberDescription from '@/components/TeamMemberDescription.vue'
import { retrievePageData } from '@/lib/gsheets'
import { apiKeyInjectionKey, configInjectionKey, themeInjectionKey } from '@/lib/keys'
import { setTheme } from '@/lib/themes'
import { inject, onMounted, reactive, ref } from 'vue'

const loading = ref<boolean>()
loading.value = true

const data = reactive({
  data: [{ name: '', shortBio: '', photo: '', id: 0 }]
})

const id = inject(configInjectionKey) as string
const key = inject(apiKeyInjectionKey) as string
const theme = inject<{ value: string }>(themeInjectionKey, { value: '' })

function getTeamData (data: { Team: unknown[] }): unknown[] {
  return data.Team
}

onMounted(async () => {
  await retrievePageData('Team', id, key).then(
    (spreadsheetData) => {
      data.data = getTeamData(spreadsheetData as { Team: unknown[] }) as { name: string, shortBio: string, photo: string, id: number }[]
      loading.value = false
    }
  ).then(
    () => {
      setTheme(theme.value)
    }
  )
})
</script>
